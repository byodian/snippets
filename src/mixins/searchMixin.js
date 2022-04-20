export default {
  data () {
    return {
      dynamicTags: []
    }
  },
  methods: {
    handleRadioReset () {
      // 清空所有已选择条件的选中状态
      this.dynamicTags.forEach((item) => {
        this[item.type] = ''
      })

      this.beforeAllTagsClose(this.dynamicTags)
      // 清空已选中的标签数据
      this.dynamicTags = []
      this.handleSearch()
    },

    // value - 当前选中的单选框的值 - 对应字典数据的 value 值
    // type - 当前选中的单选框的类型 v-model 绑定值
    // list - 当前选中的单选框的列表 - 字典数据列表
    handleChange (value, type, list) {
      // 是否为同一类型条件的标志
      this.isSameType = false

      // 选中 “全部” 时，selectedRadio 为 undefined
      const selectedRadio = list.find((item) => item.value === value)

      // 如果选中的是同一类型，则替换已有标签数据的 type 值
      this.dynamicTags = this.dynamicTags
        .map((item) => {
          if (item.type === type) {
            item.label = selectedRadio ? selectedRadio.label : ''
            this.isSameType = true
          }

          return item
        })
        .filter(item => item.label)

      // 如果选中不是同一类型，则添加新标签数据
      if (!this.isSameType) {
        this.dynamicTags.push({
          label: selectedRadio.label,
          type
        })
      }

      // 搜索前执行 hook，用于具有区间值的搜索条件
      // 目的是通过字典接口值，获取区间值
      this.beforeSearch(value, type, list)
      this.handleSearch()
    },

    handleMoreRadioOpen (type) {
      this[type] = !this[type]
    },

    handleClose (tag) {
      this.dynamicTags = this.dynamicTags.filter((item) => item.type !== tag.type)
      // 清空选中状态
      this[tag.type] = ''

      // 关闭已选中的标签数据前的 hook,，用于具有区间值的搜索条件
      // 目的是删除提交到表单的绑定区间值
      this.beforeClose(tag)
      this.handleSearch()
    },

    resetData (type) {
      this[type + 'Min'] = ''
      this[type + 'Max'] = ''
    },

    changeRangeValue (label, type) {
      // 选择“全部”时，清空区间值
      if (!label) {
        this.resetData(type)
        return
      }

      // 获取区间值
      // 1 元以下  => 1
      // 1-10 元   => 1-10
      // 10-100 元 => 10-100
      const replacedValue = label.replace(/\s+\W+/g, '')

      if (label.indexOf('以下') !== -1) {
        this[type + 'Min'] = ''
        this[type + 'Max'] = +replacedValue
      } else if (label.indexOf('以上') !== -1) {
        this[type + 'Min'] = +replacedValue
        this[type + 'Max'] = ''
      } else {
        const minmax = replacedValue.split('-')
        this[type + 'Min'] = +minmax[0]
        this[type + 'Max'] = +minmax[1]
      }
    },

    // 自定义搜索条件
    handleCustomSearch (flag) {
      this[flag + 'Max'] = this[flag + 'CustomMax']
      this[flag + 'Min'] = this[flag + 'CustomMin']

      this.handleSearch()
    },

    handleSearch () {},
    // value - 当前选中的单选框的值 - 对应字典数据的 value 值
    // type - 当前选中的单选框的类型 v-model 绑定值
    // list - 当前选中的单选框的列表 - 字典数据列表
    beforeSearch (value, type, list) {},
    // 关闭单个选中标签前的 hook
    beforeClose (tag) {},
    // 关闭所有选中标签前的 hook
    beforeAllTagsClose (tags) {}
  }
}
