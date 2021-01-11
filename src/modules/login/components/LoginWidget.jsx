import React, {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'
import {Card, Tabs} from 'antd'

import {LDAP_AUTH} from '../../../utils/secrets'
import {ZDN_COOKIE_USER} from '../utils/manage-tokens'
import MobileLoginWidget from './MobileLoginWidget'
import LdapLoginWidget, {ONLY, OFF, BOTH} from './LdapLoginWidget'

const { TabPane } = Tabs

const LoginWidget = () => {
    const [sRememberMe, setRememberMe] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies([ZDN_COOKIE_USER])

    const history = useHistory()

    const handleRememberMe = (e) => {
        const value = e.target.checked
        setRememberMe(value)
        !value && removeCookie(ZDN_COOKIE_USER)
    }

    const handleSignUp = () => {
        history.push('/signup')
    }

    const handleResetPW = () => {
        history.push('/resetpw')
    }

    const renderDialog = ( dlgType ) => {
        if ( dlgType === ONLY ){
            return <LdapLoginWidget onForgot={handleResetPW} onRememberMe={handleRememberMe}
                rememberMe={sRememberMe} userInCookies={cookies[ZDN_COOKIE_USER]}/>
        }
        if ( dlgType === BOTH ){
            return (
                <Tabs defaultActiveKey='1' >
                    <TabPane tab='LDAP' key='1'>
                        <LdapLoginWidget onForgot={handleResetPW}
                            onRememberMe={handleRememberMe} rememberMe={sRememberMe}
                            userInCookies={cookies[ZDN_COOKIE_USER]}/>
                    </TabPane>
                    <TabPane tab='Mobile' key='2'>
                        <MobileLoginWidget onSignUp={handleSignUp} onForgot={handleResetPW}
                            onRememberMe={handleRememberMe} rememberMe={sRememberMe}
                            userInCookies={cookies[ZDN_COOKIE_USER]}/>
                    </TabPane>
                </Tabs>
            )
        }
        return <MobileLoginWidget onSignUp={handleSignUp} onForgot={handleResetPW}
            onRememberMe={handleRememberMe} rememberMe={sRememberMe} userInCookies={cookies[ZDN_COOKIE_USER]}/>
    }

    return (
        <Card title='登录'>
            {/*{ JSON.stringify(LDAP_AUTH) }*/}
            { renderDialog(LDAP_AUTH) }
        </Card>
    )
}

export default LoginWidget
