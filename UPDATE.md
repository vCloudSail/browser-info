# 0.0.1
- 初始版本

# 0.0.2
- 优化d.ts类型定义
- 部分工具类方法拆分
- 优化readme
- 调整ua变化时抛出的事件名称

# 0.0.3
- 支持nodejs环境
- 支持手动传入userAgent获取浏览器信息
- 调整getBrowserInfo方法
  + 改名为parseUserAgent，对外导出名称不变
  + 由调用方传入userAgent参数不再默认获取navigator.userAgent
# 0.0.4
- 修复在nodejs环境中使用异常问题
  
# 0.1.0
- 增加对小米浏览器的支持
- README文档增加UA大全