<template>
  <layout-main>
    <template #query>
      <el-form :inline="true" :model="query" class="query-form">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item label="预报类型：">
              <el-select v-model="query.picture_type" placeholder="预报类型">
                <el-option
                  v-for="(item, index) in pictures"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item label="地区范围：">
              <el-select v-model="query.area" placeholder="地区范围">
                <el-option
                  v-for="(item, index) in areas"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item label="站点：" label-width="82px">
              <el-select
                v-model="query.station"
                filterable
                clearable
                placeholder="站点"
              >
                <el-option label="全区域" value></el-option>
                <el-option
                  v-for="(value, name) in stations"
                  :key="value"
                  :label="`${value} ${name}`"
                  :value="value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item label="模式资料：">
              <el-select v-model="query.data_source" placeholder="模式资料">
                <el-option
                  v-for="(item, index) in dataSource"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item label="起报日期：">
              <el-date-picker
                v-model="query.init_date"
                type="date"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
                placeholder="起报日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item label="预报日期：">
              <el-date-picker
                v-model="query.forecast_date"
                type="date"
                :picker-options="forecastPickerOptions"
                value-format="yyyy-MM-dd"
                placeholder="预报日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item label="操作模式：">
              <el-radio-group v-model="mode">
                <el-radio :label="3">预测</el-radio>
                <el-radio :label="6" disabled>训练</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSearch"
                >执行</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-sort"
                @click="changeImgTabel"
                >切换</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #btns>
      <el-button type="primary">新建</el-button>
      <el-button type="primary">删除</el-button>
    </template>
    <template #content>
      <base-table :columns="data.columns" :data="state.list">
        <template #action="{ row }">
          <el-button size="mini" type="primary" @click="onClick(row)"
            >点击</el-button
          >
        </template>
      </base-table>
    </template>
  </layout-main>
</template>

<script setup>
import { reactive, getCurrentInstance } from 'vue';
import { getList } from '@/api/table';
import { useTableList } from '@/hooks/useModel';

const { proxy: vm } = getCurrentInstance();

const data = reactive({
  columns: [
    {
      label: 'Name',
      prop: 'name.value'
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
      label: '出生日期',
      prop: 'date'
    },
    {
      label: 'Action',
      prop: 'action',
      slot: 'action',
      width: 100
    }
  ],
  list: []
});

const query = reactive({});

const { state } = useTableList({
  query: getList
});

console.log(state);

const onClick = row => {
  console.log(row.age);
  vm.$message.success(row.age);
};
</script>

<style lang="scss" scoped></style>
