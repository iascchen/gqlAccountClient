import Home from './components/common/Home'

import LoginWidget from './modules/login/LoginWidget'
import LogoutWidget from './modules/login/LogoutWidget'
import SignUpWidget from './modules/login/SignUpWidget'
import ResetPWWidget from './modules/login/ResetPWWidget'

const routes = [
    { path: '/', exact: true, component: Home },

    { path: '/login', exact: true, component: LoginWidget },
    { path: '/logout', exact: true, component: LogoutWidget },

    { path: '/signup', exact: true, component: SignUpWidget },
    { path: '/resetpw', exact: true, component: ResetPWWidget },

    { path: '*', component: Home }
]

export default routes
