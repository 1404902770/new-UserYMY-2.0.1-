<template>
  <!-- 远程控制 - 定时开关 -->
  <div class="timeSwitch">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item
            label="电箱名称"
            prop="region"
          >
            <el-select
              v-model="form.region"
              filterable
              placeholder="电箱名称"
              @change="getOptions1"
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
            label="回路名称"
            prop="linename"
            class="dianxiang"
          >
            <el-select
              v-model="form.linename"
              filterable
              placeholder="回路名称"
            >
              <el-option
                v-for="(item,index) in options1"
                :label="'['+item.mid+'] ' + item.name + ' [' + item.local +']'"
                :value="item.mid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-button
            type="primary"
            @click="squery"
            style="float:left;margin-left:10px;"
          >查 询</el-button>

          <el-button
            type="primary"
            @click="resetForm1('form')"
            style="float:left;"
          >重 置</el-button>

          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="dialogVisible = true"
          >添加定时器</el-button>
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div class="maincontent">
          <!-- 列表 -->
          <el-table
            :data="tableData"
            stripe
            max-height="735"
            style="width: 99%;margin:0 auto"
          >
            <el-table-column
              prop="nid"
              show-overflow-tooltip
              label="设备号"
              align="center"
              min-width="80"
            >
              <template slot-scope="scope">
                <span>{{ hexCharCodeToStr(scope.row.nid) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="回路名称"
              align="center"
              min-width="80"
            ></el-table-column>

            <el-table-column
              prop="local"
              show-overflow-tooltip
              label="安装位置"
              align="center"
              min-width="80"
            ></el-table-column>

            <el-table-column
              prop="aa"
              show-overflow-tooltip
              label="回路编号"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              prop="lx"
              show-overflow-tooltip
              label="定时器类型"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              prop="dtime"
              show-overflow-tooltip
              label="定时时间"
              align="center"
              min-width="150"
            ></el-table-column>

            <el-table-column
              prop="dz"
              show-overflow-tooltip
              label="动作"
              align="center"
              min-width="60"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.dz == '00'"
                  style="color:#158c86;"
                >分闸</span>
                <span
                  v-if="scope.row.dz == '01'"
                  style="color:#F56C6C;"
                >合闸</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="time"
              show-overflow-tooltip
              label="设置时间"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              show-overflow-tooltip
              label="操作"
              align="center"
              min-width="60"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  style="color:#F56C6C;"
                  icon="el-icon-delete"
                  @click="delet(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>

        <!-- 添加定时器 - loading -->
        <el-dialog
          title="添加定时器"
          :visible.sync="dialogVisible"
          width="30%"
          :close-on-click-modal="false"
        >
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm timerData"
          >
            <el-form-item
              label="电箱名称"
              prop="equipmentNumber"
            >
              <el-select
                v-model="ruleForm.equipmentNumber"
                filterable
                placeholder="请选择电箱"
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
              label="回路名称"
              prop="line"
            >
              <el-select
                ref="lines"
                v-model="ruleForm.line"
                filterable
                placeholder="请选择回路"
              >
                <el-option
                  v-for="(item,index) in allLineData"
                  :label="item.name + '[回路]'"
                  :value="item.mid"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="定时器类型"
              prop="operationType"
            >
              <el-radio
                v-model="ruleForm.operationType"
                :label="false"
              >单次</el-radio>
              <el-radio
                v-model="ruleForm.operationType"
                :label="true"
              >循环</el-radio>
              <!-- 单次<el-switch v-model="ruleForm.operationType" style="margin: -2px 5px 0 5px;"></el-switch>循环 -->
            </el-form-item>
            <el-form-item
              label="操作"
              prop="operation"
            >
              <el-radio
                v-model="ruleForm.operation"
                label="00"
              >分闸</el-radio>
              <el-radio
                v-model="ruleForm.operation"
                label="01"
              >合闸</el-radio>
              <el-radio
                v-model="ruleForm.operation"
                label="02"
              >自检</el-radio>
              <!-- 分闸<el-switch v-model="ruleForm.operation" style="margin: -2px 5px 0 5px;"></el-switch>合闸 -->
            </el-form-item>
            <el-form-item
              label="重复"
              prop="repeat"
              v-if="ruleForm.operationType"
            >
              <el-radio
                v-model="ruleForm.repeat"
                :label="false"
              >每天</el-radio>
              <el-radio
                v-model="ruleForm.repeat"
                :label="true"
              >每周</el-radio>
              <!-- 每天<el-switch v-model="ruleForm.repeat" style="margin: -2px 5px 0 5px;"></el-switch>每周 -->
            </el-form-item>
            <el-form-item
              label="星期"
              prop="week"
              v-if="ruleForm.operationType&&ruleForm.repeat"
            >
              <el-checkbox-group
                v-model="ruleForm.week"
                style="text-align: left;"
              >
                <el-checkbox label="0">周一</el-checkbox>
                <el-checkbox label="1">周二</el-checkbox>
                <el-checkbox label="2">周三</el-checkbox>
                <el-checkbox label="3">周四</el-checkbox>
                <el-checkbox label="4">周五</el-checkbox>
                <el-checkbox label="5">周六</el-checkbox>
                <el-checkbox label="6">周日</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="时间">
              <el-time-picker
                v-model="ruleForm.times1"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
                placeholder="请选择时间"
                v-if="ruleForm.operationType"
              ></el-time-picker>
              <el-date-picker
                v-model="ruleForm.times2"
                type="datetime"
                placeholder="选择日期时间"
                @change="sj1"
                v-else
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-button
              type="primary"
              @click="addTimerOk('ruleForm')"
            >添 加</el-button>
          </span>
        </el-dialog>
      </el-main>
      <!-- 尾部 -->
      <el-footer>
        <!-- 分页 -->
        <el-pagination
          v-if="fenYe.total>13"
          @current-change="handleCurrentChange"
          :current-page.sync="fenYe.currentPage"
          layout="total, prev, pager, next, jumper"
          :page-size="15"
          :total="fenYe.total"
        ></el-pagination>
      </el-footer>
      <!-- 底部版权 -->
      <copyright></copyright>
    </el-container>
  </div>
</template>
  
  <script>
import ElementUI from "element-ui";
import copyright from "../../components/copyright";
export default {
  name: "timeSwitch",
  components: {
    copyright
  },
  data() {
    return {
      // 检索
      form: {
        region: "",
        linename: ""
      },
      // 添加定时器 - loading
      dialogVisible: false,
      // 添加定时器 - 检索
      ruleForm: {
        equipmentNumber: "", // 电箱设备号
        line: "", // 线路
        operationType: false, // 操作类型
        operation: false, // 操作
        repeat: false, // 重复 - 每天/每周
        week: [], // 星期
        times1: "", // 时间
        times2: "" // 时间
      },
      // 添加定时器 - 检索 - 容错
      rules: {
        equipmentNumber: [
          { required: true, message: "请选择电箱", trigger: "change" }
        ],
        line: [
          { required: true, message: "请选择回路", trigger: "change" }
        ],
        week: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个星期",
            trigger: "change"
          }
        ]
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 获取所有线路
      allLineData: [],
      // 列表数据
      tableData: [],
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      },
      IntervalDates: {
        nid: "",
        dzz: ""
      }, // 删除定时器数据
      Interval: "" // 删除凋定时器
    };
  },
  watch: {
    count(newCount, oldCount) {
      // console.log(newCount, oldCount)
      // if (newCount.type == "deltimer") {
      //   clearInterval(this.Interval);
      //   ElementUI.Loading.service({}).close();
      //   this.getList(1);
      //   this.$message.success('添加定时器成功');
      // } else
      if (newCount.type == "deltimer") {
        clearInterval(this.Interval);
        ElementUI.Loading.service({}).close();
        this.getList(1);
        this.$message.success('定时器删除成功');
      }
    }
  },
  computed: {
    count() {
      return this.$store.state.socketData;
    }
  },
  methods: {
    // 初始化获取下拉数据 - 所有设备
    getOptions() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/EnergyData/getNetdSimpleList";
      let data = {
        data: {
          uid: uid
          // uid: localStorage.getItem("uid")
        }
      };
      this.myAjax(type, url, data, res => {
        this.options = res.data.data;
        this.ruleForm.line = res.data.data;
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

    // 初始化获取列表
    getList(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/device/timerList";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          // nid: this.form.region ? this.form.region : 0,
          page: Number(page) - 1,
          limit: 13   //页码条数
        }
      };
      this.myAjax(type, url, data, res => {
        if (res.data.data.length == 0) {
          this.tableData = []
          this.$message.warning("您还没有定时器!");
        } else {
          this.tableData = res.data.data;
          this.fenYe.total = res.data.total;
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].ymd == "ffffff") {
              this.tableData[i].lx = "循环";
            } else {
              this.tableData[i].lx = "单次";
            }
            let dtime = "";
            let z1 = ""; // 每周 / 每天
            let z3 = ""; // 周一 ~ 周日
            let z2 = ""; // 时间
            if (this.tableData[i].ymd == "ffffff") {
              if (this.tableData[i].week == "ff") {
                z1 = "每天、";
                let sjtime = this.tableData[i].hms;
                sjtime =
                  sjtime.substr(0, 2) +
                  ":" +
                  sjtime.substr(2, 2) +
                  ":" +
                  sjtime.substr(4, 2);
                z2 = sjtime;
                dtime = z1 + z2;
              } else {
                z1 = "每周、";
                let two = this.hex_to_bin(this.tableData[i].week);
                two.split(",");
                if (two[0] == 1) {
                  z3 += "周日、";
                }
                if (two[1] == 1) {
                  z3 += "周六、";
                }
                if (two[2] == 1) {
                  z3 += "周五、";
                }
                if (two[3] == 1) {
                  z3 += "周四、";
                }
                if (two[4] == 1) {
                  z3 += "周三、";
                }
                if (two[5] == 1) {
                  z3 += "周二、";
                }
                if (two[6] == 1) {
                  z3 += "周一、";
                }
                let sjtime = this.tableData[i].hms;
                sjtime =
                  sjtime.substr(0, 2) +
                  ":" +
                  sjtime.substr(2, 2) +
                  ":" +
                  sjtime.substr(4, 2);
                z2 = sjtime;
                dtime = z1 + z3 + z2;
              }
            } else {
              let sj1 = "20" + this.tableData[i].ymd;
              sj1 =
                sj1.substr(0, 4) +
                "-" +
                sj1.substr(4, 2) +
                "-" +
                sj1.substr(6, 2);
              let sj2 = this.tableData[i].hms;
              sj2 =
                sj2.substr(0, 2) +
                ":" +
                sj2.substr(2, 2) +
                ":" +
                sj2.substr(4, 2);
              dtime = sj1 + " " + sj2;
            }
            this.tableData[i].dtime = dtime;
            // this.tableData[i].nid = this.hexCharCodeToStr(this.tableData[i].nid);
            this.tableData[i].time = new Date(
              this.tableData[i].time * 1000
            ).Format("yy-MM-dd hh:mm:ss");
          }
        }
      });
    },

    // 初始化获取列表
    getListnid(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/Device/timerHwList";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          nid: this.form.region ? this.form.region : 0,
          page: Number(page) - 1,
          limit: 13   //页码条数
        }
      };
      this.myAjax(type, url, data, res => {
        if (res.data.code == 6) {
          this.$message.warning("您还没有定时器!");
        } else {
          this.tableData = res.data.data;
          this.fenYe.total = res.data.total;
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].ymd == "ffffff") {
              this.tableData[i].lx = "循环";
            } else {
              this.tableData[i].lx = "单次";
            }
            let dtime = "";
            let z1 = ""; // 每周 / 每天
            let z3 = ""; // 周一 ~ 周日
            let z2 = ""; // 时间
            if (this.tableData[i].ymd == "ffffff") {
              if (this.tableData[i].week == "ff") {
                z1 = "每天、";
                let sjtime = this.tableData[i].hms;
                sjtime =
                  sjtime.substr(0, 2) +
                  ":" +
                  sjtime.substr(2, 2) +
                  ":" +
                  sjtime.substr(4, 2);
                z2 = sjtime;
                dtime = z1 + z2;
              } else {
                z1 = "每周、";
                let two = this.hex_to_bin(this.tableData[i].week);
                two.split(",");
                if (two[0] == 1) {
                  z3 += "周日、";
                }
                if (two[1] == 1) {
                  z3 += "周六、";
                }
                if (two[2] == 1) {
                  z3 += "周五、";
                }
                if (two[3] == 1) {
                  z3 += "周四、";
                }
                if (two[4] == 1) {
                  z3 += "周三、";
                }
                if (two[5] == 1) {
                  z3 += "周二、";
                }
                if (two[6] == 1) {
                  z3 += "周一、";
                }
                let sjtime = this.tableData[i].hms;
                sjtime =
                  sjtime.substr(0, 2) +
                  ":" +
                  sjtime.substr(2, 2) +
                  ":" +
                  sjtime.substr(4, 2);
                z2 = sjtime;
                dtime = z1 + z3 + z2;
              }
            } else {
              let sj1 = "20" + this.tableData[i].ymd;
              sj1 =
                sj1.substr(0, 4) +
                "-" +
                sj1.substr(4, 2) +
                "-" +
                sj1.substr(6, 2);
              let sj2 = this.tableData[i].hms;
              sj2 =
                sj2.substr(0, 2) +
                ":" +
                sj2.substr(2, 2) +
                ":" +
                sj2.substr(4, 2);
              dtime = sj1 + " " + sj2;
            }
            this.tableData[i].dtime = dtime;
            // this.tableData[i].nid = this.hexCharCodeToStr(this.tableData[i].nid);
            this.tableData[i].time = new Date(
              this.tableData[i].time * 1000
            ).Format("yy-MM-dd hh:mm:ss");
          }
        }
      });
    },

    // 初始化获取列表
    getListmid(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/Device/timerHwMidList";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          nid: this.form.region ? this.form.region : 0,
          mid: this.form.linename ? this.form.linename : 0,
          page: Number(page) - 1,
          size: 13   //页码条数
        }
      };
      this.myAjax(type, url, data, res => {
        if (res.data.code == 6) {
          this.$message.warning("您还没有定时器!");
        } else {
          this.tableData = res.data.data;
          this.fenYe.total = res.data.total;
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].ymd == "ffffff") {
              this.tableData[i].lx = "循环";
            } else {
              this.tableData[i].lx = "单次";
            }
            let dtime = "";
            let z1 = ""; // 每周 / 每天
            let z3 = ""; // 周一 ~ 周日
            let z2 = ""; // 时间
            if (this.tableData[i].ymd == "ffffff") {
              if (this.tableData[i].week == "ff") {
                z1 = "每天、";
                let sjtime = this.tableData[i].hms;
                sjtime =
                  sjtime.substr(0, 2) +
                  ":" +
                  sjtime.substr(2, 2) +
                  ":" +
                  sjtime.substr(4, 2);
                z2 = sjtime;
                dtime = z1 + z2;
              } else {
                z1 = "每周、";
                let two = this.hex_to_bin(this.tableData[i].week);
                two.split(",");
                if (two[0] == 1) {
                  z3 += "周日、";
                }
                if (two[1] == 1) {
                  z3 += "周六、";
                }
                if (two[2] == 1) {
                  z3 += "周五、";
                }
                if (two[3] == 1) {
                  z3 += "周四、";
                }
                if (two[4] == 1) {
                  z3 += "周三、";
                }
                if (two[5] == 1) {
                  z3 += "周二、";
                }
                if (two[6] == 1) {
                  z3 += "周一、";
                }
                let sjtime = this.tableData[i].hms;
                sjtime =
                  sjtime.substr(0, 2) +
                  ":" +
                  sjtime.substr(2, 2) +
                  ":" +
                  sjtime.substr(4, 2);
                z2 = sjtime;
                dtime = z1 + z3 + z2;
              }
            } else {
              let sj1 = "20" + this.tableData[i].ymd;
              sj1 =
                sj1.substr(0, 4) +
                "-" +
                sj1.substr(4, 2) +
                "-" +
                sj1.substr(6, 2);
              let sj2 = this.tableData[i].hms;
              sj2 =
                sj2.substr(0, 2) +
                ":" +
                sj2.substr(2, 2) +
                ":" +
                sj2.substr(4, 2);
              dtime = sj1 + " " + sj2;
            }
            this.tableData[i].dtime = dtime;
            // this.tableData[i].nid = this.hexCharCodeToStr(this.tableData[i].nid);
            this.tableData[i].time = new Date(
              this.tableData[i].time * 1000
            ).Format("yy-MM-dd hh:mm:ss");
          }
        }
      });
    },

    // 重置
    resetForm1(formName) {
      this.$refs[formName].resetFields();
      this.getList(1);
    },
    // 查询
    squery() {
      if (this.form.region != "" && this.form.linename == "") {
        this.getListnid(1)
      } else if (this.form.region != "" && this.form.linename != "") {
        this.getListmid(1)
      } else {
        this.getList(1);
      }
    },
    // 分页 - 当前页数
    handleCurrentChange(val) {
      // this.getList(val);
      if (this.form.region != "" && this.form.linename == "") {
        this.getListnid(val)
      } else if (this.form.region != "" && this.form.linename != "") {
        this.getListmid(val)
      } else {
        this.getList(val);
      }
    },

    // 删除定时器 - 按钮
    delet(row) {
      this.IntervalDates.nid = row.nid;
      this.IntervalDates.dzz = row.dzz;
      this.$confirm("您确定要删除吗？", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let _this = this;
          ElementUI.Loading.service({
            fullscreen: true,
            text: "正在执行...",
            background: "rgba(0,0,0,.4)"
          });
          _this.Interval = setInterval(() => {
            _this.delSj(row.aa);
          }, 3000);
        })
        .catch(() => {
          this.delObject(this.IntervalDates);
          this.$message({
            type: "warning",
            message: "已取消操作"
          });
        });
    },
    // 删除定时器事件
    delSj(aa) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.esb + "/setApn/getManderNum";
      let data = {
        // uid: localStorage.getItem("uid"),
        // nid: this.IntervalDates.nid,
        // dzz: this.IntervalDates.dzz
        data: {
          uid: uid, //用户id
          // uid: localStorage.getItem("uid"), //用户id
          nid: this.IntervalDates.nid,   //设备号
          mid: aa,   //线路号
          type: "web",   //类型
          lon: "0",   //经度
          lat: "0",  //纬度
          device: "07" + this.IntervalDates.dzz  //操作命令，见下表说明
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        if (res.code == 123) {
          this.getList(1);
          this.$message.success(res.msg);
        }
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
        if (res.data.code == 9) {
          this.$message.warning("该设备下没有分机");
        } else {
          this.allLineData = res.data.data;
        }
      });
    },
    // 单次时间 - 不能小于当前时间
    sj1() {
      if (this.ruleForm.times2.getTime() < new Date().getTime()) {
        this.ruleForm.times2 = "";
        this.$message.warning("单次时间不能小于当前时间~！");
        return false;
      }
    },

    // 添加定时器 - 确定
    addTimerOk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.operationType && !this.ruleForm.times1) {
            this.$message.warning("循环时间不能为空");
            return false;
          }
          if (!this.ruleForm.operationType && !this.ruleForm.times2) {
            this.$message.warning("单次时间不能为空");
            return false;
          }
          // 线路
          let lineRoad = this.ruleForm.line;
          // 分闸 / 合闸
          // let fh = this.ruleForm.operation ? "01" : "00";
          let fh = this.ruleForm.operation;
          // 天
          let days = "ffffff";
          // 除了天
          let exceptDays = "ff";
          // 整理后的命令
          let ml;
          // 单次 / 循环 - false：单次 / true：循环
          if (this.ruleForm.operationType) {
            // 每天 / 每周 - false：每天 / true：每周
            if (this.ruleForm.repeat) {
              let arr = [0, 0, 0, 0, 0, 0, 0];
              for (let i = 0; i < this.ruleForm.week.length; i++) {
                arr.splice(Number(this.ruleForm.week[i]), 1, 1);
              }
              arr.reverse();
              arr.push(0);
              arr = this.specialSymbols(arr.toString());
              let timesz = this.specialSymbols(
                new Date(this.ruleForm.times1.getTime()).Format("hh:mm:ss")
              );
              let week = (
                Array(2).join(0) + parseInt(arr, 2).toString(16)
              ).slice(-2);
              ml = "05" + days + timesz + week + this.line(Number(lineRoad)) + fh;
            } else {
              let timesz = this.specialSymbols(
                new Date(this.ruleForm.times1.getTime()).Format("hh:mm:ss")
              );
              ml =
                "05" + days + timesz + exceptDays + this.line(Number(lineRoad)) + fh;
            }
          } else {
            // 时间
            let timesz = this.specialSymbols(
              new Date(this.ruleForm.times2.getTime()).Format(
                "yy-MM-dd hh:mm:ss"
              )
            ).substr(2, 12);
            ml = "05" + timesz + exceptDays + this.line(Number(lineRoad)) + fh;
          }

          let username = localStorage.getItem("username");
          let uid = localStorage.getItem(username + 'uid');
          let type = "post";
          let url = this.esb + "/setApn/getManderNum";
          let data = {
            // uid: localStorage.getItem("uid"),
            // nid: this.ruleForm.equipmentNumber,
            // aa: lineRoad,
            // ml: ml
            data: {
              uid: uid, //用户id
              // uid: localStorage.getItem("uid"), //用户id
              nid: this.ruleForm.equipmentNumber,   //设备号
              mid: this.ruleForm.line,   //线路号
              type: "web",   //类型
              lon: "0",   //经度
              lat: "0",  //纬度
              device: ml //操作命令，见下表说明
            }
          };
          this.myAjax(type, url, data, res => {
            // console.log(res)
            if (res.data.code == 84) {
              this.$message.warning("当前设备不在线!");
            }
            if (res.data.code == 200) {
              this.$message.success("定时器添加成功，3秒后刷新数据并执行");
              let _this = this;
              setTimeout(function () {
                _this.$router.go(0);
              }, 3000);
            }
          });
        }
      });
    },
    // 添加定时器 - 重置数据
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.times2 = "";
    }
  },
  mounted() { },
  created() {
    this.getList(1);
    this.getOptions();
  }
};
</script>
  
 <style lang="less" scoped>
