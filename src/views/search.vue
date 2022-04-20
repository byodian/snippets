<template>
  <div class="search w-[800px] mx-auto flex h-full">
    <div class="search-wrapper m-auto">
      <el-form
        label-position="left"
        class="search-form pb-8"
        @submit.native.prevent
      >
        <el-form-item label="住房租金：" class="search-form-radio">
          <el-radio-group
            v-model="checkedRentPrice"
            @change="handleChange($event, 'checkedRentPrice', rentPriceList)"
          >
            <el-radio label="">
              全部
            </el-radio>
            <el-radio
              v-for="item in rentPriceList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
          <el-button
            class="absolute right-4 top-0"
            :icon="rentPriceFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            type="text"
            @click="handleMoreRadioOpen('rentPriceFlag')"
          />
        </el-form-item>

        <div
          v-show="rentPriceFlag"
          label=""
          class="ml-[150px] flex search-custom items-center"
        >
          <el-input v-model="rentPriceCustomMin" />
          <span class="search-custom-delimiter">-</span>
          <el-input v-model="rentPriceCustomMax" />
          <span class="search-custom-unit ml-2">元</span>
          <span
            class="search-custom-btn ml-4 cursor-pointer"
            @click="handleCustomSearch('rentPrice')"
          >确定</span>
        </div>

        <el-form-item label="租房类型：" class="search-form-radio">
          <el-radio-group
            v-model="checkedRentType"
            @change="handleChange($event, 'checkedRentType', rentTypeList)"
          >
            <el-radio label="">
              全部
            </el-radio>
            <el-radio
              v-for="type in rentTypeList.slice(0, 7)"
              :key="type.value"
              :label="type.value"
            >
              {{ type.label }}
            </el-radio>
            <div v-show="rentTypeFlag">
              <el-radio
                v-for="type in rentTypeList.slice(7)"
                :key="type.value"
                :label="type.value"
              >
                {{ type.label }}
              </el-radio>
            </div>
          </el-radio-group>
          <el-button
            class="absolute right-4 top-0"
            :icon="rentTypeFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            type="text"
            @click="handleMoreRadioOpen('rentTypeFlag')"
          />
        </el-form-item>

        <!-- 更多筛选条件 -->
        <div v-show="moreFlag">
          <el-form-item label="租房类型：" class="search-form-radio">
            <el-radio-group
              v-model="checkedRentType"
              @change="handleChange($event, 'checkedRentType', rentTypeList)"
            >
              <el-radio label="">
                全部
              </el-radio>
              <el-radio
                v-for="type in rentTypeList.slice(0, 7)"
                :key="type.value"
                :label="type.value"
              >
                {{ type.label }}
              </el-radio>
              <div v-show="rentTypeFlag">
                <el-radio
                  v-for="type in rentTypeList.slice(7)"
                  :key="type.value"
                  :label="type.value"
                >
                  {{ type.label }}
                </el-radio>
              </div>
            </el-radio-group>
            <el-button
              class="absolute right-4 top-0"
              :icon="rentTypeFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
              type="text"
              @click="handleMoreRadioOpen('rentTypeFlag')"
            />
          </el-form-item>
        </div>

        <div class="grid place-content-center">
          <el-button
            class="more-search-btn"
            type="text"
            @click="moreFlag = !moreFlag"
          >
            {{ moreFlag ? '收起' : '显示更多筛选条件' }}
          </el-button>
        </div>
      </el-form>

      <hr>

      <div class="search-tags flex pt-4 justify-start h-20">
        <div class="flex items-center">
          <p class="min-w-max">
            已选条件：
          </p>
          <ul class="flex gap-4 flex-wrap">
            <li v-for="tag in dynamicTags" :key="tag.value">
              <el-tag
                closable
                :disable-transitions="true"
                effect="plain"
                @close="handleClose(tag)"
              >
                {{ tag.label }}
              </el-tag>
            </li>
          </ul>
        </div>
        <div
          class="ml-auto min-w-max cursor-pointer select-none"
          @click="handleRadioReset"
        >
          清空
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchMixin from '@/mixins/searchMixin'

export default {
  name: 'SearchPark',
  mixins: [SearchMixin],
  data () {
    return {
      // 选中值
      checkedRentType: '',
      checkedRentPrice: '',

      rentPriceMin: '',
      rentPriceMax: '',

      rentTypeFlag: false,
      rentPriceFlag: false,

      // 默认展开更多搜索条件
      moreFlag: false,

      // 办公租金自定义
      rentPriceCustomMin: '',
      rentPriceCustomMax: '',

      dynamicTags: [],
      rentPriceList: [
        { label: '10元以下', value: 0 },
        { label: '11元-20元', value: 1 },
        { label: '71元-80元', value: 7 },
        { label: '80元以上', value: 8 }
      ],
      rentTypeList: [
        { label: '选项1', value: 0 },
        { label: '选项2', value: 1 },
        { label: '选项3', value: 2 },
        { label: '选项4', value: 3 },
        { label: '选项5', value: 4 },
        { label: '选项6', value: 5 },
        { label: '选项7', value: 6 },
        { label: '选项8', value: 7 }
      ]
    }
  },
  methods: {
    // SearchMixin 混入中执行
    beforeSearch (value, type, list) {
      // 选择“全部”时，selectedLabel = ''
      const selectedLabel =
        typeof value === 'number'
          ? list.find((item) => item.value === value).label
          : ''

      if (type === 'checkedRentPrice') {
        // 清空自定义搜索值
        this.resetData('rentPriceCustom')
        this.changeRangeValue(selectedLabel, 'rentPrice')
      }
    },

    // SearchMixin 混入中执行
    // 清空单个选项区间值
    beforeClose (tag) {
      this.resetRangeValue(tag)
    },

    // searchmixin 混入中执行
    // 清空所有选中的区间值
    beforeAllTagsClose (tags) {
      tags.forEach((tag) => {
        this.resetRangeValue(tag)
      })

      // 清空自定义搜索值
      this.resetData('rentPriceCustom')
    },

    resetRangeValue (tag) {
      if (tag.type === 'checkedRentPrice') {
        this.resetData('rentPrice')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  &-form-radio {
    position: relative;
    display: flex;
  }

  &-tags {
    color: #999;
  }
}

.search-custom {
  ::v-deep .el-input {
    width: 120px;
  }
}

::v-deep .el-input__inner {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

::v-deep .el-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

::v-deep .el-radio__input {
  display: none;
  visibility: hidden;
}

::v-deep .el-radio__label {
  padding-left: 0;
}

::v-deep .el-radio-group {
  display: flex;
  flex-wrap: wrap;
  column-gap: 24px;
}

::v-deep .el-radio-group,
::v-deep .el-radio,
::v-deep .el-radio__input {
  line-height: inherit;
}

::v-deep .el-form-item__content {
  position: static;
  flex: 1;
  vertical-align: inherit;
}

::v-deep .el-form-item {
  margin-bottom: 0;
}

::v-deep .el-form-item__label {
  flex: 0 0 150px;
  color: #999;
}

.more-search-btn {
  padding-bottom: 0;
  color: #999;
}
</style>
