import {dom} from "comptsjs";
import {varExtend,getUniq, toInteger, getTypeof, has} from 'structkit';
import {configSnackbar} from '../../config/variable';
import {checkPxValue } from '../../core/support'

var support_skylabel = {
    "position_label":function(glb){
			
			if(glb.active == false)
				return false;
			var uniq = "main"+getUniq();
			glb.dom.prepend("<div class='"+glb.class+"' id='"+uniq+"'><div class='dcw-ext-default-snackbar-event-mainbox' id ='"+uniq+"_mainbox'><div class='dcw-ext-default-snackbar-event-content' id ='"+uniq+"_content'>"+glb.content+"</div><div class='dcw-ext-default-snackbar-event-close' id ='"+uniq+"_close'>X</div></div></div>");
			dom("#"+uniq).css(glb['content_position']);
			dom("#"+uniq+"_close").click(function(){
        
				dom("#"+uniq+"").remove();
				})
			support_skylabel.position_label_delay({refid:uniq,delay:glb.delay});
			
			let getTop = dom("#"+uniq).getElementDimension().value.top
			dom("."+glb.class).each( function(tv,tk) {

				if(tk>0){
					
					const getHeight = dom(tv).getheight()
					if (glb.position_type === "bottom"){
						dom(tv).css({ "top":checkPxValue(getTop-(toInteger(getHeight)+5))});
					}else{
						dom(tv).css({ "top":checkPxValue(getTop+(toInteger(getHeight)+5))});
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

    let details=varExtend(configSnackbar,config);

    let appConfig = {};
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
export default snackbar;
