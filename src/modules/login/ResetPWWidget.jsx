import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Card, Col, Form, Input, message, Row, Spin} from 'antd'
import {SaveOutlined} from '@ant-design/icons'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {layout, tailLayout} from '../../components/constant'

// TODO 应该实现为生成密码修改 Token
const FORGOT_PASSWORD = gql`
    mutation updateUser($_id: String!, $user: UpdateUserInput!){
        updateUser(_id: $_id, user: $user) {
            _id
        }
    }`

const ResetPWWidget = () => {
    const [formData] = Form.useForm()

    const [sLoading, setLoading] = useState(false)
    const [forgot] = useMutation(FORGOT_PASSWORD)
    const history = useHistory()

    const handleSubmit = async (values) => {
        setLoading(true)
        const ret = await forgot({ variables: { user: values } })
        console.log(ret)

        if (ret.data.updateUser && ret.data.updateUser._id) {
            setLoading(false)
            message.info('密码修改成功！')
            history.push('/')
        } else {
            setLoading(false)
            message.error('密码修改失败！')
        }
    }

    return (
        <Row className='centerContainer' style={{ width: '100%' }}>
            <Col span={16}>
                <Card title='重设密码'>
                    <Form {...layout} form={formData} onFinish={handleSubmit}>
                        <Form.Item name='mobile' label='Mobile' required>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='passwordResetToken' label='Token' required>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='password' label='New Password' required>
                            <Input.Password />
                        </Form.Item>
                        {sLoading
                            ? <Spin/>
                            : <Form.Item {...tailLayout}>
                                <Button style={{ width: '30%', margin: '0 10%' }}> 发送 Token </Button>
                                <Button type='primary' htmlType='submit' style={{ width: '30%', margin: '0 10%' }}>
                                    <SaveOutlined/> 更新 </Button>
                            </Form.Item>
                        }
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}

export default ResetPWWidget
