import { createRouter, createWebHashHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'

import {projectAuth} from '../firebase/config';
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(!user){
    /* eğer kullanıcı yok ise welcoma nextleyecek  */
    next({name: 'welcome'});
  }else{
    /* varsa devam edicek */
    next();
  }
};

/* final router guard */
/* eğer kullanıcı giriş yapmışsa ve welcome gitmeye çalışırsa gidemicek çıkış yapması gerekli */
const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if(user){
    /* eğer kullanıcı yok ise welcoma nextleyecek  */
    next({name: 'gamearea'});
  }else{
    /* varsa devam edicek */
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    beforeEnter: requireNoAuth,
  },
  /* router guard koyduk önemlii!!!! */
  {
    path: '/gamearea',
    name: 'gamearea',
    component: () => import('../views/GameArea.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import('../views/NotFound.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
