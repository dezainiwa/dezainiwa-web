








    var supporting_library = {
        "check_px_value":function(val){


            if (/^([0-9\.]{1,})$/g.test(val)){
                
                return val+"px";
            }else{
    
                return val;
            }
            
        },
        dialog_box:function(glb_content){
            var str_temp = "";
        }
        ,
        "module_background_false":function(dom_module,func){
            
        },
        "module_background_true":function(dom_module,func){
            
            function load_background_element(){
                
                if(_ct.has(func)){
                    func();
                }       
            }
            load_background_element();
            ct("element").EventScrollResize(function(){
                load_background_element();
            });
        },
        "module_mouse_move_false":function(dom_down,dom_move,dom_module){
            
        },
        "module_mouse_move_true":function(dom_down,dom_move,dom_module){
            var bool_dialgo_box = false;
            var dialog_box_width = parseInt(ct("dom",dom_module).css("width"));
        
            var pos_x = 0;
            var pos_y = 0;
           var dom_down_height = parseInt(ct("dom",dom_down).getheight())/3;
           

           var ref_pos_top = "0";
           var ref_pos_left = "0";

          var settime =null;
            ct("dom",dom_down).on("mousedown",function(e){
                clearTimeout(settime);
                
                    bool_dialgo_box = true;

                     pos_x = e.offsetX+dom_down_height;
                    pos_y = e.layerY//parseInt(dom_down_height/3);//parseInt(e.offsetY);//
                });
            ct("dom",dom_down).on("mouseover",function(e){
                settime = setTimeout(function() {
                    bool_dialgo_box = false;
                }, 1000);
                    
                    });
            ct("dom",dom_down).on("mouseup",function(e){
                bool_dialgo_box = false;
            
                    });
            
            ct("dom","body").mousemove(function(e){
                   
                    if(bool_dialgo_box){
                        clearTimeout(settime);
                       
                            var dom_pos_dimen = ct("dom",this).getElementDimension();
                            //dom_pos_dimen.top+
                             ref_pos_top = supporting_library.check_px_value((e.clientY - (pos_y)));
                             ref_pos_left = supporting_library.check_px_value((e.clientX - (dom_pos_dimen.left+pos_x)));
                            ct("dom",dom_move).css({"top":ref_pos_top,"left":ref_pos_left})
                            }
                         
                        
                        });     
                        
        }
    };
    
    
     
    
   
    
    
   
    
    
    
    
    
