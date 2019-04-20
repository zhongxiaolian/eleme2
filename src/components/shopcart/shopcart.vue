<template>
    <div class="shopcart">
        <div class="content" @click="toggleFold">
            <div class="content-left">
                <div class="logo" :class="{highlight: totalCount > 0}">
                    <span class="icon-shopping_cart"></span>
                    <span class="num" v-show="totalCount > 0">{{totalCount}}</span>
                    
                    <transition name="drop" 
                        v-for="(ball,index) in balls" 
                        :key="index" 
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @after-enter="afterEnter">
                            <div class="ball-container" v-show="ball.show">
                                <div class="ball"></div>
                            </div>
                    </transition>
                    
                </div>
                <div class="price" :class="{highlight: totalPrice > 0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay" :class="{highlight: totalPrice > minPrice}" @click.stop.prevent="pay">{{deliveryDesc}}</div>
            </div>
        </div>
        <transition name="hide">
            <div class="shopcart-list" v-show="listShow">
                <div class="list-header">
                    <h2 class="title">购物车</h2>
                    <span class="empty" @click="empty">清空</span>
                </div>
                <div class="list-content">
                    <ul>
                        <li v-for="(food,index) in selectedFood" :key="index" class="list-item">
                            <span class="name">{{food.name}}</span>
                            <div class="list-item-right">
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food" :bus="bus"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>  
            </div>
        </transition>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="toggleFold"></div>
        </transition>  
    </div>
</template>

<script type='text/ecmascript-6'>
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  export default {
    props: {
        minPrice: {
            type: Number
        },
        deliveryPrice: {
            type: Number
        },
        selectedFood: {
            type: Array
        },
        bus: {
            type: Object
        }
    },
    data () {
      return {
          balls: [
              {
                  show: false
              },
              {
                  show: false
              },
              {
                  show: false
              },
              {
                  show: false
              },
              {
                  show: false
              }
          ],
          droppingBalls: [

          ],
          fold: true
      }
    },
    computed: {
        totalCount(){
            let count = 0;
            this.selectedFood.forEach(function(food){
                count += food.count;
            });
            return count
        },
        totalPrice(){
            let price = 0;
            this.selectedFood.forEach(function(food){
                price += food.count * food.price
            })
            return price
        },
        deliveryDesc(){
            let desc = "";
            if(this.totalPrice == 0){
                desc = `￥${this.minPrice}元起送`
            }else if(this.totalPrice < this.minPrice){
                desc = `还差${this.minPrice - this.totalPrice}元起送`
            }else{
                desc = '去支付'
            }
            return desc
        },
        listShow(){
            if(this.totalCount === 0){
                this.fold = true;
                return false
            }
            return !this.fold
        }
    },
    components: {
        cartcontrol
    },
    created(){
        this.bus.$on('drop',this.drop)
    },
    methods: {
        toggleFold(){
            if(this.totalCount === 0){
                return 
            }
            this.fold = !this.fold;
        },
        empty(){
            this.selectedFood.forEach(function(food){
                food.count = 0
            });
        },
        pay(){
            if(this.totalPrice < this.minPrice){
                return
            }
            alert("支付成功")
        },
        drop(el){
        },
        beforeEnter(){

        },
        enter(){

        },
        afterEnter(){

        }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';
    .shopcart
        position fixed
        left 0
        bottom 0
        height px2rem(92)
        width 100%
        z-index 100
        // background #141d27   背景色给在根元素上有问题，shopcart-list的层级再低也不会低于父元素，所以shopcart-list的颜色会覆盖父元素的背景色
        .content
            height px2rem(92)
            display flex
            background #141d27
            .content-left
                position relative
                flex 1
                font-size 0
                display flex
                align-items center
                .logo
                    display inline-block
                    position relative
                    top px2rem(-10)
                    margin 0 px2rem(24) 
                    width px2rem(88)
                    height px2rem(88)
                    border px2rem(12) solid #141d27
                    text-align center
                    border-radius 50%
                    background #2b343c
                    color rgba(255,255,255,0.4)
                    &.highlight
                        background rgb(0,160,220)
                        .icon-shopping_cart
                            color #ffffff
                    .icon-shopping_cart
                        font-size px2rem(48)
                        line-height px2rem(88)
                    .num
                        position absolute
                        top 0
                        right 0
                        display inline-block
                        width px2rem(48)
                        line-height px2rem(32)
                        font-weight 700
                        font-size px2rem(18)
                        text-align center
                        border-radius px2rem(16)
                        color rgb(255,255,255)
                        background-color rgb(240,20,20)
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                    .ball-container
                        transition all .3s
                        .ball
                            position absolute
                            top 50%
                            left 50%
                            transform translate3d(-50%,-50%,0)
                            display inline-block
                            width px2rem(32)
                            height px2rem(32)
                            background rgb(0,160,220)
                            border-radius 50%
                .price
                    display inline-block
                    font-size px2rem(32)
                    font-weight 700
                    line-height px2rem(48)
                    padding-right px2rem(22)
                    border-right 1px solid rgba(255,255,255,0.1)
                    color rgba(255,255,255,0.4)
                    &.highlight
                        color #ffffff
                .desc
                    display inline-block
                    font-size px2rem(20)
                    line-height px2rem(48)
                    color rgba(255,255,255,0.4)
                    padding-left px2rem(24)
            .content-right
                flex 0 0 px2rem(210)
                width px2rem(210)
                .pay
                    font-size px2rem(24)
                    font-weight 700
                    line-height px2rem(92)
                    color rgba(255,255,255,0.4)
                    text-align center
                    background #2b343c
                    &.highlight
                        color #ffffff
                        background-color #00b43c


        .shopcart-list
            position absolute
            top 0
            left 0
            right 0
            border-bottom 1px solid rgba(7,17,27,0.1)
            transform translate3d(0,-100%,0)
            z-index -10
            &.hide-enter-active, &.hide-leave-active   
                transition all .3s
            &.hide-enter, &.hide-leave-to
                transform translate3d(0,0,0)    // 设置在其他地方优先级低，可能不会生效。因为在没有设置动画之前，列表已经设置了transfrom变换。
            .list-header
                padding 0 px2rem(36)
                height px2rem(80)
                line-height px2rem(80)
                background #f3f5f7
                display flex
                justify-content space-between
                .title
                    font-size px2rem(28)
                    color rgb(7,17,27)
                .empty
                    font-size px2rem(24)
                    color rgb(0,160,220)
            .list-content
                background #fff
                max-height px2rem(434)
                padding 0 px2rem(36)
                overflow-y scroll
                --webkit-overflow-scrolling touch
                .list-item
                    display flex
                    justify-content space-between
                    height px2rem(96)
                    border-1px-gradient(rgba(7,17,27,0.1))
                    .name
                        line-height px2rem(96)
                        font-size px2rem(28)
                        color rgb(7,17,27)
                    .list-item-right 
                        display flex
                        align-items center
                        .price
                            // float right 
                            font-size px2rem(28)
                            color rgb(240,20,20)
                            font-weight 700
                            margin-right px2rem(24)
                        .cartcontrol-wrapper
                            // float right 
        .list-mask
            position fixed
            top 0
            left 0
            width 100%
            height 100%
            z-index -20  // 层级要低于shopcart-list
            background rgba(7,17,27,0.6)
            backdrop-filter blur(10px)
            &.fade-enter-active, &.fade-leave-active
                transition all .5s
            &.fade-enter, &.fade-leave-to
                opacity 0

</style>