<template>
  <nav-bar>
    <template v-slot:default>订单</template>
  </nav-bar>
<!--  <div class="order">-->
<!--    <van-card v-for="item in banner" :desc="item.content" :title="(item.type==0)?'维修':'商品'" thumb="https://img01.yzcdn.cn/vant/ipad.jpeg" @click="getInfo(item)" />-->
<!--  </div>-->
  <order-list :orderlist="banner" :ifdelete="true"></order-list>

  <van-button icon="plus" @click="createOrder" />
</template>
<script>
import { Card, Button } from "vant";
import { ref, onMounted } from "vue";
import { getOrderByUserId } from "../network/order";
import { useRouter } from "vue-router";
import NavBar from "./common/Navbar";
import OrderList from "./common/OrderList";
export default {
  components: {
    [Card.name]: Card,
    [Button.name]: Button,
    NavBar,
    OrderList,
  },
  setup() {
    const banner = ref([]);
    const router = useRouter();

    const getInfo = (item) => {
      router.push({ name: "OrderInfo", params: { id: item.id } });
    };
    const createOrder = () => {
      router.push("/order/create");
    };

    onMounted(() => {
      getOrderByUserId()
        .then((res) => {
          console.log(res);
          banner.value = res.data;
        })
        .catch((err) => {});
    });
    return {
      banner,
      getInfo,
      createOrder,
    };
  },
};
</script>
<style lang="less" scoped >
.order {
  margin-top: 45px;
}
.van-button {
  border-radius: 50%;
  background-color: rgba(66, 187, 170, 0.5);
  position: fixed;
  bottom: 60px;
  right: 10px;
}
</style>