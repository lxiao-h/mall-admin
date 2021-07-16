<template>
  <div id="components-form-demo-vuex">
    <a-form layout="inline"  @submit="handleSubmit">
      <a-form-item label="检索关键字：">
        <a-input placeholder="请输入关键字" />
      </a-form-item>
      <a-form-item label="商品类目："  >
        <a-select  style="width: 200px" placeholder="商品类目">
          <a-select-option v-for="c in categoryList" :key="c.id">
              {{c.name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  props: ['categoryList'],
  created() {
  },
  methods: {
    handleSubmit() {
      this.emit('search');
    },
  },
};
</script>
<style scoped>
#components-form-demo-vuex .language-bash {
  max-width: 400px;
  border-radius: 6px;
  margin-top: 24px;
}
</style>
