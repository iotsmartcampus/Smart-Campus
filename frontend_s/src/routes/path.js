import store from '../data/index'
import LoginPage from '../screens/Login'
import Dashboard from '../screens/Dashboard.vue'
import Singup from '../screens/Singup.vue'
export default [


    /* Geral */
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter (to, from, next) {
            if(!store.getters["auth/isAuthenticated"]){
                next("login")
            }else{
                next()
            }
        }
    },

    {
        path: '/login',
        meta: { 
            public: true,
        },
        props: true,
        name: 'login',
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            // ...
            if(store.getters['auth/token']){
                return next('/');
            }
            next();
        }
    },{
        path:'/singup',
        meta: {
            public: true,
        },
        name:"Singup",
        component:Singup,
        beforeEnter: (to, from, next) => {
            if(store.getters['auth/token']){
                return next('/');
            }
            next();

        }
    },

    {
        path: '/logout',
        
        name: 'Logout',
        beforeEnter (to, from, next) {
            store.dispatch('auth/logout', true)
            next('Login')
        },
        
    },

];