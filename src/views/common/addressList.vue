<template>
  <div class="add-list">
    <van-list finished-text="没有更多了">

      <van-swipe-cell v-for="(item,index) in address" :key="item">
        <van-cell  :title="item"/>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="deleteAdd(index)"/>
        </template>
      </van-swipe-cell>
    </van-list>
  </div>
</template>

<script>
import {SwipeCell, List,Button,Cell} from 'vant'
import {onMounted, ref} from "vue";
import {findUserByid,changeInfo} from "../../network/user";

export default {
  name: "AddList",
  components: {
    [SwipeCell.name]: SwipeCell,
    [List.name]: List,
    [Button.name]: Button,
    [Cell.name]: Cell,
  },
  setup() {
    const address = ref([]);
    const user = ref([]);
    onMounted(() => {
      findUserByid().then((res) => {
        address.value= res.data.address;
        user.value = res.data;
      });
    });

    const deleteAdd = (index)=>{
      address.value.splice(index,1);
      user.value.address = address.value;
      changeInfo(user.value).then(res=>{});
    }
    return {address,deleteAdd}
  },
};
</script>

<style lang='less' scoped>
</style>