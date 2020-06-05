

//https://www.html5rocks.com/en/tutorials/file/dndfiles/
var scrpt_dropfile = {
    event_file_upload:function(evt,details,files){
        if(details.is_ajax){
            try {
                var fd = new FormData();
                for (var i = 0, f; f = files[i]; i++) {
                    fd.append(details.file_name,f);
                    
                }
                
                ct("ajax",details.url).setFormData(fd).post(details.post_variable,
                 function(res){
            
                    details.event_ajax_request(res);
                    
                    });
            } catch (error) {
                console.log(error);
            }
        }
    },
     handleFileSelectChange:function(evt,details) {
         
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    
    details['event_select_change'](evt,files);
    
    scrpt_dropfile.event_file_upload(evt,details,files);
  }, 

      handleFileSelect:function(evt,details) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    
    details['event_select_change'](evt,files);
   
    scrpt_dropfile.event_file_upload(evt,details,files);
  },

   handleDragOver:function(evt,details) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    details['event_drag'](evt);
    
  }

,
    template:function(dom,uniq,details){

        var btn_element_upload = '';
       
        if(details['upload_type'] =="box"){

             if(details['file_click_event_element'] =="[default]"){
                 btn_element_upload = '<div class="dcw-ext-default-dropfile-upload-btn dcw-ext-default-dropfile-upload-btn'+uniq+'" >'+details['file_button_title']+'</div>';
              }
             var html_template_before = '<div class="dcw-ext-default-dropfile dcw-ext-default-dropfile'+uniq+'">'+btn_element_upload+'<div class="dcw-ext-default-dropfile-upload-hidden dcw-ext-default-dropfile-upload-hidden'+uniq+'"">';
             var html_template_after = ' </div> <div class="dcw-ext-default-dropfile-upload-output dcw-ext-default-dropfile-upload-output'+uniq+'""> </div></div>';
       
        }

         if(details['upload_type'] =="button"){
            
             if(details['file_click_event_element'] =="[default]"){
                 btn_element_upload = '<div class="dcw-ext-default-dropfile-upload-btn dcw-ext-default-dropfile-upload-btn'+uniq+'" >'+details['file_button_title']+'</div>';
              }
             var html_template_before = '<div class="dcw-ext-default-dropfile dcw-ext-default-dropfile'+uniq+'">'+btn_element_upload+'<div class="dcw-ext-default-dropfile-upload-hidden dcw-ext-default-dropfile-upload-hidden'+uniq+'"">';
             var html_template_after = ' </div> <div class="dcw-ext-default-dropfile-upload-output dcw-ext-default-dropfile-upload-output'+uniq+'""> </div></div>';
       
        }
        var html_template = html_template_before+"<!= file_content !>"+html_template_after;
        var dom_main = ct$(dom) 
        var dom_main_length = dom_main.getlength()
        dom_main.each(function(v,k){
             var dom_sub = ct$(v)
             var dom_sub_tagname = dom_sub.tagName().toLowerCase();
              
             var bool_file_type = false;
             var file_dom_template = "";
             if(dom_sub_tagname =="input"){
                   var dom_sub_attrfile = dom_sub.attr("type").toLowerCase();
                    if(dom_sub_attrfile =="file"){
                        bool_file_type = true
                    }
             }

             if(bool_file_type){
                 var html_template_sub1 = dom_sub.outerhtml()+"";
                 dom_sub.after(html_template_before+html_template_sub1+html_template_after).remove()//"_ct.template_value(html_template,{'file_content':html_template_sub1})")
               
             }else{
                  var html_template_sub1 = _ct.template_value("<input type='file' id='<!= id !>'  name='<!= name !>' />",{id:details['html_name']+k,name:details['html_name']+""+(dom_main_length>1?"[]":"")});
                 dom_sub.html(_ct.template_value(html_template,{'file_content':html_template_sub1}));
             }

        });
       
         
    },

     file_upload_event:function(dom,uniq,details){

           

             var dom_main_uploader = ct$('.dcw-ext-default-dropfile-upload'+uniq)
              if(details['upload_type'] =="box"){
         var dom_main_btn = ct$(details['file_click_event_element'] =="[default]" ?'.dcw-ext-default-dropfile-upload-btn'+uniq:details['file_click_event_element'] )
              }

               if(details['upload_type'] =="button"){
         var dom_main_btn = ct$(details['file_click_event_element'] =="[default]" ?'.dcw-ext-default-dropfile-upload-btn'+uniq:details['file_click_event_element'] )
              }
          var dom_main_hidden = ct$('.dcw-ext-default-dropfile-upload-hidden'+uniq).findElem("input[type=file]")

         dom_main_btn.click(function(){
             if(dom_main_hidden.eq(dom_main_btn.index(this)).element.length>0){
             dom_main_hidden.eq(dom_main_btn.index(this)).element[0].click()
             dom_main_hidden.eq(dom_main_btn.index(this)).change(function(e){
                 scrpt_dropfile.handleFileSelectChange(e,details);
             });
             }
             if(details['file_click_event_element'] !="[default]"){
                 dom_main_hidden.eq(0).element[0].click()
                 dom_main_hidden.eq(0).change(function(e){
                     scrpt_dropfile.handleFileSelectChange(e,details);
                 });
             }
         })
      
      dom_main_btn.mouseenter(function(){
       // console.log("mouseenter")
    })
      dom_main_btn.mouseleave(function(){
       // console.log("mouseleave")
    })
    dom_main_btn.dragenter(function(){
      //  console.log("dragenter")
    })
   dom_main_btn.dragover(function(e){
    scrpt_dropfile.handleDragOver(e,details);   
   })
    dom_main_btn.drop(function(e){

        scrpt_dropfile.handleFileSelect(e,details);
        });
     }
}

    execute_plugin("dropfile",{
        details:{
            "extension_execute":function(){},
             "event_drag":function(evt){},
             event_ajax_request:function(res){},
            // "event_drop":function(){},
             "event_select_change":function(evt,files){},
            // "event_trigger_file_upload":function(){},
            is_active:true,
            file_name:'files',
            url:'/',
            is_ajax:true,
             post_variable:[],
            upload_type:"box",//multiple
            "html_name":"default",
            "file_button_title":"Upload now",
            "file_body_drag_element":"[default]",
            "file_click_event_element":"[default]",
        },
        
        _construct:function(dom){
            this.element = dom.element
            this.uniq = _ct.getUniq();
        }, 
        _setDetails:function(conf){
            this.details=_ct.varExtend(this.details,conf);
        },
        _call_method_after:function(){

        },
        _call_method_before:function(){

        },
        _init:function(){
          
           // console.log(this,this.details)
          


           if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
              //  ct$(this.element).html(scrpt_dropfile.template());
              scrpt_dropfile.template(this.element,this.uniq,this.details)
               scrpt_dropfile.file_upload_event(this.element,this.uniq,this.details)
                } else {
                alert('The File APIs are not fully supported in this browser.');
                }
               
            },
         _return_method:function(){
             this.details.extension_execute()
           return null
        }    
        });