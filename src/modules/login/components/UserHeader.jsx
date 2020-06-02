import React, {useEffect, useState} from 'react'
import {Col, Row} from 'antd'

import {useUser} from '../hook/UserProvider'

const UserHeader = () => {
    const { user, accessToken } = useUser()
    const [sName, setName] = useState()

    useEffect(() => {
        if (!user) {
            return
        }

        const _name = (user.profile && user.profile.name) || user.mobile
        setName(_name)
    }, [user])

    return (
        <Row>
            <Col span={12}>{accessToken && <span>[{sName}]</span>}</Col>
            <Col span={12}>{accessToken && <a href={'/logout'}> 退出 </a>}</Col>
        </Row>
    )
}

export default UserHeader
