import Home from './components/common/Home'

import Login from './modules/login/Login'
import Logout from './modules/login/Logout'
import SignUpPW from './modules/login/SignUpPW'
import ResetPW from './modules/login/ResetPW'

const routes = [
    { path: '/', exact: true, component: Home },

    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/signup', component: SignUpPW },
    { path: '/resetpw', component: ResetPW },

    { path: '*', component: Home }
]

export default routes
