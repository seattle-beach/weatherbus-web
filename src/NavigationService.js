(function () {
  "use strict";
  WB.NavigationService = class {
    hash() {
      return location.hash;
    }
  
    search() {
      return location.search;
    }
  
    pushState(hash) {
      history.pushState(null, "WB", hash);
    }
  
    navigate(url) {
      window.location = url;
    }
  };
}());
