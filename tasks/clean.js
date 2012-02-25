var path = require('path');
var rimraf = require('rimraf');

task.registerBasicTask('clean', 'Removes a directory and its contents.', function(data, name) {
  var done = this.async();

  var dir = path.resolve(data);
  verbose.writeln('Cleaning ' + dir);

  task.helper('clean', dir, function(err) {
    done(err);
  });
});

task.registerHelper('clean', function(dir, fn) {
  rimraf(dir, function(err) {
    if (err) {
      log.error(err);
    }
    fn(err);
  });
});
