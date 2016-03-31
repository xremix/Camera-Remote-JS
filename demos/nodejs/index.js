var cam = require('../../src/Camera');
console.log(cam);
cam.GetVersion(function(resp){
	console.log(resp);
	console.log("---------------------------");
});
