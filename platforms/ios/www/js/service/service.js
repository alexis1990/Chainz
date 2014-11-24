app.factory('videosFactory', function($http) {
   var serverURL = "http://10.30.2.238:3000";
   return{
      getVideos : function() {
          return $http({
              url: serverURL + "/video",
              method: 'GET'
          })
      }
   }
})
