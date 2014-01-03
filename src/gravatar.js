/*
 * gravatar
 * 
 *
 * Copyright (c) 2013 Emiliano Zilocchi
 * Licensed under the MIT license.
 */

(function ($) {

  $.gravatar = function (options) {
    $.ajax({
      method: "GET",
      dataType: "JSONP",
      crossDomain: true,
      url: 'http://en.gravatar.com/' + options.profile + '.json',
      success: function(response) {
        var profile = response.entry[0];
        options.success(profile);
      },
      complete: options.complete,
      error: options.error
    });
  };

  $.fn.gravatar = function (profile) {
    var that = this;
    var options = {
      profile: profile,
      success: function(profile) {
        that.each(function () {
          $(this).find('.displayName').text(profile.displayName);
        });
      }
    };
    $.gravatar(options);
    return this.each(function () { $(this); });
  };

}(jQuery));
