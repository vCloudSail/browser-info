# @cloudsail/browser-info

这是一个基于 userAngent 分析浏览器信息的工具库

## 安装/使用

### 安装

```shell
npm i @cloudsail/browser-info -S
```

### 使用

- window: window.$browserInfo
- export: browserInfo

#### 基础使用

```javascript
import BrowserInfo, { getBrowerInfo } from '@cloudsail/browser-info'

// 自动获取浏览器信息
const info = BrowserInfo
// 手动获取浏览器信息
const info = getBrowerInfo(navigator.userAgent)
```

#### 全局变量使用

```javascript
import '@cloudsail/browser-info'

if (window.$browserInfo.terminalType === 'PC') {
  // do something
}
```

#### vue 使用

```javascript
import browserInfo from  "@cloudsail/browser-info";




// vue3
import { createApp, ref } from "vue";
const app = createApp(App)


// 挂载全局变量
app.config.globalProperties.$browserInfo = ref(window.$browserInfo)

// vue2
import Vue from "vue";

// 挂载全局变量
Vue.prototype.$browserInfo = Vue.observable(window.$browserInfo)


// 组件内使用
export default defineComponent({
  method(){
    aa(){
      const os = this.$browserInfo.os
    }
  }
})

```

#### 判断 PC 端和移动端

```javascript
import BrowserInfo, { getBrowerInfo } from '@cloudsail/browser-info'

if (BrowserInfo.terminalType === 'PC') {
  // do something
}
if (BrowserInfo.terminalType === 'Mobile') {
  // do something
}
```

#### 判断是否为苹果设备

```javascript
import BrowserInfo, { getBrowerInfo } from '@cloudsail/browser-info'

if (['Apple/IOS', 'Apple/MacOS', 'Apple/iPadOS'].includes(testBrowserInfo.os)) {
  // do something
}

if (/^Apple/i.test(testBrowserInfo.os)) {
  // do something
}
```

## 属性/事件

### 属性

| 属性         | 描述           |
| ------------ | -------------- |
| name         | 浏览器名称     |
| type         | 浏览器类型     |
| version      | 浏览器版本     |
| core         | 浏览器内核     |
| coreVersion  | 浏览器内核版本 |
| os           | 操作系统       |
| osVersion    | 操作系统版本   |
| terminalType | 终端设备类型   |
| applet       | 所在小程序类型 |

**具体枚举值见 index.d.ts**

### 事件

| 名称     | 描述                 |
| -------- | -------------------- |
| uachange | userAgent 变化时触发 |

## 功能/计划

- [x] PC 端使用开发者工具切换设备仿真是自动重新解析（通过 resize 事件）
- [x] 支持浏览器内核、版本解析
- [x] 支持浏览器类型、名称（包括国产套壳浏览器）、版本解析
- [x] 支持操作系统、版本（版本不一定准确）解析
- [x] 支持终端设备类型解析
- [ ] 支持小程序类型解析

## 浏览器 UA 大全（已测试过的）

### 谷歌浏览器

#### Windows
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36
```

#### Android
```
Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36
```

#### IOS
```
Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1
```

### Edge 浏览器（PC/移动端）

#### Windows
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0
```

#### Android
```
Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36 Edg/121.0.0.0
```

#### IOS
```
Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/121.0.0.0
```

### 火狐浏览器

#### Windows
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0
```

#### Android
```
Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36
```

#### IOS
```
Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/121.0.0.0
```

### Safari 浏览器

### 微信内置浏览器

#### Windows
```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309092b) XWEB/8555 Flue
```

#### Android
```
Mozilla/5.0 (Linux; Android 13; 23049RAD8C Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36 XWEB/1160065 MMWEBSDK/20231202 MMWEBID/8797 MicroMessenger/8.0.47.2560(0x28002F35) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64
```

### 夸克浏览器

#### Android
```
Mozilla/5.0 (Linux; U; Android 13; zh-CN; 23049RAD8C Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.58 Quark/6.7.0.401 Mobile Safari/537.36
```

### OPPO 浏览器

#### Android
```
Mozilla/5.0 (Linux; U; Android 11; zh-cn; PDRM00 Build/RKQ1.200903.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.80 Mobile Safari/537.36 HeyTapBrowser/40.7.27.2
```

### 小米浏览器

#### Android
```
Mozilla/5.0 (Linux; U; Android 12; zh-cn; 2201122C Build/SKQ1.211006.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.116 Mobile Safari/537.36 XiaoMi/MiuiBrowser/15.9.18 swan-mibrowser
```

MIUI14+部分机型出现以下 UA

```
UA: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/109.0.5414.118 Safari/534.24 XiaoMi/MiuiBrowser/18.1.20130 swan-mibrowser
```

### Alook 浏览器
#### Android
```
Mozilla/5.0 (Linux; Android 13; 23049RAD8C Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36
```

### 钉钉内置浏览器
#### IOS
```
Mozilla/5.0 (iPhone; CPu iPhone OS 16 6 like Mac Os x)AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20G75AliApp(DingTalk/7.5.5) com.laiwang.DingTalk/34999137Channel/201200 language/zh-Hans-CN UT4Aplus/0.0.6 WK
```