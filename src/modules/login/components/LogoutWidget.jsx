import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {message} from 'antd'
import {useCookies} from 'react-cookie'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

import {ZDN_COOKIE_USER} from '../utils/manage-tokens'
import {useUser} from '../hook/UserProvider'
import {loggerError} from '../../../components/constant'

const LOGOUT = gql`
    mutation logout {
        logout
    }`

const LogoutWidget = () => {
    const { setAccessToken } = useUser()
    const history = useHistory()
    const [cookies, setCookie, removeCookie] = useCookies([ZDN_COOKIE_USER])

    const [signOut] = useMutation(LOGOUT)

    useEffect(() => {
        if (!removeCookie || !setAccessToken) {
            return
        }

        signOut().then(
            (result)=>{
                console.log('logout', result)
                message.info('退出登录！')
                setAccessToken()
                removeCookie && removeCookie(ZDN_COOKIE_USER)
                history.push('/')
            }, loggerError)


    }, [removeCookie, setAccessToken])

    return (<></>)
}

export default LogoutWidget
