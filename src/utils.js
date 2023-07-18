function getBrowerCore(userAgent = '') {
  const ua = userAgent.toLowerCase()

  let core = 'Unkown',
    version = 'Unkown',
    match

  if (/mise|Trident/gi.test(ua)) {
    // IE内核
    core = 'Trident'

    match = ua.match(/Trident[/]([\d.]+)/i)
    version = match[1] || '' // IE6 7 9 10可能获取不到
  } else if ((match = ua.match(/Presto[/]([\d.]+)/i)) != null) {
    // opera 内核
    core = 'Presto'
    version = match[1]
  } else if ((match = ua.match(/AppleWebkit[/]([\d.]+)/i)) != null) {
    // 判断WebKit优先级比Gecko高，因为Gecko有时在webkit内核中也会被带上
    // 苹果谷歌内核
    core = 'WebKit'
    version = match[1]
  } else if (
    /Gecko|KHTML/gi.test(ua) &&
    (match = ua.match(/(Gecko|KHTML)[/]([\d.]+)/i)) != null
  ) {
    // 火狐内核
    core = 'Gecko'
    version = match[2]
  } else {
    core = 'Unknown'
    version = ''
  }

  return {
    core,
    version
  }
}

/**
 * @param {string} userAgent
 * @param {import('..').BrowserInfo.BrowserInfoInstance} [info]
 * @returns {import('..').BrowserInfo.BrowserInfoInstance}
 */
