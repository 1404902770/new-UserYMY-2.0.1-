<template>
  <!-- 电能质量分析 - 三相不平衡 -->
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
            label="电力类别"
            prop="eletype"
            style="width:240px"
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
            </el-select>
          </el-form-item>

          <div>
            <el-button
              type="primary"
              @click="getOnedx"
              style="margin-left:10px;"
            ><i class="el-icon-search"></i> 查 询</el-button>

          </div>
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>

        <div
          class="echartsBox"
          v-if="tableData.length!=0"
        >

          <!-- 线路01 -->
          <div
            class="charts1 charts"
            id="charts1"
            ref="charts1"
            v-if="tableData['01']?true:false"
          ></div>

          <!-- 线路02 -->
          <div
            class="charts2 charts"
            id="charts2"
            ref="charts2"
            v-if="tableData['02']?true:false"
          ></div>

          <!-- 线路03 -->
          <div
            class="charts3 charts"
            id="charts3"
            ref="charts3"
            v-if="tableData['03']?true:false"
          ></div>

          <!-- 线路04 -->
          <div
            class="charts4 charts"
            id="charts4"
            ref="charts4"
            v-if="tableData['04']?true:false"
          ></div>

          <!-- 线路05 -->
          <div
            class="charts5 charts"
            id="charts5"
            ref="charts5"
            v-if="tableData['05']?true:false"
          ></div>

          <!-- 线路06 -->
          <div
            class="charts6 charts"
            id="charts6"
            ref="charts6"
            v-if="tableData['06']?true:false"
          ></div>

          <!-- 线路07 -->
          <div
            class="charts7 charts"
            id="charts7"
            ref="charts7"
            v-if="tableData['07']?true:false"
          ></div>

          <!-- 线路08 -->
          <div
            class="charts8 charts"
            id="charts8"
            ref="charts8"
            v-if="tableData['08']?true:false"
          ></div>

          <!-- 线路09 -->
          <div
            class="charts9 charts"
            id="charts9"
            ref="charts9"
            v-if="tableData['09']?true:false"
          ></div>

          <!-- 线路10 -->
          <div
            class="charts10 charts"
            id="charts10"
            ref="charts10"
            v-if="tableData['10']?true:false"
          ></div>

          <!-- 线路11 -->
          <div
            class="charts11 charts"
            id="charts11"
            ref="charts11"
            v-if="tableData['11']?true:false"
          ></div>

          <!-- 线路12 -->
          <div
            class="charts12 charts"
            id="charts12"
            ref="charts12"
            v-if="tableData['12']?true:false"
          ></div>
        </div>

        <div
          style="color: #606266;font-size: 21px;margin-top: 60px;flex:1"
          v-if="tableData.length==0"
        >
          该电箱下暂无三相设备
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
      // 检索
      form: {
        dateof: "",
        region: "",
        eletype: ""
      },
      // 获取所有设备
      options: [],
      // 列表数据
      tableData: [],
    };
  },
  methods: {
    // 初始化获取列表
    getList(page) {
      let type = "post";
      let url = this.urlb + "/api3/SourceData/GetUnbalanceData";
      let data = {
        data: {
          dt: new Date(this.form.dateof) / 1000, //日期
          nid: this.form.region,
          type: this.form.eletype  //aa 电流 vv 电压
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableData = res.data.data;

        if (this.tableData['01']) {
          for (let i = 0; i < this.tableData['01'].time.length; i++) {
            this.tableData['01'].time[i] = new Date(this.tableData['01'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent1()
        }
        if (this.tableData['02']) {
          for (let i = 0; i < this.tableData['02'].time.length; i++) {
            this.tableData['02'].time[i] = new Date(this.tableData['02'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent2()
        }
        if (this.tableData['03']) {
          for (let i = 0; i < this.tableData['03'].time.length; i++) {
            this.tableData['03'].time[i] = new Date(this.tableData['03'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent3()
        }
        if (this.tableData['04']) {
          for (let i = 0; i < this.tableData['04'].time.length; i++) {
            this.tableData['04'].time[i] = new Date(this.tableData['04'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent4()
        }
        if (this.tableData['05']) {
          for (let i = 0; i < this.tableData['05'].time.length; i++) {
            this.tableData['05'].time[i] = new Date(this.tableData['05'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent5()
        }
        if (this.tableData['06']) {
          for (let i = 0; i < this.tableData['06'].time.length; i++) {
            this.tableData['06'].time[i] = new Date(this.tableData['06'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent6()
        }
        if (this.tableData['07']) {
          for (let i = 0; i < this.tableData['07'].time.length; i++) {
            this.tableData['07'].time[i] = new Date(this.tableData['07'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent7()
        }
        if (this.tableData['08']) {
          for (let i = 0; i < this.tableData['08'].time.length; i++) {
            this.tableData['08'].time[i] = new Date(this.tableData['08'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent8()
        }
        if (this.tableData['09']) {
          for (let i = 0; i < this.tableData['09'].time.length; i++) {
            this.tableData['09'].time[i] = new Date(this.tableData['09'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent9()
        }
        if (this.tableData['0a']) {
          for (let i = 0; i < this.tableData['0a'].time.length; i++) {
            this.tableData['0a'].time[i] = new Date(this.tableData['0a'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent10()
        }
        if (this.tableData['0b']) {
          for (let i = 0; i < this.tableData['0b'].time.length; i++) {
            this.tableData['0b'].time[i] = new Date(this.tableData['0b'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent11()
        }
        if (this.tableData['0c']) {
          for (let i = 0; i < this.tableData['0c'].time.length; i++) {
            this.tableData['0c'].time[i] = new Date(this.tableData['0c'].time[i] * 1000).Format("hh:mm:ss");
          }
          this.getStudent12()
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
        this.form.region = this.options[0].nid
        this.getList(1)
      });
    },
    // 获取下拉数据 - 电箱下线路
    getOptions1(val) {
      // let type = "post";
      // let url = this.urlb + "/api3/EnergyData/machedList";
      // let data = {
      //   data: {
      //     nid: val,
      //     uid: localStorage.getItem('uid')
      //   }
      // };
      // this.myAjax(type, url, data, res => {
      //   console.log(res)

      //   // this.options1 = res.data.data;

      // });
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
      } else if (this.form.eletype == "") {
        this.$message({
          showClose: true,
          message: '请选择电力类别',
          type: 'warning'
        });
      } else {
        this.getList(1)
      }
    },

    // 线路1
    getStudent1() {
      // if (this.fitem.type == '81' || this.fitem.type == '91' || this.fitem.type == '11' || this.fitem.type == '01') {
      //   var tuli = ["电压A相", "电压B相", "电压C相"]
      // } else {
      // var tuli = ["电压A相", "电压B相", "电压C相"]
      // }
      // console.log(Math.max.apply(null, this.listdianya))
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts1"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['01'] ? this.tableData['01'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
            // borderColor: '#ff0000'
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              // 保存图片
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['01'] ? this.tableData['01'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            // min: Math.floor(Math.min.apply(null, this.listdianya))
            scale: true
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['01'] ? this.tableData['01'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['01'] ? this.tableData['01'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['01'] ? this.tableData['01'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路2
    getStudent2() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts2"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['02'] ? this.tableData['02'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['02'] ? this.tableData['02'].time : "",
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['02'] ? this.tableData['02'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['02'] ? this.tableData['02'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['02'] ? this.tableData['02'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路3
    getStudent3() {
      // if (this.fitem.type == '81' || this.fitem.type == '91' || this.fitem.type == '11' || this.fitem.type == '01') {
      //   var tuli = ["电流A相", "电流B相", "电流C相"]
      // } else {
      var tuli = ["电流"]
      // }

      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts3"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['03'] ? this.tableData['03'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['03'] ? this.tableData['03'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
            scale: true,
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
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['03'] ? this.tableData['03'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['03'] ? this.tableData['03'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['03'] ? this.tableData['03'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路4
    getStudent4() {
      // if (this.fitem.type == '81' || this.fitem.type == '91' || this.fitem.type == '11' || this.fitem.type == '01') {
      //   var tuli = ["有功功率A相", "有功功率B相", "有功功率C相"]
      // } else {
      var tuli = ["有功功率"]
      // }

      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts4"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['04'] ? this.tableData['04'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['04'] ? this.tableData['04'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            scale: true
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['04'] ? this.tableData['04'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['04'] ? this.tableData['04'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['04'] ? this.tableData['04'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路5
    getStudent5() {
      // if (this.fitem.type == '81' || this.fitem.type == '91' || this.fitem.type == '11' || this.fitem.type == '01') {
      //   var tuli = ["无功功率A相", "无功功率B相", "无功功率C相"]
      // } else {
      var tuli = ["无功功率"]
      // }

      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts5"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['05'] ? this.tableData['05'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['05'] ? this.tableData['05'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            scale: true
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['05'] ? this.tableData['05'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['05'] ? this.tableData['05'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['05'] ? this.tableData['05'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路6
    getStudent6() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts6"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['06'] ? this.tableData['06'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['06'] ? this.tableData['06'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['06'] ? this.tableData['06'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['06'] ? this.tableData['06'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['06'] ? this.tableData['06'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路7
    getStudent7() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts7"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['07'] ? this.tableData['07'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['07'] ? this.tableData['07'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['07'] ? this.tableData['07'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['07'] ? this.tableData['07'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['07'] ? this.tableData['07'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路8
    getStudent8() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts8"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['08'] ? this.tableData['08'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['08'] ? this.tableData['08'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['08'] ? this.tableData['08'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['08'] ? this.tableData['08'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['08'] ? this.tableData['08'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路9
    getStudent9() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts9"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['09'] ? this.tableData['09'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['09'] ? this.tableData['09'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['09'] ? this.tableData['09'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['09'] ? this.tableData['09'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['09'] ? this.tableData['09'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路10
    getStudent10() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts10"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['0a'] ? this.tableData['0a'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['0a'] ? this.tableData['0a'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['0a'] ? this.tableData['0a'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['0a'] ? this.tableData['0a'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['0a'] ? this.tableData['0a'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路11
    getStudent11() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts11"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['0b'] ? this.tableData['0b'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['0b'] ? this.tableData['0b'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              data: this.tableData['0b'] ? this.tableData['0b'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['0b'] ? this.tableData['0b'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['0b'] ? this.tableData['0b'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
    },

    // 线路12
    getStudent12() {
      let _this = this;
      setTimeout(() => {
        let student = _this.$echarts.init(document.getElementById("charts12"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          title: {
            text: this.tableData['0c'] ? this.tableData['0c'].name : "",
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: this.form.eletype == 'aa' ? ["A相电流", "B相电流", "C相电流"] : ["A相电压", "B相电压", "C相电压"],
            left: 160,
            // textStyle: {
            //   color: '#606060'//字体颜色
            // },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            iconStyle: {
              borderColor: '#606060'
            },
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.tableData['0c'] ? this.tableData['0c'].time : [],
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: {
            name: this.form.eletype == 'aa' ? '单位：（A）' : '单位：（V）',
            type: "value",
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
            // min: 220
          },
          series: [
            {
              name: this.form.eletype == 'aa' ? "A相电流" : "A相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                // color: '#E34130'
                color: '#E3CC30'
              },
              itemStyle: {
                normal: {
                  label: { show: true },
                  color: "#FFD700	", //图例的颜色
                  lineStyle: {
                    color: "#FFD700	" //改变折线颜色
                  }
                }
              },
              data: this.tableData['0c'] ? this.tableData['0c'].bb1 : [],
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
            },
            {
              name: this.form.eletype == 'aa' ? "B相电流" : "B相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#158C86'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(21,140,134,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['0c'] ? this.tableData['0c'].bb2 : []
            },
            {
              name: this.form.eletype == 'aa' ? "C相电流" : "C相电压",
              type: "line",
              smooth: true,
              itemStyle: {
                color: '#E34130'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227, 65, 48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.tableData['0c'] ? this.tableData['0c'].bb3 : []
            }
          ]
        });
        student.resize();
      }, 0);
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
  mounted() { },
  created() {
    this.form.eletype = "aa"
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
        border: none;
        border-radius: 0;
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
    }
  }
  .el-main {
    color: #333;
    text-align: center;
    padding: 0;
    height: 100%;

    .echartsBox {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
    .charts {
      width: 50%;
      height: 300px;
      margin-top: 3%;
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
  