<template>
  <div>
    <nav-bar>
    <template v-slot:default>个人中心</template>
  </nav-bar>
    <div class="info">
      <van-image round width="80px" height="80px" :src="baseUrl+'/'+user.photoUrl" fit="cover">
        <van-uploader :after-read="afterRead"></van-uploader>
      </van-image>
      <span>{{ user.name?user.name:'未登录' }}</span>
    </div>
    <van-cell value="切换账号" is-link url="/login"></van-cell>
    <van-cell value="添加地址" is-link url="/address"></van-cell>
  </div>
</template>

<script>
import { Cell, CellGroup,Image,Uploader  } from "vant";
import { findUserByid } from "../network/user";
import { onMounted, ref } from 'vue';
import NavBar from './common/Navbar'
import {upload} from "../network/order";
import {changeInfo} from "../network/user"
export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Uploader.name]: Uploader,
    NavBar
  },
  setup() {
    const {baseUrl}  = require('../assets/js/common')
    const user = ref([]);
    const afterRead = (file) => {
      console.log(file);
      upload(file).then((res) => {
        console.log(res.data);
        user.value.photoUrl = res.data;
        console.log(user.value)
        changeInfo(user.value).then(res=>{
          console.log(res.data)})
      });
    };
    onMounted(()=>{
      findUserByid().then(res=>{
        user.value = res.data;
      }).catch(err=>{

      });
    })
    return{
      user,
      baseUrl,
      afterRead
    }
  },
};
</script>

<style lang='less' scoped>
.info{
  margin-top: 45px;
  padding-right: 10px;
  .van-image {
    margin: 10px;
    float: left;
  }
  span {
    line-height: 60px;
    font-size: 20px;
    float: left;
  }
}
</style>