(function($) {

  module('Render gravatar profile info', {
    setup: function() {
      this.fixture = $('#qunit-fixture');
      this.profile = 'myProfile';
    }
  });

  test('display name', function() {
    expect(1);

    var expectedName = 'My Name';
    var response = { entry: [ {displayName: expectedName} ] };
    this.stub($, 'ajax').yieldsTo('success', response);

    var myGravatar = this.fixture.find('.gravatar').gravatar(this.profile);

    var displayName = myGravatar.find('.displayName').text();

    equal(expectedName, displayName, 'should render the displayName');
  });

}(jQuery));
