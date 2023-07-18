# @cloudsail/browser-info
这是一个基于userAngent分析浏览器信息的工具库


**已测试环境**
- 谷歌浏览器
- Edge浏览器（PC/移动端）
- 火狐浏览器
- Safari浏览器
- 微信内置浏览器（移动端）
- 夸克浏览器（移动端）


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
import BrowserInfo, { getBrowerInfo } from "@cloudsail/browser-info";

// 自动获取浏览器信息
const info = BrowserInfo
// 手动获取浏览器信息
const info = getBrowerInfo(navigator.userAgent)
```

#### 全局变量使用

```javascript
import "@cloudsail/browser-info";

if(window.$browserInfo.terminalType === 'PC')
{
 // do something 
}
```


#### vue使用

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


#### 判断PC端和移动端
```javascript
import BrowserInfo, { getBrowerInfo } from "@cloudsail/browser-info";

if(BrowserInfo.terminalType === 'PC')
{
 // do something 
}
if(BrowserInfo.terminalType === 'Mobile')
{
 // do something 
}
```


#### 判断是否为苹果设备
```javascript
import BrowserInfo, { getBrowerInfo } from "@cloudsail/browser-info";

if(['Apple/IOS','Apple/MacOS','Apple/iPadOS'].includes(testBrowserInfo.os))
{
 // do something 
}

if(/^Apple/i.test(testBrowserInfo.os))
{
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

**具体枚举值见index.d.ts**

### 事件
| 名称     | 描述                |
| -------- | ------------------- |
| uachange | userAgent变化时触发 |

## 功能/计划
- [x] PC端使用开发者工具切换设备仿真是自动重新解析（通过resize事件）
- [x] 支持浏览器内核、版本解析
- [x] 支持浏览器类型、名称（包括国产套壳浏览器）、版本解析
- [x] 支持操作系统、版本（版本不一定准确）解析
- [x] 支持终端设备类型解析
- [ ] 支持小程序类型解析
