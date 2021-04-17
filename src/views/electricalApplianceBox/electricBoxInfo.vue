<template>
  <!-- 设备信息 - 电箱信息 -->
  <div class="electricBoxInfo">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <el-form
          ref="form1"
          :model="form1"
          label-width="100px"
        >
          <el-form-item
            label="电箱名称"
            prop="region"
            class="dianxiang"
          >
            <el-select
              v-model="form1.region"
              filterable
              placeholder="电箱名称"
            >
              <el-option
                v-for="(item,index) in options"
                :label="'['+getString1(hexCharCodeToStr(item.nid))+'] ' + item.n_name + ' [' + item.n_local +']'"
                :value="item.nid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-button
            type="primary"
            @click="getOnedx"
            style="float:left;margin-left:10px;"
          >查 询</el-button>

          <el-button
            type="primary"
            @click="resetForm1('form1')"
            style="float:left;"
          >重 置</el-button>
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div class="maincontent">
          <!-- 列表 -->
          <el-table
            :data="tableData"
            stripe
            ref="table"
            :max-height="tableHeight"
            style="width:100% !important;margin:0 auto"
          >

            <el-table-column
              prop="banben"
              show-overflow-tooltip
              label="版本号"
              align="center"
              min-width="100"
            ></el-table-column>

            <!-- <el-table-column
              prop="mozu"
              show-overflow-tooltip
              label="模组名称"
              align="center"
              min-width="100"
            ></el-table-column> -->

            <el-table-column
              prop="n_name"
              show-overflow-tooltip
              label="电箱名称"
              align="center"
              min-width="100"
            ></el-table-column>

            <!-- <el-table-column
              prop="mzid"
              show-overflow-tooltip
              label="电箱号"
              align="center"
              min-width="100"
            ></el-table-column> -->

            <el-table-column
              label="电箱号"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ hexCharCodeToStr(scope.row.nid) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="ext_number"
              show-overflow-tooltip
              label="分机个数"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              prop="txfs"
              show-overflow-tooltip
              label="通讯方式"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              prop="b_status"
              show-overflow-tooltip
              label="当前状态"
              align="center"
              min-width="100"
            ></el-table-column>

            <!-- <el-table-column
              prop="timer"
              show-overflow-tooltip
              label="定时器数量"
              align="center"
              min-width="100"
            ></el-table-column> -->

            <!-- <el-table-column
              prop="xinghao"
              show-overflow-tooltip
              label="型号"
              align="center"
              min-width="100"
            ></el-table-column> -->

            <!-- <el-table-column
              prop="neng"
              show-overflow-tooltip
              label="是否使能"
              align="center"
              min-width="60"
            ></el-table-column> -->

            <el-table-column
              prop="a_time"
              show-overflow-tooltip
              label="激活时间"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="n_local"
              show-overflow-tooltip
              label="安装地址"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <!-- <i
                  style="margin-right:10px"
                  title="修改电箱名称和地址"
                  class="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                ></i> -->
                <span
                  style="color:#1478c5;cursor: pointer;font-weight:bold"
                  @click="handleEdit(scope.$index, scope.row)"
                >
                  编辑
                </span>

                <!-- <i
                  title="停用电箱"
                  class="el-icon-warning-outline"
                  @click="stopuse(scope.$index, scope.row)"
                ></i> -->
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 更新电箱和地址弹框 -->
        <el-dialog
          :visible.sync="dialogFormVisible"
          width="40%"
          @close='closeupdate'
          title="更新电箱名称和地址"
          :close-on-click-modal="false"
        >
          <el-form :model="form">
            <el-form-item
              label="电箱名称"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="电箱地址"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.address"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              size="medium"
              @click="dialogFormVisible = false"
            >取 消</el-button>

            <el-button
              size="medium"
              type="primary"
              @click="submitForm"
            >确 定</el-button>
          </div>
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
  name: "electricBoxInfo",
  components: {
    copyright
  },
  data() {
    return {
      tableHeight: '735',

      // 检索
      form1: {
        region: "",
      },
      // 获取所有设备
      options: [],
      // 列表数据
      tableData: [],
      // 弹框
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 弹框表单
      form: {
        name: '',
        address: ''
      },
      // 修改的电箱号
      nid: '',
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      }
    };
  },
  methods: {
    // 初始化获取列表
    getList(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/Device/getallHwAgent";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          page: Number(this.fenYe.currentPage) - 1,
          nid: this.form1.region != "" ? this.form1.region : 0,
          size: 13
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.$refs.table.$el.style.width = '100%'

        this.tableData = res.data.data;
        this.fenYe.total = res.data.total;
        for (let i = 0; i < this.tableData.length; i++) {
          // 版本号
          this.tableData[i].banben = this.tableData[i].banben ? this.hexCharCodeToStr(this.tableData[i].banben) : '- -';
          // 模组名称
          this.tableData[i].mozu = this.tableData[i].mozu ? this.hexCharCodeToStr(this.tableData[i].mozu) : '- -';
          // 电箱号
          // this.tableData[i].mzid = this.hexCharCodeToStr(this.tableData[i].mzid);
          // 通讯方式
          this.tableData[i].ext_number = this.tableData[i].ext_number + '台';
          // 通讯方式
          if (this.tableData[i].txfs == '00') {
            this.tableData[i].txfs = 'WIFI';
          } else if (this.tableData[i].txfs == '01') {
            this.tableData[i].txfs = '以太网';
          } else {
            this.tableData[i].txfs = '4G';
          }
          // 主分类
          if (this.tableData[i].lei == 0) {
            this.tableData[i].lei = '总开关';
          } else {
            this.tableData[i].lei = '支路开关';
          }
          // 当前状态
          // if (this.tableData[i].bz == 1) {
          //   this.tableData[i].bz = '入库';
          // } else if (this.tableData[i].bz == 2 || this.tableData[i].bz == 4 || this.tableData[i].bz == 6 || this.tableData[i].bz == 8 || this.tableData[i].bz == 10) {
          //   this.tableData[i].bz = '保留';
          // } else if (this.tableData[i].bz == 3) {
          //   this.tableData[i].bz = '出库';
          // } else if (this.tableData[i].bz == 5) {
          //   this.tableData[i].bz = '地方仓库';
          // } else if (this.tableData[i].bz == 7) {
          //   this.tableData[i].bz = '客户仓库';
          // } else if (this.tableData[i].bz == 9) {
          //   this.tableData[i].bz = '故障';
          // } else if (this.tableData[i].bz == 11) {
          //   this.tableData[i].bz = '正常运行';
          // } else {
          //   this.tableData[i].bz = '被删除';
          // }
          if (this.tableData[i].b_status == 0) {
            this.tableData[i].b_status = '未绑定';
          } else if (this.tableData[i].b_status == 1) {
            this.tableData[i].b_status = '已绑定';
          } else if (this.tableData[i].b_status == 2) {
            this.tableData[i].b_status = '激活正常';
          } else if (this.tableData[i].b_status == 3) {
            this.tableData[i].b_status = '设备停用';
          } else {
            this.tableData[i].b_status = '--';
          }
          // 定时器数量
          // this.tableData[i].timer = this.tableData[i].timer + '个';

          // 能否使用
          if (this.tableData[i].neng == '01') {
            this.tableData[i].neng = '使能'
          } else if (this.tableData[i].neng == '00') {
            this.tableData[i].neng = '不使能'
          } else {
            this.tableData[i].neng = '- -'
          }
          // 激活时间
          this.tableData[i].a_time = new Date(
            this.tableData[i].a_time * 1000
          ).Format("yy-MM-dd hh:mm:ss");
        }
      });
    },
    // 初始化获取下拉数据 - 所有设备
    getOptions() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/EnergyData/getNetdSimpleList";
      let data = {
        data: {
          uid: uid
          // uid: localStorage.getItem('uid')
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.options = res.data.data;
      });
    },
    // 更新电箱名字和安装地址按钮
    handleEdit(index, row) {
      // console.log(index, row);
      this.form.name = row.n_name
      this.form.address = row.n_local
      this.dialogFormVisible = true
      this.nid = row.nid
    },
    // 提交修改电箱名称和地址
    submitForm() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = 'post'
      let url = this.urla + '/api3/EnergyData/upNetedNameAndLocalInfo'
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.nid,
          jianzhu: this.form.address,
          mzname: this.form.name
        }
      }
      this.myAjax(type, url, data, res => {
        if (res.data.code == 900) {
          this.dialogFormVisible = false
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          });
          this.getList(1);
        } else {
          this.$message({
            showClose: true,
            message: '修改失败',
            type: 'error'
          });
        }
      })
    },
    // 关闭修改电箱和地址
    closeupdate() {
      this.form.name = ''
      this.form.address = ''
    },

    // 电箱停用
    stopuse(index, row) {
      this.$confirm('是否停用此设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = 'post'
        let url = this.urla + '/api3/device/stopDevice'
        let data = {
          data: {
            uid: uid,
            // uid: localStorage.getItem('uid'),
            nid: row.nid,
          }
        }
        this.myAjax(type, url, data, res => {
          if (res.data.code == 900) {
            this.$message({
              type: 'success',
              message: '停用成功'
            });
            this.getList(1);
          } else {
            this.$message({
              showClose: true,
              message: '停用失败',
              type: 'error'
            });
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消停用'
        });
      });
    },

    // 定位电箱号
    getOnedx() {
      this.getList(1)
      // let type = "post";
      // let url = this.urlb + "/api3/Device/oneNetedInfo";
      // // let url = this.urlb + "/api3/EnergyData/searchNetedNid";
      // let data = {
      //   data: {
      //     uid: localStorage.getItem("uid"),
      //     nid: this.form.region   //电箱号
      //   }
      // };
      // this.myAjax(type, url, data, res => {
      //   // console.log(res)
      //   let arr1 = ['一', '二'];
      //   this.tableData = res.data.data;
      //   this.fenYe.total = res.data.length;
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     // 版本号         
      //     this.tableData[i].code = arr1[this.tableData[i].code - 1] + '代';
      //     // 版本号
      //     this.tableData[i].banben = this.tableData[i].banben ? this.hexCharCodeToStr(this.tableData[i].banben) : '- -';
      //     // 模组名称
      //     this.tableData[i].mozu = this.tableData[i].mozu ? this.hexCharCodeToStr(this.tableData[i].mozu) : '- -';
      //     // 电箱号
      //     // this.tableData[i].mzid = this.hexCharCodeToStr(this.tableData[i].mzid);
      //     // 通讯方式
      //     this.tableData[i].fen = this.tableData[i].fen + '台';
      //     // 通讯方式
      //     if (this.tableData[i].txfs == '00') {
      //       this.tableData[i].txfs = 'WIFI';
      //     } else if (this.tableData[i].txfs == '01') {
      //       this.tableData[i].txfs = '以太网';
      //     } else {
      //       this.tableData[i].txfs = '4G';
      //     }
      //     // 主分类
      //     if (this.tableData[i].lei == 0) {
      //       this.tableData[i].lei = '总开关';
      //     } else {
      //       this.tableData[i].lei = '支路开关';
      //     }
      //     // 当前状态
      //     if (this.tableData[i].bz == 1) {
      //       this.tableData[i].bz = '入库';
      //     } else if (this.tableData[i].bz == 2 || this.tableData[i].bz == 4 || this.tableData[i].bz == 6 || this.tableData[i].bz == 8 || this.tableData[i].bz == 10) {
      //       this.tableData[i].bz = '保留';
      //     } else if (this.tableData[i].bz == 3) {
      //       this.tableData[i].bz = '出库';
      //     } else if (this.tableData[i].bz == 5) {
      //       this.tableData[i].bz = '地方仓库';
      //     } else if (this.tableData[i].bz == 7) {
      //       this.tableData[i].bz = '客户仓库';
      //     } else if (this.tableData[i].bz == 9) {
      //       this.tableData[i].bz = '故障';
      //     } else if (this.tableData[i].bz == 11) {
      //       this.tableData[i].bz = '正常运行';
      //     } else {
      //       this.tableData[i].bz = '被删除';
      //     }

      //     // 定时器数量
      //     // this.tableData[i].timer = this.tableData[i].timer + '个';
      //     // 设置状态
      //     if (this.tableData[i].btnstatu == '01') {
      //       this.tableData[i].btnstatu = '已设';
      //     } else if (this.tableData[i].btnstatu == '00') {
      //       this.tableData[i].btnstatu = '未设';
      //     } else {
      //       this.tableData[i].btnstatu = '- -';
      //     }
      //     // 心跳时间
      //     this.tableData[i].heartime = this.tableData[i].heartime ? this.tableData[i].heartime + 's' : '- -';
      //     // 能否使用
      //     if (this.tableData[i].neng == '01') {
      //       this.tableData[i].neng = '使能'
      //     } else if (this.tableData[i].neng == '00') {
      //       this.tableData[i].neng = '不使能'
      //     } else {
      //       this.tableData[i].neng = '- -'
      //     }
      //     // 激活时间
      //     this.tableData[i].jihuo = new Date(
      //       this.tableData[i].jihuo * 1000
      //     ).Format("yy-MM-dd hh:mm:ss");
      //   }
      // });

    },
    // 重置
    resetForm1(formName) {
      this.$refs[formName].resetFields();
      this.getList(1);
    },
    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.getList(val);
    },
  },
  mounted() {
    this.$refs.table.$el.style.width = '100%'
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 69;
  },
  created() {
    this.getList(1);
    this.getOptions();
  }
};
</script>
  
 <style lang="less" scoped>
