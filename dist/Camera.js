"use strict";
(function(exports){
    exports.host = '192.168.122.1:8080';
    exports.path = '/sony/camera/';

    function NodeHttpRequest(body, _callback){
    	var http = require('http');

		var options = {
		  host: exports.host,
		  path: exports.path
		};

		var callback = function(response) {
		  var str = '';

		  response.on('data', function (chunk) {
		    str += chunk;
		  });

		  response.on('end', function () {
		    _callback(str);
		    // callback(JSON.parse(str));
		  });
		}
		http.request(options, callback).end();
    }

	function BrowserXMLHttpRequest(body, callback)
	{
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
				var respObj = JSON.parse(xmlHttp.responseText);
				if(callback){
					callback(respObj);	
				}else{
					//Output to console, if no callback available
					console.log(respObj);
				}
				
			}else{
				console.log('http status ' + xmlHttp.status);
			}
		}
		xmlHttp.open("POST", 'http://' + exports.host + exports.path, true);
		xmlHttp.send(JSON.stringify(body));
	}

	exports.httpRequest = function(body, callback, errorCallback){
		if ( typeof XMLHttpRequest !== 'undefined' && !!XMLHttpRequest ){
			BrowserXMLHttpRequest(body, callback, errorCallback);
		}
		else {
			NodeHttpRequest(body, callback, errorCallback);
		}
		
	};


	// Functions

	// Call not implemented Event
	exports.Call = function(event, callback, errorCallback){ 
		exports.httpRequest({
			"version":"1.0",
			"id":1,
			"method":event,
			"params":[]
		}, 
		callback, errorCallback);
	};
	exports.GetVersion = function(callback, errorCallback){ 
		exports.httpRequest({
			"version":"1.0",
			"id":1,
			"method":"getVersions",
			"params":[]
		}, 
		callback, errorCallback);
	};
	exports.StartRecMode = function(callback, errorCallback){ 
		exports.httpRequest({
			"version":"1.0",
			"id":1,
			"method":"startRecMode",
			"params":[]
		}, 
		callback, errorCallback);
	};

	exports.LiveModeActive = false;
	exports.StartLiveview = function(callback, errorCallback){ 
		exports.httpRequest({
			"version":"1.0",
			"id":1,
			"method":"startLiveview",
			"params":[]
		}, 
		callback, errorCallback);
	};
	exports.StopLiveview = function(callback, errorCallback){ 
		exports.httpRequest({
			"version":"1.0",
			"id":1,
			"method":"stopLiveview",
			"params":[]
		}, 
		callback, errorCallback);
	};

	exports.ToggleLiveview = function(callback, errorCallback){
		if(!exports.LiveModeActive){
			exports.StartLiveview(function(resp){
				exports.LiveModeActive = true;
				callback(resp)
			});
		}else{
			exports.StopLiveview(function(resp){
				exports.LiveModeActive = false;
				callback(resp)
			});
		}
	}
	exports.ActTakePicture = function(callback, errorCallback){ 
		exports.httpRequest({
			"version":"1.0",
			"id":1,
			"method":"actTakePicture",
			"params":[]
		}, 
		callback, errorCallback);
	};
	exports.StartBulbShooting = function(callback, errorCallback){ 
		exports.httpRequest({
			"version":"1.0",
			"id":1,
			"method":"startBulbShooting",
			"params":[]
		}, 
		callback, errorCallback);
	};
	exports.StopBulbShooting = function(callback, errorCallback){ 
		exports.httpRequest({
			"version":"1.0",
			"id":1,
			"method":"stopBulbShooting",
			"params":[]
		}, 
		callback, errorCallback);
	};
	exports.GetEvent = function(callback, errorCallback){ 
		exports.httpRequest({
			"method":"getEvent",
			"params":[true],
			"id":1,
			"version":"1.0"
		}, 
		callback, errorCallback);
	};
})(typeof exports === 'undefined' ? this['Camera']={}: exports);