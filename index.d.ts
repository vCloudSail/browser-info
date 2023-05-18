export declare namespace BrowserInfo {
  /** 浏览器内核 */
  export interface BrowserCoreType {
    /** Mozilla Firefox */
    Gecko
    KHTML
    /** Opera */
    Presto
    Tasman
    /** Internet Explorer */
    Trident
    /** Safari, Chrome */
    WebKit
  }

  /** 套壳浏览器类型 */
  // export interface BrowserShellNames {
  //   /** QQ浏览器 */
  //   QQ浏览器
  //   '360浏览器'
  //   猎豹浏览器
  //   百度浏览器
  //   搜狗浏览器
  //   世界之窗浏览器
  //   世界之窗极速浏览器
  // }

  /** 浏览器类型 */
  export interface BrowserType {
    IE
    Chrome
    /** 谷歌开源浏览器，国产\部分手机浏览器大部分基于此开发 */
    Chromium
    'Edge(Old)'
    Edge
    Firefox
    Safari
    Opera
    Other
  }

  /** 终端设备类型 */
  export interface TerminalDeviceType {
    /** PC端 */
    PC
    /** 移动端 */
    Mobile
    /** 平板端 */
    // Pad
    /**
     * 电视端(暂时不支持)
     * @deprecated
     */
    TV
  }

  /** 内部浏览器类型 */
  export interface InnerBrowserType {
    /** QQ内部浏览器 */
    QQ
    /** 微信内部浏览器 */
    Weixin
    /** QQ内部浏览器 */
    Dingding
  }

  /** 设备类型 */
  // export interface DeviceType {
  //   PC

  // }

  /** 操作系统类型 */
  export interface OSType {
    Windows
    'Apple/IOS'
    'Apple/MacOS'
    'Apple/iPadOS'
    Linux
    Android
  }

  /** 浏览器类型 */
  export interface AppletType {
    Weixin
    AliPay
    QQ
    Baidu
    /** 飞书小程序 */
    Lark
    /** 字节跳动小程序 */
    TouTiao
    /** 快手小程序 */
    KUAISHOU
    /** 东小程序 */
    JD
    /** 360小程序 */
    360
  }

  export interface BrowserInfoInstance {
    $ua: Window['navigator']['userAgent']
    name: string
    /** 浏览器类型 */
    type: keyof BrowserType
    /** 浏览器版本 */
    version: string
    /** 浏览器内核 */
    core: keyof BrowserCoreType
    /** 浏览器内核版本 */
    coreVersion: string
    /** 操作系统 */
    os: keyof OSType
    /** 操作系统版本 */
    osVersion: string
    /** 终端设备类型 */
    terminalType: keyof TerminalDeviceType
    /** 所在小程序类型 */
    applet: keyof AppletType | null
  }
}

// declare module 'vue/types/vue' {
//   // vue2
//   interface Vue {
//     $browserInfo: BrowserInfo.BrowserInfoInstance
//   }
// }
// declare module 'vue' {
//   // vue3
//   interface ComponentCustomProperties {
//     $browserInfo: BrowserInfo.BrowserInfoInstance
//   }
// }

declare global {
  declare interface Window {
    $browserInfo: BrowserInfo.BrowserInfoInstance
  }
  const $browserInfo: BrowserInfo.BrowserInfoInstance
}

const browserInfo: BrowserInfo.BrowserInfoInstance

/**
 * 获取浏览器信息，如果传入了info，则更新此对象
 */
export function getBrowserInfo(
  info?: BrowserInfo.BrowserInfoInstance
): BrowserInfo.BrowserInfoInstance

export default browserInfo
