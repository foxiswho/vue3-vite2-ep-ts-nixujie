import {mock, Random} from 'mockjs'
import {login, setToken, checkToken, getUser, getRoute} from '@/mock/response'

interface IReq {
  body: any
}

mock('/login', 'post', (req: IReq) => {
  const {username, password} = JSON.parse(req.body)
  if (login(username, password)) {
    return mock({
      code: 200,
      message: '登陆成功',
      data: {
        token: setToken(username),
        info: getUser(username)
      }
    })
  }
  return mock({
    code: 401,
    message: '用户名或密码错误',
    data: ''
  })
})

mock('/logout', 'get', () => {
  return mock({
    code: 200,
    message: '操作成功',
    data: {}
  })
})

mock('/getInfo', 'get', () => {
  // const {token} = JSON.parse(req.body)
  // console.log(req.body)
  // const userName = checkToken(token)
  const userName = 'admin'
  // if (!userName) {
  //   return mock({
  //     code: 401,
  //     message: '身份认证失败',
  //     data: ''
  //   })
  // }
  return mock({
    code: 200,
    message: '',
    data: {
      info:getUser(userName)
    }
  })
})

// mock('/getRoute', 'get', (req: IReq) => {
//   const {token} = JSON.parse(req.body)
//   const userName = checkToken(token)
//   if (!userName) {
//     return mock({
//       code: 401,
//       message: '身份认证失败',
//       data: ''
//     })
//   }
//   return mock({
//     code: 200,
//     data: getRoute(userName),
//     message: ''
//   })
// })


Random.extend({
  tag: function () {
    const tag = ['家', '公司', '学校', '超市']
    return this.pick(tag)
  }
})

interface ITableList {
  list: Array<{
    date: string
    name: string
    address: string
    tag: '家' | '公司' | '学校' | '超市'
    amt: number
  }>
}

const tableList: ITableList = mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|100': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1,
    date: () => Random.date('yyyy-MM-dd'),
    name: () => Random.name(),
    address: () => Random.cparagraph(1),
    tag: () => Random.tag(),
    amt: () => Number(Random.float(-100000, 100000).toFixed(2))
  }]
})
mock('/getTableList', 'get', (req: IReq) => {
  const {page, size, tag} = JSON.parse(req.body)
  const data = tag === '所有' ? tableList.list : tableList.list.filter(v => v.tag === tag)
  return mock({
    code: 200,
    data: {
      data: data.filter((v, i) => i >= (page - 1) * size && i < page * size),
      total: data.length
    },
    message: ''
  })
})
