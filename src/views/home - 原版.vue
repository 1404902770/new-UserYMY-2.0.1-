<template>
  <!-- 首页 -->
  <div class="home">
    <el-row class="top">
      <el-col :span="8">
        <ul class="ulLeft">
          <!-- content="进入线路能耗3D" -->
          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="线路能耗"
            placement="bottom"
            v-for="(item,index) in homeRouter"
            :key="index"
          >
            <li @click="jempPaths(item)">
              <img
                :src="item.imgSrc"
                alt
              />
              {{ item.oneTitle}}
            </li>
          </el-tooltip> -->
          {{nowTime}}
        </ul>
      </el-col>
      <el-col
        :span="8"
        style="display:flex;margin:-10px auto;position: relative;"
      >
        <!-- <dv-decoration-8 style="width: 240px;height: 50px;position: absolute;left: 76px;bottom: -14px;" /> -->
        <h2 style="margin: 0 auto;color:#01C4F7;line-height: 80px;">裕茂优大数据监控平台</h2>
        <!-- <dv-decoration-8
          :reverse="true"
          style="width: 240px;height: 50px;position: absolute;right: 76px;bottom: -14px;"
        /> -->
      </el-col>
      <el-col :span="8">
        <ul class="ulRight clearfix">
          <li
            class="t1"
            @click="path1"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="点击退出到登录"
              placement="bottom"
            >
              <img
                style="width: 19px;height:20px;vertical-align: middle;"
                src="../../public/static/images/tuichu.png"
                alt
              />
            </el-tooltip>
            <span class="hometext">退出</span>
          </li>
          <li
            class="t1"
            @click="path2"
          >
            <img
              style="width: 19px;height:20px;vertical-align: middle;margin-bottom: 4px;"
              src="../../public/static/images/zhuye.png"
              alt=""
            >
            <span class="hometext">主页</span>
            <!-- <el-tooltip
              class="item"
              effect="dark"
              content="点击进入操作页面"
              placement="bottom"
            >
              <img
                src="../../public/static/images/home4.jpg"
                alt
              />
            </el-tooltip> -->
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="contentline">
      <el-col
        :span="16"
        class="z1"
      >
        <div class="z1_1 clearfix">
          <!-- <div
            @click="gotoinfo"
            id="charts2"
          ></div> -->
          <div class="z1_1wrap ">
            <div class="headtitle">
              报警信息
            </div>
            <div class="headtext">
              <!-- <span style="float:left">
                <img
                  src="../../public/static/images/alarmicon.png"
                  alt=""
                >
                报警信息</span> -->

              <span
                class="text"
                @click="tabalarm(1)"
                :style="tabalarmnum==1?'color:#02D9FD':'#517FB5'"
              >
                今日
                <!-- <img
                  src="../../public/static/images/rialarm.png"
                  alt=""
                > -->
              </span>
              <!-- <span style="padding: 8px 1px;background: #ccc;"></span> -->
              <span
                class="text"
                @click="tabalarm(2)"
                :style="tabalarmnum==2?'color:#02D9FD;':'#517FB5'"
              >
                本月
                <!-- <img
                  src="../../public/static/images/yuealarm.png"
                  alt=""
                > -->
              </span>
              <!-- <span style="padding: 8px 1px;background: #ccc;"></span> -->
              <span
                class="text"
                @click="tabalarm(3)"
                :style="tabalarmnum==3?'color:#02D9FD':'#517FB5'"
              >
                本年
                <!-- <img
                  src="../../public/static/images/nianalarm.png"
                  alt=""
                > -->
              </span>
            </div>
            <!-- 今日报警 -->
            <div
              class="alarmbox"
              v-show="tabalarmnum==1?true:false"
            >
              <div class="leftcontent">
                <div class="alarmbox1">
                  <div>
                    <img
                      style="margin-right: 15px;"
                      src="../../public/static/images/baojing2.png"
                      alt=""
                    >
                  </div>

                  <div>
                    <span class="alarm">今日报警</span>
                    <p style="font-size:22px;color:white;line-height: 56px;">{{todayMonthYear.ben?todayMonthYear.ben:0}}条</p>
                  </div>
                </div>
                <div class="alarmbox2">
                  <div>
                    <img
                      style="margin-right: 15px;"
                      src="../../public/static/images/baojing2.png"
                      alt=""
                    >
                  </div>
                  <div>
                    <span class="alarm">昨日报警</span>
                    <p style="font-size:22px;color:white;line-height: 56px;">{{todayMonthYear.wang?todayMonthYear.wang:0}}条</p>
                  </div>

                </div>
              </div>

              <div>
                <div class="alarmbox3">
                  <el-progress
                    type="circle"
                    :stroke-width='13'
                    color='#01D9FE'
                    :percentage="huanbi1"
                    class="progress-two circle2"
                  ></el-progress>
                  <svg
                    width="0"
                    height="0"
                  >
                    <defs>
                      <linearGradient
                        id="write"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style="stop-color:#01D9FE"
                          stop-opacity="0.8"
                        ></stop>
                        <stop
                          offset="100%"
                          style="stop-color:#0477D5"
                          stop-opacity="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>

                  <!-- <span>{{todayMonthYear.ben && todayMonthYear.wang !=0?((todayMonthYear.ben-todayMonthYear.wang)/todayMonthYear.wang*100).toFixed(2)+'%':'0%'}}</span> -->
                </div>
                <span style="display: inline-block;color:white">环 比</span>
              </div>
            </div>
            <!-- 本月报警 -->
            <div
              class="alarmbox"
              v-show="tabalarmnum==2?true:false"
            >
              <div class="leftcontent">
                <div class="alarmbox1">
                  <div>
                    <img
                      style="margin-right: 15px;"
                      src="../../public/static/images/baojing2.png"
                      alt=""
                    >
                  </div>

                  <div>
                    <span class="alarm">本月报警：</span>
                    <p style="font-size:22px;color:white;line-height: 56px;">{{todayMonthYear.ben?todayMonthYear.ben:0}}</p>
                  </div>

                </div>
                <div class="alarmbox2">
                  <div>
                    <img
                      style="margin-right: 15px;"
                      src="../../public/static/images/baojing2.png"
                      alt=""
                    >
                  </div>

                  <div>
                    <span class="alarm">上月报警：</span>
                    <p style="font-size:22px;color:white;line-height: 56px;">{{todayMonthYear.wang?todayMonthYear.wang:0}}</p>
                  </div>
                </div>
              </div>

              <div>
                <div class="alarmbox3">
                  <el-progress
                    type="circle"
                    :stroke-width='13'
                    color='#01D9FE'
                    :percentage="huanbi1"
                    class="progress-two circle2"
                  ></el-progress>
                  <svg
                    width="0"
                    height="0"
                  >
                    <defs>
                      <linearGradient
                        id="write"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style="stop-color:#01D9FE"
                          stop-opacity="0.8"
                        ></stop>
                        <stop
                          offset="100%"
                          style="stop-color:#0477D5"
                          stop-opacity="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <!-- <span>{{todayMonthYear.ben && todayMonthYear.wang !=0?((todayMonthYear.ben-todayMonthYear.wang)/todayMonthYear.wang*100).toFixed(2)+'%':'0%'}}</span> -->
                </div>
                <span style="display: inline-block;color:white">环 比</span>
              </div>
            </div>
            <!-- 今年报警 -->
            <div
              class="alarmbox"
              v-show="tabalarmnum==3?true:false"
            >
              <div class="leftcontent">
                <div class="alarmbox1">
                  <div>
                    <img
                      style="margin-right: 15px;"
                      src="../../public/static/images/baojing2.png"
                      alt=""
                    >
                  </div>

                  <div>
                    <span class="alarm">今年报警：</span>
                    <p style="font-size:22px;color:white;line-height: 56px;">{{todayMonthYear.ben?todayMonthYear.ben:0}}</p>
                  </div>
                </div>
                <div class="alarmbox2">
                  <div>
                    <img
                      style="margin-right: 15px;"
                      src="../../public/static/images/baojing2.png"
                      alt=""
                    >
                  </div>

                  <div>
                    <span class="alarm">去年报警：</span>
                    <p style="font-size:22px;color:white;line-height: 56px;">{{todayMonthYear.wang?todayMonthYear.wang:0}}</p>
                  </div>
                </div>
              </div>

              <div>
                <div class="alarmbox3">
                  <el-progress
                    type="circle"
                    :stroke-width='13'
                    color='#01D9FE'
                    :percentage="huanbi1"
                    class="progress-two circle2"
                  ></el-progress>
                  <svg
                    width="0"
                    height="0"
                  >
                    <defs>
                      <linearGradient
                        id="write"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style="stop-color:#01D9FE"
                          stop-opacity="0.8"
                        ></stop>
                        <stop
                          offset="100%"
                          style="stop-color:#0477D5"
                          stop-opacity="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <!-- <span>{{todayMonthYear.ben && todayMonthYear.wang !=0?((todayMonthYear.ben-todayMonthYear.wang)/todayMonthYear.wang*100).toFixed(2)+'%':'0%'}}</span> -->
                </div>
                <span style="display: inline-block;color:white">环 比</span>
              </div>

            </div>
          </div>
        </div>
        <div
          :reverse="true"
          class="z1_2 clearfix"
        >
          <div class="headtitle">
            报警类型
          </div>
          <div class="headtext">
            <!-- <span
              class="text"
              @click="ranking(1)"
              :style="rank==1?'background:rgba(11, 230, 247, 0.3);':''"
            >
              <img
                src="../../public/static/images/yuealarm.png"
                alt=""
              >
            </span>
            <span style="padding: 8px 1px;background: #ccc;"></span>
            <span
              class="text"
              @click="ranking(2)"
              :style="rank==2?'background:rgba(11, 230, 247, 0.3)':''"
            >
              <img
                src="../../public/static/images/nianalarm.png"
                alt=""
              >
            </span> -->
          </div>

          <el-form
            ref="formmonth"
            :model="formmonth"
            class="demo-ruleForm"
            label-width="20px"
            v-show="rank==1?true:false"
          >
            <el-form-item
              label=""
              prop="p1"
            >
              <el-date-picker
                style="width:120px"
                v-model="formmonth.dateof"
                type="month"
                align="right"
                unlink-panels
                value-format='yyyyMM'
                popper-class="datetimehome"
                @change="getmonth"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item
              label=""
              prop="region"
              class="dianxiang"
            >
              <el-select
                v-model="formmonth.region"
                filterable
                popper-class='selecthome'
                placeholder="全部"
                @change="getmonth"
              >
                <el-option
                  v-for="(item,index) in options1"
                  :label="'['+getString1(hexCharCodeToStr(item.nid))+'] ' + item.n_name + ' [' + item.n_local +']'"
                  :value="item.nid"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>

            <div class="selectalarmdata">
              <span
                @click="ranking(1)"
                :style="rank==1?'color:#02D9FD':''"
              >本月</span>
              <span
                @click="ranking(2)"
                :style="rank==2?'color:#02D9FD':''"
              >本年</span>
            </div>

          </el-form>
          <div
            v-show="rank==1?true:false"
            @click="gotoinfo"
            id="charts3"
          ></div>

          <el-form
            ref="formyear"
            :model="formyear"
            class="demo-ruleForm"
            label-width="20px"
            v-show="rank==2?true:false"
          >
            <el-form-item
              label=""
              prop="p1"
            >
              <el-date-picker
                style="width:120px"
                v-model="formyear.dateof"
                type="year"
                align="right"
                unlink-panels
                value-format='yyyy'
                popper-class="datetimehome"
                @change="getyear"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item
              label=""
              prop="region"
              class="dianxiang"
            >
              <el-select
                v-model="formyear.region"
                filterable
                popper-class='selecthome'
                placeholder="全部"
                @change="getyear"
              >
                <el-option
                  v-for="(item,index) in options1"
                  :label="'['+getString1(hexCharCodeToStr(item.nid))+'] ' + item.n_name + ' [' + item.n_local +']'"
                  :value="item.nid"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>

            <div class="selectalarmdata">
              <span
                @click="ranking(1)"
                :style="rank==1?'color:#02D9FD':''"
              >本月</span>
              <span
                @click="ranking(2)"
                :style="rank==2?'color:#02D9FD':''"
              >本年</span>
            </div>
          </el-form>
          <div
            v-show="rank==2?true:false"
            @click="gotoinfo"
            id="charts4"
          ></div>
        </div>
      </el-col>

      <el-col
        :span="8"
        class="z2"
      >
        <div class="z4wrap">
          <div
            class="z4"
            :reverse="true"
          >
            <div class="headtitle">
              报警信息提示
            </div>
            <div
              v-if="bjInfoData.length>0"
              class="z4content"
            >
              <!-- <h3>报警信息提示</h3> -->
              <template>
                <div
                  class="bjtext"
                  v-for="(item,index) in bjInfoData"
                  :key="index"
                >
                  <div :style="index%2==0?'background:#001F69':''">

                    <!-- <i class="el-icon-bell tb"></i> -->
                    <span
                      class="s1"
                      v-if="item.nid.length == 12"
                    >{{ '['+ getString1(item.nid) + item.n_name +']' }} - [{{ '线路' + item.mid }} - {{ item.name }}] - [{{ item.desc }}] - [{{ item.time }}]</span>
                    <span
                      class="s1"
                      v-else
                    >{{ '['+ getString1(hexCharCodeToStr(item.nid))+item.n_name +']' }} - [{{ '线路' + item.mid }} - {{ item.name }}] - [{{ item.desc }}] - [{{ new Date(item.time*1000).Format('yy-MM-dd hh:mm:ss') }}]</span>
                    <p class="s2">{{ item.beizhu }}</p>

                  </div>
                </div>
              </template>
            </div>

            <template v-if="bjInfoData.length<=0">
              <div class="textnull">
                <p>暂无报警</p>
              </div>
            </template>
          </div>
        </div>
        <!-- <dv-border-box-8>
          <div id="charts1"></div>
        </dv-border-box-8> -->
      </el-col>
    </el-row>

    <!-- style="margin-top:0;" -->
    <el-row class="contentline">
      <el-col
        :span="6"
        style="float:left"
      >
        <div class="z4wrap">
          <div class="z4">
            <div class="headtitle">
              用电概况
            </div>

            <div class="headtext">
              <!-- <span style="float:left">
                <img
                  src="../../public/static/images/alarmicon.png"
                  alt=""
                >
                报警信息</span> -->

              <span
                class="text"
                @click="tabcontent(1)"
                :style="tab==1?'color:#02D9FD':'#517FB5'"
              >
                今日
                <!-- <img
                  src="../../public/static/images/rialarm.png"
                  alt=""
                > -->
              </span>
              <!-- <span style="padding: 8px 1px;background: #ccc;"></span> -->
              <span
                class="text"
                @click="tabcontent(2)"
                :style="tab==2?'color:#02D9FD;':'#517FB5'"
              >
                本月
                <!-- <img
                  src="../../public/static/images/yuealarm.png"
                  alt=""
                > -->
              </span>
              <!-- <span style="padding: 8px 1px;background: #ccc;"></span> -->
              <span
                class="text"
                @click="tabcontent(3)"
                :style="tab==3?'color:#02D9FD':'#517FB5'"
              >
                本年
                <!-- <img
                  src="../../public/static/images/nianalarm.png"
                  alt=""
                > -->
              </span>
            </div>

            <!-- 当日用电 -->
            <div
              style="height:83%;box-sizing: border-box;"
              v-show="tab==1?true:false"
            >
              <div class="alarmbox">
                <div class="leftcontent">
                  <div class="alarmbox1">
                    <div>
                      <img
                        style="margin-right: 15px;"
                        src="../../public/static/images/yongdian(1).png"
                        alt=""
                      >
                    </div>

                    <div>
                      <span class="alarm">当日用电</span>
                      <p style="font-size:22px;color:white;line-height: 56px;">{{eledata.now?eledata.now:"0"}} kW·h</p>
                    </div>
                  </div>
                  <div class="alarmbox2">
                    <div>
                      <img
                        style="margin-right: 15px;"
                        src="../../public/static/images/yongdian(1).png"
                        alt=""
                      >
                    </div>
                    <div>
                      <span class="alarm">昨日用电</span>
                      <p style="font-size:22px;color:white;line-height: 56px;">{{eledata.before?eledata.before:"0"}} kW·h</p>
                    </div>

                  </div>
                </div>

                <div>
                  <div class="alarmbox3">
                    <el-progress
                      type="circle"
                      :stroke-width='13'
                      color='#01D9FE'
                      :percentage="eledata.before?eledata.ringThan.slice(0,eledata.ringThan.length-1):0"
                      class="progress-two circle2"
                    ></el-progress>
                    <svg
                      width="0"
                      height="0"
                    >
                      <defs>
                        <linearGradient
                          id="write"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            style="stop-color:#01D9FE"
                            stop-opacity="0.8"
                          ></stop>
                          <stop
                            offset="100%"
                            style="stop-color:#0477D5"
                            stop-opacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span style="display: inline-block;color:white">环 比</span>
                </div>
              </div>
            </div>
            <!-- 当月用电 -->
            <div
              style="height:83%;box-sizing: border-box;"
              v-show="tab==2?true:false"
            >
              <div class="alarmbox">
                <div class="leftcontent">
                  <div class="alarmbox1">
                    <div>
                      <img
                        style="margin-right: 15px;"
                        src="../../public/static/images/yongdian(1).png"
                        alt=""
                      >
                    </div>

                    <div>
                      <span class="alarm">本月用电</span>
                      <p style="font-size:22px;color:white;line-height: 56px;">{{eledata.now?eledata.now:"0"}} kW·h</p>
                    </div>
                  </div>
                  <div class="alarmbox2">
                    <div>
                      <img
                        style="margin-right: 15px;"
                        src="../../public/static/images/yongdian(1).png"
                        alt=""
                      >
                    </div>
                    <div>
                      <span class="alarm">上月用电</span>
                      <p style="font-size:22px;color:white;line-height: 56px;">{{eledata.before?eledata.before:"0"}} kW·h</p>
                    </div>

                  </div>
                </div>

                <div>
                  <div class="alarmbox3">
                    <el-progress
                      type="circle"
                      :stroke-width='13'
                      color='#01D9FE'
                      :percentage="eledata.before?eledata.ringThan.slice(0,eledata.ringThan.length-1):0"
                      class="progress-two circle2"
                    ></el-progress>
                    <svg
                      width="0"
                      height="0"
                    >
                      <defs>
                        <linearGradient
                          id="write"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            style="stop-color:#01D9FE"
                            stop-opacity="0.8"
                          ></stop>
                          <stop
                            offset="100%"
                            style="stop-color:#0477D5"
                            stop-opacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span style="display: inline-block;color:white">环 比</span>
                </div>
              </div>
            </div>
            <!-- 今年用电 -->
            <div
              style="height:83%;box-sizing: border-box;"
              v-show="tab==3?true:false"
            >
              <div class="alarmbox">
                <div class="leftcontent">
                  <div class="alarmbox1">
                    <div>
                      <img
                        style="margin-right: 15px;"
                        src="../../public/static/images/yongdian(1).png"
                        alt=""
                      >
                    </div>

                    <div>
                      <span class="alarm">今年用电</span>
                      <p style="font-size:22px;color:white;line-height: 56px;">{{eledata.now?eledata.now:"0"}} kW·h</p>
                    </div>
                  </div>
                  <div class="alarmbox2">
                    <div>
                      <img
                        style="margin-right: 15px;"
                        src="../../public/static/images/yongdian(1).png"
                        alt=""
                      >
                    </div>
                    <div>
                      <span class="alarm">去年用电</span>
                      <p style="font-size:22px;color:white;line-height: 56px;">{{eledata.before?eledata.before:"0"}} kW·h</p>
                    </div>

                  </div>
                </div>

                <div>
                  <div class="alarmbox3">
                    <el-progress
                      type="circle"
                      :stroke-width='13'
                      color='#01D9FE'
                      :percentage="eledata.before?eledata.ringThan.slice(0,eledata.ringThan.length-1):0"
                      class="progress-two circle2"
                    ></el-progress>
                    <svg
                      width="0"
                      height="0"
                    >
                      <defs>
                        <linearGradient
                          id="write"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            style="stop-color:#01D9FE"
                            stop-opacity="0.8"
                          ></stop>
                          <stop
                            offset="100%"
                            style="stop-color:#0477D5"
                            stop-opacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span style="display: inline-block;color:white">环 比</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <!-- <div class="z4wrap">
          <dv-border-box-8
            :reverse="true"
            
          >
            <h3>报警信息提示</h3>
            <template v-if="bjInfoData!=''">
              <div
                class="bjtext"
                v-for="(item,index) in bjInfoData"
                :key="index"
              >
                <i class="el-icon-bell tb"></i>
                <span
                  class="s1"
                  v-if="item.nid.length == 12"
                >{{ '['+ getString1(item.nid) + item.mzname +']' }} - [{{ item.aa }} - {{ item.name }}] - [{{ item.desc }}] - [{{ item.time }}]</span>
                <span
                  class="s1"
                  v-else
                >{{ '['+ getString1(hexCharCodeToStr(item.nid))+item.mzname +']' }} - [{{ item.aa }} - {{ item.name }}] - [{{ item.desc }}] - [{{ new Date(item.time*1000).Format('yy-MM-dd hh:mm:ss') }}]</span>
                <p class="s2">{{ item.beizhu }}</p>
              </div>
            </template>
            <template v-if="bjInfoData==''">
              <div class="textnull">
                <p>暂无报警</p>
              </div>
            </template>
          </dv-border-box-8>
        </div> -->
      </el-col>

      <el-col
        :span="18"
        class="z3"
      >
        <div
          :reverse="true"
          class="z1_1"
        >
          <div class="headtitle">
            实时用电量
          </div>

          <div
            class="selectbox clearfix"
            style="margin-top: 15px;display:flex;padding-left: 90px;padding-top: 40px;box-sizing: border-box;"
          >
            <!-- <div class="selectbox left"> -->
            <el-select
              style="margin-right:36px"
              :popper-append-to-body="false"
              v-model="selvalue1"
              clearable
              placeholder="请选择电箱"
              @change="getLines"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="'['+getString1(hexCharCodeToStr(item.nid))+']' + item.n_name"
                :value="item.nid"
              ></el-option>
            </el-select>
            <!-- </div> -->

            <!-- <div class="selectbox right"> -->
            <el-select
              :popper-append-to-body="false"
              v-model="selvalue2"
              clearable
              placeholder="请选择线路"
              @change="zLineDta"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.name"
                :value="item.mid"
              ></el-option>
            </el-select>
            <!-- </div> -->
          </div>
          <div id="charts7"></div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>
  
  <script>
