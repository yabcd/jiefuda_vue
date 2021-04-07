<template>
  <nav-bar>
    <template v-slot:default>注册</template>
  </nav-bar>
  <van-form @submit="onSubmit">
    <van-field v-model="name" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名',trigger: 'blur'}]" />
    <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' ,trigger: 'blur'}]" />
    <van-field v-model="password2" type="password" name="密码" label="确认密码" placeholder="确认密码" :rules="[{ required: true, message: '请确认密码' ,trigger: 'blur'}]" />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">注册</van-button>
    </div>
  </van-form>
</template>
<script>
import { Form, Button,Field,Toast  } from "vant";
import { ref } from 'vue';
import {register} from '../network/user'
import { useRouter } from 'vue-router';
import NavBar from "./common/Navbar";
export default {
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]:Toast,
    NavBar
  },
  setup(){
    const router = useRouter();
    const name = ref()
    const password = ref()
    const password2 = ref()
    function onSubmit(){
      if(!(password.value==password2.value)){
        Toast.fail('两次密码不一致!')
        return;
      }
      register(name.value,password.value).then(res=>{
        if(res.code==200){
          Toast.success(res.msg);
          console.log(res);
          router.push('/login')
        }else{
          Toast.fail(res.msg);
        }
      }).catch(err=>{
      })
    }
    return{
      name,password,password2,onSubmit
    }
  }
};
</script>
<style lang="less" scoped >
.van-form{
  margin-top: 45px;
}
</style>