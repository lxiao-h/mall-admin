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
    const user = this.$store.state.userData;
    api.getProductCategory(user).then((res) => {
      this.categoryList = res.data.data.data;
    });
    api.getAll(user).then((res) => {
      this.productList = res.data.data.data;
    });
  },
  methods: {
    editProduct(record) {
      api.editProduct(record).then((res) => {
        console.log(`编辑：${res.data.msg}`);
        console.log(record);
        this.$router.push({
          name: 'ProductEdit',
          params: {
            id: record.id,
          },
        });
      });
    },
    deleteProduct(record) {
      console.log('delete', record);
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