import { Loading } from 'element-ui';
import $ from "jquery";
import Qs from "qs";
import "echarts-gl";
require("echarts/lib/chart/bar");
export default {
  name: "home1",
  data() {
    return {
      // 首页路由
      homeRouter: [
        {
          oneTitle: "线路能耗",
          // oneTitle: "线路能耗3D",
          JempPath: "/tDenergyConsumption",
          imgSrc: require("../../public/static/images/3d_1.png")
        }
      ],
      // 24 小时
      jdate: "",

      // 电流 - echars - 数据
      tableData4Num: "",
      // 报警信息提示 - 数据
      bjInfoData: [],
      // 定时器
      time1: null,

      // 选择电箱的值
      selvalue1: "",
      // 电箱数据
      options1: [],
      // 选择线路的值
      selvalue2: "",
      // 选择线路数据
      options2: [],
      // 获取线路的设备nid
      nid: "",

      nid1: "",
      mid: "",

      // 用电年月日切换
      tab: 1,
      // 报警年月日切换
      tabalarmnum: 1,
      // 月/年报警类别切换
      rank: 1,

      // 线路用电量
      linedata: [],

      echarsDatas2: [],

      // 日月年报警
      todayMonthYear: {},
      // 显示月度/年度  - 默认月度
      ishidden: true,
      // 月度报警信息检索
      formmonth: {
        dateof: "",
        region: ""
      },
      // 年度报警信息检索
      formyear: {
        dateof: "",
        region: ""
      },

      // 年月日用电量数据
      eledata: {},

      // 月度报警类型占比数据
      monthlydata: [],
      // 年度报警类型占比数据
      yeardata: [],

      // 用电 - 今天天 - echars - 数据
      daytableData: [],
      yesterdaytableData: [],
      beforetableData: [],

      dateshow: new Date(),
      nowTime: ''
    };
  },
  methods: {
    // 点击退出
    path1() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          clearInterval(this.time1);
          localStorage.clear();
          this.$router.push({
            path: "/"
          });
          // localStorage.setItem('getout', 'getout')
          // this.socket();
          this.closeSocket()
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "warning",
            message: "已取操作"
          });
        });
    },
    // 进入操作页
    path2() {
      this.$router.push("/dataMonitor");
      clearInterval(this.time1);
    },

    // 初始化获取电箱
    getList(page) {
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
        url: this.urla + "/api3/EnergyData/getNetdSimpleList",
        data: {
          data: {
            uid: uid
            // uid: localStorage.getItem("uid")
          }
        }
      }).then(res => {
        this.nid1 = res.data.data[0].nid;

        this.options1 = res.data.data;

        this.formmonth.region = this.options1[0].nid
        this.formyear.region = this.options1[0].nid

        this.jdate = new Date().getHours();
        // this.getLines();
        this.getmonth()
      });

      // let type = "post";
      // let url = this.urlb + "/appv1/usdpc1/allNeted";
      // let data = {
      //   uid: localStorage.getItem("uid")
      // };
      // this.myAjax(type, url, data, res => {
      //   this.options1 = res.data.data;
      // });
    },

    // 根据设备号获取线路
    getLines(val) {
      this.nid = val;
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
        url: this.urla + "/api3/EnergyData/getNetedMachedList",
        data: {
          data: {
            nid: val == undefined ? this.nid1 : val,
            uid: uid
            // uid: localStorage.getItem('uid')
          }
        }
      }).then(res => {
        this.options2 = res.data.data;

        this.jdate = new Date().getHours();
        this.zLineDta();
      });
    },

    // 点击报警分类echarts跳转报警分类
    gotoinfo() {
      // this.$confirm("是否查看详细报警信息", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //    
      //     this.$router.push({ path: "/alarmProcessingwy" });
      //   })
      //  
    },

    // 切换报警年月日
    tabalarm(num) {
      this.tabalarmnum = num
      this.getTodayMonthYear()
    },

    // 用电年月日切换
    tabcontent(num) {
      this.tab = num
      this.getElectricityTodayMonthYear()
    },

    // 月/年报警类别切换
    ranking(num) {
      if (num == 2 && this.rank != 2) {
        this.getyear()
      }
      this.rank = num
    },

    // 获取日月年报警次数环比
    getTodayMonthYear() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      // let token = localStorage.getItem(uid + 'token');
      let type = 'post'
      let url = this.urla + '/api3/device/datMonthYearJingCount'
      let data = {
        data: {
          uid: uid, //必传 表示查询用户的日月年环比数据
          // uid: localStorage.getItem('uid'), //必传 表示查询用户的日月年环比数据
          type: this.tabalarmnum, //1 天  2月 3年
          ctype: 0,
        }
      }
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.todayMonthYear = res.data
      })
    },

    // 月度报警信息
    getmonth() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      // let token = localStorage.getItem(uid + 'token');
      let type = "post";
      let url = this.urlb + "/api3/EnergyData/monthJingFenxi";
      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          nid: this.formmonth.region, //可选，无nid参数即为该用户名下所有电箱
          time: this.formmonth.dateof    //必传，time参数四位数，前两位数表示年份的后两位，后两位数表示月份
        }
      };

      this.myAjax(type, url, data, res => {
        this.monthlydata = res.data.data.type
        this.getStudent6()

      })
    },

    // 年度报警信息
    getyear() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      // let token = localStorage.getItem(uid + 'token');
      let type = "post";
      let url = this.urlb + "/api3/EnergyData/yearJingFenxi";

      let data = {
        data: {
          uid: uid,
          // uid: localStorage.getItem("uid"),
          nid: this.formyear.region, //可选，无nid参数即为该用户名下所有电箱
          time: this.formyear.dateof    //必传，time参数四位数，前两位数表示年份的后两位，后两位数表示月份
          // time: this.formyear.dateof.substr(2) + 12    //必传，time参数四位数，前两位数表示年份的后两位，后两位数表示月份
        }
      };

      this.myAjax(type, url, data, res => {
        this.yeardata = res.data.data
        this.getStudent3()
      })
    },

    // 获取日月年用电量环比
    getElectricityTodayMonthYear() {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      // let token = localStorage.getItem(uid + 'token');
      let type = 'post'
      let url = this.urla + '/api3/device/dayThreeDzz'
      let data = {
        data: {
          uid: uid, //必传 表示查询用户的日月年环比数据
          type: this.tab,
          // uid: localStorage.getItem('uid'), //必传 表示查询用户的日月年环比数据
          gid: localStorage.getItem('gid'), //企业ID
        }
      }
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.eledata = res.data
      })
    },


    // 获取年和月
    getmonthyear(tYear) {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      var tMonth = myDate.getMonth();

      var m = tMonth + 1;
      if (m.toString().length == 1) {
        m = "0" + m;
      }
      this.formyear.dateof = tYear.toString()
      this.formmonth.dateof = tYear.toString() + m
    },



    // 进入其他页面
    jempPaths(item) {
      // clearInterval(this.time1);
      // this.$router.push(item.JempPath);
    },
    // echars - 中国地图
    getStudent1() {
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("charts1"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        tooltip: {},
        legend: {
          orient: "vertical",
          left: "left",
          data: [""]
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "1%",
          containLabel: false
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: "85%",
          top: "40%",
          text: ["高", "低"],
          calculable: true,
          color: ["#0b50b9", "#c3e2f4"],
          hoverLink: true,
          textStyle: {
            color: "#FFF" //图例文字颜色，大小等配置
          }
        },
        selectedMode: "single",
        series: [
          {
            name: "",
            type: "map",
            mapType: "china",
            itemStyle: {
              normal: {
                borderColor: "rgba(0, 0, 0, 0.2)"
              },
              emphasis: {
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            showLegendSymbol: true,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: "北京", value: "150" },
              { name: "天津", value: "500" },
              { name: "上海", value: "350" },
              { name: "重庆", value: "50" },
              { name: "河北", value: "160" },
              { name: "河南", value: "860" },
              { name: "云南", value: "460" },
              { name: "辽宁", value: "960" },
              { name: "黑龙江", value: "1120" },
              { name: "湖南", value: "950" },
              { name: "安徽", value: "416" },
              { name: "山东", value: "132" },
              { name: "新疆", value: "540" },
              { name: "江苏", value: "569" },
              { name: "浙江", value: "464" },
              { name: "江西", value: "798" },
              { name: "湖北", value: "1203" },
              { name: "广西", value: "656" },
              { name: "甘肃", value: "12" },
              { name: "山西", value: "54" },
              { name: "内蒙古", value: "476" },
              { name: "陕西", value: "1355" },
              { name: "吉林", value: "464" },
              { name: "福建", value: "198" },
              { name: "贵州", value: "365" },
              { name: "广东", value: "414" },
              { name: "青海", value: "497" },
              { name: "西藏", value: "12" },
              { name: "四川", value: "14" },
              { name: "宁夏", value: "9" },
              { name: "海南", value: "146" },
              { name: "台湾", value: "985" },
              { name: "香港", value: "645" },
              { name: "澳门", value: "419" }
            ]
          }
        ]
      });
    },

    // 初始化获取数据 - 日/月 - 饼图
    getDatas4(dataType) {
      let type = "post";
      let url = this.urlb + "/api/pc/allJingDeal";
      let data = {
        uid: localStorage.getItem("uid"),
        nid: 0,
        ri: 0,
        yue: 0,
        by: 0,
        ste: 0,
        ete: 0
      };
      this.myAjax(type, url, data, res => {
        res.data.data.shift();
        this.echarsDatas2 = res.data.data;
        this.getStudent2();
      });
    },


    // 初始化 - 用电 折线图数据
    zLineDta() {
      Loading.service({
        fullscreen: true,
        text: "正在加载，请稍后...",
        spinner: 'el-icon-loading',
        background: "rgba(0,0,0,.4)"
      });
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let token = localStorage.getItem(uid + 'token');
      let instance = this.$axios.create();
      let data = {
        gid: localStorage.getItem('gid'), // 企业ID
        uid: uid,   //用户ID
        // uid: localStorage.getItem("uid"),   //用户ID
        nid: this.selvalue1, // 电箱号，当type为2、3时起效，当type为1时置空
        mid: this.selvalue2,//线路号，当type为3时起效，其余置空
        type: ""  //1用户总电量小时排行，2电箱总电量小时排行，3线路总电量小时排行
      }
      if (this.selvalue1 == "" && this.selvalue2 == "") {
        data.type = 1
      } else if (this.selvalue1 != "" && this.selvalue2 == "") {
        data.type = 2
      } else if (this.selvalue1 != "" && this.selvalue2 != "") {
        data.type = 3
      }
      instance({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Apptoken": token
          // "Apptoken": localStorage.getItem('token')
        },
        method: "post",
        url: this.urla + "/api3/device/dayThreeTypeThreeDzz",
        // data: {
        //   data: {
        //     uid: localStorage.getItem("uid"),
        //     type: 0, //0表示用户所有，1表示电箱，2表示线路
        //     gid: localStorage.getItem('gid'), //企业ID
        //     nid: this.selvalue1, //电箱号 当type为0，则传0
        //     mid: this.selvalue2, //回路号 当type为0或者1，则传0
        //   }
        // }
        data: {
          data
        }
      }).then(res => {
        // console.log(res);
        Loading.service({}).close()

        if (res.data.code == 707) {
          this.$message({
            showClose: true,
            message: "请先选择电箱计数",
            type: "warning"
          });
          // Loading.service({}).close()
        } else {
          this.daytableData = []
          this.yesterdaytableData = []
          this.beforetableData = []

          res.data.today.forEach(val => {
            this.daytableData.push(val.dzz)
          })
          res.data.yestoday.forEach(val => {
            this.yesterdaytableData.push(val.dzz)
          })
          res.data.beforeday.forEach(val => {
            this.beforetableData.push(val.dzz)
          })
          // this.daytableData = res.data.today;
          // this.yesterdaytableData = res.data.yestoday;
          // this.beforetableData = res.data.beforeday;
          this.jdate = new Date().getHours();
          this.getStudent7();
          // Loading.service({}).close()
        }
      });

      // let type = "post";
      // let url = this.urla + "/appv1/com/userElectricityTotal";
      // let data = {
      //   uid: localStorage.getItem("uid")
      // };
      // this.myAjax(type, url, data, res => {
      //   // console.log(res);
      //   if (res.data.code == 46) {
      //     this.$message({
      //       showClose: true,
      //       message: "请先选择电箱计数",
      //       type: "warning"
      //     });
      //     // this.$router.replace({path:'/electricBoxCount'})
      //   }
      //   this.tableData3 = res.data.data;
      //   this.jdate = new Date().getHours();
      //   this.getStudent7();
      // });
    },

    // 线路用电请求 - echarts 图数据
    getCurrent(val) {
      let instance = this.$axios.create();
      instance({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "post",
        url: this.urla + "/api/pc/getXianluEle",
        data: Qs.stringify({
          uid: localStorage.getItem("uid"),
          nid: this.nid == undefined ? this.nid1 : this.nid,
          mid: val == undefined ? this.mid : val
        })
      }).then(res => {
        // console.log(res.data.todayEle)
        this.linedata = res.data.todayEle;

        this.jdate = new Date().getHours();
        // this.getStudent8();
      });
    },

    // echars - 饼形图
    getStudent2() {
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("charts1"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        title: {
          text: "报警分析",
          x: "center",
          top: 30,
          textStyle: {
            color: "#FFF", //图例文字颜色，大小等配置
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          // orient: "vertical",
          bottom: 10,
          textStyle: {
            color: "#FFF" //图例文字颜色，大小等配置
          },
          // fontWeight:200,
          // color:"#fff",
          // left: 'center',
          data: [
            "欠压告警",
            "过压预警",
            "过压报警",
            "电流告警",
            "电流预警",
            "电流报警",
            "漏电流报警",
            "温度报警",
            "分机报警"
          ]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["30%", "45%"],
            center: ["50%", "45%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "14",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: _this.echarsDatas2[0], name: "欠压告警" },
              { value: _this.echarsDatas2[1], name: "过压预警" },
              { value: _this.echarsDatas2[2], name: "过压报警" },
              { value: _this.echarsDatas2[3], name: "电流告警" },
              { value: _this.echarsDatas2[4], name: "电流预警" },
              { value: _this.echarsDatas2[5], name: "电流报警" },
              { value: _this.echarsDatas2[6], name: "漏电流报警" },
              { value: _this.echarsDatas2[7], name: "温度报警" },
              { value: _this.echarsDatas2[8], name: "分机报警" }
              // { value: 0, name: "欠压告警" },
              // { value: 0, name: "过压预警" },
              // { value: 0, name: "过压报警" },
              // { value: 0, name: "电流告警" },
              // { value: 0, name: "电流预警" },
              // { value: 0, name: "电流报警" },
              // { value: 0, name: "漏电流报警" },
              // { value: 0, name: "温度报警" },
              // { value: 0, name: "分机报警" }
            ]
          }
        ]
      });
    },

    // echars - 柱形图 - 月报警分类 - 趋势
    getStudent6() {
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("charts3"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        // title: {
        //   text: "当天 - 用电统计图",
        //   x: "center",
        //   top: 20,
        //   textStyle: {
        //     color: "#FFF", //图例文字颜色，大小等配置
        //     fontSize: 14
        //   }
        // },
        xAxis: {
          type: "category",
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              color: '#fff',//坐标值得具体的颜色

            }
          },
          // axisLine: {
          //   lineStyle: {
          //     color: "#fff",
          //     width: 1 //这里是为了突出显示加上的
          //   }
          // },
          axisLine: {
            lineStyle: {
              color: "#0068C1",
              width: 1 //这里是为了突出显示加上的
            }
          },
          data: [
            "欠压告警",
            "过压预警",
            "过压报警",
            "电流告警",
            "电流预警",
            "电流报警",
            "漏电流报警",
            "温度报警",
            "分机报警"
          ]
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#0068C1",
              width: 1 //这里是为了突出显示加上的
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#1A3F81'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {     //x轴坐标轴
            show: false
          },
          axisTick: {		//x轴刻度线
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#0068C1',//坐标值得具体的颜色
            }
          },
        },
        series: [
          {
            data: _this.monthlydata,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            itemStyle: {
              normal: {
                barBorderRadius: 6,
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#01D9FE' },
                    { offset: 1, color: '#0477D5' }
                  ]
                ),
                label: {
                  show: true,
                  position: "top",
                  formatter: "{b}\n{c}",
                  formatter: "{c}",
                  color: '#fff'
                }
              }
            },
            barWidth: 7 //柱图宽度
          }
        ]
      });
    },

    // echars - 柱形图 - 年报警分类 - 趋势
    getStudent3() {
      let _this = this;
      let student = _this.$echarts.init(document.getElementById("charts4"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        xAxis: {
          type: "category",
          //坐标轴斜着显示
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              color: '#fff',//坐标值得具体的颜色
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisLine: {
            lineStyle: {
              color: "#0068C1",
              width: 1 //这里是为了突出显示加上的
            }
          },
          data: [
            "欠压告警",
            "过压预警",
            "过压报警",
            "电流告警",
            "电流预警",
            "电流报警",
            "漏电流报警",
            "温度报警",
            "分机报警"
          ]
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#0068C1",
              width: 1 //这里是为了突出显示加上的
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#1A3F81'],
              width: 1,
              type: 'solid'
            }
          },
          axisLine: {     //x轴坐标轴
            show: false
          },
          axisTick: {		//x轴刻度线
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#0068C1',//坐标值得具体的颜色
            }
          },
        },
        series: [
          {
            data: _this.yeardata,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            },
            itemStyle: {
              normal: {
                barBorderRadius: 6,
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#01D9FE' },
                    { offset: 1, color: '#0477D5' }
                  ]
                ),
                label: {
                  show: true,
                  position: "top",
                  formatter: "{b}\n{c}",
                  formatter: "{c}",
                  color: '#fff'
                }
              }
            },
            barWidth: 7 //柱图宽度
          }
        ]
      });
    },

    // echars - 折线图 - 总用电/电箱/线路 - 趋势
    getStudent7() {
      let _this = this;
      let arr = [
        "00时",
        "01时",
        "02时",
        "03时",
        "04时",
        "05时",
        "06时",
        "07时",
        "08时",
        "09时",
        "10时",
        "11时",
        "12时",
        "13时",
        "14时",
        "15时",
        "16时",
        "17时",
        "18时",
        "19时",
        "20时",
        "21时",
        "22时",
        "23时"
      ];
      // arr.length = _this.jdate;
      _this.daytableData.length = _this.jdate
      let student = _this.$echarts.init(document.getElementById("charts7"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        title: {
          text: "",
          x: "center",
          top: 20,
          textStyle: {
            color: "#FFF", //图例文字颜色，大小等配置
            fontSize: 14
          }
        },
        legend: {
          // data: ['昨日', '今日']
          textStyle: {//图例文字的样式
            color: '#517FB5',
          },
          right: 40,
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          // name:'点',
          type: "category",
          boundaryGap: false,
          // axisLabel: {
          //   formatter: "{value} /h"
          // },
          data: arr,
          axisLine: {
            lineStyle: {
              color: "#2C3167",
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',//坐标值得具体的颜色

            }
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#2C3167'],
              width: 1,
            }
          },
        },
        yAxis: {
          type: "value",
          name: "单位：(kW/h)",
          nameTextStyle: {
            color: ['#fff']
          },
          axisLine: {
            lineStyle: {
              color: "#2C3167",
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',//坐标值得具体的颜色

            }
          },
          //设置网格线颜色
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#2C3167'],
              width: 1,
            }
          },
        },
        series: [
          {
            name: "今日",
            data: _this.daytableData,
            type: "line",
            symbol: 'circle',
            // smooth: 0.6,
            itemStyle: {
              normal: {
                color: "#FFC000", //改变折线点的颜色
                lineStyle: {
                  color: "#FFC000", //改变折线颜色
                  width: 1
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
          },
          {
            name: "昨日",
            data: _this.yesterdaytableData,
            type: "line",
            symbol: 'circle',
            // smooth: 0.6,
            itemStyle: {
              normal: {
                color: "#5DFFFF", //改变折线点的颜色
                lineStyle: {
                  color: "#5DFFFF", //改变折线颜色
                  width: 1
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
          },
          {
            name: "前日",
            data: _this.beforetableData,
            type: "line",
            symbol: 'circle',
            // smooth: 0.6,
            itemStyle: {
              normal: {
                color: "#e41330", //改变折线点的颜色
                lineStyle: {
                  color: "#e41330", //改变折线颜色
                  width: 1
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
          }
        ]
      });
    },

    // echars - 折线图 - 线路用电 - 趋势
    getStudent8() {
      let _this = this;
      let arr = [
        "0点-1点",
        "1点-2点",
        "2点-3点",
        "3点-4点",
        "4点-5点",
        "5点-6点",
        "6点-7点",
        "7点-8点",
        "8点-9点",
        "9点-10点",
        "10点-11点",
        "11点-12点",
        "12点-13点",
        "13点-14点",
        "14点-15点",
        "15点-16点",
        "16点-17点",
        "17点-18点",
        "18点-19点",
        "19点-20点",
        "20点-21点",
        "21点-22点",
        "22点-23点",
        "23点-00点"
      ];
      arr.length = _this.jdate;
      let student = _this.$echarts.init(document.getElementById("charts8"));
      $(window).resize(function () {
        student.resize();
      });
      student.setOption({
        title: {
          text: "当天线路用电量走势图",
          x: "center",
          top: 20,
          textStyle: {
            color: "#FFF", //图例文字颜色，大小等配置
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#008080"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          // name:'点',
          type: "category",
          boundaryGap: false,
          // axisLabel: {
          //   formatter: "{value} /h"
          // },
          data: arr,
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: "value",
          name: "单位：(kW/h)",
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            data: _this.linedata,
            type: "line",
            areaStyle: {
              normal: {
                color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    // color: "#d7f4f8" // 0% 处的颜色
                    color: "#008080" // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    // color: "#eefcfd" // 100% 处的颜色
                    color: "#008080" // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    // color: "transparent" // 100% 处的颜色
                    color: "transparent" // 100% 处的颜色
                  }
                ]), //背景渐变色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 3,
                  type: "solid",
                  color: "#4fd6d2"
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#8cd5c2", //改变折线点的颜色
                lineStyle: {
                  color: "#8cd5c2" //改变折线颜色
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          }
        ]
      });
    },

    // 报警信息提示 - 右下角提示处
    getAlarm() {
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
        url: this.urla + "/api3/EnergyData/jingAllList",
        data: {
          data: {
            uid: uid,
            // uid: localStorage.getItem("uid"),
            page: 1,
            size: 50,   //必传  页码条数报警类别
            start: new Date(new Date() - 1000 * 60 * 60 * 24).getTime() / 1000,  //必传    时间范围开始
            send: new Date().getTime() / 1000,  //必传  时间范围结束

            nid: "", //可选     
            mid: "", //可选   线路
            status: "", //可选   状态：0未读。。。。。
            type: "", //可选
          }
        }
      }).then(res => {
        // console.log(res)
        for (let i = 0; i < res.data.data.length; i++) {
          // 电箱号
          res.data.data[i].nid = this.hexCharCodeToStr(res.data.data[i].nid);
          // 线路
          res.data.data[i].aa = "线路" + res.data.data[i].aa;
          // 告警类型
          if (res.data.data[i].otype == 1) {
            res.data.data[i].otype = "欠压告警";
          } else if (res.data.data[i].otype == 2) {
            res.data.data[i].otype = "过压预警";
          } else if (res.data.data[i].otype == 3) {
            res.data.data[i].otype = "过压报警";
          } else if (res.data.data[i].otype == 4) {
            res.data.data[i].otype = "电流预警";
          } else if (res.data.data[i].otype == 5) {
            res.data.data[i].otype = "电流告警";
          } else if (res.data.data[i].otype == 6) {
            res.data.data[i].otype = "电流报警";
          } else if (res.data.data[i].otype == 7) {
            res.data.data[i].otype = "漏电流报警";
          } else if (res.data.data[i].otype == 8) {
            res.data.data[i].otype = "温度报警";
          } else if (res.data.data[i].otype == 9) {
            res.data.data[i].otype = "分机报警";
          } else {
            res.data.data[i].otype = "- -";
          }
          // 报警级别
          res.data.data[i].limit = "建议断闸检修";
          // 报警状态
          if (res.data.data[i].status == 0) {
            res.data.data[i].status = "未读";
          } else if (res.data.data[i].status == 1) {
            res.data.data[i].status = "只阅读";
          } else if (res.data.data[i].status == 2) {
            res.data.data[i].status = "已经检修";
          } else if (res.data.data[i].status == 3) {
            res.data.data[i].status = "已删除";
          } else {
            res.data.data[i].otype = "- -";
          }
          // 检修人
          res.data.data[i].xname = res.data.data[i].xname
            ? res.data.data[i].xname
            : "- -";
          res.data.data[i].xtime = res.data.data[i].xtime
            ? res.data.data[i].xtime
            : "- -";
          // 报警发生的时间
          res.data.data[i].time = new Date(res.data.data[i].time * 1000).Format(
            "yy-MM-dd hh:mm:ss"
          );
        }
        // this.bjInfoData = this.getString3(res.data.data, 8);
        this.bjInfoData = res.data.data;
      });
    },

    //显示当前时间（年月日时分秒）
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
      let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
      let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
      let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
      let ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
      this.nowTime = year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm + ':' + ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear()
    },
    clear() {
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    }
  },
  // 监听数据
  watch: {
    count(newCount, oldCount) {
      // console.log(newCount,oldCount)
      if (newCount.type == "jing") {
        this.bjInfoData.unshift({
          nid: newCount.data.nid, // 设备16进制
          mzname: newCount.data.n_name, // 设备名称
          jianzhu: newCount.data.jianzhu, // 线路名称
          aa: "线路" + newCount.data.mid, // 线路
          desc: newCount.data.desc, // 报警类型
          beizhu: newCount.data.beizhu, // 报警提示文字
          time: newCount.data.time // 时间
        });
        // this.$notify.warning({
        //   title:
        //     newCount.desc +
        //     "-" +
        //     new Date(newCount.time * 1000).Format("yy-MM-dd hh:mm:ss"),
        //   type: "warning",
        //   duration: 0,
        //   message:
        //     ("i",
        //       { style: "color: teal" },
        //       "[" +
        //       this.getString1(this.hexCharCodeToStr(newCount.nid)) +
        //       newCount.mzname +
        //       "]" +
        //       " - 线路" +
        //       newCount.aa +
        //       " : " +
        //       newCount.beizhu)
        // });
      }
    }
  },
  // 监听属性
  computed: {
    count() {
      return this.$store.state.socketData;
    },
    huanbi1() {
      // console.log(((this.todayMonthYear.ben - this.todayMonthYear.wang) / this.todayMonthYear.wang * 100).toFixed(2))
      if (((this.todayMonthYear.ben - this.todayMonthYear.wang) / this.todayMonthYear.wang * 100).toFixed(2) != 'NaN' && ((this.todayMonthYear.ben - this.todayMonthYear.wang) / this.todayMonthYear.wang * 100).toFixed(2) != 'Infinity') {
        return Number(((this.todayMonthYear.ben - this.todayMonthYear.wang) / this.todayMonthYear.wang * 100).toFixed(2))
      } else {
        return 0
      }
    },
    huanbi2() {
      // console.log(((this.todayMonthYear.ben - this.todayMonthYear.wang) / this.todayMonthYear.wang * 100).toFixed(2))
      if (((this.eledata.today - this.eledata.yestoday) / this.eledata.yestoday * 100).toFixed(2) != 'NaN' && ((this.eledata.today - this.eledata.yestoday) / this.eledata.yestoday * 100).toFixed(2) != 'Infinity') {
        return Number(((this.eledata.today - this.eledata.yestoday) / this.eledata.yestoday * 100).toFixed(2))
      } else {
        return 0
      }
    }
  },
  // 初始化 - dom - 在created后
  mounted() {
    // this.getStudent4();
    // this.getStudent6();
    // this.getStudent7();
    // this.getStudent8();

    // setInterval(() => {
    //   this.$store.commit('setsocketData', {
    //     type: 'jing',
    //     data: {
    //       nid: '34474c3430354c4130365157', // 设备16进制
    //       mzname: '牛羊肉—邢玉芬副食', // 设备名称
    //       jianzhu: '牛羊肉片', // 线路名称
    //       aa: '08', // 线路
    //       desc: '电流报警', // 报警类型
    //       beizhu: '当前电流处于过流报警值上,当前电流为:81.176A,所设电流预警值为:50A', // 报警提示文字
    //       time: '1600766564' // 时间
    //     }
    //   })
    // }, 6000)

    this.nowTimes()
  },
  // 初始化 - 数据 - 在mounted前
  created() {
    this.jdate = new Date().getHours();
    // this.getDatas3();
    // this.getDatas4();
    this.zLineDta();
    this.getList(1);
    this.getTodayMonthYear()
    this.getElectricityTodayMonthYear()
    // this.getmonth()
    this.getmonthyear()
    this.getAlarm();

    let _this = this;
    // this.time1 = setInterval(() => {
    //   _this.getDatas3();
    //   _this.getDatas4();
    //   _this.zLineDta();
    // }, 3600000);

    // console.log(document.documentElement.clientHeight)
  },

};
</script>
  
<style lang="less" scoped>
.el-tooltip__popper {
  background: #fff !important;
  border: 1px solid #fff !important;
}
// 全屏
@media screen and (min-height: 1080px) {
  .contentline {
    margin-top: 3rem !important;
  }
  .z1,
  .z1_1,
  .z1_2,
  .z4wrap .z4 {
    height: 450px !important;
  }
}
// 小屏
@media screen and (min-height: 650px) and (max-height: 750px) {
  .contentline {
    height: 300px !important;
  }
  .z1,
  .z3,
  .z1_1,
  .z1_2,
  .z4wrap .z4 {
    height: 300px !important;
    .alarmbox .alarmbox3 {
      margin-top: 16px !important;
    }
  }
  .z1 .z1_1 .z1_1wrap .alarmbox .alarmbox3 {
    margin-top: 16px !important;
  }
  .headtext {
    padding-top: 20px;
    box-sizing: border-box;
  }
  #charts3,
  #charts4,
  #charts7 {
    height: 190px !important;
  }
}
// 小屏全屏
@media screen and(min-height:750px) and(max-height: 850px) {
  .contentline {
    height: 320px !important;
    margin-top: 3rem !important;
  }
  .z1,
  .z3,
  .z1_1,
  .z1_2,
  .z4wrap .z4 {
    height: 320px !important;
    .alarmbox .alarmbox3 {
      margin-top: 16px !important;
    }
  }
  .z1 .z1_1 .z1_1wrap .alarmbox .alarmbox3 {
    margin-top: 16px !important;
  }
  #charts3,
  #charts7 {
    height: 210px !important;
  }
}

