// 用来给oss图片增加域名和样式
export const imghost = 'https://domain.com/upload'

export const imgposter = (id: string) => `${imghost}/${id}.jpg?x-oss-process=style/poster`
export const imgxs = (id: string) => `${imghost}/${id}.jpg?x-oss-process=style/xs`
export const imgsm = (id: string) => `${imghost}/${id}.jpg?x-oss-process=style/sm`
export const imgmd = (id: string) => `${imghost}/${id}.jpg?x-oss-process=style/md`
export const imglg = (id: string) => `${imghost}/${id}.jpg?x-oss-process=style/lg`
