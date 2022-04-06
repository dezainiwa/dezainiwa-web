(function(global){
global.dzw={}
;


var configSnackbar = {
    "extension_execute":function(){},
   "position":"left",
   "pop_delay":"slow",
   "active":true,
   "add_class":"",
   "disable":false,
   "content":"Untitled",
                                  
}

var configDialog = {
    "extension_execute":function(){},
    "is_all_close":false,
                             
    "is_header":true,                                          
    "is_content":true,
    "is_footer":false,
    "title":"Untitled",
    "content":"Untitled",
    "width":"auto",
    "height":"auto",
    "isDrag":false,
    "isBodyBackoundDarken":true,
    "delay":100,
    "click":[],
                                   
}


var checkPxValue = function(val){

    if (/^([0-9\.]{1,})$/g.test(val)){
        
        return val+"px";
    }else{

        return val;
    }
    
}

var supporting_library = {

    
    "module_background_true":function(dom_module,func){
        
        function load_background_element(){
            
            if(_stk.has(func)){
                func();
            }       
        }
        load_background_element();

    },
    "module_mouse_move":function(dom_down,dom_move,dom_module){
        var bool_dialgo_box = false;
        var dialog_box_width = parseInt(dom(dom_module).css("width"));
    
        var pos_x = 0;
        var pos_y = 0;
       var dom_down_height = parseInt(dom(dom_down).getheight())/3;
       

       var ref_pos_top = "0";
       var ref_pos_left = "0";

      var settime =null;
        dom(dom_down).on("mousedown",function(e){
            clearTimeout(settime);
            
                bool_dialgo_box = true;

                 pos_x = e.offsetX+dom_down_height;
                pos_y = e.layerY//parseInt(dom_down_height/3);//parseInt(e.offsetY);//
            });
        dom(dom_down).on("mouseover",function(e){
            settime = setTimeout(function() {
                bool_dialgo_box = false;
            }, 1000);
                
                });
        dom(dom_down).on("mouseup",function(e){
            bool_dialgo_box = false;
        
                });
        
        dom("body").mousemove(function(e){
               
                if(bool_dialgo_box){
                    clearTimeout(settime);
                   
                        var dom_pos_dimen = dom(this).getElementDimension();
                     
                        //dom_pos_dimen.top+
                         ref_pos_top = checkPxValue((e.clientY - (pos_y)));
                         ref_pos_left = checkPxValue((e.clientX - (dom_pos_dimen.value.left+pos_x)));
                         dom(dom_move).css({"top":ref_pos_top,"left":ref_pos_left})
                        }
                     
                    
                    });     
                    
    }
};

var event_list_footer_btn  = {};

var str_template = ""
var dom_list_footer_btn = "";

__dialog_template= function(details,var_main_dom_uniq){
    console.log(details,":details")

    str_template = '<div class="dcw-ext-default-dialog-box" id="'+var_main_dom_uniq+'">';

    str_template += '<div class="dcw-ext-default-title" id ="'+var_main_dom_uniq+'_title">';  
    str_template += "<div class='dcw-ext-default-dialog-event-title' id ='"+var_main_dom_uniq+"_title'>"+details.title+"</div><div class='dcw-ext-default-dialog-event-close' id ='"+var_main_dom_uniq+"_close'>X</div>";   
    str_template +="</div>";
    
    str_template += '<div class="dcw-body">';   
    str_template += details.content;    
    str_template +="</div>";
    str_template += '<div class="dcw-footer">'; 
    str_template += dom_list_footer_btn;    
    str_template +="</div>";
    str_template +="</div>";   
}

__dialog_position = function(details,var_main_dom_uniq){
    dom("#"+var_main_dom_uniq).css({"width":checkPxValue(details.width),"height":checkPxValue(details.height)});

    var dialog_box_width = parseInt( dom(".dcw-ext-default-dialog-box").css("width"));
    var screen_width_2 = ((parseInt(dom("body").css("width")))/2)-dialog_box_width;//.dcw-ext-default-dialog-box
    var screen_height_2 = ((parseInt(dom("body").css("height")))/2)-(parseInt( dom("#"+var_main_dom_uniq).css("height"))/2);
        

    var main_body_dimen = dom("body").getElementDimension().value;
    var main_skybox_dimen = dom("#"+var_main_dom_uniq).getElementDimension().value;
            
            
    var screen_width_3 =(main_body_dimen.width - main_skybox_dimen.width)/2;
       dom("#"+var_main_dom_uniq).css({"left":checkPxValue(screen_width_3),"top":checkPxValue((main_body_dimen.height < main_skybox_dimen.height)?10:screen_height_2)});
            
   }

__dialog_body_bg_position = function(details){

    if (dom(".dcw-ext-default-dialog-box-background").getLength() ===0){
        var body_width = parseInt(dom("body").css("width"));
        var body_height = parseInt(dom("body").css("height"));
        var str_templateBG="";
        str_templateBG+='<div class="dcw-ext-default-dialog-box-background">';
        str_templateBG+='</div>';
        dom("body").prepend(str_templateBG);
    
        dom(".dcw-ext-default-dialog-box-background").css({
            "width":checkPxValue(body_width),
            "height":checkPxValue(body_height)
        });
    }
    
}

function dialog (config) {

    var details=_stk.varExtend(configDialog,config);
    var var_main_dom_uniq = "";

    var appConfig = {};

    for(var i in details.click){
        var var_btn = details.click[i];
        var var_btn_key = getKey(var_btn);
        var css_list = ["dcw-btn"];
        var attr_str = "";
        var list_filter= ['class','attr'];
        for(var ik in var_btn){
            if( _stk.indexOf(list_filter,ik)>-1){
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
    
        var var_uniq = "dcw-ext-default-dialog-box-footer-btn"+_stk.getUniq();
        event_list_footer_btn[var_uniq] = btn_func;
        dom_list_footer_btn+='<div id="'+var_uniq+'" class="'+css_list.join(" ")+'" '+attr_str+'>'+btn_name+"</div>";
    }
     var_main_dom_uniq = "dcw-ext-default-dialog-box"+_stk.getUniq(); 

    __dialog_template(details,var_main_dom_uniq);

    if (details.isBodyBackoundDarken){
        __dialog_body_bg_position(details,var_main_dom_uniq);
    }

    dom("body").prepend(str_template);

    __dialog_position(details,var_main_dom_uniq);

    dom("#"+var_main_dom_uniq+"_close").click(function(){
        
        dom(".dcw-ext-default-dialog-box-background").remove();
        dom("#"+var_main_dom_uniq+"").remove();
        })

    if (details.isDrag){
        supporting_library.module_mouse_move("#"+var_main_dom_uniq+"_title","#"+var_main_dom_uniq,"#"+var_main_dom_uniq);
    }

}
dzw.dialog=dialog;
;



var support_skylabel = {
    "position_label":function(glb){
			
			if(glb.active == false)
				return false;
			var uniq = "main"+_stk.getUniq();
			glb.dom.prepend("<div class='"+glb.class+"' id='"+uniq+"'><div class='dcw-ext-default-snackbar-event-mainbox' id ='"+uniq+"_mainbox'><div class='dcw-ext-default-snackbar-event-content' id ='"+uniq+"_content'>"+glb.content+"</div><div class='dcw-ext-default-snackbar-event-close' id ='"+uniq+"_close'>X</div></div></div>");
			dom("#"+uniq).css(glb['content_position']);
			dom("#"+uniq+"_close").click(function(){
        
				dom("#"+uniq+"").remove();
				})
			support_skylabel.position_label_delay({refid:uniq,delay:glb.delay});
			
			var getTop = dom("#"+uniq).getElementDimension().value.top
			dom("."+glb.class).each( function(tv,tk) {

				if(tk>0){
					
					var getHeight = dom(tv).getheight()
					if (glb.position_type === "bottom"){
						dom(tv).css({ "top":checkPxValue(getTop-(_stk.toInteger(getHeight)+5))});
					}else{
						dom(tv).css({ "top":checkPxValue(getTop+(_stk.toInteger(getHeight)+5))});
					}
					
					getTop = dom(tv).getElementDimension().value.top
				}

			})
		},
		"position_label_delay":function(glb){
			
			dom("#"+glb.refid).fadeIn(glb.delay,function(){
				dom("#"+glb.refid).remove();
			});
		}
};  

function snackbar (config) {

    var details=_stk.varExtend(configSnackbar,config);

    var appConfig = {};
    appConfig['dom']=dom("body");
	appConfig['active']=details.active;
	appConfig['disable']=details.disable;
	appConfig['delay']=details.pop_delay;
	appConfig['content']=details.content;

    appConfig['content_position']={};
    appConfig['class']='dcw-ext-default-snackbar-box'

    appConfig['post_tag']  = {
        "left":{"top":"20%","left":"90%"},
        "right":{"top":"20%","left":"0%"},
        "top":{"top":"10%","left":"50%"},
        "bottom":{"top":"90%","left":"50%"},
    };
	appConfig['position_type'] = details.position;
    appConfig['content_position']=appConfig['post_tag'][details.position];
  //  this.config['class']+=" "+this.details.add_class;
  support_skylabel["position_label"](appConfig);

 

}
//https://github.com/dezainiwa/dezainiwa-web/blob/master/src/js/ext_skybox.js
dzw.snackbar=snackbar;

})(typeof window !== "undefined" ? window : this);