export const ENVIRONMENT = process.env.NODE_ENV

export const ACCOUNT_CENTER = process.env.REACT_APP_ACCOUNT_CENTER
export const HEADER_FOR_AUTH = process.env.REACT_APP_HEADER_FOR_AUTH || 'token'
export const PASSWORD_RESET_TOKEN_LEN = process.env.REACT_APP_PASSWORD_RESET_TOKEN_LEN || 6
export const INVITE_TOKEN_TTL = process.env.REACT_APP_INVITE_TOKEN_TTL || 60

if (!ACCOUNT_CENTER) {
    console.error('No Account Center uri. Set REACT_APP_ACCOUNT_CENTER environment variable.')
}

export const LDAP_AUTH = process.env.REACT_APP_LDAP_AUTH || 'off'   // off | only | both
export const LDAP_USER_RDN = process.env.REACT_APP_LDAP_USER_RDN || 'uid' // uid | username
