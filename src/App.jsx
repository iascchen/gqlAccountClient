import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Layout} from 'antd'

import './App.css'
import BodyContainer from './components/common/BodyContainer'
import HeaderContainer from './components/common/HeaderContainer'

const { Content, Header, Footer } = Layout

const App = () => {
    return (
        <Layout>
            <Router>
                <Layout className='site-layout'>
                    <Header style={{ background: '#fff', padding: '0' }}>
                        <HeaderContainer />
                    </Header>
                    <Content style={{ margin: '16px' }}>
                        <BodyContainer/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>©2020 Created by Iasc CHEN(iasc@163.com)</Footer>
                </Layout>
            </Router>
        </Layout>
    )
}

export default App
