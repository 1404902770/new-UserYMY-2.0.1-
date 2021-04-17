<template>
  <!-- 用电监测 - 极值日报 -->
  <div class="electricBoxInfo">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <el-form
          ref="form"
          :model="form"
          label-width="90px"
        >
          <el-form-item
            label="选择日期"
            prop="dateof"
            style="width:430px;"
          >
            <el-date-picker
              v-model="form.dateof"
              type="daterange"
              align="right"
              unlink-panels
              value-format='timestamp'
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              popper-class="datetime"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item
            label="电箱名称"
            prop="region"
            class="dianxiang"
          >
            <el-select
              v-model="form.region"
              filterable
              placeholder="全部"
              @change="getOptions1"
            >
              <el-option
                v-for="(item,index) in options"
                :label="'['+getString1(hexCharCodeToStr(item.nid))+'] ' + item.n_name + ' [' + item.n_local +']'"
                :value="item.nid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="回路名称"
            prop="linename"
            style="width:240px"
            class="dianxiang"
          >
            <el-select
              v-model="form.linename"
              filterable
              placeholder="全部"
            >
              <el-option
                v-for="(item,index) in options1"
                :label="'['+item.mid+'] ' + item.name + ' [' + item.local +']'"
                :value="item.mid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="电力类别"
            prop="eletype"
            style="width:240px"
            class="dianxiang"
          >
            <el-select
              v-model="form.eletype"
              filterable
              placeholder="全部"
              @change="tabeletype"
            >
              <el-option
                label="电流"
                value="aa"
              ></el-option>
              <el-option
                label="电压"
                value="vv"
              ></el-option>
              <el-option
                label="有功功率"
                value="kk"
              ></el-option>
              <el-option
                label="无功功率"
                value="kv"
              ></el-option>
              <el-option
                label="温度"
                value="tt"
              ></el-option>
              <el-option
                label="功率因数"
                value="pf"
              ></el-option>
              <el-option
                label="漏电电流"
                value="ld"
              ></el-option>
            </el-select>
          </el-form-item>

          <div style="display: flex;height: 37px;">
            <el-button
              type="primary"
              @click="getOnedx"
              style="margin-left:10px;"
            ><i class="el-icon-search"></i> 查 询</el-button>

            <!-- <el-button
              type="primary"
              @click="getYestoday"
              style="margin-left:10px;"
            ><i class="el-icon-arrow-left"></i> 上一日</el-button>

            <el-button
              type="primary"
              @click="getNextday"
              style="margin-left:10px;"
            >下一日<i class="el-icon-arrow-right"></i></el-button> -->

          </div>
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>

        <div class="maincontent">
          <!-- 列表 -->
          <el-table
            :data="tableData"
            border
            stripe
            ref="table"
            max-height="700"
            style="width: 99%;margin:0 auto"
          >
            <!-- <el-table-column
              prop="code"
              show-overflow-tooltip
              label="线路名称"
              align="center"
              min-width="60"
            ></el-table-column> -->

            <el-table-column
              prop="time"
              show-overflow-tooltip
              label="日期"
              align="center"
              min-width="100"
            ></el-table-column>

            <!-- :label="form.eletype!=''&&linetype.type ==1?form.eletype=='tt'?'温度':form.eletype=='ld'?'漏电电流':eletype:'A相'" -->
            <el-table-column
              align="center"
              :label="form.eletype!=''&&linetype.type ==1?eletype:'A相'"
            >

              <el-table-column
                label="最大值"
                align="center"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px;color:#FF9900;font-weight:bold">{{ scope.row.bbb1.max ==null ? '--':scope.row.bbb1.max.bb1 }}</span>
                </template>
              </el-table-column>

              <!-- <el-table-column
                prop="mozu"
                show-overflow-tooltip
                label="最大值"
                align="center"
                min-width="100"
              ></el-table-column> -->

              <el-table-column
                label="时间"
                align="center"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.bbb1.max ==null ? '--':new Date(scope.row.bbb1.max.time*1000).Format('yy-MM-dd hh:mm') }}</span>
                </template>
              </el-table-column>

              <!-- <el-table-column
                prop="mzname"
                show-overflow-tooltip
                label="时间"
                align="center"
                min-width="100"
              ></el-table-column> -->

              <el-table-column
                label="最小值"
                align="center"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px;color:#1478c5;font-weight:bold">{{ scope.row.bbb1.min == null ?'--':scope.row.bbb1.min.bb1 }}</span>
                </template>
              </el-table-column>

              <!-- <el-table-column
                prop="fen"
                show-overflow-tooltip
                label="最小值"
                align="center"
                min-width="60"
              ></el-table-column> -->

              <el-table-column
                label="时间"
                align="center"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.bbb1.min ==null ? '--':new Date(scope.row.bbb1.min.time*1000).Format('yy-MM-dd hh:mm') }}</span>
                </template>
              </el-table-column>

              <!-- <el-table-column
                prop="txfs"
                show-overflow-tooltip
                label="时间"
                align="center"
                min-width="60"
              ></el-table-column> -->

            </el-table-column>

            <el-table-column
              align="center"
              label="B相"
              v-if="selecttype!=''?selecttype!='tt'&&selecttype!='ld'?linetype.type==3?true:false:false:true"
            >

              <el-table-column
                label="最大值"
                align="center"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px;color:#FF9900;font-weight:bold">{{ scope.row.bbb2.max == null? '--':scope.row.bbb2.max.bb2 }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="时间"
                align="center"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.bbb2.max == null? '--':new Date(scope.row.bbb2.max.time*1000).Format('yy-MM-dd hh:mm') }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="最小值"
                align="center"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px;color:#1478c5;font-weight:bold">{{ scope.row.bbb2.min == null? '--':scope.row.bbb2.min.bb2 }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="时间"
                align="center"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{  scope.row.bbb2.min == null? '--':new Date(scope.row.bbb2.min.time*1000).Format('yy-MM-dd hh:mm') }}</span>
                </template>
              </el-table-column>

            </el-table-column>

            <el-table-column
              align="center"
              label="C相"
              v-if="selecttype!=''?selecttype!='tt'&&selecttype!='ld'?linetype.type==3?true:false:false:true"
            >

              <el-table-column
                label="最大值"
                align="center"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px;color:#FF9900;font-weight:bold">{{ scope.row.bbb3.max == null ? '--':scope.row.bbb3.max.bb3 }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="时间"
                align="center"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.bbb3.max == null ? '--':new Date(scope.row.bbb3.max.time*1000).Format('yy-MM-dd hh:mm') }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="最小值"
                align="center"
                min-width="80"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px;color:#1478c5;font-weight:bold">{{ scope.row.bbb3.min == null ? '--':scope.row.bbb3.min.bb3 }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="时间"
                align="center"
                min-width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.bbb3.min == null ? '--':new Date(scope.row.bbb3.min.time*1000).Format('yy-MM-dd hh:mm') }}</span>
                </template>
              </el-table-column>

            </el-table-column>

          </el-table>
        </div>

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
import $ from "jquery";

