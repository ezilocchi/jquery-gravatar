(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery.gravatar', {
    setup: function() {
      this.options = {
        profile: 'myProfile',
        success: function() {},
        complete: function() {},
        error: function() {}
      };
    }
  });

  test('perform an AJAX request for the given profile', function() {
    expect(5);
    this.spy($, 'ajax');

    $.gravatar(this.options);

    ok($.ajax.calledOnce);
    equal($.ajax.getCall(0).args[0].url, 'http://en.gravatar.com/myProfile.json');
    equal($.ajax.getCall(0).args[0].dataType, 'JSONP');
    equal($.ajax.getCall(0).args[0].crossDomain, true);
    equal($.ajax.getCall(0).args[0].method, 'GET');
  });

  test('call success with the profile information for a successfully request', function() {
    var myProfile = { displayName: 'My Name' };
    var response = { entry: [ myProfile ] };

    this.stub($, 'ajax').yieldsTo('success', response);
    this.mock(this.options).expects('success').calledWith(myProfile);

    $.gravatar(this.options);
  });

  test('call complete after the AJAX request has finished', function() {
    this.stub($, 'ajax').yieldsTo('complete');

    this.mock(this.options).expects('complete').once();

    $.gravatar(this.options);
  });

  test('call error for a unsuccessfully request', function() {
    this.stub($, 'ajax').yieldsTo('error');

    this.mock(this.options).expects('error').once();

    $.gravatar(this.options);
  });

  module('jQuery#gravatar', {
    setup: function() {
      this.fixture = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    strictEqual(this.fixture.gravatar({}), this.fixture, 'should be chainable');
  });

  test('get the gravatar info for the given profile', function() {
    var options = { profile: 'myProfile' };

    this.mock($).expects('gravatar').calledWith(options);

    $('<div class="gravatar"></div>').gravatar(options);
  });

}(jQuery));
