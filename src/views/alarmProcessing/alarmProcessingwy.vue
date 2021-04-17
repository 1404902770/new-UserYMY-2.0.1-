<template>
  <!-- 综合报警 - 报警分类 -->
  <div class="alarmProcessingwy">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <el-form
          ref="form"
          :model="form"
          class="demo-ruleForm"
          label-width="90px"
        >
          <el-form-item
            label="选择时间"
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
              clearable
              placeholder="全部"
              @change='getlines'
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
            label="选择回路"
            prop="line"
          >
            <el-select
              v-model="form.line"
              placeholder="全部"
              clearable
            >
              <el-option
                v-for="(item,index) in linearry"
                :key="index"
                :label="item.name"
                :value="item.mid"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="报警类型"
            prop="pu"
          >
            <el-select
              v-model="form.pu"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,index) in jingtype"
                :key="index"
                :label="item.title"
                :value="item.bhao"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="报警状态"
            prop="alarmtype"
          >
            <el-select
              v-model="form.alarmtype"
              placeholder="请选择"
              clearable
            >
              <el-option
                label="未读"
                :value="1"
              ></el-option>
              <el-option
                label="已读"
                :value="2"
              ></el-option>
              <el-option
                label="已检修"
                :value="3"
              ></el-option>
            </el-select>
          </el-form-item>

          <div style="display: flex;height: 37px;">
            <el-button
              type="primary"
              @click="submitForm"
            >查询</el-button>

            <!-- <el-button
              :disabled="selectData.length>0?false:true"
              type="primary"
              style="background-color: #f0ad4e;border-color: #eea236;"
              @click="sureinfo"
            >一键确认</el-button> -->
          </div>

          <!-- <el-button @click="resetForm('form')">重置 / 刷新</el-button> -->
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div style="height: 37px;text-align: left;padding-left: 10px;box-sizing: border-box;">
          <el-button
            :disabled="selectData.length>0?false:true"
            type="primary"
            style="background-color: #f0ad4e;border-color: #eea236;"
            @click="sureinfo"
          >一键确认</el-button>

          <el-button
            :disabled="selectData.length>0?false:true"
            type="primary"
            style="background-color: #f56c6c;border-color: #f56c6c;"
            @click="deletealarm"
          >一键删除</el-button>
        </div>

        <div class="maincontent">
          <!-- 列表 -->
          <el-table
            :data="tableData"
            border
            stripe
            ref="table"
            style="width: 99%;margin:0 auto"
            empty-text="暂无报警信息"
            :max-height="tableHeight"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              align="center"
              min-width="55"
            ></el-table-column>

            <el-table-column
              prop="n_name"
              show-overflow-tooltip
              label="电箱名称"
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
              prop="local"
              show-overflow-tooltip
              label="安装位置"
              align="center"
              min-width="80"
            ></el-table-column>

            <el-table-column
              prop="otype"
              show-overflow-tooltip
              label="报警类型"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              prop="beizhu"
              show-overflow-tooltip
              label="报警详情"
              align="center"
              min-width="200"
            ></el-table-column>

            <el-table-column
              prop="time"
              show-overflow-tooltip
              label="报警时间"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="status"
              show-overflow-tooltip
              label="确认状态"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  :disabled="scope.row.status=='已检修'?true:false"
                  @click="handleEdit(scope.$index, scope.row)"
                ><i class="el-icon-edit"></i>编辑</el-button>
              </template>
            </el-table-column>

            <el-table-column
              label="详情"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  style="background-color: #f0ad4e;border-color: #eea236;"
                  @click="seealarm(scope.$index, scope.row)"
                >查看</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>

        <!-- 编辑弹框 -->
        <el-dialog
          title="编辑"
          width="40%"
          :visible.sync="dialogFormVisible"
          :close-on-click-modal="false"
        >
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="检修人"
              prop="people"
            >
              <el-input v-model="ruleForm.people"></el-input>
            </el-form-item>

            <el-form-item
              label="检修说明"
              prop="desc"
            >
              <el-input
                type="textarea"
                v-model="ruleForm.desc"
              ></el-input>
            </el-form-item>
          </el-form>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="submitResult('ruleForm')"
            >确 定</el-button>
          </div>
        </el-dialog>

        <!-- 查看弹框 -->
        <el-dialog
          title="查看详情"
          width="30%"
          :visible.sync="dialogFormVisible2"
          :close-on-click-modal="false"
        >
          <div class="seebox">
            <div class="seeleft">
              <p>电箱名称：<span>{{detailData.n_name}}</span></p>
              <p>回路名称：<span>{{detailData.name}}</span></p>
              <p>报警类型：<span>{{detailData.desc}}</span></p>
              <p>检修人：<span>{{detailData.xname}}</span></p>
              <p>检修说明：<span>{{detailData.xtext}}</span></p>
            </div>
            <div class="seeright">
              <p>电箱号：<span>{{detailData.nid?hexCharCodeToStr(detailData.nid):""}}</span></p>
              <p>回路号：<span>{{detailData.mid}}</span></p>
              <p>报警详情：<span>{{detailData.beizhu}}</span></p>
              <p v-show="detailData.status!=0?true:false">检修时间：<span>{{detailData.xtime | dataFormat}}</span></p>
            </div>
          </div>
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
export default {
  name: "alarmProcessingwy",
  components: {
    copyright
  },
  data() {
    return {
      // 检索
      form: {
        region: "",
        pu: "",
        line: "",
        dateof: [],
        alarmtype: ""
      },
      tableHeight: '735',
      // 获取所有设备
      options: [],
      // 列表数据
      tableData: [],
      // 报警类型
      jingtype: [
        {
          title: "欠压告警",
          bhao: 1
        },
        {
          title: "过压预警",
          bhao: 2
        },
        {
          title: "过压报警",
          bhao: 3
        },
        {
          title: "电流预警",
          bhao: 4
        },
        {
          title: "电流告警",
          bhao: 5
        },
        {
          title: "电流报警",
          bhao: 6
        },
        {
          title: "漏电流报警",
          bhao: 7
        },
        {
          title: "温度报警",
          bhao: 8
        },
        {
          title: "分机报警",
          bhao: 9
        }
      ],
      // 选中报警信息
      selectData: [],
      // 线路信息
      linearry: [],
      // 标识号，列表返回的tle
      alarmtle: "",

      dialogFormVisible: false,
      dialogFormVisible2: false,

      // 报警信息id
      infoId: "",
      // 详细信息
      detailData: {},

      ruleForm: {
        people: '',
        desc: ''
      },
      rules: {
        people: [
          { required: true, message: '请填写检修人', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      }
    };
  },
  filters: {
    dataFormat(val) {
      return new Date(val * 1000).Format('yy-MM-dd');
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
          // uid: localStorage.getItem('uid')
        }
      };
      this.myAjax(type, url, data, res => {
        this.options = res.data.data;
      });
    },
    // 选择电箱获取线路
    getlines() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = 'post'
      let url = this.urla + "/api3/EnergyData/getNetedMachedList"
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          nid: this.form.region
        }
      }
      this.myAjax(type, url, data, res => {
        this.linearry = res.data.data
      })
    },
    // 初始化获取列表
    getList(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/EnergyData/jingAllList";
      var data = {
        data: {
          uid: uid, //必传
          // uid: localStorage.getItem('uid'), //必传
          page: page, //必传 页码
          size: 13, //必传  页码条数
          nid: this.form.region == "" ? 0 : this.form.region, //可选     
          mid: this.form.line == "" ? 0 : this.form.line, //可选   线路
          status: this.form.alarmtype, //可选   状态：0未读。。。。。
          type: this.form.pu, //可选   报警类别
          start: this.form.dateof[0] ? this.form.dateof[0] / 1000 : "", //可选   时间范围开始
          send: this.form.dateof[1] ? this.form.dateof[1] / 1000 : "" //可选 时间范围结束
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.$refs.table.$el.style.width = '99%'

        this.tableData = res.data.data;
        this.fenYe.total = res.data.length;
        this.alarmtle = res.data.tle
        for (let i = 0; i < this.tableData.length; i++) {
          // 电箱号
          this.tableData[i].nid = this.hexCharCodeToStr(this.tableData[i].nid);
          // 线路
          this.tableData[i].mid = '线路' + this.tableData[i].mid;
          // 告警类型
          if (this.tableData[i].otype == 1) {
            this.tableData[i].otype = '欠压告警'
          } else if (this.tableData[i].otype == 2) {
            this.tableData[i].otype = '过压预警'
          } else if (this.tableData[i].otype == 3) {
            this.tableData[i].otype = '过压报警'
          } else if (this.tableData[i].otype == 4) {
            this.tableData[i].otype = '电流预警'
          } else if (this.tableData[i].otype == 5) {
            this.tableData[i].otype = '电流告警'
          } else if (this.tableData[i].otype == 6) {
            this.tableData[i].otype = '电流报警'
          } else if (this.tableData[i].otype == 7) {
            this.tableData[i].otype = '漏电流报警'
          } else if (this.tableData[i].otype == 8) {
            this.tableData[i].otype = '温度报警'
          } else if (this.tableData[i].otype == 9) {
            this.tableData[i].otype = '分机报警'
          } else {
            this.tableData[i].otype = '- -'
          }
          // 报警级别
          this.tableData[i].limit = '建议断闸检修'
          // 报警状态
          if (this.tableData[i].status == 0) {
            this.tableData[i].status = '未读'
          } else if (this.tableData[i].status == 1) {
            this.tableData[i].status = '已阅读'
          } else if (this.tableData[i].status == 2) {
            this.tableData[i].status = '已检修'
          } else if (this.tableData[i].status == 3) {
            this.tableData[i].status = '已删除'
          } else {
            this.tableData[i].otype = '- -'
          }
          // 检修人
          this.tableData[i].xname = this.tableData[i].xname ? this.tableData[i].xname : '- -';
          this.tableData[i].xtime = this.tableData[i].xtime ? this.tableData[i].xtime : '- -';
          // 报警发生的时间        
          this.tableData[i].time = new Date(
            this.tableData[i].time * 1000
          ).Format("yy-MM-dd hh:mm:ss");
        }
      });
    },

    // 表格选择事件
    handleSelectionChange(val) {
      // console.log(val)
      this.selectData = val
    },

    // 一键确认
    sureinfo() {
      this.$confirm('是否一键确认报警信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let arr = []

        this.selectData.forEach(val => {
          arr.push(val.id)
        })
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = "post";
        let url = this.urlb + "/api3/EnergyData/jingyidu";
        let data = {
          data: {
            uid: uid,
            // uid: localStorage.getItem('uid'),
            jid: this.arrToString(arr), //报警id，列表的id
            tle: this.alarmtle   //标识号，列表返回的tle
          }
        };
        this.myAjax(type, url, data, res => {
          // console.log(res)
          if (res.data.code == 702) {
            this.$message({
              showClose: true,
              message: '确认消息成功',
              type: 'success'
            });
            this.getList(1);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确认报警信息'
        });
      });

    },

    // 一键删除
    deletealarm() {
      this.$confirm('是否一键确认报警信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let arr = []

        this.selectData.forEach(val => {
          arr.push(val.id)
        })
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = "post";
        let url = this.urlb + "/api3/EnergyData/delJingIdList";
        let data = {
          data: {
            uid: uid,
            // uid: localStorage.getItem('uid'),
            jid: this.arrToString(arr), //报警id，列表的id
            tle: this.alarmtle   //标识号，列表返回的tle
          }
        };
        this.myAjax(type, url, data, res => {
          // console.log(res)
          if (res.data.code == 7010) {
            this.$message({
              showClose: true,
              message: '删除报警消息成功',
              type: 'success'
            });
            this.getList(1);
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 编辑按钮
    handleEdit(index, row) {
      // console.log(index, row);
      this.infoId = row.id
      this.dialogFormVisible = true
    },
    // 提交检修结果
    submitResult(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let username = localStorage.getItem("username");
          let uid = localStorage.getItem(username + 'uid');
          let type = "post";
          let url = this.urlb + "/api3/EnergyData/jingjianxiu";
          let data = {
            data: {
              uid: uid,
              // uid: localStorage.getItem('uid'),
              jid: this.infoId,
              tle: this.alarmtle,
              xname: this.ruleForm.people,    //检修人
              txt: this.ruleForm.desc  //检修的说明
            }
          };
          this.myAjax(type, url, data, res => {
            // console.log(res)
            if (res.data.code == 703) {
              this.$message({
                showClose: true,
                message: '提交检修结果成功',
                type: 'success'
              });
              this.getList(1);
              this.dialogFormVisible = false
            }
          });
        } else {
          return false;
        }
      });
    },
    // 查看详情
    seealarm(index, row) {
      this.dialogFormVisible2 = true
      // console.log(index, row);
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/EnergyData/jingoneinfo";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem('uid'),
          jid: row.id,
          tle: this.alarmtle,
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.detailData = res.data.data
      });
    },

    // 获取当前日期和前一天
    setdate() {
      var timestamp = (new Date()).getTime();

      // console.log(timestamp);//打印当前时间戳
      this.form.dateof.push(timestamp - 24 * 60 * 60 * 1000)
      this.form.dateof.push(timestamp)
      // console.log(timestamp - 24 * 60 * 60 * 1000);
      this.getList(1)
    },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.value = ""
      this.form.line = ""

      this.getList(1);
      this.fenYe.currentPage = 1;
    },
    // 查询
    submitForm() {
      if (this.form.dateof && this.form.dateof[0] && this.form.dateof[1]) {
        this.getList(1);
      } else {
        this.$message({
          showClose: true,
          message: '请选择时间',
          type: 'warning'
        });
      }
    },
    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.getList(val);
    }
  },
  mounted() {
    this.$refs.table.$el.style.width = '99%'
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 86;
  },
  created() {
    // this.getList(1);
    this.setdate()
    this.getOptions();
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
    background: #fff;
    width: 99%;
    margin: 10px auto;
    .el-form {
      text-align: left;
      margin-top: 10px;
      display: flex;
      .el-form-item {
        // float: left;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        // width: 150px;
        background: #f3f3f3;
        border: none;
        border-radius: 0;
      }
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
        // border-radius: 0;
        border: none;
        background: #1478c5;
        // background-image: linear-gradient(to right, #32a581, #158c86);
      }
      .dianxiang {
        width: 275px;
        .el-select {
          width: 100%;
        }
      }
      .el-date-editor /deep/ .el-range__icon {
        line-height: 26px !important;
      }
      .el-date-editor /deep/ .el-range-input {
        background: #f3f3f3;
      }
      .el-form-item /deep/ .el-form-item__label {
        font-weight: bold;
        // color: #ccc !important;
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
    .el-button {
      padding: 6px 15px;
    }
    .el-form-item /deep/ .el-form-item__label {
      // color: #ccc;
    }
    .seebox {
      // display: flex;
      // justify-content: space-around;
      border: 1px solid;
      .seeleft,
      .seeright {
        // width: 50%;
        text-align: left;
      }
      p {
        padding: 5px 5px;
        border-bottom: 1px solid;
        span {
        }
      }
    }
  }
  .el-footer {
  }
}
</style>
  