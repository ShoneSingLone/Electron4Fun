<template>
  <div id="lorikeet-wrapper">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    <div id="toolbar">
      <div id="current-folder" v-for="(item, index) in homedir" :key="index">{{item.basename}}</div>
    </div>
  </div>
</template>

<script>
// import { home } from "osenv";
import os from "os";
import { resolve, basename } from "path";
import { readdir as FSreaddir, stat as FSstate } from "@/utils/fs";

export default {
  name: "LorikeetPage",
  mounted() {
    (async () => {
      this.homedir = await this.getFilesInFolder();
      console.log("this.homedir", this.homedir);
    })();
  },
  data() {
    return {
      homedir: "",
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    getHomedir() {
      return os.homedir();
    },
    async getFilesInFolder() {
      try {
        let filesPath = this.getHomedir();
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
        return itemList;
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