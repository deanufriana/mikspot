import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react'
import Users from '../../components/users';
import Profiles from '../../components/profiles';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

function Dashboard() {

    const [collapsed, seCollapse] = useState(false)
    const [menu, setMenu] = useState('users')

    let components;

    switch (menu) {
        case 'users':
            components = <Users />
            break;
        case 'profiles':
            components = <Profiles />
            break;
        default:
            break;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed}
                onCollapse={(value) => seCollapse(value)}>
                <div className="logo" />
                <Menu theme="dark" onClick={(e) => setMenu(e.key.toString())} defaultSelectedKeys={['users']} mode="inline">
                    <SubMenu key="hotspot" icon={<UserOutlined />} title="Hotspot">
                        <Menu.Item key="users">Users</Menu.Item>
                        <Menu.Item key="profiles">Users Profile</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ paddingLeft: 20 }}>Mikrotik Sistem</Header>
                {components}
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}


export default Dashboard