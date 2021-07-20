<template>
  <div>
    <a-modal
      title="商品类别"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      ok-text="提交"
      cancel-text="取消"
    >
      <a-form-model
        ref="ruleForm"
        :model="categoryForm"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="类别ID" prop="id" required>
          <a-input v-model="categoryForm.id" placeholder="请填写商品ID" />
          <span class="ant-form-text" color="red" v-if="categoryForm['me'] === 'edit'">
        商品id不能被修改
      </span>
        </a-form-model-item>
        <a-form-model-item label="类别名称" prop="name" required>
          <a-input v-model="categoryForm.name" placeholder="请填写类别名称" />
        </a-form-model-item>
        <a-form-model-item label="商品子类目" prop="c_items" required>
          <a-select
            mode="tags"
            placeholder="Please select"
            v-model="categoryForm.c_items"
          >
            <a-select-option
              v-for="(i, index) in categoryForm.c_items"
              :value="i"
              :key="index"
              >{{ i }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      //   visible: false,
      confirmLoading: false,
      rules: {},
    };
  },
  props: ['categoryForm', 'visible'],
  methods: {
    // showModal() {
    //   this.visible = true;
    // },
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.ModalText = 'The modal will be closed after two seconds';
          this.confirmLoading = true;
          setTimeout(() => {
            this.$emit('changeVisible', false);
            this.confirmLoading = false;
            if (this.categoryForm.me === 'edit') {
              this.$emit('editCategoryInfo', this.categoryForm);
            } else {
              this.$emit('categoryAdd', this.categoryForm);
            }
            // this.$emit('categoryAdd', this.categoryForm);
          }, 2000);

          return true;
        }
        console.log('提交错误');
        return false;
      });
    },
    handleCancel() {
      console.log('Clicked cancel button');
      this.$emit('changeVisible', false);
    },
  },
};
</script>
