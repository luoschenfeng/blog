# float

## 父元素包含浮动元素 

一般给浮动元素的父元素添加伪类，并清除伪元素的浮动来包含浮动元素，这也是比较常见的方法，如 `container1`，这种情况 `container1 title` 不是浮动元素，与 `container1` 发生 `margin 折叠`。另一种方法可以包含子元素外边距的方法是使用第二种方式，将伪元素的 `display` 设置成 `table`.

<codepen-snippet title="float" slug="qBPjQbz" :height="560" tab="result" theme="dark" :preview="false" :editable="false" :user="luoschenfeng"/>

:::tip
`clear` 属性只能用于块级元素，所以要设置成 `table`，这样可以使的字元素和父元素之间有个块级元素，避免了 `margin` 折叠。
:::
