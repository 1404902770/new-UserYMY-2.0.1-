<template>
  <!-- <h1>电量波动 - 线路电流波动</h1> -->
  <div
    class="electric"
    style="height: 100%;"
  >
    <el-container style="height: 100%;">
      <el-header>
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item
            label="电箱设备号"
            prop="region"
          >
            <el-select
              v-model="form.region"
              filterable
              placeholder="请选择电箱设备号"
              @change="xzxl"
            >
              <el-option
                v-for="(item,index) in options"
                :label="'['+getString1(hexCharCodeToStr(item.nid))+']' + item.n_name"
                :value="item.nid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="选择回路"
            prop="line"
          >
            <el-select
              v-model="form.line"
              filterable
              placeholder="请选择回路"
            >
              <el-option
                v-for="(item,index) in allLineData"
                :label="item.name"
                :value="item.mid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="选择日期"
            prop="datevalue"
          >
            <el-date-picker
              v-model="form.datevalue"
              align="right"
              type="date"
              :clearable="false"
              value-format="timestamp"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              popper-class="datetime"
            >
            </el-date-picker>
          </el-form-item>

          <div style="display: flex;height: 37px;">
            <el-button
              type="primary"
              @click="squery"
            >查询</el-button>

            <el-button
              size="medium"
              type="primary"
              class="one"
              @click="tabcontent(1)"
              style="margin-left:10px;"
            >数 据</el-button>
            <el-button
              size="medium"
              type="primary"
              class="two"
              @click="tabcontent(2)"
              style="margin-left:10px;"
            >图 表</el-button>

            <el-button
              type="primary"
              @click="reset"
            >重 置</el-button>
          </div>

        </el-form>
      </el-header>

      <el-main>
        <!-- 列表 -->
        <el-table
          v-show="tag==1?true:false"
          :data="tableData"
          border
          stripe
          ref="table"
          :span-method="arraySpanMethod"
          :max-height="tableHeight"
          style="width: 99%;margin:0 auto"
        >
          <el-table-column
            prop="dt"
            show-overflow-tooltip
            label="日期"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="参数名称"
            align="center"
            min-width="100"
          ></el-table-column>

          <!-- <el-table-column
            v-for="(item,index) in tableData"
            :key="index"
            label="参数名称"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ hexCharCodeToStr(scope.row.mzid) }}</span>
            </template>
          </el-table-column> -->

          <el-table-column
            label="00点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['0']?scope.row['0']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="01点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['1']?scope.row['1']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="02点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['2']?scope.row['2']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="03点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['3']?scope.row['3']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="04点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['4']?scope.row['4']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="05点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['5']?scope.row['5']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="06点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['6']?scope.row['6']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="07点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['7']?scope.row['7']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="08点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['8']?scope.row['8']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="09点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['9']?scope.row['9']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="10点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['10']?scope.row['10']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="11点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['11']?scope.row['11']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="12点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['12']?scope.row['12']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="13点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['13']?scope.row['13']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="14点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['14']?scope.row['14']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="15点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['15']?scope.row['15']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="16点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['16']?scope.row['16']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="17点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['17']?scope.row['17']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="18点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['18']?scope.row['18']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="19点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['19']?scope.row['19']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="20点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['20']?scope.row['20']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="21点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['21']?scope.row['21']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="22点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['22']?scope.row['22']:"- -"}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="23点"
            align="center"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row['23']?scope.row['23']:"- -"}}</span>
            </template>
          </el-table-column>
        </el-table>

        <div
          v-show="tag==2?true:false"
          class="echarts1"
          id="echarts2"
        >
        </div>
      </el-main>

      <el-footer>
        <copyright></copyright>
      </el-footer>
    </el-container>
  </div>
</template>
  
<script>
import $ from "jquery";
import copyright from "../../components/copyright";

