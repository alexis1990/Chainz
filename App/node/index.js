var express = require('express'),
    http = require('http'),
    path = require('path'),
    main = require('./main'),
    app = express();

app.use(express.logger("dev"));

app.use(express.bodyParser({
    uploadDir: __dirname + '/uploads',
    keepExtensions: true
}));

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, './uploads')));


app.post('/video', main.addVideos); // url to post new videos
// app.get('/continueVideo/:idFirstVideo', function(req, res) {
//     var idFirstVideo =  req.params.idFirstVideo;
//     res.send("okok" + idFirstVideo);
// }); // url to continue videos
app.get('/video', main.getVideos); // url to get list of videos


app.listen(3000, function () {
    console.log('NodeJs server listening on port 3000');
});
