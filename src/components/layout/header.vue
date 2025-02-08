<script setup lang='ts'>
// const router = useRouter()
</script>

<template>
  <div class="top-0 z-50 bg-white bg-opacity-50 backdrop-blur-sm lg:sticky dark:(bg-opacity-0)">
    <div class="b-b dark:b-gray-6">
      <div class="flex-between mx-auto max-w-screen-xl px-3 xl:px-0">
        <LayoutLanguage />
        <LayoutDarkswitch />
      </div>
    </div>

    <div class="mx-auto max-w-screen-xl flex items-center px-3 dark:b-gray-6 lg:px-0 lg:py-4">
      <div class="flex-1 items-center gap-x-4 lg:flex lg:gap-x-12">
        <LayoutLogo title="LOGO" url="/" />
      </div>
    </div>
  </div>
</template>
