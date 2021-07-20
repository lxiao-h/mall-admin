<template>
  <div class="categoryContainer">
    <CategoryList
      :data="categoryTable"
      @editCategory="editCategory"
      @deleteCategory="deleteCategory"
    />
    <CategoryInfo
      :categoryForm="categoryForm"
      :visible="visible"
      @categoryAdd="categoryAdd"
      @changeVisible="changeVisible"
      @editCategoryInfo="editCategoryInfo"
    />
    <a-button type="primary" @click="showModal"> 添加商品类别 </a-button>
  </div>
</template>

<script>
import { category } from '@/api';
import { mapState } from 'vuex';
import CategoryList from '@/components/CategoryList.vue';
import CategoryInfo from '@/components/editCategory.vue';

export default {
  components: {
    CategoryList,
    CategoryInfo,
  },
  data() {
    return {
      categoryTable: [],
      categoryForm: {
        id: '',
        name: '',
        c_items: [],
      },
      visible: false,
    };
  },
  created() {
    category.getProductCategory(this.userData).then((res) => {
    //   console.log(res);
      this.categoryTable = res.data.data.data;
    });
  },
  computed: {
    ...mapState(['userData']),
  },
  methods: {
    showModal() {
      this.categoryForm = { me: 'add' };
      this.visible = true;
    },
    changeVisible(l) {
      this.visible = l;
    },
    editCategory(record) {
      //   console.log('编辑', record);
      this.categoryForm = { ...record, me: 'edit' };
      this.visible = true;
    },
    deleteCategory(record) {
      //   console.log('deleteCategory', record);
      this.$confirm({
        title: '确认删除',
        content: () => (
          <div style="color:red;">{`确认删除类别名称为:${record.name}的商品类别吗`}</div>
        ),
        onOk: () => {
          category
            .deleteCategory(record.id, this.$store.state.userData)
            .then((res) => {
              if (res.data.status === 'success') {
                this.$notification.success({
                  message: 'Notification Title',
                  description: '删除成功',
                  icon: <a-icon type="smile" style="color: #108ee9" />,
                });
                category
                  .getProductCategory(this.$store.state.userData)
                  .then((r) => {
                    this.categoryTable = r.data.data.data;
                  });
              }
            });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    },
    async categoryAdd(obj) {
      //   console.log('父组件', obj);
      //   console.log(this.userData);
      const obj1 = {
        ...obj,
        ...this.userData,
      };
      const res = await category.addCategory(obj1);
      if (res.data.status === 'success') {
        console.log('添加成功');
        category.getProductCategory(this.userData).then((r) => {
          this.categoryTable = r.data.data.data;
        });
      } else {
        console.log('类别添加出错');
      }
    },
    editCategoryInfo(obj) {
      category.editCategory(obj).then((res) => {
        if (res.data.status === 'success') {
          console.log('编辑成功');
          category.getProductCategory(this.userData).then((r) => {
            console.log(r.data.data);
            this.categoryTable = r.data.data.data;
          });
        } else {
          console.log('编辑出错');
        }
      });
    },
  },
};
</script>

<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>
