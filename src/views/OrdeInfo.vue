<template>
  <div>
    <van-image width="100%" height="10rem" fit="cover" :src="baseUrl+'/'+order.photoUrl" />
    <van-cell title="介绍" :value="order.content" />
    <van-cell title="发布用户" :value="user.name" />
    <van-cell title="类型" :value="order.type==0?'维修':'商品'" />
    <van-cell title="价格" :value="order.price+'元'" />
    <van-cell title="地址" :value="order.address" />
  </div>
</template>

<script>
import { findUserByid } from "../network/user";
import { findOrderByid } from "../network/order";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Form, Image, Cell } from "vant";
export default {
  components: {
    [Form.name]: Form,
    [Image.name]: Image,
    [Cell.name]: Cell,
  },
  setup() {
    const {baseUrl}  = require('../assets/js/common')
    const user = ref([]);
    const route = useRoute();
    const order = ref([]);
    onMounted(() => {
      findOrderByid(route.params.id).then((res) => {
          order.value = res.data;
          findUserByid(order.value.userId).then((res) => {
              user.value = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return {
      order,
      user,
      baseUrl
    };
  },
};
</script>

<style lang='less' scoped>
</style>