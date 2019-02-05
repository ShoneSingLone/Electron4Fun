<template>
  <div class="resize-container" :style="rcStyle" ref="rc">
    <div
      :class="['dragbar',{mousedown:isMouseDown}]"
      @mousedown=" handleMousedown"
      @mouseleave="handleMouselmouseleave"
      @mouseenter="handleMouselmouseenter"
    ></div>
    <div :class="[{mask:isMouseDown}]"></div>
    <div
      :class="['toggle', 'icon', 'iconfont' ,'icon-caidanzhankai',{expend:isExpend} ]"
      :style="toggleStyle"
      @click="toggleCollapse"
    ></div>
    <slot>resize-container</slot>
  </div>
</template>

<script>
let thisVue;
let minWidth = 0;

let COLLAPSE_TITLE = {
  expend: "折叠",
  collapse: "展开"
};
//有命名空间的事件名
let symbol = Date.now();
const EVENT = {
  mouseup: "mouseup.changeTreeWidth" + symbol,
  mousemove: "mousemove.changeTreeWidth" + symbol,
  mousedown: "mousedown.changeTreeWidth" + symbol
};

console.log(EVENT);
export default {
  name: "ResizeContainer",
  props: {},
  mounted() {
    thisVue = this;
    thisVue.initMouseAction();
  },
  data() {
    return {
      rcStyle: { "flex-basis": "300px" },
      toggleStyle: { left: "252px" },
      isMouseDown: false,
      isExpend: true,
      flexBasis: 300
    };
  },
  computed: {
    collapseTitle() {
      return this.isExpend ? COLLAPSE_TITLE.expend : COLLAPSE_TITLE.collapse;
    }
  },
  methods: {
    toggleCollapse() {
      /* 变为与当前相反的状态 */
      thisVue.isExpend = !thisVue.isExpend;
      /* 根据改变后的状态变化宽度 */
      thisVue.rcStyle["flex-basis"] =
        (thisVue.isExpend ? thisVue.flexBasis : minWidth) + "px";
      thisVue.toggleStyle["left"] =
        (thisVue.isExpend ? thisVue.flexBasis - 48 : minWidth) + "px";
    },
    //处理resize TreePanel
    initMouseAction() {
      window.$(window).on(EVENT.mouseup, () => {
        thisVue.isMouseDown = false;
      });
    },
    offMousemove() {
      thisVue.offMousemove.timer = setTimeout(() => {
        window.$(window).off(EVENT.mousemove);
      }, 48);
    },
    handleMouselmouseleave() {
      thisVue.isMouseDown = false;
    },
    handleMouselmouseenter() {
      clearTimeout(thisVue.offMousemove.timer);
    },
    handleMousedown(event = window.event) {
      thisVue.initMouseAction();
      clearTimeout(thisVue.offMousemove.timer);
      thisVue.isMouseDown = true;
      let { clientX: downX } = event;

      // 记录:点击时，flex-basis的宽度
      let eleBasis = thisVue.rcStyle["flex-basis"];
      eleBasis = Number(eleBasis.split("px")[0]);

      //鼠标移动的相对位置
      window.$(window).on(EVENT.mousemove, event => {
        //移动的时候没有mousedown，取消move行为
        if (!event.which) thisVue.isMouseDown = false;

        let { clientX: moveX } = event;
        let distance = moveX - downX;
        /*  */
        thisVue.isExpend = distance > 0 ? true : thisVue.isExpend;
        let flexBasis = eleBasis + distance;
        if (flexBasis <= minWidth) {
          /* 达到最小阈值，不变 */
          /* 不随用户拖动变更基本宽度 */
          /*  thisVue.flexBasis = eleBasis; */
          thisVue.isExpend = false;
          return false;
        }
        /* 不随用户拖动变更基本宽度 */
        /*  thisVue.flexBasis = flexBasis; */

        /* 改变style */
        thisVue.rcStyle["flex-basis"] = flexBasis + "px";
        thisVue.$emit(
          "widthChange",
          thisVue.$refs.rc.getBoundingClientRect().width
        );
      });
    }
  },
  watch: {
    isMouseDown(isMouseDown) {
      if (!isMouseDown) {
        thisVue.offMousemove();
      }
    },
    rcStyle: {
      handler: function(rcStyle) {
        let currentWidth = rcStyle["flex-basis"];
        currentWidth = Number(currentWidth.split("px")[0]);
        this.toggleStyle["left"] =
          (currentWidth < 48 ? currentWidth : currentWidth - 48) + "px";
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
$itemed-color1: #7593f5;
$itemed-color2: #535455;

* {
  user-select: none;
}
.resize-container {
  position: relative;
  height: 100%;
  // z-index: 1;
  display: flex;
  width: 300px;
  overflow: hidden;
  transition: all 0.01s ease-in-out;

  .dragbar {
    box-sizing: content-box;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 10px;
    z-index: 2;
    // background-color:  rgba(0, 255, 255, 0.513);
    cursor: e-resize;

    &.mousedown {
      &::before {
        // background- color: rgba(255, 251, 0, 0.513);
        position: fixed;
        content: " ";
        top: -9000px;
        right: -9000px;
        bottom: -9000px;
        left: -9000px;
        z-index: 1;
      }
    }
  }

  .mask {
    content: " ";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
  }

  $toggle-height: 32px;
  $toggle-width: 48px;
  .toggle {
    // background: linear-gradient(90deg, $itemed-color1, $itemed-color2);
    outline: unset;
    // border-radius: $toggle-height;
    text-align: center;
    // color: white;
    width: $toggle-width;
    height: $toggle-height;
    line-height: $toggle-height;
    font-size: 1rem;
    font-weight: 700;
    position: fixed;
    z-index: 2;
    top: 2px;
    left: 290px;
    color: $itemed-color2;
    // @include elevation4();
    transition: transform 0.1s ease-in;
    &.expend {
      transform: rotate(180deg);
    }
    &:hover {
      color: $itemed-color1;
      // @include elevation6();
      cursor: pointer;
    }

    &:active {
      color: $itemed-color2;
      // @include elevation2();
    }
  }
}
</style>

