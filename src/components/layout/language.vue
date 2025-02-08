<script setup lang='ts'>
const list = [
  { name: '简体中文', icon: 'i-flag-cn-4x3' },
  { name: 'English', icon: 'i-flag-us-4x3' },
  { name: '日本语', icon: 'i-flag-jp-4x3' },
  { name: '한국어', icon: 'i-flag-kr-4x3' },
  { name: 'Français', icon: 'i-flag-fr-4x3' },
  { name: 'Deutsch', icon: 'i-flag-de-4x3' },
  { name: 'Español', icon: 'i-flag-es-4x3' },
  { name: 'Italiano', icon: 'i-flag-it-4x3' },
  { name: 'Русский', icon: 'i-flag-ru-4x3' },
]
</script>

<template>
  <el-dropdown>
    <div class="flex-center gap-x-1 dark:text-white">
      <div class="flex-center gap-x-2">
        <div class="i-flag-cn-4x3" />
        <div class="">简体中文</div>
      </div>
      <i class="i-ep-caret-bottom" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in list" :key="item.name">
          <div class="flex-center gap-x-2">
            <div :class="item.icon" />
            <div class="">{{ item.name }}</div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
