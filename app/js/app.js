var exec            = require('child_process').exec;
var gui             = require('nw.gui');
var dirname         = require('./dirname');
var tempApplication = '~/ICNSTestSampleApp';
var finalPath       = tempApplication + Date.now() + '.app';

var App = {
  go: function (icon) {
    commands =
      [App.removeActualApp(),
      App.moveApp(),
      App.removeExistingApp(),
      App.moveSampleApp(),
      App.moveIcon(icon),
      App.openApp()];

    exec(commands.join(' && '), function (error, stdout, stderr) {
      console.log(error, stdout, stderr);
      gui.App.quit();
    });
  },

  removeActualApp: function () {
    return 'rm -rf ' + tempApplication + '*';
  },

  moveIcon: function (icon) {
    return 'cp "' + icon + '" ' + finalPath + '/Contents/Resources/nw.icns';
  },

  moveApp: function () {
    return 'cp -R /Applications/ICNSTestIcon.app ' + finalPath + '/';
  },

  removeExistingApp: function () {
    return 'rm -rf ' + finalPath + '/Contents/Resources/app.nw';
  },

  moveSampleApp: function () {
    return 'cp -R ' + dirname + '/app.sample.nw ' + finalPath + '/Contents/Resources/app.nw';
  },

  openApp: function () {
    return 'open ' + finalPath;
  },

  quit: function () {
    gui.App.quit();
  }
};

function chooseFile(name) {
  var chooser = document.querySelector(name);

  chooser.addEventListener("change", function (evt) {
    evt.preventDefault();
    App.go(this.value);
  }, false);

  chooser.click();
}

chooseFile('#file-dialog');

// Button
document.getElementById('choose-file').addEventListener('click', function (e) {
  e.preventDefault();
  chooseFile('#file-dialog');
});
