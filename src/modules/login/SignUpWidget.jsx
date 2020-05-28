import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Card, Col, Form, Input, message, Row, Spin} from 'antd'
import {SaveOutlined} from '@ant-design/icons'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {layout, tailLayout} from '../../components/constant'

const SIGN_UP = gql`
    mutation createUser($user: CreateUserInput!){
        createUser(user: $user) {
            _id
        }
    }`

const SignUpPWWidget = () => {
    const [formData] = Form.useForm()

    const [sLoading, setLoading] = useState(false)
    const [signUp] = useMutation(SIGN_UP)
    const history = useHistory()

    const handleSubmit = async (values) => {
        setLoading(true)
        const ret = await signUp({ variables: { user: values } })
        console.log(ret)

        if (ret.data.createUser && ret.data.createUser._id) {
            setLoading(false)
            message.info('注册成功！')
            history.push('/')
        } else {
            setLoading(false)
            message.error('注册失败！')
        }
    }

    return (
        <Row className='centerContainer' style={{ width: '100%' }}>
            <Col span={16}>
                <Card title='注册'>
                    <Form {...layout} form={formData} onFinish={handleSubmit}>
                        <Form.Item name='mobile' label='Mobile' required>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='passwordResetToken' label='Token' required>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='password' label='Password' required>
                            <Input.Password />
                        </Form.Item>
                        {sLoading
                            ? <Spin/>
                            : <Form.Item {...tailLayout}>
                                <Button style={{ width: '30%', margin: '0 10%' }}> 发送 Token </Button>
                                <Button type='primary' htmlType='submit' style={{ width: '30%', margin: '0 10%' }}>
                                    <SaveOutlined/> 注册 </Button>
                            </Form.Item>
                        }
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default SignUpPWWidget
