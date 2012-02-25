var coffee = require('coffee-script');

task.registerBasicTask('coffee', 'Compile CoffeeScript files into a single JavaScript file.', function (data, name) {
  var done = this.async();

  var options = config('coffeeopts') || {};
  verbose.writeflags(options, 'Options');

  async.concat(file.expand(data), function(filepath, fn) {
    verbose.writeln('Compiling ' + filepath);
    var opts = underscore.extend(options, {filename: filepath});
    var javascript = task.helper('coffee', file.read(filepath), opts);
    fn(!javascript, javascript);
  }, function(err, javascript) {
    if (!err) {
      file.write(name, javascript.join('\n'));
      log.writeln('File "' + name + '" created.');
    }
    done(err);
  });
});

task.registerHelper('coffee', function(coffeescript, options) {
  try {
    var javascript = coffee.compile(coffeescript, options);
    return javascript;
  } catch (e) {
    log.error(e);
    return null;
  }
});