export default {
  name: "lineWave",
  components: {
    copyright
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },

      tableHeight: '735',

      // 检索
      form: {
        region: "", // 电箱设备号
        line: "", // 线路
        datevalue: "",//选择日期
      },
      // 获取所有设备
      options: [],
      // 获取线路
      allLineData: [],

      tableData: [],

      // 线路电流波动
      linedata: [],
      // 线路波动时间
      linetime: [],

      linedata2: [],
      linedata3: [],

      tag: 2,

      // echarts图
      student: null
    };
  },
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      // if (columnIndex === 0) {
      //   //每三行，合并两行
      //   if ((rowIndex + 1) % 3 === 1) {
      //     return {
      //       rowspan: 3,
      //       colspan: 1
      //     };
      //   } else if ((rowIndex + 1) % 3 === 0) { //每三行合并三列 
      //     return [1, 3];
      //   }
      // }
    },

    // 初始化获取下拉数据 - 所有设备
    getOptions() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urla + "/api3/EnergyData/getNetdSimpleList";
      let data = {
        data: {
          uid: uid
          // uid: localStorage.getItem("uid")
        }
      };
      this.myAjax(type, url, data, res => {
        this.options = res.data.data;
        this.form.region = this.options[0].nid;
        this.xzxl(this.form.region);
      });
    },
    // 选择线路
    xzxl(val) {
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
        this.allLineData = res.data.data;
        this.form.line = this.allLineData[0].mid
        this.getxianlu()
      });
    },

    // 线路电流波动数据
    getxianlu() {
      var myDate = new Date().toLocaleDateString();
      let d = new Date(myDate)
      let time = Math.floor(d.getTime(d) / 1000)

      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = 'post'
      let url = this.urla + '/api3/EnergyData/machedAaWave'
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.form.region,
          aa: this.form.line,
          dt: this.form.datevalue != "" && this.form.datevalue != null ? this.form.datevalue / 1000 : time
        }
      }
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableData = res.data.data.tb
        if (res.data.type == 1) {
          this.tableData.forEach(val => {
            if (val.name == "aa1") {
              val.name = '电流'
            }
            // else if (val.name == "aa2") {
            //   val.name = 'B相'
            // } else if (val.name == "aa3") {
            //   val.name = 'C相'
            // }
          })
        } else {
          this.tableData.forEach(val => {
            if (val.name == "aa1") {
              val.name = 'A相'
            } else if (val.name == "aa2") {
              val.name = 'B相'
            } else if (val.name == "aa3") {
              val.name = 'C相'
            }
          })
        }

        // this.tableData.forEach(val => {
        //   if (val.name == "aa1") {
        //     val.name = 'A相'
        //   } else if (val.name == "aa2") {
        //     val.name = 'B相'
        //   } else if (val.name == "aa3") {
        //     val.name = 'C相'
        //   }
        // })

        if (res.data.data.aa1) {
          this.linedata = res.data.data.aa1
        } else {
          this.linedata = res.data.data.daa
        }

        if (res.data.data.aa2) {
          this.linedata2 = res.data.data.aa2
        } else {
          this.linedata2 = []
        }

        if (res.data.data.aa3) {
          this.linedata3 = res.data.data.aa3
        } else {
          this.linedata3 = []
        }

        res.data.data.time.forEach(val => {
          this.linetime.push(new Date(
            val * 1000
          ).Format("yy-MM-dd hh:mm:ss"))
        })

        if (this.student != null) {
          this.student.clear()
        }
        this.getStudent1()

      })
    },

    // 切换图表和表格
    tabcontent(num) {
      this.tag = num
      if (this.tag == 2) {
        this.getStudent1()
      }
    },

    // 线路电流波动
    getStudent1() {
      if (this.linedata2.length > 0) {
        var tuli = ["A相", "B相", "C相"]
      } else {
        var tuli = ["电流"]
      }

      let _this = this;

      setTimeout(() => {

        _this.student = _this.$echarts.init(document.getElementById("echarts2"));
        $(window).resize(function () {
          _this.student.resize();
        });
        _this.student.setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          // title: {
          //   left: 'center',
          //   text: '电流波动图',
          //   textStyle: { //主标题文本样式
          //     color: "#ccc",
          //     fontSize: "16"
          //   },
          // },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            },
            iconStyle: {
              normal: {
                borderColor: '#606060',//设置颜色
              }
            }
          },
          legend: {
            data: tuli,
            left: 160,
            textStyle: {
              color: '#606060'
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.linetime,
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
          },
          yAxis: {
            name: "单位：(A)",
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLine: {     //x轴坐标轴
              show: false
            },
            axisTick: {		//x轴刻度线
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#606060',//坐标值得具体的颜色
              }
            },
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
          }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          series: [
            {
              name: this.linedata2.length > 0 ? 'A相' : '电流',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              color: this.linedata2.length > 0 ? "#FFD700	" : '#c23531', //图例的颜色
              lineStyle: {
                color: this.linedata2.length > 0 ? "#FFD700	" : '#c23531' //改变折线颜色
              },
              data: this.linedata,
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
              name: 'B相',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              color: '#006400', //图例的颜色
              lineStyle: {
                color: '#006400' //改变折线颜色
              },
              data: this.linedata2.length > 0 ? this.linedata2 : [],
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
              name: 'C相',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              // itemStyle: {
              //   color: 'rgb(255, 70, 131)'
              // },
              data: this.linedata3.length > 0 ? this.linedata3 : [],
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
            }
          ]
        });
        this.student.resize();
      }, 0);
    },

    // 筛选字段 - 查询
    squery() {
      if (this.form.line == '') {
        this.$message({
          showClose: true,
          message: '请选择线路',
          type: 'warning'
        });
      } else {
        this.getxianlu()
      }
      this.linedata = []
      this.linetime = []
    },

    // 重置刷新
    reset() {
      this.form.datevalue = ""
      if (this.form.line == '') {
        this.$message({
          showClose: true,
          message: '请选择线路',
          type: 'warning'
        });
      } else {
        this.linedata = []
        this.linetime = []

        this.getxianlu()
      }
    }
  },

  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
  },

  created() {
    this.getOptions()
  }
};
</script>
  
 <style lang="less" scoped>
