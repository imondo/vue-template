<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">全局配置</h3>
      <div class="drawer-item">
        <span>站点类型配置</span>
      </div>
      <el-card class="box-card">
        <el-radio-group v-model="site">
          <el-radio
            v-for="(item, index) in sites"
            :key="index"
            :label="item.value"
          >{{ item.label }}</el-radio>
        </el-radio-group>
      </el-card>
      <!-- <div class="drawer-item">
        <span>Open Tags-View</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Fixed Header</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sites: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '湖南',
          value: '1'
        },
        {
          label: '湖北',
          value: '2'
        }
      ]
    }
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    },
    site: {
      get() {
        return this.$store.state.settings.site
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'site',
          value: val
        })
      }
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }

  .el-radio {
    display: block;
    margin-top: 10px;
    padding-top: 0;
  }
}
</style>
