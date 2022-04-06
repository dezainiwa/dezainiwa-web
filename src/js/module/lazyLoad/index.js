import {dom} from "comptsjs";
import {varExtend,getUniq,indexOf, count, getTypeof, has} from 'structkit';
import {configLazyLoad} from '../../config/variable';
import {checkPxValue } from '../../core/support'


function lazyLoad (config) {

    let details=varExtend(configLazyLoad,config);


}
export default lazyLoad;