.home {
  height: 100%;
  background: url("../../public/static/images/backgroud-min.png");
  // background: #03103d;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0 20px;
  overflow-x: hidden;
  .top {
    margin-top: 0 !important;
    line-height: 65px;
    background: url("../../public/static/images/head.png");
    background-repeat: no-repeat;
    background-size: 76% 100%;
    background-position-x: 50%;
    .ulLeft {
      display: block;
      // width: 100%;
      width: 620px;
      height: 65px;
      text-align: left;
      color: #517fb5;
      font-size: 18px;
      li {
        cursor: pointer;
        color: #fff;
        float: right;
        padding: 0 15px;
        img {
          width: 35px;
          border-radius: 50%;
          vertical-align: middle;
        }
        &:first-child {
          margin-right: 40px;
        }
      }
    }
    .ulRight {
      padding-right: 60px;
      display: block;
      width: 100%;
      li {
        font-size: 18px;
        cursor: pointer;
        color: #6390c6;
        float: right;
        padding: 0 15px;
        img {
          width: 35px;
          border-radius: 50%;
          // vertical-align: middle;
        }
      }
      // .t1:hover {
      //   color: teal;
      // }
    }
    h2 {
      color: #fff;
      font-size: 24px;
      line-height: 65px;
    }
  }
  .el-row {
    // margin-top: 20px;
    margin-top: 1.5rem;
  }
  .el-form {
    text-align: left;
    margin-top: 10px;
    display: flex;
    // .el-form-item {
    //   float: left;
    // }
    .el-date-editor/deep/.el-input,
    .el-date-editor/deep/.el-input__inner {
      color: #527fb5;
      border: 1px solid #1a3f81;
      background: transparent;
    }
    .el-form-item/deep/.el-form-item__label,
    .el-date-editor /deep/.el-range-separator {
      color: #527fb5;
    }
    .el-date-editor /deep/.el-range-input {
      color: #527fb5;
      background: transparent;
    }

    .el-button {
      margin-top: 3px;
      padding: 9px 20px;
      margin-left: 20px;
    }
    .dianxiang {
      width: 275px;
      .el-select {
        width: 100%;
      }
      .el-select /deep/ .el-input__inner {
        color: #527fb5;
        border: 1px solid #1a3f81;
        background: transparent;
      }
    }
    .el-date-editor /deep/ .el-range__icon {
      line-height: 26px !important;
    }
  }
  .headtitle {
    width: 230px;
    height: 50px;
    background: url("../../public/static/images/border.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translate(-50%, 0px);
    z-index: 10;
    text-align: center;
    line-height: 50px;
    font-size: 19px;
    color: #02d9fd;
  }
  .z1 {
    height: 400px;
    // position: relative;
    .z1_1 {
      background: url("../../public/static/images/borderwid.png") no-repeat;
      background-size: 100% 100%;
      height: 400px;
      // overflow: hidden;
      // width: 40%;
      width: 37.5%;
      float: left;
      padding: 10px 20px 20px 20px;
      box-sizing: border-box;
      position: relative;
      .z1_1wrap {
        height: 100%;
        .alarmbox3 /deep/ .el-progress__text {
          // color: #fff;
          font-weight: bold;
          background-image: linear-gradient(135deg, #0477d5, #01d9fe);
          -webkit-background-clip: text;
          color: transparent;
        }
        .headtext {
          height: 65px;
          line-height: 45px;
          color: #ccc;
          font-size: 16px;
          text-align: left;
          padding-top: 15px;
          box-sizing: border-box;
          .text {
            color: #517fb5;
            padding: 8px 10px;
            cursor: pointer;
          }
          img {
            width: 27px;
            vertical-align: middle;
          }
        }
        // 报警信息
        .alarmbox {
          height: 83%;
          display: flex;
          // flex-wrap: wrap;
          justify-content: space-around;
          .leftcontent {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
          .alarmbox1,
          .alarmbox2 {
            width: 100%;
            // height: 100px;
            display: flex;
            // line-height: 100px;
            color: #c8c456;
            font-size: 16px;
            // background-image: -webkit-linear-gradient(
            //   right,
            //   rgba(17, 72, 126, 0.3) 0%,
            //   rgba(11, 230, 247, 0.3) 100%
            // );
            .alarm {
              font-size: 12px;
              color: rgba(11, 230, 247);
            }
          }
          .alarmbox3 {
            width: 98%;
            height: 150px;
            margin-top: 66px;
            line-height: 100px;
            color: #c8c456;
            font-size: 16px;
            // background-image: -webkit-linear-gradient(
            //   right,
            //   rgba(17, 72, 126, 0.3) 0%,
            //   rgba(11, 230, 247, 0.3) 100%
            // );
            .el-progress /deep/ path:first-child {
              stroke: #143576;
            }
            .circle2 /deep/ svg > path:nth-child(2) {
              stroke: url(#write);
            }
          }
        }
      }
      .card {
        width: 245px;
        height: 80px;
        background: rgba(255, 160, 96, 0.2);
        border-radius: 4px;
        border: 1px solid #ffa060;
        margin: auto;
        margin-top: 30px;
        .left {
          width: 40%;
          float: left;
          img {
            width: 38px;
            height: 38px;
            display: block;
            margin: auto;
            margin-top: 20px;
          }
        }
        .right {
          width: 60%;
          float: left;
          .p1 {
            color: #ffa060;
            font-size: 16px;
            margin-top: 15px;
          }
          .p2 {
            color: #ffa060;
            font-size: 12px;
            margin-top: 10px;
            span {
              color: #f56c6c;
              font-size: 18px;
              padding-left: 10px;
            }
          }
        }
      }
      #charts2 {
        height: 280px;
      }
    }
    .z1_2 {
      position: relative;
      background: url("../../public/static/images/borderwid.png") no-repeat;
      background-size: 100% 100%;
      height: 400px;
      // overflow: hidden;
      // width: 60%;
      width: 62.5%;
      float: left;
      .el-form {
        padding-left: 16px;
        box-sizing: border-box;
      }
      .selectalarmdata {
        width: 166px;
        height: 35px;
        line-height: 39px;
        margin-left: 12px;
        span {
          font-size: 16px;
          color: #517fb5;
          padding: 8px 10px;
          cursor: pointer;
        }
      }
      .headtext {
        height: 46px;
        line-height: 46px;
        color: #ccc;
        font-size: 16px;
        text-align: right;
        padding: 5px 5px 0 0;
        box-sizing: border-box;
        .text {
          padding: 8px 10px;
          cursor: pointer;
        }
        img {
          width: 27px;
          vertical-align: middle;
        }
      }
      .card {
        width: 245px;
        height: 80px;
        background: rgba(255, 160, 96, 0.2);
        border-radius: 4px;
        border: 1px solid #fec107;
        margin: auto;
        margin-top: 30px;
        .left {
          width: 40%;
          float: left;
          img {
            width: 38px;
            height: 38px;
            display: block;
            margin: auto;
            margin-top: 20px;
          }
        }
        .right {
          width: 60%;
          float: left;
          .p1 {
            color: #fec107;
            font-size: 16px;
            margin-top: 15px;
          }
          .p2 {
            color: #fec107;
            font-size: 12px;
            margin-top: 10px;
            span {
              color: #ffa060;
              font-size: 18px;
              padding-left: 10px;
            }
          }
        }
      }
      #charts3,
      #charts4 {
        height: 280px;
      }
    }
  }
  .z2 {
    #charts1 {
      height: 400px;
    }
  }
  .z3 {
    height: 400px;
    position: relative;
    background: url("../../public/static/images/borderwid2.png") no-repeat;
    background-size: 100% 100%;
    .z1_1 {
      // background: url("../../public/static/images/borderwid2.png") no-repeat;
      background-size: 100% 100%;
      height: 400px;
      overflow: hidden;
      width: 100%;
      float: left;
      padding: 0 20px;
      box-sizing: border-box;
      .card {
        width: 280px;
        min-width: 310px;
        height: 80px;
        background: rgba(255, 160, 96, 0.2);
        border-radius: 4px;
        border: 1px solid #ffa060;
        margin: auto;
        margin-top: 30px;
        .left {
          width: 40%;
          float: left;
          img {
            width: 38px;
            height: 38px;
            display: block;
            margin: auto;
            margin-top: 20px;
          }
        }
        .right {
          width: 60%;
          float: left;
          .p1 {
            color: #ffa060;
            font-size: 16px;
            margin-top: 15px;
          }
          .p2 {
            color: #ffa060;
            font-size: 12px;
            margin-top: 3px;
            span {
              color: #f56c6c;
              font-size: 18px;
              padding-left: 10px;
            }
          }
        }
      }
      #charts7 {
        height: 310px;
      }
    }
    .z1_2 {
      background: url("../../public/static/images/borderwid.png") no-repeat;
      background-size: 100% 100%;
      height: 400px;
      overflow: hidden;
      width: 50%;
      float: left;
      .card {
        width: 245px;
        height: 80px;
        background: rgba(255, 160, 96, 0.2);
        border-radius: 4px;
        border: 1px solid #fec107;
        margin: auto;
        margin-top: 30px;
        .left {
          width: 40%;
          float: left;
          img {
            width: 38px;
            height: 38px;
            display: block;
            margin: auto;
            margin-top: 20px;
          }
        }
        .right {
          width: 60%;
          float: left;
          .p1 {
            color: #ffa060;
            font-size: 16px;
            margin-top: 30px;
          }
        }
      }
      #charts8 {
        height: 280px;
      }
    }
  }

  .z4wrap {
    position: relative;
    .dv-border-box-8 /deep/ .border-box-content {
      overflow: auto !important;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #052792;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #20a3f5;
      }
    }
    .headtext {
      height: 50px;
      line-height: 45px;
      color: #ccc;
      font-size: 16px;
      text-align: left;
      padding-top: 15px;
      box-sizing: border-box;
      .text {
        padding: 8px 10px;
        cursor: pointer;
      }
      img {
        width: 30px;
        vertical-align: middle;
      }
    }
    .elebox {
      width: 90%;
      height: 82px;
      line-height: 82px;
      margin-bottom: 20px;
      // border: 1px solid #cccccc;
      color: #ccc;
      text-align: left;
      border-radius: 50px;
    }
    .dayele {
      display: inline-block;
      height: 100%;
      width: 35%;
      // border: 1px solid #ccc;
      color: #ccc;
      border-radius: 50px;
      text-align: center;
      background: #2f6aa473;
    }
  }

  .z4 {
    background: url("../../public/static/images/borderwid.png") no-repeat;
    background-size: 100% 100%;
    height: 400px;
    box-sizing: border-box;
    padding: 10px 20px 20px 20px;
    // overflow: auto;
    .headtext {
      .text {
        color: #517fb5;
      }
    }
    .z4content {
      height: 90%;
      overflow: auto;
      margin-top: 39px;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #052792;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #20a3f5;
      }
    }
    // &::-webkit-scrollbar {
    //   /*滚动条整体样式*/
    //   width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    //   height: 1px;
    // }
    // &::-webkit-scrollbar-thumb {
    //   /*滚动条里面小方块*/
    //   border-radius: 10px;
    //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    //   background: #052792;
    // }
    // &::-webkit-scrollbar-track {
    //   /*滚动条里面轨道*/
    //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    //   border-radius: 10px;
    //   background: #20a3f5;
    // }
    h3 {
      color: red;
      line-height: 30px;
      text-align: center;
    }
    .bjtext {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 20px;
      font-size: 12px;
      text-align: left;
      margin-bottom: 5px;
      .tb {
        color: #e6a23c;
        font-size: 20px;
        vertical-align: middle;
      }
      .s1 {
        color: #fff;
        padding: 0 15px;
      }
      .s2 {
        // color: #f56c6c;
        color: #01d9febd;
        padding-left: 35px;
      }
    }
    // 报警信息
    .alarmbox {
      height: 100%;
      display: flex;
      // flex-wrap: wrap;
      justify-content: space-around;
      .leftcontent {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .alarmbox1,
      .alarmbox2 {
        width: 100%;
        // height: 100px;
        display: flex;
        // line-height: 100px;
        color: #c8c456;
        font-size: 16px;
        // background-image: -webkit-linear-gradient(
        //   right,
        //   rgba(17, 72, 126, 0.3) 0%,
        //   rgba(11, 230, 247, 0.3) 100%
        // );
        .alarm {
          font-size: 12px;
          color: rgba(11, 230, 247);
        }
      }
      .alarmbox3 {
        width: 98%;
        // height: 100px;
        height: 150px;
        margin-top: 66px;
        line-height: 100px;
        color: #c8c456;
        font-size: 16px;
        // background-image: -webkit-linear-gradient(
        //   right,
        //   rgba(17, 72, 126, 0.3) 0%,
        //   rgba(11, 230, 247, 0.3) 100%
        // );
        .el-progress /deep/ path:first-child {
          stroke: #143576;
        }
        .circle2 /deep/ svg > path:nth-child(2) {
          stroke: url(#write);
        }
      }
      .alarmbox3 /deep/ .el-progress__text {
        // color: #fff;
        font-weight: bold;
        background-image: linear-gradient(135deg, #0477d5, #01d9fe);
        -webkit-background-clip: text;
        color: transparent;
      }
    }
  }

  .leftbottom {
    width: 185px !important;
    margin: 25px 10px !important;
  }

  // 暂无报警文字
  .textnull {
    margin-top: 60px;
    p {
      color: #e6a23c;
      font-size: 26px;
      font-weight: bold;
      font-family: "KaiTi";
    }
  }

  // 电流统计图选择
  .selectbox {
    flex: 1;
    .el-select /deep/ .el-input__inner {
      color: white;
      border-color: #1a3f81;
      background-color: transparent !important;
    }
    ::-webkit-input-placeholder {
      color: #527fb5;
    }
    ::-moz-placeholder {
      color: #527fb5;
    } /* firefox 19+ */
    :-ms-input-placeholder {
      color: #527fb5;
    } /* ie */
    input:-moz-placeholder {
      color: #527fb5;
    }
    .el-select /deep/ .el-popper {
      background-color: #011058 !important;
      // background-color: rgba(0, 0, 0, 0.45) !important;
      .el-select-dropdown__item {
        color: white !important;
      }
      .hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
  .left {
    text-align: right;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .right {
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }
}

.gotohome {
  font-size: 26px;
}
.hometext {
  line-height: 0;
  margin-top: -16px;
}
</style>
  