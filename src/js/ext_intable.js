
var template_intable = {

}

var scrpt_intable = {

}
function clsTable_extend(){

}



function clsTable(elem,details){
    this.element = elem;
    this.details = details;
        this.data = [];
}
clsTable.prototype.clearData= function(){
    this.data = [];
}
clsTable.prototype.setData= function(data){

}

clsTable.prototype.setHeader= function(header){
this.data['header'] = header
}


    execute_plugin("intable",{
        data:{
				"data":[],
				"header":{},
				
			},
        details:{
            extension_execute:function(){},
            is_active:true,
            is_auto_pagination:false,
			limit:10,
            source_type:"table",
        },
        
        _construct:function(dom){
            //---
           this.element_dom = dom;
        },
        _setDetails:function(conf){
            this.details=_ct.varExtend(this.details,conf);
        },
        _call_method_after:function(){

        },
        _call_method_before:function(){
             //template
        },
        _init:function(){
            alert("test")
            this.table = new clsTable(this.element_dom,this.details);
           // console.log(this,this.details)
            },
         _return_method:function(){
             this.details.extension_execute()
           return this.table
        }    
        });