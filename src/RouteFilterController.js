(function () {
  "use strict";
  WB.RouteFilterController = function (routes, currentFilter) {
    this._routes = WB.sortRouteNumbers(routes);
    this._currentFilter = currentFilter;
    this.completed = new WB.Event();
  };

  WB.RouteFilterController.prototype = new WB.Controller();

  WB.RouteFilterController.prototype.createDom = function () {
    var that = this;
    var dom = this.createDomFromTemplate("#template_RouteFilterController");
    this._addRoutes(dom);
    
    dom.querySelector("button").addEventListener("click", function(event) {
      event.preventDefault();
      that.completed.trigger(that._selectedRoutes());
    });

    return dom;
  };

  WB.RouteFilterController.prototype._selectedRoutes = function () {
    var selection = [];
    var checkboxes = this._checkboxes;
    var i;
    for (i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        selection.push(checkboxes[i].value);
      }
    }

    return selection;
  };

  WB.RouteFilterController.prototype._addRoutes = function (dom) {
    var i, routeDom;
    this._checkboxes = [];

    for (i = 0; i < this._routes.length; i++) {
      routeDom = this.createDomFromTemplate("#template_RouteFilterController_route");
      var checkbox = routeDom.querySelector("input[type=checkbox]");
      checkbox.value = this._routes[i];
      this._checkboxes.push(checkbox);

      if (this._currentFilter && this._currentFilter.indexOf(this._routes[i]) === -1) {
        checkbox.checked = false;
      }

      routeDom.querySelector("span").textContent = this._routes[i];
      dom.querySelector(".routes").appendChild(routeDom);
    }

    return dom;
  };

}());
