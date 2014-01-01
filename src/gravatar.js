/*
 * gravatar
 * 
 *
 * Copyright (c) 2013 Emiliano Zilocchi
 * Licensed under the MIT license.
 */

(function ($) {

  $.fn.gravatar = function () {
    return this.each(function () {
      $(this);
    });
  };

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

}(jQuery));
