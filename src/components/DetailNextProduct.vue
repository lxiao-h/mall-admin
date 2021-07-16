<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item label="商品售价" prop="price" required>
      <a-input v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item label="折扣价格" prop="price_off">
      <a-input v-model="form.price_off" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" prop="inventory" required>
      <a-input v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" prop="unit" required>
      <a-input v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <div class="clearfix">
        <a-upload
          :action="
            'http://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.userData.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="prev" style="margin-left: 8px">
        上一个
      </a-button>
      <a-button type="primary" @click="handleSubmit" style="margin-left: 8px">
        提交
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  data() {
    return {
      rules: {},
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  },
  props: ['form'],
  beforeCreate() {},
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, i) => ({
        uid: i,
        name: `image${i}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    prev() {
      this.$emit('prev');
    },
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },

    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList, file }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((it) => it !== url);
      }
      this.fileList = fileList;
    },
  },
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
