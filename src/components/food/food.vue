<template>
    <div class="food">
        <div class="header-img">
            <img :src="food.image" alt="">
            <div class="back" @click="back">
                <i class="icon-arrow_lift"></i>
            </div>    
        </div>
        <div class="content">
            <h2 class="title">{{food.name}}</h2>
            <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="new">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
                <cartcontrol v-bind="food" :count="currentFoodCount"></cartcontrol>
            </div>
            <div class="buy" v-show="!currentFoodCount" @click="firstAdd">
                加入购物车
            </div>
        </div>
    </div>  
</template>

<script type='text/ecmascript-6'>
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  export default {
    props: {
        currentFoodCount: {
            type: Number
        }
    },
    data () {
      return {
          foodId: 0,
          food: {}
      }
    },
    components: {
        cartcontrol
    },
    created(){
        console.log(this.currentFoodCount)
        // console.log(this.$route)
        this.foodId = parseInt(this.$route.params.id);
        this.axios.get('/api/goods').then((response)=>{
            if(response.data.errno === 0){
                let data = response.data.data
                for(let i=0;i<data.length;i++){
                    for(let j=0;j<data[i].foods.length;j++){
                        if(data[i].foods[j].id === this.foodId){
                            this.food = data[i].foods[j]
                            break
                        }
                    }
                }
            }
        })
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        firstAdd(){
            this.$root.$emit('increase',this.id);
        }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';
    .food
        position fixed
        left 0
        top 0
        bottom px2rem(92)
        width 100%
        background #ffffff 
        overflow-y scroll
        -webkit-overflow-scrolling touch
        &.food-scale-enter-active, &.food-scale-leave-active
            transition all .5s
        &.food-scale-enter, &.food-scale-leave-to
            opacity 0
            transform-origin left center
            transform scale(0)
        .header-img
            position relative
            height 0
            width 100%
            padding-top 100%
            img 
                position absolute
                top 0
                left 0
                height 100%
                width 100%
            .back
                position absolute
                top px2rem(10)
                left 0
                .icon-arrow_lift
                    display inline-block
                    padding px2rem(10)
                    font-size px2rem(40)
                    color rgb(240,20,20)
        .content
            position relative
            padding px2rem(36)
            .title
                line-height px2rem(28)
                font-size px2rem(28)
                margin-bottom px2rem(8)
                font-weight 700
                color rgb(7,17,27)
            .detail
                margin-bottom px2rem(18)
                line-height px2rem(20)
                font-size 0
                .sell-count, .rating
                    font-size px2rem(20)
                    color rgb(147,153,159)
                .sell-count
                    margin-right px2rem(24)
            .price
                font-weight 700
                line-height px2rem(28)
                font-size 0
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
                right px2rem(24)
                bottom px2rem(24)
                z-index 10
            .buy
                position absolute
                right px2rem(18)
                bottom px2rem(30)
                z-index 20
                line-height px2rem(48)
                height px2rem(48)
                padding 0 px2rem(24)
                font-size px2rem(20)
                border-radius px2rem(12)
                color #ffffff
                background rgb(0,160,220)
</style>