.timeSwitch .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}
.timeSwitch {
  overflow: hidden;
  height: 100%;
  .el-header {
    background: #fff;
    width: 99%;
    margin: 10px auto;
    .el-form {
      text-align: left;
      margin-top: 10px;
      .el-form-item {
        float: left;
        font-weight: bold;
      }
      .el-button {
        padding: 9px 20px;
        margin-top: 3px;
        float: right;
        // border-radius: 0;
        border: none;
        background: #1478c5;
        // background-image: linear-gradient(to right, #32a581, #158c86);
      }
      // .el-form-item /deep/ .el-form-item__label {
      //   color: #ccc !important;
      // }
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
    .timerData {
      text-align: left;
      padding-right: 20px;
    }
    .el-form-item /deep/ .el-input--suffix .el-input__inner {
      // color: #ccc;
      // border: 1px solid #47d;
      background: #e4e4e4;
      border: none;
      // border-radius: 0;
    }

    .dialog-footer {
      .el-button:nth-of-type(2) {
        border: none;
        background: #1478c5;
      }
    }

    ::-webkit-input-placeholder {
      color: #666;
    }
    ::-moz-placeholder {
      color: #666;
    } /* firefox 19+ */
    :-ms-input-placeholder {
      color: #666;
    } /* ie */
    input:-moz-placeholder {
      color: #666;
    }
    // .el-form-item /deep/ .el-form-item__label {
    //   color: #ccc;
    // }
    // .el-input /deep/ .el-input__inner,
    // .el-select /deep/ .el-input__inner,
    // .el-textarea /deep/ .el-textarea__inner {
    //   color: #ccc;
    //   background: #22366d;
    //   border: 1px solid #47d;
    // }
  }
  .el-footer {
  }
}
</style>
  