<template>
  <!-- 系统管理 - 电箱计数 - 已计数列表 -->
  <div class="electricBoxCount">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <div class="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>能耗分析</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/electricBoxCount' }">回路计数</el-breadcrumb-item>
            <!-- <el-breadcrumb-item :to="{ path: '/selectedlist' }">已计数列表</el-breadcrumb-item> -->
          </el-breadcrumb>
        </div>
        <el-button
          type="primary"
          size="small"
          @click="gotocount"
        >回路计数</el-button>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div class="content">

          <!-- <div class="elebox">

            <el-form
              ref="form"
              :model="form"
              label-width="100px"
              label-position="left"
            >
              <el-form-item
                label="选择电箱"
                prop="selects1"
              >
                <el-select
                  v-model="form.selects1"
                  filterable
                  placeholder="请选择电箱名称"
                >
                  <el-option
                    v-for="(item,index) in eletableData"
                    :label="'['+getString1(hexCharCodeToStr(item.nid))+']' + item.n_name"
                    :value="item.nid"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-button
                type="primary"
                size="small"
                class="topbtn"
              >搜 索</el-button>

              <el-button
                type="primary"
                size="small"
                class="topbtn"
                @click="getlines"
              >确 定</el-button>
            </el-form>

            <div class="radiogroup">
              <el-radio-group v-model="selectData">
                <template v-for="(item,index) in eletableData">
                  <el-radio
                    :key="index"
                    :label="item"
                  >{{item.n_name}}</el-radio>
                </template>
              </el-radio-group>
            </div>

          </div>

          <div class="linebox">
            <p class="headtext">选择回路
              <el-button
                type="primary"
                size="small"
                class="topbtn"
                @click="awitSubmit"
                :disabled="selectionBoxCount.length>0?false:true"
              >确定</el-button>
            </p>
            <el-table
              ref="multipleTable1"
              :data="linetableData"
              tooltip-effect="dark"
              style="width: 98%;margin:0 auto"
              stripe
              :max-height="tableHeight"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                align="center"
                min-width="50"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                prop="num"
                label="序号"
                align="center"
                min-width="50"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="线路名称"
                align="center"
                min-width="100"
              ></el-table-column>

              <el-table-column
                prop="nid"
                show-overflow-tooltip
                label="电箱号"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <span>{{ hexCharCodeToStr(scope.row.nid) }}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="mid"
                show-overflow-tooltip
                label="线路编号"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <span>{{ '线路' + scope.row.mid }}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="local"
                show-overflow-tooltip
                label="安装地址"
                align="center"
                min-width="120"
              ></el-table-column>
            </el-table>
          </div> -->

          <div class="selebox">
            <p class="headtext">已选回路计数
              <el-button
                type="primary"
                size="small"
                style="float: right;margin-bottom: 10px; background: #1478c5;"
                @click="determineAdd"
              >确定</el-button>
            </p>

            <el-table
              ref="multipleTable1"
              :data="sureData1"
              tooltip-effect="dark"
              style="width: 98%;margin: 0 auto"
              stripe
              :max-height="tableHeight"
            >
              <el-table-column
                prop="num"
                label="序号"
                align="center"
                min-width="50"
                show-overflow-tooltip
              ></el-table-column>

              <el-table-column
                prop="nid"
                show-overflow-tooltip
                label="电箱名称"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.n_name }}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="线路名称"
                align="center"
                min-width="100"
              ></el-table-column>

              <el-table-column
                prop="mid"
                show-overflow-tooltip
                label="线路编号"
                align="center"
                min-width="90"
              >
                <template slot-scope="scope">
                  <span>{{ '线路' + scope.row.mid }}</span>
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
                    @click="deleteRow(scope.$index, scope.row)"
                    type="text"
                    size="small"
                    style="color:#1478c5"
                  >移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <p style="color:#606266;margin-top:20px">共计：{{sureData1?sureData1.length+"条":"0条"}}</p>
          </div>
        </div>
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
  name: "electricBoxCount",
  components: {
    copyright
  },
  data() {
    return {
      tableHeight: '630',

      // 检索
      form: {
        selects1: "", // 设备
      },

      // 选择的电箱
      selectData: {},

      // 默认打开
      activeName: '',

      // 已选址线路中转
      sureData: [],
      // 已选线路
      sureData1: [],

      // 电箱列表数据
      eletableData: [],
      // 线路列表数据
      linetableData: [],
      // 已选择电箱数据
      multipleSelection: [],

      // 已选电箱计数
      selectionBoxCount: [],
      // 删除 - 已选电箱计数
      selectionBoxCountData: [],

      he: []
    };
  },
  methods: {
    // 备注：cellClass()方法主要给复选框那一列添加 类名为 ‘disabledCheck’
    cellClass(row) {
      if (row.columnIndex === 0) {
        return 'disabledCheck'
      }
    },

    // 获取线路列表
    getList(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/device/getallHwUser";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.selectData.nid,
          page: 1,
          size: 37,
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        // this.tableData = res.data.data;
        this.linetableData = res.data.data
        // res.data.data.forEach(val => {
        //   this.linetableData.push(JSON.parse(val))
        // })

        for (let i = 0; i < this.linetableData.length; i++) {
          // 电箱号
          // this.linetableData[i].nid = this.hexCharCodeToStr(this.linetableData[i].nid);
          // 线路类型
          if (this.linetableData[i].tt == '0') {
            this.linetableData[i].tt = '[F]总路单相';
          } else if (this.linetableData[i].tt == '1') {
            this.linetableData[i].tt = '[F]总路三相';
          } else if (this.linetableData[i].tt == '10') {
            this.linetableData[i].tt = '[F]支路单相';
          } else if (this.linetableData[i].tt == '11') {
            this.linetableData[i].tt = '[F]支路三相';
          } else if (this.linetableData[i].tt == '80') {
            this.linetableData[i].tt = '[T]总路单相';
          } else if (this.linetableData[i].tt == '81') {
            this.linetableData[i].tt = '[T]总路三相';
          } else if (this.linetableData[i].tt == '90') {
            this.linetableData[i].tt = '[T]支路单相';
          } else {
            this.linetableData[i].tt = '[T]支路三相';
          }
          this.linetableData[i].num = i + 1
          this.linetableData[i].nid = this.selectData.nid
          // this.linetableData[i].aa = parseInt(this.linetableData[i].aa, 16)
        }
      });
    },
    // 初始化获取下拉数据 - 所有电箱
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
        this.eletableData = res.data.data
        // this.getList(1)

        for (let i = 0; i < this.eletableData.length; i++) {
          this.eletableData[i].num = i + 1
        }
      });
    },

    // 表格的选中 可以获得当前选中的数据
    selectionChange(val) {
      // 将选中的数据存储起来
      this.selectData = val[0]
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(val.pop());
      }
      // console.log(this.selectData)
    },

    // 确认是否选择电箱
    getlines() {
      this.$confirm('请确认是否对此电箱下线路进行计数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.selectData.nid) {
          this.getList(1)
        } else {
          this.$message({
            type: 'warning',
            message: '请选择电箱'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    // 进入线路计数页面
    gotocount() {
      this.$router.push({ path: '/electricBoxCount' })
    },

    // 是否将设备放入待计数区
    awitSubmit() {
      this.$confirm('是否将设备放入待计数区', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectionBoxCount.forEach(value => {
          this.sureData1.forEach(val => {
            this.multipleSelection.push(val)
          })
          this.multipleSelection.push(value)
        })
        this.$store.commit("setcountData", this.multipleSelection)

        this.sureData = this.$store.state.countData
        this.sureData1 = []
        this.sureData.forEach(val => {
          this.sureData1.push(val)
        })

        for (let i = 0; i < this.sureData1.length; i++) {
          this.sureData1[i].num = i + 1
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
      // console.log(this.$store.state.countData)

      // console.log(this.sureData)
    },

    // 移除待计数区设备
    deleteRow(index, row) {
      // console.log(index, row)
      this.$confirm('此操作将移除线路计数?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sureData1.splice(index, 1)
        // console.log(this.sureData1)
        this.$message({
          type: 'success',
          message: '移除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        });
      });
    },

    // 初始化获取 - 已选电箱计数
    getSelectionBoxCount(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/device/totalAaList";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          gid: localStorage.getItem("gid"),
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res.data.data)

        if (res.data.code == 705) {
          this.$message.warning("您还未选择线路计数!");
          // this.sureData1 = []
        } else {
          // this.sureData1 = res.data.data
          res.data.data.forEach(val => {
            this.sureData1.push(val)
          })

          this.sureData = this.$store.state.countData
          this.sureData.forEach(val => {
            this.sureData1.push(val)
          })

          // for (let j = 0; j < this.sureData1.length; j++) {
          //   if (this.sureData1[j] == null) {
          //     this.sureData1.splice(j, 2)
          //   }
          // }

          for (let i = 0; i < this.sureData1.length; i++) {
            if (this.sureData1[i] == null) {
              this.sureData1.splice(i, 2)
            }
            this.sureData1[i].num = i + 1
            for (let j = i + 1; j < this.sureData1.length; j++) {
              if (this.sureData1[i].nid == this.sureData1[j].nid && this.sureData1[i].mid == this.sureData1[j].mid) {
                this.sureData1.splice(j, 1)
              }
            }
          }
        }
      });
    },

    // 列表选择 - √
    handleSelectionChange(val) {
      // let a = new Set(this.zlist);
      // let b = new Set(val);
      // let he = new Set([...b].filter(x => !a.has(x)));
      // this.multipleSelection = Array.from(he)

      this.selectionBoxCount = val

      // console.log(this.multipleSelection)
    },

    // 点击 - 确定添加电箱计数
    determineAdd() {
      this.$confirm("是否把已选择的线路加入线路计数?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.sureData1.length > 0) {
          let arrId = [];
          for (let i = 0; i < this.sureData1.length; i++) {
            arrId.push(this.sureData1[i].nid + '-' + this.sureData1[i].mid);
          }
          let arrIdString = this.arrToString(arrId);

          let username = localStorage.getItem("username");
          let uid = localStorage.getItem(username + 'uid');
          let type = "post";
          let url = this.urlb + "/api3/device/setTotalAa";
          let data = {
            data: {
              uid: uid,
              // uid: localStorage.getItem("uid"),
              gid: localStorage.getItem("gid"),
              dto: arrIdString
            }
          };
          this.myAjax(type, url, data, res => {
            // console.log(res)
            if (res.data.code == 500) {
              let _this = this;
              _this.$message.success("添加成功!...3秒后刷新更新数据,如操作成功没有刷新数据请手动刷新");
              setTimeout(() => {
                // _this.getList(1);
                _this.getSelectionBoxCount();
              }, 3000)
            } else {
              this.$message.warning("可是出现了重复,添加失败!");
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "请选择线路"
          });
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
    },

  },

  computed: {},
  mounted() {
    // this.$refs.multipleTable.$el.style.width = '99.99%'
    // this.$refs.multipleTable1.$el.style.width = '99.99%'

    // this.tableHeight = window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 106;
    this.tableHeight = window.innerHeight - this.$refs.multipleTable1.$el.offsetTop - 106;
  },
  created() {
    this.getOptions(1);
    this.getSelectionBoxCount();

    // console.log(this.$store.state.countData)
    // console.log(this.$route.query)

    // if (this.$route.params.a == 1) {

    //   this.sureData = this.$store.state.countData
    //   this.sureData1 = []
    //   this.sureData.forEach(val => {
    //     this.sureData1.push(val)
    //   })

    //   for (let i = 0; i < this.sureData1.length; i++) {
    //     this.sureData1[i].num = i + 1
    //     for (let j = i + 1; j < this.sureData1.length; j++) {
    //       if (this.sureData1[i].nid == this.sureData1[j].nid && this.sureData1[i].mid == this.sureData1[j].mid) {
    //         this.sureData1.splice(j, 1)
    //       }
    //     }
    //   }
    // } else {
    //   this.getSelectionBoxCount();
    // }

  }
};
</script>
  
 <style lang="less" scoped>
.electricBoxCount .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}
.electricBoxCount /deep/ .el-dialog__body {
  padding-right: 65px;
}
.electricBoxCount {
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
      border: none;
      float: right;
      margin-top: 15px;
      background: #1478c5;
    }
    .bread {
      display: inline-block;
      float: left;
      margin-top: 22px;
      .el-breadcrumb /deep/ .el-breadcrumb__inner {
        color: #212121;
      }
      .el-breadcrumb /deep/ .el-breadcrumb__item:last-of-type {
        .el-breadcrumb__inner {
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    .el-form {
      display: flex;
      .el-form-item {
        float: left;
      }
      .el-button {
        height: 33px;
        margin-top: 4px;
      }
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
    // text-align: center;
    padding: 0;
    height: 100%;
    .content {
      width: 100%;
      // display: flex;
      // justify-content: space-around;
      .headtext {
        color: #606266;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
        padding: 22px 20px 10px 20px;
      }
      .el-form {
        display: flex;
        .el-form-item {
          // float: left;
          font-weight: bold;
        }
        .el-button {
          height: 33px;
          margin-top: 4px;
          border: none;
          background-image: linear-gradient(to right, #32a581, #158c86);
        }
        .el-button:first-of-type {
          margin-left: 20px;
        }
        .dianxiang {
          width: 360px;
          .el-select {
            width: 100%;
          }
        }
      }
    }
    // .elebox,
    // .linebox,
    // .selebox {
    //   width: 32%;
    //   height: 60px;
    // }
    .linebox {
      width: 98%;
      margin: 10px auto 0 auto;
      background: #fff;
      text-align: left;
      padding-bottom: 20px;
      box-sizing: border-box;
      .topbtn {
        margin-left: 10px;
        border: none;
        background-image: linear-gradient(to right, #32a581, #158c86);
      }
    }

    .elebox {
      text-align: left;
      width: 98%;
      // height: 320px;
      max-height: 270px;
      background: #fff;
      margin: 0 auto;
      padding: 20px 20px;
      box-sizing: border-box;
      .radiogroup {
        width: 100%;
        height: 80%;
        overflow: auto;
      }
      .radiogroup /deep/ .el-radio__inner {
        border-color: #32a581;
      }
    }

    /* 去掉全选按钮 */
    .elebox /deep/ .el-table .disabledCheck .cell .el-checkbox__inner {
      display: none !important;
    }

    .elebox /deep/ .el-table .disabledCheck .cell::before {
      content: "选择";
      text-align: center;
      // line-height: 37px;
    }

    .selebox {
      .el-collapse {
        border-color: #5b93ff;
        border-left: 1px solid #5b93ff;
        border-right: 1px solid #5b93ff;
        .el-collapse-item {
          text-align: left;
        }
        .el-collapse-item /deep/ .el-collapse-item__header {
          color: #ccc;
          background: rgba(0, 0, 0, 0.2);
          border-bottom-color: #5b93ff;
        }
        .el-collapse-item /deep/ .el-collapse-item__content {
          color: #ccc;
          padding: 0 10px;
          box-sizing: border-box;
          background: #27428e;
        }
        .el-collapse-item /deep/ .el-collapse-item__wrap {
          border-bottom-color: #5b93ff;
        }
      }
    }
  }
  .el-footer {
  }
}
</style>
  