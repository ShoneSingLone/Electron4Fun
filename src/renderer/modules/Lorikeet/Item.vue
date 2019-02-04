<template>
  <div class="item-wrapper">
    <div :class="iconClass"></div>
    <div class="filename">{{item.basename}}</div>
  </div>
</template>

<script>
export default {
  name: "LorikeetPage",
  mounted() {
    if ("directory" === this.item.type) this.iconClass.directory = true;
  },
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      iconClass: {
        icon: true,
        file: true,
        directory: false
      }
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.item-wrapper {
  @include panel();
  position: relative;
  height: 100px;
  width: 100px;
  text-align: center;
  // transition: all 0.5s;
  .icon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    &.file {
      background: url(./file.svg) center center/cover no-repeat;
    }
    &.directory {
      background: url(./directory.svg) center center/cover no-repeat;
    }
  }
  &:hover {
    @include elevation4();
    cursor: pointer;
    .icon {
      // background-color: #f0f0f0;
    }
  }
  &:active {
    @include elevation2();
    cursor: pointer;
  }

  .filename {
    overflow: hidden;
  }
}
</style>