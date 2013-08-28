var Builder = require('component-builder'),
    path = require('path'),
    reworkVars = require('rework-vars')
    reworkMath = require('rework-math')
    componentStyl = require('component-styl')
    fs = require('fs'),
    exists = fs.existsSync || path.existsSync;

var out = 'build';
var dir = process.cwd();

// rebuilding

var output = {};

function rebuild(done) {

  var builder = new Builder(dir);
  var plugins = [reworkMath(), reworkVars()];

  componentStyl.plugins = plugins

  builder.use(componentStyl);

  builder.addSourceURLs();
  builder.prefixUrls('./');
  builder.copyAssetsTo(out);

  builder.build(function(err, obj) {
    if (err) return done(err);

    output.js = obj.require + obj.js;
    output.css = obj.css;
    fs.writeFileSync(out + '/build.css', output.js);
    fs.writeFileSync(out + '/build.css', output.css);
    done();
  });
}
rebuild(function(){
  console.log('done')
});
