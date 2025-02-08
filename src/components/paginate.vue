<script setup lang="ts">
// 统一配置分页
const props = defineProps({
  total: {
    required: true,
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50]
    },
  },
  pagerCount: {
    type: Number,
    default: document.body.clientWidth < 992 ? 5 : 7,
  },
  layout: {
    type: String,
    default: 'total, prev, pager, next, sizes, jumper',
  },
  background: {
    type: Boolean,
    default: true,
  },
  hiddenSingle: {
    type: Boolean,
    default: true,
  },

})
const page = defineModel('page')
const pageSize = defineModel('pageSize')
</script>

<template>
  <el-pagination v-model:current-page="page" v-model:page-size="pageSize" class="flex-center p-8" :background="props.background" :layout="props.layout" :total="props.total" :hide-on-single-page="props.hiddenSingle" />
</template>
