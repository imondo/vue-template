<template>
  <layout-main :query="false">
    <template #query>
      <h1>Table</h1>
    </template>
    <template #content>
      <base-table :columns="data.columns" :data="data.list">
        <template #action="{ row }">
          <el-button type="primary" @click="onClick(row)">点击</el-button>
        </template>
      </base-table>
    </template>
  </layout-main>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue';

const { proxy: vm } = getCurrentInstance();

const data = reactive({
  columns: [
    {
      label: 'Name',
      prop: 'name.a'
    },
    {
      label: 'Age',
      dataIndex: 'age',
      prop: 'age'
    },
    {
      label: 'Address',
      prop: 'address'
    },
    {
      label: 'Tags',
      prop: 'tags'
    },
    {
      label: 'Action',
      prop: 'action',
      slot: 'action'
    }
  ],
  list: []
});

const onClick = row => {
  console.log(row.age);
  vm.$message.success(row.age);
};
</script>

<style lang="scss" scoped></style>
