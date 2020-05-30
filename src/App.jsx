import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Layout} from 'antd'
import {HttpLink} from 'apollo-link-http'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from '@apollo/react-hooks'

import './App.css'

import {ACCOUNT_CENTER, HEADER_FOR_AUTH} from './utils/secrets'
import BodyContainer from './components/common/BodyContainer'
import HeaderContainer from './components/common/HeaderContainer'
import {getTokens} from './modules/login/utils/manage-tokens'

const { Content, Header, Footer } = Layout

const customFetch = (uri, options) => {
    const tokens = getTokens()
    if (tokens && tokens.token) {
        // options.headers.Authorization = `Bearer ${tokens.accessToken}`
        options.headers[HEADER_FOR_AUTH] = tokens.token
    }
    return fetch(uri, options)
}
const httpLink = new HttpLink({
    uri: `${ACCOUNT_CENTER}/login`,
    fetch: customFetch
})
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Router>
                    <Layout className='site-layout'>
                        <Header style={{ background: '#fff', padding: '0' }}>
                            <HeaderContainer title={'gqlAccount Center'}/>
                        </Header>
                        <Content style={{ margin: '16px' }}>
                            <BodyContainer/>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>©2020 Created by Iasc CHEN(iasc@163.com)</Footer>
                    </Layout>
                </Router>
            </Layout>
        </ApolloProvider>
    )
}

export default App
