<div align="center"> <a href="https://github.com/lhj-web/basic-admin"> <img alt="EduCMS Logo" width="100px" src="https://my-picture-bed-1304169582.cos.ap-nanjing.myqcloud.com/uPic/education.svg"> </a> <br> <br>
<a href="https://github.com/lhj-web/basic-admin/blob/main/LICENSE"><img src="https://img.shields.io/github/license/lhj-web/basic-admin"></a>&nbsp;
<a href="https://github.com/lhj-web/basic-admin/stargazers"><img src="https://img.shields.io/github/stars/lhj-web/basic-admin"></a>
<h1>Basic-Admin</h1>
</div>

## 介绍

一个基于**Vue3+Typescript+Vite+Less+UnoCSS**开发的课程后台管理系统，采用动态权限设计，前端路由由后台进行返回，菜单有三种类型：目录、菜单和按钮，菜单对应查看权限，按钮对应增加｜修改｜删除权限，由前端(按钮控制)和后台(用户拥有权限验证)共同控制权限。

## 为什么要做这个项目

本着对新技术的热爱发现了[vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)这个仓库，让我学习到了与 Vue3 相关的新技术以及中后台系统的设计方案(感谢作者的开源)，为了更好的吸收这些知识就准备了这个项目进行实践。为了确保前后端接口类型的统一，使用了对 TS 支持最好的 Nest 框架作为后端开发框架，该项目目前只实现了系统的基本功能，将会继续进行更新。

## 改变
- [x] i18n由ts文件转为yml文件
- [x] 添加登陆验证码
- [x] 替换WindiCSS为UnoCSS
- [x] ...一些小改进

## 后台项目

[basic-admin-api](https://github.com/lhj-web/basic-admin-api) - 使用 Nestjs+Mongodb+Redis 开发的后台api。

| 用户名 | 密码     | 说明                         |
| ------ | -------- | ---------------------------- |
| admin  | password | 管理员账号，拥有所有权限     |
| test   | 123456   | 测试用户，拥有查看和添加权限 |

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/lhj-web/basic-admin.git
```

- 安装依赖

```bash
cd basic-admin

pnpm i

```

- 运行

```bash
pnpm serve
```

- 打包

```bash
pnpm build
```

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |
