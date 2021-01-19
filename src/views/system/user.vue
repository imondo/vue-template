<template>
  <div class="app-container">
    <el-card>
      <el-form
        :model="searchData"
        :inline="true"
        label-position="left"
        class="search-form query-form"
        @keydown.enter.stop.native="!loading.table && search()"
      >
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="用户状态：">
              <el-select
                v-model="searchData.status"
                placeholder="请选择用户状态"
                @change="search"
              >
                <el-option value="" label="全部"></el-option>
                <el-option value="1" label="已启用"></el-option>
                <el-option value="0" label="已停用"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="名称：">
              <el-input
                v-model="searchData.name"
                :maxlength="64"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item label="登录账户：">
              <el-input
                v-model="searchData.username"
                :maxlength="64"
                placeholder="请输入登录账户"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click.stop="search()"
              >查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="app-content chart-container">
      <div v-loading="loading.table" class="table-content">
        <div class="table-operate clearfix">
          <div class="right">
            <el-button v-if="useEdit" type="primary" @click.stop="open()">
              新增账户
            </el-button>
          </div>
        </div>
        <el-table :data="tableData" :border="true" stripe>
          <el-table-column
            prop="id"
            fixed="left"
            align="center"
            label="用户ID"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            fixed="left"
            align="center"
            label="名称"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            prop="username"
            fixed="left"
            align="center"
            label="登录账户"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            prop="mobile"
            align="center"
            label="手机号"
            min-width="130"
          ></el-table-column>
          <el-table-column
            prop="roleNames"
            align="center"
            label="角色"
            min-width="150"
          >
          </el-table-column>
          <el-table-column align="center" label="状态" min-width="90">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                :disabled="!useEdit || scope.row.mainAccountFlag === 1"
                @change="
                  changeType(
                    `common/users/${scope.row.id}/status/${scope.row.status}`,
                    scope.row
                  )
                "
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            align="center"
            label="创建时间"
            min-width="160"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            align="center"
            label="更新时间"
            min-width="160"
          >
          </el-table-column>
          <el-table-column
            prop="createByName"
            align="center"
            label="操作人"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            v-if="useEdit"
            fixed="right"
            align="center"
            label="操作"
            min-width="160"
          >
            <template slot-scope="scope">
              <a
                href="javascript:void(0);"
                @click.stop="open(scope.row)"
              >修改</a>
              <a
                href="javascript:void(0);"
                @click.stop="resetPassword(scope.row.id)"
              >
                重置密码</a>
            </template>
          </el-table-column>
        </el-table>
        <paging
          :page-no.sync="searchData.offset"
          :page-size.sync="searchData.limit"
          :total="total"
          @change="getData"
        ></paging>
      </div>
      <el-dialog
        v-if="useEdit"
        :visible.sync="dialog"
        :title="`${formData.id ? '修改' : '新增'}账户`"
        top="25vh"
        width="500px"
      >
        <el-form
          ref="formRef"
          v-loading="loading.dialog"
          :model="formData"
          :rules="formRules"
          label-width="95px"
          @keydown.enter.stop.native="!loadingServer.save && save()"
        >
          <el-form-item prop="username" label="登录账户：">
            <el-input
              v-model="formData.username"
              :maxlength="64"
              :disabled="Boolean(formData.id)"
              autocomplete="off"
              placeholder="请输入登录账户"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name" label="名称：">
            <el-input
              v-model="formData.name"
              :maxlength="64"
              autocomplete="off"
              placeholder="请输入名称"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="mobile" label="手机号：">
            <el-input
              v-model="formData.mobile"
              v-focus="dialog"
              :maxlength="11"
              autocomplete="off"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="roleIds" label="账户角色：">
            <el-checkbox-group v-model="formData.roleIds">
              <el-checkbox
                v-for="item in roles"
                :key="item.id"
                :label="item.id"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-alert title="账户初始密码为：123456" :closable="false" type="warning"></el-alert>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            :loading="loadingServer.save"
            @click.stop="save()"
          >
            保 存
          </el-button>
          <el-button
            type="danger"
            @click.stop="dialog = false"
          >取 消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Paging from '@/components/paging/index.vue'
