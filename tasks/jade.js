var jade = require('jade');
var path = require('path');

// Compiles Jade templates into HTML. Each input file is renamed with a '.html'
// extension. The task name specifies the output directory. Options are
// specified via 'jadeopts'.
task.registerBasicTask('jade', 'Compile Jade templates into HTML.', function(data, name) {
  var options = config('jadeopts') || {};
  verbose.writeflags(options, 'Options');

  file.expand(data).forEach(function (filepath) {
    var opts = underscore.extend(options, {filename: filepath});
    var html = task.helper('jade', file.read(filepath), opts);

    var basename = path.basename(filepath);
    var extname = path.extname(filepath);
    var htmlname = basename.substring(0, basename.length - extname.length) + '.html';
    var outpath = path.join(name, htmlname);
    file.write(outpath, html);

    log.writeln('File "' + outpath + '" created.');
  });
});

task.registerHelper('jade', function(src, options) {
  var jadeFn = jade.compile(src, options);
  return jadeFn();
});