export function parseUserAgent(userAgent, info) {
  if (typeof userAgent !== 'string' || userAgent === '') return null

  const ua = userAgent.toLowerCase()

  /**
   * @type {import('..').BrowserInfo.BrowserInfoInstance}
   */
  const browserInfo = info || {
    $ua: '',
    name: '',
    /** 浏览器类型 */
    type: '',
    /** 浏览器版本 */
    version: '',
    /** 浏览器内核 */
    core: '',
    /** 浏览器内核版本 */
    coreVersion: '',
    /** 操作系统 */
    os: '',
    /** 操作系统版本 */
    osVersion: '',
    /** 终端设备类型 */
    terminalType: ''
  }

  // #region 获取内核及版本
  const coreInfo = getBrowerCore(ua)
  browserInfo.core = coreInfo.core
  browserInfo.coreVersion = coreInfo.version

  // #endregion

  // #region 获取浏览器类型、版本、名称
  let browerVersionMatch = null

  if (
    browserInfo.core === 'Trident' &&
    ((browerVersionMatch = ua.match(/msie ([\d.]+)/i)) != null || // IE6-10
      (browerVersionMatch = ua.match(/rv\:([\d.]+)/)) != null) // IE11
  ) {
    // IE
    browserInfo.type = 'IE'
  } else if (
    browserInfo.core === 'Presto' &&
    ((browerVersionMatch = ua.match(/opera.([\d.]+)/i)) != null ||
      (browerVersionMatch = ua.match(/opr\/([\d.]+)/i)) != null)
  ) {
    // opera
    browserInfo.type = 'Opera'
  } else if (
    browserInfo.core === 'Gecko' &&
    (browerVersionMatch = ua.match(/firefox\/([\d.]+)/i)) != null
  ) {
    // firefox
    browserInfo.type = 'Firefox'
  } else if (browserInfo.core === 'WebKit') {
    // webkit系的浏览器

    if ((browerVersionMatch = ua.match(/edge\/([\d.]+)/i)) != null) {
      // 旧版edge
      browserInfo.type = 'Edge(Old)'
    } else if ((browerVersionMatch = ua.match(/edga?[/]([\d.]+)/i)) != null) {
      // 新版edge
      browserInfo.type = 'Edge'
    } else if (
      /Safari/gi.test(ua) &&
      !/Chrome/gi.test(ua) &&
      (browerVersionMatch = ua.match(/version\/([\d.]+).*safari/i)) != null
    ) {
      // 先判断safari，因为chrome有可能也会带上safri字段
      browserInfo.type = 'Safari'
    } else if ((browerVersionMatch = ua.match(/chrome\/([\d.]+)/i)) != null) {
      // Chrome
      browserInfo.type = 'Chrome'
    }
  }

  browserInfo.version =
    browerVersionMatch?.length >= 2 ? browerVersionMatch?.[1] : ''

  // 解析套壳、手机厂商、APP内置浏览器的名字
  if (/qqbrowser/gi.test(ua)) {
    browserInfo.name = 'QQ浏览器'
    browserInfo.type = 'Chromium'
  } else if (/se 2.x/gi.test(ua)) {
    browserInfo.name = '搜狗浏览器'
    browserInfo.type = 'Chromium'
  } else if (/aoyou/gi.test(ua)) {
    browserInfo.name = '傲游浏览器'
    browserInfo.type = 'Chromium'
  } else if (/theworld/gi.test(ua)) {
    browserInfo.name = '世界之窗浏览器'
    browserInfo.type = 'Chromium'
  } else if (/worldchrome/gi.test(ua)) {
    browserInfo.name = '世界之窗极速浏览器'
    browserInfo.type = 'Chromium'
  } else if (/greenbrowser/gi.test(ua)) {
    browserInfo.name = '绿色浏览器'
    browserInfo.type = 'Chromium'
  } else if (/baidu|bidubrowser/gi.test(ua)) {
    browserInfo.name = '百度浏览器'
    browserInfo.type = 'Chromium'
  } else if (/MicroMessenger/gi.test(ua)) {
    browserInfo.name = '微信浏览器'
    browserInfo.type = 'Chromium'
  } else if (/2345Explorer/gi.test(ua)) {
    browserInfo.name = '2345浏览器'
    browserInfo.type = 'Chromium'
  } else if (/samsungbrowser/gi.test(ua)) {
    browserInfo.name = '三星浏览器'
    browserInfo.type = 'Chromium'
  } else if (/heytapbrowser/gi.test(ua)) {
    browserInfo.name = 'ColorOS浏览器'
    browserInfo.type = 'Chromium'
  }

  if (!browserInfo.name) {
    browserInfo.name = browserInfo.type ? `${browserInfo.type}浏览器` : '未知'
  }
  // 2345浏览器
  // #endregion

  // #region 操作系统
  let osVersionMatch
  if (/linux/gi.test(ua)) {
    // linux
    browserInfo.os = 'Linux'
    browserInfo.terminalType = 'PC'

    if (
      (osVersionMatch = ua.match(/[(](linux;)?.*android ([\d.]+);.*[)]/i)) !=
      null
    ) {
      browserInfo.os = 'Android'
      browserInfo.terminalType = 'Mobile'
      browserInfo.osVersion = osVersionMatch[2]
    }
  } else if (
    (osVersionMatch = ua.match(/[(](i[^;]+);( U;)? CPU(.+)Mac OS X[)]/i)) !=
    null
  ) {
    // 苹果系
    if (/iPad/gi.test(osVersionMatch[1])) {
      browserInfo.os = 'Apple/iPadOS'
      browserInfo.terminalType = 'Mobile'
    } else if (/iPhone/gi.test(osVersionMatch[1])) {
      browserInfo.os = 'Apple/IOS'
      browserInfo.terminalType = 'Mobile'
    } else if (/Mac/gi.test(osVersionMatch[1])) {
      browserInfo.os = 'Apple/MacOS'
      browserInfo.terminalType = 'PC'
    }

    browserInfo.osVersion = osVersionMatch[3]
      .match(/os (.*) like/i)?.[1]
      ?.replaceAll('_', '.')
  } else if (/Win/gi.test(ua)) {
    browserInfo.os = 'Windows'
    browserInfo.terminalType = 'PC'
    if (
      (osVersionMatch = ua.match(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/i)) !=
      null
    ) {
      if (osVersionMatch[1] == 'nt') {
        switch (osVersionMatch[2]) {
          case '5.0':
            browserInfo.osVersion = '2000'
            break
          case '5.1':
            browserInfo.osVersion = 'XP'
            break
          case '6.0':
            browserInfo.osVersion = 'Vista'
            break
          case '6.1':
            browserInfo.osVersion = '7'
            break
          case '10':
          case '10.0':
            browserInfo.osVersion = '10'
            break
          case '11.0':
          case '10.1':
            browserInfo.osVersion = '11'
            break
          default:
            browserInfo.osVersion = 'NT'
            break
        }
      } else if (osVersionMatch[1] == '9x') {
        browserInfo.osVersion = 'ME'
      } else {
        browserInfo.osVersion = osVersionMatch[1]
      }
    }
  }
  // #endregion

  browserInfo.$ua = ua
  return browserInfo
}