import changeTypeMixin from '@/utils/change-type'
import { getUser } from '@/api/user'
import { LOADING_SET, LOADING_CHANGE } from '@/store/modules/loading-server'

export default {
  name: 'User',
  components: {
    Paging
  },
  mixins: [changeTypeMixin],
  data() {
    return {
      loading: {
        table: false,
        dialog: false
      }, // 加载状态对象
      searchData: {
        status: '',
        name: '',
        username: '',
        offset: 1,
        limit: 10
      }, // 查询对象
      total: 0, // 账户总条数
      tableData: [], // 账户列表
      dialog: false, // 弹窗显示状态
      roles: [], // 角色列表
      formData: {
        id: '',
        mobile: '',
        username: '',
        name: '',
        roleIds: []
      }, // 账户对象
      formRules: {
        mobile: [
          {
            required: false,
            validator: this.$verify({ text: '手机号', type: 'Mobile', required: false }),
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            validator: this.$verify({ text: '登录账户' }),
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            validator: this.$verify({ text: '名称', type: 'Chinese' }),
            trigger: 'blur'
          }
        ]
      } // 账户验证对象
    }
  },
  computed: {
    useEdit() {
      return this.$store.state.user.permissions.includes('common:user:insert')
    }, // 是否有编辑权限
    loadingServer() {
      return this.$store.state.loadingServer
    } // 按钮级loading对象
  },
  created() {
    this.$store.dispatch(LOADING_SET, { names: 'save' })
    this.getData()
  },
  methods: {
    search() {
      this.searchData.offset = 1
      this.getData()
    }, // 搜索
    getData() {
      this.loading.table = true
      getUser(
        Object.assign({}, this.searchData, {
          offset: this.searchData.offset - 1
        })
      ).then(response => {
        ({ data: this.tableData, recordsTotal: this.total } = response)
        this.loading.table = false
      })
    }, // 查询账户列表
    open({ id, mobile, username, name } = {}) {
      this.dialog = true
      this.$formClear().then(() => {
        this.loading.dialog = true
        const axios = [
          this.roles[0]
            ? Promise.resolve(true)
            : this.$axios.get('common/roles/all')
        ]
        if (id) {
          axios.push(this.$axios.get('common/roles/users/' + id, {}))
        }
        Promise.all(axios).then(response => {
          if (response[0] instanceof Object) {
            this.roles = response[0]
          }
          if (id) {
            const roleIds = []
            response[1].map(item => roleIds.push(item.id))
            Object.assign(this.formData, {
              id,
              mobile,
              username,
              name,
              roleIds
            })
          } else {
            this.formData.id = ''
          }
          this.loading.dialog = false
        })
      })
    }, // 打开账户弹窗
    save() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.$store.dispatch(LOADING_CHANGE, { save: true })
          const { id, roleIds } = this.formData
          const _rolesIds = []
          this.roles.map(item => {
            const { id: _id } = item
            if (roleIds.includes(_id)) {
              _rolesIds.push(_id)
            }
            return true
          })
          this.$axios[id ? 'putJson' : 'postJson'](
            'common/users',
            Object.assign({}, this.formData, { roleIds: _rolesIds })
          ).then(() => {
            this.$message.success({
              message: `${id ? '修改' : '新增'}成功`,
              onClose: () => {
                if (!id) {
                  this.searchData.offset = 1
                }
                this.getData()
                this.dialog = false
                this.$store.dispatch(LOADING_CHANGE, { save: false })
              }
            })
          })
        }
      })
    }, // 账户新增和修改
    resetPassword(id) {
      this.$confirm('您确定重置密码吗？', '提示', { type: 'warning' }).then(
        () => {
          this.loading.table = true
          this.$axios.put(`common/users/${id}/resetPassword`).then(response => {
            if (!response) {
              this.$message.success({ message: '重置密码成功' })
            } else {
              this.$message.error({
                message: '重置密码失败，请重试',
                type: 'error'
              })
            }
            this.loading.table = false
          })
        }
      )
    } // 重置密码
  }
}
</script>

<style lang="scss" scoped></style>
