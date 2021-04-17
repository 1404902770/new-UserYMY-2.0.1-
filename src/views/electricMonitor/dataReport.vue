<template>
  <!-- 用电监测 - 数据报表 -->
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
            style="width:230px"
          >
            <el-date-picker
              v-model="form.dateof"
              type="date"
              value-format='yyyy-MM-dd'
              placeholder="选择日期"
              popper-class="datetime"
              :picker-options="pickerOptions"
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
            label="时间间隔"
            prop="interval"
            style="width:240px"
            class="dianxiang"
          >
            <el-select
              v-model="form.interval"
              filterable
              placeholder=""
            >
              <el-option
                label="十五分钟"
                value="15"
              ></el-option>
              <el-option
                label="半小时"
                value="30"
              ></el-option>
              <el-option
                label="一小时"
                value="60"
              ></el-option>
            </el-select>
          </el-form-item>

          <div style="display: flex;height: 37px;">
            <el-button
              type="primary"
              @click="getOnedx"
              style="margin-left:10px;"
            ><i class="el-icon-search"></i> 查 询</el-button>

            <el-button
              type="primary"
              @click="getYestoday"
              style="margin-left:10px;"
            ><i class="el-icon-arrow-left"></i> 上一日</el-button>

            <el-button
              type="primary"
              @click="getNextday"
              style="margin-left:10px;"
              :disabled="form.dateof == benchmark?true:false"
            >下一日<i class="el-icon-arrow-right"></i></el-button>

            <!-- <el-button
              size="medium"
              type="primary"
              class="three"
            >导 出</el-button> -->

            <!-- <el-button
              @click="resetForm1('form')"
              style="background: transparent;color:#fff;border: 1px solid #47d;"
            >重 置</el-button> -->
          </div>
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
            style="width: 99%;margin:0 auto"
          >
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="线路名称"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              prop="time"
              show-overflow-tooltip
              label="采集时间"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="dzz"
              show-overflow-tooltip
              label="Q(kW/h)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="vv1"
              show-overflow-tooltip
              :label="linetype==1?'U(V)':'Ua(V)'"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0].vv2?true:false:false"
              prop="vv2"
              show-overflow-tooltip
              label="Ub(V)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0].vv3?true:false:false"
              prop="vv3"
              show-overflow-tooltip
              label="Uc(V)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="aa1"
              show-overflow-tooltip
              :label="linetype==1?'I(A)':'Ia(A)'"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0].aa2?true:false:false"
              prop="aa2"
              show-overflow-tooltip
              label="Ib(A)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0].aa3?true:false:false"
              prop="aa3"
              show-overflow-tooltip
              label="Ic(A)"
              align="center"
              min-width="100"
            ></el-table-column>

            <!-- <el-table-column
              label="电箱号"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ hexCharCodeToStr(scope.row.mzid) }}</span>
              </template>
            </el-table-column> -->

            <el-table-column
              prop="kk1"
              show-overflow-tooltip
              label="P(kW)"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              prop="kv1"
              show-overflow-tooltip
              label="Q(kVar)"
              align="center"
              min-width="60"
            ></el-table-column>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },

      tableHeight: '735',

      // 检索
      form: {
        dateof: "",
        region: "",
        linename: "",
        interval: "",
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 列表数据
      tableData: [],

      // 日起基准
      benchmark: "",

      linetype: '',

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
      let url = this.urlb + "/api3/SourceData/GetSourceData";
      let data = {
        data: {
          dt: new Date(this.form.dateof).getTime() / 1000, //日期
          tm: this.form.interval,    //时间间隔 分钟
          nid: this.form.region,
          aa: this.form.linename,
          // type: "3"  //线路类型
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.linetype = res.data.type
        this.tableData = res.data.data;
        for (let i = 0; i < this.options1.length; i++) {
          if (this.form.linename == this.options1[i].mid) {
            this.tableData.forEach(val => {
              val.name = this.options1[i].name

              val.time = new Date(
                val.time * 1000
              ).Format('yy-MM-dd hh:mm:ss')
            })
          }
        }

        // this.fenYe.total = res.data.length;
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
        // this.form.region = this.options[0].mzid
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

    // 当前日期
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.form.dateof = currentdate

      this.benchmark = currentdate
    },

    // 下一天
    getNextday() {
      // var today = document.getElementById("lang0").value;

      var t = new Date(Date.parse(this.form.dateof.replace(/-/g, "/")));

      var tm = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1);

      var m = '0' + (tm.getMonth() + 1);
      var d = '0' + tm.getDate()

      // document.getElementById("lang0").value = tm.getFullYear() + '-' + m.substr(m.length - 2) + '-' + d.substr(d.length - 2);
      this.form.dateof = tm.getFullYear() + '-' + m.substr(m.length - 2) + '-' + d.substr(d.length - 2);

      this.getOnedx()
    },

    // 上一天
    getYestoday(date) {
      // var date = document.getElementById("lang0").value;
      // var t = new Date(Date.parse(date.replace(/-/g, "/")));
      var t = new Date(Date.parse(this.form.dateof.replace(/-/g, "/")));

      var yesterday_milliseconds = t.getTime() - 1000 * 60 * 60 * 24;
      var yesterday = new Date();
      yesterday.setTime(yesterday_milliseconds);
      var strYear = yesterday.getFullYear();
      var strDay = yesterday.getDate();
      var strMonth = yesterday.getMonth() + 1;
      if (strMonth < 10) { strMonth = "0" + strMonth; }
      if (strDay < 10) { strDay = "0" + strDay }
      var datastr = strYear + "-" + strMonth + "-" + strDay;
      // document.getElementById("lang0").value = datastr;
      this.form.dateof = datastr;

      this.getOnedx()
    },

    // 定位电箱号
    getOnedx() {
      if (this.form.dateof == "") {
        this.$message({
          showClose: true,
          message: '请选择日期',
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
      } else if (this.form.interval == "") {
        this.$message({
          showClose: true,
          message: '请选择时间间隔',
          type: 'warning'
        });
      } else {
        this.getList(1)
      }
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
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 86;
  },
  created() {
    this.form.interval = "15"
    // this.getList(1);
    this.getOptions();

    this.getNowFormatDate()
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
    .clearfix::after {
      content: "";
      display: block;
      clear: both;
    }
    .el-form {
      text-align: left;
      margin-top: 10px;
      // overflow: hidden;
      display: flex;
      .el-form-item {
        // float: left;
      }
      .el-button {
        padding: 9px 20px;
        margin-top: 3px;
        // float: right;
        // border-radius: 0;
        border: none;
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
        width: 150px;
      }
      .dianxiang {
        width: 315px;

        .el-select {
          width: 100%;
        }
      }
      .three {
        background: url(../../../public/static/images/daochu.png) no-repeat 12px
          6px;
        background-size: 21px 21px;
        padding-left: 38px;
        border: 1px solid #47d;
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
  