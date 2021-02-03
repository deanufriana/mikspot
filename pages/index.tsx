import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { url } from './configs/variable'
import { NextPageContext } from 'next'
import { Form, Input, Button } from 'antd'
import Router, { useRouter } from 'next/router'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface Props {
  is_connect?: boolean
}

interface IPConfig {
  host: string;
  user: string;
  password: string;
}

const Home = () => {
  const router = useRouter()

  const login = async (value: any) => {
    const { user, password, host } = value
    const params = { user, password, host }
    const options = {
      method: "POST", headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(params)
    }
    const res = await fetch(`${url}/api/login`, options)
      .catch((err) => {
        alert(JSON.stringify(err))
      })

    if (res)
      if (res.status == 401) {
        alert('Data Tidak Ditemukan')
      } else {
        router.push(`${url}/dashboard`)
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
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
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

Home.getInitialProps = async ({ req }: NextPageContext) => {
  console.log('getInitial')
  const res = await fetch(`${url}/api/is_connect`, { method: "POST" })
  const json = await res.json()

  if (json.is_connect) {
    Router.push(`${url}/dashboard`)
  } else {
    return { is_connect: json.is_connect }
  }

}

export default Home