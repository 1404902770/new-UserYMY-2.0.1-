<template>
  <!-- 用电监测 - 运行日报 -->
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
            label="回路名称"
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

          <div style="display: flex;height: 37px;">
            <el-button
              type="primary"
              @click="getOnedx"
              class="topbtn"
            ><i class="el-icon-search"></i> 查 询</el-button>

            <el-button
              type="primary"
              @click="getYestoday"
              class="topbtn"
            ><i class="el-icon-arrow-left"></i> 上一日</el-button>

            <el-button
              type="primary"
              @click="getNextday"
              class="topbtn"
              :disabled="form.dateof == benchmark?true:false"
            >下一日<i class="el-icon-arrow-right"></i></el-button>

            <el-button
              type="primary"
              @click="tabcontent(1)"
              class="tabbtn"
            >图 表</el-button>

            <el-button
              type="primary"
              @click="tabcontent(2)"
              class="tabbtn"
            >数 据</el-button>

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
        <!-- 图表 -->
        <div
          v-show="tag==1?true:false"
          class="echartscontent"
        >
          <div class="echartsline">
            <div class="headtitle">
              <span class="decoration"></span>
              电压 ( V )
            </div>
            <div class="headtitle">
              <span class="decoration"></span>
              电流 ( A )
            </div>
            <div
              id="echarts1"
              class="echarts"
            ></div>
            <div
              id="echarts2"
              class="echarts"
            ></div>
          </div>

          <div class="echartsline">
            <div class="headtitle">
              <span class="decoration"></span>
              温度 ( ℃ )
            </div>
            <div class="headtitle">
              <span class="decoration"></span>
              漏电电流 ( A )
            </div>
            <div
              id="echarts3"
              class="echarts"
            ></div>
            <div
              id="echarts4"
              class="echarts"
            ></div>
          </div>

          <div class="echartsline">
            <div class="headtitle">
              <span class="decoration"></span>
              有功功率 ( kW )
            </div>
            <div class="headtitle">
              <span class="decoration"></span>
              无功功率 ( kVar )
            </div>
            <div
              id="echarts5"
              class="echarts"
            ></div>
            <div
              id="echarts6"
              class="echarts"
            ></div>
          </div>
        </div>

        <!-- 列表 -->
        <div v-show="tag==2?true:false">

          <el-table
            :data="tableData"
            stripe
            ref="table"
            :max-height="tableHeight"
            style="width: 99%;margin:0 auto"
          >
            <!-- <el-table-column
            prop="mname"
            show-overflow-tooltip
            label="线路名称"
            align="center"
            min-width="100"
          ></el-table-column> -->

            <el-table-column
              prop="mname"
              show-overflow-tooltip
              label="参数名称"
              align="center"
              min-width="140"
            ></el-table-column>

            <!-- <el-table-column
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
              v-if="tableData.length>0?tableData[0]['0']?true:false:true"
              prop="0"
              show-overflow-tooltip
              label="00点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['1']?true:false:true"
              prop="1"
              show-overflow-tooltip
              label="01点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['2']?true:false:true"
              prop="2"
              show-overflow-tooltip
              label="02点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['3']?true:false:true"
              prop="3"
              show-overflow-tooltip
              label="03点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['4']?true:false:true"
              prop="4"
              show-overflow-tooltip
              label="04点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['5']?true:false:true"
              prop="5"
              show-overflow-tooltip
              label="05点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['6']?true:false:true"
              prop="6"
              show-overflow-tooltip
              label="06点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['7']?true:false:true"
              prop="7"
              show-overflow-tooltip
              label="07点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['8']?true:false:true"
              prop="8"
              show-overflow-tooltip
              label="08点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['9']?true:false:true"
              prop="9"
              show-overflow-tooltip
              label="09点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['10']?true:false:true"
              prop="10"
              show-overflow-tooltip
              label="10点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['11']?true:false:true"
              prop="11"
              show-overflow-tooltip
              label="11点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['12']?true:false:true"
              prop="12"
              show-overflow-tooltip
              label="12点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['13']?true:false:true"
              prop="13"
              show-overflow-tooltip
              label="13点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['14']?true:false:true"
              prop="14"
              show-overflow-tooltip
              label="14点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['15']?true:false:true"
              prop="15"
              show-overflow-tooltip
              label="15点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['16']?true:false:true"
              prop="16"
              show-overflow-tooltip
              label="16点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['17']?true:false:true"
              prop="17"
              show-overflow-tooltip
              label="17点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['18']?true:false:true"
              prop="18"
              show-overflow-tooltip
              label="18点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['19']?true:false:true"
              prop="19"
              show-overflow-tooltip
              label="19点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['20']?true:false:true"
              prop="20"
              show-overflow-tooltip
              label="20点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['21']?true:false:true"
              prop="21"
              show-overflow-tooltip
              label="21点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['22']?true:false:true"
              prop="22"
              show-overflow-tooltip
              label="22点"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              v-if="tableData.length>0?tableData[0]['23']?true:false:true"
              prop="23"
              show-overflow-tooltip
              label="23点"
              align="center"
              min-width="60"
            ></el-table-column>
          </el-table>
        </div>

      </el-main>
      <!-- 尾部 -->
      <el-footer>
        <!-- <div style="color:#ccc;font-weight: bold;">只显示有数据的时段</div> -->
        <!-- 分页 -->
        <!-- <el-pagination
          v-if="fenYe.total>13"
          @current-change="handleCurrentChange"
          :current-page.sync="fenYe.currentPage"
          layout="total, prev, pager, next, jumper"
          :page-size="13"
          :total="fenYe.total"
        ></el-pagination> -->
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
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 列表数据
      tableData: [],

      // 电压
      echartstable1: [],
      echartstable2: [],
      echartstable3: [],
      // 电流
      echartstable4: [],
      echartstable5: [],
      echartstable6: [],
      // 温度
      echartstable7: [],
      // 漏电电流
      echartstable8: [],
      // 有功功率
      echartstable9: [],
      // 无功功率
      echartstable10: [],

      // 线路类型
      type: [],

      // 切换图表和表格
      tag: 1,

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
      let url = this.urlb + "/api3/SourceData/GetDestData";
      let data = {
        data: {
          dt: new Date(this.form.dateof).getTime() / 1000, //日期
          nid: this.form.region,
          aa: this.form.linename
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        if (res.data.data.length == 0) {
          this.$message({
            message: '该账号暂无数据',
            type: 'warning'
          });
        } else {

          this.type = res.data.type
          this.tableData = res.data.data;

          let array = []
          res.data.data.forEach(val => {
            array.push(Object.values(val))
          })
          // console.log(array)
          this.echartstable1 = array[0]
          this.echartstable1.pop()
          if (res.data.type.type == 1) {
            this.echartstable2 = []
            this.echartstable3 = []

            this.echartstable5 = []
            this.echartstable6 = []
          } else {
            this.echartstable2 = array[1]
            this.echartstable2.pop()
            this.echartstable3 = array[2]
            this.echartstable3.pop()

            this.echartstable5 = array[4]
            this.echartstable6 = array[5]
          }


          this.echartstable4 = array[3]

          this.echartstable7 = array[12]

          this.echartstable8 = array[18]

          this.echartstable9 = array[16]

          this.echartstable10 = array[17]

          this.getecharts1()
          this.getecharts2()
          this.getecharts3()
          this.getecharts4()
          this.getecharts5()
          this.getecharts6()

          for (let i = 0; i < this.tableData.length; i++) {
            if (res.data.type.type == 1) {

              if (this.tableData[i].mname == 'vv2') {
                this.tableData.splice([i], 1)
              }
              if (this.tableData[i].mname == 'vv3') {
                this.tableData.splice([i], 1)
              }
              if (this.tableData[i].mname == 'aa2') {
                this.tableData.splice([i], 1)
              }
              if (this.tableData[i].mname == 'aa3') {
                this.tableData.splice([i], 1)
              }
              if (this.tableData[i].mname == 'kk2') {
                this.tableData.splice([i], 1)
              }
              if (this.tableData[i].mname == 'kk3') {
                this.tableData.splice([i], 1)
              }
              if (this.tableData[i].mname == 'kv2') {
                this.tableData.splice([i], 1)
              }
              if (this.tableData[i].mname == 'kv3') {
                this.tableData.splice([i], 1)
              }

              if (this.tableData[i].mname == 'vv1') {
                this.tableData[i].mname = '电压（V）'
              } else if (this.tableData[i].mname == 'aa1') {
                this.tableData[i].mname = '电流（A）'
              } else if (this.tableData[i].mname == 'kk1') {
                this.tableData[i].mname = '功率（kW）'
              } else if (this.tableData[i].mname == 'kv1') {
                this.tableData[i].mname = '无功功率（kVar）'
              } else if (this.tableData[i].mname == 'tt') {
                this.tableData[i].mname = '温度（°C）'
              } else if (this.tableData[i].mname == 'ld') {
                this.tableData[i].mname = '漏电电流（A）'
              } else if (this.tableData[i].mname == 'kk') {
                this.tableData[i].mname = '总有功功率（kW）'
              } else if (this.tableData[i].mname == 'kv') {
                this.tableData[i].mname = '总无功功率（kW）'
              } else if (this.tableData[i].mname == 'dzz') {
                this.tableData[i].mname = '电量（kW/h）'
              } else if (this.tableData[i].mname == 'pf') {
                this.tableData[i].mname = '功率因数（pf）'
              }

            } else {
              if (this.tableData[i].mname == 'vv1') {
                this.tableData[i].mname = 'A相电压（V）'
              } else if (this.tableData[i].mname == 'vv2') {
                this.tableData[i].mname = 'B相电压（V）'
              } else if (this.tableData[i].mname == 'vv3') {
                this.tableData[i].mname = 'C相电压（V）'
              } else if (this.tableData[i].mname == 'aa1') {
                this.tableData[i].mname = 'A相电流（A）'
              } else if (this.tableData[i].mname == 'aa2') {
                this.tableData[i].mname = 'B相电流（A）'
              } else if (this.tableData[i].mname == 'aa3') {
                this.tableData[i].mname = 'C相电流（A）'
              } else if (this.tableData[i].mname == 'kk1') {
                this.tableData[i].mname = 'A相功率（kW）'
              } else if (this.tableData[i].mname == 'kk2') {
                this.tableData[i].mname = 'B相功率（kW）'
              } else if (this.tableData[i].mname == 'kk3') {
                this.tableData[i].mname = 'C相功率（kW）'
              } else if (this.tableData[i].mname == 'kv1') {
                this.tableData[i].mname = 'A相无功率（kVar）'
              } else if (this.tableData[i].mname == 'kv2') {
                this.tableData[i].mname = 'B相无功率（kVar）'
              } else if (this.tableData[i].mname == 'kv3') {
                this.tableData[i].mname = 'C相无功率（kVar）'
              } else if (this.tableData[i].mname == 'tt') {
                this.tableData[i].mname = '温度（°C）'
              } else if (this.tableData[i].mname == 'ld') {
                this.tableData[i].mname = '漏电电流（A）'
              } else if (this.tableData[i].mname == 'kk') {
                this.tableData[i].mname = '总有功功率（kW）'
              } else if (this.tableData[i].mname == 'kv') {
                this.tableData[i].mname = '总无功功率（kW）'
              } else if (this.tableData[i].mname == 'dzz') {
                this.tableData[i].mname = '电量（kW/h）'
              } else if (this.tableData[i].mname == 'pf') {
                this.tableData[i].mname = '功率因数（pf）'
              }
            }
          }

          // this.tableData.forEach(val => {
          //   // console.log(val)
          //   switch (val.mname) {
          //     case 'vv1': val.mname = 'A相电压（V）'
          //       break;
          //     case 'vv2': val.mname = 'B相电压（V）'
          //       break;
          //     case 'vv3': val.mname = 'C相电压（V）'
          //       break;
          //     case 'aa1': val.mname = 'A相电流（A）'
          //       break;
          //     case 'aa2': val.mname = 'B相电流（A）'
          //       break;
          //     case 'aa3': val.mname = 'C相电流（A）'
          //       break;
          //     case 'kk1': val.mname = 'A相功率（kW）'
          //       break;
          //     case 'kk2': val.mname = 'B相功率（kW）'
          //       break;
          //     case 'kk3': val.mname = 'C相功率（kW）'
          //       break;
          //     case 'kv1': val.mname = 'A相无功率（kVar）'
          //       break;
          //     case 'kv2': val.mname = 'B相无功率（kVar）'
          //       break;
          //     case 'kv3': val.mname = 'C相无功率（kVar）'
          //       break;
          //     case 'tt': val.mname = '温度（°C）'
          //       break;
          //     case 'ld': val.mname = '漏电电流（A）'
          //       break;
          //     case 'kk': val.mname = '总有功功率（kW）'
          //       break;
          //     case 'kv': val.mname = '总无功功率（kW）'
          //       break;
          //     case 'dzz': val.mname = '电量（kW/h）'
          //       break;
          //     case 'pf': val.mname = '功率因数（pf）'
          //       break;
          //   }
          //   // if (val.mname == 'vv1') {
          //   //   val.mname = 'A相电压（V）'
          //   // } else if (val.mname == 'vv2') {
          //   //   val.mname = 'B相电压（V）'
          //   // } else if (val.mname == 'vv3') {
          //   //   val.mname = 'C相电压（V）'
          //   // } else if (val.mname == 'aa1') {
          //   //   val.mname = 'A相电流（A）'
          //   // }
          // })
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].mname == "time") {
              this.tableData.splice(i, 1)
            }
          }

          if (res.data.type.type == 1) {
            for (let i = 0; i < this.tableData.length; i++) {
              // if (this.tableData[i].mname == "B相电压（V）") {
              //   this.tableData.splice(i, 1)
              // } else if (this.tableData[i].mname == "C相电压（V）") {
              //   this.tableData.splice(i, 1)
              // } else if (this.tableData[i].mname == "B相电流（A）") {
              //   this.tableData.splice(i, 1)
              // } else if (this.tableData[i].mname == "C相电流（A）") {
              //   this.tableData.splice(i, 1)
              // } else if (this.tableData[i].mname == "B相功率（kW）") {
              //   this.tableData.splice(i, 1)
              // } else if (this.tableData[i].mname == "C相功率（kW）") {
              //   this.tableData.splice(i, 1)
              // } else if (this.tableData[i].mname == "B相无功率（kVar）") {
              //   this.tableData.splice(i, 1)
              // } else if (this.tableData[i].mname == "C相无功率（kVar）") {
              //   this.tableData.splice(i, 1)
              // }
              switch (this.tableData[i].mname) {
                case "B相电压（V）":
                case "C相电压（V）": this.tableData.splice(i, 2);
                  break;
                case "B相电流（A）":
                case "C相电流（A）": this.tableData.splice(i, 2);
                  break;
                case "B相功率（kW）":
                case "C相功率（kW）": this.tableData.splice(i, 2);
                  break;
                case "B相无功率（kVar）":
                case "C相无功率（kVar）": this.tableData.splice(i, 2);
                  break;
              }
            }
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

    // 切换图标和表格
    tabcontent(tab) {
      this.tag = tab
      if (tab == 1) {
        this.getecharts1()
        this.getecharts2()
        this.getecharts3()
        this.getecharts4()
        this.getecharts5()
        this.getecharts6()
      }
    },

    // 电压图
    getecharts1() {
      let _this = this;
      let Vtime = [
        '00时',
        '01时',
        '02时',
        '03时',
        '04时',
        '05时',
        '06时',
        '07时',
        '08时',
        '09时',
        '10时',
        '11时',
        '12时',
        '13时',
        '14时',
        '15时',
        '16时',
        '17时',
        '18时',
        '19时',
        '20时',
        '21时',
        '22时',
        '23时'
      ];
      setTimeout(() => {

        let student = _this.$echarts.init(document.getElementById("echarts1"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            // position: function (pt) {
            //   return [pt[0], '10%'];
            // },
            // formatter: '时间：{b}<br/>{a0}：{c0}V'
          },
          title: {
            left: 'center',
            // text: '线路温度图',
            textStyle: { //主标题文本样式
              color: "#ccc",
              fontSize: "16"
            },
          },
          // toolbox: {
          //   feature: {
          //     dataZoom: {
          //       yAxisIndex: 'none'
          //     },
          //     restore: {},
          //     saveAsImage: {},
          //   },
          //   iconStyle: {
          //     normal: {
          //       borderColor: '#ccc',//设置颜色
          //     }
          //   }
          // },
          legend: {
            data: this.echartstable2.length == 0 ? ['电压'] : ['A相电压', 'B相电压', 'C相电压'],
            left: 160,
            textStyle: {
              // color: '#ccc'
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Vtime,
            axisLine: {
              lineStyle: {
                // color: '#ccc',
              }
            },
          },
          yAxis: {
            // name: "单位：(v)",
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLine: {
              lineStyle: {
                // color: '#ccc',
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
                color: '#767676',//坐标值得具体的颜色
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
              name: this.echartstable2.length == 0 ? '电压' : 'A相电压',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                // color: '#E34130'
                color: this.echartstable2.length == 0 ? '#E34130' : '#E3CC30'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: this.echartstable2.length == 0 ? 'rgba(227, 65, 48,0.3)' : 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.echartstable1,
            },
            {
              name: 'B相电压',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
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
              data: this.echartstable2,
            }, {
              name: 'C相电压',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
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
              data: this.echartstable3,
            }
          ]
        });
        // this.student.resize();
      }, 0);
    },
    // 电流
    getecharts2() {
      let _this = this;
      let Vtime = [
        '00时',
        '01时',
        '02时',
        '03时',
        '04时',
        '05时',
        '06时',
        '07时',
        '08时',
        '09时',
        '10时',
        '11时',
        '12时',
        '13时',
        '14时',
        '15时',
        '16时',
        '17时',
        '18时',
        '19时',
        '20时',
        '21时',
        '22时',
        '23时'
      ];
      setTimeout(() => {

        let student = _this.$echarts.init(document.getElementById("echarts2"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            // position: function (pt) {
            //   return [pt[0], '10%'];
            // },
            // formatter: '时间：{b}<br/>{a0}：{c0}A'
          },
          title: {
            left: 'center',
            // text: '线路温度图',
            textStyle: { //主标题文本样式
              color: "#ccc",
              fontSize: "16"
            },
          },
          legend: {
            data: this.echartstable5.length == 0 ? ['电流'] : ['A相电流', 'B相电流', 'C相电流'],
            left: 160,
            textStyle: {
              // color: '#ccc'
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Vtime,
            axisLine: {
              lineStyle: {
                // color: '#ccc',
              }
            },
          },
          yAxis: {
            // name: "单位：(v)",
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLine: {
              lineStyle: {
                // color: '#ccc',
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
                color: '#767676',//坐标值得具体的颜色
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
              name: this.echartstable5.length == 0 ? '电流' : 'A相电流',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                // color: '#E34130'
                color: this.echartstable2.length == 0 ? '#E34130' : '#E3CC30'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  // color: 'rgba(227, 65, 48,0.3)'
                  color: this.echartstable2.length == 0 ? 'rgba(227, 65, 48,0.3)' : 'rgba(227,204,48,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.echartstable4,
            },
            {
              name: 'B相电流',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
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
              data: this.echartstable5,
            }, {
              name: 'C相电流',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
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
              data: this.echartstable6,
            }
          ]
        });
        // this.student.resize();
      }, 0);
    },
    // 温度
    getecharts3() {
      let _this = this;
      let Vtime = [
        '00时',
        '01时',
        '02时',
        '03时',
        '04时',
        '05时',
        '06时',
        '07时',
        '08时',
        '09时',
        '10时',
        '11时',
        '12时',
        '13时',
        '14时',
        '15时',
        '16时',
        '17时',
        '18时',
        '19时',
        '20时',
        '21时',
        '22时',
        '23时'
      ];
      setTimeout(() => {

        let student = _this.$echarts.init(document.getElementById("echarts3"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            // position: function (pt) {
            //   return [pt[0], '10%'];
            // },
            formatter: '时间：{b}<br/>{a0}：{c0}℃'
          },
          // title: {
          //   left: 'center',
          //   // text: '线路温度图',
          //   textStyle: { //主标题文本样式
          //     color: "#ccc",
          //     fontSize: "16"
          //   },
          // },
          // legend: {
          //   data: ['温度'],
          //   left: 160,
          //   textStyle: {
          //     // color: '#ccc'
          //   }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Vtime,
            axisLine: {
              lineStyle: {
                // color: '#ccc',
              }
            },
          },
          yAxis: {
            // name: "单位：(v)",
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLine: {
              lineStyle: {
                // color: '#ccc',
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
                color: '#767676',//坐标值得具体的颜色
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
              data: this.echartstable7,
            }
          ]
        });
        // this.student.resize();
      }, 0);
    },
    // 漏电电流
    getecharts4() {
      let _this = this;
      let Vtime = [
        '00时',
        '01时',
        '02时',
        '03时',
        '04时',
        '05时',
        '06时',
        '07时',
        '08时',
        '09时',
        '10时',
        '11时',
        '12时',
        '13时',
        '14时',
        '15时',
        '16时',
        '17时',
        '18时',
        '19时',
        '20时',
        '21时',
        '22时',
        '23时'
      ];
      setTimeout(() => {

        let student = _this.$echarts.init(document.getElementById("echarts4"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            // position: function (pt) {
            //   return [pt[0], '10%'];
            // },
            formatter: '时间：{b}<br/>{a0}：{c0}A'
          },
          // title: {
          //   left: 'center',
          //   // text: '线路温度图',
          //   textStyle: { //主标题文本样式
          //     color: "#ccc",
          //     fontSize: "16"
          //   },
          // },
          // legend: {
          //   data: ['漏电电流'],
          //   left: 160,
          //   textStyle: {
          //     // color: '#ccc'
          //   }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Vtime,
            axisLine: {
              lineStyle: {
                // color: '#ccc',
              }
            },
          },
          yAxis: {
            // name: "单位：(v)",
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLine: {
              lineStyle: {
                // color: '#ccc',
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
                color: '#767676',//坐标值得具体的颜色
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
              name: '漏电电流',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: '#E3CC30'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(227,204,48,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.echartstable8,
            },
          ]
        });
        // this.student.resize();
      }, 0);
    },
    // 有功功率
    getecharts5() {
      let _this = this;
      let Vtime = [
        '00时',
        '01时',
        '02时',
        '03时',
        '04时',
        '05时',
        '06时',
        '07时',
        '08时',
        '09时',
        '10时',
        '11时',
        '12时',
        '13时',
        '14时',
        '15时',
        '16时',
        '17时',
        '18时',
        '19时',
        '20时',
        '21时',
        '22时',
        '23时'
      ];
      setTimeout(() => {

        let student = _this.$echarts.init(document.getElementById("echarts5"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            // position: function (pt) {
            //   return [pt[0], '10%'];
            // },
            formatter: '时间：{b}<br/>{a0}：{c0}kW'
          },
          // title: {
          //   left: 'center',
          //   // text: '线路温度图',
          //   textStyle: { //主标题文本样式
          //     color: "#ccc",
          //     fontSize: "16"
          //   },
          // },
          // legend: {
          //   data: ['有功功率'],
          //   left: 160,
          //   textStyle: {
          //     // color: '#ccc'
          //   }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Vtime,
            axisLine: {
              lineStyle: {
                // color: '#ccc',
              }
            },
          },
          yAxis: {
            // name: "单位：(v)",
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLine: {
              lineStyle: {
                // color: '#ccc',
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
                color: '#767676',//坐标值得具体的颜色
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
              name: '有功功率',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: '#AE30E3'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(174, 48, 227,0.3)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.echartstable9,
            }
          ]
        });
        // this.student.resize();
      }, 0);
    },
    // 无功功率
    getecharts6() {
      let _this = this;
      let Vtime = [
        '00时',
        '01时',
        '02时',
        '03时',
        '04时',
        '05时',
        '06时',
        '07时',
        '08时',
        '09时',
        '10时',
        '11时',
        '12时',
        '13时',
        '14时',
        '15时',
        '16时',
        '17时',
        '18时',
        '19时',
        '20时',
        '21时',
        '22时',
        '23时'
      ];
      setTimeout(() => {

        let student = _this.$echarts.init(document.getElementById("echarts6"));
        $(window).resize(function () {
          student.resize();
        });
        student.setOption({
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            // position: function (pt) {
            //   return [pt[0], '10%'];
            // },
            formatter: '时间：{b}<br/>{a0}：{c0}kVar'
          },
          // title: {
          //   left: 'center',
          //   // text: '线路温度图',
          //   textStyle: { //主标题文本样式
          //     color: "#ccc",
          //     fontSize: "16"
          //   },
          // },
          // legend: {
          //   data: ['无功功率'],
          //   left: 160,
          //   textStyle: {
          //     // color: '#ccc'
          //   }
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Vtime,
            axisLine: {
              lineStyle: {
                // color: '#ccc',
              }
            },
          },
          yAxis: {
            // name: "单位：(v)",
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLine: {
              lineStyle: {
                // color: '#ccc',
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
                color: '#767676',//坐标值得具体的颜色
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
              name: '无功功率',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: '#3080E3'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(48,128,227,0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 255, 255,0)'
                }])
              },
              lineStyle: {
                width: 1//设置线条粗细
              },
              data: this.echartstable10,
            }
          ]
        });
        // this.student.resize();
      }, 0);
    },

    // 当前日期
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate() - 1;
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
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
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
  //   overflow: hidden;
  height: 100%;
  .el-header {
    // background: #1d3278;
    // margin: 10px 0;
    background: #fff;
    width: 99%;
    margin: 10px auto;
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
      .topbtn {
        margin-left: 10px;
        border: none;
        // border-radius: 0;
        background: #1478c5;
        // background-image: linear-gradient(to right, #32a581, #158c86);
      }
      .tabbtn {
        color: #1478c5;
        background: transparent;
        border: 1px solid #1478c5;
      }
      // .el-form-item /deep/ .el-form-item__label,
      // .el-form-item /deep/ .el-checkbox__label {
      //   color: #ccc !important;
      // }
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
    .maintable {
      color: #ccc;
      td {
        padding: 12px 10px;
      }
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
    .echartscontent {
      width: 99%;
      // height: 100%;
      margin: 0 auto;
      // background: #fff;
      .echartsline {
        width: 100%;
        // height: 400px;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .headtitle {
          width: 49%;
          text-align: left;
          font-size: 22px;
          font-weight: bold;
          color: #212121;
          margin: 6px 0 15px 0;
          .decoration {
            display: inline-block;
            width: 14px;
            height: 14px;
            margin-right: 10px;
            // background-image: linear-gradient(to right, #32a581, #158c86);
            background: #1478c5;
          }
        }
      }
      .echarts {
        width: 49%;
        height: 400px;
        // background: #fff;
      }
    }
  }
  .el-footer {
  }
}
</style>
  