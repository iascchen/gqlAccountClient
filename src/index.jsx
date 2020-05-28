import React from 'react'
import ReactDOM from 'react-dom'
import {CookiesProvider} from 'react-cookie'
import {ApolloProvider} from '@apollo/react-hooks'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {HttpLink} from 'apollo-link-http'

import './index.css'
import 'antd/dist/antd.css'

import App from './App'
import {ACCOUNT_CENTER} from './utils/secrets'
import {UserProvider} from './hook/UserProvider'
import {getTokens} from './utils/manage-tokens'

const customFetch = (uri, options) => {
    const tokens = getTokens()
    if (tokens && tokens.token) {
        // options.headers.Authorization = `Bearer ${tokens.accessToken}`
        options.headers.token = tokens.token
    }
    return fetch(uri, options)
}
const httpLink = new HttpLink({
    uri: `${ACCOUNT_CENTER}/api`,
    fetch: customFetch
})
const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <UserProvider>
                <ApolloProvider client={client}>
                    <App/>
                </ApolloProvider>
            </UserProvider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
