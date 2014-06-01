angular.module("flash", [])
  .provider("flash", function() {
    var types = {};
    var clearOnRootScopeEvents = [];

    return {
      addType: function(type, value) {
        types[type] = value;
      },
  
      clearOnEvent: function(name) {
        clearOnRootScopeEvents.push(name);
      },

      $get: function() {
        var service = {};
        var _this = this;

        _this.messages = [];

        return {
          addMessage: function(type, message) {
            _this.messages.push({ cssClass: types[type], text: message })
          },

          getMessages: function() {
            return _this.messages;
          },

          clearOnRootScopeEvents: clearOnRootScopeEvents,

          clearMessages: function() {
            _this.messages.length = 0;
          }
        }
      }
    };
  })

  // TODO: Seriously reconsider removing the listning on the root scope from
  //       this directive and finding another place to put it.
  .directive("flashMessages", function($rootScope, flash) {
    return {
      restrict: "E",
      scope: {},
      template: [
        '<div ng-repeat="message in flash.messages" class="{{ message.cssClass }}">',
          '{{ message.text }}',
        '</div>'
      ].join(""),
      link: function(scope) {
        scope.flash = { messages: flash.getMessages() };

        var clearFunc = function() { flash.clearMessages(); };
        angular.forEach(flash.clearOnRootScopeEvents, function(eventName) {
          $rootScope.$on(eventName, clearFunc);
        });
      }
    }
  })
  
  .directive("flashClear", function(flash) {
    return {
      restrict: "A",
      scope: {},
      link: function(scope, element) {
        element.on("click", function() {
          scope.$apply(function() {
            flash.clearMessages();
          });
        });
      }
    }
  });
