import { ElMessage } from 'element-plus'

export const $message = ElMessage

export const postStatus = [
  { value: 0, name: '未审核' },
  { value: 1, name: '已审核' },
  { value: 2, name: '已驳回' },
]

// 根据value获取name
export function _const(name: { value: number, name: string }[], value: number) {
  return name.find(item => item.value === value)?.name
}

// 全局mode
export const mode = import.meta.env.VITE_MODE
