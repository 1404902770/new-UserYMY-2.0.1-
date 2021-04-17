<template>
  <!-- 用电监测 - 数据报表 -->
  <div class="electricBoxInfo">
    <el-container style="height: 100%;">
      <!-- 上部 -->
      <el-header>
        <div class="btngroup">
          <button
            class="tabbtn avtivetabbtn"
            @click="handleClick('first',$event)"
          >日 报</button>
          <button
            class="tabbtn"
            @click="handleClick('third',$event)"
          >月 报</button>
          <button
            class="tabbtn"
            @click="handleClick('fourth',$event)"
          >年 报</button>
          <!-- <el-button
            type="primary"
            @click="handleClick('first',$event)"
            style="margin-left:10px;"
          >日 报</el-button>
          <el-button
            type="primary"
            @click="handleClick('third',$event)"
            style="margin-left:10px;"
          >月 报</el-button>
          <el-button
            type="primary"
            @click="handleClick('fourth',$event)"
            style="margin-left:10px;"
          >年 报</el-button> -->
        </div>

      </el-header>
      <!-- 中部 -->
      <el-main>

        <!-- 日报 -->
        <el-form
          ref="dayform"
          :model="dayform"
          label-width="90px"
          v-show="activeName=='first'?true:false"
        >
          <el-form-item
            label="选择日期"
            prop="dateof"
            style="width:230px"
          >
            <el-date-picker
              v-model="dayform.dateof"
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
              v-model="dayform.region"
              filterable
              placeholder="全部"
            >
              <el-option
                v-for="(item,index) in options"
                :label="'['+getString1(hexCharCodeToStr(item.nid))+'] ' + item.n_name + ' [' + item.n_local +']'"
                :value="item.nid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item
            label="开始时间"
            prop="starttime"
            style="width:210px"
          >
            <el-time-select
              format="HH"
              v-model="dayform.starttime"
              :picker-options="{
                start:'00:00',
                step: '01:00',
                end: '23:00',
              }"
              placeholder="选择时间"
            >
            </el-time-select>
          </el-form-item>

          <el-form-item
            label="结束时间"
            prop="endtime"
            style="width:210px"
          >
            <el-time-select
              format="HH"
              v-model="dayform.endtime"
              :picker-options="{
                start:'00:00',
                step: '01:00',
                end: '23:00',
              }"
              placeholder="选择时间"
            >
            </el-time-select>
          </el-form-item> -->

          <div>
            <el-button
              type="primary"
              @click="getOnedxday"
              style="margin-left:10px;"
            ><i class="el-icon-search"></i> 查 询</el-button>

            <el-button
              type="primary"
              @click="getYestoday"
              style="margin-left:10px;"
            ><i class="el-icon-arrow-left"></i> 上一日</el-button>

            <el-button
              type="primary"
              @click="getNextday"
              style="margin-left:10px;"
              :disabled="dayform.dateof == benchmark?true:false"
            >下一日<i class="el-icon-arrow-right"></i></el-button>

            <el-button
              size="medium"
              type="primary"
              class="three"
              @click="seedaypic"
            >图 表</el-button>

            <span style="margin-left:10px;color:#606266">(单位：kW/h)</span>

            <!-- <el-button
              size="medium"
              type="primary"
              class="three"
            >导 出</el-button> -->

            <!-- <el-button
              @click="goto"
              style="background: transparent;color:#fff;border: 1px solid #47d;"
            >同环比</el-button> -->
          </div>
        </el-form>

        <!-- 周报 -->
        <!-- <el-form
          ref="form"
          :model="form"
          label-width="90px"
          v-show="activeName=='second'?true:false"
        >
          <el-form-item
            label="选择日期"
            prop="dateof"
            style="width:240px"
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

          <div>
            <el-button
              type="primary"
              @click="getOnedx"
              style="margin-left:10px;"
            ><i class="el-icon-search"></i> 查 询</el-button>

            <el-button
              type="primary"
              @click="getYestoday"
              style="margin-left:10px;"
            ><i class="el-icon-arrow-left"></i> 上一周</el-button>

            <el-button
              type="primary"
              @click="getNextday"
              style="margin-left:10px;"
            >下一周<i class="el-icon-arrow-right"></i></el-button>

            <el-button
              size="medium"
              type="primary"
              class="three"
            >图 表</el-button>

            <el-button
              size="medium"
              type="primary"
              class="three"
            >导 出</el-button>

            <el-button
              @click="goto"
              style="background: transparent;color:#fff;border: 1px solid #47d;"
            >同环比</el-button>
          </div>
        </el-form> -->

        <!-- 月报 -->
        <el-form
          ref="monthform"
          :model="monthform"
          label-width="90px"
          v-show="activeName=='third'?true:false"
        >
          <el-form-item
            label="选择日期"
            prop="dateof"
            style="width:230px"
          >
            <el-date-picker
              v-model="monthform.dateof"
              type="month"
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
              v-model="monthform.region"
              filterable
              placeholder="全部"
            >
              <el-option
                v-for="(item,index) in options"
                :label="'['+getString1(hexCharCodeToStr(item.nid))+'] ' + item.n_name + ' [' + item.n_local +']'"
                :value="item.nid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item
            label="开始日期"
            prop="starttime"
            style="width:240px"
          >
            <el-date-picker
              v-model="monthform.starttime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item
            label="结束日期"
            prop="endtime"
            style="width:240px"
          >
            <el-date-picker
              v-model="monthform.endtime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item> -->

          <div>
            <el-button
              type="primary"
              @click="getOnedxmonth"
              style="margin-left:10px;"
            ><i class="el-icon-search"></i> 查 询</el-button>

            <!-- <el-button
              type="primary"
              @click="getYestoday"
              style="margin-left:10px;"
            ><i class="el-icon-arrow-left"></i> 上一月</el-button>

            <el-button
              type="primary"
              @click="getNextday"
              style="margin-left:10px;"
            >下一月<i class="el-icon-arrow-right"></i></el-button> -->

            <el-button
              size="medium"
              type="primary"
              class="three"
              @click="seemonthpic"
            >图 表</el-button>

            <span style="margin-left:10px;color:#606266">(单位：kW/h)</span>

            <!-- <el-button
              size="medium"
              type="primary"
              class="three"
            >导 出</el-button> -->

            <!-- <el-button
              @click="goto"
              style="background: transparent;color:#fff;border: 1px solid #47d;"
            >同环比</el-button> -->
          </div>
        </el-form>

        <!-- 年报 -->
        <el-form
          ref="yearform"
          :model="yearform"
          label-width="90px"
          v-show="activeName=='fourth'?true:false"
        >
          <el-form-item
            label="选择日期"
            prop="dateof"
            style="width:230px"
          >
            <el-date-picker
              v-model="yearform.dateof"
              type="year"
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
              v-model="yearform.region"
              filterable
              placeholder="全部"
            >
              <el-option
                v-for="(item,index) in options"
                :label="'['+getString1(hexCharCodeToStr(item.nid))+'] ' + item.n_name + ' [' + item.n_local +']'"
                :value="item.nid"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item
            label="开始时间"
            prop="starttime"
            style="width:210px"
          >
            <el-date-picker
              style="width:132px"
              v-model="yearform.starttime"
              type="month"
              placeholder="选择月"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item
            label="结束时间"
            prop="endtime"
            style="width:223px"
          >
            <el-date-picker
              style="width:132px"
              v-model="yearform.endtime"
              type="month"
              placeholder="选择月"
            >
            </el-date-picker>
          </el-form-item> -->

          <div>
            <el-button
              type="primary"
              @click="getOnedxyear"
              style="margin-left:10px;"
            ><i class="el-icon-search"></i> 查 询</el-button>

            <!-- <el-button
              type="primary"
              @click="getYestoday"
              style="margin-left:10px;"
            ><i class="el-icon-arrow-left"></i> 上一年</el-button>

            <el-button
              type="primary"
              @click="getNextday"
              style="margin-left:10px;"
            >下一年<i class="el-icon-arrow-right"></i></el-button> -->

            <el-button
              size="medium"
              type="primary"
              class="three"
              @click="seeyearpic"
            >图 表</el-button>

            <span style="margin-left:10px;color:#606266">(单位：kW/h)</span>

            <!-- <el-button
              size="medium"
              type="primary"
              class="three"
            >导 出</el-button> -->

            <!-- <el-button
              @click="goto"
              style="background: transparent;color:#fff;border: 1px solid #47d;"
            >同环比</el-button> -->
          </div>
        </el-form>

        <!-- 日报 -->
        <el-table
          v-show="activeName=='first'?true:false"
          :data="daytableData"
          border
          stripe
          ref="table1"
          :max-height="tableHeight1"
          style="width: 99%;margin:0 auto"
          @selection-change="handleSelectionChange1"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          >
          </el-table-column>

          <el-table-column
            fixed
            prop="name"
            show-overflow-tooltip
            label="回路名称"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['0']?true:false:true"
            prop="0"
            show-overflow-tooltip
            label="00时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['1']?true:false:true"
            prop="1"
            show-overflow-tooltip
            label="01时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['2']?true:false:true"
            prop="2"
            show-overflow-tooltip
            label="02时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['3']?true:false:true"
            prop="3"
            show-overflow-tooltip
            label="03时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['4']?true:false:true"
            prop="4"
            show-overflow-tooltip
            label="04时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['5']?true:false:true"
            prop="5"
            show-overflow-tooltip
            label="05时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['6']?true:false:true"
            prop="6"
            show-overflow-tooltip
            label="06时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['7']?true:false:true"
            prop="7"
            show-overflow-tooltip
            label="07时"
            align="center"
            min-width="120"
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
            v-if="daytableData.length>0?daytableData[0]['8']?true:false:true"
            prop="8"
            show-overflow-tooltip
            label="08时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['9']?true:false:true"
            prop="9"
            show-overflow-tooltip
            label="09时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['10']?true:false:true"
            prop="10"
            show-overflow-tooltip
            label="10时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['11']?true:false:true"
            prop="11"
            show-overflow-tooltip
            label="11时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['12']?true:false:true"
            prop="12"
            show-overflow-tooltip
            label="12时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['13']?true:false:true"
            prop="13"
            show-overflow-tooltip
            label="13时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['14']?true:false:true"
            prop="14"
            show-overflow-tooltip
            label="14时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['15']?true:false:true"
            prop="15"
            show-overflow-tooltip
            label="15时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['16']?true:false:true"
            prop="16"
            show-overflow-tooltip
            label="16时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['17']?true:false:true"
            prop="17"
            show-overflow-tooltip
            label="17时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['18']?true:false:true"
            prop="18"
            show-overflow-tooltip
            label="18时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['19']?true:false:true"
            prop="19"
            show-overflow-tooltip
            label="19时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['20']?true:false:true"
            prop="20"
            show-overflow-tooltip
            label="20时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['21']?true:false:true"
            prop="21"
            show-overflow-tooltip
            label="21时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['22']?true:false:true"
            prop="22"
            show-overflow-tooltip
            label="22时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['23']?true:false:true"
            prop="23"
            show-overflow-tooltip
            label="23时"
            align="center"
            min-width="120"
          ></el-table-column>

          <el-table-column
            prop="sum"
            show-overflow-tooltip
            label="总计"
            align="center"
            min-width="120"
          ></el-table-column>
        </el-table>

        <!-- 周报 -->
        <!-- <el-table
          v-show="activeName=='second'?true:false"
          :data="tableData"
          border
          max-height="670"
          style="width: 99%;margin:0 auto"
        >
          <el-table-column
            prop="nid"
            show-overflow-tooltip
            label="电箱名称"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="46"
            show-overflow-tooltip
            label="上两周"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="dzz"
            show-overflow-tooltip
            label="上一周"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv1"
            show-overflow-tooltip
            label="本周"
            align="center"
            min-width="100"
          ></el-table-column>

          <el-table-column
            prop="vv2"
            show-overflow-tooltip
            label="总计"
            align="center"
            min-width="100"
          ></el-table-column>

        </el-table> -->

        <!-- 月报 -->
        <el-table
          v-show="activeName=='third'?true:false"
          :data="monthtableData"
          border
          stripe
          ref="table2"
          :max-height="tableHeight2"
          style="width: 99%;margin:0 auto"
          @selection-change="handleSelectionChange2"
        >

          <el-table-column
            type="selection"
            width="55"
            align="center"
          >
          </el-table-column>

          <el-table-column
            fixed
            prop="name"
            show-overflow-tooltip
            label="回路名称"
            align="center"
            min-width="90"
          ></el-table-column>

          <el-table-column
            prop="0"
            show-overflow-tooltip
            label="01日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['0']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="1"
            show-overflow-tooltip
            label="02日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['1']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="2"
            show-overflow-tooltip
            label="03日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['2']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="3"
            show-overflow-tooltip
            label="04日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['3']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="4"
            show-overflow-tooltip
            label="05日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['4']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="5"
            show-overflow-tooltip
            label="06日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['5']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="6"
            show-overflow-tooltip
            label="07日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['6']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="7"
            show-overflow-tooltip
            label="08日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['7']?true:false:true"
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
            prop="8"
            show-overflow-tooltip
            label="09日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['8']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="9"
            show-overflow-tooltip
            label="10日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['9']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="10"
            show-overflow-tooltip
            label="11日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['10']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="11"
            show-overflow-tooltip
            label="12日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['11']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="12"
            show-overflow-tooltip
            label="13日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['12']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="13"
            show-overflow-tooltip
            label="14日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['13']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="14"
            show-overflow-tooltip
            label="15日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['14']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="15"
            show-overflow-tooltip
            label="16日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['15']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="16"
            show-overflow-tooltip
            label="17日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['16']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="17"
            show-overflow-tooltip
            label="18日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['17']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="18"
            show-overflow-tooltip
            label="19日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['18']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="19"
            show-overflow-tooltip
            label="20日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['19']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="20"
            show-overflow-tooltip
            label="21日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['20']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="21"
            show-overflow-tooltip
            label="22日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['21']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="22"
            show-overflow-tooltip
            label="23日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['22']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="23"
            show-overflow-tooltip
            label="24日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['23']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="24"
            show-overflow-tooltip
            label="25日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['24']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="25"
            show-overflow-tooltip
            label="26日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['25']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="26"
            show-overflow-tooltip
            label="27日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['26']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="27"
            show-overflow-tooltip
            label="28日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['27']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="28"
            show-overflow-tooltip
            label="29日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['28']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="29"
            show-overflow-tooltip
            label="30日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['29']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="30"
            show-overflow-tooltip
            label="31日"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['30']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="sum"
            show-overflow-tooltip
            label="总计"
            align="center"
            min-width="120"
          ></el-table-column>

        </el-table>

        <!-- 年报 -->
        <el-table
          v-show="activeName=='fourth'?true:false"
          :data="yeartableData"
          border
          stripe
          ref="table3"
          :max-height="tableHeight3"
          style="width: 99%;margin:0 auto"
          @selection-change="handleSelectionChange3"
        >

          <el-table-column
            type="selection"
            width="55"
            align="center"
          >
          </el-table-column>

          <el-table-column
            fixed
            prop="name"
            show-overflow-tooltip
            label="回路名称"
            align="center"
            min-width="90"
          ></el-table-column>

          <el-table-column
            prop="0"
            show-overflow-tooltip
            label="1月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['0'] == 0|| yeartableData[0]['0']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="1"
            show-overflow-tooltip
            label="2月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['1'] == 0|| yeartableData[0]['1']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="2"
            show-overflow-tooltip
            label="3月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['2'] == 0|| yeartableData[0]['2']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="3"
            show-overflow-tooltip
            label="4月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['3'] == 0|| yeartableData[0]['3']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="4"
            show-overflow-tooltip
            label="5月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['4'] == 0|| yeartableData[0]['4']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="5"
            show-overflow-tooltip
            label="6月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['5'] == 0|| yeartableData[0]['5']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="6"
            show-overflow-tooltip
            label="7月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['6'] == 0|| yeartableData[0]['6']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="7"
            show-overflow-tooltip
            label="8月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['7'] == 0|| yeartableData[0]['7']?true:false:true"
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
            prop="8"
            show-overflow-tooltip
            label="9月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['8'] == 0|| yeartableData[0]['8']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="9"
            show-overflow-tooltip
            label="10月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['9'] == 0|| yeartableData[0]['9']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="10"
            show-overflow-tooltip
            label="11月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['10'] == 0|| yeartableData[0]['10']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="11"
            show-overflow-tooltip
            label="12月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['11'] == 0|| yeartableData[0]['11']?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="sum"
            show-overflow-tooltip
            label="总计"
            align="center"
            min-width="120"
          ></el-table-column>

        </el-table>

        <el-dialog
          title="日报"
          :visible.sync="dialogVisible1"
          :close-on-click-modal='false'
          width="60%"
        >
          <div id="Daily"></div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="dialogVisible1 = false"
            >关 闭</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="月报"
          :visible.sync="dialogVisible2"
          :close-on-click-modal='false'
          width="60%"
        >
          <div id="Monthly"></div>
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

        <el-dialog
          title="年报"
          :visible.sync="dialogVisible3"
          :close-on-click-modal='false'
          width="60%"
        >
          <div id="annual"></div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="dialogVisible3 = false"
            >关 闭</el-button>
          </span>
        </el-dialog>

      </el-main>
      <!-- 尾部 -->
      <el-footer>
        <!-- <p
          v-if="activeName == 'fourth'"
          style="color:#ccc;font-weight: bold;"
        >本月总用电量不展示，只展示完整月份</p> -->

        <!-- 分页 -->
        <!-- <el-pagination
          v-if="fenYe.total>13"
          @current-change="handleCurrentChange"
          :current-page.sync="fenYe.currentPage"
          layout="total, prev, pager, next, jumper"
          :page-size="13"
          :total="fenYe.total"
        ></el-pagination> -->
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

      tableHeight1: '670',
      tableHeight2: '670',
      tableHeight3: '670',

      // 日检索
      dayform: {
        dateof: "",
        starttime: "",
        endtime: "",
        region: "",
        // linename: "",
        // interval: "",
      },
      // 月检索
      monthform: {
        dateof: "",
        starttime: "",
        endtime: "",
        region: "",
      },
      // 年检索
      yearform: {
        dateof: "",
        starttime: "",
        endtime: "",
        region: "",
      },
      // 获取所有设备
      options: [],
      // 获取设备下线路
      options1: [],
      // 日列表数据
      daytableData: [],
      // 月列表数据
      monthtableData: [],
      // 年列表数据
      yeartableData: [],

      // 日月年切换
      activeName: 'first',

      // 选择表格数据
      multipleSelection1: [],
      multipleSelection2: [],
      multipleSelection3: [],

      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,

      student1: null,
      student2: null,
      student3: null,

      // 日起基准
      benchmark: "",

      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      }
    };
  },

  // computed: {
  //   datefun() {
  //     let date = new Date()
  //     if (dayform.dateof == new Date().toLocaleDateString())
  //   }
  // },

  methods: {
    handleClick(tab, activedom) {
      this.activeName = tab

      $(activedom.srcElement).addClass('avtivetabbtn')

      $(activedom.srcElement).siblings().removeClass('avtivetabbtn')
      // console.log(tab, event);
      if (this.activeName == "third") {
        this.getListmonth()
      } else if (this.activeName == "fourth") {
        this.getListyear()
      }
    },

    // 日数据
    getListday(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/SourceData/getHuData";
      let data = {
        data: {
          dt: new Date(this.dayform.dateof).getTime() / 1000, //日期
          uid: uid,        //用户id
          // uid: localStorage.getItem('uid'),        //用户id
          nid: this.dayform.region,
          type: "day",      //day 日报 week 周报 month 月报 year 年报
          start: this.dayform.starttime.split(':')[0],        //开始时间  当type 为 day 时 可选
          end: this.dayform.endtime.split(':')[0],
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.$refs.table1.$el.style.width = '99%'

        this.daytableData = res.data.data;

        for (const key in this.daytableData[0]) {
          this.daytableData[0][key] = String(this.daytableData[0][key])
        }
        this.daytableData[0].data = this.daytableData[0].data.split(",")

      });
    },
    // 月数据
    getListmonth(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/SourceData/getHuData";
      let data = {
        data: {
          dt: new Date(this.monthform.dateof).getTime() / 1000, //日期
          uid: uid,        //用户id
          // uid: localStorage.getItem('uid'),        //用户id
          nid: this.monthform.region,
          type: "month",      //day 日报 week 周报 month 月报 year 年报
          start: this.monthform.starttime.split(':')[0],        //开始时间  当type 为 day 时 可选
          end: this.monthform.endtime.split(':')[0]
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableHeight2 = window.innerHeight - this.$refs.table2.$el.offsetTop - 69;

        this.monthtableData = res.data.data;

        for (const key in this.monthtableData[0]) {
          this.monthtableData[0][key] = String(this.monthtableData[0][key])
        }
        this.monthtableData[0].data = this.monthtableData[0].data.split(",")

      });
    },
    // 年数据
    getListyear(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/SourceData/getHuData";
      let data = {
        data: {
          dt: new Date(this.yearform.dateof).getTime() / 1000, //日期
          uid: uid,        //用户id
          // uid: localStorage.getItem('uid'),        //用户id
          nid: this.yearform.region,
          type: "year",      //day 日报 week 周报 month 月报 year 年报
          start: this.yearform.starttime.split(':')[0],        //开始时间  当type 为 day 时 可选
          end: this.yearform.endtime.split(':')[0]
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.tableHeight3 = window.innerHeight - this.$refs.table3.$el.offsetTop - 69;

        this.yeartableData = res.data.data;

        // for (let i = 0; i < this.options.length; i++) {
        //   for (let j = 0; j < this.tableData.length; j++) {
        //     if (this.tableData[i].nid == this.options[j].nid) {
        //       this.tableData[i].nid = this.options[j].n_name
        //     }
        //   }
        // }
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

        this.dayform.region = this.options[0].nid
        this.monthform.region = this.options[0].nid
        this.yearform.region = this.options[0].nid
        // this.form.region = this.options[0].mzid

        this.getListday()
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

    // 选择表格数据
    handleSelectionChange1(val) {
      // console.log(val)
      this.multipleSelection1 = val;
    },

    // 选择表格数据
    handleSelectionChange2(val) {
      // console.log(val)
      this.multipleSelection2 = val;
    },

    // 选择表格数据
    handleSelectionChange3(val) {
      // console.log(val)
      this.multipleSelection3 = val;
    },

    // 日报图表
    seedaypic() {
      if (this.multipleSelection1.length > 0) {
        if (this.multipleSelection1.length > 0 && this.multipleSelection1.length < 6) {
          this.dialogVisible1 = true
          this.getStudent1()
        } else {
          this.$message({
            showClose: true,
            message: '最多不可超过5个线路',
            type: 'warning'
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择线路',
          type: 'warning'
        });
      }
    },

    // 月报图表
    seemonthpic() {
      if (this.multipleSelection2.length > 0) {
        if (this.multipleSelection2.length > 0 && this.multipleSelection2.length < 6) {
          this.dialogVisible2 = true
          this.getStudent2()
        } else {
          this.$message({
            showClose: true,
            message: '最多不可超过5个线路',
            type: 'warning'
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择线路',
          type: 'warning'
        });
      }
    },

    // 年报图表
    seeyearpic() {
      if (this.multipleSelection3.length > 0) {
        if (this.multipleSelection3.length > 0 && this.multipleSelection3.length < 6) {
          this.dialogVisible3 = true
          this.getStudent3()
        } else {
          this.$message({
            showClose: true,
            message: '最多不可超过5个线路',
            type: 'warning'
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择线路',
          type: 'warning'
        });
      }
    },

    // 日报图
    getStudent1() {
      if (this.student1 != null) {
        this.student1.clear()
      }

      let _this = this;
      let lenght = this.multipleSelection1[0].data.length
      let arr = ['00时', '01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
      arr.length = lenght
      setTimeout(() => {
        this.student1 = _this.$echarts.init(document.getElementById("Daily"));
        $(window).resize(function () {
          _this.student1.resize()
        });
        this.student1.setOption({
          // backgroundColor: '#273c87',
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'center',
            text: this.pictitle,
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          legend: {
            // data: [],
            // left: 160
            textStyle: {//图例文字的样式
              color: '#606060',
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: arr,
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
          },
          yAxis: {
            name: "单位：(kW/h)",
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            splitLine: {
              show: true,
              // lineStyle: {
              //   color: ['#47d'],
              //   width: 1,
              //   type: 'solid'
              // }
            },
            boundaryGap: [0, '100%'],
            axisLine: {     //x轴坐标轴
              show: false
            },
            axisTick: {		//x轴刻度线
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#606060',//坐标值得具体的颜色
              }
            },
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',

            },
            {
              type: 'inside',
              xAxisIndex: 0,
              filterMode: 'empty',

            }
          ],
          series: [
            {
              name: this.multipleSelection1[0].n_name,
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              // color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531', //图例的颜色
              // lineStyle: {
              //   color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531' //改变折线颜色
              // },
              data: this.multipleSelection1[0].data,
            },
          ]
        });
        var series = []
        var color = ['#158C86', '#1187EB', '#3D14ED', '#5CED14', '#EDB714']
        // var color = ['#33FFFF', '#339933', '#33CCFF', '#33CCCC', '#3399FF', '#99FFCC', '#CCFF66', '#CC99CC', '#CC9900', '#CC6666', '#CC66FF', '#FF9933']
        for (var i = 0; i < this.multipleSelection1.length; i++) {
          series.push({
            name: this.multipleSelection1[i].name,
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            color: color[i], //图例的颜色
            lineStyle: {
              color: color[i] //改变折线颜色
            },
            data: this.multipleSelection1[i].data,
          })

          this.student1.setOption({
            series
          })
        }
        _this.student1.resize()
      }, 0)
    },

    // 月报图
    getStudent2() {
      if (this.student2 != null) {
        this.student2.clear()
      }

      let _this = this;
      let length = this.multipleSelection2[0].data.length
      let arr = ['01日', '02日', '03日', '04日', '05日', '06日', '07日', '08日', '09日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日']
      arr.length = length
      setTimeout(() => {
        this.student2 = _this.$echarts.init(document.getElementById("Monthly"));
        $(window).resize(function () {
          _this.student2.resize()
        });
        this.student2.setOption({
          // backgroundColor: '#273c87',
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'center',
            text: this.pictitle,
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          legend: {
            // data: [],
            // left: 160
            textStyle: {//图例文字的样式
              color: '#606060',
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: arr,
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
          },
          yAxis: {
            name: "单位：(kW/h)",
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            splitLine: {
              show: true,
              // lineStyle: {
              //   color: ['#47d'],
              //   width: 1,
              //   type: 'solid'
              // }
            },
            boundaryGap: [0, '100%'],
            axisLine: {     //x轴坐标轴
              show: false
            },
            axisTick: {		//x轴刻度线
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#606060',//坐标值得具体的颜色
              }
            },
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',

            },
            {
              type: 'inside',
              xAxisIndex: 0,
              filterMode: 'empty',

            }
          ],
          series: [
            {
              name: this.multipleSelection2[0].n_name,
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              // color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531', //图例的颜色
              // lineStyle: {
              //   color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531' //改变折线颜色
              // },
              data: this.multipleSelection2[0].data,
            },
          ]
        });
        var series = []
        var color = ['#158C86', '#1187EB', '#3D14ED', '#5CED14', '#EDB714']
        for (var i = 0; i < this.multipleSelection2.length; i++) {
          series.push({
            name: this.multipleSelection2[i].name,
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            color: color[i], //图例的颜色
            lineStyle: {
              color: color[i] //改变折线颜色
            },
            data: this.multipleSelection2[i].data,
          })

          this.student2.setOption({
            series
          })
        }
        _this.student1.resize()
      }, 0)
    },

    // 年报图
    getStudent3() {
      if (this.student3 != null) {
        this.student3.clear()
      }

      let _this = this;
      let length = this.multipleSelection3[0].data.length
      let arr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      arr.length = length
      setTimeout(() => {
        this.student3 = _this.$echarts.init(document.getElementById("annual"));
        $(window).resize(function () {
          _this.student3.resize()
        });
        this.student3.setOption({
          // backgroundColor: '#273c87',
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'center',
            text: this.pictitle,
            textStyle: { //主标题文本样式
              color: "#606060"
            },
          },
          legend: {
            // data: [],
            // left: 160
            textStyle: {//图例文字的样式
              color: '#606060',
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: arr,
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
          },
          yAxis: {
            name: "单位：(kW/h)",
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
            splitLine: {
              show: true,
              // lineStyle: {
              //   color: ['#47d'],
              //   width: 1,
              //   type: 'solid'
              // }
            },
            boundaryGap: [0, '100%'],
            axisLine: {     //x轴坐标轴
              show: false
            },
            axisTick: {		//x轴刻度线
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#606060',//坐标值得具体的颜色
              }
            },
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'empty',

            },
            {
              type: 'inside',
              xAxisIndex: 0,
              filterMode: 'empty',

            }
          ],
          series: [
            {
              name: this.multipleSelection3[0].n_name,
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              // color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531', //图例的颜色
              // lineStyle: {
              //   color: this.listdata1.length > 0 ? "#FFD700	" : '#c23531' //改变折线颜色
              // },
              data: this.multipleSelection3[0].data,
            },
          ]
        });
        var series = []
        var color = ['#158C86', '#1187EB', '#3D14ED', '#5CED14', '#EDB714']
        for (var i = 0; i < this.multipleSelection3.length; i++) {
          series.push({
            name: this.multipleSelection3[i].name,
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            color: color[i], //图例的颜色
            lineStyle: {
              color: color[i] //改变折线颜色
            },
            data: this.multipleSelection3[i].data,
          })

          this.student3.setOption({
            series
          })
        }
        _this.student1.resize()
      }, 0)
    },

    // 当前日期
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      this.dayform.dateof = currentdate
      this.monthform.dateof = currentdate
      this.yearform.dateof = currentdate

      this.benchmark = currentdate
    },

    // 下一天
    getNextday() {
      // var today = document.getElementById("lang0").value;

      var t = new Date(Date.parse(this.dayform.dateof.replace(/-/g, "/")));

      var tm = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1);

      var m = '0' + (tm.getMonth() + 1);
      var d = '0' + tm.getDate()

      // document.getElementById("lang0").value = tm.getFullYear() + '-' + m.substr(m.length - 2) + '-' + d.substr(d.length - 2);
      this.dayform.dateof = tm.getFullYear() + '-' + m.substr(m.length - 2) + '-' + d.substr(d.length - 2);

      this.getOnedxday()
    },

    // 上一天
    getYestoday(date) {
      // var date = document.getElementById("lang0").value;
      // var t = new Date(Date.parse(date.replace(/-/g, "/")));
      var t = new Date(Date.parse(this.dayform.dateof.replace(/-/g, "/")));

      var yesterday_milliseconds = t.getTime() - 1000 * 60 * 60 * 24;
      var yesterday = new Date();
      yesterday.setTime(yesterday_milliseconds);
      var strYear = yesterday.getFullYear();
      var strDay = yesterday.getDate();
      var strMonth = yesterday.getMonth() + 1;
      if (strMonth < 10) { strMonth = "0" + strMonth; }
      if (strDay < 10) { strDay = "0" + strDay }
      var datastr = strYear + "-" + strMonth + "-" + strDay;
      // document.getElementById("lang0").value = datastr;
      this.dayform.dateof = datastr;

      this.getOnedxday()
    },

    // 获取日数据
    getOnedxday() {
      this.getListday(1)
    },
    // 获取月数据
    getOnedxmonth() {
      this.getListmonth(1)
    },
    // 获取年数据
    getOnedxyear() {
      this.getListyear(1)
    },

    // 同环比
    goto() {
      this.$router.push({ path: '/compare' })
    },
    // 分页 - 当前页数
    handleCurrentChange(val) {
      this.getList(val);
    },
  },
  mounted() {
    this.$refs.table1.$el.style.width = '99%'
    this.tableHeight1 = window.innerHeight - this.$refs.table1.$el.offsetTop - 69;
  },
  created() {
    // this.getList(1);
    this.getOptions();

    this.getNowFormatDate()
  },
  beforeUpdate() {
    this.$nextTick(() => { //在数据加载完，重新渲染表格
      this.$refs['table1'].doLayout();
      this.$refs['table2'].doLayout();
      this.$refs['table3'].doLayout();
    })
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
    margin-bottom: 0;
    // background: #1d3278;
    // margin: 10px 0;
    .btngroup {
      text-align: left;
      padding-top: 15px;
      box-sizing: border-box;
    }
    .tabbtn {
      border-radius: 4px;
      padding: 7px 12px;
      background: transparent;
      border: 1px solid #1478c5;
      color: #1478c5;
      margin-left: 10px;
      outline: none;
      cursor: pointer;
    }
    .avtivetabbtn {
      border: none;
      color: #fff;
      background: #1478c5;
    }
  }

  .el-main /deep/ .el-table__fixed {
    height: 100% !important; //设置高优先，以覆盖内联样式
    // background: #213777;
  }
  .el-main /deep/ .el-table__fixed::before {
    height: 0px !important;
  }
  .el-main /deep/ .el-table .cell {
    height: 23px !important;
  }

  .el-main {
    color: #333;
    text-align: center;
    padding: 0;
    height: 100%;

    .el-form {
      text-align: left;
      margin-top: 10px;
      // overflow: hidden;
      display: flex;
      background: #fff;
      width: 99%;
      margin: 10px auto;
      padding-top: 20px;
      .el-form-item {
        font-weight: bold;
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
      .el-date-editor--time-select {
        width: 120px;
      }

      // .el-form-item /deep/ .el-form-item__label,
      // .el-form-item /deep/ .el-checkbox__label {
      //   color: #ccc !important;
      // }

      .el-date-editor.el-input,
      .el-date-editor.el-input__inner,
      .el-date-editor--date.el-input,
      .el-date-editor--date.el-input__inner {
        width: 150px;
      }
      .dianxiang {
        width: 315px;

        .el-select {
          width: 100%;
        }
      }

      // .el-form-item /deep/ .el-form-item__label {
      //   color: #ccc !important;
      // }
      .el-form-item /deep/ .el-input--suffix .el-input__inner {
        background: #f3f3f3;
        border: none;
        border-radius: 0;
      }

      .three {
        // background: url(../../../public/static/images/daochu.png) no-repeat 12px 6px;
        background-size: 21px 21px;
        // padding-left: 38px;
        background: transparent;
        border: 1px solid #1478c5;
        color: #1478c5;
      }
    }

    .maintable {
      // color: #ccc;
      td {
        padding: 12px 10px;
      }
    }

    @media screen and (max-width: 1200px) {
      #Daily,
      #Monthly,
      #annual {
        width: 100%;
        height: 290px;
        // border: 1px solid #333;
      }
    }

    @media screen and (min-width: 1200px) {
      #Daily,
      #Monthly,
      #annual {
        width: 100%;
        height: 490px;
        // border: 1px solid #333;
      }
    }

    #dayechart,
    #monthechart,
    #yearechart {
      width: 100%;
      height: 690px;
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
  