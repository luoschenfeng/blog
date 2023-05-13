# path

理文件和目录的路径的实用工具

获取根目录

```js
async function getRoot(dir) {
  dir = path.normalize(dir)
  dir = path.resolve(dir)
  try {
    let pkg = path.join(dir, 'package.json')
    await fs.access(pkg)
    return dir
  } catch {
    if (dir === '/') return __dirname
    return getRoot(path.dirname(dir))
  }
}
```
