//获取url参数
function getQueryVariable(option) {
  var queryUrl = window.location.search.substring(1);
  var paramsArr = queryUrl.split("&");
  for (var i = 0; i < paramsArr.length; i++) {
    var params = paramsArr[i].split("=");
    if (params[0] === option) { return params[1]; }
  }
  return (false);
}
// 匹配环境变量
function matchEnv(url){
  let result = /(-.*?)\./.exec(url)
  if(result&&result.length>0){
    return result[1]
  }
  return ""
}
export {
  getQueryVariable,
  matchEnv
}