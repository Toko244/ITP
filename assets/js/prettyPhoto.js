(function (window, document, undefined) {
  var strings = {
    dataState: "data-state",
    scrubberSetTo: "Scrubber set to ",
    volume100: "Volume set to 100 percent",
    volumeSetTo1: "Volume set to ",
    volumeSetTo2: "0 percent.",
    mute: "Mute",
    muted: "Muted",
    unmute: "Unmute",
    unmuted: "unmuted",
    videoMuted: "Video muted.",
    videoUnmuted: "Video unmuted.",
    track: "track",
    jsTrack: "js-track",
    trackSetTo: "Track set to ",
    trackOff: "Track off.",
    play: "Play",
    pause: "Pause",
    nowPlaying: "Now playing ",
    pausedVideo: "Paused video.",
    videoEnded: "Video ended.",
    seconds: "seconds",
    minutes: "minutes",
    hours: "hours",
    days: "days",
  };

  var selectors = {
    vimeoPlayer: "#vimeo-player",
    toggleBtn: "#toggle-btn",
    scrubber: "#scrubber",
    volume: "#volume",
    mute: "#mute",
    tracks: "#tracks",
    setTrack: "#set-track",
    trackOff: "#track-off",
    jsTrack: "." + strings.jsTrack,
    announcements: "#announcements",
  };

  var vimeoPlayer = document.querySelector(selectors.vimeoPlayer),
    toggleButton = document.querySelector(selectors.toggleBtn),
    scrubber = document.querySelector(selectors.scrubber),
    volume = document.querySelector(selectors.volume),
    muteBtn = document.querySelector(selectors.mute),
    trackSelect = document.querySelector(selectors.tracks),
    setTrackBtn = document.querySelector(selectors.setTrack),
    trackOffBtn = document.querySelector(selectors.trackOff),
    announcements = document.querySelector(selectors.announcements),
    currentVolume = 1,
    videoTitle = "",
    player = new Vimeo.Player(vimeoPlayer);

  /*
   * Play/pause
   */
  var toggleVideo = function (e) {
    var state = e.target.getAttribute(strings.dataState);

    if (state === strings.pause.toLowerCase()) {
      player
        .play()
        .then(function () {})
        .catch(function (error) {
          switch (error.name) {
            case "PasswordError":
              break;
            case "PrivacyError":
              break;
            default:
              break;
          }
        });
    } else {
      player
        .pause()
        .then(function () {})
        .catch(function (error) {
          switch (error.name) {
            case "PasswordError":
              break;
            case "PrivacyError":
              break;
            default:
              break;
          }
        });
    }
  };

  /*
   * Scrubber
   */
  var scrubVideo = function (e) {
    player
      .setCurrentTime(e.target.value)
      .then(function (seconds) {
        announcements.textContent =
          strings.scrubberSetTo + getFriendlyDuration(seconds);
      })
      .catch(function (error) {
        switch (error.name) {
          case "RangeError":
            break;
          default:
            break;
        }
      });
  };

  player
    .getDuration()
    .then(function (duration) {
      scrubber.setAttribute("max", duration);
    })
    .catch(function (error) {});

  /*
   * Volume
   */
  var updateVolume = function (e, value) {
    var newValue = e ? e.target.value : value;

    player
      .setVolume(newValue)
      .then(function (volume) {
        var friendlyVolume = "";

        switch (volume) {
          case "1":
            friendlyVolume = strings.volume100;
            break;
          case "0":
            friendlyVolume = strings.muted;
            break;
          default:
            friendlyVolume =
              strings.volumeSetTo1 +
              volume.replace("0.", "") +
              strings.volumeSetTo2;
        }
        announcements.textContent = friendlyVolume;
      })
      .catch(function (error) {
        switch (error.name) {
          case "RangeError":
            break;
          default:
            break;
        }
      });
  };

  var muteVolume = function (e) {
    var state = e.target.getAttribute(strings.dataState);

    if (state === strings.unmuted) {
      currentVolume = volume.value;
      updateVolume(null, 0);
      volume.value = 0;
      e.target.setAttribute(strings.dataState, strings.muted.toLowerCase());
      e.target.textContent = strings.unmute;
      announcements.textContent = strings.videoMuted;
    } else {
      updateVolume(null, currentVolume);
      volume.value = currentVolume;
      e.target.setAttribute(strings.dataState, strings.unmuted);
      e.target.textContent = strings.mute;
      announcements.textContent = strings.videoUnmuted;
    }
  };

  /*
   * Tracks
   */
  player
    .getTextTracks()
    .then(function (tracks) {
      var tracksLength = tracks.length,
        trackOptions = "",
        i = 0;

      for (; i < tracksLength; i++) {
        trackOptions =
          trackOptions +
          '<li><label lang="' +
          tracks[i].language +
          '"><input class="' +
          strings.jsTrack +
          '" type="radio" name="' +
          strings.track +
          '" value="' +
          tracks[i].language +
          '"> ' +
          tracks[i].label +
          "</label></li>";
      }

      trackSelect.innerHTML = trackOptions;
    })
    .catch(function (error) {});

  var setTrack = function () {
    var tracks = document.querySelectorAll(selectors.jsTrack),
      tracksLength = tracks.length,
      selectedTrack = "",
      i = 0;

    for (; i < tracksLength; i++) {
      if (tracks[i].checked) {
        selectedTrack = tracks[i].value;
      }
    }

    player
      .enableTextTrack(selectedTrack)
      .then(function (track) {
        announcements.innerHTML =
          strings.trackSetTo +
          ' <span lang="' +
          track.language +
          '">' +
          track.label +
          "</span>";
      })
      .catch(function (error) {
        switch (error.name) {
          case "InvalidTrackLanguageError":
            break;
          case "InvalidTrackError":
            break;
          default:
            break;
        }
      });
  };

  var trackOff = function () {
    var tracks = document.querySelectorAll(selectors.jsTrack),
      tracksLength = tracks.length,
      i = 0;

    for (; i < tracksLength; i++) {
      tracks[i].checked = false;
    }

    player
      .disableTextTrack()
      .then(function () {
        announcements.textContent = strings.trackOff;
      })
      .catch(function (error) {});
  };

  /*
   * Events
   */
  player.on("timeupdate", function (data) {
    scrubber.value = Math.round(data.seconds);
  });

  player.on("play", function (data) {
    toggleButton.setAttribute(strings.dataState, strings.play.toLowerCase());
    toggleButton.textContent = strings.pause;
    announcements.textContent = strings.nowPlaying + videoTitle;
  });

  player.on("pause", function (data) {
    toggleButton.setAttribute(strings.dataState, strings.pause.toLowerCase());
    toggleButton.textContent = strings.play;
    announcements.textContent = strings.pausedVideo;
  });

  player.on("ended", function (data) {
    toggleButton.setAttribute(strings.dataState, strings.pause.toLowerCase());
    toggleButton.textContent = strings.play;
    announcements.textContent = strings.videoEnded;
    scrubber.value = 0;
  });

  player
    .getVideoTitle()
    .then(function (title) {
      videoTitle = title;
    })
    .catch(function (error) {});

  /*
   * Utility
   */

  // http://stackoverflow.com/a/12420737
  var getFriendlyDuration = function (seconds) {
    var dur = {},
      nonZero,
      units = [
        {
          label: strings.seconds,
          mod: 60,
        },
        {
          label: strings.minutes,
          mod: 60,
        },
        {
          label: strings.hours,
          mod: 24,
        },
        {
          label: strings.days,
          mod: 31,
        },
      ];

    units.forEach(function (u) {
      seconds = (seconds - (dur[u.label] = seconds % u.mod)) / u.mod;
    });

    nonZero = function (u) {
      return dur[u.label];
    };

    dur.toString = function () {
      return units
        .reverse()
        .filter(nonZero)
        .map(function (u) {
          return (
            dur[u.label] +
            " " +
            (dur[u.label] == 1 ? u.label.slice(0, -1) : u.label)
          );
        })
        .join(", ");
    };

    return dur.toString();
  };

  /*
   * Event listeners
   */
  toggleButton.addEventListener("click", toggleVideo, false);
  scrubber.addEventListener("change", scrubVideo, false);
  scrubber.addEventListener("input", scrubVideo, false);
  volume.addEventListener("change", updateVolume, false);
  volume.addEventListener("input", updateVolume, false);
  muteBtn.addEventListener("click", muteVolume, false);
  setTrackBtn.addEventListener("click", setTrack, false);
  trackOffBtn.addEventListener("click", trackOff, false);
})(window, document);
