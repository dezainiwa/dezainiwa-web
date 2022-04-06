const checkPxValue = function(val){


    if (/^([0-9\.]{1,})$/g.test(val)){
        
        return val+"px";
    }else{

        return val;
    }
    
}

export {checkPxValue}