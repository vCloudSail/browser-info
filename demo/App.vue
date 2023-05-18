<template>
  <div id="main">
    <el-descriptions title="浏览器信息" :column="1" border>
      <el-descriptions-item
        v-for="item in browerInfoTemplate"
        :key="item.prop"
        :label="item.name"
      >
        {{ browserInfo[item.prop] }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script >
import BrowserInfo, { getBrowerInfo } from "@/main";
import { defineComponent, reactive, ref, toRef, toRefs } from "vue";

window.$browserInfo = ref(window.$browserInfo).value

/**
 * vue-comp
 * @author lcm
 * @createTime
 * @description
 */
export default defineComponent({
  name: "vue-comp",

  // #region 组件基础
  components: {},
  props: {},
  // 兼容vue3写法
  emits: [],
  // #endregion

  // #region 数据相关
  data() {
    return {
      browserInfo: window.$browserInfo,
      browerInfoTemplate: [
        {
          name: "浏览器名称",
          prop: "name",
        },
        {
          name: "浏览器类型",
          prop: "type",
        },
        {
          name: "浏览器版本",
          prop: "version",
        },
        {
          name: "浏览器内核",
          prop: "core",
        },
        {
          name: "浏览器内核版本",
          prop: "coreVersion",
        },
        {
          name: "操作系统",
          prop: "os",
        },
        {
          name: "操作系统版本",
          prop: "osVersion",
        },
        {
          name: "终端设备类型",
          prop: "terminalType",
        },
        {
          name: "ua",
          prop: "$ua",
        },
      ],
    };
  },
  computed: {
    // browserInfo() {
    //   return getBrowerInfo();
    // },
  },
  watch: {},
  // #endregion

  // #region 生命周期
  created() {},
  mounted() {
    console.log(window.$browserInfo);
  },
  // #endregion

  methods: {},
});
</script>

<style >
.vue-comp {
}
</style>
