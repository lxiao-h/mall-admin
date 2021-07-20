<template>
  <div id="components-table-demo-size" style="text-align: center">
    <a-table :columns="columns" :data-source="categoryTable">
      <div slot="operation" slot-scope="text, record">
        <a-button @click="editCategory(record)">编辑</a-button>
        <a-button @click="deleteCategory(record)">删除</a-button>
      </div>
    </a-table>
  </div>
</template>

<script>
// import { category } from '@/api';
import { mapState } from 'vuex';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 180,
    key: 'operation',
    scopedSlots: {
      customRender: 'operation',
    },
  },
];
export default {
  data() {
    return {
      columns,
    };
  },
  props: ['data'],
  computed: {
    categoryTable() {
      return this.data.map((it) => ({
        ...it,
        key: it.id,
      }));
    },
    ...mapState(['userData']),
  },

  methods: {
    editCategory(record) {
      this.$emit('editCategory', record);
    },
    deleteCategory(record) {
      this.$emit('deleteCategory', record);
    },
  },
};
</script>

<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>
