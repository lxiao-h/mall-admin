<template>
  <div>
    <a-steps :current="current" class="stepsTop">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <DetailProduct
        @next="next"
        v-if="current < steps.length - 1"
        :form="form"
      />
      <DetailNextProduct
        @prev="prev"
        v-if="current > 0"
        style="margin-left: 8px"
        :form="form"
        @handleSubmit="handleSubmit"
      />
    </div>
  </div>
</template>
<script>
import DetailNextProduct from '@/components/DetailNextProduct.vue';
import DetailProduct from '@/components/DetailProduct.vue';
import api from '@/api/product';

export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: 'First',
          content: 'First-content',
        },
        {
          title: 'Second',
          content: 'Second-content',
        },
      ],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: '',
        inventory: 0,
        images: [],
      },
    };
  },
  components: {
    DetailNextProduct,
    DetailProduct,
  },
  created() {
    if (this.$route.params.id) {
      api
        .getProduct(this.$route.params.id, this.$store.state.userData)
        .then((res) => {
          this.form = { ...res.data.data };
        });
    }
  },
  watch: {
    form(n, o) {
      console.log(n, o);
    },
  },
  methods: {
    next() {
      this.current += 1;
    },
    prev() {
      this.current -= 1;
    },
    handleSubmit(formData) {
      if (this.$route.params.id) {
        api.editProduct(formData).then((res) => {
          if (res.data.status === 'success') {
            this.$message.success('修改成功');
            this.$router.push({
              name: 'ProductList',
            });
          } else {
            this.$message.error('修改失败');
          }
        });
      } else {
        api
          .addProduct({ ...formData, ...this.$store.state.userData })
          .then((res) => {
            console.log(res);
          });
      }
    },
  },
};
</script>
<style scoped>
.stepsTop {
  width: 70%;
  text-align: center;
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
  text-align: center;
}
</style>
