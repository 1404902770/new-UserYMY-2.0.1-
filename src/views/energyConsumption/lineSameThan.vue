<template>
  <!-- 用电监测 - 线路同比分析 -->
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
            label="年度"
            prop="dateof"
            style="width:230px"
          >
            <el-date-picker
              v-model="form.dateof"
              type="year"
              value-format='yyyy-MM-dd'
              placeholder="选择日期"
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
            label="线路名称"
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

          <div>
            <el-button
              type="primary"
              @click="getOnedx"
              style="margin-left:10px;"
            ><i class="el-icon-search"></i> 查 询</el-button>

            <el-button
              type="primary"
              @click="getYestoday"
              style="margin-left:10px;"
            ><i class="el-icon-arrow-left"></i> 上一年</el-button>

            <el-button
              type="primary"
              @click="getNextday"
              style="margin-left:10px;"
            >下一年<i class="el-icon-arrow-right"></i></el-button>

            <!-- <el-button
              size="medium"
              type="primary"
              class="three"
            >导 出</el-button> -->

          </div>
        </el-form>

      </el-header>
      <!-- 中部 -->
      <el-main>

        <!-- 同比 -->
        <el-table
          :data="tableData"
          border
          max-height="435"
          style="width: 99%;margin:0 auto"
        >
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="月份"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="1"
            show-overflow-tooltip
            label="1月"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="2"
            show-overflow-tooltip
            label="2月"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="3"
            show-overflow-tooltip
            label="3月"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="4"
            show-overflow-tooltip
            label="4月"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="5"
            show-overflow-tooltip
            label="5月"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="6"
            show-overflow-tooltip
            label="6月"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="7"
            show-overflow-tooltip
            label="7月"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="8"
            show-overflow-tooltip
            label="8月"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="9"
            show-overflow-tooltip
            label="9月"
            align="center"
            min-width="60"
          ></el-table-column>

          <el-table-column
            prop="10"
            show-overflow-tooltip
            label="10月"
            align="center"
            min-width="60"
          ></el-table-column>

          <el-table-column
            prop="11"
            show-overflow-tooltip
            label="11月"
            align="center"
            min-width="60"
          ></el-table-column>

          <el-table-column
            prop="12"
            show-overflow-tooltip
            label="12月"
            align="center"
            min-width="60"
          ></el-table-column>

        </el-table>

        <div id="echarts1"></div>

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
import $ from "jquery";

export default {
  name: "electricBoxInfo",
  components: {
    copyright
  },
  data() {
    return {
      // 检索
      form: {
        dateof: "",
        region: "",
        linename: ""
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 列表数据
      tableData: [],
    };
  },
  methods: {

    // 初始化获取列表
    getList(page) {
      let type = "post";
      let url = this.urlb + "/api3/SourceData/GetSameAaData";
      let data = {
        data: {
          dt: "2020", //年份
          nid: this.form.region,  //电箱id 可选，当不传该参数时为 所有电箱之和
          aa: this.form.linename
        }
      };
      this.myAjax(type, url, data, res => {
        console.log(res)
        // console.log(Object.values(res.data.data[0]))
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

        // this.form.linename = this.options1[0].mid
      });
    },

    // 线路同比图
    getStudent1() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts1"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        title: {
          text: '某地区蒸发量和降水量',
          subtext: '纯属虚构',
          x: 10,
          y: 10,
          textStyle: { //主标题文本样式
            color: "#ccc",
            fontSize: "14"
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['蒸发量', '降水量']
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: {
              lineStyle: {
                color: '#ccc',
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ccc',
              }
            },
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
              data: [
                { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
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
      } else {
        this.getList(1)
      }
    },

    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.getList(val);
    },
  },
  mounted() {
    this.getStudent1()
  },
  created() {
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
    // background: #1d3278;
    // margin: 10px 0;
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
      }
      .el-form-item /deep/ .el-form-item__label,
      .el-form-item /deep/ .el-checkbox__label {
        color: #ccc !important;
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

      .el-form-item /deep/ .el-year-table td .cell,
      .el-form-item /deep/ .el-form-item__label {
        color: #ccc !important;
      }
      .el-form-item /deep/ .el-input--suffix .el-input__inner {
        color: #ccc;
        border: 1px solid #47d;
        background: transparent;
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
  .el-header /deep/ .el-tabs__item {
    color: #ccc;
  }
  .el-header /deep/ .is-active {
    color: teal;
  }

  .el-main {
    color: #333;
    text-align: center;
    padding: 0;
    height: 100%;

    #echarts1 {
      width: 100%;
      height: 300px;
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
  