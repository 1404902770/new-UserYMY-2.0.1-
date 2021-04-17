<template>
  <div id="app">
    <!-- <keep-alive> -->
    <!-- <video
      src="../../public/static/images/homeBJ.mp4"
      autoplay="autoplay"
      loop="loop"
      muted="muted"
      height="100%"
      width="100%"
      style="opacity: .4;"
    ></video> -->
    <audio
      autoplay="autoplay"
      id="auto"
      src=""
    ></audio>

    <!-- <input
      type="button"
      value="点击播放"
      id='play'
      hidden
      @click="playSound('/static/mp3/baojing.mp3')"
    > -->
    <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

  <script>
import $ from "jquery"
export default {

  // 监听报警信息
  watch: {
    count(newCount, oldCount) {
      // console.log(newCount, oldCount)
      if (newCount.type == "jing") {
        if (newCount.data.desc == '过压报警' || newCount.data.desc == '电流报警' || newCount.data.desc == '温度报警' || newCount.data.desc == '漏电流报警' || newCount.data.desc == '分机报警') {
          this.playSound('/static/mp3/baojing.mp3')
          window.onclick = this.playSound('/static/mp3/baojing.mp3')
        } else {
          this.playSound('http://data.huiyi8.com/2017/gha/03/17/1702.mp3')
          window.onclick = this.playSound('http://data.huiyi8.com/2017/gha/03/17/1702.mp3')
        }

        this.$notify.warning({
          title:
            newCount.data.desc +
            "-" +
            new Date(newCount.data.time * 1000).Format("yy-MM-dd hh:mm:ss"),
          type: "warning",
          duration: 3600000,
          message:
            ("i",
              { style: "color: teal" },
              "[" +
              this.getString1(this.hexCharCodeToStr(newCount.data.nid)) +
              newCount.data.n_name +
              "]" +
              " - 线路" +
              parseInt(newCount.data.mid, 16) + '-' + newCount.data.name +
              " : " +
              newCount.data.beizhu)
        });

        let a = document.getElementsByClassName('el-notification')
        for (let i = 0; i < a.length; i++) {
          if (newCount.data.desc == '过压报警' || newCount.data.desc == '电流报警' || newCount.data.desc == '温度报警' || newCount.data.desc == '漏电流报警' || newCount.data.desc == '分机报警') {
            a[i].style.backgroundColor = '#CCFFFF'
          }
          a[i].style.padding = '5px 10px'
        }
      }
    }
  },

  methods: {
    // 播放提示音
    playSound(src) {
      // console.log(src)
      var auto = $("#auto");
      auto.attr("src", src);
    },
  },

  computed: {
    count() {
      // return this.$store.state.socketData;
    }
  },

  created() {
    let username = localStorage.getItem("username");
    let uid = localStorage.getItem(username + 'uid');
    if (uid || uid > 0) {
      this.socket();
    }
  },

  mounted() {
    // setInterval(() => {
    //   this.$store.commit('setsocketData', {
    //     type: 'jing',
    //     data: {
    //       type: 'jing',
    //       nid: '34474c3430354c4130365157', // 设备16进制
    //       mzname: '牛羊肉—邢玉芬副食', // 设备名称
    //       jianzhu: '牛羊肉片', // 线路名称
    //       aa: '08', // 线路
    //       desc: '电流预警', // 报警类型
    //       beizhu: '当前电流处于过流报警值上,当前电流为:81.176A,所设电流预警值为:50A', // 报警提示文字
    //       time: '1600766564' // 时间
    //     }
    //   })
    // }, 6000)
    this.playSound('')
  },
};
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
}
.el-dialog__header {
  line-height: 0;
}
.el-table {
  .el-button {
    padding: 0;
  }
}
video {
  position: fixed;
  top: 0;
  left: 0;
  object-fit: fill;
}

.el-notification__group /deep/ .el-notification__title {
  font-size: 14px;
}
.el-notification__group /deep/ .notification__content {
  font-size: 12px;
}
.el-notification__group /deep/.el-icon-close {
  top: 1px;
  right: 9px;
}

