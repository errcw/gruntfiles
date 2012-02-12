var stylus = require('stylus');

// Compiles one or more stylus files into CSS and writes the result to a file.
// Options are specified via 'stylusopts'.
task.registerBasicTask('stylus', 'Compile Stylus files into a single CSS file.', function(data, name) {
  var done = this.async();

  var options = config('stylusopts') || {};
  verbose.writeflags(options, 'Options');

  async.concat(file.expand(data), function(filepath, fn) {
    verbose.writeln('Compiling ' + filepath);
    var opts = underscore.extend(options, {filename: filepath});
    task.helper('stylus', file.read(filepath), opts, function(err, css) {
      fn(err, css);
    });
  }, function(err, css) {
    if (!err) {
      file.write(name, css.join('\n'));
      log.writeln('File "' + name + '" created.');
    }
    done(err);
  });
});

// Compiles a single stylus file and returns the resulting CSS via a callback.
task.registerHelper('stylus', function(src, options, fn) {
  var s = stylus(src);

  underscore.each(options, function(value, key) {
    s.set(key, value);
  });

  s.render(function(err, css) {
    if (err) {
      log.error(err);
    }
    fn(err, css);
  });
});
