# @cloudsail/browser-info
这是一个基于userAngent分析浏览器信息的工具库

推荐使用pnpm进行依赖包安装及管理
## 安装/使用

### 安装

```shell
npm i @cloudsail/browser-info -S
```

### 使用

#### 基础使用

```javascript
import BrowserInfo, { getBrowerInfo } from "@cloudsail/browser-info";

// 手动获取浏览器信息
const info = getBrowerInfo()
```

###全局变量使用

```javascript
import "@cloudsail/browser-info";

if(window.$browserInfo.terminalType === 'PC')
{
 // do something 
}
```


#### vue响应式

```javascript
import "@cloudsail/browser-info";


// vue3
import { ref } from "vue";
window.$browserInfo = ref(window.$browserInfo).value

// vue2
import Vue from "vue";
window.$browserInfo = Vue.observable(window.$browserInfo)

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
## 属性

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

## 功能/计划
- [x] PC端使用开发者工具切换设备仿真是自动重新解析（通过resize事件）
- [x] 支持浏览器内核、版本解析
- [x] 支持浏览器类型、名称、版本解析
- [x] 支持操作系统、版本（版本不一定准确）解析
- [x] 支持终端设备类型解析
- [ ] 支持小程序类型解析
