// element 文件上传组件 before-upload
// 文件校验
import { Message } from 'element-ui'

// 判断文件类型是否为图片
export function isImageFile (type) {
  return /^image\/.*$/.test(type)
}

// 判断文件类型是否为视频
export function isVideoFile (type) {
  return /^video\/.*$/.test(type)
}

// 判断文件大小是否超过限制
export function isValidSize (file, size) {
  const isLimt = file.size / 1024 / 1024 <= size
  if (!isLimt) {
    Message.error(`上传文件大小不能超过 ${size}MB!`)
  }

  return isLimt
}

// 指定图片格式
export function isValidImage (file) {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isGIF = file.type === 'image/gif'
  const isBMP = file.type === 'image/bmp'

  if (!isJPG && !isPNG && !isGIF && !isBMP) {
    Message.error(`图片格式 ${file.type.replace(/\w+\/(\w+)$/g, '$1')} 不支持 !`)
  }

  return isJPG || isPNG || isGIF || isBMP
}

// 指定视频格式
export function isValidVideo (file) {
  const isMP4 = file.type === 'video/mp4'

  if (isMP4) {
    this.$message.error(`视频格式 ${file.type.replace(/\w+\/(\w+)$/g, '$1')} 不支持 !`)
  }

  return isMP4
}

// 判断文件是否符合大小和格式要求
export function isValidFile (file, size) {
  if (isImageFile(file.type)) {
    return isValidSize(file, size) && isValidImage(file)
  }

  if (isVideoFile(file.type)) {
    return isValidSize(file, size) && isValidVideo(file)
  }
}
