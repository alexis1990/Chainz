var loginButton = $('.loginFB');
 
loginButton.on('click', function(e) {
  e.preventDefault();
 
  FB.login(function(response) {
    if (response.status === 'connected') {
      alert('logged in');
    } else {
      alert('not logged in');
    }
  },{ scope: "email" });
 
});