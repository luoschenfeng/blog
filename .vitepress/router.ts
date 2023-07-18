export const nav = [
  {
    text: '前端',
    activeMatch: `^/前端/`,
    items: [
      { text: 'javascript', link: '/前端/javascript/typedArray.md' },
      { text: 'typescript', link: '/前端/typescript/everyDayType.md' },
      { text: 'vue3', link: '/前端/vue3/reactive.md' },
      { text: 'css', link: '/前端/css/flex.md' },
      { text: '工程化', link: '/前端/工程化/ast.md' },
      { text: 'npm', link: '/前端/npm/workspace.md' },
      { text: 'scss', link: '/前端/scss/mate.md' },
      { text: 'PWA', link: '/前端/PWA/outline.md' },
    ]
  },
  {
    text: '后端',
    activeMatch: `^/后端/`,
    items: [
      { text: 'koa', link: '/后端/koa/setting.md' },
      { text: 'mysql', link: '/后端/mysql/install.md' },
      { text: 'node', link: '/后端/node/buffer.md' },
      { text: 'python', link: '/后端/python/介绍.md' },
      { text: 'websocket', link: '/后端/websocket/create-websocket.md' },
    ]
  },
  {
    text: '基础',
    activeMatch: `^/基础/`,
    items: [
      { text: '计算机', link: '/基础/计算机/数字浮点数' },
      { text: '计算机网络', link: '/基础/计算机网络/chapter1.md' },
      { text: '算法', link: '/基础/算法/queen.md' },
      { text: 'http', link: '/基础/http/cache.md' },
    ]
  },
  {
    text: '运维',
    activeMatch: `^/运维/`,
    items: [
      { text: 'docker', link: '/运维/docker/command.md' },
      { text: 'nginx', link: '/运维/nginx/proxyPass.md' },
    ]
  },
  {
    text: '机器学习',
    activeMatch: `^/机器学习/`,
    link: '/机器学习/感知机.md'
  },
  {
    text: '其他',
    activeMatch: `^/其他/`,
    items: [
      { text: 'git', link: '/其他/git/git.md' },
    ]
  },
  {
    text: '关于本站',
    activeMatch: `^/关于本站/`,
    items: [
      { text: 'vuepress', link: '/关于本站/vuepress/clientAppEnhanceFiles.md' },
    ]
  },
]

