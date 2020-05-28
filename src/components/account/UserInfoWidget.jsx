import React from 'react'

const UserInfoWidget = ({ user }) => {
    return (
        <>
            {user && <ul>
                <li>Mobile {user.mobile}</li>
                <li>Email {user.email}</li>
                <li>Status {user.status}</li>
            </ul>}
        </>
    )
}

export default UserInfoWidget
