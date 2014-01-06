(function($) {

  module('Render gravatar profile info', {
    setup: function() {
      this.fixture = $('#qunit-fixture');
      this.profile = 'myProfile';

      this.expectedDisplayName = 'My Name';
      this.expectedThumbnailUrl = 'my/thumbnail/url';

      this.myGithubUrl = {
          "value":"http://github.com/myProfileOnGithub",
          "title":"on Github"
        };
      this.myLinkedinUrl = {
          "value":"http://www.linkedin.com/in/myProfileOnLinkedin",
          "title":"on LinkedIn"
        };
      this.expectedUrls = [ this.myGithubUrl, this.myLinkedinUrl ];

      var expectedProfile = {
        displayName: this.expectedDisplayName,
        thumbnailUrl: this.expectedThumbnailUrl,
        urls: this.expectedUrls
      };

      this.response = { entry: [ expectedProfile ] };
    }
  });

  test('display name', function() {
    expect(1);
    this.stub($, 'ajax').yieldsTo('success', this.response);

    var myGravatar = this.fixture.find('#gravatar-profile .gravatar').gravatar(this.profile);

    var displayName = myGravatar.find('.displayName').text();

    equal(displayName, this.expectedDisplayName, 'should render the displayName');
  });

  test('thumbnail url on image element', function() {
    expect(1);
    this.stub($, 'ajax').yieldsTo('success', this.response);

    var myGravatar = this.fixture.find('#gravatar-profile .gravatar').gravatar(this.profile);

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

  test('link list', function() {
    expect(4);
    this.stub($, 'ajax').yieldsTo('success', this.response);

    var myGravatar = this.fixture.find('#gravatar-profile .gravatar').gravatar(this.profile);

    var urls = myGravatar.find('.urls ul li a');
    var githubUrl = urls.first();
    var linkedinUrl = urls.last();

    equal(githubUrl.text(), this.myGithubUrl.title, 'should render the url title as text');
    equal(githubUrl.attr('href'), this.myGithubUrl.value, 'should render the url value as a.href');
    equal(linkedinUrl.text(), this.myLinkedinUrl.title, 'should render the url title as text');
    equal(linkedinUrl.attr('href'), this.myLinkedinUrl.value, 'should render the url value as a.href');
  });

}(jQuery));
