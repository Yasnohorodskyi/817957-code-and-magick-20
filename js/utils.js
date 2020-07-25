'use strict';
window.util = (function () {
  return {
    isEscEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    },
  };
})();
