<template>
  <div class="productListContainer">
    <div class="search">
      <SearchBox :categoryList="categoryList" @searchBtn="searchBtn" />
      <Product
        :data="productList"
        :category="categoryList"
        @editProduct="editProduct"
        @deleteProduct="deleteProduct"
      />
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import Product from '@/components/Product.vue';
import api from '@/api/product';

export default {
  data() {
    return {
      categoryList: [],
      productList: [],
    };
  },
  components: {
    SearchBox,
    Product,
  },
  created() {
    api.getProductCategory(this.$store.state.userData).then((res) => {
      this.categoryList = res.data.data.data;
    });
    api.getAll(this.$store.state.userData).then((res) => {
      this.productList = res.data.data.data;
    });
  },
  methods: {
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    deleteProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => (
          <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>
        ),
        onOk: () => {
          api
            .deleteProduct(record.id, this.$store.state.userData)
            .then((res) => {
              if (res.data.status === 'success') {
                this.$notification.success({
                  message: 'Notification Title',
                  description: '删除成功！',
                  icon: <a-icon type="smile" style="color: #108ee9" />,
                });
                api.getAll(this.$store.state.userData).then((r) => {
                  this.productList = r.data.data.data;
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
    searchBtn(e) {
      api
        .getAll({
          ...e,
          ...this.$store.state.userData,
        })
        .then((res) => {
          this.categoryList = res.data.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.search {
  height: 30px;
  line-height: 30px;
  vertical-align: center;
}
</style>
