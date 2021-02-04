
var list_package_js =  [
  "src/js/globals.js",
  "src/js/dom_loader.js",
  "src/js/support_library.js",   
];
var list_package_extension_js =  [
  "src/js-ext/globals.js",
  "src/js-ext/dom_loader.js",
  "src/js-ext/support_library.js", 
  "src/js-ext/ext_test.js", 
  "src/js-ext/ext_skylabel.js",
  "src/js-ext/ext_skybox.js",
  "src/js-ext/ext_dialog.js",
  "src/js-ext/ext_datetimebox.js",
  "src/js-ext/ext_intable.js",
  "src/js-ext/ext_lazycard.js",
  "src/js-ext/ext_dropfile.js",
  
  
];

var list_full_css =  [ 

"src/scss/base/_default_web.scss",
"src/scss/base/_default_root.scss",
"src/scss/element/*.scss",

];


exports.module=function(grassconf){   
var grass_concat = grassconf.require("grass_concat")
var grass_sass = grassconf.require("grass_sass");

        grassconf.load("full_css",function(_){

              return grassconf.src(list_full_css)
             .pipe(grass_sass({}))
           .pipe(grass_concat(__dirname+"/dist/css/dezainiwa_full.css",{
              istruncate:true
             }) );
        });
 }

exports.execute=function( lib ){   
  lib.default=function(strm){
    strm.series("full_css");
  }

 return lib;
}

