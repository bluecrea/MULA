# 定制需求

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

>BugFixed

```javascript
//build后图片路径问题：
//build -> utils.js
if (options.extract) {
  return ExtractTextPlugin.extract({
    use: loaders,
    fallback: 'vue-style-loader',
    publicPath:'../../'  //加上这句
  })
} else {
  return ['vue-style-loader'].concat(loaders)
}
```
display:flex 布局：
```css
.flex {
  display: flex;
  flex-direction: row;
  /**
  决定主轴的方向(排列方向)
  row（默认值）：主轴为水平方向，起点在左端。
  row-reverse：主轴为水平方向，起点在右端。
  column：主轴为垂直方向，起点在上沿。
  column-reverse：主轴为垂直方向，起点在下沿
  */
  justify-content:center;  
  /*
  在主轴上的对齐方式
  flex-start（默认值）：左对齐
  flex-end：右对齐
  center： 居中
  space-between：两端对齐，项目之间的间隔都相等。
  space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
   */
   align-content: center;
   /*
   在交叉轴上如何对齐
   flex-start：交叉轴的起点对齐。
   flex-end：交叉轴的终点对齐。
   center：交叉轴的中点对齐。
   baseline: 项目的第一行文字的基线对齐。
   stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
   */
}

```
