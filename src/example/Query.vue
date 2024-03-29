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
      <el-button
        type="primary"
        icon="el-icon-folder-opened"
        @click="handleSelect"
        >选中</el-button
      >
      <el-button type="primary" icon="el-icon-download" @click="handleExport"
        >导出</el-button
      >
    </template>
    <template #content>
      <BaseTable
        ref="pageTable"
        :columns="data.columns"
        :data="state.list"
        :loading="state.loading"
        :total="state.list.length"
        @page-change="onChangePage"
      >
        <template #action="{ row }">
          <TableButton :loading="row.loading" @click="onClick(row)"
            >编辑</TableButton
          >
          <TableButton pop title="是否删除该数据？" @confirm="onClick(row)"
            >删除</TableButton
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
import ExportXlsx from '@/plugins/xlsx/index.js';
const { message } = useContext();
const exportXlsx = new ExportXlsx();

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

const { loading } = useLoading({ del: false, click: false });

const areas = ref([]);

const showModal = ref(false);

const { state, getTableList, pageTable } = useTableList({
  query: getList,
  data: query
});

console.log(state);

const onClick = row => {
  // state.loading = true;
  // message.success(row.age);
  showModal.value = true;
  data.form = row;
  row.loading = true;
};

const onConfirm = () => {
  showModal.value = false;
  data.form.loading = false;
};

const handleDelete = () => {
  console.log(query);
  loading.del = true;
  getTableList();
};

const onChangePage = data => {
  console.log(data);
};

const handleSelect = () => {
  pageTable.value.baseTable.toggleRowSelection(state.list[1], true);
};
const handleExport = () => {
  const header = data.columns.reduce((arr, v) => {
    const { prop, label } = v;
    if (prop !== 'action') {
      arr.push({
        [prop]: label
      });
    }
    return arr;
  }, []);
  const body = state.list;
  exportXlsx.export({
    header,
    body,
    hasTitle: true,
    fileName: '表格查询',
    config: {
      // merges: ['A2:B2', 'E8:E9', 'C5:E5'],
      cols: {
        C: { wpx: 150 }, // C 列宽度
        D: { wpx: 150 } // D 列宽度
      },
      style: {
        D: {
          font: {
            name: '宋体',
            sz: 16,
            color: { rgb: 'FFFFAA00' },
            bold: true
          },
          fill: {
            fgColor: { rgb: 'CCCCCC' } // 单元格颜色
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center'
          },
          numFmt: 'yyyy-mm-dd'
        }
      }
    }
  });
};
</script>

<style lang="scss" scoped></style>
