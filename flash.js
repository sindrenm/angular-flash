angular.module("flash", [])
  .provider("flash", function() {
    var types = {};

    return {
      addType: function(type, value) {
        types[type] = value;
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

          clearMessages: function() {
            _this.messages.length = 0;
          }
        }
      }
    };
  })

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
