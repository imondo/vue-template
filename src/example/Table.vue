<template>
  <layout-main>
    <template #appTop>
      <h1>Table</h1>
    </template>
    <template #appContent>
      <base-table :columns="data.columns" :data-source="data.list">
        <template #action="{ record }">
          <a-button type="primary" @click="onClick(record)">点击</a-button>
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
      dataIndex: 'name.a',
      title: 'Name',
      key: 'name',
      slots: { title: 'customTitle', customRender: 'name' }
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags'
    },
    {
      title: 'Action',
      key: 'action',
      slots: { customRender: 'action' }
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
  console.log(row);
  vm.$message.success(row.age);
};
</script>

<style lang="scss" scoped></style>
