var support_skylabel = {
    "position_label":function(glb){
			
			if(glb.active == false)
				return false;
			var uniq = "main"+_ct.getUniq();
			glb.dom.prepend("<div class='"+glb.class+"' id='"+uniq+"'>"+glb.content+"</div>");
			ct("dom","#"+uniq).css(glb['content_position']);
			
			support_skylabel.position_label_delay({refid:uniq,delay:glb.delay});
			
		},
		"position_label_delay":function(glb){
			
			ct("dom","#"+glb.refid).fadein(glb.delay,function(){
				ct("dom","#"+glb.refid).remove();
			});
		}
};  


	   execute_plugin("skylabel",{
	   config:{},
        details:{
                 "extension_execute":function(){},
				"position":"left",
				"pop_delay":"slow",
				"active":true,
                "add_class":"",
				"disable":false,
				"content":"Untitled",
								
				"delay_active":ct("agenttype").ismobile()
											 
        },
		
		_construct:function(dom){

        },
        _setDetails:function(conf){
            this.details=_ct.varExtend(this.details,conf);
        },
        _call_method_after:function(){

        },
        _call_method_before:function(){
			this.config['dom']=ct("dom","body");
			this.config['active']=this.details.active;
			this.config['disable']=this.details.disable;
			this.config['delay']=this.details.pop_delay;
			this.config['content']=this.details.content;

            this.config['content_position']={};
            this.config['class']='dcw-ext-default-skylabel-box'

			this.config['post_tag']  = {
                "left":{"top":"20%","left":"90%"},
                "right":{"top":"20%","left":"0%"},
                "top":{"top":"10%","left":"50%"},
                "bottom":{"top":"90%","left":"50%"},
            };
        },
        _init:function(){
           
           if(_ct.has(this.config['post_tag'],this.details.position)){
                this.config['content_position']=this.config['post_tag'][this.details.position];
            }
            if( this.details.add_class!="" ){
               this.config['class']+=" "+this.details.add_class;
            }
			support_skylabel["position_label"](this.config);
            },
         _return_method:function(){
             this.details.extension_execute()
           return null
        }    
        });