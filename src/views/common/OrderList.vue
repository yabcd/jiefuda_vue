<template>
  <div class="order-list">
    <van-swipe-cell v-for="(item,index) in orderlist">
      <van-card  :desc="item.content" :title="(item.type==0)?'维修':'商品'"
                :thumb="baseUrl+'/'+item.photoUrl" @click="getInfo(item)"/>
      <template #right v-if="ifdelete">
        <van-button square text="删除" type="danger" class="delete-button" @click="delete_order(item.id);orderlist.splice(index,1)" />
      </template>
    </van-swipe-cell>

  </div>
</template>

<script>
import {Card,SwipeCell,Button,Toast} from "vant";
import {useRouter} from "vue-router";
import {deleteOrder} from "../../network/order"

export default {
  components: {
    [Card.name]: Card,
    [SwipeCell.name]: SwipeCell,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  props: {
    orderlist: {
      type: Array,
      default: [],
    },
    ifdelete:{
      type:Boolean,
      default: false,
    }
  },
  setup() {
    const {baseUrl}  = require('../../assets/js/common')
    const router = useRouter();
    const getInfo = (item) => {
      router.push({name: "OrderInfo", params: {id: item.id}});
    };
    const delete_order = (id)=>{
      deleteOrder(id).then(res=>{
        console.log(res)
        if(res.code==200){
          Toast.success("删除成功");
        }
      })
    }
    return {getInfo,baseUrl,delete_order}

  }
}
</script>

<style lang="less" scoped>
.order-list {
  margin-top: 45px;
  margin-bottom: 50px;
}
.delete-button {
  height: 100%;
}
</style>