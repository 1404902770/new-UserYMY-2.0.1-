<template>
  <!-- 远程控制 - 手动开关 -->
  <div class="manualSwitch">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="电箱名称">
            <el-select
              v-model="form.region"
              filterable
              placeholder="电箱名称"
            >
              <el-option
                v-for="(item,index) in options"
                :label="item.text"
                :value="item.id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-button
            type="primary"
            @click="getOnedx"
            style="float:left;margin-left:10px;"
          >查 询</el-button>

          <el-button
            type="primary"
            @click="resetForm1('form')"
            style="float:left;"
          >重 置</el-button>
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div class="maincontent">
          <!-- 列表 -->
          <div v-show="tag ==1? true:false">
            <el-table
              :data="tableData"
              stripe
              ref="table"
              :max-height="tableHeight"
              style="width: 99%;margin:0 auto"
            >
              <el-table-column
                prop="nid"
                show-overflow-tooltip
                label="电箱号"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <span>{{ hexCharCodeToStr(scope.row.nid) }}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="n_name"
                show-overflow-tooltip
                label="电箱名称"
                align="center"
                min-width="120"
              ></el-table-column>

              <el-table-column
                prop="n_local"
                show-overflow-tooltip
                label="安装地址"
                align="center"
                min-width="120"
              ></el-table-column>

              <!-- <el-table-column
                show-overflow-tooltip
                label="线路类型"
                align="center"
                min-width="80"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.type == 0">[F]总路单相</span>
                  <span v-if="scope.row.type == 1">[F]总路三相</span>
                  <span v-if="scope.row.type == 10">[F]支路单相</span>
                  <span v-if="scope.row.type == 11">[F]支路三相</span>
                  <span v-if="scope.row.type == 80">[T]总路单相</span>
                  <span v-if="scope.row.type == 81">[T]总路三相</span>
                  <span v-if="scope.row.type == 90">[T]支路单相</span>
                  <span v-if="scope.row.type == 91">[T]支路三相</span>
                </template>
              </el-table-column> -->

              <!-- <el-table-column
                prop="b_status"
                show-overflow-tooltip
                label="运行状态"
                align="center"
                min-width="100"
              ></el-table-column> -->

              <el-table-column
                show-overflow-tooltip
                label="运行状态"
                align="center"
                min-width="80"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.b_status == 0">未绑定</span>
                  <span v-if="scope.row.b_status == 1">已绑定</span>
                  <span v-if="scope.row.b_status == 2">激活正常</span>
                  <span v-if="scope.row.b_status == 3">设备停用</span>
                </template>
              </el-table-column>

              <!-- <el-table-column
              prop="statu"
              show-overflow-tooltip
              label="状态"
              align="center"
              min-width="60"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.statu == 1"
                  style="color:#008080;"
                >在线</span>
                <span
                  v-if="scope.row.statu == 0"
                  style="color:#F56C6C;"
                >离线</span>
              </template>
            </el-table-column> -->

              <el-table-column
                show-overflow-tooltip
                label="操作"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    style="color:#fff;background: #1478c5;"
                    icon="el-icon-search"
                    @click="see(scope.row)"
                  >操作分路</el-button>

                  <el-button
                    type="text"
                    style="color:#fff;background: #1478c5;"
                    @click="keybrake(scope.row)"
                  >一键分闸</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 线路 -->
          <div v-show="tag ==0? true:false">
            <el-table
              :data="tableData1"
              stripe
              style="width: 99%;margin:0 auto"
            >
              <!-- <el-table-column
                prop="nid"
                show-overflow-tooltip
                label="设备号"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <span>{{ hexCharCodeToStr(scope.row.nid) }}</span>
                </template>
              </el-table-column> -->

              <el-table-column
                prop="name"
                show-overflow-tooltip
                label="回路名称"
                align="center"
                min-width="120"
              ></el-table-column>

              <el-table-column
                show-overflow-tooltip
                label="回路编号"
                align="center"
                min-width="60"
              >
                <template slot-scope="scope">
                  <span>回路{{ scope.row.aa }}</span>
                </template>
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                label="回路类型"
                align="center"
                min-width="80"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.type == 0">[F]总路单相</span>
                  <span v-if="scope.row.type == 1">[F]总路三相</span>
                  <span v-if="scope.row.type == 10">[F]支路单相</span>
                  <span v-if="scope.row.type == 11">[F]支路三相</span>
                  <span v-if="scope.row.type == 80">[T]总路单相</span>
                  <span v-if="scope.row.type == 81">[T]总路三相</span>
                  <span v-if="scope.row.type == 90">[T]支路单相</span>
                  <span v-if="scope.row.type == 91">[T]支路三相</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="local"
                show-overflow-tooltip
                label="安装位置"
                align="center"
                min-width="120"
              ></el-table-column>

              <el-table-column
                prop="statu"
                show-overflow-tooltip
                label="状态"
                align="center"
                min-width="60"
              >
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.statu == 1"
                    style="color:#158c86;"
                  >在线</span>
                  <span
                    v-if="scope.row.statu == 0"
                    style="color:#F56C6C;"
                  >离线</span>
                </template>
              </el-table-column>

              <el-table-column
                show-overflow-tooltip
                label="操作"
                align="center"
                min-width="100"
              >
                <template slot-scope="scope">
                  <span style="color:#F56C6C">分闸</span>
                  <el-switch
                    @change="automaticManual1(scope.row,scope.$index)"
                    v-model="scope.row.g"
                  ></el-switch>
                  <span style="color:#158c86">合闸</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
