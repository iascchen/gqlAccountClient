import React from 'react'
import {renderRoutes} from 'react-router-config'
import {Alert} from 'antd'

import routes from '../../routers'

const { ErrorBoundary } = Alert

const BodyContainer = () => {
    return (
        <div style={{ padding: 24, background: '#d8d8d8', minHeight: '80vh' }}>
            <ErrorBoundary>
                {renderRoutes(routes)}
            </ErrorBoundary>
        </div>
    )
}

export default BodyContainer
