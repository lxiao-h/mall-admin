<template>
  <div class="login-container">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="E-mail">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: '请输入邮箱!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Password" has-feedback>
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: '请输入密码!',
                },
              ],
            },
          ]"
          type="password"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit"> 提交 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import api from '@/api/user';

export default {
  data() {
    return {};
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          api
            .login(values)
            .then((res) => {
              const { data } = res;
              // console.log("then", res);
              if (data.status === 'fail') {
                // alert(data.msg);
                this.$message.error(data.msg);
              } else if (data.status === 'success') {
                console.log(data);
                this.$store.dispatch('setUserData', data.data);
                this.$router.push({
                  name: 'Home',
                });
              }
            })
            .catch((error) => {
              console.log('err', error);
              // alert(error.data.msg);
              // return;
            });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-container {
  width: 500px;
  margin: 100px auto;
}
</style>
