(function () {
  "use strict";
  window.Weatherbus = {};

  Weatherbus.App = function (root) {
    this._root = root;
  };

  Weatherbus.App.prototype.start = function () {
    var that = this;
    this._rootController = new Weatherbus.LoginController(function(username) {
      that._rootController.remove();

      that._rootController = new Weatherbus.StopsController(username, new Weatherbus.UserService(function() {
        return new XMLHttpRequest();
      }));
      that._rootController.appendTo(that._root);
    });
    this._rootController.appendTo(this._root);
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



  Weatherbus.StopsController = function (username, userService) {
    this.username = username; 
    this.userService = userService;
  };

  Weatherbus.StopsController.prototype = new Weatherbus.Controller();

  Weatherbus.StopsController.prototype.createDom = function() {
    var template = document.querySelector("#template_StopsController").innerText;
    var dom = document.createElement("div");
    var that = this;
    dom.innerHTML = template;

    this.userService.getStopsForUser(this.username, function (stops) {
      that._stopsLoaded(stops);
    });
    //as page loads
    //call service with username
    //receive stops
    //render (or error message)
    return dom;
  };

  Weatherbus.StopsController.prototype._stopsLoaded = function (stops) {
    this._root.querySelector(".loading").classList.add("hidden");
    for(var i = 0; i < stops.length; i++) {
      var li = document.createElement("li");
      li.innerText = stops[i];
      var ol = this._root.querySelector("ol");
      ol.appendChild(li);
    }
  };


  Weatherbus.UserService = function (xhrFactory) {
    this.xhrFactory = xhrFactory;
  };

  Weatherbus.UserService.prototype.getStopsForUser = function (username, callback) {
    var xhr = this.xhrFactory();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var re = new RegExp("[^0-9]", "g");
        var response = xhr.response.split('<br/>');
        for(var i = 0; i < response.length; i++) {
          response[i] = response[i].replace(re, "");
        }
        response = response.filter(function (s) { return s !== ""; });
        
        
        
        callback(response);
      }
    };
    xhr.open("get", "http://localhost:8080/users/stops?username=" + username);
    xhr.send();
  };

  Weatherbus.boot = function () {
    new Weatherbus.App(document.body).start();
  };
}());
