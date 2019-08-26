// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VueLoading, {
  height: 80,
  width: 80
})

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    allRooms: {},
    roomsArr: [],
    infoPage: `Single Room`,
    preImgArr: [],
    config: {
      headers: {
        // Bearer + token
        'Authorization': `Bearer o1UGgT6xKbsPCeVMY8paFJfCpNH3I6V1RyLgDpJvYn9CODijNUADOBXwys`,
        'accept': 'application/json'
      }
    },
    reservation: {
      checkIn: '',
      checkOut: '',
      nightArr: [],
      holiday: 0,
      weekday: 0,
      total: 0
    }
  },
  mutations: {
    putAllRooms (state, payload) {
      state.allRooms = payload
    },
    putRooms (state, payload) {
      state.roomsArr = payload
    },
    enterInfo (state, payload) {
      state.infoPage = payload
    },
    putPreImg (state) {
      for (let i = 0; i < state.roomsArr.length; i++) {
        switch (state.roomsArr[i].room[0].name) {
          case `Single Room`:
            state.preImgArr.push({
              imageUrl: state.roomsArr[i].room[0].imageUrl[2],
              name: state.roomsArr[i].room[0].name
            })
            break
          case `Deluxe Single Room`:
            state.preImgArr.push({
              imageUrl: state.roomsArr[i].room[0].imageUrl[2],
              name: state.roomsArr[i].room[0].name
            })
            break
          case `Double Room`:
            state.preImgArr.push({
              imageUrl: state.roomsArr[i].room[0].imageUrl[1],
              name: state.roomsArr[i].room[0].name
            })
            break
          case `Deluxe Double Room`:
            state.preImgArr.push({
              imageUrl: state.roomsArr[i].room[0].imageUrl[1],
              name: state.roomsArr[i].room[0].name
            })
            break
          case `Twin Room`:
            state.preImgArr.push({
              imageUrl: state.roomsArr[i].room[0].imageUrl[0],
              name: state.roomsArr[i].room[0].name
            })
            break
          case `Deluxe Twin Room`:
            state.preImgArr.push({
              imageUrl: state.roomsArr[i].room[0].imageUrl[0],
              name: state.roomsArr[i].room[0].name
            })
            break
        }
      }
    },
    putCheckDate (state, payload) {
      state.reservation.checkIn = payload.checkIn
      state.reservation.checkOut = payload.checkOut
      state.reservation.nightArr = payload.nightArr
      state.reservation.holiday = payload.holiday
      state.reservation.weekday = payload.weekday
      state.reservation.total = payload.total
    }
  },
  getters: {
    infoOb (state) {
      if (state.roomsArr.length === 0) { return }
      const ob = state.roomsArr.filter((item) => {
        return state.infoPage === item.room[0].name
      })
      return ob[0]
    }
  },
  actions: {
    getAPI ({commit, state}) {
      new Promise((resolve) => {
        axios.get('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', state.config)
          .then((response) => {
            // console.log(response.data)
            commit('putAllRooms', response.data)
            resolve()
          })
      }).then(() => {
        // 取得詳細房型
        const newArr = []
        for (let i = 0; i < state.allRooms.items.length; i++) {
          axios.get(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${state.allRooms.items[i].id}`, state.config)
            .then((responses) => {
              // console.log(responses.data)
              newArr.push(responses.data)
              // 當陣列數達到目標後
              if (newArr.length === state.allRooms.items.length) {
                newArr.sort((a, b) => {
                  return a.room[0].holidayPrice - b.room[0].holidayPrice
                })
                commit('putRooms', newArr)
                commit('putPreImg')
              }
            })
        }
      })
    }
  }
})

router.beforeEach(function (to, from, next) {
  if ((to.name === 'success' || to.name === 'error') && from.name !== 'validate') {
    router.push('preview')
  }
  next()
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    this.$store.dispatch('getAPI')
  }
})
