<template>
  <!-- 用电监测 - 24小时能耗 -->
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
            >
              <el-option
                v-for="(item,index) in options"
                :label="'['+getString1(hexCharCodeToStr(item.nid))+'] ' + item.n_name + ' [' + item.n_local +']'"
                :value="item.nid"
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
            >图 表</el-button> -->

            <!-- <el-button
              size="medium"
              type="primary"
              class="three"
            >导 出</el-button> -->

          </div>

          <div
            class="choice"
            v-if="allLineData!=''"
          >
            <el-form-item
              label="选择回路"
              prop="allLineData"
            >
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                style="float: left;margin-right: 20px;"
              >全选回路</el-checkbox>
              <el-checkbox-group
                v-model="checkedCities"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="(item,index) in allLineData"
                  :label="item.mid"
                  :key="index"
                >{{'[' + '回路' + item.mid +']'+item.name}}</el-checkbox>
              </el-checkbox-group>

              <!-- <el-radio-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <template v-for="(item,index) in allLineData">
                  <el-radio :key="index" :label="item.mid">{{'[' + '线路' + item.mid +']'+item.name}}</el-radio>
                </template>
              </el-radio-group>-->
            </el-form-item>
          </div>
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>

        <div
          class="charts1"
          id="charts1"
          ref="charts1"
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      // 检索
      form: {
        dateof: "",
        region: "",
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 列表数据
      tableData: {},

      zhexian: null,

      // 切换图表和表格
      tag: 1,

      // 获取所有线路
      allLineData: [],
      // 已选的线路
      checkedCities: [],
      checkAll: false,
      isIndeterminate: true,

      one: [],

      // 多条线路
      manyLine: [],

      // 线路名称
      lineNameList: [],
    };
  },
  methods: {
    // 初始化获取列表
    getList(page) {
      let type = "post";
      let url = this.urlb + "/api3/SourceData/Get24HourData";
      let data = {
        data: {
          dt: new Date(this.form.dateof).getTime() / 1000, //日期
          nid: this.form.region,
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableData = res.data.data;
        this.manyLine = this.tableData

        for (let i = 0; i < this.tableData[0].time.length; i++) {
          this.tableData[0].time[i] = this.tableData[0].time[i] + '时'
        }

        let name = [];
        for (var i = 0; i < this.allLineData.length; i++) {
          for (var j = 0; j < this.manyLine.length; j++) {
            if (this.manyLine[j].mid == this.allLineData[i].mid) {
              name.push(this.allLineData[i].name);
            }
          }
        }
        this.lineNameList = name;

        this.getStudent1()
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
        this.getOnedx()
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
          nid: this.form.region,
          uid: uid
          // uid: localStorage.getItem('uid')
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.allLineData = res.data.data;

        // this.form.linename = this.options1[0].mid
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

    // 折线面积图
    getStudent1() {
      let _this = this;
      // arr.length = _this.jdate;
      this.zhexian = _this.$echarts.init(document.getElementById("charts1"));

      setTimeout(() => {
        $(window).resize(function () {
          try {
            _this.zhexian.resize();
          } catch (error) {
            // console.log(error);
          }
        });
      }, 0);

      var color = ['#1478c5', '#339933', '#33CCFF', '#33CCCC', '#3399FF', '#99FFCC', '#CCFF66', '#CC99CC', '#CC9900', '#CC6666', '#CC66FF', '#FF9933']

      this.zhexian.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          // text: '大数据量面积图',
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
        xAxis: {
          name: "点",
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#606060',
            }
          },
          data: this.tableData[0].time
        },
        yAxis: {
          name: "单位：(kW/h)",
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
            data: _this.manyLine.length != 0 ? _this.manyLine[0].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[0] : "",
            type: "line",
            smooth: true,
            color: color[0], //图例的颜色
            lineStyle: {
              color: color[0] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 2 ? _this.manyLine[1].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[1] : "",
            smooth: true,
            type: "line",
            color: color[1], //图例的颜色
            lineStyle: {
              color: color[1] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 3 ? _this.manyLine[2].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[2] : "",
            smooth: true,
            type: "line",
            color: color[2], //图例的颜色
            lineStyle: {
              color: color[2] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 4 ? _this.manyLine[3].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[3] : "",
            smooth: true,
            type: "line",
            color: color[3], //图例的颜色
            lineStyle: {
              color: color[3] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 5 ? _this.manyLine[4].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[4] : "",
            smooth: true,
            type: "line",
            color: color[4], //图例的颜色
            lineStyle: {
              color: color[4] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 6 ? _this.manyLine[5].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[5] : "",
            smooth: true,
            type: "line",
            color: color[5], //图例的颜色
            lineStyle: {
              color: color[5] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 7 ? _this.manyLine[6].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[6] : "",
            smooth: true,
            type: "line",
            color: color[6], //图例的颜色
            lineStyle: {
              color: color[6] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 8 ? _this.manyLine[7].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[7] : "",
            smooth: true,
            type: "line",
            color: color[7], //图例的颜色
            lineStyle: {
              color: color[7] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 9 ? _this.manyLine[8].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[8] : "",
            smooth: true,
            type: "line",
            color: color[8], //图例的颜色
            lineStyle: {
              color: color[8] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 10 ? _this.manyLine[9].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[9] : "",
            smooth: true,
            type: "line",
            color: color[9], //图例的颜色
            lineStyle: {
              color: color[9] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 11 ? _this.manyLine[10].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[10] : "",
            smooth: true,
            type: "line",
            color: color[10], //图例的颜色
            lineStyle: {
              color: color[10] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          },
          {
            data: _this.manyLine.length >= 12 ? _this.manyLine[11].data : [],
            name: _this.manyLine.length != 0 ? _this.lineNameList[11] : "",
            smooth: true,
            type: "line",
            color: color[11], //图例的颜色
            lineStyle: {
              color: color[11] //改变折线颜色
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          }
        ]
      });

    },

    // 定位电箱号
    getOnedx() {
      this.checkAll = false
      this.checkedCities = []
      this.manyLine = []
      this.lineNameList = []

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
      } else {
        this.getList(1)
      }
      this.getOptions1()
    },

    // 线路 - 全选
    handleCheckAllChange(val) {
      let arr = [];
      this.allLineData.forEach(item => {
        arr.push(item.mid);
      });
      this.checkedCities = val ? arr : [];
      this.isIndeterminate = false;

      this.manyLine = this.tableData.filter(num => {
        return this.checkedCities.indexOf(num.mid) != -1;
      });

      let name = [];
      for (var i = 0; i < this.allLineData.length; i++) {
        for (var j = 0; j < this.manyLine.length; j++) {
          if (this.manyLine[j].mid == this.allLineData[i].mid) {
            name.push(this.allLineData[i].name);
          }
        }
      }
      this.lineNameList = name;

      this.getStudent1();
    },
    // 线路 - 单个
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allLineData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.allLineData.length;
      // console.log(this.checkedCities);

      let two = [];
      // 求合集
      this.manyLine = this.tableData.filter(num => {
        return this.checkedCities.indexOf(num.mid) != -1;
      });

      // 最大值
      // console.log(Math.max(...this.manyLine[0].ele))

      let name = [];
      for (var i = 0; i < this.allLineData.length; i++) {
        for (var j = 0; j < this.manyLine.length; j++) {
          if (this.manyLine[j].mid == this.allLineData[i].mid) {
            name.push(this.allLineData[i].name);
          }
        }
      }
      this.lineNameList = name;

      this.getStudent1();

      this.one.forEach(val => {
        if (val.mid == this.checkedCities) {
          // two.push(val);
          this.exportdata = val.ele;

          // this.zhexian.setOption({
          //   series: [
          //     {
          //       data: val.ele
          //     }
          //   ]
          // });
          // console.log(two);
        }
      });

      // for (var i = 0; i < this.one.length; i++) {
      //   if (this.one[i].mid == this.checkedCities) {
      //     console.log(this.one[i]);
      //   }
      // }
      // for (var i = 0; i < this.one.length; i++) {
      //   if (this.one[i].mid.indexOf() != -1) {
      //     console.log(this.one[i]);
      //   }
      // }
    },
  },

  mounted() { },
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
// 小屏
@media screen and (min-height: 650px) and (max-height: 750px) {
  #charts1 {
    height: 400px !important;
  }
}
// 小屏全屏
@media screen and(min-height:750px) and(max-height: 850px) {
  #charts1 {
    height: 400px !important;
  }
}
.electricBoxInfo {
  //   overflow: hidden;
  height: 100%;
  .el-header {
    background: #fff;
    width: 99%;
    margin: 10px auto;
    // background: #1d3278;
    // margin: 10px 0;
    .choice {
      top: 130px;
      width: 86%;
      overflow: hidden;
      position: absolute;
    }
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

    #charts1 {
      width: 100%;
      height: 600px;
      margin-top: 8%;
      background: #fff;
    }
    #charts2 {
      width: 40%;
      height: 400px;
      float: left;
      margin-top: 12%;
      margin-left: -5%;
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
  