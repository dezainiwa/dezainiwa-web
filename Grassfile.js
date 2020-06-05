var list_package_js =  [
    "src/js/globals.js",
    "src/js/dom_loader.js",
    "src/js/support_library.js", 
    "src/js/ext_test.js", 
    "src/js/ext_skylabel.js",
    "src/js/ext_skybox.js",
    "src/js/ext_dialog.js",
    "src/js/ext_datetimebox.js",
    "src/js/ext_intable.js",
    "src/js/ext_lazycard.js",
    "src/js/ext_dropfile.js",
    
    
];

var list_package_css =  [ 
    "src/css/dezainiwa.css",
    "src/css/dezainiwa-themes-basic.css",
    
    
    ];
    
exports.module=function(grassconf){   

  
    
      
        grassconf.load("js",function(grsm){
      
            grsm.setDirectory({
                "srcDir":list_package_js,
                "destDir":__dirname+"/dist/js"
              });
              grsm.pipe("grass_composer",{
                "banner":{
                    "header":"(function(window){ \n" +
                    " /** \n" +
                    " /* This program was writtern by pein freccs. \n" +
                    " /* Please check my repository for more details and update \n" +
                    " /* https://github.com/codehyouka/dezainiwa \n"+
                    " **/ \n",
                    "footer":"\n })(window);"
                }
              })
              grsm.pipe("grass_concat",__dirname+"/dist/js/dezainiwa.js");
             
          })

          
      
          grassconf.load("css",function(grsm){
      
            grsm.setDirectory({
                "srcDir":list_package_css,
                "destDir":__dirname+"/dist/css/"
              });
              var local_filename = __dirname+"/dist/css/dezainiwa.css";
              grsm.pipe("grass_concat",local_filename);
      
          });

    } 
      
exports.execute=function(){   
      
      
        return ['js','css']
      }     
        
      