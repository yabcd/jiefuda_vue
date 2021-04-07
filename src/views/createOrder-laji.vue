<template>
  <div class="myitem">
    <span>地址</span>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
  </div>
  <div class="myitem">
    <span>类型</span>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
  </div>
  <div class="mypic">
    <span>图片</span>
    <van-uploader :after-read="afterRead" />
  </div>
  <van-field v-model="content" label="详细信息" placeholder="请输入详细信息" />
  <div>
    <van-button round block type="info" @click="submit">提交</van-button>
  </div>
</template>

<script>
import {
  Form,
  Field,
  DropdownMenu,
  DropdownItem,
  Uploader,
  Button,
  Toast,
} from "vant";
import { onMounted, ref } from "vue";
import { findUserByid } from "../network/user";
import { upload, createOrder } from "../network/order";
import { useRouter } from "vue-router";
export default {
  components: {
    [Form.name]: Form,
    [DropdownMenu.name]: DropdownMenu,
    [Field.name]: Field,
    [DropdownItem.name]: DropdownItem,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  setup() {
    const router = useRouter();
    const option1 = ref([]);
    const userId = ref([]);
    const photoUrl = ref([]);
    const content = ref([]);
    let value1 = ref([]);
    let value2 = ref([]);
    onMounted(() => {
      findUserByid().then((res) => {
        let add = res.data.address;
        userId.value = res.data.id;
        if (option1.value == null) {
          add = [];
        } else {
          for (var i = 0; i < add.length; i++) {
            add[i] = {
              text: add[i],
              value: add[i],
            };
          }
        }
        option1.value = add;
        console.log(add);
      });
    });
    const afterRead = (file) => {
      console.log(file);
      upload(file).then((res) => {
        photoUrl.value = res.data;
        console.log(photoUrl.value);
      });
    };
    const submit = () => {
      createOrder(
        userId.value,
        value1.value,
        value2.value,
        photoUrl.value,
        content.value
      )
        .then((res) => {
          if(res.code==200){
            Toast.success('创建成功！')
          }else{
            Toast.fail('创建失败！')
          }
        })
      router.push("/order");
    };
    return {
      content,
      submit,
      afterRead,
      value1,
      option1,
      value2,
      option2: [
        { text: "维修", value: 0 },
        { text: "商品", value: 1 },
      ],
    };
  },
};
</script>

<style lang='less' scoped>
.myitem {
  span {
    display: block;
    width: 50px;
    line-height: 50px;
  }
}
.mypic {
  float: left;
  span {
    padding: 10px;
    width: 100px;
  }
  .van-uploader {
    margin-left: 80px;
  }
}
</style>