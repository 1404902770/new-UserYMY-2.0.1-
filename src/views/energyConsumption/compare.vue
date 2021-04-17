<template>
  <!-- 能耗分析 - 综合能耗 - 日报 - 同环比 -->
  <div class="electricBoxInfo">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <!-- <el-form
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
                :label="'['+getString1(hexCharCodeToStr(item.mzid))+'] ' + item.mzname + ' [' + item.jianzhu +']'"
                :value="item.mzid"
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
            ><i class="el-icon-arrow-left"></i> 上一日</el-button>

            <el-button
              type="primary"
              @click="getNextday"
              style="margin-left:10px;"
            >下一日<i class="el-icon-arrow-right"></i></el-button>

            <el-button
              size="medium"
              type="primary"
              class="three"
            >导 出</el-button>

            <el-button
              @click="resetForm1('form')"
              style="background: transparent;color:#fff;border: 1px solid #47d;"
            >重 置</el-button>
          </div>
        </el-form> -->
        <el-button
          size="medium"
          type="primary"
          style="float:right;margin-top: 10px;"
          @click="goback"
        >返 回</el-button>
      </el-header>
      <!-- 中部 -->
      <el-main>

        <!-- 列表 -->
        <div style="width:46%;">
          <div id="echarts1"></div>

          <el-table
            :data="tableData"
            border
            max-height="335"
            style="width: 100%;"
          >
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="时间"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="本期"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="banben"
              show-overflow-tooltip
              label="同期"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="aa1"
              show-overflow-tooltip
              label="增长值"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="mzname"
              show-overflow-tooltip
              label="同比增长率"
              align="center"
              min-width="100"
            ></el-table-column>

          </el-table>

        </div>

        <div style="width:46%">
          <div id="echarts2"></div>

          <el-table
            :data="tableData"
            border
            max-height="335"
            style="width: 100%;"
          >
            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="时间"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="banben"
              show-overflow-tooltip
              label="本期"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="aa1"
              show-overflow-tooltip
              label="上期"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="mzname"
              show-overflow-tooltip
              label="增加值"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="mzid"
              show-overflow-tooltip
              label="环比增长率"
              align="center"
              min-width="100"
            ></el-table-column>
          </el-table>

        </div>

      </el-main>
      <!-- 尾部 -->
      <el-footer>
        <!-- 分页 -->
        <el-pagination
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
      // 检索
      form: {
        dateof: "",
        region: "",
        linename: "",
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 列表数据
      tableData: [],

      // 切换图表和表格
      tag: 1,

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
      let url = this.urlb + "/api3/SourceData/GetDestData";
      let data = {
        data: {
          dt: new Date(this.form.dateof).getTime() / 1000, //日期
          nid: this.form.region,
          aa: this.form.linename
        }
      };
      this.myAjax(type, url, data, res => {
        console.log(res)
        this.tableData = res.data.data;

        for (let i = 0; i < this.options1.length; i++) {
          if (this.form.linename == this.options1[i].mid) {
            this.tableData.forEach(val => {
              val.name = this.options1[i].name
            })
          }
        }

        // let arr = []
        // for (var j = 0; j < this.tableData.length; j++) {
        //   //   arr.push({
        //   //     a: this.tableData[j].aa1
        //   //   })
        //   arr.push(this.tableData[j].aa1)

        // }
        // console.log(arr)

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

    // 同比分析
    getStudent1() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts1"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        title: {
          text: '同比分析',
          textStyle: { //主标题文本样式
            color: "#ccc"
          },
          x: "center"
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['本期', '同期'],
          textStyle: {
            color: '#ccc'//字体颜色
          },
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
            data: ['00时', '01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时'],
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
    // 环比分析
    getStudent2() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts2"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        title: {
          text: '环比分析',
          textStyle: { //主标题文本样式
            color: "#ccc"
          },
          x: "center"
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['本期', '上期'],
          textStyle: {
            color: '#ccc'//字体颜色
          },
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
            data: ['00时', '01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时'],
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

    // 定位电箱号
    getOnedx() {
      this.getList(1)
    },

    // 返回
    goback() {
      this.$router.go(-1)
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
    this.getStudent1()
    this.getStudent2()

  },
  created() {
    // this.getList(1);
    this.getOptions();

  }
};
</script>
  
 <style lang="less" scoped>
.electricBoxInfo .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}
.electricBoxInfo {
  //   overflow: hidden;
  height: 100%;
  .el-header {
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
    display: flex;
    justify-content: space-around;

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
  