.el-main {
  .el-header {
    // background: #22366d;
    // margin: 10px 0;
    margin: 0 0 10px 0;
    // .el-form-item /deep/ .el-form-item__label {
    //   color: #ccc !important;
    // }
    // .el-input/deep/.el-input__inner {
    //   background: transparent;
    //   border: 1px solid #47d;
    // }
    .el-input--suffix .el-input__inner {
      // color: #ccc;
      // border: 1px solid #47d;
      background: #e4e4e4;
      border: none;
      // border-radius: 0;
    }

    .el-select .el-input .el-select__caret {
      color: #666;
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

    // .el-date-editor.el-input,
    // .el-date-editor.el-input__inner {
    //   // width: 150px;
    //   // border: 1px solid #47d;
    //   background: transparent;
    // }
    // .el-date-editor /deep/.el-range-input {
    //   color: #ccc;
    //   background: transparent;
    // }
  }
  // .el-dialog {
  //   background: #27428e !important;
  //   .el-dialog__title {
  //     color: #ccc;
  //   }
  //   .el-dialog__body {
  //     color: #ccc;
  //   }
  // }
}
// .el-input /deep/ .el-input__inner,
// .el-select /deep/ .el-input__inner,
// .el-textarea /deep/ .el-textarea__inner {
//   color: #ccc;
//   background: #e8e8e8;
//   border: 1px solid #47d;
// }
// .el-picker-panel /deep/ .el-picker-panel__footer {
//   background: #27428e;
// }

// .el-radio__label {
//   color: #ccc;
// }

// .el-picker-panel__content /deep/.el-month-table .cell,
// .el-picker-panel__content /deep/.el-year-table .cell {
//   color: #ccc;
// }

// .el-picker-panel,
// .el-select-dropdown__list {
//   background: #27428e !important;
//   .el-select-dropdown__item,
//   .el-picker-panel__icon-btn {
//     color: #ccc;
//   }
// }

// .el-picker-panel,
// .el-popper /deep/ .el-select-dropdown__list {
//   background: #27428e !important;
//   .el-select-dropdown__item,
//   .el-picker-panel__icon-btn {
//     color: #ccc;
//   }
// }

// 大屏选择框
.selecthome {
  background-color: #011058 !important;
  // background-color: rgba(0, 0, 0, 0.45) !important;
  .el-select-dropdown__item {
    color: white;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
// 大屏日期选择框
.datetimehome {
  // border-color: #17397b !important;
  // background-color: rgba(0, 0, 0, 0.6) !important;
  background-color: #011058 !important;
  .el-picker-panel__body {
    color: #ccc;
    .el-date-table th,
    .cell {
      color: #ccc;
    }
    .el-date-picker__header {
      button,
      span {
        color: #ccc;
      }
    }
    .el-date-table td.disabled div {
      background: #5b93ff;
    }
  }
  .el-picker-panel__sidebar {
    background: transparent !important;
    .el-picker-panel__shortcut {
      color: #ccc;
    }
  }
}

// .el-select-dropdown__item.hover,
// .el-select-dropdown__item:hover {
//   background-color: #47d !important;
// }

// .datetime {
//   background-color: #27428e !important;
// }

// .el-picker-panel__body {
//   color: #ccc;
//   .el-date-table th {
//     color: #ccc;
//   }
//   .el-date-picker__header {
//     button,
//     span {
//       color: #ccc;
//     }
//   }
//   .el-date-table td.disabled div {
//     background: #5b93ff;
//   }
// }
// .el-picker-panel__sidebar {
//   background: transparent !important;
//   .el-picker-panel__shortcut {
//     color: #ccc;
//   }
// }

.el-scrollbar {
  // color: #ccc;
}

.el-table td,
.el-table th {
  font-size: 12px !important;
}
// .el-table th {
//   background: transparent !important;
//   background-color: rgba(0, 0, 0, 0.3) !important;
//   color: #ccc;
// }
.el-table th {
  color: #333;
  background: #fafafa !important;
}
.el-input__inner {
  height: 34px !important;
  line-height: 34px !important;
}
.el-select-dropdown__item {
  text-align: left;
}
.el-footer {
  // 分页设置
  height: 34px !important;
  .el-pagination__total,
  .el-pagination__jump,
  .number {
    // color: #ccc;
  }
  .btn-prev,
  .number,
  .btn-next {
    // color: #ccc !important;
    // background: transparent !important;
  }
}
.el-footer /deep/ .el-pagination__editor.el-input .el-input__inner {
  // color: #ccc;
  height: 28px !important;
  // background: transparent;
}
</style>
