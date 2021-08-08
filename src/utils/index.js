
// 获取运行平台信息
export function getCrmContext() {
  let ctx = null;
  // window.crm_platform_type = "ikcrm"
  // window.current_user_token = "a12d462ee7fbfe8d9f354c3406039a04"
  // window.current_org_id = "1000659"
  // window.crm_app_type = 'ikcrm'
  // window.apiHost = "https://lxcrm-dev.weiwenjia.com"
  // window.crm_push_url= "https://faye-dev.ikcrm.com"


  try {
    const w = window.top;
      ctx = {
        CrmPlatformType: w.crm_platform_type,
        userToken: w.current_user_token,
        organizationId: w.current_org_id,
        appType: w.crm_app_type,
        userId:w.current_user_id,
        apiHost:w.orgInfo.apiHost,
        pushUrl: w.crm_push_url

      };
  } catch (e) {
    console.log(e);
  }

  return ctx ? ctx : {
    userToken: getParameterByName('userToken'),
    CrmPlatformType: getParameterByName('platformType'),
  };
}
// 获取url参数
export function getParameterByName(name, byHash = false) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${ name }=([^&#]*)`);
  let results = regex.exec(location[byHash ? 'hash' : 'search']);
  return results == null ? '' : decodeURIComponent(results[1]);
}
// BmsAppType 转 appType
export const bmsAppTypeToAppType = (appType) => {  // BmsAppType 转 appType
  if (appType === 'lixiaocrm_pc' || appType === "ikcrm" || appType === 'lixiaoskb') {
    return 'production'
  } else if (appType === "dingtalk") {
    return 'dingtalk'
  } else if (appType === 'wxwork') {
    return 'wxwork'
  }
};
// 防抖
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function (...args) {
    window.clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    }, wait);
    if (immediate && !timeout) func.apply(this, [...args]);
  };
}
//秒转时分
export const  formatSeconds =(value)=> {
  let secondTime = parseInt(value);// 秒
  let minuteTime = 0;// 分
  let hourTime = 0;// 小时
  if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if(minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
      }
  }
  let result = "" + parseInt(secondTime) + "秒";

  if(minuteTime > 0) {
    result = "" + parseInt(minuteTime) + "分钟" + result;
  }
  if(hourTime > 0) {
    result = "" + parseInt(hourTime) + "小时" + result;
  }
  return result;
}