import {
    request
} from './request'

export function getAll() {
    return request({
        url: '/order/getall',
    });
}


export function findUserByid(id) {
    return request({
        url: '/user/find',
        method: 'post',
        data: {
            'id': id
        },
        header: {
            'Content-Type': 'application/json' //如果写成contentType会报错
        }
    });
}

export function login(name, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            'name': name,
            'password': password
        },
        header: {
            'Content-Type': 'application/json' //如果写成contentType会报错
        }
    });
}

export function register(name, password) {
    return request({
        url: '/user/register',
        method: 'post',
        data: {
            'name': name,
            'password': password
        },
        header: {
            'Content-Type': 'application/json' //如果写成contentType会报错
        }
    });
}

export function addAddress(address) {
    return request({
        url: '/user/addAddress',
        method: 'post',
        data: {
            'address': address,
        },
        header: {
            'Content-Type': 'application/json' //如果写成contentType会报错
        }
    });
}

export function changeInfo(user) {
    return request({
        url: '/user/changeInfo',
        method: 'post',
        data: user,
        header: {
            'Content-Type': 'application/json' //如果写成contentType会报错
        }
    });
}