<template>
  <div id="lorikeet-wrapper">
    <div id="toolbar">
      <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
        <template slot="prepend">{{currentFolder}}</template>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="current-folder"></div>
    <div class="main-view">
      <file-item
        :item="item"
        v-for="(item, index) in itemList"
        :key="index"
        @click.native="handleClickItem(item)"
      />
      <!-- <div class="current-folder"></div> -->
    </div>
  </div>
</template>

<script>
// import { home } from "osenv";
import os from "os";
import { resolve, basename } from "path";
import { readdir as FSreaddir, stat as FSstate } from "@/utils/fs";
import fileItem from "./Item.vue";
// import CResizeContainer from "@/components/layout/ResizeContainer.vue";

export default {
  name: "LorikeetPage",
  mounted() {
    this.currentFolder = this.getHomedir();
    (async () => {
      await this.getFilesInFolder(this.currentFolder);
      console.log("this.itemList", this.itemList);
    })();
  },
  data() {
    return {
      currentFolder: "",
      itemList: "",
      search: ""
    };
  },
  methods: {
    getHomedir() {
      return os.homedir();
    },
    async getFilesInFolder(filesPath) {
      let vm = this;
      try {
        let files = await FSreaddir(filesPath);
        console.time("Promise");
        let itemList = await Promise.all(
          files.map(async file => {
            let path = resolve(filesPath, file);
            let type = "directory";
            let state = await FSstate(path);
            if (state.isFile()) {
              type = "file";
            }
            let item = {
              basename: basename(path),
              path,
              type
            };
            console.log("file", item);
            return item;
          })
        );
        console.timeEnd("Promise");
        return (vm.itemList = itemList);
      } catch (error) {
        console.log(error);
      }
    },
    handleClickItem(item) {
      console.log(item);
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
  components: {
    fileItem
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

#lorikeet-wrapper {
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-flow: column nowrap;

  #toolbar {
    position: fixed;
    height: 60px;
    line-height: 60px;
    width: 100%;
    background-color: white;
    z-index: 1;
    @include elevation2();
  }
  .current-folder {
    margin-top: 60px;
    height: 30px;
  }

  .main-view {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    .current-folder {
      flex: 1;
      @include panel();
      @include elevation2();
      border: 1px solid #f0f0f0;
    }
  }
}
</style>