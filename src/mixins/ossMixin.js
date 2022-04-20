import { getSignnatureApi } from '@/api/common'
import OSS from 'ali-oss'
import { isValidFile } from '@/utils/fileValidate'
const accessKeySecret = ''

// 尽量不要把 oss 实例定义在 Vue data 中，会影响性能
let client = null
/*
* @params {String} accessid
* @returns
* */
function createOSSClient (accessid) {
  return new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: accessid,
    accessKeySecret: accessKeySecret,
    bucket: 'pyec'
  })
}

export default {
  name: 'OSSUpload',
  data () {
    return {
      signatureData: null,
      // 单个文件上传组件数据
      fileUrl: '',
      // 多个文件上传组件数据
      fileList: [],
      // 判断是否上传至 oss 标志
      isValid: false
    }
  },
  async created () {
    this.initSignatureData()
  },
  destoryed () {
    client = null
  },
  methods: {
    // 获取签名, 初始化 oss 实例
    async initSignatureData () {
      try {
        const res = await getSignnatureApi()
        this.signatureData = res
        // 初始化 oss 实例
        client = createOSSClient(res.accessid)
      } catch (error) {
        this.$message.error(error.message)
      }
    },

    // oss 上传文件方法
    async put (file) {
      const dir = this.signatureData.dir + file.name
      return new Promise((resolve, reject) => {
        client.put(dir, file).then(result => {
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 默认的文件上传前验证方法
    beforeUpload (file) {
      // 文件类型要求：指定的图片或者视频格式
      // 文件大小要求：不大于 5M
      this.isValid = isValidFile(file, 5)
    },

    // 单个文件上传
    handleSingleFileUpload (file) {
      // 判断文件是否合法，不合法则不上传
      if (!this.isValid) return

      this.put(file.file).then(res => {
        this.fileUrl = res.url
        this.$emit('file-add', this.fileUrl)
      })
    },

    // 多个文件上传
    handleMultipleFilesUpload (file) {
      // 判断文件是否合法，不合法则不上传
      if (!this.isValid) return

      // uid 用于删除文件操作时的筛选条件，见 handleMultipleFilesRemove 钩子函数
      this.put(file.file).then(res => {
        this.fileList.push({
          url: res.url,
          // 去除文件名后缀
          name: file.file.name.replace(/\.\w+$/g, ''),
          uid: file.file.uid
        })
        this.$emit('file-add', this.fileList)
      })
    },

    // 单个文件上传组件，删除文件时触发
    handleSingleFileRemove () {
      this.fileUrl = ''
      this.$emit('file-remove', this.fileUrl)
    },

    // 多个文件上传组件，删除文件时触发
    handleMultipleFilesRemove (file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      this.$emit('file-remove', this.fileList)
    },

    // 文件超出个数限制时的钩子函数
    handleExceed (files, fileList) {
      this.$message.warning(`当前上传文件超过限制，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }

}
