var fs = require('fs'),
    MongoClient = require('mongodb').MongoClient,
    db;

// Create the "uploads" folder if it doesn't exist
fs.exists(__dirname + '/uploads', function (exists) {
    if (!exists) {
        console.log('Creating directory ' + __dirname + '/uploads');
        fs.mkdir(__dirname + '/uploads', function (err) {
            if (err) {
                console.log('Error creating ' + __dirname + '/uploads');
                process.exit(1);
            }
        })
    }
});

// Connect to database
var url = "mongodb://192.168.1.41:27017/CadavreExquis";
MongoClient.connect(url, {native_parser: true}, function (err, connection) {
    if (err) {
        console.log("Cannot connect to database " + url);
        process.exit(1);
    }
    db = connection;
});

// POST: send video taken with phone to DB
exports.addVideos = function(req, res, next) {

    var file = req.files.file,
        filePath = file.path,
        // fileName = file.name, file name passed by client. Not used here. We use the name auto-generated by Node
        lastIndex = filePath.lastIndexOf("/"),
        tmpFileName = filePath.substr(lastIndex + 1),
        image = req.body,
        images = db.collection('videos');

    image.fileName = tmpFileName;
    console.log(tmpFileName);

    images.insert(image, function (err, result) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(image);
    });

};

// // POST: send video taken with phone to DB
// exports.continueVideo = function(req, res, next) {

//     var file = req.files.file,
//         filePath = file.path,
//         // fileName = file.name, file name passed by client. Not used here. We use the name auto-generated by Node
//         lastIndex = filePath.lastIndexOf("/"),
//         tmpFileName = filePath.substr(lastIndex + 1),
//         image = req.body,
//         images = db.collection('videos');

//     image.fileName = tmpFileName;
//     console.log(tmpFileName);

//     images.insert(image, function (err, result) {
//         if (err) {
//             console.log(err);
//             return next(err);
//         }
//         res.json(image);
//     });

// };

// GET: Get list of existing video
exports.getVideos = function(req, res, next) {
    var images = db.collection('videos');

    images.find().sort({ _id: -1 }).limit(20).toArray(function (err, data) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(data);
    });
};

exports.index = function(req, res){
    res.render('index.html');
};




