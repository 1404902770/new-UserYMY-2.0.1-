<template>
  <!-- 系统管理 - 分账号管理 -->
  <div class="roleManagement">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <div class="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>子账号管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <el-button
          type="primary"
          @click="addEdits"
        >+ 添加子账号</el-button>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div class="maincontent">
          <!-- 列表 -->
          <el-table
            :data="tableData"
            stripe
            style="width: 99%;margin:0 auto"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              mini-width="50"
            ></el-table-column>

            <el-table-column
              label="创建日期"
              min-width="120"
              align="center"
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.join_time }}</span>
                <!-- <span style="margin-left: 10px">{{ new Date(scope.row.time*1000).Format('yy-MM-dd') }}</span> -->
              </template>
            </el-table-column>

            <el-table-column
              prop="nickname"
              show-overflow-tooltip
              label="子账号名称"
              align="center"
              min-width="120"
            ></el-table-column>

            <el-table-column
              prop="username"
              show-overflow-tooltip
              label="子账号"
              align="center"
              min-width="150"
            ></el-table-column>

            <!-- <el-table-column
              prop="phone"
              show-overflow-tooltip
              label="管理员联系方式"
              align="center"
              min-width="80"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.c == 1">超级管理员</span>
                <span v-else-if="scope.row.c == 2">管理员</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="e"
              show-overflow-tooltip
              label="管理员账号"
              align="center"
              min-width="80"
            ></el-table-column>-->

            <el-table-column
              prop="real_name"
              show-overflow-tooltip
              label="负责人"
              align="center"
              min-width="80"
            ></el-table-column>

            <el-table-column
              prop="c_tel"
              show-overflow-tooltip
              label="联系方式"
              align="center"
              min-width="80"
            ></el-table-column>

            <el-table-column
              show-overflow-tooltip
              label="操作"
              align="center"
              min-width="190"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  style="color:#1478c5;"
                  icon="el-icon-edit"
                  title="绑定设备"
                  @click="bindeq(scope.row)"
                >绑定</el-button>
                <el-button
                  type="text"
                  style="color:#1478c5;"
                  icon="el-icon-view"
                  title="查看绑定设备"
                  @click="lookbindeq(scope.row)"
                >查看</el-button>
                <!-- <el-button
                  type="text"
                  style="color:#1478c5;"
                  icon="el-icon-refresh-right"
                  title="密码重置"
                  @click="resetpassword(scope.row)"
                >重置</el-button> -->

                <el-button
                  type="text"
                  style="color:#1478c5;"
                  icon="el-icon-document-remove"
                  title="解除所有设备绑定"
                  @click="unbingall(scope.row)"
                >解除所有</el-button>

                <el-button
                  type="text"
                  style="color:#F56C6C;"
                  icon="el-icon-delete"
                  title="删除账号"
                  @click="deletes(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <!-- 添加 loading -->
        <el-dialog
          title="添加子账号"
          :visible.sync="dialogVisible"
          width="35%"
          :before-close="handleClose"
          :close-on-click-modal="false"
        >
          <el-form
            ref="addEditsData"
            :rules="rules"
            :model="addEditsData"
            label-width="150px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="子账号"
              prop="username"
            >
              <el-input
                v-model="addEditsData.username"
                placeholder="请输入子账号"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="子账号名称"
              prop="nickname"
            >
              <el-input
                v-model="addEditsData.nickname"
                placeholder="请输入子账号名称"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="负责人"
              prop="realname"
            >
              <el-input
                v-model="addEditsData.realname"
                placeholder="请输入负责人"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="性别"
              prop="sex"
            >
              <el-radio-group v-model="addEditsData.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="身份证号"
              prop="idcard"
            >
              <el-input
                v-model="addEditsData.idcard"
                placeholder="请输入身份证号"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="联系方式"
              prop="userphone"
            >
              <el-input
                v-model="addEditsData.userphone"
                placeholder="请输入联系方式"
              ></el-input>
            </el-form-item>

          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="handleClose">关闭</el-button>
            <el-button
              type="primary"
              @click="isOk('addEditsData')"
            >确 定</el-button>
          </span>
        </el-dialog>

        <!-- 查看 loading -->
        <el-dialog
          title="查看绑定设备"
          :visible.sync="dialogVisible2"
          width="60%"
          :before-close="handleClosebind"
          :close-on-click-modal="false"
        >
          <el-table
            ref="multipleTable"
            :data="tableData1"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column
              prop="n_name"
              show-overflow-tooltip
              label="电箱名称"
              align="center"
              min-width="150"
            ></el-table-column>

            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="回路名称"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="n_local"
              show-overflow-tooltip
              label="回路地址"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              show-overflow-tooltip
              label="设备型号"
              align="center"
              min-width="80"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.type == 0">[F]总路单相</span>
                <span v-if="scope.row.type == 1">[F]总路三相</span>
                <span v-if="scope.row.type == 10">[F]支路单相</span>
                <span v-if="scope.row.type == 11">[F]支路三相</span>
                <span v-if="scope.row.type == 80">[T]总路单相</span>
                <span v-if="scope.row.type == 81">[T]总路三相</span>
                <span v-if="scope.row.type == 90">[T]支路单相</span>
                <span v-if="scope.row.type == 91">[T]支路三相</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="mid"
              show-overflow-tooltip
              label="回路编号"
              align="center"
              min-width="60"
            >
              <template slot-scope="scope">
                <span>{{ '回路' + scope.row.mid }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="local"
              show-overflow-tooltip
              label="安装地址"
              align="center"
              min-width="120"
            ></el-table-column>

            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  style="color:#F56C6C;"
                  @click="unbindeq(scope.$index, scope.row)"
                >解除绑定</el-button>
              </template>
            </el-table-column>
          </el-table>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="handleClosebind">关 闭</el-button>
            <!-- <el-button type="primary" @click="isBind('addEditsData')">确 定</el-button> -->
          </span>
        </el-dialog>
      </el-main>
      <!-- 尾部 -->
      <el-footer>
        <!-- 分页 -->
        <el-pagination
          v-if="fenYe.total>13"
          @current-change="handleCurrentChange"
          :current-page.sync="fenYe.currentPage"
          layout="total, prev, pager, next, jumper"
          :page-size="13"
          :total="fenYe.total"
        ></el-pagination>
      </el-footer>
      <!-- 底部版权 -->
      <copyright></copyright>
    </el-container>
  </div>
</template>
  
  <script>
import copyright from "../../components/copyright";
export default {
  name: "roleManagement",
  components: {
    copyright
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      } else {
        const reg = /^[a-zA-Z][a-zA-Z0-9_]*$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的用户名"));
        }
      }
    };
    return {
      // 角色id
      uid: "",
      // 列表数据
      tableData: [],
      // 查看绑定数据
      tableData1: [],
      // 已选择电箱数据
      multipleSelection: [],
      // 已选电箱计数
      selectionBoxCount: [],
      zlist: [],
      // 已选择设备的ID
      selectIdList: [],
      // 要绑定的管理员id
      id: "",
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      },
      // 添加 / 编辑 - 数据
      addEditsData: {
        username: "", // 管理员用户名
        nickname: "", // 管理员昵称
        realname: "",  //真实姓名
        userphone: "", // 分账号联系方式
        idcard: "", //身份证号
        sex: "",  //性别
      },
      // 添加 / 编辑 - 数据容错
      rules: {
        username: [{ required: true, validator: checkPhone, trigger: "blur" }],
        realname: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        userphone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        // idcard: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      // 添加 - loading
      dialogVisible: false,

      // 查看 - loading
      dialogVisible2: false
    };
  },
  methods: {
    // 初始化获取列表
    getList(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urla + "/api3/device/childUserList";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          group_id: localStorage.getItem('gid'),
          page: page,
          size: 13
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res);
        this.tableData = res.data.data;
        this.fenYe.total = res.data.count;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].join_time = new Date(
            this.tableData[i].join_time * 1000
          ).Format("yy-MM-dd");
        }
      });
    },

    // 编辑 / 添加 - 角色
    addEdits(row) {
      if (row.id) {
        this.uid = row.id;
        this.dialogVisible = true;
      } else {
        this.uid = "";
        Object.keys(this.addEditsData).forEach(
          key => (this.addEditsData[key] = "")
        );
        this.dialogVisible = true;
      }
    },
    // 关闭添加loading
    handleClose() {
      this.dialogVisible = false;
      this.$refs.addEditsData.resetFields();
      this.uid = "";
      Object.keys(this.addEditsData).forEach(
        key => (this.addEditsData[key] = "")
      );
    },

    // 关闭绑定loading
    handleClosebind() {
      this.dialogVisible2 = false;
    },

    // 判断已选电箱计数 和 列表数据想对比 - 给出已选的样式打钩
    allContrast() {
      this.selectionBoxCount.forEach(row1 => {
        this.tableData1.forEach(row2 => {
          if (row1.id == row2.id) {
            this.$refs.multipleTable.toggleRowSelection(row2);
            this.zlist.push(row2);
          }
        });
      });
    },

    // 添加子账号接口
    addrole() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urla + "/api3/device/setChildUserAdmin";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          username: this.addEditsData.username,
          nickname: this.addEditsData.nickname,  //可选 昵称  默认为yumoyo
          c_tel: Number(this.addEditsData.userphone),
          group_id: localStorage.getItem('gid'), //企业id
          real_name: this.addEditsData.realname, //真实姓名
          c_idcard: this.addEditsData.idcard, //身份证号
          c_sex: this.addEditsData.sex  //性别
        }
      };

      this.myAjax(type, url, data, res => {
        // console.log(res);
        if (res.data.code == 500) {
          this.$message({
            showClose: true,
            message: "添加管理员成功",
            type: "success"
          });
          this.getList(1);
          this.dialogVisible = false;
        } else if (res.data.code == 37) {
          this.$message({
            showClose: true,
            message: "添加管理员失败",
            type: "error"
          });
        } else if (res.data.code == 615) {
          this.$message({
            showClose: true,
            message: "用户名被占用",
            type: "warning"
          });
        }
      });
    },

    // 管理员点击绑定设备
    bindeq(row) {
      this.$router.push({ name: "roleBindEq", params: row });
      // this.userid = row.id;
      // this.dialogVisible2 = true;
    },

    // 查看绑定设备
    lookbindeq(row) {
      // console.log(row)
      this.id = row.id;
      this.dialogVisible2 = true;

      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urla + "/api3/device/getChildUserHwList";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          zuid: row.id,
          group_id: localStorage.getItem('gid'),
          page: 1,
          size: 13,
        }
      };

      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableData1 = res.data.data;
      });
    },

    // 解除设备绑定
    unbindeq(index, row) {
      this.$confirm("此操作将解除设备绑定, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let username = localStorage.getItem("username");
          let uid = localStorage.getItem(username + 'uid');
          let type = "post";
          let url = this.urla + "/api3/device/delChildUserToHw";
          let data = {
            data: {
              uid: uid,
              // uid: localStorage.getItem("uid"),
              group_id: localStorage.getItem('gid'),
              zuid: this.id,
              mid: row.mid,
              nid: row.nid,
            }
          };

          this.myAjax(type, url, data, res => {
            if (res.data.code == 500) {
              this.$message({
                showClose: true,
                message: "解除绑定成功",
                type: "success"
              });
              this.tableData1.splice(index, 1)
            } else if (res.data.code == 702) {
              this.$message({
                showClose: true,
                message: '该用户不存在',
                type: 'warning'
              });
            } else if (res.data.code == 706) {
              this.$message({
                showClose: true,
                message: '该子管理员名下不存在这条线路',
                type: 'warning'
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消解绑"
          });
        });
    },

    // 解除所有设备邦定
    unbingall(row) {
      this.$confirm('此操作将解除所有绑定设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = "post";
        let url = this.urla + "/api3/device/delAllChildUserToHw";
        let data = {
          data: {
            uid: uid,
            zuid: row.id,
            group_id: localStorage.getItem('gid'),
          }
        };

        this.myAjax(type, url, data, res => {
          // console.log(res)
          if (res.data.code == 500) {
            this.$message({
              type: 'success',
              message: '解除绑定成功!'
            });
          } else {
            this.$message({
              type: 'warning',
              message: '解除绑定失败!'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解除绑定'
        });
      });
    },


    // 确定 - 添加角色/编辑
    isOk(addEditsData) {
      this.$refs[addEditsData].validate(valid => {
        if (valid) {
          if (this.uid) {
            this.dialogVisible = true;
          } else {
            this.addrole();
          }
        }
      });
    },

    // 密码重置
    resetpassword(row) {
      // console.log(row)
      this.$confirm('此操作将重置该账号密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = 'post'
        let url = this.urla + "/api/pc/rePassword"
        let data = {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          zuid: row.id
        }
        this.myAjax(type, url, data, res => {
          // console.log(res)
          if (res.data.code == 43) {
            // this.$message({
            //   type: 'success',
            //   message: '密码重置成功!'
            // });
            this.$notify({
              title: '密码重置成功',
              message: '重置密码为默认密码12345678',
              type: 'success',
              duration: 0
            });
          } else {
            this.$notify({
              title: '密码重置失败',
              message: '重置密码与默认密码相同',
              type: 'error',
              duration: 0
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        });
      });
    },

    // 删除
    deletes(row) {
      // console.log(row);
      if (row.id) {
        this.$confirm("您确定要删除该角色么？", "删除确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let username = localStorage.getItem("username");
            let uid = localStorage.getItem(username + 'uid');
            let type = "post";
            let url = this.urla + "/api3/device/delChildUser";
            let data = {
              data: {
                uid: uid,
                // uid: localStorage.getItem('uid'),
                zuid: row.id, //子管理员id
                group: localStorage.getItem('gid')  //企业id
              }
            };
            this.myAjax(type, url, data, res => {
              // console.log(res);
              if (res.data.code == 500) {
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                });
                this.getList(1);
              } else if (res.data.code == 709) {
                this.$message({
                  showClose: true,
                  message: '请先解绑设备再删除此账号',
                  type: 'warning'
                });
              }
            });
          })
          .catch(() => {
            // this.$message.error(res.data.message + ",请联系管理员");
          });
      } else {
        this.$message.warning("该条信息有误,请联系管理员");
      }
    },

    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.getList(val);
    },
  },
  mounted() { },
  created() {
    this.getList(1);

    // this.geteqList(1);
  },
};
</script>
  
