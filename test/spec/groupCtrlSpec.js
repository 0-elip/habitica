'use strict';

describe('Groups Controller', function() {
  var scope, ctrl, groups, user, guild, $rootScope;

  beforeEach(function() {
    module(function($provide) {
      $provide.value('User', {});
    });

    inject(function($rootScope, $controller, Groups){
      user = specHelper.newUser();
      user._id = "unique-user-id";

      scope = $rootScope.$new();

      // Load RootCtrl to ensure shared behaviors are loaded
      $controller('RootCtrl',  {$scope: scope, User: {user: user}});

      ctrl = $controller('GroupsCtrl', {$scope: scope, User: {user: user}});

      groups = Groups;
    });
  });

  it('isMemberOfGroup returns true if guild is included in myGuilds call', function(){

    guild = specHelper.newGroup("leaders-user-id");
    guild._id = "unique-guild-id";
    guild.type = 'guild';
    guild.members.push(user._id);

    var myGuilds = sinon.stub(groups,"myGuilds", function() {
      return [guild];
    });

    expect(scope.isMemberOfGroup(user._id, guild)).to.be.ok;
    expect(myGuilds).to.be.called
  });

  it('isMemberOfGroup does not return true if guild is not included in myGuilds call', function(){

    guild = specHelper.newGroup("leaders-user-id");
    guild._id = "unique-guild-id";
    guild.type = 'guild';

    var myGuilds = sinon.stub(groups,"myGuilds", function() {
      return [];
    });

    expect(scope.isMemberOfGroup(user._id, guild)).to.not.be.ok;
    expect(myGuilds).to.be.called
  });
});
