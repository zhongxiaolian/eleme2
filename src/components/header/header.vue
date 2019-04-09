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
            <div class="support-count" v-if="seller.supports && seller.supports.length > 0">
                <span class="count">{{seller.supports.length}}个</span><span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-icon"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>    
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                
            }
        },
        created(){
            // 静态值没必要放到data里面。
            this.classList = ['decrease','discount','guarantee','invoice','special']
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import "~common/stylus/mixin.styl";
    .header
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
</style>