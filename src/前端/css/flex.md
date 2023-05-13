# flex

css2 通过 inline 、block 、tabel 、position 这四种模型进行网页布局。本文介绍的是 css3 引入的新的布局模型： [flex布局](https://www.w3.org/TR/css-flexbox-1/#flex-layout) ，来应对更加复杂和灵活的页面布局。


## 概述

`flex布局` 又叫 flexbox ，是一种布局模型。

将元素的计算属性 display 设置为 `flex` ， 或 `inline-flex`时 ，就可以应用`flex布局`。
```css
.flex-container {
    /* 块级 */
    display: flex;
    /* or 行级*/
    /* display: inline-flex */
}
```
这个元素就被称为 [flex容器](#flex容器) (flex container)，它的子元素叫做 [flex元素](#flex元素) (flex items)。**flex容器** 建立了一个 flex formatting context ，也就没有了 block formatting context 的 margin塌陷、 float 等特性。**flex容器** 与 **块容器** 相似，一些应用到 **块容器** 的属性(如：overflow) 可以使用，但还有一些属性是不能使用的，包括：

 - **float 、 clear**

 - **vertical-align**

 - **::first-line 、 ::first-letter 伪元素**


## flex容器

### 图示

![flex-direction-terms](/images/flex-direction-terms.svg)

`main axis` (main dimension) 为 **主轴** ， **flex元素** 沿着 **主轴** 从 `main-start` 开始平铺，一直到 `main-end` 结束； `cross axis` (cross dimension) 为 **交叉轴** (也叫副轴)，垂直于 **主轴** ，**flex元素** 从 `cross-start` 开始放置， 一直到 `cross-end` 结束； `main size` 为 **主轴** 方向上的宽度或高度，`cross size` 为 **交叉轴** 方向上的高度或宽度。 **主轴** 方向上有 max-width 和 min-width 属性， **交叉轴** 方向上有 max-height 和 min-height 属性。

这些属性与元素的物理属性(left，width等)的映射关系与 [flex-flow](#flex-flow) 和 [writing mode](https://www.w3.org/TR/css-writing-modes-4/#writing-mode) 的属性值有关

## flex元素

`flex容器` 中连续的文本节点[text run](https://www.w3.org/TR/css-display-3/#css-text-run),会生成一个 `flex item` ，空的文本节点会被忽略；每一个 块级元素也会生成一个 `flex item`。这些 `flex item` 总称为 `flex items`

```html
<div class="outer">
    这是一个节点
    <span>这还是一个文本节点</span>
    <div class="inner-2">这是一个盒子</div>
    <!-- 这是一个空的文本节点 -->
</div>
```

上面这段html会生成两个 `flex item`

### position

绝对定位的 `flex item` 是相对于 `flex容器` 的 content box 来偏移的，top 、left等属性在此时是不起作用的，最后的效果就好像绝对定位的 `flex item` 是这个 `flex容器` 的第一个子元素一样。相对定位的 `flex item` 的top 、left等属性也是没有作用的

### margin padding

 `flex item` 的 margin, padding 属性和 **盒模型** 类似， 百分比时取的是 [包含块](https://www.w3.org/TR/css-display-3/#containing-block) 的宽度

### z-index

 `flex item` 是 `flex容器` 的子元素，其初始的堆叠顺序和 inline-block 相同。但order属性可以改变 `flex item` 的文档顺序，所以也会影响自己的堆叠的顺序。


## flex布局属性

应用于 `flex容器` 的属性有6个，分别是 [flex-direction](#flex-direction) 、[flex-wrap](#flex-wrap) 、[flex-flow](#flex-flow)  、[justify-content](#justify-content)  、[align-items](#align-items)  、[align-content](#align-content) 。

:::tip

`flex-direction`、`flex-wrap`、`flex-flow`、`order` 属性并不会改变文档的可访问性顺序，只是视觉位置的改变

:::

### flex-direction

*可用值：* `row` | `row-reverse` | `column` | `column-reverse`

*初始值：* `row`

`flex-direction` 属性设置 `flex容器` 的 **main axis** 的方向，从而指定了 `flex item` 的布局方向。

![flex-direction](/images/flex-direction.png)

- **row**

`flex容器`  **main axis** 的方向与 [writing mode](https://www.w3.org/TR/css-writing-modes-4/#writing-mode)  的 **行内流动** 方向一致。  `flex items` 在 ltr 文档中从左到右开始布局， 在 rtl 文档中从右到左布局

- **row-reverse**

`flex容器` 的布局方向与 [writing mode](https://www.w3.org/TR/css-writing-modes-4/#writing-mode)  的 **行内流动方向** 相反。  `flex items` 在 ltr 文档中从右到左开始布局， 在 rtl 文档中从左到右布局

- **column**

`flex容器`  **main axis** 的方向与 [writing mode](https://www.w3.org/TR/css-writing-modes-4/#writing-mode)  的 **块级堆叠** 方向一致。

- **column-reverse**

`flex容器`  **main axis** 的方向与 [writing mode](https://www.w3.org/TR/css-writing-modes-4/#writing-mode)  的 **块级堆叠** 方向相反。

### flex-wrap

*可用值：* `no-wrap` | `wrap` | `wrap-reverse`

*初始值：* `no-wrap`

`flex-wrap` 属性设置 `flex容器` 是否多行显示。`cross axis` 的方向决定了新行的堆叠方向

![flex-wrap](/images/flex-wrap.png)

- **no-wrap**

`flex-wrap` 的 默认值，表示 `flex容器` 单行显示，当 `flex items` 的宽度（flex布局算法计算的宽度）大于容器的宽度时，由于 `flex容器` 的 overflow 属性为 visibile,所以还是会溢出显示。

- **wrap**

`flex容器` 多行显示，当一个 `flex item` 的宽度大于 `flex容器` 的剩余空间时，这个 `flex item`  就会出现折行，下一行堆叠的顺序与 `cross-axis` 方向相同

- **wrap-reverse**

与**wrap**唯一的区别 `cross-axis` 的方向被颠倒

### flex-flow

*初始值：* `row no-wrap`

[flex-direction](#flex-direction) 和 [flex-wrap](#flex-wrap) 的简写，当只有一个值时，指定的为 [flex-direction](#flex-direction) 的值。

### justify-content

`justify-content` 定义了 flex item 沿主轴的对齐

- **flex-start**

- **flex-end**

- **center**

- **space-between**

- **space-around**

### algin-items

`algin-items` 定义了 flex item（单行） 沿交叉轴的对齐

flex-start | flex-end | center | baseline | stretch

### algin-content

`algin-content` 定义了多个容器行在容器中的对齐方式

flex-start | flex-end | center | space-between | space-around | stretch


应用于 `flex item` 的属性有6个，分别是 [flex](#flex)  、 [flex-grow](#flex-grow) 、[flex-shrink](#flex-shrink) 、[flex-basis](#flex-basis)  、[align-self](#align-self) 、 [order](#order)

### flex

flex 为 flex-grow flex-shrink flex-basis 的缩写，如果不设置  flex item 的宽度，则会使用 [content](https://www.w3.org/TR/css-flexbox-1/#min-size-auto) 的最小宽度，设置 flex 属性会计算 flex item 主轴方向的尺寸。

*初始值：* `1 0 auto`

- **none**

**none** 表示为 `0 0 auto`

### flex-grow

flex-grow 定义了当有正数的空间分配给 flex items, 一个 flex item 相对于其余的 flex items 所增长的空间。

*初始值：* `1`

初始值为 1，表示个增长相同的空间

### flex-shrink

flex-shrink 定义了当有负数的空间分配给 flex items, 一个 flex item 相对于其余的 flex items 所减少的空间， 

*初始值：* `0`

初始值为 0，表示不减少宽度

### flex-basis

flex-basis 定义了 flex item 的初始宽度，最后用于计算分配给 flex items 空间。

*初始值：* `auto`

- **auto**

使用 auto，与使用 **content** 值相同

- **content**

基于 flex item（flex 项） 的内容宽度（一般为 max-content）

- **width**

与 width 属性类似, 0 表示不指定用于计算剩余空间的宽度。

### align-self

`align-self` 用于覆盖 应用于 flex  items 的 `algin-items` 属性。

### order

order 指定在 flex 容器中具有相同 order 组的布局顺序，从具有低的 roder 组的 flex item 开始布局

*初始值：* `0`

