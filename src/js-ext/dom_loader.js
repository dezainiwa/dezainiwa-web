execute_plugin=function(name,base){
  
 

     dcw_module=function(glb){
         try {
             base._setDetails(glb);
             base._construct(this);
           
          base._call_method_before();
           base._init();
           base._call_method_after();

           return base._return_method();
         } catch (error) {
             console.log(error);
             return null;
         }
            
        }

ct.extension("dcw_"+name,function(glb){
    
    glb["dom_control"]=dcw_module
    glb["module"]=dcw_module

    })
}