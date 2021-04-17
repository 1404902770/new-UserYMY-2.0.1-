<template>
  <!-- 运维管理 - 维修记录 -->
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
                :label="'['+getString1(hexCharCodeToStr(item.mzid))+'] ' + item.mzname + ' [' + item.jianzhu +']'"
                :value="item.mzid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="选择线路"
            prop="line"
          >
            <el-select
              v-model="form.line"
              placeholder="全部"
            >
              <el-option
                v-for="(item,index) in options1"
                :key="index"
                :label="item.name"
                :value="item.mid"
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
            >
              <el-option
                label="十五分钟"
                value="15"
              ></el-option>
              <el-option
                label="半小时"
                value="30"
              ></el-option>
              <el-option
                label="一小时"
                value="60"
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

        <!-- 列表 -->
        <el-table
          :data="tableData"
          border
          max-height="735"
          style="width: 99%;margin:0 auto"
        >
          <el-table-column
            prop="name"
            show-overflow-tooltip
            label="电箱名称"
            align="center"
            min-width="60"
          ></el-table-column>

          <el-table-column
            prop="time"
            show-overflow-tooltip
            label="线路名称"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="dzz"
            show-overflow-tooltip
            label="维修项"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv1"
            show-overflow-tooltip
            label="维修结果"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv2"
            show-overflow-tooltip
            label="维修记录"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv3"
            show-overflow-tooltip
            label="执行人"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="aa1"
            show-overflow-tooltip
            label="维修完成时间"
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
                @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>

        </el-table>

      </el-main>
      <!-- 尾部 -->
      <el-footer>
        <!-- 分页 -->
        <el-pagination
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
      // 检索
      form: {
        dateof: "",
        region: "",
        line: "",
        renstatus: "",
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 列表数据
      tableData: [],

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
      let url = this.urlb + "/api3/SourceData/GetSourceData";
      let data = {
        data: {
          dt: new Date(this.form.dateof).getTime() / 1000, //日期
          tm: this.form.interval,    //时间间隔 分钟
          nid: this.form.region,
          aa: this.form.linename,
          // type: "3"  //线路类型
        }
      };
      this.myAjax(type, url, data, res => {
        console.log(res)

        this.tableData = res.data.data;
        for (let i = 0; i < this.options1.length; i++) {
          if (this.form.linename == this.options1[i].mid) {
            this.tableData.forEach(val => {
              val.name = this.options1[i].name

              val.time = new Date(
                val.time * 1000
              ).Format('yy-MM-dd hh:mm:ss')
            })
          }
        }

        // this.fenYe.total = res.data.length;
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
      let url = this.urlb + "/api3/EnergyData/machedList";
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

    handleEdit(index, row) {
      console.log(index, row);
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
  overflow: hidden;
  height: 100%;
  .el-header {
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
    .echarts {
      width: 100%;
      #echart {
        width: 100%;
        height: 690px;
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
  