
// 目前支持的主题
const THEME_ORANGE = 'orange';
const THEME_BLUE = 'blue';
const COLOR_ORANGE = '#FF9052';
const COLOR_BLUE = '#108EE9';

const themeConfig = {
  [THEME_ORANGE]: {
    primaryColor: COLOR_ORANGE,
    linkColor: COLOR_ORANGE,
  },
  [THEME_BLUE]: {
    primaryColor: COLOR_BLUE,
    linkColor: COLOR_BLUE,
  },
};

// 获取主题
function getTheme() {
  const theme = getResultTheme();
  if (!theme) return THEME_ORANGE;
  if (Object.keys(themeConfig).some(color => color === theme)) {
    return theme;
  }
  return THEME_ORANGE;
}

// 获取主题配置颜色
function getThemeConfig() {
  const theme = getResultTheme();
  if (!theme) return themeConfig[THEME_ORANGE];

  return themeConfig[theme] || themeConfig[THEME_ORANGE];
}

// 从crm中获取主题信息，同时考虑内嵌到iframe的情况
function getResultTheme() {
  try {
    return top.theme_style;
  } catch (e) {
    console.log(e);
  }
  return '';
}


export default {
  getTheme,
  getThemeConfig,
  THEME_ORANGE,
  THEME_BLUE,
};
