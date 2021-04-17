<template>
  <!-- 公共头部 -->
  <div class="publicShell">
    <el-container class="shell">
      <el-header>
        <el-row>
          <el-col
            :span="10"
            class="headLeft"
          >
            <div style="height:100%;width:199px;background:rgba(45,92,128,0.9);margin-rigth:10px;text-align: center;">
              <img
                style="width:70%;margin-top:13px"
                src="../../public/static/images/logo@2x.png"
                alt=""
              >
            </div>
            <div class="grid-content bg-purple-dark">
              <!-- <img
                @click="jumpHome"
                class="logo"
                src="../../public/static/images/logo.png"
                alt="xxxxx"
              /> -->
              <p class="logoText">云控智能用电管理系统</p>
              <!-- <i
                class="el-icon-s-operation stb"
                @click="stb"
              ></i> -->
              <p class="v">2.0.1</p>
            </div>
          </el-col>
          <el-col
            :span="14"
            class="headRight"
          >
            <!-- 预警 -->
            <!-- <div class="topfun">
              <img
                style="width: 23px;vertical-align: middle;"
                src="../../public/static/images/yujing@2x.png"
                alt=""
                title="报警信息"
              >
            </div> -->

            <!-- 查看使用文档 -->
            <div class="topfun">
              <a
                target="_blank"
                href="/shouce.pdf"
              >
                <img
                  style="width: 23px;vertical-align: middle;"
                  src="../../public/static/images/shouce@2x.png"
                  alt=""
                  title="文档"
                >
                <!-- 操作手册 -->
              </a>
              <!-- <span class="funspan">文档</span> -->
            </div>

            <div
              class="topfun"
              @click="jumpHome"
            >
              <img
                style="width: 26px;vertical-align: middle;"
                src="../../public/static/images/jiankong@2x.png"
                alt=""
                title="大屏"
              >
              <!-- 监控后台 -->
            </div>
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="点击返回首页"
              placement="bottom"
            >
              <img
                @click="jumpHome"
                class="sy"
                src="../../public/static/images/home4.jpg"
                alt="xxxxx"
              />
            </el-tooltip> -->
            <div
              class="grid-content bg-purple-dark"
              style="float:right"
            >
              <el-dropdown
                class="personal"
                @command="handleCommand"
              >
                <span class="el-dropdown-link">
                  <img
                    class="userImg"
                    src="../../public/static/images/userpic.png"
                    alt="xxx"
                  />
                  {{ userNanme }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    divided
                    command="signOut"
                  >退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="shell1">
        <el-aside :class="!isCollapse?'kgLeft1':'kgLeft2'">
          <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            text-color="#fff"
            active-text-color="#fff"
            style="border-right:0;"
            unique-opened
            router
            :collapse="isCollapse"
          >
            <template v-for="item in routers">
              <template v-if="item.twoTitle">
                <el-submenu
                  :index="item.oneTitle"
                  :key="item.oneTitle"
                  style="text-align: left;"
                >
                  <template slot="title">
                    <img
                      :src="item.imgSrc"
                      alt
                      style="width:20px;margin-right:10px;"
                    />
                    <span>{{ item.oneTitle }}</span>
                  </template>
                  <!-- <el-menu-item
                    v-for="(item,index) in item.twoTitle"
                    :key="index"
                    :index="item.path"
                  >{{ item.title }}</el-menu-item> -->
                  <template v-for="(item,index) in item.twoTitle">
                    <template v-if="item.twoTitle">
                      <el-submenu
                        :index="item.oneTitle"
                        :key="index"
                        style="text-align: left;"
                      >
                        <template slot="title">
                          <img
                            :src="item.imgSrc"
                            alt
                            style="margin-right:10px;"
                          />
                          <span>{{ item.oneTitle }}</span>
                        </template>
                        <el-menu-item
                          v-for="(item,index) in item.twoTitle"
                          :key="index"
                          :index="item.path"
                        >{{ item.title }}</el-menu-item>
                      </el-submenu>
                    </template>

                    <template v-else>
                      <el-menu-item
                        :key="index"
                        :index="item.path"
                      >{{ item.title }}</el-menu-item>
                    </template>
                  </template>
                </el-submenu>

              </template>

              <template v-else>
                <el-menu-item
                  :index="item.path"
                  :key="item.path"
                  style="text-align: left;"
                >
                  <img
                    :src="item.imgSrc"
                    alt
                    style="width:20px;margin-right:10px;"
                  />
                  <span slot="title">{{ item.oneTitle }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

  <script>
export default {
  name: "publicShell",
  data() {
    return {
      // 左侧导航 - 收起 / 关闭
      isCollapse: false,
      // 用户名称
      userNanme: "",
      // 用户头像
      userImg: "",
      // 路由串
      routers: [
        {
          oneTitle: "设备信息",
          imgSrc: require("../../public/static/images/dianbiao.png"),
          twoTitle: [
            {
              title: "电箱信息",
              path: "/electricBoxInfo"
            },
            {
              title: "回路信息",
              path: "/electricImplementInfo"
            }
          ]
        },

        {
          oneTitle: "远程控制",
          imgSrc: require("../../public/static/images/yuancheng.png"),
          twoTitle: [
            {
              title: "定时开关",
              path: "/timeSwitch"
            },
            {
              title: "手动开关",
              path: "/manualSwitch"
            },
            // {
            //   title: "漏保自检",
            //   path: "/notCoveredChecking"
            // },
            {
              title: "阈值设置",
              path: "/thresholdSet"
            },
            {
              oneTitle: "操作记录",
              twoTitle: [
                {
                  title: "分合闸",
                  path: "/pointsAndClosing"
                },
                {
                  title: "修改阈值",
                  path: "/updateThreshold"
                },
              ]
            }
          ]
        },

        {
          oneTitle: "用电监测",
          imgSrc: require("../../public/static/images/yongdianjiance@2x.png"),
          twoTitle: [
            {
              title: "电箱监测",
              path: "/dataMonitor"
            },
            {
              title: "回路监测",
              path: "/dataMonitorInfo"
            },
            {
              title: "数据采集",
              path: "/dataCollection"
            },
            {
              title: "数据报表",
              path: "/dataReport"
            },
            {
              title: "运行日报",
              path: "/runDaily"
            },
            {
              title: "极值日报",
              path: "/extremeDaily"
            }
            // {
            //   title: "漏电自检记录",
            //   path: "/electricLeakageRecord"
            // }
          ]
        },

        {
          oneTitle: "电能质量分析",
          imgSrc: require("../../public/static/images/fenxi.png"),
          twoTitle: [
            {
              title: "三相不平衡",
              path: "/unbalanced"
            }
          ]
        },

        {
          oneTitle: "能耗分析",
          imgSrc: require("../../public/static/images/nenghao.png"),
          twoTitle: [
            {
              title: "回路计数",
              path: "/selectedlist"
              // path: "/electricBoxCount"
            },
            {
              title: "总能耗",
              path: "/totaltrend"
            },
            {
              title: "电箱能耗",
              path: "/trend"
            },
            {
              title: "回路能耗",
              path: "/linetrend"
            },
            {
              title: "24小时能耗分析",
              path: "/24hourAnalyze"
            },
            // {
            //   title: "电箱同比分析",
            //   path: "/eleBoxSameThan"
            // },
            // {
            //   title: "线路同比分析",
            //   path: "/lineSameThan"
            // },
            // {
            //   title: "环比分析",
            //   path: "/sequential"
            // },

            // 老版本
            // {
            //   title: "线路能耗",
            //   path: "/wave"
            // },
            // {
            //   title: "能耗波动",
            //   path: "/LineEnergyConsumption"
            // },
            // {
            //   title: "无功功率",
            //   path: "/reactivePower"
            // }
          ]
        },

        {
          oneTitle: "综合报警",
          imgSrc: require("../../public/static/images/baojing.png"),
          twoTitle: [
            {
              title: "报警分类",
              path: "/alarmProcessingwy"
            },
            {
              title: "报警分析",
              path: "/eleBoxAlarmAnalysis"
            },
            {
              title: "回路报警分析",
              path: "/lineAlarmAnalysis"
            },
          ]
        },

        {
          oneTitle: "运维管理",
          imgSrc: require("../../public/static/images/yunwei.png"),
          twoTitle: [
            {
              title: "任务管理",
              path: "/task"
            },
            // {
            //   title: "巡检记录",
            //   path: "/inspection"
            // },
            // {
            //   title: "维修记录",
            //   path: "/maintenance"
            // },
          ]
        },

        {
          oneTitle: "能耗波动",
          imgSrc: require("../../public/static/images/bodong.png"),
          twoTitle: [
            // {
            //   title: "电量波动",
            //   path: "/electricBox"
            // },
            // {
            //   title: "线路波动",
            //   path: "/lineWave"
            // },
            {
              title: "电流波动",
              path: "/lineCurrent"
            },
            {
              title: "电压波动",
              path: "/lineVoltage"
            },
            {
              title: "有功功率波动",
              path: "/lineActive"
            },
            {
              title: "无功功率波动",
              path: "/lineReactive"
            },
            {
              title: "漏电流波动",
              path: "/lineLeakageCurrent"
            },
            {
              title: "温度波动",
              path: "/lineWendu"
            },
            {
              title: "总无功电量波动",
              path: "/lineTotalReactive"
            },
            {
              title: "象限无功总电量波动",
              path: "/lineQuadrantReactive"
            },
            {
              title: "反向有功总电量波动",
              path: "/lineReverseActive"
            },
            {
              title: "三相总功率波动",
              path: "/lineThreePhasePower"
            },
            {
              title: "三相总无功功率波动",
              path: "/lineThreephaseNoPower"
            }
          ]
        },

        {
          oneTitle: "用户报告",
          imgSrc: require("../../public/static/images/baogao.png"),
          twoTitle: [
            {
              title: "分析报表",
              path: "/usersReport"
            }
          ]
        },

        {
          oneTitle: "系统管理",
          imgSrc: require("../../public/static/images/xitong.png"),
          twoTitle: [
            {
              title: "子账号管理",
              path: "/roleManagement"
            },
          ]
        }
      ]
    };
  },
  methods: {
    openpdf() {
      // let url = require('../../public/static/客户管理用户手册.pdf')
      // window.open(url, "_blank")
      this.$router.push({ path: '/shouce' })
    },
    // 点击logo / 文字跳转到对应的首页
    jumpHome() {
      this.$router.push("/home");
    },
    // 收起 / 展开 - 左侧导航
    stb() {
      this.isCollapse = !this.isCollapse;
    },
    // 导航跳转
    jump(path) {
      this.$router.push({
        path: path
      });
    },
    // 个人操作-头部右上角
    handleCommand(command) {
      if (command == "signOut") {
        localStorage.clear();
        this.$router.push({
          path: "/"
        });
        // localStorage.setItem('getout', 'getout')
        // this.socket();
        this.closeSocket()
      }
    }
  },
  mounted() { },
  created() {
    this.userNanme = localStorage.getItem("username");
    this.userImg = localStorage.getItem("himg");
  }
};
</script>
  
 <style lang="less" scoped>
.publicShell {
  height: 100%;
  .shell {
    .shell1 {
      height: 60%;
      ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 8px;
      }
      ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #dddee0;
        // background: #5b93ff;
      }
      ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff;
        // background: #27428e;
      }
    }
    .kgLeft1 {
      width: 200px !important;
      animation: 1s;
    }
    .kgLeft2 {
      width: 65px !important;
      animation: 1s;
    }
    height: 100%;
    .el-header {
      padding-left: 0;
      // background: teal
      // background: #87d5d566

      // background: #162557;
    }
    .el-header,
    .el-footer {
      text-align: center;
      line-height: 60px;
      height: 60px;
      border-bottom: 1px solid #2d5c80;
      .headLeft {
        height: 60px;
        text-align: left;
        display: flex;
        .logo {
          display: block;
          width: 40px;
          height: 40px;
          margin-top: 10px;
          cursor: pointer;
          float: left;
        }
        .logoText {
          float: left;
          font-size: 16px;
          font-weight: 600;
          margin: 0 20px;
          // color: #fff;
        }
        .stb {
          font-size: 20px;
          color: #008080;
          cursor: pointer;
          display: inline-block;
          line-height: 62px;
          float: left;
        }
        .v {
          float: left;
          line-height: 66px;
          font-size: 12px;
          // color: #ccc;
          // color: black;
          margin-left: 20px;
        }
      }
      .headRight {
        text-align: right;
        .topfun {
          display: inline-block;
          text-align: left;
          line-height: 45px;
          margin-right: 20px;
          color: #333;
          a {
            color: #333;
          }
          cursor: pointer;
          .funspan {
            display: block;
            line-height: 0;
            // color: #fff;
          }
        }
        // .topfun:hover {
        //   color: teal;
        // }
        .sy {
          width: 35px;
          border-radius: 50%;
          vertical-align: middle;
          cursor: pointer;
          margin-right: 20px;
        }
        .personal {
          cursor: pointer;
        }
        .userImg {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          border-radius: 50%;
        }
      }
    }

    .el-aside::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
    }
    .el-aside::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      // background: #dddee0;
      background: #2d5c80;
      // background: #5b93ff;
    }
    .el-aside::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      // background: #fff;
      background: #0a3353;
      // background: #27428e;
    }

    // 左侧菜单
    .el-aside {
      text-align: center;
      height: 100%;
      border-right: 1px solid #e6e6e6;
      overflow-x: hidden;
      // background: #22366d;
      // background-image: linear-gradient(to right, #32a581, #16958f);
      background-image: linear-gradient(to top, #0a3353, #2d5c80);

      .el-menu,
      .el-menu /deep/ .el-menu--inline {
        background: transparent;
      }
      .el-menu /deep/ .el-submenu__title {
        // background-image: linear-gradient(
        //   to right,
        //   #32a581,
        //   #16958f
        // ) !important;
        // background: #03375f;
        background: transparent;
      }
      .el-menu /deep/ .el-submenu__title i {
        color: #fff;
      }

      .el-submenu .el-menu-item {
        padding-left: 50px !important;
        text-align: left;
        color: rgba(255, 255, 255, 0.6) !important;
        // background-image: linear-gradient(to right, #32a581, #16958f);
        // background: #03375f;
        background: transparent;
      }
    }
    //父级的类名
    .el-aside /deep/ .el-submenu__title:hover,
      //子级的类名
    .el-aside /deep/ .el-menu-item:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      // opacity: 0.6;
    }
    .el-menu .el-menu--inline .is-active {
      // font-size: 16px;
      color: #fff !important;
      font-weight: bold;
    }

    .el-main {
      color: #333;
      text-align: center;
      padding: 0;
      background: #ebebeb;
    }

    // // table背景颜色
    // .el-main /deep/ .el-table,
    // .el-table__expanded-cell {
    //   background-color: transparent;
    //   background-color: rgba(0, 0, 0, 0.06) !important;
    // }

    // .el-main /deep/ .el-table tr {
    //   background-color: transparent !important;
    //   background-color: rgba(0, 0, 0, 0.06) !important;
    // }
    // .el-main /deep/ .el-table--enable-row-transition .el-table__body td,
    // .el-table .cell {
    //   background-color: transparent;
    //   background-color: rgba(0, 0, 0, 0.06) !important;
    // }

    // // table边框颜色
    // .el-main /deep/.el-table--border:after,
    // .el-table--group:after,
    // .el-main /deep/.el-table:before {
    //   background-color: #5b93ff;
    // }

    // .el-main /deep/.el-table--border,
    // .el-table--group {
    //   border-color: #5b93ff;
    // }

    // .el-main /deep/.el-table td,
    // .el-table th.is-leaf {
    //   border-bottom: 1px solid #5b93ff !important;
    // }

    // .el-main /deep/.el-table--border th,
    // .el-table--border th.gutter:last-of-type {
    //   border-bottom: 1px solid #5b93ff;
    //   // border-bottom: 1px solid #5b93ff !important;
    // }

    // .el-main /deep/.el-table--border td,
    // .el-main /deep/.el-table--border th {
    //   border-right: 1px solid #5b93ff;
    // }

    // .el-main /deep/ .el-table__row {
    //   color: #ccc;
    //   // background-color: rgba(0, 0, 0, 0.06) !important;
    // }

    // // 悬停颜色
    // .el-main /deep/ .el-table tbody tr:hover > td {
    //   background-color: transparent;
    // }
  }
}
.lookpdf {
  font-size: 26px;
  margin-right: 1rem;
  vertical-align: middle;
}
.lookpdf:hover {
  color: teal;
}
</style>
  