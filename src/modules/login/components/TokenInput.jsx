import React from 'react'
import {Button, Input} from 'antd'

const { Group } = Input

const TokenInput = ({ onSend, onChange }) => {
    const handleSend = () => {
        onSend && onSend()
    }

    return (<Group compact><Input onChange={onChange} style={{ width: '70%' }}/>
        <Button style={{ width: '30%' }} onClick={handleSend}> 发送 </Button>
    </Group>)
}

export default TokenInput
