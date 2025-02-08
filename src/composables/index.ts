export const setting = () => useSettingStore()
const dictstore = useDictStore()
export const user = useUserStore()

export const dict = dictstore.dict
export const _dict = dictstore._dict
export const dictSync = dictstore.dictSync
export const _dictSync = dictstore._dictSync
