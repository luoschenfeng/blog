import { defineConfig } from 'vitepress'
import { nav,sidebar } from './router'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: './src',
  title: "luoschenfeng blog",
  description: "record my study",
  cleanUrls: true,
  base: '/blog/',
  outDir: 'dist',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/blog/logo.png' }],
    [
      'link',
      {
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        href:
          'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css',
        rel: 'stylesheet'
      }
    ],
  ],
  lastUpdated: true,
  themeConfig: {
    logo:'/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/luoschenfeng/blog' }
    ],
    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/luoschenfeng/blog/edit/main/src/:path',
      text: 'Edit this page on GitHub'
    }
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-katex'))
    }
  }
})

