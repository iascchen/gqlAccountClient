import React from 'react'
import {useUser} from '../../hook/UserProvider'
import {Col, Row} from 'antd'

const HeaderContainer = () => {
    const { user, accessToken } = useUser()
    return (
        <Row>
            <Col span={20}><h2 style={{ margin: '0 8px' }}> gqlAccount Center </h2></Col>
            <Col span={2}>{accessToken && <span> [ {user && user.mobile} ] </span>}</Col>
            <Col span={2}>{accessToken && <a href={'/logout'}> Logout </a>}</Col>
        </Row>
    )
}

export default HeaderContainer
