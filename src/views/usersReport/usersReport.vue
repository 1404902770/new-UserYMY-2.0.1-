<template>
  <div class="usersreport">
    <!-- v-loading="true"
    element-loading-text="该功能正在研发，本月底上线"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)" -->

    <!-- <div class="usersreport"> -->

    <!-- <iframe
      class="CustomReport"
      frameborder="0"
      scrolling="yes"
      style="width:100%;height:100%;border:0;"
      src="http://www.acrelcloud.cn/v2/CustomReport.html?adv=0.5218154898928633"
    ></iframe> -->
    <!-- <button v-print="'#rightcontent'">打印</button> -->
    <div class="leftcontent">
      <div class="toptitle">分析报表</div>

      <el-container>
        <el-header>
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
          >

            <el-form-item label="起始日期:">
              <el-date-picker
                v-model="form.startdate"
                type="month"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="timeChange"
                popper-class="datetime"
              >
              </el-date-picker>
            </el-form-item>

            <!-- <el-form-item label="截止日期:">
              <el-date-picker
                v-model="form.enddate"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                :picker-options="timeChange"
                popper-class="datetime"
              >
              </el-date-picker>
            </el-form-item> -->

          </el-form>
        </el-header>

        <el-main>
          <div
            class="eqtable"
            ref="eqtable"
          >
            <!-- <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >全选</el-checkbox> -->

            <!-- <div style="margin: 15px 0;"></div> -->
            <!--  @change="handleCheckedeleChange" -->
            <el-radio-group v-model="checkedele">
              <el-radio
                v-for="(item,index) in option"
                :label="item"
                :key="index"
              >{{'['+getString1(hexCharCodeToStr(item.nid))+'] ' + item.n_name + ' [' + item.n_local +']'}}</el-radio>
            </el-radio-group>
          </div>
        </el-main>

        <el-footer>
          <div class="submit">
            <!-- <el-button
              size="medium"
              @click="handleCheckAllChange(choosetext=='全选当页'?true:false)"
            >{{choosetext}}</el-button> -->
            <el-button
              size="medium"
              @click="submit"
            >确定</el-button>
          </div>
        </el-footer>
      </el-container>

    </div>
    <div
      id="rightcontent"
      class="rightcontent"
    >
      <div
        class="report-p1 split"
        style="page-break-before: always"
      >
        <!-- <label class="R-advert">
          <img
            src="../../../public/logo.png"
            alt=""
            style="width:32px"
          >
          智能云控 物联天下</label> -->
        <h1>用电分析报表</h1>
        <table class="message">
          <tbody>
            <tr>
              <td>电箱名称：</td>
              <td id="subName1">{{electricbox.name}}</td>
            </tr>
            <tr>
              <td>电箱地址：</td>
              <td id="subAddress1">{{electricbox.local}}</td>
            </tr>
            <tr>
              <td>报告日期：</td>
              <td id="subDate1">{{form.startdate?form.startdate:""}}</td>
            </tr>
          </tbody>
        </table>
        <img
          src="../../../public/static/images/bag2.png"
          class="page1-bg"
        >
      </div>

      <div
        class="report-p2"
        style="page-break-before: always"
      >
        <h3>1、电箱概况</h3>
        <table class="table substation">
          <tbody>
            <tr>
              <td>电箱名称</td>
              <td
                colspan="4"
                id="name"
              >{{electricbox.name ? electricbox.name:'-'}}</td>
            </tr>
            <tr>
              <td>电箱地址</td>
              <td
                colspan="4"
                id="name"
              >{{electricbox.local ? electricbox.local:'-'}}</td>
            </tr>
            <tr>
              <td>版本号</td>
              <td>通讯方式</td>
              <td>是否加密</td>
              <td>分机数量</td>
              <td>是否使能</td>
            </tr>
            <tr>
              <td id="jishu">{{electricbox.banben ? electricbox.banben:'-'}}</td>
              <td id="xinghao">{{electricbox.txfs ? electricbox.txfs=='00'?'WIFI':electricbox.txfs=='01'?'以太网':electricbox.txfs=='02'?'4G':'':'-'}}</td>
              <td id="guige">{{electricbox.rzms ? electricbox.rzms== '00'?'不加密':'加密':'-'}}</td>
              <td id="fenji">{{electricbox.ext ? electricbox.ext+"个":'-'}}</td>
              <td id="shineng">{{electricbox.neng ? electricbox.neng =='01' ? "使能":"不使能":'-'}}</td>
            </tr>
          </tbody>
        </table>
        <h3>2、回路概况</h3>
        <p class="pDiv"> 该电箱下共有回路{{electricbox.ext ? electricbox.ext:'--'}}条，回路详情见下表：</p>
        <p
          class="powerString"
          id="powerString"
        ></p>
        <div
          class="powerContain"
          id="powerContain"
        >
          <!-- 线路列表 -->
          <el-table
            :data="tableData"
            stripe
            border
            max-height="460"
            style="width: 100%"
          >

            <el-table-column
              label="回路编号"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.mid }}</span>
              </template>
            </el-table-column>

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
              label="回路地址"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="type"
              show-overflow-tooltip
              label="回路类型"
              align="center"
              min-width="70"
            ></el-table-column>

            <el-table-column
              label="安装时间"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ new Date(scope.row.anzhuang*1000).Format('yy-MM-dd') }}</span>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <img
          src="../../../public/static/images/report-bg-02.png"
          class="page2-bg"
        >
      </div>

      <div class="report-p4 num0">
        <!-- <h4>2.2、线路能耗排名</h4>
        <div
          class="ranking"
          id="ranking"
        ></div> -->
        <!-- <p class="ranking-p"></p> -->
        <h3>3、阈值概况</h3>
        <div
          class="monitorTable"
          id="monitorTable"
        >
          <!-- 阈值列表 -->
          <el-table
            :data="yutableData"
            stripe
            border
            style="width: 100%"
          >

            <el-table-column
              fixed
              prop="name"
              show-overflow-tooltip
              label="回路名称"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="vl1"
              show-overflow-tooltip
              label="欠压报警值(V)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="vh1"
              show-overflow-tooltip
              label="过压告警值(V)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="vh2"
              show-overflow-tooltip
              label="过压报警值(V)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="cl1"
              show-overflow-tooltip
              label="电流预警值(A)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="cl2"
              show-overflow-tooltip
              label="电流告警值(A)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="cl3"
              show-overflow-tooltip
              label="电流报警值(A)"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="wendu"
              show-overflow-tooltip
              label="温度报警值(℃)"
              align="center"
              min-width="110"
            ></el-table-column>

            <el-table-column
              prop="l1"
              show-overflow-tooltip
              label="漏电电流值(mA)"
              align="center"
              min-width="100"
            ></el-table-column>

          </el-table>
        </div><img
          src="../../../public/static/images/report-bg-02.png"
          class="page3-bg"
        >
      </div>

      <div class="report-p5">
        <h4>4、能耗分析</h4>
        <!-- 日平均耗电量--kW·h， -->
        <p class="pDiv"> 该电箱监测周期内总耗电量{{nenghaototal!=''?nenghaototal:nenghaototal==0?0:'--'}}kW·h，单日最大耗电量{{nenghaoday!=''?nenghaoday:'--'}}kW·h，日耗电情况详见下图：</p>
        <div class="daycurve">
          <div id="daynenghao"></div>
        </div>
        <h4 class="daycurve-h4">4.1、日能耗排行</h4>
        <div class="daycurve2">
          <div id="daynenghaopaihang"></div>
        </div>
        <p id="pfDiv"></p><img
          src="../../../public/static/images/report-bg-02.png"
          class="page3-bg"
        >
      </div>

      <div
        class="report-p3"
        style="page-break-before: always"
      >
        <h3>5、报警分析</h3>
        <h4>5.1、报警类型</h4>
        <p class="pDiv"> 该电箱在周期范围内共有报警信息{{alarmtotal!=''?alarmtotal:'--'}}条，单日报警次数最多{{alarmtotalday.total!=''?alarmtotalday.total:'--'}}条,报警类型为{{alarmtotalday.name?alarmtotalday.name.title:"--"}}，报警详情见下图：</p>
        <p id="event"></p>
        <div
          class="eventDiv"
          id="eventDiv"
        >
          <div class="daycurve">
            <div id="alarm"></div>
          </div>
        </div>
        <h4
          class="change"
          id="change"
        >5.2、报警类型排名</h4>
        <p id="sigevent"></p>
        <div id="sigeventTable">
          <div class="daycurve">
            <div id="alarmpaihang"></div>
          </div>
        </div><img
          src="../../../public/static/images/report-bg-02.png"
          class="page3-bg"
        >
      </div>

      <!-- <div
        class="report-p6"
        style="page-break-before: always"
      >
        <h3 class="message">6、体检分析</h3>
        <div class="daycurve"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      // 时间范围
      timeChange: {
        disabledDate(time) {
          return (
            time.getTime() < Date.parse(new Date("2020-05-31 00:00")) ||
            time.getTime() > Date.now()
          ); //选择时间范围
        }
      },
      form: {
        // // 开始日期
        // startdate: new Date(new Date() - 1000 * 60 * 60 * 24 * 30).getTime(),
        // // 结束日期
        // enddate: new Date(new Date() - 1000 * 60 * 60 * 24).getTime(),
        // 开始日期
        startdate: "",
        // 结束日期
        enddate: "",
      },
      // 电箱列表
      option: [],
      // 选择的数据
      checkedele: {},
      // 复选框绑定的数据
      electricbox: [],

      // 线路列表数据
      tableData: [],

      // 阈值列表数据
      yutableData: [],

      // 确定后选择
      choose: {},

      // 周期能耗最多
      nenghaoday: "",
      // 周期总能耗
      nenghaototal: "",
      // 周期能耗数据
      dayenergy: [],
      // 周期能耗日期
      daytime: [],
      // 周期能耗排行数据
      dayenergypaihang: [],
      // 周期能耗排行日期
      daytimepaihang: [],

      // 周期天报警最多
      alarmtotalday: {},
      // 周期总报警
      alarmtotal: '',
      // 报警分析数据
      alarmdata: [],
      // 报警类型
      dayalarmtitle: [],
      // 报警排名数据
      dayalarmdata: [],


      // 选择按钮文字
      choosetext: "全选当页"
    }
  },
  methods: {
    // 初始化获取所有设备
    getOptions() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/EnergyData/getNetdSimpleList";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.option = res.data.data
      });
    },

    // 获取线路列表
    getList(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/Rform/hwUserSurvey";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.choose.nid,
          page: 0,
          size: 13,
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        // let arr1 = ['一', '二'];
        this.tableData = res.data.data;
        for (let i = 0; i < this.tableData.length; i++) {

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

          // this.tableData[i].mid = parseInt(this.tableData[i].mid, 16) + "条"
        }
      });
    },

    // 获取阈值概况
    getThreshold() {
      let type = "post";
      let url = this.urlb + "/api3/Rform/thresholdSurvey";
      let data = {
        data: {
          nid: this.choose.nid,
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.yutableData = res.data.data
      });
    },

    // 能耗分析和排行
    getEnergy() {
      let type = "post";
      let url = this.urlb + "/api3/Rform/energyaSurvey";
      let data = {
        data: {
          nid: this.choose.nid,
          start: new Date(this.form.startdate).getTime() / 1000,   //开始时间    必须是0时0分0秒
          send: (new Date(this.form.startdate).getTime() + 1000 * 60 * 60 * 24 * 29) / 1000  //结束时间     必须是23时59分59秒
          // send: this.form.enddate / 1000 + 86399  //结束时间     必须是23时59分59秒
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        if (res.data.code == 705) {

          if (res.data.maxDay) {
            this.nenghaoday = res.data.maxDay.total
          } else if (res.data.total) {
            this.nenghaototal = res.data.total
          }

          this.dayenergy = []
          this.daytime = []
          this.dayenergypaihang = []
          this.daytimepaihang = []

          res.data.table.forEach(val => {
            this.dayenergy.push(val.dzz)
            this.daytime.push(val.date)
          })
          res.data.xtable.forEach(val => {
            this.dayenergypaihang.push(val.dzz)
            this.daytimepaihang.push(val.date)
          })
          this.getdaynenghao()
          this.getdaynenghaopaihang()
        } else if (res.data.code == 706) {
          this.$message({
            showClose: true,
            message: '当前月份没有数据',
            type: 'warning'
          });
        }

      });
    },

    // 报警分析和排行
    getalarmdata() {
      let type = "post";
      let url = this.urlb + "/api3/Rform/jingyaSurvey";
      let data = {
        data: {
          nid: this.choose.nid,
          start: new Date(this.form.startdate).getTime() / 1000,   //开始时间    必须是0时0分0秒
          send: (new Date(this.form.startdate).getTime() + 1000 * 60 * 60 * 24 * 29) / 1000  //结束时间     必须是23时59分59秒
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.alarmtotal = res.data.total
        this.alarmtotalday = res.data.maxSum
        this.alarmdata = res.data.data

        this.dayalarmtitle = []
        this.dayalarmdata = []
        res.data.xtotal.forEach(val => {
          this.dayalarmtitle.push(val.title)
          this.dayalarmdata.push(val.total)
        })
        this.getalarm()
        this.getalarmpaihang()
      });
    },

    // 能耗分析和排行 - 分析图
    getdaynenghao() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("daynenghao"));
        $(window).resize(function () {
          student.resize()
        });
        student.setOption({
          // backgroundColor: '#273c87',
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
              color: "#333"
            },
          },
          legend: {
            data: "能耗",
            left: 160
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.daytime,
            axisLine: {
              lineStyle: {
                color: '#333',
              }
            },
          },
          yAxis: {
            name: "kW/h",
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#333',
              }
            },
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     color: ['#47d'],
            //     width: 1,
            //     type: 'solid'
            //   }
            // },
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            // {
            //   type: 'slider',
            //   yAxisIndex: 0,
            //   filterMode: 'empty',

            // },
            // {
            //   type: 'inside',
            //   yAxisIndex: 0,
            //   filterMode: 'empty',

            // },
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
              name: "能耗",
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              // color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531', //图例的颜色
              // lineStyle: {
              //   color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531' //改变折线颜色
              // },
              data: this.dayenergy,
            },
          ]
        });
      }, 0)
    },
    // 能耗分析和排行 - 排行图
    getdaynenghaopaihang() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("daynenghaopaihang"));
        $(window).resize(function () {
          student.resize()
        });
        student.setOption({
          // backgroundColor: '#273c87',
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
              color: "#333"
            },
          },
          legend: {
            data: "能耗",
            left: 160
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.daytimepaihang,
            axisLine: {
              lineStyle: {
                color: '#333',
              }
            },
          },
          yAxis: {
            name: "kW/h",
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#333',
              }
            },
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     color: ['#47d'],
            //     width: 1,
            //     type: 'solid'
            //   }
            // },
            boundaryGap: [0, '100%']
          },
          dataZoom: [
            // {
            //   type: 'slider',
            //   yAxisIndex: 0,
            //   filterMode: 'empty',

            // },
            // {
            //   type: 'inside',
            //   yAxisIndex: 0,
            //   filterMode: 'empty',

            // },
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
              name: "能耗",
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              // color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531', //图例的颜色
              // lineStyle: {
              //   color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531' //改变折线颜色
              // },
              data: this.dayenergypaihang,
            },
          ]
        });
      }, 0)
    },

    // 报警分析 - 分析图
    getalarm() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("alarm"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        title: {
          // text: '报警类别排名',
          x: "10",
          y: "10",
          textStyle: { //主标题文本样式
            color: "#ccc",
            fontSize: "14"
          },
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          data: ['欠压告警', '过压预警', '过压报警', '电流告警', '电流预警', '电流报警', '漏电流报警', '温度报警', '分机报警'],
          axisLine: {
            lineStyle: {
              color: '#333',
            }
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#47d'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#333',
            },
          },
        },
        series: [{
          data: this.alarmdata,
          type: 'bar',
          showBackground: true,
          barWidth: 30,//柱图宽度
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              //这里是重点
              color: function (params) {
                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                var colorList = [
                  "#c23531",
                  "#BC8F8F",
                  "#61a0a8",
                  "#d48265",
                  "#91c7ae",
                  "#749f83",
                  "#ca8622",
                  "#91c7ae",
                  "#749f83",
                  "#ca8622"
                ];
                return colorList[params.dataIndex];
              },
              label: {
                show: true,
                position: "top",
                formatter: "{b}\n{c}",
                formatter: "{c}"
              }
            }
          },
        }]
      });
    },

    // 报警分析 - 排行图
    getalarmpaihang() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("alarmpaihang"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        title: {
          // text: '报警类别排名',
          x: "10",
          y: "10",
          textStyle: { //主标题文本样式
            color: "#ccc",
            fontSize: "14"
          },
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          data: this.dayalarmtitle,
          axisLine: {
            lineStyle: {
              color: '#333',
            }
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#47d'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#333',
            },
          },
        },
        series: [{
          data: this.dayalarmdata,
          type: 'bar',
          showBackground: true,
          barWidth: 30,//柱图宽度
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              //这里是重点
              color: function (params) {
                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                var colorList = [
                  "#c23531",
                  "#BC8F8F",
                  "#61a0a8",
                  "#d48265",
                  "#91c7ae",
                  "#749f83",
                  "#ca8622",
                  "#91c7ae",
                  "#749f83",
                  "#ca8622"
                ];
                return colorList[params.dataIndex];
              },
              label: {
                show: true,
                position: "top",
                formatter: "{b}\n{c}",
                formatter: "{c}"
              }
            }
          },
        }]
      });
    },

    // 判断是否全选
    // handleCheckAllChange(val) {
    //   console.log(val)

    //   this.checkedele = val ? this.electricbox : [];
    //   this.choosetext = "取消全选"
    //   if (val == false) {
    //     this.choosetext = "全选当页"
    //   }

    //   console.log(this.checkedele)
    // },
    // 单选某项
    // handleCheckedeleChange(value) {
    //   console.log(value)
    //   this.checkedele = value
    // },

    // 确定选择电箱
    submit() {
      if (this.checkedele.nid) {
        if (this.form.startdate) {

          let obj = JSON.stringify(this.checkedele)
          // console.log(JSON.parse(obj))
          this.choose = JSON.parse(obj)
          let type = "post";
          let url = this.urlb + "/api3/Rform/hwAgentSurvey";
          let data = {
            data: {
              nid: this.choose.nid,
            }
          };
          this.myAjax(type, url, data, res => {
            // console.log(res)
            this.electricbox = res.data.data
          });
          this.getList()
          this.getThreshold()
          this.getEnergy()
          this.getalarmdata()
        } else {
          this.$message({
            showClose: true,
            message: '请选择时间',
            type: 'warning'
          });
        }

      } else {
        this.$message({
          showClose: true,
          message: '请选择电箱',
          type: 'warning'
        });
      }
      // console.log(this.form)
      // this.electricbox = obj
    },
  },

  mounted() {
    // this.$refs.eqtable.style.maxHeight = window.innerHeight - this.$refs.eqtable.$el.offsetTop - 69;
  },

  created() {
    this.getOptions()
  }

}
</script>

