<template>
  <div id="components-table-demo-size" style="text-align:center;">
    <a-table :columns="columns" :data-source="dataTable"  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="editProduct(record)">编辑</a-button>
      <a-button @click="deleteProduct(record)">删除</a-button>
    </div>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    width: 300,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
    width: 200,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'categoryName',
    width: 100,
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'c_item',
    key: 'c_item',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    width: 100,
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
    key: 'status',
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
  props: ['data', 'category'],
  created() {
    // console.log(this.data);
    // console.log(this.category);
  },
  computed: {
    dataTable() {
      return this.data.map((it) => ({
        ...it,
        key: it.id,
        categoryName: this.category[it.category].name,
      }));
    },
  },
  methods: {
    editProduct(record) {
      this.$emit('editProduct', record);
    },
    deleteProduct(record) {
      this.$emit('deleteProduct', record);
    },
  },
};
</script>
<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>
