<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="标题" prop="title" required>
      <a-input v-model="form.title" placeholder="请填写标题" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" placeholder="请填写商品描述" />
    </a-form-model-item>
    <a-form-item label="商品类目" prop="category" defaultValue="ef" required>
      <a-select
        placeholder="请选择商品类目"
        @change="handleSelectChange"
        v-model="form.category"
        required
      >
        <a-select-option
          v-for="c in category"
          :key="c.id"
          :value="c.id"
          required
        >
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_items">
        <a-select-option
          v-for="it in c_item"
          :key="it"
          :value="it"
          placeholder="子类目"
        >
          {{ it }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-model-item label="商品标签" prop="tags" required>
      <a-select
        mode="tags"
        placeholder="Please select"
        :default-value="['包邮，最晚次日达']"
        v-model="form.tags"
      >
        <a-select-option value="包邮，最晚次日达"
          >包邮，最晚次日达</a-select-option
        >
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" style="margin-left: 8px" @click="next">
        下一个
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import api from '@/api/product';

export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      other: '',
      //   form: {
      //     name: "",
      //     region: undefined,
      //     date1: undefined,
      //     delivery: false,
      //     type: [],
      //     resource: "",
      //     desc: "",
      //   },
      rules: {},
      category: [],
      c_item: [],
      categoryIndex: 0,
    };
  },
  props: ['form'],
  breforeCreated() {},
  created() {
    // 获取商品类别  及 子类别
    api.getProductCategory(this.$store.state.userData).then((res) => {
      this.category = res.data.data.data;
      const index = !this.form.category ? 0 : this.form.category;
      this.c_item = this.category[index].c_items;
    });
  },
  watch: {
    // categoryIndex(n, o) {
    //   console.log(n, o);
    // },
    // category(n, o) {
    //   console.log(n, o);
    // },
    // c_item(n, o) {
    //   console.log(n, o);
    // },
  },
  beforeCreate() {},
  methods: {
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    handleSelectChange(e) {
      // console.log(e);
      // console.log(this.category);
      this.c_item = this.category[e - 1].c_items;
    },
  },
};
</script>
<style scoped>
</style>
