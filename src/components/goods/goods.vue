<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="menu-item">
                    <div class="menu-item-wrapper">
                        <span class="icon" v-show="item.type > 0" :class="classList[item.type]"></span>
                        <span class="name">{{item.name}}</span>
                    </div>

                </li>
            </ul>
        </div>
        <div class="foods-wrapper"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
          goods: {}
      }
    },
    created(){
        this.classList = ['decrease','discount','guarantee','invoice','special'];
        this.axios.get('/api/goods').then((response)=>{
            console.log(response)
            let data = response.data;
            if(data.errno === 0){
                this.goods = data.data;
            }
        });
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
                margin 0 auto 
                height px2rem(108)
                width px2rem(112)
                color rgb(77,85,93)
                font-size 0
                // border-1px(rgba(7,17,27,0.2))        // overflow: scroll 不显示，hidden显示。
                border-1px-gradient(rgba(7,17,27,0.2))  // 用渐变实现1px边框
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
</style>