app.factory('videosFactory', function($http) {
    var serverURL = "http://10.30.1.49:3000";
    // var videos = [];

    return {
        videos: [],

        getVideos: function() {
            var self = this;
            // self.videos = [];
            return $http({
                url: serverURL + "/video",
                method: 'GET'
            }).success(function(data) {
                self.videos = data;
                console.log('self.videos', self.videos);
            })
        },

        addVideo: function(video) {
            this.getVideos();
        }
    }
})