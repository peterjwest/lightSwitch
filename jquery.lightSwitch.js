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
        onToggle: function() {}
      };
      $.extend(settings, options || {});
      var self = $(this).is("input[type=checkbox]") ? $('<div>').insertAfter(settings.input = $(this).hide()) : $(this);
      self.addClass("light-switch").css({float: 'left', cursor: 'pointer'}).children().remove();
      var on = $('<div class="light-switch-on"><p class="text">'+settings.on+'</p></div>').appendTo(self);
      var divider = $('<div class="light-switch-divider"></div>').appendTo(self);
      var off = $('<div class="light-switch-on"><p class="text">'+settings.off+'</p></div>').appendTo(self);
      var width = Math.max(on.outerWidth(), off.outerWidth());
      var heightPadding = divider.outerHeight() - divider.height();
      divider.width(Math.max(4, divider.width())).height(Math.max(on.height(), off.height()) + 4);
      self.width(width + divider.outerWidth() + 8);
      self.children().css({float: 'left', overflow: 'hidden'});
      on.add(off).css({'padding-left': '0px', 'padding-right': '0px'});
      divider.css({margin: '0px -2px', position: 'relative'});
      var switchedOn = settings.input ? settings.input.is(":checked") : true;
      (switchedOn ? on : off).width(width);
      (switchedOn ? off : on).width(1);
      var toggle = function() {
        switchedOn = !switchedOn;
        if (settings.input) settings.input.attr("checked", switchedOn);
        (switchedOn ? on : off).animate({ width: width }, 200);
        (switchedOn ? off : on).animate({ width: 1 }, 200);
        settings.onToggle(switchedOn);
        return false;
      };
      self.click(toggle);
    });
  }
})(jQuery);
