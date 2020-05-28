// console.log(process.env)

export const ENVIRONMENT = process.env.NODE_ENV

export const ACCOUNT_CENTER = process.env.REACT_APP_ACCOUNT_CENTER

if (!ACCOUNT_CENTER) {
    console.error('No Account Center uri. Set REACT_APP_ACCOUNT_CENTER environment variable.')
}
