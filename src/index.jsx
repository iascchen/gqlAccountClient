import React from 'react'
import ReactDOM from 'react-dom'
import {CookiesProvider} from 'react-cookie'

import './index.css'
import 'antd/dist/antd.css'

import App from './App'
import {UserProvider} from './modules/login/hook/UserProvider'

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
