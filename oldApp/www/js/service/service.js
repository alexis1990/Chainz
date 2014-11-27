app.factory('videosFactory', function($http) {
   var serverURL = "http://192.168.1.41:3000";
   return{
      getVideos : function() {
          return $http({
              url: serverURL + "/video",
              method: 'GET'
          })
      }
   }
})
