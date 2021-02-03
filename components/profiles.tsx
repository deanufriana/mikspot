import 'antd/dist/antd.css'
import {
    Layout, Breadcrumb, Input, Select, Row, Col, Form, Button, Popconfirm, Table
} from 'antd';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
const { Content } = Layout;

const Profiles = () => {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [usersProfile, setUsersProfile] = useState([])

    useEffect(() => {
        getUserProfile()
    }, [])

    const getUserProfile = async () => {
        setLoading(true)
        const res = await fetch(`/api/get_user_profile`)
            .catch(err => {
                router.push(`/`)
                alert('Profile tidak ditemukan')
                return
            })
        setLoading(false)

        if (res) {
            if (res.status == 401) return router.push(`/`)
            const data = await res.json()
            setUsersProfile(data)
        }
    }

    const onFinishForm = (value) => {
        // getUserProfile(value.userProfile)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Shared Users',
            dataIndex: 'shared-users',
            key: 'shared-users'
        },
        {
            title: 'Rate Limit',
            dataIndex: 'rate-limit',
            key: 'rate-limit',
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
                        {/* <Form layout="inline" style={{ marginBottom: 20 }} onFinish={onFinishForm}>
                       
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isLoading}> Search </Button>
                            </Form.Item>
                        </Form> */}
                    </Col>
                    <Col>
                        <Button>Generate User</Button>
                    </Col>
                </Row>
                <Table columns={columns} loading={isLoading} dataSource={usersProfile} size="small" scroll={{ x: '70vw' }} />
            </div>
        </Content>
    )
}

export default Profiles