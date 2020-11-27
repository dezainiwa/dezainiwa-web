
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

var list_package_css =  [ 
//    "src/css/dezainiwa.css",
//    "src/css/dezainiwa-themes-basic.css",
"src/css/base.css",
"src/css/layout.css",
//  "src/css/component/*",
//  "src/css/content/*",
//  "src/css/utility/*",    
  
  
  ];
  



exports.module=function(grassconf){   
var grass_concat = grassconf.require("grass_concat")
var grass_composer = grassconf.require("grass_composer");

        grassconf.load("js",function(){
                    
          return grassconf.src(list_package_js)
            .pipe(grass_composer( {
              "banner":{
                  "header":"(function(window){ \n" +
                  " /** \n" +
                  " /* This program was writtern by pein freccs. \n" +
                  " /* Please check my repository for more details and update \n" +
                  " /* https://github.com/compts/dezainiwa \n"+
                  " **/ \n",
                  "footer":"\n })(window);"
              }
            } ) )
        .pipe(grass_concat(__dirname+"/dist/js/dezainiwa.js",{
          istruncate:true
        }) );


        })
        grassconf.load("js_ext",function(){
            
              return grassconf.src(list_package_extension_js)
                .pipe(grass_composer( {
                  "banner":{
                      "header":"(function(window){ \n" +
                      " /** \n" +
                      " /* This program was writtern by pein freccs. \n" +
                      " /* Please check my repository for more details and update \n" +
                      " /* https://github.com/compts/dezainiwa \n"+
                      " **/ \n",
                      "footer":"\n })(window);"
                  }
                } ) )
            .pipe(grass_concat(__dirname+"/dist/js/dezainiwa-extension.js",{
              istruncate:true
             }) );
            

        })

        grassconf.load("css",function(test){

          
              return grassconf.src(list_package_css)
            .pipe(grass_concat(__dirname+"/dist/css/dezainiwa.css",{
              istruncate:true
             }) );
        });
 } 

exports.execute=function( lib ){   
  lib.default=function(strm){
    strm.series("js").series("js_ext").series("css");
  }
   
     
 return lib;    
}       
  
