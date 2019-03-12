# vue-tiny-code

这里会有不少基于 `Vue` 这个棒棒的框架写的小玩意儿。

现有项目：[拖拽自定义报表](/doc/dragReport.md)、[仿 `chrome` 调色板](/doc/palette.md)。

具体可以查看 `src/router/index.js` 目录，当然，以后会做一个首页导航的啦。

项目目录结构取自于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 项目。

当然，不仅仅是自己的项目，也有很多日常看其他开源项目源码时候看到的有意思的代码，具体可以查阅 `src\directive`、`src\utils` 这两个目录，相信我，里面有不少好东西。

## 各项目文档说明

[拖拽自定义报表 --- 文档跳转](/doc/dragReport.md)

```html
http://localhost:8080/dragReport
```

[仿 `chrome` 调色板 --- 文档跳转](/doc/palette.md)

```html
http://localhost:8080/palette
```

## 拷贝项目

```cmd
git clone https://github.com/jsjzh/vue-tiny-code.git
```

## 开始项目

```cmd
yarn
or
npm install
```

## 本地环境

```cmd
yarn start
or
npm start
```

## 开发环境

```cmd
yarn run build
or
npm run build
```

## 其他

`npm install` 的速度在不可抗力下会比较慢（该项目中，应该是 `node-sass` 比较慢），即使有 `npm.taobao.org` 也不能拯救我们，这个时候，我就推荐一个国内镜像的地址。

```cmd
npm install -g mirror-config-china --registry=http://registry.npm.taobao.org
```