export default {
  name: "electricBoxInfo",
  components: {
    copyright
  },
  data() {
    return {
      // 时间快捷键
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      // 检索
      form: {
        dateof: [],
        region: "",
        eletype: "",
        linename: ""
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 列表数据
      tableData: [],

      eletype: '电流',
      selecttype: '',

      // 线路类型
      linetype: {},

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
      let type = "post";
      let url = this.urlb + "/api3/SourceData/GetExtremeData";
      let data = {
        data: {
          start: this.form.dateof[0] / 1000,
          end: this.form.dateof[1] / 1000,
          nid: this.form.region,
          aa: this.form.linename,
          type: this.form.eletype  //vv 电压 aa 电流 kk 有功 kv 无功 pf 功率因数 tt 温度
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.$refs.table.$el.style.width = '99%'

        this.tableData = res.data.data;
        this.linetype = res.data.type
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
        this.form.region = this.options[0].nid
        this.getOptions1(this.options[0].nid)
      });
    },
    // 获取下拉数据 - 电箱下线路
    getOptions1(val) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/EnergyData/getNetedMachedList";
      let data = {
        data: {
          nid: val,
          uid: uid
          // uid: localStorage.getItem('uid')
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.options1 = res.data.data;

        this.form.linename = this.options1[0].mid
        this.getList(1)
      });
    },

    // 定位电箱号
    getOnedx() {
      if (this.form.dateof.length == 0) {
        this.$message({
          showClose: true,
          message: '请选择时间范围',
          type: 'warning'
        });
      } else if (this.form.region == "") {
        this.$message({
          showClose: true,
          message: '请选择电箱',
          type: 'warning'
        });
      } else if (this.form.linename == "") {
        this.$message({
          showClose: true,
          message: '请选择线路',
          type: 'warning'
        });
      } else if (this.form.eletype == "") {
        this.$message({
          showClose: true,
          message: '请选择电力类别',
          type: 'warning'
        });
      } else {
        this.getList(1)
        // let type = this.form.eletype
        // this.selecttype = type

        let type = this.form.eletype
        switch (type) {
          case 'aa': this.eletype = "电流"
            break;
          case 'vv': this.eletype = "电压"
            break;
          case 'tt': this.eletype = "温度"
            break;
          case 'pf': this.eletype = "功率因数"
            break;
          case 'ld': this.eletype = "漏电电流"
            break;
          case 'kk': this.eletype = "有功功率"
            break;
          case 'kv': this.eletype = "无功功率"
            break;
        }
        this.selecttype = sessionStorage.getItem('type')
      }
    },

    tabeletype() {
      // this.selecttype = ''
      sessionStorage.setItem('type', this.form.eletype)
    },

    // 获取当前日期和前一天
    setdate() {
      var timestamp = (new Date()).getTime();

      // console.log(timestamp);//打印当前时间戳
      this.form.dateof.push(timestamp - 24 * 60 * 60 * 1000)
      this.form.dateof.push(timestamp)
      // console.log(timestamp - 24 * 60 * 60 * 1000);
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
    this.$refs.table.$el.style.width = '99%'

    this.selecttype = sessionStorage.getItem('type')
  },
  created() {
    this.form.eletype = "aa"
    // this.getList(1);
    this.setdate()
    this.getOptions();
  },
  beforeUpdate() {
    this.$nextTick(() => { //在数据加载完，重新渲染表格
      this.$refs['table'].doLayout();
    })
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
    background: #fff;
    width: 99%;
    margin: 10px auto;
    // background: #1d3278;
    // margin: 10px 0;
    .el-form {
      text-align: left;
      margin-top: 10px;
      display: flex;
      .el-form-item {
        // float: left;
      }
      .el-button {
        padding: 9px 20px;
        margin-top: 3px;
        // float: right;
        border: none;
        // border-radius: 0;
        background: #1478c5;
        // background-image: linear-gradient(to right, #32a581, #158c86);
      }
      .el-form-item /deep/ .el-form-item__label,
      .el-form-item /deep/ .el-checkbox__label {
        font-weight: bold;
        // color: #ccc !important;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        // width: 150px;
        background: #e4e4e4;
        border: none;
        // border-radius: 0;
      }
      // .el-date-editor /deep/.el-range-separator {
      //   color: #ccc;
      // }
      .el-date-editor /deep/.el-range-input {
        // color: #ccc;
        background: #e4e4e4;
      }
      .dianxiang {
        width: 315px;

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
    .echarts {
      width: 100%;
      #echart {
        width: 100%;
        height: 690px;
      }
    }

    .one {
      background: url(../../../public/static/images/tubiao.png) no-repeat 12px
        6px;
      background-size: 21px 21px;
      padding-left: 38px;
      border: 1px solid #47d;
    }
    .two {
      background: url(../../../public/static/images/shuju.png) no-repeat 12px
        6px;
      background-size: 19px 19px;
      padding-left: 38px;
      border: 1px solid #47d;
    }
    .three {
      background: url(../../../public/static/images/daochu.png) no-repeat 12px
        6px;
      background-size: 21px 21px;
      padding-left: 38px;
      border: 1px solid #47d;
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
    .el-icon-edit {
      cursor: pointer;
    }
    .el-icon-edit:hover {
      color: teal;
    }
  }
  .el-footer {
  }
}
</style>
  