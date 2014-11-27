var serverUrl = "http://192.168.1.41",
	facebookID = "",
	videoMarkers = [],
	nextVideo = [],
	videoSource = new Array(),
	videoCount,
	count = 1;

var idFb = {

	initID: function(id){
		facebookID = id;
		init();
	}
}

function getDatas(callback){
	$.ajax({
	  dataType: "json",
	  url: serverUrl + ":3000/video",
	  type: "GET",
	  success: function(data){
	  	callback.call(this, data);
	  }
	});	

}

function parseDatas(data, callback){
	var o = {};
	
	for(i = 0; i < data.length; i++){
		if (!data[i].idFirstVideo.length) {
			if (o[data[i]._id] === undefined) o[data[i]._id] = []; 
			o[data[i]._id].push(data[i]);
		}
		else {
			if (o[data[i].idFirstVideo] === undefined) o[data[i].idFirstVideo] = [];
			o[data[i].idFirstVideo].push(data[i]);
		}

	}
	callback.call(this, o)

}

function countData(dataParse){
	for(var i in dataParse){
		dataParse[i].reverse();
		if(dataParse[i].length <= 10){
			createSource(dataParse[i]);
		}
	}
}

function createSource(videos){
	for(var i in videos){
		videoSource[i] = serverUrl + ":8888/CadExq/App/node/uploads/" + videos[i].fileName;
	}
	videoCount = videoSource.length;
	document.getElementById("video").setAttribute("src",videoSource[0]);
}


document.getElementById('video').addEventListener('ended',myHandler,false);

function myHandler() {
	if(count == (videoCount)){
		video.pause();
	}
	else{
		console.log(count);
		videoPlay(count);
		count++;
	}      
}

function videoPlay(videoNum)
{
	document.getElementById("video").setAttribute("src", videoSource[videoNum]);
	document.getElementById("video").load();
	document.getElementById("video").play();
}


var init = function(){
	getDatas(function(data){
		if(data){
				parseDatas(data, function(dataParse){
					countData(dataParse);
				});
		} else{
			console.log("Can't get datas from server, check server conectivity");
		}
		
	});
};