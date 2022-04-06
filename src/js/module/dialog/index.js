import {dom} from "comptsjs";
import {varExtend,getUniq,indexOf, count, getTypeof, has} from 'structkit';
import {configDialog} from '../../config/variable';
import {checkPxValue } from '../../core/support'

var supporting_library = {

    
    "module_background_true":function(dom_module,func){
        
        function load_background_element(){
            
            if(has(func)){
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


let event_list_footer_btn  = {};

let str_template = ""
let dom_list_footer_btn = "";


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

    let dialog_box_width = parseInt( dom(".dcw-ext-default-dialog-box").css("width"));
    let screen_width_2 = ((parseInt(dom("body").css("width")))/2)-dialog_box_width;//.dcw-ext-default-dialog-box
    let screen_height_2 = ((parseInt(dom("body").css("height")))/2)-(parseInt( dom("#"+var_main_dom_uniq).css("height"))/2);
        

    let main_body_dimen = dom("body").getElementDimension().value;
    let main_skybox_dimen = dom("#"+var_main_dom_uniq).getElementDimension().value;
            
            
    let screen_width_3 =(main_body_dimen.width - main_skybox_dimen.width)/2;
       dom("#"+var_main_dom_uniq).css({"left":checkPxValue(screen_width_3),"top":checkPxValue((main_body_dimen.height < main_skybox_dimen.height)?10:screen_height_2)});
            
   }

__dialog_body_bg_position = function(details){

    if (dom(".dcw-ext-default-dialog-box-background").getLength() ===0){
        let body_width = parseInt(dom("body").css("width"));
        let body_height = parseInt(dom("body").css("height"));
        let str_templateBG="";
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

    let details=varExtend(configDialog,config);
    let var_main_dom_uniq = "";

    let appConfig = {};

    for(var i in details.click){
        var var_btn = details.click[i];
        var var_btn_key = getKey(var_btn);
        var css_list = ["dcw-btn"];
        var attr_str = "";
        var list_filter= ['class','attr'];
        for(var ik in var_btn){
            if( indexOf(list_filter,ik)>-1){
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
    
        var var_uniq = "dcw-ext-default-dialog-box-footer-btn"+getUniq();
        event_list_footer_btn[var_uniq] = btn_func;
        dom_list_footer_btn+='<div id="'+var_uniq+'" class="'+css_list.join(" ")+'" '+attr_str+'>'+btn_name+"</div>";
    }
     var_main_dom_uniq = "dcw-ext-default-dialog-box"+getUniq(); 

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
export default dialog;
