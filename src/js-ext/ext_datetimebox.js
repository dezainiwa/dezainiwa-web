    var tmplt_box = {
        "date":{
            template:function(glb){
                return "date"
            },
             execute:function(glb){
                
            }
        },
         "time":{
            template:function(glb){
                return "time"
            },
             execute:function(glb){
                
            }
        },
        "datetime":{
             template:function(glb){
                 return "datetime"
            },
             execute:function(glb){
                
            }
        },
         "yearmonthdate":{
             template:function(glb){
                 return "year"
            },
             execute:function(glb){
                
            }
        },
         "monthdate":{
             template:function(glb){
                  return "month"
            },
             execute:function(glb){ 
                
            }
        },
    }

var scrpt_datetimebox = {
    //http://php.net/manual/en/function.date.php
    datetime_format:function(date_format,date_str){
        var datem = new Date(date_str);

        var value_month = scrpt_datetimebox.value_month();
        var value_weekday = scrpt_datetimebox.value_weekday();
       var date_glb={
          //%y %Y-%m-%M %F-%D %H:%m:%I::%S %T %a %A %W %w
          // ::%S %T %a %A %W %w
          y:parseInt(_ct.getValue(_ct.limit(String(datem.getFullYear()).split(""),2,3)).join("")),
          Y:datem.getFullYear(),
          m:datem.getMonth()+1,
          M:_ct.getValue(_ct.limit(value_month[datem.getMonth()].split(""),0,2)).join(""),
          F:value_month[datem.getMonth()],
          D:datem.getDate(),
          d:datem.getDay(),
          H:datem.getHours()%12 == 0?12:datem.getHours()%12,
          h:datem.getHours(),
          m:datem.getMinutes(),
          I:datem.getSeconds(),
          S:1,
          T:datem.getUTCSeconds(),
          a:1,
          A:1,
          W:1,
          w:1


        }
        var ret_date_format=date_format.replace(/(\%[a-zA-Z])/g,function(m,m1,m2){
            var ret_value = m1.replace(/\%/,"")
            if (_ct.has(date_glb,ret_value)){
                return date_glb[ret_value]
            }else{
                return "[-]"
            }
        })
        //"%y %Y-%m-%M %F-%D %H:%m:%I::%S %T %a %A %W %w %d".replace(/(\%[a-zA-Z])/g,function(m,m1,m2){ console.log(m1.replace(/\%/,""),"1") })
        return ret_date_format
   }
    ,value_month:function(){
		return {
			0:"January",
			1:"February",
			2:"March",
			3:"April",
			4:"May",
			5:"June",
			6:"July",
			7:"August",
			8:"September",
			9:"October",
			10:"November",
			11:"December"
		}	
		},
		value_weekday:function(){
		return {
				1:"Sunday",
				2:"Monday",
				3:"Tuesday",
				4:"Wednesday",
				5:"Thursday",
				6:"Friday",
				7:"Saturday",
			}	
		},
       
}

    function datetimebox_cls(dom){
        this.dom = dom;
         this.details = {};
         this.uniq_id = _ct.getUniq();
    }
    datetimebox_cls.prototype.generate_template = function(){
        
        var int_act = {};
        var ref_date = new Date(this.details.date_value)
        if(_ct.has(tmplt_box,this.details.template)){
            int_act = tmplt_box[this.details.template]
        } else{
            int_act = tmplt_box["date"]
        }
      
        if(this.details.is_active){

            var str_main_template = '<div class="dcw-ext-default-datetimebox">'
            str_main_template+=int_act.template({
                "uniq_id":this.uniq_id,
            "date_value":(ref_date)
            });
            str_main_template+="</div>"
            console.log(int_act)

            
            ct("dom",this.dom).after(str_main_template)
            ct("dom",".dcw-ext-default-datetimebox").fadeout(200)
        }
    }
     datetimebox_cls.prototype.setDetails = function(details){
       this.details = details
    }
    datetimebox_cls.prototype.init_element = function(){
        console.log(this.dom)
        var main =this;
        var init_dom = ct("dom",this.dom)
        var tag_name = init_dom.tagName().toLowerCase()
        var event_to_open = ["input","textarea"];

        if(this.details.is_open_event == false){
            console.log("s1")
            init_dom.on("click",function(){
                var point_bool = false
                main.generate_template()
                ct("dom",".dcw-ext-default-datetimebox").mouseenter(function(){
              // ct("dom",".dcw-ext-default-datetimebox").remove()
              
              point_bool = true;
            }).mouseleave(function(){
               
                ct("dom",".dcw-ext-default-datetimebox").fadein(200,function(){
                    ct("dom",".dcw-ext-default-datetimebox").remove()
                })//.remove()
            });
            })
           
        }else{
           main.generate_template()
        }
        console.log(tag_name)
    }

    execute_plugin("datetimebox",{
        details:{
             "extension_execute":function(){},
            is_active:true,
            is_open_event:false,
          //  display:"date",
            template:"date",
             is_weekend:false,
            format:"%Y-%m-%d",
            date_value:(new Date()),

        },
        
        _construct:function(dom){
             this.element = dom.element
        },
        _setDetails:function(conf){
            this.details=_ct.varExtend(this.details,conf);
        },
        _call_method_after:function(){

        },
        _call_method_before:function(){

        },
        _init:function(){
          

           //ps("dom",this.element).after("<====>")
           var datebox_cls = new datetimebox_cls(this.element);
           datebox_cls.setDetails(this.details)
           datebox_cls.init_element()
            },
         _return_method:function(){

             this.details.extension_execute()
           return null
        }    
        });