<style lang="less" scoped>
.roleManagement .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}
// .roleManagement /deep/ .el-dialog__body {
//   padding-right: 65px;
// }
.roleManagement {
  overflow: hidden;
  height: 100%;
  .el-header {
    text-align: right;
    line-height: 60px;
    background: #fff;
    width: 99%;
    margin: 10px auto;
    .el-button {
      margin-top: 3px;
      padding: 9px 20px;
      // border-radius: 0;
      border: none;
      background: #1478c5;
      // background-image: linear-gradient(to right, #32a581, #158c86);
    }
    .bread {
      display: inline-block;
      float: left;
      margin-top: 22px;
      .el-breadcrumb /deep/ .el-breadcrumb__inner {
        // color: #ccc;
      }
    }
  }
  .el-main {
    color: #333;
    text-align: center;
    padding: 0;
    height: 100%;
    .maincontent {
      width: 99%;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      box-sizing: border-box;
    }
    .el-form {
      text-align: left !important;
      .el-radio,
      .el-form-item /deep/ .el-form-item__label {
        font-weight: bold;
        // color: #ccc !important;
      }
      .el-input /deep/ .el-input__inner {
        background: #e4e4e4;
        border: none;
        // border-radius: 0;
      }
    }
    ::-webkit-input-placeholder {
      color: #666;
    }
    ::-moz-placeholder {
      color: #666;
    } /* firefox 19+ */
    :-ms-input-placeholder {
      color: #666;
    } /* ie */
    input:-moz-placeholder {
      color: #666;
    }
  }

  .el-footer {
  }
}
</style>
  