export const sidebar = {
  // 前端
  '/前端/javascript/': [
    { text: 'typedArray', link: '/前端/javascript/typedArray.md' },
    { text: 'encode', link: '/前端/javascript/encode.md' },
    { text: 'generator', link: '/前端/javascript/generator.md' },
    { text: 'float', link: '/前端/javascript/float.md' },
  ],
  '/前端/typescript/': [
    { text: 'everyDayType', link: '/前端/typescript/everyDayType.md' },
    { text: 'class', link: '/前端/typescript/class.md' },
    { text: 'condition', link: '/前端/typescript/condition.md' },
    { text: 'function', link: '/前端/typescript/function.md' },
    { text: 'narrow', link: '/前端/typescript/narrow.md' },
    { text: 'typeof', link: '/前端/typescript/typeof.md' },
    { text: 'union', link: '/前端/typescript/union.md' },
    { text: 'utility', link: '/前端/typescript/utility.md' },
    { text: 'other', link: '/前端/typescript/other.md' },
  ],
  '/前端/vue3/': [
    { text: 'reactive', link: '/前端/vue3/reactive.md' },
    { text: 'props', link: '/前端/vue3/props.md' },
    { text: 'otherApi', link: '/前端/vue3/otherApi.md' },
  ],
  '/前端/css/': [
    { text: 'flex', link: '/前端/css/flex.md' },
    { text: 'color', link: '/前端/css/color.md' },
    { text: 'display', link: '/前端/css/display.md' },
    { text: 'flot', link: '/前端/css/flot.md' },
  ],
  '/前端/scss/': [
    { text: 'mate', link: '/前端/scss/mate.md' },
    { text: 'other', link: '/前端/scss/other.md' },
  ],
  '/前端/工程化/': [
    { text: 'ast', link: '/前端/工程化/ast.md' },
    { text: 'babel', link: '/前端/工程化/babel.md' },
    {
      text: 'webpack',
      items: [
        { text: '介绍', link: '/前端/工程化/webpack/介绍.md' },
      ]
    },
    {
      text: 'esbuild',
      items: [
        { text: '介绍', link: '/前端/工程化/esbuild/介绍.md' },
      ]
    }
  ],
  '/前端/npm/': [
    { text: 'workspace', link: '/前端/npm/workspace.md' },
  ],
  '/前端/PWA/': [
    { text: 'outline', link: '/前端/PWA/outline.md' },
  ],
  // 后端
  '/后端/koa/': [
    { text: 'setting', link: '/后端/koa/setting.md' },
    { text: 'body', link: '/后端/koa/body.md' },
    { text: 'error', link: '/后端/koa/error.md' },
    { text: 'middleware', link: '/后端/koa/middleware.md' },
    { text: 'router', link: '/后端/koa/router.md' },
  ],
  '/后端/mysql/': [
    { text: 'install', link: '/后端/mysql/install.md' },
    { text: 'select', link: '/后端/mysql/select.md' },
    { text: 'event', link: '/后端/mysql/event.md' },
    { text: 'other', link: '/后端/mysql/other.md' },
  ],
  '/后端/node/': [
    { text: 'buffer', link: '/后端/node/buffer.md' },
    { text: 'error', link: '/后端/node/error.md' },
    { text: 'fs', link: '/后端/node/fs.md' },
    { text: 'http', link: '/后端/node/http.md' },
    { text: 'net', link: '/后端/node/net.md' },
    { text: 'path', link: '/后端/node/path.md' },
    { text: 'process', link: '/后端/node/process.md' },
    { text: 'stream', link: '/后端/node/stream.md' },
  ],
  '/后端/python/': [
    { text: '介绍', link: '/后端/python/介绍.md' },
  ],
  '/后端/websocket/': [
    { text: 'create-websocket', link: '/后端/websocket/create-websocket.md' },
  ],

  // 基础
  '/基础/计算机/': [
    { text: '数字浮点数', link: '/基础/计算机/数字浮点数.md' },
  ],
  '/基础/计算机网络/': [
    { text: 'chapter1', link: '/基础/计算机网络/chapter1.md' },
    { text: 'chapter2', link: '/基础/计算机网络/chapter2.md' },
    { text: 'chapter3', link: '/基础/计算机网络/chapter3.md' },
    { text: 'chapter4', link: '/基础/计算机网络/chapter4.md' },
    { text: 'chapter5', link: '/基础/计算机网络/chapter5.md' },
    { text: 'chapter6', link: '/基础/计算机网络/chapter6.md' },
    { text: 'chapter7', link: '/基础/计算机网络/chapter7.md' },
    { text: 'chapter8', link: '/基础/计算机网络/chapter8.md' },
    { text: 'chapter9', link: '/基础/计算机网络/chapter9.md' },
  ],
  '/基础/算法/': [
    { text: 'queen', link: '/基础/算法/queen.md' },
    { text: 'window', link: '/基础/算法/window.md' },
  ],
  '/基础/http/': [
    { text: 'cache', link: '/基础/http/cache.md' },
    { text: 'header', link: '/基础/http/header.md' },
    { text: 'status', link: '/基础/http/status.md' },
  ],
  // 其他
  '/其他/git/': [
    { text: 'git', link: '/其他/git/git.md' },
  ],
  // 运维
  '/运维/docker/': [
    { text: 'command', link: '/运维/docker/command.md' },
  ],
  '/运维/nginx/': [
    { text: 'proxyPass', link: '/运维/nginx/proxyPass.md' },
  ],
  // 机器学习
  '/机器学习/': [
    { text: '感知机', link: '/机器学习/感知机.md' },
  ],
  // 关于本站
  '/关于本站/vuepress/': [
    { text: 'clientAppEnhanceFiles', link: '/关于本站/vuepress/clientAppEnhanceFiles.md' },
  ],
}
