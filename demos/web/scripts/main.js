$(function() {
  console.log(Camera);
  $('#initCamerButton').on('click', function(e) {
    e.preventDefault();
    Camera.GetVersion(function(resp) {
      console.log(resp);
      Camera.StartRecMode(function(_resp) {
        console.log(_resp);
      });
    });
  });

  $('#getEventButton').on('click', function(e) {
    e.preventDefault();
    Camera.GetEvent(function(resp) {
      console.log(resp);
      $('#debugOutput').text(JSON.stringify(resp));
    });
  });

  $('#startLiveviewBtn').on('click', function(e) {
    e.preventDefault();
    Camera.StartLiveview(function(resp) {
      console.log(resp);
    });
  });

  $('#stopLiveviewBtn').on('click', function(e) {
    e.preventDefault();
    console.log(Camera);
    Camera.StopLiveview(function(resp) {
      console.log(resp);
    });
  });

  $('#bodyactTakePictureBtn').on('click', function(e) {
    e.preventDefault();
    Camera.ActTakePicture(function(resp) {
      console.log(resp);
    });
  });

  $('#bodyactTakeSelfieBtn').on('click', function(e) {
    e.preventDefault();
    var amount = document.getElementById("numberOfSelfies").value;

    function takeselfie(amount) {
      if (amount !== 0) {
        Camera.ActTakePicture(function(resp) {
          console.log(resp);
          takeselfie(--amount);
        });
      } else {
        alert("Done");
      }
      takeselfie(amount);
    };
  });

  $('#bodystartBulbShootingBtn').on('click', function(e) {
    e.preventDefault();
    Camera.StartBulbShooting(function(resp) {
      startBulbStopWatch();
      console.log(resp);
    });
  });
  $('#bodystopBulbShootingBtn').on('click', function(e) {
    e.preventDefault();
    Camera.StopBulbShooting(function(resp) {
      console.log(resp);
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
      console.log(secondsDifference);
    }, 1000);
  }

  function stopBulbStopWatch() {
    clearInterval(bulbInterval);
  }
});
