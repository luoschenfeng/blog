# 概述
  
`PWA`（Progressive Web Apps） 是渐进式Web应用的简称，结合了特定平台的app和Web app的优点，即可以在浏览器中访问，也可以以app的形式下载到桌面使用，并且只需要写一套代码。

PWA 有以下特性：

- 可安装。

- 依托于现代web的不断发展，具有特定平台的app才有的能力。比如消息通知。

- 可靠性等优点（快，方便，沉浸）。

![PWA capable](/images/pwa-capable.svg)

## 商业价值

研究发现

- 用户不下载特定平台 app 的原因大多是因为其占用的存储太多，依据 [Google Play study](https://medium.com/googleplaydev/shrinking-apks-growing-installs-5d3fcba23ce2) 的分析， app的占用存储每增加 6MB ，安装的用户就会下降 1%，通常 Android 应用超过 10MB， ios应用超过 30MB，而 `PWA` 占用的存储仅仅 1MB 不到。

- 用户更喜欢从手机上购买产品，并且多半不下载桌面app而是在产品的官方网站直接下单。下载app的用户更喜欢从消息通知中点击直接下单。[数据支持](https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/smartphone-mobile-app-and-site-purchase-data/)

`PWA` 提供了网页应用的最佳实践来使网站更快；更可靠；可安装；沉浸。来解决[用户的需要](https://web.dev/drive-business-success/#solve-customer-needs)。也可以从各种维度来测量 `PWA` 产生的商业价值（比如转换率）。

## Web app 可安装的条件

如果满足以下条件，浏览器就会触发 `beforeinstallprompt` 事件，从而提示用户安装。通常地址栏有个下载的 `icon`

- Web app 没有被安装

- 安装的触发机制

- 通过https与后端进行通信

- 注册一个带有 `fetch` 处理函数的 `service worker`

- 有一个 `manifest` 文件，包含以下属性

  - `short_name` 或者 `name`

  - `icons`，必须包含  **192px** 和 **512px** 这两个尺寸

  - `start_url`

  - `display`， 值为 `fullscreen`、 `standalone`、 `minimal-ui` 中的一个

  - `prefer_related_applications` 必须为 **false**

## PWA 的安装策略

`PWA` 的安装策略有两种：通过平台的应用商店安装；通过浏览器安装。通过[TWA (Trusted Web Activities)](https://developers.google.com/web/android/trusted-web-activity) 技术可以使得 PWA 上传到 app store， 提供一个于特定平台 app 相同下载体验的轻量级 app。

安装应用程序，页面在独立的窗口运行，而不像在浏览器中，用户可能会随时切换tab。从而给用户带来沉浸式的体验。

同时安装特定平台 app 和 PWA，可能会让用户产生困惑，所以需要制定相应的安装策略（比如跟踪发现有些用户不喜欢使用特定平台的app，而是经常从浏览器进行访问，就可以对这些用户推送  PWA 的安装提示），[详见这里](https://web.dev/define-install-strategy/)。

## manifest

`manifest` 文件普遍被命名为 `manifest.json` ，按照规范是以 `.webmanifest` 为文件后缀，形如：

```json 
{
  "short_name": "Weather",
  "name": "Weather: Do I need an umbrella?",
  "icons": [
    {
      "src": "/images/icons-vector.svg",
      "type": "image/svg+xml",
      "sizes": "512x512"
    },
    {
      "src": "/images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/?source=pwa",
  "background_color": "#3367D6",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#3367D6",
  "shortcuts": [
    {
      "name": "How's weather today?",
      "short_name": "Today",
      "description": "View weather information for today",
      "url": "/today?source=pwa",
      "icons": [{ "src": "/images/today.png", "sizes": "192x192" }]
    },
    {
      "name": "How's weather tomorrow?",
      "short_name": "Tomorrow",
      "description": "View weather information for tomorrow",
      "url": "/tomorrow?source=pwa",
      "icons": [{ "src": "/images/tomorrow.png", "sizes": "192x192" }]
    }
  ],
  "description": "Weather forecast information",
  "screenshots": [
    {
      "src": "/images/screenshot1.png",
      "type": "image/png",
      "sizes": "540x720"
    },
    {
      "src": "/images/screenshot2.jpg",
      "type": "image/jpg",
      "sizes": "540x720"
    }
  ]
}
```
- `short_name` / `name`

app 的名称，short_name  在 主屏、 启动时使用，name在安装的时候使用，在 `standalone` 模式下会渲染为html的title标签

- `icons`

有size、type、src 三个属性，在 Chromium 中需要提供 `192x192` 和 `512x512` 像素的图片，如果想要更好的适应不同屏幕，可以提供更多的以 `48dp` 为增量的图片

- `start_url`

开启 app 之后要打开的页面地址

- `background_color`

打开app，启动页的背景颜色

- `display`

控制 app 的浏览器 UI， 比如地址栏，设置栏，有以下可用属性

|property|使用场景|
|:-:|:-:|
| fullscreen | 没有任何浏览器 UI，和浏览器全屏类似 |
| standalone | 独立窗口运行，并且隐藏浏览器 UI |
| minimal-ui | 类似于standalone，但提供了回退、刷新等UI |
| browser | 浏览器的体验 |

- `display_override`

浏览器并不会都支持以上4种显示模式，当浏览器不支持设置的 display 属性时，会按照 `fullscreen` → `standalone` → `minimal-ui` → `browser` 的回退链进行回退。`display_override` 为一个数组，app 在读取并计算 display 之前会先读取这个属性，把第一个支持的属性应用到 dispaly 上。

- `scope`

控制 app 可访问的页面，如果访问的链接不在其内，会在 PWA 窗口之外打开链接，设置 `target="_blank"` 会打开新的标签也
  
:::tip

- 如果没有指定 scope，默认为 manifest 文件所在目录的 url

- start_url 必须被包含在里面，并且路径是相对于 scope 属性的，以 `/` 开头则是服务的根路径

:::

- `theme_color`

设置工具栏的颜色
![theme_color](/images/pwa-theme-color.png)

- `shortcuts`

右键或长按 app 图标时，弹出的下拉任务菜单，是一个每项都是字典的数组，字典至少包含 `name` 和 `src`

![shortcuts](/images/pwa-shortcuts.png)

官方说明，[请看这里](https://web.dev/app-shortcuts/)

:::tip 属性说明

- `name`

  任务名称

- `short_name` (optional)

  简短的任务名称

- `description` (optional)

  任务描述，可能在未来辅助技术会用到

- `url`

  在 scope 之内的链接，激活 app shorticut 时会打开相应的链接

- `icons` (optional)

  任务图标，为一个每项都是字典的数组，字典必须包括 `src` 和 `sizes` 属性，也可以指定 `type` 属性。这里的 icon 类型不支持 `SVG`,请用 `PNG` 代替
  
:::

- `description`

描述app的作用

- `screenshots`

## 测试 manifest

可以在 devtool 工具中的 application 菜单下查看 manifest 的效果

## app 唤醒页

默认使用 `name`、 `background_color`、 `icons` 来渲染启动页

