
    var scrpt_dialog = {

    }

    execute_plugin("dialog",{

       event_list_footer_btn  : {},
       var_main_dom_uniq:"",
       dom_list_footer_btn:"",
       str_template:"",
        details:{
                         "extension_execute":function(){},
                        "is_all_close":false,
                             
                             "is_header":true,                                          
                            "is_content":true,
                             "is_footer":false,
                             "title":"Untitled",
                             "content":"Untitled",
                             "width":"auto",
                             "height":"auto",
                             "is_drag":true,
                             "delay":100,
                             "click":[],
                            // "delay_active":ct("agenttype").checkmobile()
                                
        },
        _construct:function(dom){
            //console.log(dom())
        },
        _setDetails:function(conf){
            this.details=_ct.varExtend(this.details,conf);
        },
        _call_method_after:function(){

               
       
              

                  if(_ct.has(supporting_library,"module_mouse_move_"+this.details.is_drag))
                  supporting_library["module_mouse_move_"+this.details.is_drag]("#"+this.var_main_dom_uniq+"_title","#"+this.var_main_dom_uniq,"#"+this.var_main_dom_uniq);
       
        },



        _call_method_before:function(){
              for(var i in this.details.click){
                    var var_btn = this.details.click[i];
                    var var_btn_key = _ct.getKey(var_btn);
                    var css_list = ["dcw-btn"];
                    var attr_str = "";
                    var list_filter= ['class','attr'];
                    for(var ik in var_btn){
                        if(_ct.indexOf(list_filter,ik)>-1){
                            if(ik =="class"){
                                css_list.push(var_btn[ik])
                            }
                            if(ik =="attr"){
                                attr_str = var_btn[ik]
                            }
                        }else{
                            var btn_name = ik;
                        var btn_func = var_btn[ik];
                        }
                        
                    }
                
                    var var_uniq = "dcw-ext-default-dialog-box-footer-btn"+_ct.getUniq();
                    this.event_list_footer_btn[var_uniq] = btn_func;
                    this.dom_list_footer_btn+='<div id="'+var_uniq+'" class="'+css_list.join(" ")+'" '+attr_str+'>'+btn_name+"</div>";
                }
                 this.var_main_dom_uniq = "dcw-ext-default-dialog-box"+_ct.getUniq(); 

              },
        _init:function(){
        //    console.log(this,this.details)


            if (this.details.is_all_close == true){
                ct("dom",".dcw-ext-default-dialog-box").remove();
                return false;
            }
             this.__dialog_template();
      
             ct("dom","body").prepend(this.str_template);

            this.__dialog_position();
            var main = this;
            ct("dom","#"+this.var_main_dom_uniq+"_close").click(function(){
       
            ct("dom","#"+main.var_main_dom_uniq+"").remove();
            })
            },
           __dialog_position:function(){
            ct("dom","#"+this.var_main_dom_uniq).css({"width":supporting_library.check_px_value(this.details.width),"height":supporting_library.check_px_value(this.details.height)});

                    var dialog_box_width = parseInt(ct("dom",".dcw-ext-default-dialog-box").css("width"));
                    var screen_width_2 = ((parseInt(ct("dom","body").css("width")))/2)-dialog_box_width;//.dcw-ext-default-dialog-box
                    var screen_height_2 = ((parseInt(ct("dom","body").css("height")))/2)-(parseInt(ct("dom","#"+this.var_main_dom_uniq).css("height"))/2);
                

                    var main_body_dimen = ct("dom","body").getElementDimension();
                    var main_skybox_dimen = ct("dom","#"+this.var_main_dom_uniq).getElementDimension();
                    
                    
                    var screen_width_2 =(main_body_dimen.width - main_skybox_dimen.width)/2;
               //     console.log("test",main_body_dimen.width,main_skybox_dimen.width);
               ct("dom","#"+this.var_main_dom_uniq).css({"left":supporting_library.check_px_value(screen_width_2),"top":supporting_library.check_px_value((main_body_dimen.height < main_skybox_dimen.height)?10:screen_height_2)});
                    
           }, 
           __dialog_template:function(){

                    this.str_template = '<div class="dcw-ext-default-dialog-box" id="'+this.var_main_dom_uniq+'">';
        
                    this.str_template += '<div class="dcw-ext-default-title">';  
                    this.str_template += "<div class='dcw-ext-default-dialog-event-title' id ='"+this.var_main_dom_uniq+"_title'>"+this.details.title+"</div><div class='dcw-ext-default-dialog-event-close' id ='"+this.var_main_dom_uniq+"_close'>X</div>";   
                    this.str_template +="</div>";
                    
                    this.str_template += '<div class="dcw-body">';   
                    this.str_template += this.details.content;    
                    this.str_template +="</div>";
                    this.str_template += '<div class="dcw-footer">'; 
                    this.str_template += this.dom_list_footer_btn;    
                    this.str_template +="</div>";
                    this.str_template +="</div>";   
           },
         _return_method:function(){
             this.details.extension_execute()
           return null
        }     


        });