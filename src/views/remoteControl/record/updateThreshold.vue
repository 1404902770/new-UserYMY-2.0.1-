  <template>
  <!-- 远程控制 - 手动开关 - 操作记录 - 阈值修改 -->
  <div class="electricBoxInfo">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item
            label="电箱名称"
            prop="region"
            class="dianxiang"
          >
            <el-select
              v-model="form.region"
              filterable
              placeholder="电箱名称"
              @change="getLines"
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
            prop="line"
          >
            <el-select
              v-model="form.line"
              filterable
              placeholder="请选择回路"
            >
              <el-option
                v-for="(item,index) in options2"
                :label="item.name"
                :value="item.mid"
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
          <el-table
            :data="tableData"
            border
            stripe
            max-height="735"
            style="width: 99%;margin:0 auto"
          >
            <!-- <el-table-column
              prop="nid"
              show-overflow-tooltip
              label="电箱号"
              align="center"
              min-width="60"
            ></el-table-column> -->

            <el-table-column
              label="电箱号"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ hexCharCodeToStr(scope.row.nid) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="n_name"
              show-overflow-tooltip
              label="电箱名称"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="n_local"
              show-overflow-tooltip
              label="安装位置"
              align="center"
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="time"
              show-overflow-tooltip
              label="操作时间"
              align="center"
              min-width="100"
            ></el-table-column>

            <!-- <el-table-column
              prop="mzid"
              show-overflow-tooltip
              label="电箱号"
              align="center"
              min-width="100"
            ></el-table-column> -->

            <el-table-column
              label="操作事项"
              align="center"
              min-width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.ml }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="real_name"
              show-overflow-tooltip
              label="操作人"
              align="center"
              min-width="60"
            ></el-table-column>

          </el-table>
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
import copyright from "../../../components/copyright";
export default {
  name: "electricBoxInfo",
  components: {
    copyright
  },
  data() {
    return {
      // 检索
      form: {
        region: "",
        line: ""
      },
      // 获取所有设备
      options: [],
      options2: [],
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
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/device/getUserToHwLog";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          size: 13,
          page: Number(this.fenYe.currentPage),
          type: 12,// 类型，看设备消息里面的说明
          nid: this.form.region, //可选
          mid: this.form.line  //可选
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableData = res.data.data;
        this.fenYe.total = res.data.total;

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
      });
    },
    // 根据设备号获取线路
    getLines(val) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      this.form.line = "";
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
        this.options2 = res.data.data;
      });
    },

    // 定位电箱号
    getOnedx() {
      this.getList(1)
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
    .el-form {
      text-align: left;
      margin-top: 10px;
      .el-form-item {
        float: left;
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
      .dianxiang {
        width: 360px;
        .el-select {
          width: 100%;
        }
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
    .el-icon-edit {
      cursor: pointer;
    }
    .el-icon-edit:hover {
      color: teal;
    }
  }
  .el-footer {
    width: 99%;
    margin: 0 auto;
    background: #fff;
  }
}
</style>
  