<template>
  <!-- 系统管理 - 分账号管理 - 设备绑定 -->
  <div class="electricBoxCount">
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
            >
              <el-option
                v-for="(item,index) in options"
                :label="'['+getString1(hexCharCodeToStr(item.nid))+']' + item.n_name"
                :value="item.nid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-button
            type="primary"
            @click="getOnedx"
            style="float:left;margin-left:10px;"
          >查询</el-button>

          <el-button
            @click="resetForm1('form')"
            style="float:left;margin-left:10px;"
            type="primary"
          >重 置</el-button>

          <el-button
            type="primary"
            @click="back"
          >返 回</el-button>
        </el-form>

      </el-header>
      <!-- 中部 -->
      <el-main>
        <!-- 列表 -->
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 99%;margin:0 auto"
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            align="center"
            min-width="50"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            type="index"
            label="序号"
            align="center"
            min-width="50"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="n_name"
            show-overflow-tooltip
            label="电箱名称"
            align="center"
            min-width="100"
          ></el-table-column>

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
            prop="name"
            show-overflow-tooltip
            label="回路名称"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="mid"
            show-overflow-tooltip
            label="回路编号"
            align="center"
            min-width="100"
          >
            <template slot-scope="scope">
              <span>{{ '回路' + scope.row.mid }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="n_local"
            show-overflow-tooltip
            label="安装地址"
            align="center"
            min-width="100"
          ></el-table-column>
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
          :total="fenYe.total?fenYe.total:1"
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
  name: "electricBoxCount",
  components: {
    copyright
  },
  data() {
    return {
      // 检索
      form: {
        region: ""
      },
      // 获取所有设备
      options: [],
      // 列表数据
      tableData: [],
      // 已选择电箱数据
      multipleSelection: [],
      // 已选电箱计数
      selectionBoxCount: [],
      zlist: [],
      he: [],

      // 已选择设备的ID
      selectIdList: [],
      // 要绑定的管理员id
      user: {},
      // 查看选择的设备
      drawer: false,
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      },

      selectData: []
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
          // uid: localStorage.getItem("uid")
        }
      };
      this.myAjax(type, url, data, res => {
        this.options = res.data.data;
      });
    },

    // 初始化获取 - 已选电箱计数
    getSelectionBoxCount(page) {
      let arr = this.user.list.split(",");

      arr.forEach(val1 => {
        this.tableData.forEach(val2 => {
          if (val1 == val2.id) {
            this.selectionBoxCount.push(val2);
          }
        });
      });
      // console.log(this.selectionBoxCount)
    },
    // 判断已选电箱计数 和 列表数据想对比 - 给出已选的样式打钩
    allContrast() {
      this.selectionBoxCount.forEach(row1 => {
        this.tableData.forEach(row2 => {
          if (row1.id == row2.id) {
            this.$refs.multipleTable.toggleRowSelection(row2);
            this.zlist.push(row2);
          }
        });
      });
    },

    // 获取所有设备 - 列表
    geteqList(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/device/getallHwUser";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          page: Number(page),
          size: 13,
          nid: this.form.region  // 若没有，则置空
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableData = res.data.data;
        this.fenYe.total = res.data.total;
        // let _this = this;
        // setTimeout(() => {
        //   _this.allContrast();
        //   _this.multipleSelection = [];
        // }, 1000);

        // this.getSelectionBoxCount();
      });
    },
    // 列表选择 - 并绑定 - √
    handleSelectionChange(val) {
      // this.selectData = val

      this.selectData = val[0];
      if (val.length > 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(val.pop());
      }

      this.$confirm('是否绑定此设备?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let username = localStorage.getItem("username");
        let uid = localStorage.getItem(username + 'uid');
        let type = "post";
        let url = this.urlb + "/api3/device/addChildUserToHwUser";
        let data = {
          data: {
            zuid: this.user.id,// 给要添加设备的子管理员id
            uid: uid,   //管理id
            // uid: localStorage.getItem('uid'),   //管理id
            group_id: localStorage.getItem('gid'), //企业id
            mid: this.selectData.mid,
            nid: this.selectData.nid,
          }
        };
        this.myAjax(type, url, data, res => {
          // console.log(res)
          if (res.data.code == 500) {
            this.$message({
              type: 'success',
              message: '绑定成功!'
            });
          } else if (res.data.code == 702) {
            this.$message({
              showClose: true,
              message: '没有该用户',
              type: 'warning'
            });
          } else if (res.data.code == 703) {
            this.$message({
              showClose: true,
              message: '用户已经绑定此设备',
              type: 'warning'
            });
          }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消绑定'
        });
      });
    },

    // 查询 - 下拉获取指定电箱
    getOnedx() {
      if (this.form.region) {
        this.geteqList(1)
      } else {
        this.$message.warning("请选择要查询的电箱设备号!");
      }
    },
    // 重置
    resetForm1(formName) {
      this.$refs[formName].resetFields();
      this.geteqList(1)
    },

    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.geteqList(val);
    },

    // 返回按钮
    back() {
      this.$router.go(-1);
    }
  },

  mounted() {
    this.user = JSON.parse(sessionStorage.getItem('user'))

  },
  created() {
    if (this.$route.params.id) {
      sessionStorage.setItem('user', JSON.stringify(this.$route.params))
    }
    this.geteqList(1);
    this.getOptions()
  }
};
</script>
  
 <style lang="less" scoped>
.electricBoxCount .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}
.electricBoxCount /deep/ .el-dialog__body {
  padding-right: 65px;
}
.electricBoxCount {
  overflow: hidden;
  height: 100%;
  .el-header {
    text-align: right;
    line-height: 60px;
    background: #fff;
    width: 99%;
    margin: 10px auto;
    .el-button {
      margin-top: 3px;
      padding: 9px 20px;
    }
    .el-form {
      text-align: left;
      margin-top: 10px;
      .el-form-item {
        float: left;
      }
      .el-radio-group {
        float: right;
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
    .showinfo {
      flex: 1;
      height: 100%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #dddee0;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff;
      }
      .detail {
        margin: 10px 0;
      }
    }
  }
  .el-footer {
    background: #fff;
    .el-pagination {
      background: #fff;
    }
  }
}
</style>
  