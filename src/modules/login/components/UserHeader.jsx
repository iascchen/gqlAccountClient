import React from 'react'
import {Col, Row} from 'antd'

import {useUser} from '../hook/UserProvider'

const UserHeader = () => {
    const { user, accessToken } = useUser()
    return (
        <Row>
            <Col span={12}>{accessToken && <span> [ {user && user.mobile} ] </span>}</Col>
            <Col span={12}>{accessToken && <a href={'/logout'}> 退出 </a>}</Col>
        </Row>
    )
}

export default UserHeader
