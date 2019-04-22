import Vue from 'vue'
import Router from 'vue-router'
import goods from 'components/goods/goods.vue'
import seller from 'components/seller/seller.vue'
import ratings from 'components/ratings/ratings.vue'
import food from 'components/food/food.vue';
Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods,
      children: [
          {
              path: 'detail/:id',
              component: food
          }
      ]
    },{
        path: '/seller',
        name: 'seller',
        component: seller       
    },{
        path: '/ratings',
        name: 'ratings',
        component: ratings
    }
  ]
})
