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
      var expectedUrls = [ this.myGithubUrl, this.myLinkedinUrl ];

      this.myGtalk = {
          "type":"gtalk",
          "value":"myProfile@gmail.com"
        };
      this.mySkype = {
          "type":"skype",
          "value":"my.profile"
        };
      var expectedIms = [ this.myGtalk, this.mySkype ];

      this.expectedEmail = 'myProfile@email.com';
      var emails = [
        {
          "primary": "true",
          "value": this.expectedEmail
        },
        {
          "primary": "false",
          "value": 'justAnother@email.com'
        }
      ];

      var expectedProfile = {
        displayName: this.expectedDisplayName,
        emails: emails,
        thumbnailUrl: this.expectedThumbnailUrl,
        urls: expectedUrls,
        ims: expectedIms
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

  test('ims list', function() {
    expect(4);
    this.stub($, 'ajax').yieldsTo('success', this.response);

    var myGravatar = this.fixture.find('#gravatar-profile .gravatar').gravatar(this.profile);

    var ims = myGravatar.find('.ims ul li');
    var gtalk = ims.first();
    var skype = ims.last();

    equal(gtalk.find('h6').text(), this.myGtalk.type, 'should render type as label');
    equal(gtalk.find('p').text(), this.myGtalk.value, 'should render value as text');
    equal(skype.find('h6').text(), this.mySkype.type, 'should render type as label');
    equal(skype.find('p').text(), this.mySkype.value, 'should render value as text');
  });

  test('email', function() {
    expect(2);
    this.stub($, 'ajax').yieldsTo('success', this.response);

    var myGravatar = this.fixture.find('#gravatar-profile .gravatar').gravatar(this.profile);
    var email = myGravatar.find('.email a');

    var gravatarEmail = email.text();
    equal(gravatarEmail, this.expectedEmail, 'should render the email');

    var mailTo = email.attr('href');
    var expectedMailTo = 'mailto:' + gravatarEmail;
    equal(mailTo, expectedMailTo, 'should set the mailto at href attribute');
  });

}(jQuery));
