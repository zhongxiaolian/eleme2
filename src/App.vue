<template>
    <div id="myapp">
        <v-header></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <!-- 实际开发索引可能是遍历后台数据的索引，而不是这里的死值。 -->
                <a :class="{'active': current === 1}" @click="toRouter({path:'/goods'},1)">商品</a>
            </div>
            <div class="tab-item">
                <a :class="{'active': current === 2}" @click="toRouter({path:'/ratings'},2)">评价</a>
            </div>
            <div class="tab-item">
                <a :class="{'active': current === 3}" @click="toRouter({path:'/seller'},3)">商家</a>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type='text/ecmascript-6'>
    import header from 'components/header/header.vue';
    export default {
        data () {
            return {
                current: 1
            }
        },
        methods: {
            toRouter(pathObj,current){
                this.$router.push(pathObj);
                this.current = current;
            }
        },
        components: {
            'v-header': header
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
            border-1px(rgba(7,17,27,0.1))
            .tab-item
                flex 1
                & > a
                    display block
                    font-size px2rem(14)
                    color rgb(77,85,93)
                    &.active
                        color rgb(240,30,30)

</style>