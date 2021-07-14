<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="标题" prop="title" required>
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" />
    </a-form-model-item>
    <!-- <a-form-model-item  label="商品类目" prop="category" required>
      <a-input v-model="form.category" />
    </a-form-model-item> -->
    <a-form-item label="商品类目" prop="category" required>
      <a-select required>
        <a-select-option
          v-for="c in category"
          :key="c.id"
          :value="c.name"
          @click="handleSelectChange"
        >
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_item">
        <a-select-option v-for="it in c_item" :key="it" :value="it">
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
          <a-select-option
            value="包邮，最晚次日达"
          >包邮，最晚次日达</a-select-option>
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
    };
  },
  props: ['form'],
  created() {
    api.getProductCategory(this.$store.state.userData).then((res) => {
      console.log(res.data);
      this.category = res.data.data.data;
      this.c_item = this.category[0].c_item;
    });
  },
  beforeCreate() {},
  methods: {
    next() {
      this.$emit('next');
    },
    handleSelectChange(e) {
      const n = e.key;
      this.c_item = this.category.filter((i) => i.name === n)[0].c_items;
    //   this.c_item = this.category.filter((i) => {
    //     return 1;
    //   });
    //   console.log(this.c_item);
    },
  },
};
</script>
<style scoped>

</style>
