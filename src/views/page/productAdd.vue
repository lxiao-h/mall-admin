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
      <DetailNextProduct @prev="prev" v-if="current> 0"
      style="margin-left: 8px"  :form="form"/>
    </div>
  </div>
</template>
<script>
import DetailNextProduct from '@/components/DetailNextProduct.vue';
import DetailProduct from '@/components/DetailProduct.vue';

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
        appkey: 'liuxiao_1623650674380',
        c_item: '香梨',
        category: 2,
        categoryName: '安心乳品',
        desc: '润肺去火 应季佳品',
        id: 14,
        images: (2)[
          ('https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/丰水梨5金装.jpg',
          'http://duyi-bucket.oss-cn-beijing.aliyuncs.com/mal…ages/%E9%BB%84%E6%A8%B1%E6%A1%831593413677378.jpg')
        ],
        inventory: 100,
        key: 14,
        name: null,
        number: null,
        price: 29.9,
        price_off: 29.9,
        sale: 10010,
        status: 1,
        tags: (2)[('限时秒杀', '满69-10')],
        title: '丰水梨5金装 单果300g起',
        unit: 'g',
        updateTime: '2021-05-28T06:59:09.048Z',
        __v: 0,
        _id: '60c6f172f378034fba153120',
      },
    };
  },
  components: {
    DetailNextProduct,
    DetailProduct,
  },
  created() {
    console.log(this.$route.params.id);
  },
  methods: {
    next() {
      this.current += 1;
    },
    prev() {
      this.current -= 1;
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
