<script setup lang='ts'>
const props = defineProps<{
  title: string
  url: string
}>()
const router = useRouter()
</script>

<template>
  <div class="cursor-pointer" @click="router.push(props.url)">
    <div class="text-gradient text-4xl font-bold">
      {{ props.title }}
    </div>
  </div>
</template>

<style>
.text-gradient {
  background: linear-gradient(to right bottom, cyan, blue);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
