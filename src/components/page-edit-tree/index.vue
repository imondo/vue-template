<template>
  <div class="page-tree-wap">
    <div class="tree">
      <el-tree
        ref="tree"
        :data="data"
        :props="configProps"
        :expand-on-click-node="false"
        :default-expanded-keys="defaultExpandedKeys"
        :current-node-key="currentNodeKey"
        highlight-current
        node-key="id"
        accordion
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span v-show="!node.isEdit">{{ node.label }}</span>
          <el-input
            v-show="node.isEdit"
            :ref="`treeInput${node.id}`"
            v-model="data[defalutLabel]"
            class="edit"
            size="mini"
            autofocus
            @blur="nodeBlur(node, data)"
            @keyup.enter.native="nodeBlur(node, data)"
          />
          <span v-show="isOpt && node.level === 2">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="() => append(node, data)"
            />
          </span>
          <span v-show="isOpt && node.level === 3">
            <i class="el-icon-edit tree-btn" @click="() => edit(node, data)"></i>
            <i class="el-icon-close tree-btn" @click="() => remove(node, data)"></i>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
let id = 0;
export default {
  name: 'PageEditTree',
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label'
        };
      }
    },
    isOpt: {
      type: Boolean,
      default: true
    },
    defaultExpandedKeys: {
      type: Array,
      default: () => {
        return [''];
      }
    },
    currentNodeKey: {
      type: String,
      default: ''
    }
  },
  computed: {
    configProps() {
      const config = Object.assign({
        children: 'children',
        label: 'name'
      }, this.defaultProps);
      return config;
    },
    defalutLabel() {
      return this.configProps.label;
    }
  },
  methods: {
    handleNodeClick(data, node) {
      this.$emit('node-click', data, node);
    },
    append(node, data) {
      const { label } = this.configProps;
      const newChild = {
        id: id++,
        [label]: `三级-${id}`,
        children: [],
        isEdit: false
      };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
      this.$emit('addNode', node, data);
    },

    edit(node, data) {
      if (!node.isEdit) {
        this.$set(node, 'isEdit', true);
      }
      this.$nextTick(() => {
        this.$refs[`treeInput${node.id}`].focus();
      });
      this.$emit('editNode', node, data);
    },

    nodeBlur(node, data) {
      if (node.isEdit) {
        this.$set(node, 'isEdit', false);
      }
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      this.$emit('delNode', node, data);
    }
  }
};
</script>

<style lang="scss">
.page-tree-wap {
  .tree-btn {
    display: none;
    color: #66b1ff;
  }
  .el-tree-node__content:hover .tree-btn {
    display: inline-block;
  }
  .el-input--mini {
    .el-input__inner {
      height: 24px;
      line-height: 24px;
    }
  }
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #cce5ff;
  }
}
</style>
