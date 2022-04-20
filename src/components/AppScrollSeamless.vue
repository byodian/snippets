<script>
export default {
  props: {
    listData: {
      type: Array,
      required: true
    },
    headerData: {
      type: Array,
      default: () => ([])
    },
    headerVisible: {
      type: Boolean,
      default: true
    },
    headerValues: {
      type: Array
    }
  },
  created () {
    console.log(this.listData)
  },
  updated () {
    console.log(this.listData)
  }
}
</script>

<template>
  <div class="scroll-board-wrapper">
    <!-- <ul v-if="headerVisible" class="scroll-header">
      <li v-for="(item, index) in headerData" :key="index">
        {{ item }}
      </li>
    </ul> -->
    <table v-if="headerVisible" class="scroll-table-header">
      <thead>
        <tr>
          <th
            v-for="(item, index) in headerData"
            :key="index"
            class="scroll-table-header-column"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
    </table>

    <div class="scroll-table-body-wrapper">
      <scroll-seamless :data="listData" class="scroll-table-body-content" :step="4">
        <!-- <ul class="scroll-list">
          <li v-for="(item, index) in listData" :key="index" class="scroll-item">
            <slot :row="item" />
          </li>
        </ul> -->
        <table class="scroll-table-body">
          <tbody>
            <tr
              v-for="(item, index) in listData"
              :key="index"
            >
              <td
                v-for="value in headerValues"
                :key="value"
                class="scroll-table-body-column"
              >
                {{ item[value] }}
              </td>
            </tr>
          </tbody>
        </table>
      </scroll-seamless>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-board-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scroll-header {

  /* display: flex;
  justify-content: space-between; */
  padding: .15rem .225rem;
  font-size: .175rem;
  line-height: 1.4;
  color: #58cfff;
  background-color: #153365;
  border-radius: 4px;
}

.scroll {
  &-table-body-wrapper {
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  &-table-body-content {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    padding: 0 .225rem;
    overflow: hidden;
  }

  &-list {
    font-size: .15rem;
    line-height: 1;
  }

  &-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: .375rem;
  }
}

</style>