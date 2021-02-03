import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { NextPageContext } from 'next'
import { Form, Input, Button, Card } from 'antd'
import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface IPConfig {
  host: string;
  user: string;
  password: string;
}

const Home = () => {

  const router = useRouter()
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    isConnect()
  }, [])

  const isConnect = async () => {
    const res = await fetch(`/api/is_connect`, { method: "POST" })
    const json = await res.json()
    debugger
    if (json.isconnect) {
      Router.push(`/dashboard`)
    }

  }

  const login = async (value: any) => {
    const { user, password, host } = value
    const params = { user, password, host }
    const options = {
      method: "POST", headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(params)
    }
    setLoading(true)
    const res = await fetch(`/api/login`, options)
      .catch((err) => {
        alert(JSON.stringify(err))
      })
    setLoading(false)
    if (res)
      if (res.status == 401) {
        alert('Data Tidak Ditemukan')
      } else {
        router.push(`/dashboard`)
      }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        {/* <div className={styles.grid}> */}
        <Card>
          <Form
            {...layout}
            name="basic"
            onFinish={login}
          >
            <Form.Item
              name="host"
              label="Host"
              rules={[{ required: true, message: 'Please input your host!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="user"
              label="User"
              rules={[{ required: true, message: 'Please input your user!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"

              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" loading={isLoading} htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Card>
        {/* </div> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Home