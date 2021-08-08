<template>
  <layout-main>
    <template #appTop>
      <h1>Table</h1>
    </template>
    <template #appContent>
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
  list: [
    {
      key: '1',
      name: {
        a: 'John Brown'
      },
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: {
        a: 'John Brown2'
      },
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: {
        a: 'John Brown3'
      },
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]
});

const onClick = row => {
  console.log(row.age);
  vm.$message.success(row.age);
};
</script>

<style lang="scss" scoped></style>
