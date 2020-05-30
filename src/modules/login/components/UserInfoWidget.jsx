import React from 'react'
import {Card} from 'antd'

const UserInfoWidget = ({ user }) => {
    return (
        <Card title={'用户信息'}>
            {user && <ul>
                <li>Mobile {user.mobile}</li>
                <li>Email {user.email}</li>
                <li>Status {user.status}</li>
            </ul>}
        </Card>
    )
}

export default UserInfoWidget
