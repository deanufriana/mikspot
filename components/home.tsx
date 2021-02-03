import 'antd/dist/antd.css'
import {
    Layout, Breadcrumb, Input, Select, Row, Col, Form, Button, Popconfirm, Table
} from 'antd';
import { useState, useEffect } from 'react'
import { url } from '../pages/configs/variable';
import bytesToSize from '../lib/bytesToSize';
import { Option } from 'antd/lib/mentions';
const { Content } = Layout;

const Home = () => {

    const [isLoading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [usersProfile, setUsersProfile] = useState([])

    useEffect(() => {
        getDataUsers()
        getUserProfile()
    }, [])

    const getDataUsers = async (userProfile: string = 'All') => {
        setLoading(true)
        const params = { userProfile }
        const options = {
            method: "POST", headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(params)
        }
        const res = await fetch(`${url}/api/get_user`, options)
            .catch(err => {
                alert('Data tidak ditemukan')
                return
            })
        setLoading(false)

        if (res) {
            if (res.status == 401) return alert('Silahkan Login Ulang')
            const data = await res.json()
            setUsers(data)
        }
    }

    const getUserProfile = async () => {
        setLoading(true)
        const res = await fetch(`${url}/api/get_user_profile`)
            .catch(err => {
                alert('Profile tidak ditemukan')
                return
            })
        setLoading(false)

        if (res) {
            if (res.status == 401) return
            const data = await res.json()
            data.unshift({ name: "All" })
            setUsersProfile(data)
        }
    }

    const onFinishForm = (value) => {
        debugger
        getDataUsers(value.userProfile)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Profile',
            dataIndex: 'profile',
            key: 'profile'
        },
        {
            title: 'Uptime',
            dataIndex: 'uptime',
            key: 'uptime',
        },
        {
            title: 'Bytes in',
            dataIndex: 'bytes-in',
            key: 'bytes-in',
            render: (value) => {
                return bytesToSize(value)
            }
        },
        {
            title: 'Bytes Out',
            dataIndex: 'bytes-out',
            key: 'bytes-out',
            render: (value) => {
                return bytesToSize(value)
            }
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment'
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: ({ id, attend }) => {
                return (
                    <Row>
                        <Button type="primary" danger disabled={attend} size="small" >Delete</Button>
                    </Row>
                )
            }
        }
    ]

    return (
        <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Row>
                    <Col flex='1'>
                        <Form layout="inline" style={{ marginBottom: 20 }} onFinish={onFinishForm}>
                            <Form.Item label="Profile User" name="userProfile">
                                <Select defaultValue="All" style={{ width: 100 }}>
                                    {usersProfile.map(item => {
                                        return <Option value={item.name}>{item.name}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isLoading}> Search </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col>
                        <Button>Generate User</Button>
                    </Col>
                </Row>
                <Table columns={columns} loading={isLoading} dataSource={users} size="small" scroll={{ x: '70vw' }} />
            </div>
        </Content>
    )
}

export default Home