.electricBoxInfo .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}
.electricBoxInfo {
  overflow: hidden;
  height: 100%;
  .el-header {
    // background: #1d3278;
    // margin: 10px 0;
    background: #fff;
    width: 99%;
    margin: 10px auto;
    .el-form {
      text-align: left;
      margin-top: 10px;
      .el-form-item {
        float: left;
        font-weight: bold;
      }
      .el-button {
        padding: 9px 20px;
        margin-top: 3px;
        float: right;
        border: none;
        // background-image: linear-gradient(to right, #32a581, #158c86);
        background: #1478c5;
      }
      // .el-form-item /deep/ .el-form-item__label {
      //   color: #ccc !important;
      // }
      .dianxiang {
        width: 360px;

        .el-select {
          width: 100%;
        }
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
    .oo2 {
      font-size: 20px;
      vertical-align: middle;
      margin: -2px 5px 0 5px;
      color: #f56c6c;
    }
    .oo1 {
      font-size: 20px;
      vertical-align: middle;
      margin: -2px 5px 0 5px;
      color: #008080;
    }
    .el-icon-edit,
    .el-icon-warning-outline {
      cursor: pointer;
    }
    .el-icon-edit:hover,
    .el-icon-warning-outline:hover {
      color: teal;
    }

    .dialog-footer {
      .el-button:nth-of-type(2) {
        background: #1478c5;
      }
    }

    .el-form-item /deep/ .el-input__inner {
      // color: #ccc;
      // border: 1px solid #47d;
      background: #e4e4e4;
      border: none;
      // border-radius: 0;
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
    // .el-form-item /deep/ .el-form-item__label {
    //   color: #ccc;
    // }
    // .el-input /deep/ .el-input__inner {
    //   color: #ccc;
    //   background: #22366d;
    //   border: 1px solid #47d;
    // }
  }
  .el-footer {
  }
}
</style>
  