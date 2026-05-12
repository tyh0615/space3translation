## 插件实现

1. **manifest.json** - 配置了 Manifest V3 标准的插件文件
2. **content.js** - 实现了核心功能：
   - 三连击空格键检测（500ms时间窗口）
   - 自动语言检测（中文→英文，英文→中文）
   - 使用 Google 翻译 API 进行翻译
   - 支持 input、textarea 和可编辑元素

## 如何使用

1. 打开 Chrome/Edge 浏览器，访问 `chrome://extensions/`（Edge 访问 `edge://extensions/`）
2. 开启"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `translation-plugin` 文件夹
5. 在任意网页输入框中输入文本，**快速连按三次空格键**即可触发翻译！
6. 也可单独安装插件 `translation-plugin\translation-plugin.crx` or `translation-plugin\translation-plugin.pem`
