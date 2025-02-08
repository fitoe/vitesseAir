## Layouts

此目录中的 Vue 组件用作布局。

默认情况下，`default.vue` 将被使用，除非在路由元数据中指定了替代布局。

通过 [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) 和 [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)，你可以在页面的 SFC 中指定布局，如下所示：

```vue
<route lang="yaml">
meta:
  layout: home
</route>
```
