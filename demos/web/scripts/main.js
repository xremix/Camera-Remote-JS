$(function() {
	function consolelog(t){
		$('#debugOutput').text($('#debugOutput').text() + "\n" + JSON.stringify(t));
	}

	function showImageFromResponse(resp){
		try {
			// var resp = {"result":[["http://192.168.122.1:8080/postview/pict20200520_080827_0.JPG"]],"id":1};
			if(resp.result){
				var path = resp.result[0][0];
				$('#previewimage').attr('src', path);
			}
		} catch (e) {

		}
	}

  consolelog(Camera);
  $('#initCamerButton').on('click', function(e) {
    e.preventDefault();
    Camera.GetVersion(function(resp) {
      consolelog(resp);
      Camera.StartRecMode(function(_resp) {
        consolelog(_resp);
      });
    });
  });

  $('#getEventButton').on('click', function(e) {
    e.preventDefault();
    Camera.GetEvent(function(resp) {
      consolelog(resp);
      consolelog(JSON.stringify(resp));
    });
  });

  $('#startLiveviewBtn').on('click', function(e) {
    e.preventDefault();
    Camera.StartLiveview(function(resp) {
      consolelog(resp);
    });
  });

  $('#stopLiveviewBtn').on('click', function(e) {
    e.preventDefault();
    consolelog(Camera);
    Camera.StopLiveview(function(resp) {
      consolelog(resp);
    });
  });

  $('#bodyactTakePictureBtn').on('click', function(e) {
    e.preventDefault();
    Camera.ActTakePicture(function(resp) {
      consolelog(resp);
			showImageFromResponse(resp);
    });
  });

  $('#bodyactTakeSelfieBtn').on('click', function(e) {
    e.preventDefault();

    var amount = document.getElementById("numberOfSelfies").value;
    var timeout = document.getElementById("selfieDelay").value * 1000;
    var backupSelfie = document.getElementById("backupSelfie").value;
		consolelog("Selfie time");
		consolelog("amount:");
		consolelog(amount);
		consolelog("timeout:");
		consolelog(timeout);
		consolelog("backupSelfie:");
		consolelog(backupSelfie);

		function takeselfie(amount) {
			consolelog("Taking selfie after delay");
			if (amount !== 0) {
				setTimeout(function(){
					consolelog("Selfie starting");
					Camera.ActTakePicture(function(resp) {
						consolelog("Selfie done, " + amount + " selfies left");
						consolelog(resp);
						showImageFromResponse(resp);
						takeselfie(--amount);
					});
				}, timeout)
			} else {
				alert("Done");
			}
		}

		function backupselfie(amount) {
			consolelog("Starting backup selfie (which has a different delay method)");
			function myLoop() {
				setTimeout(function() {
					consolelog("Taking picture and waiting for response");
					//////////
					Camera.ActTakePicture(function(resp) {
						consolelog("Selfie done, " + amount + " selfies left");
						consolelog(resp);
						showImageFromResponse(resp);
						takeselfie(--amount);
					});
					//////////
					if (--amount !== 0) {
						myLoop();
					}else{
						alert("done")
					}
				}, timeout)
			}

			myLoop();
		}
		if(backupSelfie == true || backupSelfie == 'on' || backupSelfie == 'yes'){
			backupselfie(amount);
		}else{
		takeselfie(amount);
		}

  });

  $('#bodystartBulbShootingBtn').on('click', function(e) {
    e.preventDefault();
    Camera.StartBulbShooting(function(resp) {
      startBulbStopWatch();
      consolelog(resp);
    });
  });
  $('#bodystopBulbShootingBtn').on('click', function(e) {
    e.preventDefault();
    Camera.StopBulbShooting(function(resp) {
      consolelog(resp);
			showImageFromResponse(resp);
      stopBulbStopWatch();
    });
  });


  var bulbInterval;

  function startBulbStopWatch() {
    var _date = new Date();
    bulbInterval = setInterval(function() {
      var timeDifference = (_date - new Date());
      var secondsDifference = Math.round(timeDifference / 1000) * -1;
      $('#stopWatchValue').text(secondsDifference + "s");
      consolelog(secondsDifference);
    }, 1000);
  }

  function stopBulbStopWatch() {
    clearInterval(bulbInterval);
  }
});
