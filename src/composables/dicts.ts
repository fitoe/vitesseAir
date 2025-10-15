interface DictItem {
  dictLabel: string
  dictValue: string
}
interface Dicts {
  [key: string]: DictItem | []
}

// 服务端和客户端共享的缓存对象
const dictCache = ref<Dicts>({})

// 系统字典
async function fetchDictData(name: string) {
  try {
    const res = await get<DictItem[]>(`/system/dict/data/type/${name}`)
    dictCache.value[name] = res || []
  }
  catch (e) {
    console.error(e)
  }
}

export function dict(name: string) {
  if (!dictCache.value.hasOwnProperty(name)) {
    dictCache.value[name] = []
    fetchDictData(name)
  }

  return dictCache.value[name]
}

/**
 * 根据字典类型和值获取对应的标签
 */
export function _dict(name: string, value: string) {
  return computed(() => dict(name)?.find((item: DictItem) => item.dictValue === value)?.dictLabel || '')
}
