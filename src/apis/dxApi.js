import api from './api-request';
import dingApi from './ding-api-request';
import wxApi from './wx-api-request';
import {bmsAppTypeToAppType} from '../utils'
let appType = bmsAppTypeToAppType(window.crm_app_type)
// 获取导入状态
function getRediretParams(params) {
  if(appType === "production"){
    
    return api.get('tdlx', { params });
  }else if(appType === "dingtalk"){
    return dingApi.get('tdlx', { params });
  }else{
    return wxApi.get('tdlx', { params });
  }
  
}
export default {
  getRediretParams,
};