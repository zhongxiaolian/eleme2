<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
                <div class="supports" v-if="seller.supports">
                    <span class="icon" :class="classList[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports && seller.supports.length > 0" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span><span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-icon"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>    
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%" alt="">
        </div>
        <transition name="fade">
            <div class="detail" v-if="detailShow">
                <div class="detail-wrapper">
                    <div class="detail-main">    
                        <h1 class="name">{{seller.name}}</h1>     
                        <div class="stars-wrapper">
                            <stars :size="48" :score="seller.score"></stars>
                        </div>  
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports" v-if="seller.supports && seller.supports.length > 0">
                            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                                <span class="icon" :class="classList[item.type]"></span>
                                <span class="text">{{item.description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <p class="bulletin-info">{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}</p>
                    </div>
                </div>
                <div class="detail-close" >
                    <span class="icon-close" @click="hideDetail"></span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type='text/ecmascript-6'>
    import stars from 'components/stars/stars.vue';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                detailShow: false
            }
        },
        created(){
            // 静态值没必要放到data里面。
            this.classList = ['decrease','discount','guarantee','invoice','special']
        },
        methods: {
            showDetail(){
                this.detailShow = true;
            },
            hideDetail(){
                this.detailShow = false;
            }
        },
        components: {
            stars
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import "~common/stylus/mixin.styl";
    .header
        position relative
        color #ffffff
        .content-wrapper
            position relative
            padding px2rem(48) px2rem(24) px2rem(36) px2rem(48)
            display flex
            background-color rgba(7,17,27,0.5)
            font-size 0
            .avatar
                margin-right px2rem(32)
                img 
                    width px2rem(128)
                    height px2rem(128)
                    border-radius px2rem(4)
            .content
                font-size px2rem(28)
                .title
                    display flex
                    align-items center
                    margin-bottom px2rem(16)
                    .brand
                        width px2rem(60)
                        height px2rem(36)
                        margin-right px2rem(12)
                        bg-image('./images/brand')
                        
                    .name
                        font-weight 700
                        font-size px2rem(32)
                .description
                    line-height px2rem(24)
                    font-size px2rem(24)
                    margin-bottom px2rem(20)
                .supports
                    margin-bottom px2rem(4)
                    display flex
                    align-items center
                    font-size 0
                    .icon
                        margin-right px2rem(8)
                        width px2rem(24)
                        height px2rem(24)
                        &.decrease
                            bg-image('./images/decrease_1')
                        &.discount
                            bg-image('./images/discount_1')
                        &.guarantee
                            bg-image('./images/guarantee_1')
                        &.invoice
                            bg-image('./images/invoice_1')
                        &.special
                            bg-image('./images/special_1')
                    .text
                        font-size px2rem(20)

            .support-count
                position absolute
                right px2rem(25)
                bottom px2rem(30)
                padding px2rem(14) px2rem(16)
                font-size px2rem(20)
                background-color rgba(0,0,0,0.2)
                border-radius px2rem(30)
                .count
                    margin-right px2rem(4)
        .bulletin-wrapper
            display flex
            align-items center
            height px2rem(56)
            padding 0 px2rem(24) 0 px2rem(24)
            font-size px2rem(20)
            background-color rgba(7,17,27,0.2)

            .bulletin-icon
                // flex布局的子元素定宽必须要这样设置，第二个0表示空间不足时不被压缩，默认是1。
                flex 0 0 px2rem(44)  
                width px2rem(44)
                height px2rem(24)
                margin-right px2rem(8)
                bg-image('./images/bulletin')
            .bulletin-text
                flex 1;
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
                margin-right px2rem(8)
        .background
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            z-index -1             // 让它处在header的下面 
            img 
                filter blur(10px)  // 给图像设置成高斯模糊效果

        .detail
            position fixed
            left 0
            top 0
            height 100%
            width 100%
            z-index 200   // 购物车的z-inde设置的100，detail的层级要高于购物车。
            background rgba(7,17,27,0.8)
            overflow-y scroll
            --webkit-overflow-scrolling touch
            backdrop-filter blur(10px)      // IOS才支持，蒙层下面的背景模糊
            &.fade-enter-active, &.fade-leave-active    // 避免把其他的样式覆盖
                transition all .5s
            &.fade-enter, &.fade-leave-to
                opacity 0
                transform translate3d(100%,0,0)
            .detail-wrapper
                min-height 100%
                padding-bottom px2rem(192)
                box-sizing border-box
                overflow hidden             // 触发BFC防止detail-mian的margin-top把它也给拉下去
                .detail-main
                    margin px2rem(128) px2rem(72) 0
                    .name
                        line-height px2rem(32)
                        font-size px2rem(32)
                        text-align center
                        font-weight 700
                    .stars-wrapper
                        margin-top px2rem(32)
                        margin-bottom px2rem(56)
                    .title
                        display flex
                        align-items center
                        margin-bottom px2rem(48)
                        .line
                            flex 1
                            border-bottom 1px solid rgba(255,255,255,0.2)
                        .text
                            line-height px2rem(28)
                            font-size px2rem(28)
                            font-weight 700
                            padding 0 px2rem(24)
                    .supports
                        margin 0 px2rem(24) px2rem(56)
                        .support-item
                            display flex
                            align-items center
                            margin-bottom px2rem(24)
                            &:last-child
                                margin-bottom 0
                            .icon
                                margin-right px2rem(12)
                                width px2rem(32)
                                height px2rem(32)
                                &.decrease
                                    bg-image('./images/decrease_2')
                                &.discount
                                    bg-image('./images/discount_2')
                                &.guarantee
                                    bg-image('./images/guarantee_2')
                                &.invoice
                                    bg-image('./images/invoice_2')
                                &.special
                                    bg-image('./images/special_2')
                            .text
                                font-size px2rem(24)
                    .bulletin-info
                        margin 0 px2rem(24)
                        font-size px2rem(24)
                        line-height px2rem(40)
            .detail-close
                // display inline-block   // inline-block的margin负值无效，inline元素的margin值无效
                margin-top px2rem(-128)
                text-align center
                font-size px2rem(64)
                color rgba(255,255,255,0.5)



</style>