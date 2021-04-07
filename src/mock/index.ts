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


Random.extend({
  tag: function () {
    const tag = ['家', '公司', '学校', '超市']
    return this.pick(tag)
  }
})
