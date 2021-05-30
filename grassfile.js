
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
"src/scss/utility/*.scss",
"src/scss/theme/default/*.scss",

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

    grassconf.load("inline_scss_import",function(_){

      return grassconf.src(list_full_css)
        .pipe( 
          grassconf.streamPipe( function( data ){
           
            var data_update_path = data.path.replace(/(src[\/\\]scss[\/\\])/g,function(s,s1){  
              return "";
            }).replace(/([\/\\])/g,"/");
            
            var data_update_path_split =  data_update_path.split("/");

            data_update_path_split[data_update_path_split.length -1] = data_update_path_split[data_update_path_split.length -1].replace(/(^_)/g,"")
           
            data.writeData('@import "'+data_update_path_split.join("/")+'";\n');
            data.done();
          } )
        )
        .pipe(grass_concat(__dirname+"/src/scss/_index.scss",{
          istruncate:true
          }));
      });

}

exports.execute=function( lib ){   
  lib.default=function(strm){
    strm.series("full_css");
    strm.series("inline_scss_import");
  }

 return lib;
}

