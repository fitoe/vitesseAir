<script setup lang="ts">
const route = useRoute()
useHead({
  title: () => `${route.meta.title} - ${sitename}`,
})
</script>

<template>
  <div class="">
    <LayoutHeader />
    <main class="container">
      <router-view v-slot="{ Component }">
        <keep-alive :exclude="[]">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
    <LayoutFooter />
  </div>
</template>
