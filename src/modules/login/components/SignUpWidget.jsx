import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Card, Form, Input, message, Spin} from 'antd'
import {SaveOutlined} from '@ant-design/icons'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {layout, tailLayout} from '../../../components/constant'
import {INVITE_TOKEN_TTL} from '../../../utils/secrets'

const SIGN_UP = gql`
    mutation createUser($user: CreateUserInput!){
        createUser(user: $user) {
            _id
        }
    }`

const INVITE_TOKEN = gql`
    mutation inviteToken($mobile: String!){
        inviteToken(mobile: $mobile) {
            _id
        }
    }`

const SignUpPWWidget = () => {
    const [sLoading, setLoading] = useState(false)

    const [formData] = Form.useForm()
    const history = useHistory()

    const [signUp] = useMutation(SIGN_UP)
    const [inviteToken] = useMutation(INVITE_TOKEN)

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            const ret = await signUp({ variables: { user: values } })

            if (ret.data.createUser && ret.data.createUser._id) {
                setLoading(false)
                message.info('注册成功！')
                history.push('/')
                return
            } else {
                console.log(ret)
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
        message.error('注册失败！')
    }

    const handleSendToken = async () => {
        try {
            const mobile = formData.getFieldValue('mobile')
            const ret = await inviteToken({ variables: { mobile } })

            if (ret.data.inviteToken && ret.data.inviteToken._id) {
                message.info(`Token 发送成功！${INVITE_TOKEN_TTL} 秒内有效`)
                return
            }
        } catch (err) {
            console.log(err)
        }
        message.error('Token 发送失败！请重新发送')
    }

    return (
        <Card title='注册'>
            <Form {...layout} form={formData} onFinish={handleSubmit}>
                <Form.Item name='mobile' label='Mobile' required>
                    <Input/>
                </Form.Item>
                <Form.Item name='inviteToken' label='Token' required>
                    <Input/>
                </Form.Item>
                <Form.Item name='password' label='Password' required>
                    <Input.Password/>
                </Form.Item>
                {sLoading
                    ? <Spin/>
                    : <Form.Item {...tailLayout}>
                        <Button style={{ width: '30%', margin: '0 10%' }} onClick={handleSendToken}> 发送
                                    Token </Button>
                        <Button type='primary' htmlType='submit' style={{ width: '30%', margin: '0 10%' }}>
                            <SaveOutlined/> 注册 </Button>
                    </Form.Item>
                }
            </Form>
        </Card>
    )
}

export default SignUpPWWidget
