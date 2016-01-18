(function () {
  "use strict";
  window.Weatherbus = {};

  Weatherbus.App = function (root) {
    this._root = root;
  };

  Weatherbus.App.prototype.start = function () {
    var that = this;
    var userService = new Weatherbus.UserService(that._xhrFactory);
    var stopService = new Weatherbus.StopService(that._xhrFactory);
    this._rootController = new Weatherbus.LoginController(function(username) {
      that._rootController.remove();
      that._rootController = new Weatherbus.StopsController(username, userService, stopService);
      that._rootController.appendTo(that._root);
    });
    this._rootController.appendTo(this._root);
  };

  Weatherbus.App.prototype._xhrFactory = function () {
    return new XMLHttpRequest();
  };


  // Base class for controllers. Should always be subclassed.
  Weatherbus.Controller = function () {};

  Weatherbus.Controller.prototype.createDom = function () {
    throw new Error("Must override createDom()");
  };

  Weatherbus.Controller.prototype.appendTo = function (container) {
    this._root = this.createDom();
    container.appendChild(this._root);
  };

  Weatherbus.Controller.prototype.remove = function () {
    this._root.parentNode.removeChild(this._root);
  };



  Weatherbus.LoginController = function (loginCallback) {
    if (!loginCallback) {
      throw new Error("LoginController requires a callback!");
    }

    this._loginCallback = loginCallback;
  };

  Weatherbus.LoginController.prototype = new Weatherbus.Controller();

  Weatherbus.LoginController.prototype.createDom = function () {
    var template = document.querySelector("#template_LoginController").innerText;
    var dom = document.createElement("div");
    dom.innerHTML = template;

    this._submitButton = dom.querySelector("button");
    this._usernameField = dom.querySelector("input");
    this._errorLabel = dom.querySelector(".error");

    var that = this;
    this._submitButton.addEventListener("click", function () {
      if (!that._usernameField.value) {
        that._errorLabel.classList.remove("hidden");
        return;
      }

      that._loginCallback(that._usernameField.value);
    });

    return dom;
  };



  Weatherbus.StopsController = function (username, userService, stopService) {
    this.username = username;
    this.userService = userService;
    this.stopService = stopService;
  };

  Weatherbus.StopsController.prototype = new Weatherbus.Controller();

  Weatherbus.StopsController.prototype.createDom = function() {
    var template = document.querySelector("#template_StopsController").innerText;
    var dom = document.createElement("div");
    var that = this;
    dom.innerHTML = template;

    this.userService.getStopsForUser(this.username, function (error, stops) {
      that._stopsLoaded(error, stops);
    });
    return dom;
  };

  Weatherbus.StopsController.prototype._stopsLoaded = function (error, stops) {
    var i, ol, errorNode;
    this._root.querySelector(".loading").classList.add("hidden");

    if (stops) {
      for (i = 0; i < stops.length; i++) {
        ol = this._root.querySelector("ol");
        ol.appendChild(this._createStopNode(stops[i]));
      }
    } else {
      errorNode = this._root.querySelector(".error");
      errorNode.classList.remove("hidden");
      errorNode.innerText = error;
    }
  };

  Weatherbus.StopsController.prototype._createStopNode = function (stopId) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    var that = this;
    a.href = "#";
    a.addEventListener("click", function (event) {
      event.preventDefault();
      var stopInfoController = new Weatherbus.StopInfoController(stopId, that.stopService);
      stopInfoController.appendTo(that._root);
    });
    a.innerText = stopId;
    li.appendChild(a);
    return li;
  };


  Weatherbus.StopInfoController = function (stopId, stopService) {
    this._stopId = stopId;
    this._stopService = stopService;
  };

  Weatherbus.StopInfoController.prototype = new Weatherbus.Controller();

  Weatherbus.StopInfoController.prototype.createDom = function () {
    var template = document.querySelector("#template_StopInfoController").innerText;
    var dom = document.createElement("div");
    dom.innerHTML = template;
    var that = this;

    this._stopService.getInfoForStop(this._stopId, function (error, value) {
      var errorNode;
      var loading = that._root.querySelector(".loading");
      loading.classList.add("hidden");

      if (error) {
        errorNode = that._root.querySelector(".error");
        errorNode.classList.remove("hidden");
        errorNode.innerText = error;
      } else {
        that._root.querySelector(".lat").innerText = value.latitude;
        that._root.querySelector(".lng").innerText = value.longitude;
      }
    });

    return dom;
  };


  Weatherbus.UserService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  var parseStops = function (responseText) {
    var i;
    var re = new RegExp("[^0-9_]", "g");
    var lines = responseText.split('<br/>');

    for (i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(re, "");
    }

    return lines.filter(function (s) { return s !== ""; });
  };

  Weatherbus.UserService.prototype.getStopsForUser = function (username, callback) {
    var xhr = this.xhrFactory();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(null, parseStops(xhr.response));
        } else {
          callback("There was an error retrieving stops.", null);
        }
      }
    };

    xhr.open("get", "http://localhost:8080/users/stops?username=" + username);
    xhr.send();
  };


  Weatherbus.StopService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  var parseStopInfo = function(response) {
    return {
      latitude: response.latitude,
      longitude: response.longitude
    };
  };

  Weatherbus.StopService.prototype.getInfoForStop = function (stopId, callback) {
    var xhr = this.xhrFactory();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(null, parseStopInfo(JSON.parse(xhr.response)));
        } else {
          callback("There was an error getting stop info.", null);
        }
      }
    };

    xhr.open("get", "http://localhost:8080/buses/coordinates?stopId=" + stopId);
    xhr.send();
  };


  Weatherbus.boot = function () {
    new Weatherbus.App(document.body).start();
  };
}());
