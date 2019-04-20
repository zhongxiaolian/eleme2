<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menu-wrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" :class="{current: currentIndex === index}" class="menu-item menu-item-hook" @click="scrollTo(index)">
                    <div class="menu-item-wrapper">
                        <span class="icon" v-show="item.type > 0" :class="classList[item.type]"></span>
                        <span class="name">{{item.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foods-wrapper" @scroll="scrollHandler($event)">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
                    <h2 class="title">{{item.name}}</h2>
                    <ul>
                        <li v-for="(food,index) in item.foods" :key="index" class="food-item">
                            <div class="icon">
                                <img :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h3 class="name">{{food.name}}</h3>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="new">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food" :bus="bus"></cartcontrol>
                                </div>           
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart 
            :deliveryPrice="seller.deliveryPrice" 
            :minPrice="seller.minPrice" 
            :selectedFood="selectedFood"
            :bus="bus">
        </shopcart>
    </div>
</template>

<script type='text/ecmascript-6'>
  import shopcart from 'components/shopcart/shopcart.vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  import Vue from 'vue';
  export default {
    props: {
        seller: {
            type: Object
        }
    },
    data () {
      return {
          goods: [],
          listHeight: [],
          currentIndex: 0,
          bus: {}
      }
    },
    computed: {
        selectedFood(){
            console.log(456456)
            let foods = [];
            this.goods.forEach((item)=>{
                item.foods.forEach((food)=>{
                    if(food.count && food.count>0){
                        console.log(123123)
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    components: {
        shopcart,
        cartcontrol
    },
    created(){
        this.classList = ['decrease','discount','guarantee','invoice','special'];
        this.axios.get('/api/goods').then((response)=>{
            console.log(response)
            let data = response.data;
            if(data.errno === 0){
                this.goods = data.data.concat(JSON.parse(JSON.stringify(data.data)));     // 拿到数据后重新渲染dom是一个异步的过程

                this.$nextTick(()=>{        // 所以dom的获取要在dom重新渲染之后 
                    this._calculateHeight();
                })
                
            }
        });

        this.bus = new Vue({});
    },
    methods: {
        _calculateHeight(){
            let foodList = document.querySelectorAll('.food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            foodList.forEach((item)=>{
                height += item.clientHeight;
                this.listHeight.push(height);
            })
        },
        scrollTo(index){
            this.currentIndex = index;                  // 手动设置currentIndex

            let from = this.$refs['foods-wrapper'].scrollTop;
            let to = this.listHeight[index];
            let step = Math.floor((to-from) / 10);      // 动态调整步长，保证每次滑动的时间一样都是!*10毫秒。
            let timer = setTimeout(() => {
                if((step>0 && from+step < to) || (step<0 && from+step>to)){
                    this.$refs['foods-wrapper'].scrollTop = from+step;
                    this.scrollTo(index);
                }else{
                    this.$refs['foods-wrapper'].scrollTop = to;
                    clearTimeout(timer);
                }
            }, 1);
        },
        scrollHandler(e){       // 模拟scroll end事件
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                let arr = this.listHeight;
                for(let i=0;i<arr.length;i++){
                    if(e.target.scrollTop>= arr[i] && e.target.scrollTop < arr[i+1]){
                        this.currentIndex = i;
                        this.currentMenuIntoView();
                    }
                }                
            }, 100);  
        },
        currentMenuIntoView(){
            let menuWrapperHeight = this.$refs['menu-wrapper'].clientHeight;
            let currentMenu = document.querySelectorAll('.menu-item-hook')[this.currentIndex];
            let elOffsetTop = currentMenu.offsetTop;
            let elHeight = currentMenu.clientHeight;
            if(elOffsetTop + elHeight < menuWrapperHeight){
                this.$refs['menu-wrapper'].scrollTop = 0
            }else{
                this.$refs['menu-wrapper'].scrollTop = elOffsetTop + elHeight - menuWrapperHeight;
            }   
        }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';
    .goods
        position absolute
        left 0
        right 0
        top px2rem(348)
        bottom px2rem(92)
        display flex
        .menu-wrapper
            flex 0 0 px2rem(160)
            width px2rem(160)
            background-color #f3f5f7
            overflow-y scroll
            --webkit-overflow-scrolling touch
            .menu-item
                display table
                height px2rem(108)
                width px2rem(112)
                padding 0 px2rem(24)
                color rgb(77,85,93)
                font-size 0
                // border-1px(rgba(7,17,27,0.2))        // overflow: scroll 不显示，hidden显示。
                border-1px-gradient(rgba(7,17,27,0.2))  // 用渐变实现1px边框
                &.current
                    font-size px2rem(48)
                    background #ffffff
                    color #fb7d34
                    font-weight 700
                &:last-child
                    background none 
                .menu-item-wrapper
                    display table-cell          // table-cell可以实现多行文本的垂直居中
                    vertical-align middle       // line-height和vertical-align也可以实现多行文本的垂直居中
                    line-height px2rem(28)
                    .icon
                        display inline-block
                        vertical-align middle
                        margin-right px2rem(4)
                        width px2rem(24)
                        height px2rem(24)
                        &.decrease
                            bg-image('./images/decrease_3')
                        &.discount
                            bg-image('./images/discount_3')
                        &.guarantee
                            bg-image('./images/guarantee_3')
                        &.invoice
                            bg-image('./images/invoice_3')
                        &.special
                            bg-image('./images/special_3')  
                    .name  
                        vertical-align middle
                        font-size px2rem(24)
                    
                   
        .foods-wrapper
            flex 1
            overflow-y scroll
            --webkit-overflow-scrolling touch
            .food-list
                .title
                    line-height px2rem(52)
                    font-size px2rem(24)
                    color rgb(147,153,159)
                    background-color #f3f5f7
                    border-left 2px solid #d9dde1
                    padding-left px2rem(28)
                .food-item
                    margin px2rem(36) px2rem(36) 0
                    padding-bottom px2rem(36)
                    font-size 0
                    display flex
                    // align-items center
                    border-1px-gradient(rgba(7,17,27,0.1))
                    &:last-child
                        border-1px-gradient-none()
                    .icon
                        flex 0 0 px2rem(114)
                        width px2rem(114)
                        margin-right px2rem(10)
                        img 
                            width px2rem(114)
                            height px2rem(114)
                    .content
                        position relative
                        flex 1
                        .name
                            line-height px2rem(28)
                            font-size px2rem(28)
                            margin px2rem(4) 0 px2rem(16)
                            color rgb(7,17,27)
                        .desc
                            margin-bottom px2rem(16)
                            color rgb(147,153,159)
                            line-height px2rem(24)
                            font-size px2rem(20)
                        .extra
                            line-height px2rem(20)
                            font-size px2rem(20)
                            color rgb(147,153,159)
                            margin-bottom px2rem(16)
                            .count 
                                margin-right px2rem(24)
                        .price
                            font-weight 700
                            line-height px2rem(28)
                            .new
                                margin-right px2rem(16)
                                font-size px2rem(28)
                                color rgb(240,20,20)
                            .old
                                text-decoration line-through
                                font-size px2rem(20)
                                color rgb(147,153,159)
                        .cartcontrol-wrapper
                            position absolute
                            right 0
                            bottom px2rem(-8)

</style>