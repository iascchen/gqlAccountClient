import Home from './components/common/Home'

import LoginWidget from './modules/login/LoginWidget'
import LogoutWidget from './modules/login/LogoutWidget'
import SignUpWidget from './modules/login/SignUpWidget'
import ResetPWWidget from './modules/login/ResetPWWidget'

const routes = [
    { path: '/', exact: true, component: Home },

    { path: '/login', component: LoginWidget },
    { path: '/logout', component: LogoutWidget },

    { path: '/signup', component: SignUpWidget },
    { path: '/resetpw', component: ResetPWWidget },

    { path: '*', component: Home }
]

export default routes
