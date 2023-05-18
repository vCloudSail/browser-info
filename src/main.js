/**
 * 各浏览器的ua
 * IE6:     mozilla/4.0 (compatible; msie 6.0; windows nt 5.1; sv1)
 * IE11:    mozilla/5.0 (windows nt 10.0; wow64; trident/7.0; .net4.0c; .net4.0e; .net clr 2.0.50727; .net clr 3.0.30729; .net clr 3.5.30729; rv:11.0) like gecko
 * OldEdge: mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/52.0.2743.116 safari/537.36 edge/15.15063
 * NewEdge: mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/88.0.4324.96 safari/537.36 edg/88.0.705.53
 * Chrome:  mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/88.0.4324.104 safari/537.36
 * Firefox: mozilla/5.0 (windows nt 10.0; win64; x64; rv:84.0) gecko/20100101 firefox/84.0
 * Safari:  mozilla/5.0 (windows nt 5.1) applewebkit/534.57.2 (khtml, like gecko) version/5.1.7 safari/534.57.2
 * Opera:   mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/60.0.3112.90 safari/537.36 opr/47.0.2631.80 (edition baidu)
 *
 * IE浏览器
 * IE8+支持返回浏览器渲染当前文档所用的模式
 * - IE6,IE7:undefined
 * - IE8:8(兼容模式返回7)
 * - IE9:9(兼容模式返回7||8)
 * - IE10:10(兼容模式7||8||9)
 */

/**
 * 流程
 * 1. 获取浏览器类型、内核
 * 2. 获取浏览器
 */

