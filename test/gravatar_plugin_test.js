(function($) {

  module('Render gravatar profile info', {
    setup: function() {
      this.fixture = $('#qunit-fixture');
      this.profile = 'myProfile';

      this.expectedDisplayName = 'My Name';
      this.expectedThumbnailUrl = 'my/thumbnail/url';

      var expectedProfile = {
        displayName: this.expectedDisplayName,
        thumbnailUrl: this.expectedThumbnailUrl
      };

      this.response = { entry: [ expectedProfile ] };
    }
  });

  test('display name', function() {
    expect(1);
    this.stub($, 'ajax').yieldsTo('success', this.response);

    var myGravatar = this.fixture.find('#profile-with-image-thumbnail .gravatar').gravatar(this.profile);

    var displayName = myGravatar.find('.displayName').text();

    equal(displayName, this.expectedDisplayName, 'should render the displayName');
  });

  test('thumbnail url on image element', function() {
    expect(1);
    this.stub($, 'ajax').yieldsTo('success', this.response);

    var myGravatar = this.fixture.find('#profile-with-image-thumbnail .gravatar').gravatar(this.profile);

    var thumbnailUrl = myGravatar.find('img.thumbnailUrl').attr('src');

    equal(thumbnailUrl, this.expectedThumbnailUrl, 'should render the thumbnail url');
  });

  test('thumbnail url on div element', function() {
    expect(1);
    this.stub($, 'ajax').yieldsTo('success', this.response);

    var myGravatar = this.fixture.find('#profile-with-div-thumbnail .gravatar').gravatar(this.profile);

    var thumbnailUrlContainer = myGravatar.find('div.thumbnailUrl');
    var thumbnailUrl = thumbnailUrlContainer.find('img').attr('src');

    equal(thumbnailUrl, this.expectedThumbnailUrl, 'should render the thumbnail url');
  });

}(jQuery));
