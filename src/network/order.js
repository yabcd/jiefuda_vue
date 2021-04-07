import {
  request
} from './request'

export function getOrderByUserId() {
  return request({
    url: '/order/get'
  });
}
export function findOrderByid(id) {
  return request({
    url: '/order/find',
    method: 'post',
    data: {
      'id': id
    },
    headers: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
  });
}

export function upload(file) {
  let formdata = new FormData();
  formdata.append('file', file.file);
  console.log(formdata.get('file'));
  return request({
    url: '/order/upload',
    method: 'post',
    data: formdata,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function createOrder(order) {
  console.log(order)
  return request({
    url: '/order/create',
    method: 'post',
    data: order,
    headers: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
  });
}

export function deleteOrder(id) {
  return request({
    url: '/order/delete',
    method: 'post',
    data: {
      "id":id,
    },
    headers: {
      'Content-Type': 'application/json' //如果写成contentType会报错
    },
  });
}