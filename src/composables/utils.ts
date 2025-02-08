// 延时
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 格式化数字，转换为千分位
export const formatNumber = (num: number) => num.toLocaleString()
