import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './routes'
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn';
import 'antd/dist/antd.less';
import themeManager from './utils/themeManager';
import { createGlobalStyle } from 'styled-components';
const themeColor = themeManager.getThemeConfig().primaryColor;
// 加载主题配置
if (themeManager.getTheme() === themeManager.THEME_ORANGE) {
  import('./styles/orangeTheme.less');
} else {
  import('./styles/blueTheme.less');
}
const GlobalStyle = createGlobalStyle`
  .g_group .nav>li>a:hover, .g_group .nav>li>a.active{
    background: none;
    color: ${themeColor}!important;
  }
  .g_group .nav>li>a {
    padding: 13px 0px 13px 20px;
    color: rgb(57, 63, 70);
  }
  #container {
    height: 100%;
    .exportModal .ant-modal-content .ant-modal-footer{
      width: 720px;
      height: 64px;
      background: #F7F7F7;
      border-radius: 0px 0px 2px 2px;
    }
    .ant-select .ant-select-arrow {
      display: none;
    }
    .ant-select .ant-select-clear {
      margin-top:-4px!important;
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner::after{
      background-color:${themeColor}!important
    }
    .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner, .ant-checkbox-input:focus + .ant-checkbox-inner {
      border-color: ${themeColor}!important;
    }
    .ant-select:not(.ant-select-disabled):hover .ant-select-selector{
      border-color:${themeColor}!important;
    }
    .ant-pagination-item-active a{
      color: ${themeColor}!important;
    }
    .ant-btn:hover,.ant-btn:active {
      color: #595959;
      border-color: ${themeColor}!important;
    }
    .ant-select::after {
      position: absolute;
      top: 15px;
      right: 10px;
      display: block;
      content: '';
      border-width: 5px;
      border-style:solid;
      border-color: #D8D8D8 transparent transparent transparent;
    }
  }
  
  .exportModal .ant-modal-content .ant-modal-header {
    width: 720px;
    height: 48px;
    background: #F7F7F7;
    border-radius: 2px;
  }
  .exportModal .ant-modal-content .ant-modal-footer{
    width: 720px;
    height: 64px;
    padding:15px 16px;
    background: #F7F7F7;
    border-radius: 0px 0px 2px 2px;
  }
  .filterCheckbox .ant-tooltip-inner{
    padding:16px;
    width:320px!important;
    color:#999999;
    font-size: 14px
  }
  .audioName .ant-tooltip-inner {
    width:340px
  }
`;
console.log(1234)
console.log(222);
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <GlobalStyle />
    <Router />
  </ConfigProvider>,
  document.getElementById('container')
);
