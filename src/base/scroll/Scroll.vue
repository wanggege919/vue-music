<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {//数据项，可以用来外部组件数据的变化，组件做出相应的refresh
            type: Array,
            default: null
        },
        listenScroll: {//要不要去监听滚动事件
            type: Boolean,
            default: false
        }
    },
    mounted() {
        setTimeout(()=>{
            this._initScroll()
        },20)  
    },
    methods: {
        _initScroll () {
            if(!this.$refs.wrapper){ //判断一下wrapper这个dom还没有渲染出来
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
            if(this.listenScroll) {
                let me = this
                this.scroll.on('scroll',(pos) => {
                    me.$emit('scroll', pos)//这里的this指的是this.scroll,其实就是better-scroll事件
                        //外层是 better-scroll 事件，内层是在当前 Vue 实例上派发一个 scroll 事件。
                })
            }
        },
        enable () {
            this.scroll && this.scroll.enable()//逻辑运算符
        },
        disable () {
            this.scroll && this.scroll.disable()
        },
        refresh () {//刷新scroll，重新计算高度
            this.scroll && this.scroll.refresh()
        },
        scrollToElement () {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },

    },
    
    watch: {
        data () {
            setTimeout(()=>{
                this.refresh()
            },20)   
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
