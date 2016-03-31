# Camera-Remote-JS
Access your Sony Camera via Wifi using JavaScript (Node.js or Browser)
A complete platform indipendent JS Library to access the Sony Camera API

`WORK IN PROGRESS`

## Description
Access the Sony Remote Camera API using JavaScript. This will work in Browser or Node.js.


## Status
Currently I work on a demo project to get this running - later this might turn into a library project instead.

## Get started

Run one of the following code form your commandline:
- `gulp` *to compile the code once and every time a file changes*
- `gulp build` *to compile the code once*

A full list of Gulp Tasks can be found in the `Gulpfile.js`

## Usage

Sample:
```JS
Camera.GetVersion(function(resp){
	console.log(resp);
});
```

Available Functions
- exports.Call *Calls any not implemented function, without parameters*
- exports.GetVersion 
- exports.StartRecMode 
- exports.StartLiveview 
- exports.StopLiveview 
- exports.ToggleLiveview 
- exports.ActTakePicture 
- exports.StartBulbShooting 
- exports.StopBulbShooting 
- exports.GetEvent 