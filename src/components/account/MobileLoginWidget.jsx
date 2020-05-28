import React, {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'
import {Button, Checkbox, Col, Form, Input, message, Row, Spin} from 'antd'
import {KeyOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'

import {ZDN_COOKIE_USER} from '../../constant'
import {layout, tailLayout} from '../../components/constant'
import {useUser} from '../../hook/UserProvider'

const LOGIN_MOBILE = gql`
    query loginByMobile($mobile: String!, $password: String!){
        loginByMobile(mobile: $mobile, password: $password) {
            token, user
        }
    }`

const MobileLoginWidget = ({ onForgot, onSignUp, onRememberMe, rememberMe, userInCookies }) => {
    const [sData, setDate] = useState()
    const [formData] = Form.useForm()

    const { setAccessToken } = useUser()
    const [cookies, setCookie, removeCookie] = useCookies([ZDN_COOKIE_USER])

    const [sLoading, setLoading] = useState(false)

    const history = useHistory()

    const { refetch } = useQuery(LOGIN_MOBILE, {
        variables: sData,
        skip: !sData,
    })

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
            const response = await refetch({ variables: values })
            const ret = response.data.loginByMobile
            console.log(ret)

            if (ret && ret.token) {
                setLoading(false)
                const _user = JSON.parse(ret.user)
                rememberMe ? setCookie(ZDN_COOKIE_USER, _user) : removeCookie(ZDN_COOKIE_USER)
                setAccessToken(ret)
                history.push('/')
            } else {
                setLoading(false)
                setAccessToken()
                removeCookie(ZDN_COOKIE_USER)
                message.error('登录失败！')
            }
        } catch (err) {
            console.log(err)
            message.error('登录失败！')
        }
    }

    return (
        <Form {...layout} form={formData} onFinish={handleLogin}>
            <Form.Item name='mobile' label='Mobile' required>
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
                            <Col span={12}>
                                <Button style={{ width: '60%', margin: '0 20%' }} onClick={onForgot}><KeyOutlined/> 重置密码
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item {...tailLayout} >
                        <Button style={{ width: '30%', margin: '0 10%' }} onClick={onSignUp}><UserAddOutlined/> 注册
                        </Button>
                        <Button type='primary' htmlType='submit'
                            style={{ width: '30%', margin: '0 10%' }}><UserOutlined/> 登录 </Button>
                    </Form.Item>
                </>
            }
        </Form>
    )
}

export default MobileLoginWidget
