const list_package_utility_js = ["src/js/module/*/index.js"];
 
const list_full_css =  [ 

"src/scss/base/_default_web.scss",
"src/scss/base/_default_root.scss",
"src/scss/element/*.scss",
"src/scss/utility/*.scss",
"src/scss/modules/*.scss",
"src/scss/theme/default/*.scss",

];

exports.module=function (grassconf) {

    const grass_concat = grassconf.require("grass_concat");

    const packpier = grassconf.require("packpier");
    const {cjsToEsmFileNameOnly, cjsToEsmconvertExportToRequire} = grassconf.require("pirate-pack-js");
    const {sassTocss} = grassconf.require("pirate-pack-css");
    grassconf.load("web_iife", function () {

        return packpier(
            grassconf.event(),
            {"input": {
                "modules": {
                    "replaces": {
                        "structkit": "_stk",
                        "comptsjs":""
                    }
                },
                "path": list_package_utility_js
            },
            "output": {
                "type": "iife",
                "globalName":"dzw",
            },
                "plugin": []
            }
        )
            .pipe(grass_concat("dist/js/dezainiwa-web.js", {
                "istruncate": true
            }));

    });

    grassconf.load("web_css", function () {

        return packpier(
            grassconf.event(),
            {"input": {
                "modules": {},
                "path": list_full_css
            },
            "output": {
                "type": "other",
            },
                "plugin": [sassTocss()]
            }
        )
            .pipe(grass_concat("dist/css/dezainiwa-web.css", {
                "istruncate": true
            }));

    });

};

exports.execute=function (lib) {

    lib.default=function (strm) {
        strm.series("web_css");
        strm.series("web_iife");

    };

    return lib;

};

