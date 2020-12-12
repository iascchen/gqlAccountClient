import {message} from 'antd'

export const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

export const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}

export const normalLayout = {
    wrapperCol: { span: 24 }
}

export const formItemLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }
    }
}

export const VISIABLE_STATUS = [{ label: '公开可见', value: 1 }, { label: '私人可见', value: 2 }, { label: '不可见', value: 3 }]

export const loggerError = (err) => {
    console.error(err)
    message.error(err)
}
