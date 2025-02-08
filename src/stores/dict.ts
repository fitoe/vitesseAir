// 自动处理字典数据，无需引入，在第一次调用时，会自动获取字典列表，并缓存到本地
// 获取字典列表   dict('reject_reason')
// 获取字典值   _dict('reject_reason', '1')
// 同步方式 获取字典列表   dictSync('reject_reason')
// 同步方式 获取字典值   _dictSync('reject_reason', '1')
interface Options {
  value?: string
  label?: string
  all?: boolean
}

const getDicts = (name: string) => get(`/system/dict/data/type/${name}`)
const allvalue = { dictValue: '', dictLabel: '全部' }
export const useDictStore = defineStore('dict', () => {
  const store = ref<{ [key: string]: Dict[] }>({})
  const defaultOptions: Options = {
    value: 'dictValue',
    label: 'dictLabel',
    all: false,
  }
  const dict = function (name: string, options: Options = defaultOptions) {
    let result = store.value[name] ? [...store.value[name]] : []
    if (store.value[name] === undefined) {
      store.value[name] = []
      try {
        getDicts(name).then((res) => {
          store.value[name] = res.data
        })
      }
      catch (e) {
        console.error(e)
      }
    }
    if (options.all) {
      result.unshift(allvalue)
    }
    if (options.label || options.value) {
      result = result.map(x => ({
        [options.value ?? defaultOptions.value]: x.dictValue,
        [options.label ?? defaultOptions.label]: x.dictLabel,
      }))
    }
    return result
  }
  const dictSync = function (name: string) {
    return new Promise<Dict[]>(async (resolve) => {
      if (store.value[name] === undefined || store.value[name].length === 0) {
        store.value[name] = []
        const res = await getDicts(name)
        store.value[name] = res
      }
      resolve(store.value[name])
    })
  }

  const _dict = function (name: string, value: string) {
    if (!value)
      return ''
    if (store.value[name]) {
      if (value.includes(',')) {
        return value.split(',').map(item => store.value[name].find((i: Dict) => i.dictValue === String(item))?.dictLabel).join('，')
      }
      else {
        return store.value[name].find((item: Dict) => item.dictValue === String(value))?.dictLabel
      }
    }
    else {
      try {
        store.value[name] = []
        getDicts(name).then((res) => {
          store.value[name] = res
          return _dict(name, value)
        })
      }
      catch (e) {
        console.error(e)
      }
      return {} as Dict
    }
  }
  const _dictSync = async function (name: string, value: string) {
    if (!store.value[name]) {
      const res = await getDicts(name)
      store.value[name] = res
    }
    return store.value[name].find((item: Dict) => item.dictValue === String(value))?.dictLabel
  }

  return { dict, _dict, dictSync, _dictSync, store }
})
