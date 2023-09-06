import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {
  users
} from '@/services'

Vue.use(VueRouter)

const routes = [{
    path: '/oglasi',
    name: 'home',
    component: HomeView,
  }, {
    path: '/oglasi/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue')
  }, {
    path: '/upload',
    name: 'upload',
    meta: {
      needsUser: true
    },
    component: () => import('../views/UploadView.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    meta: {
      needsUser: true
    },
    component: () => import('../views/EditView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      needsUser: false
    },
    component: () => import('../views/LoginView.vue')
  }, {
    path: '/messages',
    name: 'messages',
    meta: {
      needsUser: true
    },
    component: () => import('../views/MessagesView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/* Provjera prije nego što se ide na slijedeću stranicu */
router.beforeEach(async (to, from, next) => {
  const needsUser = to.meta.needsUser || false; /* Boolean koji nam govori kao treba korisnik za stranicu na koju pokušavamo ići */
  const user = users.getUser();
  console.log("from: ", from.name, "-> to: ", to.name, "needsUser: ", needsUser, "currentUser: ", !!user);

  if (!!!to.name) {
    console.log("prvi if")
    /* Ako korisnik ide na stranicu koja ne postoji, šaljemo ga na home */
    next("/oglasi")
    return
  }

  /* If ako nema korisnika */
  if (!user && needsUser) {
    /* Ako ide na stranicu za koju je potreban korisnik, šaljemo ga na login stranicu */
    next("/login")
    return
  }

  /* If ako ima korisnika */
  if (user) {
    if (to.path == "/login" || from.path == "/login") {
      /* Ako ide na stranicu za koju ne treba korisnik ili je prijašnja stranica login šaljemo ga na home*/
      next("/oglasi")
      return
    }
    if (needsUser) {
      await users.getAuth() /* Prije nego što ode na stranicu za koju treba korisnik provjerimo ako je istekao ili ne valja token */
    }
  }

  /* U slučaju da se ne ispune svi ifovi */
  next();
  return
})

export default router