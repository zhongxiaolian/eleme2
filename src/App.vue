<template>
    <div id="myapp">
        <v-header :seller="seller"></v-header>
        <div class="tab">
            <div class="tab-item">
                <!-- 实际开发索引可能是遍历后台数据的索引，而不是这里的死值。 -->
                <a :class="{'active': '/goods' === this.$route.path}" @click="toRouter({path:'/goods'})">商品</a>
            </div>
            <div class="tab-item">
                <a :class="{'active': '/ratings' === this.$route.path}" @click="toRouter({path:'/ratings'})">评价</a>
            </div>
            <div class="tab-item">
                <a :class="{'active': '/seller' === this.$route.path}" @click="toRouter({path:'/seller'})">商家</a>
            </div>
        </div>
        <transition :name="slideDirection">
            <keep-alive>
                <router-view :seller="seller"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script type='text/ecmascript-6'>
    import header from 'components/header/header.vue';
    export default {
        data () {
            return {
                seller: {},
                slideDirection: ''
            }
        },
        methods: {
            toRouter(pathObj){
                this.$router.push(pathObj);
            }
        },
        created(){
            // 回调函数用箭头函数的形式可以避免在外面定义临时变量this
            this.axios.get('/api/seller').then((response) => {
                let data = response.data;
                if(data.errno === 0){
                    this.seller = data.data;
                }
            })
            this.routeIndex = {
                '/goods': 1,
                '/ratings': 2,
                '/seller': 3
            }
        },
        components: {
            'v-header': header
        },
        watch: {
            $route(to,from){
                this.slideDirection = this.routeIndex[to.path] > this.routeIndex[from.path] ? 'slide-left' :'slide-right';
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import "common/stylus/mixin.styl";
    #myapp
        .tab
            display flex
            line-height px2rem(80)
            text-align center
            border-1px(rgba(7,17,27,0.2))
            .tab-item
                flex 1
                & > a
                    display block
                    font-size px2rem(28)
                    color rgb(77,85,93)
                    &.active
                        color rgb(240,30,30)
        .slide-left-enter-active, .slide-left-leave-active
            transition all .5s
        .slide-left-enter
            transform translate3d(100%,0,0)
        .slide-left-leave-to
            transform translate3d(-100%,0,0)

        .slide-right-enter-active, .slide-right-leave-active
            transition all .5s
        .slide-right-enter
            transform translate3d(-100%,0,0)
        .slide-right-leave-to
            transform translate3d(100%,0,0)     

</style>