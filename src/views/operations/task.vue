<template>
  <!-- 运维管理 - 巡检记录 -->
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
              clearable
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
            label="任务类型"
            prop="rentype"
            style="width:240px"
            class="dianxiang"
          >
            <el-select
              v-model="form.rentype"
              filterable
              placeholder=""
              clearable
            >
              <el-option
                label="巡检"
                :value="1"
              ></el-option>
              <el-option
                label="维修"
                :value="2"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="任务状态"
            prop="renstatus"
            style="width:240px"
            class="dianxiang"
          >
            <el-select
              v-model="form.renstatus"
              filterable
              placeholder=""
              clearable
            >
              <el-option
                label="待办"
                :value="1"
              ></el-option>
              <el-option
                label="已办"
                :value="3"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item
            label="执行人"
            prop="people"
            style="width:240px"
            class="dianxiang"
          >
            <el-input v-model="form.people"></el-input>
          </el-form-item> -->

          <div style="display: flex;height: 37px;">
            <el-button
              type="primary"
              @click="getOnedx"
              style="margin-left:10px;"
            ><i class="el-icon-search"></i> 查 询</el-button>

            <el-button
              type="primary"
              @click="addtask"
              style="margin-left:10px;"
            >+ 新增任务</el-button>

          </div>
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>

        <div class="maincontent">
          <!-- 列表 -->
          <el-table
            :data="tableData"
            border
            stripe
            max-height="735"
            style="width: 99%;margin:0 auto"
          >
            <el-table-column
              prop="n_name"
              show-overflow-tooltip
              label="电箱名称"
              align="center"
              min-width="60"
            ></el-table-column>

            <el-table-column
              prop="name"
              show-overflow-tooltip
              label="回路名称"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="task_no"
              show-overflow-tooltip
              label="任务单号"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="task_note"
              show-overflow-tooltip
              label="任务内容"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              label="任务类型"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.task_type==1?"巡检":"维修" }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="任务状态"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.task_status==1?"待办":scope.row.task_status==3?"已办":"--" }}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="执行人"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.z_uid==userid?"管理员":"" }}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column
              prop="z_uid"
              show-overflow-tooltip
              label="执行人"
              align="center"
              min-width="100"
            ></el-table-column> -->

            <el-table-column
              prop="c_time"
              show-overflow-tooltip
              label="计划开始时间"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="e_time"
              show-overflow-tooltip
              label="计划结束时间"
              align="center"
              min-width="100"
            ></el-table-column>

            <!-- <el-table-column
              label="电箱号"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ hexCharCodeToStr(scope.row.mzid) }}</span>
              </template>
            </el-table-column> -->

            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  style="color:#1478c5"
                  :disabled="scope.row.task_status==3?true:false"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
              </template>
            </el-table-column>

            <el-table-column
              label="查看任务"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  style="color:#1478c5"
                  @click="seetask(scope.$index, scope.row)"
                >查看</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>

        <!-- 编辑弹框 -->
        <el-dialog
          title="编辑任务"
          :visible.sync="dialogVisible"
          width="40%"
          :close-on-click-modal='false'
        >
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="巡检项数"
              prop="num"
            >
              <el-input v-model="ruleForm.num"></el-input>
            </el-form-item>

            <el-form-item
              label="维修图片"
              prop="pic"
            >
              <el-upload
                class="upload-demo"
                action=""
                :auto-upload="false"
                :before-remove="beforeRemove"
                multiple
                :file-list="fileList"
                :on-change="sendpic"
              >
                <el-button
                  size="small"
                  type="primary"
                >点击上传</el-button>
                <!-- <div
                  slot="tip"
                  class="el-upload__tip"
                >只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-form-item>

            <el-form-item
              label="结束时间"
              prop="enddate"
            >
              <el-date-picker
                v-model="ruleForm.enddate"
                type="date"
                value-format="timestamp"
                placeholder="选择日期"
                popper-class="datetime"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item
              label="任务说明"
              prop="desc"
            >
              <el-input
                type="textarea"
                v-model="ruleForm.desc"
              ></el-input>
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="subMaintain"
            >确 定</el-button>
          </span>
        </el-dialog>

        <!-- 编查看弹框 -->
        <el-dialog
          title="查看任务详情"
          :visible.sync="dialogVisible2"
          width="40%"
          :close-on-click-modal='false'
        >
          <div class="seebox">
            <div class="seeleft">
              <p>任务单号：<span>{{seedata.task_no}}</span></p>
              <p>电箱名称：<span>{{shebeiData.n_name}}</span></p>
              <p>安装地址：<span>{{shebeiData.local}}</span></p>
              <p>完成时间：<span>{{seedata.d_time?new Date(seedata.d_time*1000).Format('yy-MM-dd'):''}}</span></p>
            </div>
            <div class="seeright">
              <p>任务类型：<span>{{seedata.task_type==1?"巡检":"维修" }}</span></p>
              <p>回路名称：<span>{{shebeiData.name}}</span></p>
              <p>状态：<span>{{seedata.task_status==1?"待办":seedata.task_status==3?"已办":"--"}}</span></p>
              <p>执行人：<span>{{seedata.z_uid==userid?"管理员":""}}</span></p>
            </div>
            <p class="ptag">任务说明：<span>{{seedata.task_note}}</span></p>
            <p class="ptag">图片：
              <img
                v-for="(item,index) in picData"
                :src="'https://api2test.yumoyo.cn'+item"
                alt=""
                :key="index"
              >
            </p>

          </div>

          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="dialogVisible2 = false"
            >关 闭</el-button>
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
      // 检索
      form: {
        dateof: "",
        region: "",
        rentype: "",
        renstatus: "",
        people: ""
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 列表数据
      tableData: [],
      shebeiData: [],
      // 编辑信息
      ruleForm: {
        num: '',
        enddate: "",
        desc: ''
      },
      rules: {
        num: [
          // { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        enddate: [
          { required: true, message: '请填写任务说明', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写任务说明', trigger: 'blur' }
        ]
      },

      // 管理员id
      userid: "",

      fileList: [],
      taskid: "",
      zuid: "",
      taskOrderno: "",

      seedata: {},

      picData: [],

      // 编辑弹框
      dialogVisible: false,
      dialogVisible2: false,

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
      let url = this.urlb + "/api3/Task/taskList";
      let data = {
        data: {
          nid: this.form.region,
          z_uid: this.form.people, //执行人 可选
          task_type: this.form.rentype,  //任务类型 可选
          task_status: this.form.renstatus,  //任务状态 可选
          start: this.form.dateof / 1000,  //开始时间 可选
          end: "",  //结束时间 可选
          page: page,
          size: 13
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableData = res.data.data;

        this.tableData.forEach(val => {

          val.c_time = new Date(
            val.c_time * 1000
          ).Format('yy-MM-dd')
          val.e_time = new Date(
            val.e_time * 1000
          ).Format('yy-MM-dd')
        })
        this.fenYe.total = res.data.count;
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

        // this.form.region = this.options[0].mzid
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

    // 新增任务
    addtask() {
      this.$router.push({ path: "/addtask" })
    },

    // 编辑按钮
    handleEdit(index, row) {
      // console.log(index, row);
      this.taskOrderno = row.task_no
      this.taskid = row.task_id
      this.zuid = row.z_uid
      this.dialogVisible = true
    },
    // 上传图片
    sendpic(file, fileList) {
      // console.log(file, fileList)
      const data = new FormData()
      data.append('file', file.raw)
      data.append('task_no', this.taskOrderno)
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
        method: "post",
        url: this.urla + "/api3/Task/uploadTaskImg",
        data
      }).then(res => {
        // console.log(res)
        if (res.data.code == 500) {
          this.$message({
            showClose: true,
            message: '图片上传成功',
            type: 'success'
          });
        }
        // this.imgurl = res.data.data
      });
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // 提交维修
    subMaintain() {
      let type = "post";
      let url = this.urlb + "/api3/Task/pollingTask";
      let data = {
        data: {
          id: this.taskid,
          real_num: this.ruleForm.num,
          res_note: this.ruleForm.desc,
          d_time: this.ruleForm.enddate / 1000,
          z_uid: this.zuid,
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        if (res.data.code == 500) {
          this.$message({
            showClose: true,
            message: '编辑任务成功',
            type: 'success'
          });
          this.getList(1);
          this.dialogVisible = false
          this.taskOrderno = ""
          this.taskid = ""
          this.zuid = ""
          this.fileList = []
          this.ruleForm.num = ""
          this.ruleForm.desc = ""
          this.ruleForm.enddate = ""
        }
      });
    },

    // 查看按钮
    seetask(index, row) {
      // console.log(row)
      this.dialogVisible2 = true
      let type = "post";
      let url = this.urlb + "/api3/task/taskOneCon";
      let data = {
        data: {
          task_no: row.task_no   //任务单号
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.seedata = res.data.data
        this.shebeiData = res.data.hu.data
        this.picData = res.data.task_img.data
      });
    },

    // 定位电箱号
    getOnedx() {
      this.getList(1)
    },

    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.getList(val);
    },
  },
  mounted() { },
  created() {
    let username = localStorage.getItem("username");
    this.userid = localStorage.getItem(username + 'uid');
    this.getList(1);
    this.getOptions();
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
        background: transparent;
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
    .maincontent {
      width: 99%;
      margin: 0 auto;
      background: #fff;
      padding: 20px;
      box-sizing: border-box;
    }
    .el-form {
      text-align: left;
      .el-form-item /deep/ .el-form-item__label,
      .el-form-item /deep/ .el-checkbox__label {
        // color: #ccc;
        font-weight: bold;
      }
      .el-input /deep/ .el-input__inner,
      .el-select /deep/ .el-input__inner,
      .el-textarea /deep/ .el-textarea__inner {
        background: #e4e4e4;
        border: none;
        // border-radius: 0;
      }
      .el-form-item /deep/ .el-upload-list {
        text-align: left;
        .el-upload-list__item-name {
          // color: #ccc !important;
        }
      }
    }
    .el-button {
      padding: 6px 15px;
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

    .seebox {
      display: flex;
      justify-content: space-around;
      border: 1px solid;
      flex-wrap: wrap;
      .seeleft,
      .seeright {
        width: 50%;
        text-align: left;
      }
      p {
        padding: 5px 5px;
        border-bottom: 1px solid;
        span {
        }
      }
      .ptag {
        width: 100%;
        text-align: left;
        img {
          width: 10%;
          margin-right: 10px;
          vertical-align: text-top;
        }
      }
    }
    // .ptag {
    //   padding: 5px 5px;
    //   border-bottom: 1px solid #47d;
    // }
  }
  .el-footer {
  }
}
</style>
  