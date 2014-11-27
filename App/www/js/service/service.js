app.factory('videosFactory', function($http) {
    var serverURL = "http://192.168.1.41";
    // var videos = [];

    return {
        videos: [],

        // Get Videos from server
        getVideos: function() {
            var self = this;
            // self.videos = [];
            // Get datas from server
            return $http({
                url: serverURL + ":3000/video",
                method: 'GET'
            }).success(function(data) {
                self.videos = data;
            })
        },

        // Add video (here, launch get data again)
        addVideo: function(video) {
            this.getVideos();
        }
    }
})