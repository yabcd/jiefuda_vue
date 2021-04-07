<template>
  <nav-bar>
    <template v-slot:default>登录</template>
  </nav-bar>
  <van-form @submit="signin">
    <van-field v-model="name" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' ,trigger: 'blur'}]" />
    <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' ,trigger: 'blur'}]" />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>
  <a href="/register">用户注册</a>
</template>
<script>
import { login } from "../network/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Form, Button, Field, Toast } from "vant";
import NavBar from "./common/Navbar";
export default {
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast,
    NavBar
  },
  setup() {
    const router = useRouter();
    const name = ref();
    const password = ref();
    function signin() {
      login(name.value, password.value)
        .then((res) => {
          if (res.code == 200) {
            Toast.success(res.msg);
            localStorage.setItem("token", res.data.token);
            router.push("/info");
          } else {
            Toast.fail(res.msg);
          }
        })
        .catch((e) => {});
    }
    return { signin, name, password };
  },
};
</script>
<style lang="less" scoped >
.van-form{
  margin-top: 45px;
}
a {
  color: var(--color-text);
}
a:hover {
  color: var(--color-high-text);
}
</style>