import ElementUI from "element-ui";
import copyright from "../../components/copyright";
export default {
  name: "manualSwitch",
  components: {
    copyright
  },
  data() {
    return {
      tableHeight: '735',

      // 检索
      form: {
        region: ""
      },
      // 获取所有设备
      options: [],
      // 电箱列表数据
      tableData: [],
      // 线路列表数据
      tableData1: [],

      // 分合闸 30秒判定
      timer: "",
      num: 1,

      // 一键分闸 30秒判定
      timer1: "",
      num1: 1,

      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      },
      tag: 1
    };
  },
  methods: {
    // 初始化获取列表
    getList(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      // let url = this.urlb + "/api3/EnergyData/getNetedInfo";
      let url = this.urlb + "/api3/Device/getallHwAgent";;
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          page: Number(this.fenYe.currentPage) - 1,
          nid: 0,
          size: 13
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.$refs.table.$el.style.width = '99%'

        this.tableData = res.data.data;
        this.fenYe.total = res.data.total;
        for (let i = 0; i < this.tableData.length; i++) {
          this.options.push({
            id: this.tableData[i].nid,
            text:
              "[" +
              this.getString1(this.hexCharCodeToStr(this.tableData[i].nid)) +
              "]" +
              this.tableData[i].n_name
          });
          this.tableData[i].a_time = new Date(
            this.tableData[i].a_time * 1000
          ).Format("yy-MM-dd hh:mm:ss");
        }
      });
    },
    // 查询 - 下拉获取线路
    getOnedx(val) {
      if (this.form.region) {
        this.tag = 0

        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = "post";
        let url = this.urla + "/api3/mach/getHwlist";
        let data = {
          data: {
            nid: this.form.region,
            uid: uid,
            // uid: localStorage.getItem('uid'),
            gid: localStorage.getItem('gid'),
            ctype: 0
          }
        };
        this.myAjax(type, url, data, res => {
          // this.tableData1 = res.data.data;
          // for (let i = 0; i < this.tableData1.length; i++) {
          //   if (this.tableData1[i].nn == "00") {
          //     this.tableData1[i].g = false;
          //   } else {
          //     this.tableData1[i].g = true;
          //   }
          // }
          this.tableData1 = []
          if (res.data.msg == "设备不在线") {
            this.tableData1 = res.data.data
          } else {
            res.data.data.forEach(val => {
              this.tableData1.push(JSON.parse(val))
            })
          }
          this.tableData1.forEach(val => {
            if (val.nn == "00") {
              val.g = false;
            } else {
              val.g = true;
            }
          })
        });
      } else {
        this.$message.warning("请选择要查询的电箱设备号!");
      }
    },
    // 重置
    resetForm1(formName) {
      this.tag = 1
      // this.$refs[formName].resetFields();
      this.options = []
      this.form.region = ''
      this.getList(1);
    },
    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.getList(val);
    },
    // 操作分路
    see(row) {
      if (row.nid) {
        let _this = this;
        ElementUI.Loading.service({
          fullscreen: true,
          background: "rgba(0,0,0,.4)"
        });
        setTimeout(() => {
          ElementUI.Loading.service({}).close();
          _this.$router.push({
            path: "/manualSwitchInfo",
            query: {
              nid: row.nid
            }
          });
        }, 500);
      } else {
        this.$message.warning("该条信息有误,请联系管理员");
        return false;
      }
    },

    // 分闸 / 合闸
    automaticManual1(row, t) {
      this.state = t
      // console.log(t)
      // console.log(this.tableData[t])
      this.mid = row.aa;
      this.$confirm("是否要执行此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ElementUI.Loading.service({
            fullscreen: true,
            text: "正在执行...",
            background: "rgba(0,0,0,.4)"
          });
          this.Interval = setInterval(() => {
            this.automaticManual2(t);
          }, 3000);
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消操作"
          });
        });
    },
    // 分闸 / 合闸 - 循环执行
    automaticManual2(t) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let token = localStorage.getItem(uid + 'token');
      let instance = this.$axios.create();
      instance({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Apptoken": token
          // "Apptoken": localStorage.getItem('token')
        },
        method: 'post',
        url: this.esb + "/getManderNum",
        data: {
          data: {
            uid: uid, //用户id
            // uid: localStorage.getItem("uid"), //用户id
            nid: this.form.region,   //设备号
            // nid: this.nid,   //设备号
            mid: this.mid, //线路号
            type: 'web', //类型
            lon: 0,//经度
            lat: 0,//纬度
            device: this.tableData1[t].g == false ? "01" + this.mid + "00" : "01" + this.mid + "01",//操作命令，见下表说明
          }
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: '发送成功,请稍等……',
            type: 'success'
          });
          this.num = 1
          this.timer = setInterval(() => {
            this.num++
            if (this.num == 30) {
              clearInterval(this.Interval);
              clearInterval(this.timer);
              ElementUI.Loading.service({}).close()
              this.$message.warning("请检查设备状态是否正常");
            }
          }, 1000)
        } else if (res.data.code == 100) {
          clearInterval(this.Interval);
          // this.$message.warning("设备不在线,请在线后再操作");
        } else if (res.data.code == 201) {
          clearInterval(this.Interval);
          this.$message.warning("其他用户在操作此设备,请稍后再操作");
        } else {
          this.$message.warning("安装出错, 请重新调试");
        }
      }).catch(err => {
        // console.log(err)
      })


      // let _this = this;
      // let type = "post";
      // let url = _this.urla + "/api/mach/getRandom";
      // let data = {
      //   uid: localStorage.getItem("uid"),
      //   nid: this.nid,
      //   mid: this.mid,
      //   mlo:
      //     this.tableData[t].g == false
      //       ? "00" + this.mid + "00"
      //       : "00" + this.mid + "01"
      // };
      // this.myAjax(type, url, data, res => {
      //   // console.log(res);
      //   if (res.data.code == 110) {
      //     clearInterval(this.Interval);
      //     this.$message.warning("设备不在线");
      //   }
      // });
    },

    // 一键分闸
    keybrake(row) {
      this.state = "key"
      // console.log(row)
      this.$confirm("是否要执行此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ElementUI.Loading.service({
            fullscreen: true,
            text: "正在执行...",
            background: "rgba(0,0,0,.4)"
          });
          this.Interval = setInterval(() => {
            this.automaticManual3(row);
          }, 3000);
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消操作"
          });
        });
    },
    // 一键分闸 -- 操作接口
    automaticManual3(row) {

      var device = ""
      switch (row.ext_number) {
        case 1: device = "020100"
          break;
        case 2: device = "0201000200"
          break;
        case 3: device = "02010002000300"
          break;
        case 4: device = "020100020003000400"
          break;
        case 5: device = "0201000200030004000500"
          break;
        case 6: device = "02010002000300040005000600"
          break;
        case 7: device = "020100020003000400050006000700"
          break;
        case 8: device = "0201000200030004000500060007000800"
          break;
        case 9: device = "02010002000300040005000600070008000900"
          break;
        case 10: device = "020100020003000400050006000700080009000a00"
          break;
        case 11: device = "020100020003000400050006000700080009000a000b00"
          break;
        case 12: device = "020100020003000400050006000700080009000a000b000c00"
          break;
      }
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let token = localStorage.getItem(uid + 'token');
      let instance = this.$axios.create();
      instance({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Apptoken": token
          // "Apptoken": localStorage.getItem('token')
        },
        method: 'post',
        url: this.esb + "/getManderNum",
        data: {
          data: {
            uid: uid, //用户id
            // uid: localStorage.getItem("uid"), //用户id
            nid: row.nid,   //设备号
            // nid: this.nid,   //设备号
            mid: "0", //线路号
            type: 'web', //类型
            lon: 0,//经度
            lat: 0,//纬度
            device: device,//操作命令，见下表说明
          }
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            showClose: true,
            message: '发送成功,请稍等……',
            type: 'success'
          });
          this.num1 = 1
          this.timer1 = setInterval(() => {
            this.num1++
            if (this.num1 == 30) {
              clearInterval(this.Interval);
              clearInterval(this.timer1)
              ElementUI.Loading.service({}).close()
              this.$message.warning("请检查设备状态是否正常");
            }
          }, 1000)
        } else if (res.data.code == 100) {
          clearInterval(this.Interval);
          // this.$message.warning("设备不在线,请在线后再操作");
        } else if (res.data.code == 201) {
          clearInterval(this.Interval);
          this.$message.warning("其他用户在操作此设备,请稍后再操作");
        } else {
          this.$message.warning("安装出错, 请重新调试");
        }
      }).catch(err => {
        // console.log(err)
      })
    }
  },

  watch: {
    count(newCount, oldCount) {
      // console.log(newCount, oldCount)
      if (newCount.type != "jing") {
        if (newCount.type == "nfs") {
          clearInterval(this.Interval);
          clearInterval(this.timer);
          clearInterval(this.timer1);
          // console.log(newCount.data);
          // console.log(newCount.data.substr(newCount.data.length - 4, 2));
          if (newCount.hex.substr(newCount.hex.length - 4, 2) == "00") {

            this.$message.success("分闸成功");
            ElementUI.Loading.service({}).close()

            if (this.state != "key") {
              this.tableData[this.state].g = false
            }

            let a = []
            this.tableData.forEach(val => {
              a.push(val)
            })
            this.tableData = a

            // let a = this.tableData
            // let b = JSON.stringify(a)
            // this.tableData = JSON.parse(b)

          } else {

            this.$message.success("合闸成功");
            ElementUI.Loading.service({}).close()

            if (this.state != "key") {
              this.tableData[this.state].g = true
            }

            let a = []
            this.tableData.forEach(val => {
              a.push(val)
            })
            this.tableData = a

            // let a = this.tableData
            // let b = JSON.stringify(a)
            // this.tableData = JSON.parse(b)

          }

          // for (let i = 0; i < this.tableData.length; i++) {
          //   console.log(newCount)
          //   console.log(this.tableData[i].mid)
          //   if (this.tableData[i].mid == newCount.mid) {
          // this.getAllShunt();
          //     ElementUI.Loading.service({}).close();
          //     if (newCount.zl == "00") {
          // this.$message.success("分闸成功");
          //     } else {
          //       this.$message.success("和闸成功");
          //     }
          //   }
          // }
        } else if (newCount.type == "nff") {
          clearInterval(this.Interval);
          clearInterval(this.timer);
          clearInterval(this.timer1);
          this.$message.warning("操作失败");
        }
      }
    }
  },
  computed: {
    count() {
      // console.log(this.$store.state.socketData)
      return this.$store.state.socketData;
    }
  },
  mounted() {
    this.$refs.table.$el.style.width = '99%'
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 69;
  },
  created() {
    this.getList(1);
  }
};
</script>
  
 <style lang="less" scoped>
.manualSwitch .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}
.manualSwitch {
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
    .el-button {
      padding: 6px 5px;
      background: #0da8d8;
    }
    .el-switch,
    .is-checked {
      margin: -1px 4px 0 4px;
    }
  }
  .el-footer {
  }
}
</style>
  