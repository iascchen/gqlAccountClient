import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {message} from 'antd'
import {useCookies} from 'react-cookie'

import {ZDN_COOKIE_USER} from './utils/manage-tokens'
import {useUser} from './hook/UserProvider'

const LogoutWidget = () => {
    const { setAccessToken } = useUser()
    const history = useHistory()
    const [cookies, setCookie, removeCookie] = useCookies([ZDN_COOKIE_USER])

    useEffect(() => {
        if (!removeCookie || !setAccessToken) {
            return
        }
        message.info('退出登录！')
        setAccessToken()
        removeCookie && removeCookie(ZDN_COOKIE_USER)
        history.push('/')
    }, [removeCookie, setAccessToken])

    return (<></>)
}

export default LogoutWidget
