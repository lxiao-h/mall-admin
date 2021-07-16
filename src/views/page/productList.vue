<template>
  <div class="productListContainer">
    <div class="search">
      <SearchBox :categoryList="categoryList" />
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
      console.log('delete', record);
      api.deleteProduct(record.id, this.$store.state.userData).then((res) => {
        if (res.data.status === 'success') {
          this.$notification.success({
            message: 'Notification Title',
            description:
              '删除成功！',
            icon: <a-icon type="smile" style="color: #108ee9" />,
          });
          api.getAll(this.$store.state.userData).then((r) => {
            this.productList = r.data.data.data;
          });
        }
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
