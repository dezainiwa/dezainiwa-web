
    execute_plugin("skybox",{
        details:{
                             "extension_execute":function(){},
                            "background_active":true,
                            "background_event_close":false,
                             "opacity":700,
                             "is_header":true,                                          
                            
                             "title":"",
                             "content":"Untitled",
                             "footer":"",
                             "width":"auto",
                             "height":"auto",
                             "is_position":false,
                             "delay":100,
                            // "delay_active":ct("agenttype").checkmobile()
                             },
        str_template:"",
        _construct:function(dom){
            //console.log(dom())
        },
        _setDetails:function(conf){
            this.details=_ct.varExtend(this.details,conf);
        },
        _call_method_after:function(){
            this._background_panel();
            this._background_panel_action();
        },
        _call_method_before:function(){
            this.str_template = '<div class="dcw-ext-default-skybox-box">';
        
             this.str_template += '<div class="dcw-ext-default-title">';  
             this.str_template += "<div class='dcw-ext-default-skybox-event-title'>"+this.details.title+"</div><div class='dcw-ext-default-skybox-event-close'>X</div>";   
             this.str_template +="</div>";
                
             this.str_template += '<div class="dcw-body">';   
             this.str_template += this.details.content;    
             this.str_template +="</div>";
                
             this.str_template +="</div>";
        },
        _init:function(){
            
            ct("dom","body").prepend(this.str_template);
            ct("dom","body[class=dcw]").css({"overflow":"hidden"});
       
            ct("dom",".dcw-ext-default-skybox-box").css({"width":supporting_library.check_px_value(this.details.width),"height":supporting_library.check_px_value(this.details.height)});
       
            },
        _background_panel:function(){
                   var load_background_active = false;
                    load_background = function(){
                        
                        
                        if(load_background_active == false){
                            
                            var body_width = parseInt(ct("dom","body").css("width"));
                            var body_height = parseInt(ct("dom","body").css("height"));
                            var str_template="";
                            str_template+='<div class="dcw-ext-default-skybox-box-background">';
                            str_template+='</div>';
                            ct("dom","body").prepend(str_template);
                        }
                    
                        var body_width = parseInt(ct("dom","body").css("width"));
                        var body_height = screen.height;//parseInt(ct$("body").css("height"));
                        ct("dom",".dcw-ext-default-skybox-box-background").css({
                            "width":supporting_library.check_px_value(body_width),
                        "height":supporting_library.check_px_value(body_height)
                        });
                        load_background_active = true;
                        var main_body_dimen = ct("dom","body").getElementDimension();
                        var main_skybox_dimen = ct("dom",".dcw-ext-default-skybox-box").getElementDimension();
                        
                        
                        var screen_width_2 =(main_body_dimen.width - main_skybox_dimen.width)/2;
                        var screen_height_2 =((main_body_dimen.height - main_skybox_dimen.height)/2)+(parseInt(ct("dom",".dcw-ext-default-skybox-event-title").getheight())*2);
                    
                        ct("dom",".dcw-ext-default-skybox-box").css({"left":supporting_library.check_px_value(screen_width_2),"top":supporting_library.check_px_value(screen_height_2)});
                    }

                     if(_ct.has(supporting_library,"module_background_"+this.details.background_active))
                        supporting_library["module_background_"+this.details.background_active]("dcw-ext-default-skybox-box-background",load_background);
                          
            },
            _background_panel_action:function(){
                ct("dom",".dcw-ext-default-skybox-event-close").click(function(){
                    ct("dom",".dcw-ext-default-skybox-box").remove();
                    ct("dom",".dcw-ext-default-skybox-box-background").remove();
                          ct("dom","body[class=dcw]").css({"overflow":"auto"});
                });
                       
                      
            },
         _return_method:function(){
             this.details.extension_execute()
           return null
        }       
        });