function getBrowerCore() {
  const ua = navigator.userAgent.toLowerCase()

  let core, version, match

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
 * @returns {import('..').Brower.BrowerInfo}
 */
export function getBrowerInfo(info) {
  const ua = navigator.userAgent.toLowerCase()

  /**
   * @type {import('..').Brower.BrowerInfo}
   */
  const browerInfo = info || {}

  // #region 获取内核及版本
  const coreInfo = getBrowerCore()
  browerInfo.core = coreInfo.core
  browerInfo.coreVersion = coreInfo.version

  // #endregion

  // #region 获取浏览器类型、版本、名称
  let browerVersionMatch = null

  browerInfo.name = ''
  browerInfo.type = 'Other'
  if (
    browerInfo.core === 'Trident' &&
    ((browerVersionMatch = ua.match(/msie ([\d.]+)/i)) != null || // IE6-10
      (browerVersionMatch = ua.match(/rv\:([\d.]+)/)) != null) // IE11
  ) {
    // IE
    browerInfo.type = 'IE'
  } else if (
    browerInfo.core === 'Presto' &&
    ((browerVersionMatch = ua.match(/opera.([\d.]+)/i)) != null ||
      (browerVersionMatch = ua.match(/opr\/([\d.]+)/i)) != null)
  ) {
    // opera
    browerInfo.type = 'Opera'
  } else if (
    browerInfo.core === 'Gecko' &&
    (browerVersionMatch = ua.match(/firefox\/([\d.]+)/i)) != null
  ) {
    // firefox
    browerInfo.type = 'Firefox'
  } else if (browerInfo.core === 'WebKit') {
    // webkit系的浏览器

    if ((browerVersionMatch = ua.match(/edge\/([\d.]+)/i)) != null) {
      // 旧版edge
      browerInfo.type = 'Edge(Old)'
    } else if ((browerVersionMatch = ua.match(/edga?[/]([\d.]+)/i)) != null) {
      // 新版edge
      browerInfo.type = 'Edge'
    } else if (
      /Safari/gi.test(ua) &&
      !/Chrome/gi.test(ua) &&
      (browerVersionMatch = ua.match(/version\/([\d.]+).*safari/i)) != null
    ) {
      // 先判断safari，因为chrome有可能也会带上safri字段
      browerInfo.type = 'Safari'
    } else if ((browerVersionMatch = ua.match(/chrome\/([\d.]+)/i)) != null) {
      // Chrome
      browerInfo.type = 'Chrome'
    }
  }

  browerInfo.version =
    browerVersionMatch?.length >= 2 ? browerVersionMatch?.[1] : ''

  // 解析套壳、手机厂商、APP内置浏览器的名字
  if (/qqbrowser/gi.test(ua)) {
    browerInfo.name = 'QQ浏览器'
    browerInfo.type = 'Chromium'
  } else if (/se 2.x/gi.test(ua)) {
    browerInfo.name = '搜狗浏览器'
    browerInfo.type = 'Chromium'
  } else if (/aoyou/gi.test(ua)) {
    browerInfo.name = '傲游浏览器'
    browerInfo.type = 'Chromium'
  } else if (/theworld/gi.test(ua)) {
    browerInfo.name = '世界之窗浏览器'
    browerInfo.type = 'Chromium'
  } else if (/worldchrome/gi.test(ua)) {
    browerInfo.name = '世界之窗极速浏览器'
    browerInfo.type = 'Chromium'
  } else if (/greenbrowser/gi.test(ua)) {
    browerInfo.name = '绿色浏览器'
    browerInfo.type = 'Chromium'
  } else if (/baidu|bidubrowser/gi.test(ua)) {
    browerInfo.name = '百度浏览器'
    browerInfo.type = 'Chromium'
  } else if (/MicroMessenger/gi.test(ua)) {
    browerInfo.name = '微信浏览器'
    browerInfo.type = 'Chromium'
  } else if (/2345Explorer/gi.test(ua)) {
    browerInfo.name = '2345浏览器'
    browerInfo.type = 'Chromium'
  } else if (/samsungbrowser/gi.test(ua)) {
    browerInfo.name = '三星浏览器'
    browerInfo.type = 'Chromium'
  } else if (/heytapbrowser/gi.test(ua)) {
    browerInfo.name = 'ColorOS浏览器'
    browerInfo.type = 'Chromium'
  }

  if (!browerInfo.name) {
    browerInfo.name = browerInfo.type ? `${browerInfo.type}浏览器` : '未知'
  }
  // 2345浏览器
  // #endregion

  // #region 操作系统
  let osVersionMatch
  if (/linux/gi.test(ua)) {
    // linux
    browerInfo.os = 'Linux'
    browerInfo.terminalType = 'PC'

    if (
      (osVersionMatch = ua.match(/[(](linux;)?.*android ([\d.]+);.*[)]/i)) !=
      null
    ) {
      browerInfo.os = 'Android'
      browerInfo.terminalType = 'Mobile'
      browerInfo.osVersion = osVersionMatch[2]
    }
  } else if (
    (osVersionMatch = ua.match(/[(](i[^;]+);( U;)? CPU(.+)Mac OS X[)]/i)) !=
    null
  ) {
    // 苹果系
    if (/iPad/gi.test(osVersionMatch[1])) {
      browerInfo.os = 'Apple/iPadOS'
      browerInfo.terminalType = 'Mobile'
    } else if (/iPhone/gi.test(osVersionMatch[1])) {
      browerInfo.os = 'Apple/IOS'
      browerInfo.terminalType = 'Mobile'
    } else if (/Mac/gi.test(osVersionMatch[1])) {
      browerInfo.os = 'Apple/MacOS'
      browerInfo.terminalType = 'PC'
    }

    browerInfo.osVersion = osVersionMatch[3]
      .match(/os (.*) like/i)?.[1]
      ?.replaceAll('_', '.')
  } else if (/Win/gi.test(ua)) {
    browerInfo.os = 'Windows'
    browerInfo.terminalType = 'PC'
    if (
      (osVersionMatch = ua.match(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/i)) !=
      null
    ) {
      if (osVersionMatch[1] == 'nt') {
        switch (osVersionMatch[2]) {
          case '5.0':
            browerInfo.osVersion = '2000'
            break
          case '5.1':
            browerInfo.osVersion = 'XP'
            break
          case '6.0':
            browerInfo.osVersion = 'Vista'
            break
          case '6.1':
            browerInfo.osVersion = '7'
            break
          case '10':
          case '10.0':
            browerInfo.osVersion = '10'
            break
          case '11.0':
          case '10.1':
            browerInfo.osVersion = '11'
            break
          default:
            browerInfo.osVersion = 'NT'
            break
        }
      } else if (osVersionMatch[1] == '9x') {
        browerInfo.osVersion = 'ME'
      } else {
        browerInfo.osVersion = osVersionMatch[1]
      }
    }
  }
  // #endregion

  browerInfo.$ua = ua
  return browerInfo
}

/**
 * @type {import('..').Brower.BrowerInfo}
 */
const BrowerInfo = getBrowerInfo()

window.$browserInfo = BrowerInfo

window.addEventListener(
  'resize',
  () => {
    if (window.navigator.userAgent !== BrowerInfo.$ua) {
      getBrowerInfo(window.$browserInfo)
    }
  },
  {
    passive: true
  }
)

export default BrowerInfo

