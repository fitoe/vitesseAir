<script setup lang='ts'>
const props = defineProps<{
  text: string | number | undefined
}>()

function copy() {
  navigator.clipboard.writeText(props.text)
  $message.success('复制成功')
}
</script>

<template>
  <div v-if="props.text" class="flex-center cursor-pointer gap-x-1 hover:underline" title="复制" @click="copy">
    <!-- <span class="i-ep-copy-document" /> -->
    {{ props.text }}
  </div>
</template>
