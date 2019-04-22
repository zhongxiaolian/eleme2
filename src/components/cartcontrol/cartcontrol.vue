<template>
    <div class="cartcontrol">
        <transition name="animation">
            <div class="outer" v-show="foodCount > 0">
                <span class="decrease icon-remove_circle_outline"  @click.stop.prevent="decrease"></span>
            </div>
        </transition>
        <transition name="opacity">         <!--给它加上过度，让它消失的慢点，否则影响decrease的动画效果，之前的就不会有这种问题，可能跟采用flex有关吧-->
            <span class="count" v-show="foodCount > 0">{{foodCount}}</span>
        </transition>
        
        <span class="increase icon-add_circle" @click.stop.prevent="increase($event)"></span>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
        id: {
            type: Number
        },
        count: {
            type: Number,
            default: 0
        }
    },
    data () {
      return {
          foodCount: this.count
      }
    },
    watch: {
        count(newVal,oldVal){
            this.foodCount = newVal;
        }
    },
    methods: {
        increase($event){
            // if(!this.myFood.count){
            //     this.$set(this.myFood,'count',1)
            // }else{
                
            //     this.myFood.count++
            // }
            this.foodCount ++;
            this.$root.$emit('increase',this.id);
            this.$root.$emit('drop',$event.target);
        },
        decrease(){
            this.foodCount --;
            this.$root.$emit('decrease',this.id);
        }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl'
    .cartcontrol
        display flex
        align-items center
        .decrease,.increase
            display inline-block    // 行内元素不可以使用css3 rotate动画
            font-size px2rem(48)
            color rgb(0,160,220)
            padding px2rem(8)
        .count
            flex 0 0 px2rem(40)
            width px2rem(40)
            font-size px2rem(20)
            color #000
            text-align center
    
    .animation-enter-active, .animation-leave-active
        transition transform .3s linear,opacity .3s linear
        .decrease
            transition transform .3s linear, opacity .3s linear
    .animation-enter, .animation-leave-to
        transform translate3d(px2rem(90),0,0)
        opacity 0
        .decrease
            transform rotate(360deg) 
    
    .opacity-enter-active, .opacity-leave-active
        transition opacity .4s
    .opacity-enter, .opacity-leave-to
        opacity 0
</style>