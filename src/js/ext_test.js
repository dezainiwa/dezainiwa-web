


    execute_plugin("tests",{"test":1,
        details:{
             "extension_execute":function(){},
            "tests":12
        },
        
        _construct:function(dom){
            //console.log(dom())
        },
        _setDetails:function(conf){
            this.details=_ct.varExtend(this.details,conf);
        },
        _call_method_after:function(){

        },
        _call_method_before:function(){

        },
        _init:function(){
            alert("test")
           // console.log(this,this.details)
            },
         _return_method:function(){
             this.details.extension_execute()
           return null
        }    
        });