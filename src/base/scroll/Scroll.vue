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
