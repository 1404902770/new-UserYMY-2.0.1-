<template>
  <!-- 能耗分析 - 环比分析 -->
  <div class="electricBoxInfo">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            label="日环比"
            name="first"
          ></el-tab-pane>

          <el-tab-pane
            label="月环比"
            name="third"
          ></el-tab-pane>
        </el-tabs>

      </el-header>
      <!-- 中部 -->
      <el-main>

        <el-form
          ref="form"
          :model="form"
          label-width="90px"
        >
          <el-form-item
            v-show="activeName=='first'?true:false"
            label="选择日期1"
            prop="daydateof"
            style="width:230px"
          >
            <el-date-picker
              v-model="form.daydateof"
              type="date"
              value-format='yyyy-MM-dd'
              placeholder="选择日期"
              popper-class="datetime"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item
            v-show="activeName=='second'?true:false"
            label="选择日期2"
            prop="monthdateof"
            style="width:230px"
          >
            <el-date-picker
              v-model="form.monthdateof"
              type="date"
              value-format='timestamp'
              placeholder="选择日期"
              popper-class="datetime"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item
            v-show="activeName=='third'?true:false"
            label="选择日期3"
            prop="yeardateof"
            style="width:230px"
          >
            <el-date-picker
              v-model="form.yeardateof"
              type="date"
              value-format='timestamp'
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

            <!-- <el-button
              size="medium"
              type="primary"
              class="three"
            >图 表</el-button>

            <el-button
              size="medium"
              type="primary"
              class="three"
            >导 出</el-button> -->
          </div>
        </el-form>

        <!-- 日环比 -->
        <el-table
          v-show="activeName=='first'?true:false"
          :data="tableData"
          border
          max-height="735"
          style="width: 99%;margin:0 auto"
        >
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="线路名称"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="time"
            show-overflow-tooltip
            label="当日能耗"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="dzz"
            show-overflow-tooltip
            label="前一日能耗"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv1"
            show-overflow-tooltip
            label="增加值"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv2"
            show-overflow-tooltip
            label="环比增长率"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv3"
            show-overflow-tooltip
            label="前两日耗能"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="aa1"
            show-overflow-tooltip
            label="增加值"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="aa2"
            show-overflow-tooltip
            label="环比增长率"
            align="center"
            min-width="100"
          ></el-table-column>

        </el-table>

        <!-- 月环比 -->
        <el-table
          v-show="activeName=='third'?true:false"
          :data="tableData"
          border
          max-height="735"
          style="width: 99%;margin:0 auto"
        >
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="线路名称"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="time"
            show-overflow-tooltip
            label="本月能耗"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="dzz"
            show-overflow-tooltip
            label="上月能耗"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv1"
            show-overflow-tooltip
            label="增加值"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv2"
            show-overflow-tooltip
            label="环比增长率"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv3"
            show-overflow-tooltip
            label="上两月耗能"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="aa1"
            show-overflow-tooltip
            label="增加值"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="aa2"
            show-overflow-tooltip
            label="环比增长率"
            align="center"
            min-width="100"
          ></el-table-column>

        </el-table>

        <div
          v-show="activeName=='first'?true:false"
          id="echarts1"
        ></div>
        <div
          v-show="activeName=='third'?true:false"
          id="echarts2"
        ></div>

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
        daydateof: "",
        monthdateof: "",
        yeardateof: "",
        region: "",
        linename: ""
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 列表数据
      tableData: [

      ],

      activeName: 'first',
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      // if (this.activeName == "third") {
      //   this.getListmonth()
      // }
    },

    // 初始化获取列表
    getList(page) {

      let type = "post";
      let url = this.urlb + "/api3/SourceData/GetRingData";
      let data = {
        data: {
          dt: new Date(this.form.daydateof).getTime() / 1000, //日期
          nid: this.form.region,
          aa: this.form.linename,
          type: "day"      //day 日 week 周 month 月
        }
      };
      this.myAjax(type, url, data, res => {
        console.log(res)

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

    // 初始化获取列表
    getListmonth(page) {

      let type = "post";
      let url = this.urlb + "/api3/SourceData/GetRingData";
      let data = {
        data: {
          dt: new Date(this.form.daydateof).getTime() / 1000, //日期
          nid: this.form.region,
          aa: this.form.linename,
          type: "month"      //day 日 week 周 month 月
        }
      };
      this.myAjax(type, url, data, res => {
        console.log(res)

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
        this.getStudent2()
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

    // 日环比
    getStudent1() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts1"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        xAxis: {
          type: 'category',
          data: ['前两日', '昨日', '当日'],
          axisLine: {
            lineStyle: {
              color: '#ccc',
            }
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ccc',
            }
          },
        },
        series: [{
          data: [120, 200, 150],
          type: 'bar',
          showBackground: true,
          barWidth: 60,//柱图宽度
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      });
    },

    // 月环比
    getStudent2() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      setTimeout(() => {

        let student = _this.$echarts.init(document.getElementById("echarts2"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          xAxis: {
            type: 'category',
            data: ['前两月', '上月', '本月'],
            axisLine: {
              lineStyle: {
                color: '#ccc',
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ccc',
              }
            },
          },
          series: [{
            data: [120, 200, 150],
            type: 'bar',
            showBackground: true,
            barWidth: 60,//柱图宽度
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }]
        });
      }, 0);
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
      this.form.daydateof = currentdate
    },

    // 定位电箱号
    getOnedx() {
      if (this.activeName == "third") {
        this.getListmonth()
      } else {
        this.getList(1)
      }
    },

    // 同环比
    goto() {
      this.$router.push({ path: '/compare' })
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

    #echarts1,
    #echarts2 {
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
  