// 小屏
@media screen and (min-height: 650px) and (max-height: 750px) {
  #echarts2 {
    height: 460px !important;
  }
}
// 小屏全屏
@media screen and(min-height:750px) and(max-height: 850px) {
  #echarts2 {
    height: 460px !important;
  }
}

.el-header {
  background: #fff;
  width: 96%;
  margin: 10px auto;
  // border-bottom: 1px solid #e6e6e6;
  .el-form {
    text-align: left;
    margin-top: 10px;
    display: flex;
    .el-form-item {
      font-weight: bold;
      // float: left;
    }
    // .el-form-item /deep/ .el-form-item__label {
    //   color: #ccc !important;
    // }
    .el-button {
      margin-top: 3px;
      padding: 9px 20px;
      margin-left: 20px;
      // border-radius: 0;
      border: none;
      background: #1478c5;
      // background-image: linear-gradient(to right, #32a581, #158c86);
    }
    .one {
      background: transparent;
      // background: url(../../../public/static/images/tubiao.png) no-repeat 12px 6px;
      background-size: 21px 21px;
      // padding-left: 38px;
      border: 1px solid #1478c5;
      color: #1478c5;
    }
    .two {
      background: transparent;
      // background: url(../../../public/static/images/shuju.png) no-repeat 12px 6px;
      background-size: 19px 19px;
      // padding-left: 38px;
      border: 1px solid #1478c5;
      color: #1478c5;
    }
  }
}

.el-main {
  width: 100%;
  .echarts1 {
    width: 100%;
    height: 600px;
    background: #fff;
    padding: 20px 0;
  }
}
</style>
  