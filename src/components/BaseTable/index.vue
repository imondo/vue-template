<template>
  <a-table
    :columns="columns"
    size="middle"
    :data-source="data"
    bordered
    v-bind="$attrs"
  >
    <template v-for="(value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>
  </a-table>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
