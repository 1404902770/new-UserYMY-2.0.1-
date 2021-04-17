<template>
  <!-- 用电监测 - 数据采集 -->
  <div class="electricBoxInfo">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <div style="height: 37px;text-align: left;margin-top: 10px;">
          <!-- <el-button
            type="primary"
            @click="getOnedx"
            style="margin-left:10px;"
          ><i class="el-icon-search"></i> 查 询</el-button> -->

          <el-button
            type="primary"
            @click="screening"
            style="margin-left:10px;"
          ><i class="el-icon-search"></i> 筛选</el-button>

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

          <!-- <el-button
              @click="resetForm1('form')"
              style=""
            >重 置</el-button> -->
        </div>

        <el-dialog
          title="筛选信息"
          width="30%"
          :visible.sync="dialogFormVisible"
        >
          <el-form
            ref="form"
            :model="form"
            label-width="70px"
          >
            <el-form-item
              label="选择日期"
              prop="dateof"
              style="width:310px"
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
              class="dianxiang"
            >
              <el-select
                v-model="form.eletype"
                filterable
                placeholder="全部"
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
                  label="漏电电流"
                  value="ld"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item
            label-width="10px"
            label=""
          >
            <el-checkbox-group v-model="form.xiang">
              <el-checkbox
                label="A相"
                name="xiang"
              ></el-checkbox>
              <el-checkbox
                label="B相"
                name="xiang"
              ></el-checkbox>
              <el-checkbox
                label="C相"
                name="xiang"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="getOnedx"
            >确 定</el-button>
          </div>
        </el-dialog>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div>
          <div style="margin-bottom:10px;overflow:hidden">
            <!-- <el-button
              size="medium"
              type="primary"
              style="float:left;margin-left:10px;"
            ><i class="el-icon-document"></i> 数 据</el-button>
            <el-button
              size="medium"
              type="primary"
              style="float:left;margin-left:10px;"
            ><i class="el-icon-s-data"></i> 图 表</el-button>
            <el-button
              size="medium"
              type="primary"
              style="float:left;margin-left:10px;"
            ><i class="el-icon-document"></i> 导 出</el-button> -->

            <!-- <el-button
              size="medium"
              type="primary"
              class="one"
              @click="tabcontent(1)"
              style="float:left;margin-left:10px;"
            >数 据</el-button>
            <el-button
              size="medium"
              type="primary"
              class="two"
              @click="tabcontent(2)"
              style="float:left;margin-left:10px;"
            >图 表</el-button> -->

            <!-- <el-button
              size="medium"
              type="primary"
              class="three"
              style="float:left;margin-left:10px;"
            >导 出</el-button> -->
          </div>

          <div class="maincontent">
            <!-- 列表 -->
            <el-table
              :data="tableData"
              border
              stripe
              ref="table"
              :max-height="tableHeight"
              v-show="tag==1?true:false"
              style="width: 99%;margin:0 auto"
            >
              <el-table-column
                prop="mname"
                show-overflow-tooltip
                label="线路名称"
                align="center"
                min-width="100"
              ></el-table-column>

              <el-table-column
                prop="time"
                show-overflow-tooltip
                label="采集时间"
                align="center"
                min-width="100"
              ></el-table-column>

              <el-table-column
                prop="bb1"
                show-overflow-tooltip
                :label="tabletext1"
                align="center"
                min-width="100"
              ></el-table-column>

              <el-table-column
                v-if="tableData.length>0?tableData[0].bb3?true:false:false"
                prop="bb2"
                show-overflow-tooltip
                :label="tabletext2"
                align="center"
                min-width="100"
              ></el-table-column>

              <el-table-column
                v-if="tableData.length>0?tableData[0].bb3?true:false:false"
                prop="bb3"
                show-overflow-tooltip
                :label="tabletext3"
                align="center"
                min-width="100"
              ></el-table-column>

              <el-table-column
                v-if="tableData.length>0?tableData[0].bb4?true:false:false"
                prop="bb4"
                show-overflow-tooltip
                :label="tabletext4"
                align="center"
                min-width="100"
              ></el-table-column>
            </el-table>
          </div>
        </div>

        <div
          class="echarts"
          v-show="tag==2?true:false"
        >
          <div id="echart"></div>
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
        eletype: "",
        // xiang: []
      },
      // 获取所有设备
      options: [],
      options1: [],
      // 列表数据
      tableData: [],

      listdata1: [],
      listdata2: [],
      listdata3: [],
      time: [],

      tabletext1: '',
      tabletext2: '',
      tabletext3: '',
      tabletext4: '',

      dialogFormVisible: false,

      // 切换图表和表格
      tag: 1,
      pictitle: "",
      danwei: "",

      // 日起基准
      benchmark: "",

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
      let url = this.urlb + "/api3/SourceData/GetSource";
      let data = {
        data: {
          dt: new Date(this.form.dateof).getTime() / 1000, //日期
          // tm: "15",    //时间间隔 分钟
          nid: this.form.region,
          aa: this.form.linename,
          type: this.form.eletype,
          page: page,
          size: 10000,
          lei: 1    //类别1表示数据，2表示图表
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)

        this.tableData = res.data.data;

        if (res.data.type == 1) {
          switch (this.form.eletype) {
            case 'aa':
              this.tabletext1 = 'I（A）'
              break;
            case 'vv':
              this.tabletext1 = 'U（V）'
              break;
            case 'kk':
              this.tabletext1 = 'P（kW）'
              this.tabletext4 = '总有功'
              break;
            case 'kv':
              this.tabletext1 = 'Q（kVar）'
              this.tabletext4 = '总无功'
              break;
            case 'tt':
              this.tabletext1 = '温度（°C）'
              break;
            case 'ld':
              this.tabletext1 = '漏电电流（A）'
              break;
          }
        } else {
          switch (this.form.eletype) {
            case 'aa':
              this.tabletext1 = 'Ia（A）'
              this.tabletext2 = 'Ib（A）'
              this.tabletext3 = 'Ic（A）'
              break;
            case 'vv':
              this.tabletext1 = 'Ua（V）'
              this.tabletext2 = 'Ub（V）'
              this.tabletext3 = 'Uc（V）'
              break;
            case 'kk':
              this.tabletext1 = 'Pa（kW）'
              this.tabletext2 = 'Pb（kW）'
              this.tabletext3 = 'Pc（kW）'
              this.tabletext4 = '总有功'
              break;
            case 'kv':
              this.tabletext1 = 'Qa（kVar）'
              this.tabletext2 = 'Qb（kVar）'
              this.tabletext3 = 'Qc（kVar）'
              this.tabletext4 = '总无功'
              break;
            case 'tt':
              this.tabletext1 = '温度（°C）'
              break;
            case 'ld':
              this.tabletext1 = '漏电电流（A）'
              break;
          }
        }


        // this.listdata1 = []
        // this.listdata2 = []
        // this.listdata3 = []
        // this.time = []

        this.tableData.forEach(val => {
          for (let i = 0; i < this.options1.length; i++) {
            if (this.form.linename == this.options1[i].mid) {
              val.mname = this.options1[i].name
            }
          }

          // this.listdata1.push(val.bb1)
          // if (val.bb2) {
          //   this.listdata2.push(val.bb2)
          // } else {
          //   this.listdata2 = []
          // }
          // if (val.bb3) {
          //   this.listdata3.push(val.bb3)
          // } else {
          //   this.listdata3 = []
          // }

          val.time = new Date(
            val.time * 1000
          ).Format("yy-MM-dd hh:mm:ss");

          // this.time.push(val.time)

          // this.getStudent1()

        })
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

    // 获取图表数据
    getEchartsData() {
      let type = "post";
      let url = this.urlb + "/api3/SourceData/GetSource";
      let data = {
        data: {
          dt: new Date(this.form.dateof).getTime() / 1000, //日期
          // tm: "15",    //时间间隔 分钟
          nid: this.form.region,
          aa: this.form.linename,
          type: this.form.eletype,
          page: 1,
          size: 13,
          lei: 2    //类别1表示数据，2表示图表
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.listdata1 = res.data.bb[0].bb1
        if (res.data.bb[0].bb2) {
          this.listdata2 = res.data.bb[0].bb2
        } else {
          this.listdata2 = []
        }
        if (res.data.bb[0].bb3) {
          this.listdata3 = res.data.bb[0].bb3
        } else {
          this.listdata3 = []
        }
        this.time = []
        res.data.bb[0].time.forEach(val => {
          val = new Date(
            val * 1000
          ).Format("yy-MM-dd hh:mm:ss");

          this.time.push(val)
        })
        this.getStudent1()
      });

      switch (this.form.eletype) {
        case 'aa':
          this.pictitle = '电流图'
          this.danwei = "单位：（A）"
          break;
        case 'vv':
          this.pictitle = '电压图'
          this.danwei = "单位：（V）"
          break;
        case 'kk':
          this.pictitle = '有功功率图'
          this.danwei = "单位：（Kw）"
          break;
        case 'kv':
          this.pictitle = '无功功率图'
          this.danwei = "单位：（kVar）"
          break;
        case 'tt':
          this.tabletext1 = '温度'
          this.danwei = "单位：（℃）"
          break;
        case 'ld':
          this.tabletext1 = '漏电电流'
          this.danwei = "单位：（A）"
          break;
      }
    },

    // 数据图
    getStudent1() {
      let tuli = ["电压"]
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("echart"));
        $(window).resize(function () {
          student.resize()
        });
        student.setOption({
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'center',
            text: this.pictitle,
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            data: tuli,
            left: 160
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.time,
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
          },
          yAxis: {
            name: this.danwei,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            splitLine: {
              show: true,
              // lineStyle: {
              //   color: ['#47d'],
              //   width: 1,
              //   type: 'solid'
              // }
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
            // min: 0,
            // max: 10,
            // interval: 0.5,
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            {
              type: 'slider',
              yAxisIndex: 0,
              filterMode: 'empty',

            },
            {
              type: 'inside',
              yAxisIndex: 0,
              filterMode: 'empty',

            },
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',

            },
            {
              type: 'inside',
              xAxisIndex: 0,
              filterMode: 'empty',

            }
          ],
          series: [
            {
              name: this.listdata1.length > 0 ? 'A相' : '有功功率',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531', //图例的颜色
              lineStyle: {
                color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531' //改变折线颜色
              },
              data: this.listdata1,
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
              data: this.listdata2.length > 0 ? this.listdata2 : [],
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
              itemStyle: {
                color: 'rgb(255, 70, 131)'
              },
              data: this.listdata3.length > 0 ? this.listdata3 : [],
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

          // series: [
          //   {
          //     name: this.tabletext1 + ' \n\n Max 20.12  19:10 \n\n Min 10.19  18:36',
          //     type: 'line',
          //     smooth: true,
          //     symbol: 'none',
          //     sampling: 'average',
          //     itemStyle: {
          //       color: 'rgb(255, 70, 131)'
          //     },
          //     //   markPoint: {
          //     //     data: [
          //     //       { type: 'max', name: '最大值' },
          //     //       { type: 'min', name: '最小值' }
          //     //     ]
          //     //   },
          //     //   markLine: {
          //     //     data: [
          //     //       { type: 'average', name: '平均值' }
          //     //     ]
          //     //   },
          //     data: this.listdata1
          //   },
          //   {
          //     name: this.tabletext2 + ' \n\n Max 20.12  19:10 \n\n Min 10.19  18:36',
          //     type: 'line',
          //     smooth: true,
          //     symbol: 'none',
          //     sampling: 'average',
          //     itemStyle: {
          //       color: 'rgb(255, 70, 131)'
          //     },
          //     //   markPoint: {
          //     //     data: [
          //     //       { type: 'max', name: '最大值' },
          //     //       { type: 'min', name: '最小值' }
          //     //     ]
          //     //   },
          //     //   markLine: {
          //     //     data: [
          //     //       { type: 'average', name: '平均值' }
          //     //     ]
          //     //   },
          //     data: this.listdata2
          //   },
          //   {
          //     name: this.tabletext3 + ' \n\n Max 20.12  19:10 \n\n Min 10.19  18:36',
          //     type: 'line',
          //     smooth: true,
          //     symbol: 'none',
          //     sampling: 'average',
          //     itemStyle: {
          //       color: 'rgb(255, 70, 131)'
          //     },
          //     //   markPoint: {
          //     //     data: [
          //     //       { type: 'max', name: '最大值' },
          //     //       { type: 'min', name: '最小值' }
          //     //     ]
          //     //   },
          //     //   markLine: {
          //     //     data: [
          //     //       { type: 'average', name: '平均值' }
          //     //     ]
          //     //   },
          //     data: this.listdata3
          //   }

          // ]
        });
      }, 0)
    },

    // 切换图表和表格
    tabcontent(num) {
      this.tag = num
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
      } else if (this.form.eletype == "") {
        this.$message({
          showClose: true,
          message: '请选择电力类别',
          type: 'warning'
        });
      } else {
        if (this.tag == 1) {
          this.getList(1)
        } else {
          this.getEchartsData()
        }
      }
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

    // 筛选
    screening() {
      this.dialogFormVisible = true
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
      } else if (this.form.eletype == "") {
        this.$message({
          showClose: true,
          message: '请选择电力类别',
          type: 'warning'
        });
      } else {
        if (this.tag == 1) {
          this.getList(1)
          this.dialogFormVisible = false
        } else {
          this.getEchartsData()
          this.dialogFormVisible = false
        }
      }
      switch (this.form.eletype) {
        case 'aa':
          this.tabletext1 = 'Ia（A）'
          this.tabletext2 = 'Ib（A）'
          this.tabletext3 = 'Ic（A）'
          break;
        case 'vv':
          this.tabletext1 = 'Ua（V）'
          this.tabletext2 = 'Ub（V）'
          this.tabletext3 = 'Uc（V）'
          break;
        case 'kk':
          this.tabletext1 = 'Pa（kW）'
          this.tabletext2 = 'Pb（kW）'
          this.tabletext3 = 'Pc（kW）'
          this.tabletext4 = '总有功'
          break;
        case 'kv':
          this.tabletext1 = 'Qa（kVar）'
          this.tabletext2 = 'Qb（kVar）'
          this.tabletext3 = 'Qc（kVar）'
          this.tabletext4 = '总无功'
          break;
        case 'tt':
          this.tabletext1 = '温度（°C）'
          break;
        case 'ld':
          this.tabletext1 = '漏电电流（A）'
          break;
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
    this.form.eletype = "aa"
    switch (this.form.eletype) {
      case 'aa':
        this.tabletext1 = 'Ia（A）'
        this.tabletext2 = 'Ib（A）'
        this.tabletext3 = 'Ic（A）'
        break;
      case 'vv':
        this.tabletext1 = 'Ua（V）'
        this.tabletext2 = 'Ub（V）'
        this.tabletext3 = 'Uc（V）'
        break;
      case 'kk':
        this.tabletext1 = 'Pa（kW）'
        this.tabletext2 = 'Pb（kW）'
        this.tabletext3 = 'Pc（kW）'
        this.tabletext4 = '总有功'
        break;
      case 'kv':
        this.tabletext1 = 'Qa（kVar）'
        this.tabletext2 = 'Qb（kVar）'
        this.tabletext3 = 'Qc（kVar）'
        this.tabletext4 = '总无功'
        break;
      case 'tt':
        this.tabletext1 = '温度（°C）'
        break;
      case 'ld':
        this.tabletext1 = '漏电电流（A）'
        break;
    }
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

// 小屏
@media screen and (min-height: 650px) and (max-height: 750px) {
  #echart {
    height: 460px !important;
  }
}
// 小屏全屏
@media screen and(min-height:750px) and(max-height: 850px) {
  #echart {
    height: 460px !important;
  }
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
    .el-button {
      padding: 9px 20px;
      margin-top: 3px;
      // float: right;
      // border-radius: 0;
      border: none;
      background: #1478c5;
      // background-image: linear-gradient(to right, #32a581, #158c86);
    }
    .one {
      color: #1478c5;
      border: 1px solid #1478c5;
      background: transparent;
    }
    .two {
      color: #1478c5;
      border: 1px solid #1478c5;
      background: transparent;
    }
    .el-form {
      text-align: left;
      margin-top: 10px;
      // overflow: hidden;
      // display: flex;
      .el-form-item {
        // float: left;
        margin: 16px auto;
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
        // width: 150px;
      }
      .dianxiang {
        width: 310px;

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
      // background: url(../../../public/static/images/tubiao.png) no-repeat 12px 6px;
      // background-size: 21px 21px;
      // padding-left: 38px;
      border: 1px solid #1478c5;
      // color: #198f85;
      // background: #fff;
      background: transparent;
      // background-image: linear-gradient(to right, #32a581, #158c86);

      // border-image: linear-gradient(to right, #32a581, #158c86) 1 20;
      // border-image: -o-linear-gradient(to right, #32a581, #158c86) 1 20;
      // border-image: -moz-linear-gradient(to right, #32a581, #158c86) 1 20;
      // border-image: -webkit-linear-gradient(to right, #32a581, #158c86) 1 20;
    }
    .two {
      // background: url(../../../public/static/images/shuju.png) no-repeat 12px 6px;
      // background-size: 19px 19px;
      // padding-left: 38px;
      border: 1px solid #1478c5;
      // color: #198f85;
      // background: #fff;
      background: transparent;
      // background-image: linear-gradient(to right, #32a581, #158c86);

      // border-image: linear-gradient(to right, #32a581, #158c86) 1 20;
      // border-image: -o-linear-gradient(to right, #32a581, #158c86) 1 20;
      // border-image: -moz-linear-gradient(to right, #32a581, #158c86) 1 20;
      // border-image: -webkit-linear-gradient(to right, #32a581, #158c86) 1 20;
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
  