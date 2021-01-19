<template>
  <el-cascader
    v-model="scalebb"
    :options="options"
    clearable
    placeholder="预报尺度"
    @change="handleChange"
  ></el-cascader>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SelectScalebb',
  props: {
    value: {
      type: [Array],
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['enums']),
    scalebb: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:input', value)
      }
    },
    options() {
      return [
        {
          value: 'month',
          label: '月尺度',
          children: [...this.enums.scaleAbbs.month]
        },
        {
          value: 'quarter',
          label: '季尺度',
          children: [...this.enums.scaleAbbs.quarter]
        },
        {
          value: 'year',
          label: '年尺度',
          children: [...this.enums.scaleAbbs.year]
        }
      ]
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
