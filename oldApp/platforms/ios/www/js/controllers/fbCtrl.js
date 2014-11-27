app.controller('loginFBCtrl', function($scope, $cordovaCapture, $http, $location) {
  // Defaults to sessionStorage for storing the Facebook token
   openFB.init({appId: '815521748506459'});

  //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
  //  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});

  $scope.login = function() {
      openFB.login(
              function(response) {
                  if(response.status === 'connected') {
                      console.log(response);
                      getInfo();
                      // alert('Facebook login succeeded, got access token: ' + response.authResponse.token);
                  } else {
                      alert('Facebook login failed: ' + response.error);
                  }
              }, {scope: 'email,read_stream,publish_stream'});
  }

  function getInfo () {
      openFB.api({
          path: '/me',
          success: function(data) {
              console.log(JSON.stringify(data));
              $scope.$emit('fbID', JSON.stringify(data.id));
              $location.path('./playlists');
              // document.getElementById("userName").innerHTML = data.name;
              // document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
          },
          error: function(){
            console.log('you are not connect');
          }
      });
  }

  $scope.logout = function() {

        openFB.logout(
                function() {
                    alert('Logout successful');
                },
                errorHandler);
    function errorHandler(error) {
        alert(error.message);
    }
  }

})
