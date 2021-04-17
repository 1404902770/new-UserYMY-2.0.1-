<template>
  <!-- 远程控制 - 手动开关 - 分路详情 -->
  <div class="manualSwitchInfo">
    <el-container style="height: 100%;">
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/manualSwitch' }">手动开关</el-breadcrumb-item>
          <el-breadcrumb-item>操作分路</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 点击播放提示音 -->
        <!-- <audio  autoplay="autoplay" id="auto" src=""></audio> -->
        <!-- <input type="button" value="点击播放" @click="playSound('http://data.huiyi8.com/2017/gha/03/17/1702.mp3')"> -->
        <el-button
          class="fh"
          type="primary"
          @click="$router.go(-1)"
        >返回</el-button>
      </el-header>
      <el-main>
        <!-- 列表 -->
        <el-table
          :data="tableData"
          stripe
          max-height="735"
          style="width: 99%;margin:0 auto"
        >
          <!-- <el-table-column
            prop="nid"
            show-overflow-tooltip
            label="线路号"
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
            label="运行状态"
            align="center"
            min-width="60"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.statu == 1"
                style="color:#1478c5;"
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
              <span style="color:#F56C6C;font-weight:bold">分闸</span>
              <el-switch
                @change="automaticManual1(scope.row,scope.$index)"
                v-model="scope.row.g"
              ></el-switch>
              <span style="color:#158c86;font-weight:bold">合闸</span>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <!-- 底部版权 -->
      <copyright></copyright>
    </el-container>
  </div>
</template>
  
<script>
import Qs from "qs";
import ElementUI from "element-ui";
import copyright from "../../components/copyright";
import $ from 'jquery'
export default {
  name: "manualSwitchInfo",
  components: {
    copyright
  },
  data() {
    return {
      nid: "", // 设备id
      mid: "", // 线路
      iId: "0", // 分合闸时用
      // 列表数据
      tableData: [],
      Interval: "",

      // 分合闸 30秒判定
      timer: "",
      num: 1,

      // 判断操作的数组中那个
      state: ''
    };
  },
  methods: {
    // 播放提示音
    playSound(src) {
      // console.log(src)
      var auto = $("#auto");
      auto.attr("src", src);
    },

    // 初始化获取所有分路
    getAllShunt() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urla + "/api3/mach/getHwlist";
      let data = {
        data: {
          nid: this.nid,
          uid: uid,
          // uid: localStorage.getItem('uid'),
          gid: localStorage.getItem('gid'),
          ctype: 0
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        // this.tableData = res.data.data;
        // for (let i = 0; i < this.tableData.length; i++) {
        //   if (this.tableData[i].nn == "00") {
        //     this.tableData[i].g = false;
        //   } else {
        //     this.tableData[i].g = true;
        //   }
        // }

        this.tableData = []
        if (res.data.msg == "设备不在线") {
          this.tableData = res.data.data
        } else {
          res.data.data.forEach(val => {
            this.tableData.push(JSON.parse(val))
          })
        }
        this.tableData.forEach(val => {
          if (val.nn == "00") {
            val.g = false;
          } else {
            val.g = true;
          }
        })
      });
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
            nid: this.nid,   //设备号
            mid: this.mid, //线路号
            type: 'web', //类型
            lon: 0,//经度
            lat: 0,//纬度
            device: this.tableData[t].g == false ? "01" + this.mid + "00" : "01" + this.mid + "01",//操作命令，见下表说明
          }
          // uid: localStorage.getItem("uid"),
          // nid: this.nid,
          // mid: this.mid,
          // mlo: this.tableData[t].g == false ? "00" + this.mid + "00" : "00" + this.mid + "01"
        }
      }).then(res => {
        // console.log(res)
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
    }
  },
  watch: {
    count(newCount, oldCount) {
      if (newCount.type != "jing") {

        if (newCount.type == "nfs") {
          clearInterval(this.Interval);
          clearInterval(this.timer);
          // console.log(newCount.data);
          // console.log(newCount.hex.substr(newCount.hex.length - 4, 2));
          if (newCount.hex.substr(newCount.hex.length - 4, 2) == "00") {

            this.$message.success("分闸成功");
            ElementUI.Loading.service({}).close()

            this.tableData[this.state].g = false

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

            this.tableData[this.state].g = true

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
          this.$message.warning("操作失败");
          ElementUI.Loading.service({}).close()
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
    // 定时播放提示音
    // setInterval(()=>{
    //   this.playSound('http://data.huiyi8.com/2017/gha/03/17/1702.mp3')
    // },2000)

  },
  created() {
    this.nid = this.$route.query.nid;
    this.getAllShunt();
  }
};
</script>
  
 <style lang="less" scoped>
.manualSwitchInfo {
  overflow: hidden;
  height: 100%;
  .el-header {
    background: #fff;
    width: 99%;
    margin: 10px auto;
    .el-breadcrumb {
      line-height: 60px;
      float: left;
    }
    .el-button {
      // border-radius: 0;
      border: none;
      background: #1478c5;
      // background-image: linear-gradient(to right, #32a581, #158c86);
    }
    // .el-breadcrumb/deep/.el-breadcrumb__inner {
    //   color: #ccc;
    // }
    .fh {
      padding: 9px 20px;
      margin: 12px 0;
      float: right;
    }
  }
  .el-main {
    color: #333;
    text-align: center;
    padding: 0;
    height: 100%;
    .el-switch,
    .is-checked {
      margin: -1px 4px 0 4px;
    }
  }
}
</style>
  