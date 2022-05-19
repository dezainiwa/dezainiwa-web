function lazyLoad (config) {

    var details=_stk.varExtend(configLazyLoad,config);

}
dzw.lazyLoad=lazyLoad;

(function(global){
global.dzw={}
function drawer (config) {

    var details=_stk.varExtend(configDrawer,config);

}
dzw.drawer=drawer;

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