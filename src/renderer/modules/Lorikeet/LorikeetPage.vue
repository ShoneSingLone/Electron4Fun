<template>
  <div id="lorikeet-wrapper">
    <div id="toolbar">
      <div id="current-folder" v-for="(item, index) in homedir" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
// import { home } from "osenv";
import os from "os";
import { resolve } from "path";
import { readdir } from "@/utils/fs";

export default {
  name: "LorikeetPage",
  mounted() {
    (async () => {
      this.homedir = await this.getFilesInFolder();
    })();
  },
  data() {
    return {
      homedir: ""
    };
  },
  methods: {
    getHomedir() {
      return os.homedir();
    },
    async getFilesInFolder() {
      try {
        let filesPath = this.getHomedir();
        let files = await readdir(filesPath);
        [].map;
        return files.map(file => {
          return resolve(filesPath, file);
        });
      } catch (error) {
        console.log(error);
      }
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

#lorikeet-wrapper {
  height: 100%;
  overflow: scroll;
  
  #current-folder {
    @include panel();
    @include elevation2();
    border: 1px solid #f0f0f0;
  }
}
</style>