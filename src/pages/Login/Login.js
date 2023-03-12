import React from 'react'
import { Toast } from 'antd-mobile'
import { Form, Input, Button } from 'antd-mobile'
import axios from 'axios'
import { baseURL } from '@/api/request.js'
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
export default function Login () {
  const navigator = useNavigate()
  // const [info, setInfo] = useState()

  async function Info (params) {
    const res = await axios.get(`${baseURL}/user`,
      {
        headers: {
          authorization: params
        }

      }
    )
    console.log(res)
    localStorage.setItem('uerInfo', JSON.stringify(res.data.body))
  }

  async function login (params) {
    const res = await axios.post(`${baseURL}/user/login`,
      params
    )
    if (res.data.status === 200) {
      let token = res.data.body.token
      localStorage.setItem('token', token)
      Info(token)

      navigator(-1)

    } else {
      alert('登录失败')
    }

  }





  const [form] = Form.useForm()
  const onSubmit = (e) => {
    const values = form.getFieldsValue()

    login(values)
  }
  return (
    <>
      <Form layout='horizontal' mode='card'
        form={form}
        initialValues={
          {
            username: 111111,
            password: 111111
          }
        }
        footer={
          <Button block color='primary' onClick={onSubmit} size='large'>
            提交
          </Button>
        }
      >
        <Form.Item label='账号' name='username'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='密码' name='password' >
          <Input type='password' placeholder='请输入' />
        </Form.Item>


      </Form>

    </>
  )
}
