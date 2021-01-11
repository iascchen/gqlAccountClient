import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'
import {Button, Checkbox, Col, Form, Input, message, Row, Spin} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import {useMutation} from '@apollo/react-hooks'

import {LDAP_USER_RDN} from '../../../utils/secrets'
import {layout, tailLayout} from '../../../components/constant'
import {ZDN_COOKIE_USER} from '../utils/manage-tokens'
import {useUser} from '../hook/UserProvider'
import {LOGIN_LDAP} from '../graphql'

export const ONLY = 'only'
export const BOTH = 'both'
export const OFF = 'off'

const LdapLoginWidget = ({ onForgot, onRememberMe, rememberMe, userInCookies }) => {
    const [sData, setDate] = useState()
    const [formData] = Form.useForm()

    const { setAccessToken } = useUser()
    const [cookies, setCookie, removeCookie] = useCookies([ZDN_COOKIE_USER])

    const [sLoading, setLoading] = useState(false)

    const history = useHistory()

    const [loginByLdap] = useMutation(LOGIN_LDAP)

    useEffect(() => {
        if (!userInCookies || !formData) {
            return
        }
        formData.setFieldsValue(userInCookies)
    }, [userInCookies, formData])

    const handleLogin = async (values) => {
        console.log('handleLogin', values)
        setDate(values)
        try {
            const response = await loginByLdap({ variables: values })
            const ret = response.data.loginByLdap
            console.log(ret)

            if (ret && ret.token) {
                setLoading(false)
                const _user = ret.user
                rememberMe ? setCookie(ZDN_COOKIE_USER, _user) : removeCookie(ZDN_COOKIE_USER)
                setAccessToken(ret)
                message.info('登录成功！')
                history.push('/')
                return
            } else {
                setAccessToken()
                removeCookie(ZDN_COOKIE_USER)
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
        message.error('登录失败！')
    }

    return (
        <Form {...layout} form={formData} onFinish={handleLogin}>
            <Form.Item name='uid' label={`RDN=${LDAP_USER_RDN}`} required>
                <Input/>
            </Form.Item>
            <Form.Item name='password' label='Password' required>
                <Input.Password/>
            </Form.Item>
            {sLoading
                ? <Spin/>
                : <>
                    <Form.Item {...tailLayout} >
                        <Row>
                            <Col span={12}>
                                <Checkbox onChange={onRememberMe} checked={rememberMe}/> Remember Me
                                {sLoading && <Spin/>}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item {...tailLayout} >
                        <Button type='primary' htmlType='submit' style={{ width: '60%', margin: '0 20%' }}>
                            <UserOutlined/> 登录 </Button>
                    </Form.Item>
                </>
            }
        </Form>
    )
}

LdapLoginWidget.propTypes = {
    onForgot: PropTypes.func,
    onRememberMe: PropTypes.func,
    rememberMe: PropTypes.bool,
    userInCookies: PropTypes.any
}

export default LdapLoginWidget