<style lang="less">
.usersreport {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  .el-loading-text,
  .el-icon-loading {
    color: white !important;
  }
  .el-table td,
  .el-table th {
    color: #333;
    font-size: 12px !important;
  }
  .el-table th {
    background: transparent !important;
    background-color: rgba(0, 0, 0, 0.03) !important;
    color: #333;
  }

  .leftcontent {
    width: 400px;
    // height: 820px;
    // height: 52rem;
    height: 92%;
    border: 1px solid #ccc;
    text-align: left;
    position: relative;
    background: #fff;
    .toptitle {
      width: 400px;
      height: 40px;
      line-height: 40px;
      background: #2d5c80;
      color: white;
      padding-left: 5px;
      box-sizing: border-box;
    }
    .el-header {
      height: 90px !important;
      padding: 0;
      margin-top: 6px;
      background: #f9f9f9;
      .el-form-item {
        margin-bottom: 2px !important;
        .el-form-item__label {
          font-weight: bold;
          // color: #ccc;
        }
      }
    }
    .el-main {
      .eqtable {
        overflow-y: scroll;
      }
      @media screen and (max-width: 1600px) {
        .eqtable {
          max-height: 330px;
        }
      }
      @media screen and (min-width: 1600px) {
        .eqtable {
          max-height: 520px;
        }
      }
      .el-radio-group {
        display: flex;
        flex-direction: column;
        .el-radio {
          margin: 3px 0;
          .el-radio__label {
            // color: #ccc;
          }
          .el-radio__inner {
            border-color: #1478c5;
          }
        }
      }
    }
    .el-footer {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 60px !important;
      .el-button {
        color: #fff;
        // border-radius: 0;
        border: none;
        background: #1478c5;
        // background-image: linear-gradient(to right, #32a581, #158c86);
      }
    }
  }
  .rightcontent {
    text-align: left;
    overflow-y: scroll;
    .powerContain /deep/ .el-table .el-table__row,
    .monitorTable /deep/ .el-table .el-table__row {
      color: #333;
      // background-color: rgba(0, 0, 0, 0.06) !important;
    }
    .powerContain,
    .el-table__body-wrapper {
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #dddee0 !important;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff !important;
      }
    }

    // &::-webkit-scrollbar {
    //   /*滚动条整体样式*/
    //   width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    //   height: 1px;
    // }
    // &::-webkit-scrollbar-thumb {
    //   /*滚动条里面小方块*/
    //   border-radius: 10px;
    //   // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    //   background: #dddee0;
    // }
    // &::-webkit-scrollbar-track {
    //   /*滚动条里面轨道*/
    //   // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    //   border-radius: 10px;
    //   background: #fff;
    // }
    h1,
    h2,
    h3,
    h4 {
      font-family: inherit;
      font-weight: 500;
      line-height: 1.1;
      color: inherit;
    }
    .pDiv {
      text-indent: 2em;
    }

    .report-p1 {
      width: 700px;
      height: 820px;
      clear: both;
      margin: 0 auto;
      padding: 30px;
      position: relative;
      border: 1px solid #000;
      background-color: #ffffff;
      margin-bottom: 10px;
      box-sizing: border-box;
      label {
        padding-top: 8px;
        font-weight: normal;
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700;
      }
      h1 {
        text-align: center;
        margin-top: 140px;
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 80px;
      }
      .message {
        margin: 0 auto;
        width: 400px;
        padding: 10px;
        border: 1px solid #ccc;
        background-color: #eee;
        clear: both;
        tr td:first-child {
          width: 100px;
        }
        tr td {
          padding: 10px;
          border: 1px solid #ccc;
        }
      }
      .page1-bg {
        position: absolute;
        bottom: 0;
        left: 0px;
        // left: -5px;
        width: 100%;
        // width: 101%;
      }
    }
    .report-p2 {
      position: relative;
      width: 700px;
      height: 820px;
      padding: 30px;
      margin: 0 auto;
      border: 1px solid #000;
      background-color: #ffffff;
      margin-bottom: 10px;
      box-sizing: border-box;
      h3 {
        font-size: 24px;
        margin-bottom: 20px;
      }
      h4 {
        font-size: 18px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
        text-align: center;
        td,
        th {
          padding: 8px;
          line-height: 1.42857143;
          vertical-align: top;
          border-top: 1px solid #ddd;
        }
      }
      //   .table > tbody > tr > td,
      //   .table > tbody > tr > th,
      //   .table > tfoot > tr > td,
      //   .table > tfoot > tr > th,
      //   .table > thead > tr > td,
      //   .table > thead > tr > th {
      //     padding: 8px;
      //     line-height: 1.42857143;
      //     vertical-align: top;
      //     border-top: 1px solid #ddd;
      //   }

      #powerString,
      .daycurve-p1,
      .daycurve-p2 {
        font-size: 15px;
        text-indent: 25px;
        line-height: 27px;
      }
      .powerContain {
        width: 640px;
        max-height: 460px;
        margin: 0 auto;
        overflow-y: scroll;
      }
      .page2-bg {
        width: 532px;
        height: 90px;
        z-index: -5;
        margin-left: 32px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    h4 {
      font-size: 18px;
      font-family: inherit;
      font-weight: 500;
      line-height: 1.1;
      color: inherit;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    p {
      margin: 0 0 10px;
    }
    h3 {
      font-size: 24px;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .daycurve,
    .daycurve2 {
      // width: 530px;
      width: 100%;
      height: 300px;
      margin-bottom: 10px;
      border: 1px solid #eee;
    }

    .el-table__fixed {
      height: 99% !important; //设置高优先，以覆盖内联样式
      // background: #ccc;
    }
    .el-table__fixed::before {
      height: 0px !important;
    }
    // .report-p4 /deep/ .el-table__fixed {
    //   height: 99% !important; //设置高优先，以覆盖内联样式
    //   background: #ccc;
    // }
    // .report-p4 /deep/ .el-table__fixed::before {
    //   height: 0px !important;
    // }

    .report-p4,
    .report-p5 {
      margin-bottom: 10px;
      padding: 30px;
    }
    .report-p4,
    .report-p5,
    .report-p6 {
      position: relative;
      width: 700px;
      height: 820px;
      padding: 30px;
      margin: 0 auto;
      margin-bottom: 10px !important;
      background-color: #ffffff;
      border: 1px solid #000;
      box-sizing: border-box;
    }

    .report-p4 {
      .ranking {
        // width: 530px;
        width: 100%;
        height: 280px;
        margin-bottom: 10px;
        border: solid 1px #eee;
      }
      .ranking-p {
        text-align: center;
      }
      .page3-bg {
        width: 532px;
        height: 90px;
        z-index: -5;
        margin-left: 32px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    .report-p5 {
      h4:first-child {
        font-size: 22px;
      }
      .page3-bg {
        width: 532px;
        height: 90px;
        z-index: -5;
        margin-left: 32px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      #daynenghao,
      #daynenghaopaihang {
        width: 100%;
        height: 300px;
        border: 1px solid #ccc;
      }
    }

    .report-p3 {
      position: relative;
      width: 700px;
      height: 820px;
      padding: 30px;
      margin: 0 auto;
      margin-bottom: 10px;
      background-color: #ffffff;
      border: 1px solid #000;
      box-sizing: border-box;
      #event {
        text-align: left;
      }
      p {
        font-size: 15px;
      }
      // .daycurve,
      // .daycurve2 {
      //   width: 530px;
      //   height: 250px;
      //   margin-bottom: 10px;
      //   border: 1px solid #eee;
      // }
      .change {
        margin-top: 30px;
      }
      .page3-bg {
        width: 532px;
        height: 90px;
        z-index: -5;
        margin-left: 32px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
      .daycurve {
        // width: 530px;
        width: 100%;
        height: 250px;
        margin-bottom: 10px;
        border: 1px solid #eee;
      }
      #alarm,
      #alarmpaihang {
        width: 100%;
        height: 250px;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>