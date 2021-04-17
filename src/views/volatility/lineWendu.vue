<template>
  <!-- <h1>电量波动 - 线路温度</h1> -->
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
          max-height="735"
          style="width: 99%;margin:0 auto"
        >
          <el-table-column
            prop="dt"
            show-overflow-tooltip
            label="日期"
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

      <!-- <div class="foot">
      </div> -->
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

      // 线路温度
      linedata: [],
      // 线路波动时间
      linetime: [],

      tag: 2,

      // echarts图
      student: null
    };
  },
  methods: {
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

    // 线路温度数据
    getxianlu() {
      var myDate = new Date().toLocaleDateString();
      let d = new Date(myDate)
      let time = Math.floor(d.getTime(d) / 1000)

      let type = 'post'
      let url = this.urla + "/api3/EnergyData/machedTemWave"
      let data = {
        data: {
          // uid: localStorage.getItem('uid'),
          nid: this.form.region,
          aa: this.form.line,
          dt: this.form.datevalue != "" && this.form.datevalue != null ? this.form.datevalue / 1000 : time
          // dt: "1606435200", //日期
          // nid: "34474c3430354c4130365142",
          // aa: "02"
        }
      }
      this.myAjax(type, url, data, res => {
        // console.log(res)

        this.tableData = res.data.data.tb

        this.linedata = res.data.data.tt
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

    // 线路温度图
    getStudent1() {
      let _this = this;
      setTimeout(() => {

        _this.student = _this.$echarts.init(document.getElementById("echarts2"));
        $(window).resize(function () {
          _this.student.resize();
        });
        _this.student.setOption({
          tooltip: {
            trigger: 'axis',
            // position: function (pt) {
            //   return [pt[0], '10%'];
            // },
            formatter: '时间：{b}<br/>{a0}：{c0}℃'
          },
          // title: {
          //   left: 'center',
          //   text: '线路温度图',
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
              saveAsImage: {},
            },
            iconStyle: {
              normal: {
                borderColor: '#606060',//设置颜色
              }
            }
          },
          legend: {
            data: ['温度'],
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
            name: "单位：(℃)",
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
              name: '温度',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              // areaStyle: {
              //   color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //     offset: 0,
              //     color: 'rgb(255, 158, 68)'
              //   }, {
              //     offset: 1,
              //     color: 'rgb(255, 70, 131)'
              //   }])
              // },
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

  mounted() { },

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
      // background: url(../../../public/static/images/tubiao.png) no-repeat 12px 6px;
      background-size: 21px 21px;
      // padding-left: 38px;
      background: transparent;
      border: 1px solid #1478c5;
      color: #1478c5;
    }
    .two {
      // background: url(../../../public/static/images/shuju.png) no-repeat 12px 6px;
      background-size: 19px 19px;
      // padding-left: 38px;
      background: transparent;
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
  