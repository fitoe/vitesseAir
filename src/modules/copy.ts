import type { Directive } from 'vue'
import type { UserModule } from '~/types'

// 复制指令
export const vCopy: Directive = {
  mounted(el: HTMLElement, binding: any) {
    el.style.cursor = 'pointer'
    el.addEventListener('click', () => {
      const text = binding.value
      if (!text)
        return
      navigator.clipboard.writeText(text).then(() => {
        $message.success('复制成功')
      }).catch(() => {
        $message.error('复制失败')
      })
    })
  },
}

// 修改为 UserModule 格式
export const install: UserModule = ({ app }) => {
  app.directive('copy', vCopy)
}

export default { install }
