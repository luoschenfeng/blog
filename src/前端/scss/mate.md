# mate

## mate.module-variables

利用 module-variables 生成多主题

```scss
@use '_dark.scss';
@use '_blue.scss';
@use "sass:map";
@use "sass:meta";
@mixin themeStyle($property, $scssVar) {
    @at-root .dark & {
      #{$property}: map.get(meta.module-variables("dark"), $scssVar);
    }
    @at-root .blue & {
      #{$property}: map.get(meta.module-variables("blue"), $scssVar);
    }
}
```
