<template>
  <div class="hy-table">
    <!-- 头部 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="header-handler">
          <slot name="header-handler"></slot>
        </div>
      </slot>
    </div>
    <!-- 表格 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
        show-overflow-tooltip
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.id" >
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 尾部分页 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  listData: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  propList: {
    type: Array,
    required: true
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  listCount:{
    type:Number,
    default:0
  },
  page:{
    type:Object,
    default:()=>({currentPage: 0, pageSize: 10})
  },
  childrenProps:{
    type:Object,
    default:()=>({})
  },
  showFooter:{
    type: Boolean,
    default: true
  },
})

const emit = defineEmits(['selectionChange','update:page'])
const handleSelectChange = (value: any) => {
  emit('selectionChange', value)
}
const handleCurrentChange = (currentPage:number) => {
  emit('update:page',{...props.page,currentPage})
}

const handleSizeChange = (pageSize:number) => {
  emit('update:page',{...props.page,pageSize})
}

</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
    font-weight: bold;
  }
}
.footer{
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
