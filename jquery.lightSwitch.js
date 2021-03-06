/* 
jQuery lightSwitch plugin

Simply call on a checkbox input:
$("input[type=checkbox]").lightSwitch();

Or a container element:
$("switch.div").lightSwitch();

Each light switch has a few classes: "light-switch", "light-switch-on", "light-switch-off", "light-switch-divider"

Here's an example set of styles for the switch:
.light-switch div { padding: 0; border: 1px solid black; }
.light-switch .light-switch-divider { background: #ddd; padding: 4px 0px; width: 16px; }
.light-switch .text { margin: 0px; padding: 0px; text-align: center; line-height: 1; }
*/

(function($) {
  $.fn.lightSwitch = function(options) {
    this.each(function() {
      var settings = {
        input: false,
        on: "On",
        off: "Off",
        onToggle: function() {},
        borderRadius: 0
      };
      $.extend(settings, options || {});
      var self = $(this).is("input[type=checkbox]") ? $('<div>').insertAfter(settings.input = $(this).hide()) : $(this);
      self.addClass("light-switch").css({float: 'left', cursor: 'pointer'}).children().remove();
      var on = $('<div class="light-switch-on"><p class="text">'+settings.on+'</p></div>').appendTo(self);
      var divider = $('<div class="light-switch-divider"></div>').appendTo(self);
      var off = $('<div class="light-switch-off"><p class="text">'+settings.off+'</p></div>').appendTo(self);
      if (settings.borderRadius > 0) {
        on.css({'-moz-border-radius': settings.borderRadius, 'border-radius': settings.borderRadius});
        divider.css({'-moz-border-radius': settings.borderRadius, 'border-radius': settings.borderRadius});
        off.css({'-moz-border-radius': settings.borderRadius, 'border-radius': settings.borderRadius});
      }
      on.css({
        '-moz-border-radius-bottomright': 0, '-moz-border-radius-topright': 0, 
        'border-bottom-right-radius': 0, 'border-top-right-radius': 0
      });
      off.css({
        '-moz-border-radius-bottomleft': 0, '-moz-border-radius-topleft': 0, 
        'border-bottom-left-radius': 0, 'border-top-left-radius': 0
      }); 
      
      var width = Math.max(on.outerWidth(), off.outerWidth());
      var heightPadding = divider.outerHeight() - divider.height();
      on.css({'padding-left': 0, 'padding-right': 0});
      off.css({'padding-left': 0, 'padding-right': 0});
      var onSpacing = on.outerWidth() - on.width();
      var offSpacing = off.outerWidth() - off.width();
      var dividerSpacing = divider.outerWidth() - divider.width();
      var onMinWidth = onSpacing + Math.max(parseInt(on.css('border-bottom-left-radius').split(" ")[0]), parseInt(on.css('border-top-left-radius').split(" ")[0]));      
      var offMinWidth = offSpacing + Math.max(parseInt(off.css('border-bottom-right-radius').split(" ")[0]), parseInt(off.css('border-top-right-radius').split(" ")[0]));
      on.children().css({'padding-right': onMinWidth + onSpacing - 1 });
      off.children().css({'padding-left': offMinWidth + offSpacing - 1 });
      divider.width(Math.max(onMinWidth + onSpacing + offMinWidth + offSpacing - dividerSpacing, divider.width())).height(Math.max(on.height(), off.height()) + 4);
      self.width(width + divider.outerWidth() + onMinWidth + offMinWidth);
      self.children().css({float: 'left', overflow: 'hidden'});
      divider.css({'margin-right': -(offMinWidth + offSpacing), 'margin-left': -(onMinWidth + onSpacing), position: 'relative'});
      var switchedOn = settings.input ? settings.input.is(":checked") : true;
      (switchedOn ? on : off).width(width);
      (switchedOn ? off : on).width(switchedOn ? offMinWidth : onMinWidth);
      var toggle = function() {
        switchedOn = !switchedOn;
        if (settings.input) settings.input.attr("checked", switchedOn);
        (switchedOn ? on : off).animate({ width: width }, 150);
        (switchedOn ? off : on).animate({ width: switchedOn ? offMinWidth : onMinWidth }, 150);
        settings.onToggle(switchedOn);
        return false;
      };
      self.click(toggle);
    });
  }
})(jQuery);
