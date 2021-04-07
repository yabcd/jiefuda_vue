<template>
  <van-nav-bar
      title="添加地址"
      left-text="返回"
      left-arrow
      @click-left="router.go(-1)"
  />
  <van-cell-group>
    <van-cell is-link :value="address" @click="show = true"/>
  </van-cell-group>
  <van-field v-model="value" label="详细地址" placeholder="请输入详细地址"/>
  <van-button round block type="info" @click="addAdd">提交</van-button>

  <add-list></add-list>
  <van-popup round position="bottom" :show="show">
    <van-area title="地址" :area-list="areaList" @confirm="confirmAdd" @cancel="show=false"/>
  </van-popup>


</template>

<script>
import {Area, Cell, Popup, Field, Button, CellGroup, Toast, NavBar} from 'vant'
import {ref} from "vue";
import {addAddress} from '../../network/user'
import AddList from "./addressList"
import {useRouter} from "vue-router";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Area.name]: Area,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    AddList
  },
  setup() {
    const {areaList} = require('../../assets/area')
    const router = useRouter();
    let show = ref(false);
    let address = ref('请选择地址');
    const value = ref('');
    const confirmAdd = (add) => {
      let temp = '';
      for (let i = 0; i < add.length; i++) {
        temp += add[i].name + '/';
      }
      address.value = temp;
      show.value = false;
    }
    const addAdd = () => {
      if (address.value == '请选择地址' || value.value == '') {
        Toast.fail('地址信息不完整');
        return;
      }
      addAddress(address.value + value.value).then(res => {
        router.go(0);
        if (res.code == 200) {
          Toast.success('添加成功');
        } else {
          Toast.fail('添加失败');
        }
      })
    }
    return {
      areaList,
      show,
      confirmAdd,
      value,
      addAdd,
      address,router
    }
  },
};
</script>

<style lang='less' scoped>
.van-nav-bar{
  box-shadow: 0 2px 0px rgba(100, 100, 100, 0.1);
}
</style>