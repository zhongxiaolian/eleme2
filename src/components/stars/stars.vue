<template>
    <div class="stars" :class="classType">
        <span class="star-item" v-for="(classItem,index) in classList" :key="index" :class="classItem">
        </span>
    </div>
</template>

<script type='text/ecmascript-6'>
    const LENGTH = 5;
    const ON = 'on';
    const OFF = 'off';
    const HALF = 'half';
    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        data () {
            return {
            }
        },
        computed: {
            classType(){
                return 'size-' + this.size;
            },
            classList(){
                let result = [];
                let realScore = Math.floor(this.score * 2) / 2;
                let hasDecimal = realScore % 1 !== 0;
                let num = parseInt(realScore);
                for(let i=0;i<num;i++){
                    result.push(ON);
                }
                if(hasDecimal){
                    result.push(HALF);
                }
                while(result.length < LENGTH){
                    result.push(OFF);
                }
                return result;
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';
    .stars
        text-align center
        .star-item
            display inline-block
        &.size-48
            .star-item
                width px2rem(40)
                height px2rem(40)
                margin-right px2rem(44)
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/star48_on')
                &.off
                    bg-image('./images/star48_off');
                &.half
                    bg-image('./images/star48_half');
        &.size-36
            .star-item
                width px2rem(30)
                height px2rem(30)
                margin-right px2rem(12)
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/star36_on')
                &.off
                    bg-image('./images/star36_off');
                &.half
                    bg-image('./images/star36_half');
        &.size-24
            .star-item
                width px2rem(20)
                height px2rem(20)
                margin-right px2rem(6)
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/star24_on')
                &.off
                    bg-image('./images/star24_off');
                &.half
                    bg-image('./images/star24_half');
</style>