<template>
  <!-- 运维管理 - 抢修记录 - 新增抢修 -->
  <div class="electricBoxInfo">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <div class="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>运维管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/task' }">任务管理</el-breadcrumb-item>
            <el-breadcrumb-item>创建任务</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-form label-width="90px">
          <el-button
            type="primary"
            @click="goback"
            style="float:right;margin-right:10px;"
          >返 回</el-button>
        </el-form>
      </el-header>
      <!-- 中部 -->
      <el-main>
        <div style="width:99%;margin: 0 auto;padding:40px 0;background: #fff;">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="demo-ruleForm"
          >
            <div style="display:flex">
              <div class="left">
                <el-form-item
                  label="电箱名称"
                  prop="region"
                  class="dianxiang"
                >
                  <el-select
                    v-model="ruleForm.region"
                    filterable
                    placeholder="请选择电箱"
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
                  label="安装地址"
                  prop="localnation"
                  class="dianxiang"
                >
                  <el-select
                    v-model="ruleForm.localnation"
                    placeholder=""
                    disabled
                  >
                    <el-option
                      label="区域一"
                      value="shanghai"
                    ></el-option>
                    <el-option
                      label="区域二"
                      value="beijing"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="项目数"
                  prop="prople"
                >
                  <el-input
                    v-model="ruleForm.num"
                    placeholder="请输入项目数"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="计划开始时间"
                  prop="startdate"
                  class="dianxiang"
                >
                  <el-date-picker
                    v-model="ruleForm.startdate"
                    type="date"
                    value-format='timestamp'
                    placeholder="选择日期"
                    popper-class="datetime"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>

              <div class="right">
                <el-form-item
                  label="选择线路"
                  prop="line"
                  class="dianxiang"
                >
                  <el-select
                    v-model="ruleForm.line"
                    filterable
                    placeholder="请选择线路"
                    @change="getlocal"
                  >
                    <el-option
                      v-for="(item,index) in options1"
                      :label="item.name"
                      :value="item.mid"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="任务类型"
                  prop="rentype"
                  class="dianxiang"
                >
                  <el-select
                    v-model="ruleForm.rentype"
                    placeholder="请选择任务类型"
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
                  label="任务内容"
                  prop="desc"
                >
                  <el-input
                    type="textarea"
                    v-model="ruleForm.desc"
                    placeholder="请输入任务内容"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="计划结束时间"
                  prop="enddate"
                  class="dianxiang"
                >
                  <el-date-picker
                    v-model="ruleForm.enddate"
                    type="date"
                    value-format='timestamp'
                    placeholder="选择日期"
                    popper-class="datetime"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>

            <el-form-item style="text-align:center">
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
              >立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
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
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],

      ruleForm: {
        // 电箱
        region: '',
        // 线路
        line: '',
        // 安装地址
        localnation: '',
        // 项目数
        num: '',
        // 计划开始时间
        startdate: '',
        // 任务类型
        rentype: '',
        // 任务内容
        desc: '',
        // 计划结束时间
        enddate: ''
      },
      rules: {
        region: [{ required: true, message: '请选择电箱', trigger: 'change' }],
        line: [{ required: true, message: '请选择线路', trigger: 'change' }],
        localnation: [{ required: true, message: '请选择安装地址', trigger: 'change' }],
        rentype: [{ required: true, message: '请选择任务类型', trigger: 'change' }],
        num: [{ required: true, message: '请填写项目数', trigger: 'blur' }],
        desc: [{ required: true, message: '请填写任务内容', trigger: 'blur' }],
        startdate: [{ required: true, message: '请选择计划开始时间', trigger: 'change' }],
        enddate: [{ required: true, message: '请选择计划结束时间', trigger: 'change' }],
      },
    };
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
        this.ruleForm.localnation = ''
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

    // 生成任务单号
    getRandomAlphaNum(len) {
      var rdmString = "";
      //时间
      var myDate = new Date();
      var tY = myDate.getFullYear();//年
      var tM = myDate.getMonth() + 1;//月
      if (tM >= 1 && tM <= 9) {
        tM = "0" + tM;
      }
      var tD = myDate.getDate();//日
      if (tD >= 1 && tD <= 9) {
        tD = "0" + tD;
      }

      for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
      // return rdmString.substr(0, len);
      return String(tY) + String(tM) + String(tD) + rdmString.substr(0, len);

    },

    getlocal(value) {
      this.options1.forEach(val => {
        if (val.mid == value) {
          this.ruleForm.localnation = val.local
        }
      })
    },

    // 新建任务
    addtask() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "api3/Task/createTask";
      let data = {
        data: {
          task_no: this.getRandomAlphaNum(6), //任务号
          nid: this.ruleForm.region,
          aa: this.ruleForm.line,
          task_type: this.ruleForm.rentype,  //任务类型 1 巡检，2 维修
          nid_addr: this.ruleForm.localnation,
          task_note: this.ruleForm.desc,  //任务说明
          c_time: this.ruleForm.startdate / 1000,  //计划开始时间
          e_time: this.ruleForm.enddate / 1000,  //计划结束时间
          task_num: this.ruleForm.num,        //计划完成几项
          z_uid: uid
          // z_uid: localStorage.getItem('uid')
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        if (res.data.code == 500) {
          this.$message({
            showClose: true,
            message: '创建任务成功',
            type: 'success'
          });
          this.$router.go(-1)
        } else {
          this.$message({
            showClose: true,
            message: '创建任务失败',
            type: 'warning'
          });
        }
      });
    },

    // 提交任务
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addtask()
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 返回
    goback() {
      this.$router.go(-1)
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
  },
  mounted() {
  },
  created() {
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
    // background: #1d3278;
    // margin: 10px 0;
    background: #fff;
    width: 99%;
    margin: 10px auto;
    .bread {
      display: inline-block;
      float: left;
      margin-top: 22px;
      .el-breadcrumb /deep/ .el-breadcrumb__inner {
        // color: #ccc;
      }
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
        color: #ccc !important;
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 150px;
      }
      .dianxiang {
        width: 315px;

        .el-select,
        .el-date-editor {
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
    .el-form {
      text-align: left;
      margin-top: 10px;
      width: 60%;
      // overflow: hidden;
      .left,
      .right {
        flex: 1;
      }
      .el-form-item {
        // float: left;
      }
      .el-button:first-of-type {
        padding: 9px 20px;
        margin-top: 3px;
        // float: right;
        // border-radius: 0;
        border: none;
        background: #1478c5;
        // background-image: linear-gradient(to right, #32a581, #158c86);
      }
      .el-button:last-of-type {
        padding: 9px 20px;
        margin-top: 3px;
        // float: right;
        color: #1478c5;
        // border-radius: 0;
        border-color: #1478c5;
        // border-image: linear-gradient(to right, #32a581, #158c86) 1 20;
      }
      .el-form-item /deep/ .el-form-item__label,
      .el-form-item /deep/ .el-checkbox__label {
        font-weight: bold;
        // color: #ccc !important;
      }
      .dianxiang {
        // width: 315px;

        .el-select {
          width: 100%;
        }
      }
      .el-input /deep/ .el-input__inner,
      .el-select /deep/ .el-input__inner,
      .el-textarea /deep/ .el-textarea__inner {
        background: #e4e4e4;
        border: none;
        // border-radius: 0;
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
  