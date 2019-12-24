import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import NotFound from '../components/common/notFound'

import TaskList from '../pages/task/list'
import TaskEdit from '../pages/task/edit'
import TaskLog from '../pages/taskLog/list'

import HostList from '../pages/host/list'
import HostEdit from '../pages/host/edit'

import UserList from '../pages/user/list'
import UserEdit from '../pages/user/edit'
import UserLogin from '../pages/user/login'
import UserEditPassword from '../pages/user/editPassword'
import UserEditMyPassword from '../pages/user/editMyPassword'

import NotificationEmail from '../pages/system/notification/email'
import NotificationSlack from '../pages/system/notification/slack'
import NotificationWebhook from '../pages/system/notification/webhook'

import Install from '../pages/install/index'
import LoginLog from '../pages/system/loginLog'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      component: NotFound,
      meta: {
        noLogin: true,
        noNeedAdmin: true
      }
    },
    {
      path: '/',
      redirect: '/task'
    },
    {
      path: '/install',
      name: 'install',
      component: Install,
      meta: {
        noLogin: true,
        noNeedAdmin: true
      }
    },
    {
      path: '/task',
      name: 'task-list',
      component: TaskList,
      meta: {
        noNeedAdmin: true
      }
    },
    {
      path: '/task/create',
      name: 'task-create',
      component: TaskEdit,
      meta: {
        noNeedAdmin: true
      }
    },
    {
      path: '/task/edit/:id',
      name: 'task-edit',
      component: TaskEdit,
      meta: {
        noNeedAdmin: true
      }
    },
    {
      path: '/task/log',
      name: 'task-log',
      component: TaskLog,
      meta: {
        noNeedAdmin: true
      }
    },
    {
      path: '/host',
      name: 'host-list',
      component: HostList,
      meta: {
        noNeedAdmin: true
      }
    },
    {
      path: '/host/create',
      name: 'host-create',
      component: HostEdit,
      meta: {}
    },
    {
      path: '/host/edit/:id',
      name: 'host-edit',
      component: HostEdit,
      meta: {}
    },
    {
      path: '/user',
      name: 'user-list',
      component: UserList,
      meta: {}
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserEdit,
      meta: {}
    },
    {
      path: '/user/edit/:id',
      name: 'user-edit',
      component: UserEdit,
      meta: {}
    },
    {
      path: '/user/login',
      name: 'user-login',
      component: UserLogin,
      meta: {
        noLogin: true
      }
    },
    {
      path: '/user/edit-password/:id',
      name: 'user-edit-password',
      component: UserEditPassword,
      meta: {}
    },
    {
      path: '/user/edit-my-password',
      name: 'user-edit-my-password',
      component: UserEditMyPassword,
      meta: {
        noNeedAdmin: true
      }
    },
    {
      path: '/system',
      redirect: '/system/notification/email',
      meta: {}
    },
    {
      path: '/system/notification/email',
      name: 'system-notification-email',
      component: NotificationEmail,
      meta: {}
    },
    {
      path: '/system/notification/slack',
      name: 'system-notification-slack',
      component: NotificationSlack,
      meta: {}
    },
    {
      path: '/system/notification/webhook',
      name: 'system-notification-webhook',
      component: NotificationWebhook,
      meta: {}
    },
    {
      path: '/system/login-log',
      name: 'login-log',
      component: LoginLog,
      meta: {}
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.noLogin) {
    next()
    return
  }
  if (store.getters.user.token) {
    if (((store.getters.user.isAdmin === '1' || store.getters.user.isAdmin === true) || to.meta.noNeedAdmin)) {
      next()
      return
    }
    if (store.getters.user.isAdmin !== '1' || store.getters.user.isAdmin === false) {
      next(
        {
          path: '/404.html'
        }
      )
      return
    }
  }

  next({
    path: '/user/login',
    query: {redirect: to.fullPath}
  })
})

export default router
