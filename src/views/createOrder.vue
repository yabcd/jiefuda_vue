<template>
  <van-cell is-link :value="order.address" @click="show1 = true"/>
  <van-action-sheet cancel-text="取消" @cancel="show1 = false" :show="show1" :actions="address" @select="onSelect"/>

  <van-cell is-link :value="order.type==0?'类型:维修':'类型:商品'" @click="show2 = true"/>
  <van-action-sheet cancel-text="取消" @cancel="show2 = false" :show="show2" :actions="types" @select="onSelectType"/>
  <van-field v-model="order.price" label="价格" placeholder="请输入价格，单位元"/>
  <van-field v-model="order.content" label="介绍" placeholder="请输入详细信息"/>

  <van-uploader v-model="fileList" multiple :max-count="1" />
  <van-button round block type="info" @click="submit">提交</van-button>
</template>

<script>
import {ActionSheet, Cell, Field, Uploader, Button, Toast} from 'vant'
import {onMounted, ref, reactive} from "vue";
import {findUserByid} from "../network/user";
import {createOrder, upload} from "../network/order";
import {useRouter} from "vue-router";

export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
  },
  setup() {
    const fileList = ref([]);
    const order = reactive({});
    const address = ref([]);
    const show1 = ref(false);
    const show2 = ref(false);
    const router = useRouter();
    onMounted(() => {
      order.address = '请选择地址';
      order.type = 0;
      findUserByid().then((res) => {
        let add = res.data.address;
        order.userId = res.data.id;
        for (var i = 0; i < add.length; i++) {
          add[i] = {
            name: add[i]
          };
        }
        address.value = add;
        console.log(add);
      });
    });
    const onSelect = (item) => {
      show1.value = false;
      order.address = item.name;
    }
    const onSelectType = (item) => {
      show2.value = false;
      order.type = (item.name=='维修')?0:1;
      console.log(order)
    }
    const submit = ()=>{
      if(fileList.value.length==0){
        Toast.fail('请上传图片');
        return;
      }
      if(order.address=='请选择地址'||order.price==''||order.content==''){
        Toast.fail('信息不完整！');
        return;
      }
      upload(fileList.value[0]).then((res) => {
        order.photoUrl = res.data;
        createOrder(order)
            .then((res) => {
              if(res.code==200){
                Toast.success('创建成功！')
              }else{
                Toast.fail('创建失败！')
              }
            })
        router.push("/order");
      });
    }
    return {
      submit,
      fileList,
      order,
      address, show1, show2, onSelect, onSelectType, types: [
        {name: "维修"},
        {name: "商品"},
      ],
    }
  },
};
</script>

<style lang='less' scoped>
</style>