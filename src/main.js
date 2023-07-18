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

import { debounce } from 'lodash-es'
import { parseUserAgent } from './utils'

/**
 * @type {import('..').BrowserInfo.BrowserInfoInstance}
 */

let browserInfo = null

if (typeof window !== 'undefined') {
  browserInfo = parseUserAgent(navigator.userAgent)
  window.$browserInfo = browserInfo

  const resizeDeb = debounce(() => {
    if (window.navigator.userAgent !== window.$browserInfo?.$ua) {
      const newInfo = parseUserAgent(window.$browserInfo)
      window.dispatchEvent(new CustomEvent('uachange', { detail: newInfo }))
    }
  }, 100)

  window.removeEventListener('resize', resizeDeb)
  window.addEventListener('resize', resizeDeb, {
    passive: true
  })
}

export { parseUserAgent as getBrowserInfo }

export default browserInfo
