import React from 'react'
import {Col, Row} from 'antd'

import reactLogo from '../../react_logo.svg'
import gqlLogo from '../../graphql_logo.svg'

import {useUser} from '../../hook/UserProvider'
import LoginWidget from '../../modules/login/LoginWidget'
import UserInfoWidget from '../account/UserInfoWidget'

const Home = () => {
    const { user, accessToken } = useUser()

    return (
        <Row className='centerContainer' style={{ width: '100%' }}>
            <Col span={16}>
                {accessToken
                    ? <UserInfoWidget user={user}/>
                    : <LoginWidget/>}
            </Col>
            <Col span={16} offset={4}>
                <Row>
                    <Col span={8} offset={4} className='centerContainer' style={{ padding: '0 7%' }}>
                        <img src={gqlLogo} alt='gql' style={{ width: '100%' }}/>
                    </Col>
                    <Col span={8} className='centerContainer'>
                        <img src={reactLogo} alt='logo' style={{ width: '100%' }}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Home
