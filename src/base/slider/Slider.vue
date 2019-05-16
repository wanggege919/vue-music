<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item,index) of dots"
        :key="index"
        :class="{active: index === currentIndex}"
      ></span>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { addClass } from "common/js/dom.js";
export default {
  name: "Slider",
  data() {
    return {
      dots: [],
      currentIndex: 0
    };
  },
  props: {//初始化参数，所有可以通过外部传参来改变组件行为的参数都应该用 props
    loop: {
      //是否循环轮播
      type: Boolean,
      default: true
    },
    autoPlay: {
      //是否自动轮播
      type: Boolean,
      default: true
    },
    interval: {
      //轮播的时间间隔
      type: Number,
      default: 4000
    }
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;
      // console.log(this.children)
      // console.log(this.children.length)
      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initDots() {
      // this.dots.length = this.children.length
      this.dots = new Array(this.children.length);
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,//在X轴方向滑动
        scrollY: false, //在Y轴方向不滑动
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      });
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        // if (this.loop) {
        //   pageIndex -= 1;
        // }
        this.currentIndex = pageIndex;

        if(this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      });
      
    },
    _play() {
      let pageIndex = this.currentIndex + 1;
      this.timer = setTimeout(() => {
        // this.slider.goToPage(pageIndex, 0, 400);
        this.slider.next()
      }, this.interval);
    }
  },
  mounted() {
    setTimeout(() => {
      //为了保证dom成功渲染，因为页面初始化的时候页面没有真正渲染，或者高度和宽度计算不对
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
    }, 20) //20ms,因为浏览器的刷新通常是17ms一次

    if (this.autoPlay) {
      this._play();
    }

    window.addEventListener('resize', () => {
        if(!this.slider) { //就是slide还没有初始化的时候
            return
        }
        this._setSliderWidth(true)
        this.slider.refresh()//重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
    })
  },
  destroyed () {//组件销毁时要清除掉所有的计时器，释放出缓存
    clearTimeout(this.timer)
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    transform: translateZ(1px);
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
