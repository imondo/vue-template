<template>
  <layout-main>
    <template #query>
      <QueryForm v-model="query" @query="getTableList">
        <el-col :xs="24" :sm="24" :md="6">
          <el-form-item label="预报类型：">
            <el-select v-model="query.picture_type" placeholder="预报类型">
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
                v-for="(value, name) in areas"
                :key="value"
                :label="`${value} ${name}`"
                :value="value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <template #more>
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item label="模式资料：">
              <el-select v-model="query.date" placeholder="模式资料">
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
            <el-form-item label="起报日期：">
              <el-date-picker
                v-model="query.date"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="起报日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6">
            <el-form-item label="预报日期：" prop="date">
              <el-date-picker
                v-model="query.date"
                type="date"
                value-format="YYYY-MM-DD"
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
        </template>
      </QueryForm>
    </template>
    <template #btns>
      <el-button type="primary" icon="el-icon-plus">新建</el-button>
      <el-button
        :loading="loading.del"
        type="primary"
        icon="el-icon-delete"
        @click="handleDelete"
        >删除</el-button
      >
    </template>
    <template #content>
      <BaseTable
        :columns="data.columns"
        :data="state.list"
        :loading="state.loading"
        :total="state.list.length"
        @page-change="onChangePage"
      >
        <template #action="{ row }">
          <el-button size="mini" type="primary" @click="onClick(row)"
            >点击</el-button
          >
        </template>
      </BaseTable>
    </template>
    <!-- 弹出框 -->
    <BaseModal
      title="修改"
      width="500px"
      v-model:show="showModal"
      @confirm="onConfirm"
    >
      <el-form :model="data.form" ref="formModal" size="normal">
        <el-form-item label="年龄">
          <el-input
            type="text"
            v-model="data.form.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
    </BaseModal>
  </layout-main>
</template>

<script setup>
import { reactive, getCurrentInstance, ref } from 'vue';
import { getList } from '@/api/table';
import { useTableList, useLoading } from '@/hooks/useModel';
import useContext from '@/hooks/useContext';
const { message } = useContext();

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
  list: [],
  form: {
    age: '',
    date: ''
  }
});

const query = reactive({
  date: '',
  picture_type: '',
  area: '',
  station: ''
});

const { loading } = useLoading({ del: false });

const areas = ref([]);

const showModal = ref(false);

const { state, getTableList } = useTableList({
  query: getList,
  data: query
});

console.log(state);

const onClick = row => {
  // state.loading = true;
  // message.success(row.age);
  showModal.value = true;
  data.form = row;
};

const onConfirm = () => {
  showModal.value = false;
};

const handleDelete = () => {
  console.log(query);
  loading.del = true;
  getTableList();
};

const onChangePage = data => {
  console.log(data);
};
</script>

<style lang="scss" scoped></style>
