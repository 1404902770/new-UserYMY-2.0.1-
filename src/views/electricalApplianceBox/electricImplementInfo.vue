<template>
  <!-- 设备信息 - 线路信息 -->
  <div class="electricImplementInfo">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item
            label="电箱名称"
            prop="region"
            class="dianxiang"
          >
            <el-select
              v-model="form.region"
              filterable
              placeholder="全部"
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
          >查询</el-button>

          <!-- <el-button
            @click="resetForm1('form')"
            style="float:left;"
          >重置 / 刷新</el-button> -->
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div class="maincontent">
          <!-- 列表 -->
          <el-table
            :data="tableData"
            stripe
            max-height="735"
            style="width: 100%;margin:0 auto"
          >

            <el-table-column
              prop="mid"
              show-overflow-tooltip
              label="回路编号"
              align="center"
              min-width="50"
            ></el-table-column>

            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="回路名称"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="local"
              show-overflow-tooltip
              label="安装地址"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="type"
              show-overflow-tooltip
              label="回路类型"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="xian"
              show-overflow-tooltip
              label="线径(mm²)"
              align="center"
              min-width="90"
            ></el-table-column>

            <!-- <el-table-column
              prop="statu"
              show-overflow-tooltip
              label="状态"
              align="center"
              min-width="60"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.statu == 1"
                  style="color:#93F6F6;"
                >在线</span>
                <span
                  v-if="scope.row.statu == 0"
                  style="color:#F56C6C;"
                >离线</span>
              </template>
            </el-table-column>

            <el-table-column
              label="电箱号"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ hexCharCodeToStr(scope.row.nid) }}</span>
              </template>
            </el-table-column> -->

            <el-table-column
              prop="n_name"
              show-overflow-tooltip
              label="电箱名称"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="n_local"
              show-overflow-tooltip
              label="电箱地址"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <!-- <i
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
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 更新线路和地址弹框 -->
        <el-dialog
          :visible.sync="dialogFormVisible"
          width="40%"
          title="更新回路名称和地址"
          @close='closeupdate'
          :close-on-click-modal="false"
        >
          <el-form :model="form">
            <el-form-item
              label="回路名称"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="回路地址"
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
      </el-footer>
      <!-- 底部版权 -->
      <copyright></copyright>
    </el-container>
  </div>
</template>
  
  <script>
import copyright from "../../components/copyright";
export default {
  name: "electricImplementInfo",
  components: {
    copyright
  },
  data() {
    return {
      // 检索/弹框表单
      form: {
        region: "",
        name: '',
        address: ''
      },
      // 获取所有设备
      options: [],
      // 列表数据
      tableData: [],
      // 弹框
      dialogFormVisible: false,
      formLabelWidth: '120px',

      // 要修改的电箱
      nid: '',
      // 修改的线路
      min: '',
    };
  },
  methods: {
    // 初始化获取列表
    getList(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urla + "/api3/device/getallHwUser";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.form.region,
          page: 1,
          size: 13,
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableData = res.data.data;
        // this.tableData = []
        // res.data.data.forEach(val => {
        //   this.tableData.push(JSON.parse(val))
        // })

        for (let i = 0; i < this.tableData.length; i++) {
          // 电箱号
          // this.tableData[i].nid = this.hexCharCodeToStr(this.tableData[i].nid);
          // 线路类型
          if (this.tableData[i].type == '0') {
            this.tableData[i].type = '[F]总路单相';
          } else if (this.tableData[i].type == '1') {
            this.tableData[i].type = '[F]总路三相';
          } else if (this.tableData[i].type == '10') {
            this.tableData[i].type = '[F]支路单相';
          } else if (this.tableData[i].type == '11') {
            this.tableData[i].type = '[F]支路三相';
          } else if (this.tableData[i].type == '80') {
            this.tableData[i].type = '[T]总路单相';
          } else if (this.tableData[i].type == '81') {
            this.tableData[i].type = '[T]总路三相';
          } else if (this.tableData[i].type == '90') {
            this.tableData[i].type = '[T]支路单相';
          } else {
            this.tableData[i].type = '[T]支路三相';
          }

          // this.tableData[i].aa = parseInt(this.tableData[i].aa, 16)
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
        this.options = res.data.data;
        this.form.region = this.options[0].nid
        this.getList(1)
      });
    },

    // 更新线路名字和安装地址按钮
    handleEdit(index, row) {
      // console.log(index, row);
      this.form.name = row.name
      this.form.address = row.local
      this.dialogFormVisible = true
      // this.nid = row.nid
      this.mid = row.mid
    },
    // 提交修改线路名称和地址
    submitForm() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = 'post'
      let url = this.urla + '/api3/EnergyData/upMachedNameAndLocalInfo'
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.form.region,
          aa: this.mid,
          local: this.form.address,
          name: this.form.name,
          lceng: ""  //楼层
        }
      }
      this.myAjax(type, url, data, res => {
        if (res.data.code == 31) {
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

    // 定位电箱号
    getOnedx(val) {
      this.getList(1)
    },
    // 重置
    resetForm1(formName) {
      this.$refs[formName].resetFields();
      this.form.region = this.options[0].mzid
      this.getList(1);
    },
    // 关闭修改电箱和地址
    closeupdate() {
      this.form.name = ''
      this.form.address = ''
    },
    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.getList(val);
    },
  },
  mounted() { },
  created() {
    this.getOptions();

    // this.getList(1);
  }
};
</script>
  
 <style lang="less" scoped>
.electricImplementInfo .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}
.electricImplementInfo {
  overflow: hidden;
  height: 100%;
  .el-header {
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
        // border-radius: 0;
        border: none;
        background: #1478c5;
        // background-image: linear-gradient(to right, #32a581, #158c86);
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
    //   // color: #ccc;
    //   background: #22366d;
    //   border: 1px solid #47d;
    // }
  }
  .el-footer {
  }
}
</style>
  