var cam = require('../app/scripts/Camera');
console.log(cam);
cam.GetVersion(function(resp){
	console.log(resp);
	console.log("---------------------------");
});
