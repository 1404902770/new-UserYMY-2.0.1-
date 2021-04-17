<template>
  <!-- 综合报警 - 线路报警分析 -->
  <div class="alarmProcessingwy">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <div class="btngroup">
          <button
            class="tabbtn avtivetabbtn"
            @click="handleClick('first',$event)"
          >报警排名</button>
          <button
            class="tabbtn"
            @click="handleClick('second',$event)"
          >报警分析</button>
        </div>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <!-- 列表 - 报警排名 -->
        <div
          v-show="activeName=='first'?true:false"
          class="tablebox onebox"
        >
          <!-- 线路排名 -->
          <div style="width:46%">
            <div
              class="headtitle"
              style="margin:0 0 20px 0"
            ><span class="decoration"></span>回路排名</div>
            <div style="background: #fff;padding:20px">
              <!-- <el-button
                @click="screening1"
                type="primary"
              >筛选条件</el-button>
              <el-dialog
                title="筛选条件"
                width="30%"
                :visible.sync="dialogFormVisible1"
              > -->
              <el-form
                ref="form"
                :model="form"
                class="demo-ruleForm"
                label-width="60px"
              >
                <el-form-item
                  label="选择"
                  prop="p1"
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
                    @change="getList"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item
                  label="电箱"
                  prop="region"
                  class="dianxiang"
                >
                  <el-select
                    v-model="form.region"
                    filterable
                    placeholder="请选择电箱名称"
                    @change="getList"
                  >
                    <el-option
                      v-for="(item,index) in options"
                      :label="'['+getString1(hexCharCodeToStr(item.nid))+']' + item.n_name"
                      :value="item.nid"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <!-- <el-button
                  type="primary"
                  @click="submitForm"
                >查询</el-button> -->

              </el-form>
              <!-- </el-dialog> -->

              <el-table
                :data="tableData"
                border
                stripe
                height="240"
                style="width: 100%"
              >
                <el-table-column
                  prop="num"
                  show-overflow-tooltip
                  label="排名"
                  align="center"
                  min-width="80"
                ></el-table-column>

                <el-table-column
                  prop="name"
                  show-overflow-tooltip
                  label="回路名称"
                  align="center"
                  min-width="80"
                ></el-table-column>

                <el-table-column
                  prop="total"
                  show-overflow-tooltip
                  label="报警数目"
                  align="center"
                  min-width="80"
                ></el-table-column>

                <el-table-column
                  label="未确认数目"
                  align="center"
                  min-width="80"
                >
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.total -  scope.row.chuli - scope.row.chakan}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="clbili"
                  show-overflow-tooltip
                  label="处理比"
                  align="center"
                  min-width="60"
                ></el-table-column>

              </el-table>
            </div>

            <div id="echarts1"></div>
          </div>

          <!-- 类型排名 -->
          <div style="width:46%">
            <div
              class="headtitle"
              style="margin:0 0 20px 0"
            ><span class="decoration"></span>报警类别排名</div>
            <div style="background: #fff;padding:20px">
              <!-- <el-button
                @click="screening2"
                type="primary"
              >筛选条件</el-button>
              <el-dialog
                title="筛选条件"
                width="30%"
                :visible.sync="dialogFormVisible2"
              > -->
              <el-form
                ref="formalarmtype"
                :model="formalarmtype"
                class="demo-ruleForm"
                label-width="46px"
              >
                <el-form-item
                  label="时间"
                  prop="p1"
                >
                  <el-date-picker
                    v-model="formalarmtype.dateof"
                    type="daterange"
                    align="right"
                    unlink-panels
                    value-format='timestamp'
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    popper-class="datetime"
                    @change="getalarmtype"
                  >
                  </el-date-picker>
                </el-form-item>

                <el-form-item
                  label="电箱"
                  prop="region"
                  class="dianxiang"
                >
                  <el-select
                    v-model="formalarmtype.region"
                    filterable
                    placeholder="请选择电箱名称"
                    @change="getlines"
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
                  label="回路"
                  prop="line"
                  class="dianxiang"
                >
                  <el-select
                    v-model="formalarmtype.line"
                    filterable
                    clearable
                    placeholder="请选择线路"
                    @change="getalarmtype"
                  >
                    <el-option
                      v-for="(item,index) in linearry"
                      :label="item.name"
                      :value="item.mid"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <!-- <el-button
                    type="primary"
                    @click="submitForm"
                  >查询</el-button> -->

              </el-form>
              <!-- </el-dialog> -->

              <el-table
                :data="tableDatatype"
                border
                stripe
                height="240"
                style="width: 100%"
              >
                <el-table-column
                  prop="num"
                  show-overflow-tooltip
                  label="排名"
                  align="center"
                  min-width="80"
                ></el-table-column>

                <el-table-column
                  prop="name"
                  show-overflow-tooltip
                  label="报警类型"
                  align="center"
                  min-width="80"
                ></el-table-column>

                <el-table-column
                  prop="total"
                  show-overflow-tooltip
                  label="报警数目"
                  align="center"
                  min-width="80"
                ></el-table-column>

                <el-table-column
                  label="未确认数目"
                  align="center"
                  min-width="80"
                >
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.total -  scope.row.chuli - scope.row.chakan}}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="clbili"
                  show-overflow-tooltip
                  label="处理比"
                  align="center"
                  min-width="60"
                ></el-table-column>

              </el-table>
            </div>

            <div id="echarts2"></div>
          </div>

        </div>

        <!-- 报警分析 -->
        <div
          v-show="activeName=='second'?true:false"
          class="tablebox twobox"
        >
          <!-- 月度报警信息 -->
          <div style="width:46%">
            <!-- <el-button
              @click="screening3"
              type="primary"
            >筛选条件</el-button>
            <el-dialog
              title="筛选条件"
              width="30%"
              :visible.sync="dialogFormVisible3"
            > -->
            <el-form
              ref="formmonth"
              :model="formmonth"
              class="demo-ruleForm"
              label-width="46px"
            >
              <el-form-item
                label="时间"
                prop="p1"
              >
                <el-date-picker
                  v-model="formmonth.dateof"
                  type="month"
                  align="right"
                  unlink-panels
                  value-format='yyMM'
                  popper-class="datetime"
                  @change="getmonth"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="电箱"
                prop="region"
                class="dianxiang"
              >
                <el-select
                  v-model="formmonth.region"
                  filterable
                  placeholder="全部"
                  @change='getlines1'
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
                label="回路"
                prop="line"
                class="dianxiang"
              >
                <el-select
                  v-model="formmonth.line"
                  filterable
                  clearable
                  placeholder="请选择线路"
                  @change="getmonth"
                >
                  <el-option
                    v-for="(item,index) in linearry"
                    :label="item.name"
                    :value="item.mid"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- <el-button
                  type="primary"
                  @click="submitForm"
                >查询</el-button> -->

            </el-form>
            <!-- </el-dialog> -->

            <div class="headtitle"><span class="decoration"></span>月度报警信息统计</div>
            <div id="echarts3"></div>
            <div class="headtitle"><span class="decoration"></span>月度报警类型占比</div>
            <div id="echarts4"></div>
          </div>

          <!-- 年度报警信息 -->
          <div style="width:46%">
            <!-- <el-button
              @click="screening4"
              type="primary"
            >筛选条件</el-button>
            <el-dialog
              title="筛选条件"
              width="30%"
              :visible.sync="dialogFormVisible4"
            > -->
            <el-form
              ref="formyear"
              :model="formyear"
              class="demo-ruleForm"
              label-width="46px"
            >
              <el-form-item
                label="时间"
                prop="p1"
              >
                <el-date-picker
                  v-model="formyear.dateof"
                  type="year"
                  align="right"
                  unlink-panels
                  value-format='yyyy'
                  popper-class="datetime"
                  @change="getyear"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item
                label="电箱"
                prop="region"
                class="dianxiang"
              >
                <el-select
                  v-model="formyear.region"
                  filterable
                  placeholder="全部"
                  @change='getlines2'
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
                label="回路"
                prop="line"
                class="dianxiang"
              >
                <el-select
                  v-model="formyear.line"
                  filterable
                  clearable
                  placeholder="请选择线路"
                  @change="getyear"
                >
                  <el-option
                    v-for="(item,index) in linearry"
                    :label="item.name"
                    :value="item.mid"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- <el-button
                type="primary"
                @click="submitForm"
              >查询</el-button> -->

            </el-form>
            <!-- </el-dialog> -->

            <div class="headtitle"><span class="decoration"></span>年度报警信息统计</div>
            <div id="echarts5"></div>
            <div class="headtitle"><span class="decoration"></span>年度报警类型占比</div>
            <div id="echarts6"></div>
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
import $ from "jquery";
import copyright from "../../components/copyright";
export default {
  name: "alarmProcessingwy",
  components: {
    copyright
  },
  data() {
    return {
      activeName: 'first',

      // 检索
      form: {
        region: "",
        pu: "",
        line: "",
        dateof: []
      },
      // 报警类型排名检索
      formalarmtype: {
        region: "",
        dateof: [],
        line: ""
      },
      // 月度报警信息检索
      formmonth: {
        dateof: "",
        region: "",
        line: ""
      },
      // 年度报警信息检索
      formyear: {
        dateof: "",
        region: "",
        line: ""
      },
      // 获取所有设备
      options: [],
      // 报警类型
      jingtype: [],
      // 线路信息
      linearry: [],

      // 线路报警列表数据
      tableData: [],
      // 线路排名x轴
      elename: [],
      // 线路排名数据
      eledata: [],

      // 报警类型列表数据
      tableDatatype: [],
      // 报警类型x轴
      typename: [],
      // 报警类型排名数据
      typedata: [],

      // 月度报警信息统计数据
      Mdata: [],
      // 月度报警类型占比数据
      monthlydata: [],

      // 年度报警信息统计数据
      Ydata: [],
      // 年度报警类型占比数据
      yeardata: [],

      // dialogFormVisible1: false,
      // dialogFormVisible2: false,
      // dialogFormVisible3: false,
      // dialogFormVisible4: false,

    };
  },
  methods: {
    handleClick(tab, activedom) {
      // console.log(tab, event);
      this.activeName = tab

      $(activedom.srcElement).addClass('avtivetabbtn')
      $(activedom.srcElement).siblings().removeClass('avtivetabbtn')
      // if (this.activeName == "third") {
      //   this.getListmonth()
      // } else if (this.activeName == "fourth") {
      //   this.getListyear()
      // }
      if (this.activeName == 'second') {
        this.getmonth()
        this.getyear()
        // this.getStudent3()
        // this.getStudent4()
        // this.getStudent5()
        // this.getStudent6()
      }
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
        this.options = res.data.data;
        this.form.region = this.options[0].nid
        this.formalarmtype.region = this.options[0].nid
        this.formmonth.region = this.options[0].nid
        this.formyear.region = this.options[0].nid
        this.getList(1)
        this.getlines()
      });
    },
    // 选择电箱获取线路
    getlines() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = 'post'
      let url = this.urla + '/api3/EnergyData/getNetedMachedList'
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.formalarmtype.region
        }
      }
      this.myAjax(type, url, data, res => {
        this.linearry = res.data.data
        this.formalarmtype.line = this.linearry[0].mid
        this.formmonth.line = this.linearry[0].mid
        this.formyear.line = this.linearry[0].mid
        this.getalarmtype(1)
      })
    },
    // 选择电箱获取线路
    getlines1() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = 'post'
      let url = this.urla + '/api3/EnergyData/getNetedMachedList'
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.formmonth.region
        }
      }
      this.myAjax(type, url, data, res => {
        this.linearry = res.data.data
        this.formmonth.line = this.linearry[0].mid
        this.getmonth()
      })
    },
    // 选择电箱获取线路
    getlines2() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = 'post'
      let url = this.urla + '/api3/EnergyData/getNetedMachedList'
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.formyear.region
        }
      }
      this.myAjax(type, url, data, res => {
        this.linearry = res.data.data
        this.formyear.line = this.linearry[0].mid
        this.getyear()
      })
    },

    // // 报警排名 - 回路排名筛选
    // screening1() {
    //   this.dialogFormVisible1 = true
    // },
    // // 报警排名 - 报警类别排名筛选
    // screening2() {
    //   this.dialogFormVisible2 = true
    // },
    // // 报警排名 - 报警分析月度报警信息统计
    // screening3() {
    //   this.dialogFormVisible3 = true
    // },
    // // 报警排名 - 报警分析年度报警信息统计
    // screening4() {
    //   this.dialogFormVisible4 = true
    // },

    // 获取报警排名线路排名列表
    getList(page) {
      if (this.form.region != "") {
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = "post";
        let url = this.urlb + "/api3/EnergyData/hwUserJingMonth";
        let data = {
          data: {
            uid: uid,
            // uid: localStorage.getItem("uid"),
            nid: this.form.region,
            start: this.form.dateof[0] / 1000,  //必传，没有选择就选当天开始的时间
            sendt: this.form.dateof[1] / 1000  //必传，没有就选择比start大的时间
          }
        };

        this.myAjax(type, url, data, res => {
          // console.log(res)
          this.elename = []
          this.eledata = []
          this.tableData = res.data.data;
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].num = i + 1
            this.elename.push(this.tableData[i].name)
            this.eledata.push(this.tableData[i].total)
          }
          this.getStudent1()
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择电箱',
          type: 'warning'
        });
      }
    },
    // 获取报警类别排名列表
    getalarmtype(page) {
      if (this.formalarmtype.line != "") {
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = "post";
        let url = this.urlb + "/api3/EnergyData/hwUserJingYear";
        let data = {
          data: {
            uid: uid,
            // uid: localStorage.getItem("uid"),
            start: this.formalarmtype.dateof[0] / 1000,  //必传，没有选择就选当天开始的时间
            sendt: this.formalarmtype.dateof[1] / 1000,   //必传，没有就选择比start大的时间
            nid: this.formalarmtype.region,   //必传
            mid: this.formalarmtype.line
          }
        };

        this.myAjax(type, url, data, res => {
          this.typename = []
          this.typedata = []
          this.tableDatatype = res.data.data;
          for (let i = 0; i < this.tableDatatype.length; i++) {
            this.tableDatatype[i].num = i + 1
            this.typename.push(this.tableDatatype[i].name)
            this.typedata.push(this.tableDatatype[i].total)

            if (this.tableDatatype[i].name == "占位") {
              this.tableDatatype.splice(i, 2)
            }
          }
          this.typename.pop()
          this.getStudent2()
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择线路',
          type: 'warning'
        });
      }
    },

    // 月度报警信息
    getmonth() {
      if (this.formmonth.line != '') {
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = "post";
        let url = this.urlb + "/api3/EnergyData/hwUserJingMFen";
        let data = {
          data: {
            uid: uid,
            // uid: localStorage.getItem("uid"),
            nid: this.formmonth.region, //可选，无nid参数即为该用户名下所有电箱
            mid: this.formmonth.line,
            time: this.formmonth.dateof   //时间，年份的后两位 + 两位月份
          }
        };

        this.myAjax(type, url, data, res => {
          // console.log(res)
          this.Mdata = res.data.data.day
          this.monthlydata = res.data.data.type
          this.getStudent3()
          this.getStudent4()
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择线路',
          type: 'warning'
        });
      }

    },
    // 年度报警信息
    getyear() {
      if (this.formmonth.line != '') {
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = "post";
        let url = this.urlb + "/api3/EnergyData/hwUserJingYFen";
        let data = {
          data: {
            uid: uid,
            // uid: localStorage.getItem("uid"),
            nid: this.formyear.region, //可选，无nid参数即为该用户名下所有电箱
            mid: this.formyear.line,
            time: this.formyear.dateof
          }
        };

        this.myAjax(type, url, data, res => {
          // console.log(res)
          this.yeardata = res.data.data
          this.Ydata = res.data.month
          this.getStudent5()
          this.getStudent6()
        })
      } else {
        this.$message({
          showClose: true,
          message: '请选择线路',
          type: 'warning'
        });
      }
    },

    // 获取年和月
    getmonthyear() {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();

      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }

      this.formmonth.dateof = tYear.toString().substr(2, 2) + m
      this.formyear.dateof = tYear.toString()
    },

    // 线路排名图
    getStudent1() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts1"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        // title: {
        //   text: '线路排名',
        //   textStyle: { //主标题文本样式
        //     color: "#ccc",
        //     fontSize: "14"
        //   },
        //   x: "10",
        //   y: "10"
        // },
        tooltip: {},
        xAxis: {
          type: 'category',
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40
          },
          data: _this.elename,
          axisLine: {
            lineStyle: {
              color: '#767676',
            }
          },
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            // lineStyle: {
            //   color: ['#47d'],
            //   width: 1,
            //   type: 'solid'
            // }
          },
          axisLine: {
            lineStyle: {
              // color: '#ccc',
            },
          },
          axisLine: {     //x轴坐标轴
            show: false
          },
          axisTick: {		//x轴刻度线
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#767676',//坐标值得具体的颜色
            }
          },
        },
        series: [{
          data: _this.eledata,
          type: 'bar',
          showBackground: true,
          barWidth: 15,//柱图宽度
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              barBorderRadius: 6,
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#167AC6' },
                  { offset: 1, color: '#60BAFE' }
                ]
              ),
              // label: {
              //   show: true,
              //   position: "top",
              //   formatter: "{b}\n{c}",
              //   formatter: "{c}"
              // }
            }
          },
        }]
      });
    },

    // 报警类型排名图
    getStudent2() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("echarts2"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        // title: {
        //   text: '报警类别排名',
        //   textStyle: { //主标题文本样式
        //     color: "#ccc",
        //     fontSize: "14"
        //   },
        //   x: "10",
        //   y: "10"
        // },
        xAxis: {
          show: false
          // type: 'category',
          // //坐标轴斜着显示
          // axisLabel: {
          //   interval: 0,
          //   rotate: 40
          // },
          // axisLine: {
          //   lineStyle: {
          //     color: '#ccc',
          //   }
          // },
          // data: _this.typename
        },
        yAxis: {
          type: 'category',
          splitLine: {
            show: false,
            // lineStyle: {
            //   color: ['#47d'],
            //   width: 1,
            //   type: 'solid'
            // }
          },
          data: _this.typename,
          axisLine: {
            lineStyle: {
              // color: '#ccc',
            },
          },
          axisLine: {     //x轴坐标轴
            show: false
          },
          axisTick: {		//x轴刻度线
            show: false
          },
        },
        series: [{
          data: _this.typedata,
          type: 'bar',
          showBackground: true,
          barWidth: 7,//柱图宽度
          // backgroundStyle: {
          //   color: 'rgba(220, 220, 220, 0.8)'
          // },
          z: 3,
          itemStyle: {
            normal: {
              barBorderRadius: 6,
              color: new this.$echarts.graphic.LinearGradient(
                1, 0, 0, 0,
                [
                  { offset: 0, color: '#5A72ED' },
                  { offset: 1, color: '#BD7DF7' }
                ]
              ),
              label: {
                show: true,
                position: "right",
                formatter: "{b}\n{c}",
                formatter: "{c}"
              }
            },
          },
        }, {
          type: 'bar',
          stack: 'chart',
          barGap: '-100%',
          // barCategoryGap: '40%',
          silent: true,
          itemStyle: {
            color: '#eee'
          },
          data: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000]
        },]
      });
    },

    // 月度报警信息统计图
    getStudent3() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("echarts3"));
        $(window).resize(function () {
          student.resize();
        });

        student.setOption({
          // title: {
          //   text: '月度报警信息统计',
          //   textStyle: { //主标题文本样式
          //     color: "#ccc",
          //     fontSize: "14"
          //   },
          //   x: "10",
          //   y: "10"
          // },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'],
            axisLine: {
              lineStyle: {
                color: '#767676',
              }
            },
          },
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 60,

          }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            textStyle: { color: "#767676" },
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              // lineStyle: {
              //   color: ['#47d'],
              //   width: 1,
              //   type: 'solid'
              // }
            },
            axisLine: {
              lineStyle: {
                // color: '#ccc',
              },
            },
            axisLine: {     //x轴坐标轴
              show: false
            },
            axisTick: {		//x轴刻度线
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#767676',//坐标值得具体的颜色
              }
            },
          },
          series: [{
            data: _this.Mdata,
            type: 'bar',
            showBackground: true,
            barWidth: 15,//柱图宽度
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            itemStyle: {
              normal: {
                barBorderRadius: 7,
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#5B72ED' },
                    { offset: 1, color: '#BD7DF7' }
                  ]
                ),
                // label: {
                //   show: true,
                //   position: "top",
                //   formatter: "{b}\n{c}",
                //   formatter: "{c}"
                // }
              }
            },
          }]
        });
      }, 0);


    },
    // 月度报警信息占比
    getStudent4() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("echarts4"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          // title: {
          //   text: "月度报警类型占比",
          //   textStyle: { //主标题文本样式
          //     color: "#ccc",
          //     fontSize: "14"
          //   },
          //   x: "10",
          //   y: "10"
          // },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            right: 60,
            top: 40,
            data: [
              "欠压告警",
              "过压预警",
              "过压报警",
              "电流告警",
              "电流预警",
              "电流报警",
              "漏电流报警",
              "温度报警",
              "分机报警"
            ],
            textStyle: {
              fontSize: 12,
              color: '#767676'
            }
          },
          color: ['#13DFCE', '#1BB1FF', "#486FFF", "#993FFF", "#F238EC", "#FF366A", "#FFA734", "#ACFF2A", "#37E533"],
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.monthlydata[0], name: "欠压告警" },
                { value: this.monthlydata[1], name: "过压预警" },
                { value: this.monthlydata[2], name: "过压报警" },
                { value: this.monthlydata[3], name: "电流告警" },
                { value: this.monthlydata[4], name: "电流预警" },
                { value: this.monthlydata[5], name: "电流报警" },
                { value: this.monthlydata[6], name: "漏电流报警" },
                { value: this.monthlydata[7], name: "温度报警" },
                { value: this.monthlydata[8], name: "分机报警" }
              ]
            }
          ]
        });
      }, 0);

    },

    // 年度报警信息统计
    getStudent5() {
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("echarts5"));
        $(window).resize(function () {
          student.resize();
        });

        student.setOption({
          // title: {
          //   text: '年度报警信息统计',
          //   textStyle: { //主标题文本样式
          //     color: "#ccc",
          //     fontSize: "14"
          //   },
          //   x: "10",
          //   y: "10"
          // },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisLine: {
              lineStyle: {
                color: '#767676',
              }
            },
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              // lineStyle: {
              //   color: ['#47d'],
              //   width: 1,
              //   type: 'solid'
              // }
            },
            axisLine: {
              lineStyle: {
                // color: '#ccc',
              },
            },
            axisLine: {     //x轴坐标轴
              show: false
            },
            axisTick: {		//x轴刻度线
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#767676',//坐标值得具体的颜色
              }
            },
          },
          series: [{
            data: _this.Ydata,
            type: 'bar',
            showBackground: true,
            barWidth: 15,//柱图宽度
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
            itemStyle: {
              normal: {
                barBorderRadius: 7,
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#ECA159' },
                    { offset: 1, color: '#F6CB79' }
                  ]
                ),
                // label: {
                //   show: true,
                //   position: "top",
                //   formatter: "{b}\n{c}",
                //   formatter: "{c}"
                // }
              }
            },
          }]
        });
      })

    },
    // 年度报警类型占比
    getStudent6() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("echarts6"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          // title: {
          //   text: "年度报警类型占比",
          //   textStyle: { //主标题文本样式
          //     color: "#ccc",
          //     fontSize: "14"
          //   },
          //   x: "10",
          //   y: "10"
          // },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            right: 60,
            top: 40,
            data: [
              "欠压告警",
              "过压预警",
              "过压报警",
              "电流告警",
              "电流预警",
              "电流报警",
              "漏电流报警",
              "温度报警",
              "分机报警"
            ],
            textStyle: {
              fontSize: 12,
              color: '#767676'
            }
          },
          color: ['#13DFCE', '#1BB1FF', "#486FFF", "#993FFF", "#F238EC", "#FF366A", "#FFA734", "#ACFF2A", "#37E533"],
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: this.yeardata[0], name: "欠压告警" },
                { value: this.yeardata[1], name: "过压预警" },
                { value: this.yeardata[2], name: "过压报警" },
                { value: this.yeardata[3], name: "电流告警" },
                { value: this.yeardata[4], name: "电流预警" },
                { value: this.yeardata[5], name: "电流报警" },
                { value: this.yeardata[6], name: "漏电流报警" },
                { value: this.yeardata[7], name: "温度报警" },
                { value: this.yeardata[8], name: "分机报警" }
              ]
            }
          ]
        });
      }, 0);

    },

    // 获取当前日期和前一天
    setdate() {
      var timestamp = (new Date()).getTime();

      // console.log(timestamp);//打印当前时间戳
      this.form.dateof.push(timestamp - 24 * 60 * 60 * 1000)
      this.form.dateof.push(timestamp)
      // console.log(timestamp - 24 * 60 * 60 * 1000);
      this.formalarmtype.dateof.push(timestamp - 24 * 60 * 60 * 1000)
      this.formalarmtype.dateof.push(timestamp)
    },

  },
  mounted() {
    this.getmonthyear()
    // this.getStudent1()
    // this.getStudent2()

  },
  created() {
    this.setdate()
    this.getOptions();
    // this.getList(1);
    // this.getjingtype()
  }
};
</script>
  
<style lang="less" scoped>
.alarmProcessingwy .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}
.alarmProcessingwy {
  height: 100%;
  .el-header {
    .el-form {
      text-align: left;
      margin-top: 10px;
      .el-form-item {
        float: left;
      }
      // .el-date-editor.el-input,
      // .el-date-editor.el-input__inner {
      //   // width: 150px;
      //   border: 1px solid #47d;
      //   background: transparent;
      // }
      // .el-date-editor /deep/.el-range-separator {
      //   color: #ccc;
      // }
      // .el-date-editor /deep/.el-range-input {
      //   background: transparent;
      // }

      .el-button {
        margin-top: 3px;
        padding: 9px 20px;
        margin-left: 20px;
      }
      .dianxiang {
        width: 360px;
        .el-select {
          width: 100%;
        }
      }
      .el-date-editor /deep/ .el-range__icon {
        line-height: 26px !important;
      }
    }
    .btngroup {
      text-align: left;
      padding-top: 15px;
      box-sizing: border-box;
    }
    .tabbtn {
      border-radius: 4px;
      padding: 7px 12px;
      background: transparent;
      border: 1px solid #1478c5;
      color: #1478c5;
      margin-left: 10px;
      outline: none;
      cursor: pointer;
    }
    .avtivetabbtn {
      border: none;
      color: #fff;
      background: #1478c5;
    }
  }
  // .el-header /deep/ .el-tabs__item {
  //   color: #ccc;
  // }
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
      display: flex;
      background: #fff;
      padding: 20px 0 0 0;
      .el-form-item {
        font-weight: bold;
      }
      .el-form-item /deep/ .el-range-input,
      .el-form-item /deep/ .el-input__inner {
        border: none;
        // border-radius: 0;
        background: #e4e4e4;
      }

      // .el-form-item/deep/.el-form-item__label,
      // .el-date-editor /deep/.el-range-separator {
      //   color: #ccc;
      // }
      // .el-date-editor /deep/.el-range-input {
      //   color: #ccc;
      //   background: transparent;
      // }

      .el-button {
        margin-top: 3px;
        padding: 9px 20px;
        margin-left: 20px;
      }
      .dianxiang {
        width: 230px;
        .el-select {
          width: 100%;
        }
        // .el-select /deep/ .el-input__inner {
        //   color: #ccc;
        //   border: 1px solid #47d;
        //   background: transparent;
        // }
      }

      .el-date-editor /deep/ .el-range__icon {
        line-height: 26px !important;
      }
    }

    .twobox {
      .el-form-item/deep/.el-date-editor,
      .el-date-editor/deep/.el-input__inner {
        width: 140px !important;
        // color: #ccc;
        // border: 1px solid #47d;
        // background: transparent;
      }
    }
    .headtitle {
      width: 49%;
      text-align: left;
      font-size: 22px;
      font-weight: bold;
      color: #212121;
      margin-top: 20px;
      .decoration {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 10px;
        // background-image: linear-gradient(to right, #32a581, #158c86);
        background: #1478c5;
      }
    }
    .onebox {
      .el-date-editor {
        width: 260px;
        // border: 1px solid #47d;
        background: #e4e4e4;
      }
      .el-form-item /deep/ .el-range-input,
      .el-form-item /deep/ .el-input__inner {
        background: #e4e4e4;
      }
    }

    .infobar {
      // height: 60px;
      // color: #ccc;
      display: flex;
      justify-content: space-around;
      padding: 9px 0;
      // background: rgba(0, 0, 0, 0.4);
      .item {
        display: flex;
        justify-content: space-around;
        .numbox {
          margin: 0 10px;
          .numtext {
            margin-bottom: 12px;
          }
          .num {
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
    }
    .tablebox {
      // margin-top: 20px;
      display: flex;
      justify-content: space-around;
    }
    #echarts1,
    #echarts2,
    #echarts3,
    #echarts4,
    #echarts5,
    #echarts6 {
      width: 100%;
      height: 300px;
      margin-top: 20px;
      background: #fff;
      // border: 1px solid #47d;
    }

    #echarts2 {
      padding-left: 20px;
      box-sizing: border-box;
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
  }
  .el-footer {
  }
}
</style>
  