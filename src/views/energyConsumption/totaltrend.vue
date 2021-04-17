<template>
  <!-- 用电监测 - 总能耗 -->
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
            style="width:240px"
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

            <span style="margin-left:10px;color:#606266">(单位：kW/h)</span>

            <!-- <el-button
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
            style="width:240px"
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

          <!-- <el-form-item
            label="开始日期"
            prop="starttime"
            style="width:240px"
          >
            <el-date-picker
              v-model="monthform.starttime"
              type="date"
              placeholder="选择日期"
              popper-class="datetime"
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
              popper-class="datetime"
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

            <span style="margin-left:10px;color:#606266">(单位：kW/h)</span>

            <!-- <el-button
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
            style="width:240px"
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
              popper-class="datetime"
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
              popper-class="datetime"
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

            <span style="margin-left:10px;color:#606266">(单位：kW/h)</span>

            <!-- <el-button
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
          max-height="735"
          style="width: 99%;margin:0 auto"
        >
          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['1'] || daytableData[0]['1'] == 0?true:false:true"
            label="00时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['1'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['2'] || daytableData[0]['2'] == 0?true:false:true"
            label="01时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['2'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['3'] || daytableData[0]['3'] == 0?true:false:true"
            label="02时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['3'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['4'] || daytableData[0]['4'] == 0?true:false:true"
            label="03时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['4'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['5'] || daytableData[0]['5'] == 0?true:false:true"
            label="04时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['5'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['6'] || daytableData[0]['6'] == 0?true:false:true"
            label="05时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['6'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['7'] || daytableData[0]['7'] == 0?true:false:true"
            label="06时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['7'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['8'] || daytableData[0]['8'] == 0?true:false:true"
            label="07时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['8'].toFixed(2) }}</span>
            </template>
          </el-table-column>

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
            v-if="daytableData.length>0?daytableData[0]['9'] || daytableData[0]['9'] == 0?true:false:true"
            label="08时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['9'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['10'] || daytableData[0]['10'] == 0?true:false:true"
            label="09时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['10'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['11'] || daytableData[0]['11'] == 0?true:false:true"
            label="10时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['11'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['12'] || daytableData[0]['12'] == 0?true:false:true"
            label="11时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['12'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['13'] || daytableData[0]['13'] == 0?true:false:true"
            label="12时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['13'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['14'] || daytableData[0]['14'] == 0?true:false:true"
            label="13时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['14'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['15'] || daytableData[0]['15'] == 0?true:false:true"
            label="14时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['15'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['16'] || daytableData[0]['16'] == 0?true:false:true"
            label="15时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['16'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['17'] || daytableData[0]['17'] == 0?true:false:true"
            label="16时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['17'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['18'] || daytableData[0]['18'] == 0?true:false:true"
            label="17时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['18'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['19'] || daytableData[0]['19'] == 0?true:false:true"
            label="18时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['19'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['20'] || daytableData[0]['20'] == 0?true:false:true"
            label="19时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['20'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['21'] || daytableData[0]['21'] == 0?true:false:true"
            label="20时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['21'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['22'] || daytableData[0]['22'] == 0?true:false:true"
            label="21时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['22'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['23'] || daytableData[0]['23'] == 0?true:false:true"
            label="22时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['23'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="daytableData.length>0?daytableData[0]['24'] || daytableData[0]['24'] == 0?true:false:true"
            label="23时"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row['24'].toFixed(2) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="totalnum"
            show-overflow-tooltip
            label="总计"
            align="center"
            min-width="120"
          ></el-table-column>
        </el-table>

        <div
          v-show="activeName=='first'?true:false"
          id="dayechart"
        ></div>

        <!-- 周报 -->
        <!-- <el-table
          v-show="activeName=='second'?true:false"
          :data="tableData"
          border
          max-height="735"
          style="width: 99%;margin:0 auto"
        >

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
          max-height="735"
          style="width: 99%;margin:0 auto"
        >

          <el-table-column
            prop="01"
            show-overflow-tooltip
            label="1号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['01'] || monthtableData[0]['01'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="02"
            show-overflow-tooltip
            label="2号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['02'] || monthtableData[0]['02'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="03"
            show-overflow-tooltip
            label="3号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['03'] || monthtableData[0]['03'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="04"
            show-overflow-tooltip
            label="4号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['04'] || monthtableData[0]['04'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="05"
            show-overflow-tooltip
            label="5号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['05'] || monthtableData[0]['05'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="06"
            show-overflow-tooltip
            label="6号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['06'] || monthtableData[0]['06'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="07"
            show-overflow-tooltip
            label="7号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['07'] || monthtableData[0]['07'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="08"
            show-overflow-tooltip
            label="8号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['08'] || monthtableData[0]['08'] == 0?true:false:true"
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
            prop="09"
            show-overflow-tooltip
            label="9号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['09'] || monthtableData[0]['09'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="10"
            show-overflow-tooltip
            label="10号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['10'] || monthtableData[0]['10'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="11"
            show-overflow-tooltip
            label="11号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['11'] || monthtableData[0]['11'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="12"
            show-overflow-tooltip
            label="12号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['12'] ||monthtableData[0]['12'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="13"
            show-overflow-tooltip
            label="13号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['13'] || monthtableData[0]['13'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="14"
            show-overflow-tooltip
            label="14号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['14'] || monthtableData[0]['14'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="15"
            show-overflow-tooltip
            label="15号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['15'] || monthtableData[0]['15'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="16"
            show-overflow-tooltip
            label="16号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['16'] || monthtableData[0]['16'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="17"
            show-overflow-tooltip
            label="17号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['17'] || monthtableData[0]['17'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="18"
            show-overflow-tooltip
            label="18号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['18'] || monthtableData[0]['18'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="19"
            show-overflow-tooltip
            label="19号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['19'] || monthtableData[0]['19'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="20"
            show-overflow-tooltip
            label="20号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['20'] || monthtableData[0]['20'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="21"
            show-overflow-tooltip
            label="21号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['21'] || monthtableData[0]['21'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="22"
            show-overflow-tooltip
            label="22号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['22'] || monthtableData[0]['22'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="23"
            show-overflow-tooltip
            label="23号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['23'] || monthtableData[0]['23'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="24"
            show-overflow-tooltip
            label="24号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['24'] || monthtableData[0]['24'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="25"
            show-overflow-tooltip
            label="25号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['25'] || monthtableData[0]['25'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="26"
            show-overflow-tooltip
            label="26号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['26'] || monthtableData[0]['26'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="27"
            show-overflow-tooltip
            label="27号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['27'] || monthtableData[0]['27'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="28"
            show-overflow-tooltip
            label="28号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['28'] || monthtableData[0]['28'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="29"
            show-overflow-tooltip
            label="29号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['29'] || monthtableData[0]['29'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="30"
            show-overflow-tooltip
            label="30号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['30'] || monthtableData[0]['30'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="31"
            show-overflow-tooltip
            label="31号"
            align="center"
            min-width="120"
            v-if="monthtableData.length>0?monthtableData[0]['31'] || monthtableData[0]['31'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="totalnum"
            show-overflow-tooltip
            label="总计"
            align="center"
            min-width="120"
          ></el-table-column>
        </el-table>

        <div
          v-show="activeName=='third'?true:false"
          id="monthechart"
        ></div>

        <!-- 年报 -->
        <el-table
          v-show="activeName=='fourth'?true:false"
          :data="yeartableData"
          border
          stripe
          max-height="735"
          style="width: 99%;margin:0 auto"
        >

          <el-table-column
            prop="01"
            show-overflow-tooltip
            label="1月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['01'] || yeartableData[0]['01'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="02"
            show-overflow-tooltip
            label="2月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['02'] || yeartableData[0]['02'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="03"
            show-overflow-tooltip
            label="3月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['03'] || yeartableData[0]['03'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="04"
            show-overflow-tooltip
            label="4月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['04'] || yeartableData[0]['04'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="05"
            show-overflow-tooltip
            label="5月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['05'] || yeartableData[0]['05'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="06"
            show-overflow-tooltip
            label="6月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['06'] || yeartableData[0]['06'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="07"
            show-overflow-tooltip
            label="7月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['07'] || yeartableData[0]['07'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="08"
            show-overflow-tooltip
            label="8月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['08'] || yeartableData[0]['08'] == 0?true:false:true"
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
            prop="09"
            show-overflow-tooltip
            label="9月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['09'] || yeartableData[0]['09'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="10"
            show-overflow-tooltip
            label="10月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['10'] || yeartableData[0]['10'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="11"
            show-overflow-tooltip
            label="11月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['11'] || yeartableData[0]['11'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="12"
            show-overflow-tooltip
            label="12月"
            align="center"
            min-width="100"
            v-if="yeartableData.length>0?yeartableData[0]['12'] || yeartableData[0]['12'] == 0?true:false:true"
          ></el-table-column>

          <el-table-column
            prop="totalnum"
            show-overflow-tooltip
            label="总计"
            align="center"
            min-width="90"
          ></el-table-column>

        </el-table>

        <div
          v-show="activeName=='fourth'?true:false"
          id="yearechart"
        ></div>

      </el-main>
      <!-- 尾部 -->
      <el-footer>
        <!-- <p
          v-if="activeName == 'fourth'"
          style="color:#606266;font-weight: bold;"
        >本月总用电量不展示，只展示完整月份</p> -->
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
      // 日检索
      dayform: {
        dateof: "",
        starttime: "",
        endtime: ""
        // region: "",
        // linename: "",
        // interval: "",
      },
      // 月检索
      monthform: {
        dateof: "",
        starttime: "",
        endtime: ""
      },
      // 年检索
      yearform: {
        dateof: "",
        starttime: "",
        endtime: ""
      },

      // 日列表数据
      daytableData: [],
      // 月列表数据
      monthtableData: [],
      // 年列表数据
      yeartableData: [],

      // 日总能耗数据图
      picday: [],
      // 月总能耗数据图
      picmonth: [],
      picmonthdate: [],
      // 年总能耗数据图
      picyear: [],
      picyeartitle: [],

      // 日起基准
      benchmark: "",

      activeName: 'first',

    };
  },
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
      let url = this.urlb + "/api3/SourceData/GetUserTotalData";
      let data = {
        data: {
          dt: new Date(this.dayform.dateof).getTime() / 1000, //日期
          uid: uid,        //用户id
          // uid: localStorage.getItem('uid'),        //用户id
          gid: localStorage.getItem('gid'), //企业id
          type: "day",      //day 日报 week 周报 month 月报 year 年报
          start: this.dayform.starttime.split(':')[0],        //开始时间  当type 为 day 时 可选
          end: this.dayform.endtime.split(':')[0]
        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        this.$refs.table1.$el.style.width = '99%'

        if (res.data.code == 100) {
          this.$message({
            showClose: true,
            message: '请选择电箱计数',
            type: 'warning'
          });
        } else {
          this.daytableData = []
          this.daytableData.push(res.data.data);
          this.daytableData[0].totalnum = res.data.sum

          this.picday = res.data.arrlist
          // for (let i in res.data.data) {
          //   this.picday.push(res.data.data[i])
          //   this.daytableData[0].totalnum += res.data.data[i]
          // }

          this.getStudentday()
        }
      });
    },
    // 月数据
    getListmonth(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/SourceData/GetUserTotalData";
      let data = {
        data: {
          dt: new Date(this.monthform.dateof).getTime() / 1000, //日期
          uid: uid,        //用户id
          // uid: localStorage.getItem('uid'),        //用户id
          gid: localStorage.getItem('gid'), //企业id
          type: "month",      //day 日报 week 周报 month 月报 year 年报
          start: this.monthform.starttime.split(':')[0],        //开始时间  当type 为 day 时 可选
          end: this.monthform.endtime.split(':')[0]

        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        if (res.data.code == 100) {
          this.$message({
            showClose: true,
            message: '请选择电箱计数',
            type: 'warning'
          });
        } else {
          this.monthtableData = []
          this.monthtableData.push(res.data.data);
          this.monthtableData[0].totalnum = res.data.sum
          this.picmonth = res.data.arrlist

          this.picmonthdate = Object.keys(res.data.data)
          this.picmonthdate.pop()
          for (let i = 0; i < this.picmonthdate.length; i++) {
            for (let j = i + 1; j < this.picmonthdate.length; j++) {
              if (this.picmonthdate[i] > this.picmonthdate[j]) {
                let temp = this.picmonthdate[i]
                this.picmonthdate[i] = this.picmonthdate[j]
                this.picmonthdate[j] = temp
              }
            }
            this.picmonthdate[i] = this.picmonthdate[i] + '号'
          }

          this.getStudentmonth()
        }
      });
    },
    // 年数据
    getListyear(page) {
      let username = localStorage.getItem("username");
      let uid = localStorage.getItem(username + 'uid');
      let type = "post";
      let url = this.urlb + "/api3/SourceData/GetUserTotalData";
      let data = {
        data: {
          dt: new Date(this.yearform.dateof).getTime() / 1000, //日期
          uid: uid,        //用户id
          // uid: localStorage.getItem('uid'),        //用户id
          gid: localStorage.getItem('gid'), //企业id
          type: "year",      //day 日报 week 周报 month 月报 year 年报
          start: this.yearform.starttime.split(':')[0],        //开始时间  当type 为 day 时 可选
          end: this.yearform.endtime.split(':')[0]

        }
      };
      this.myAjax(type, url, data, res => {
        // console.log(res)
        if (res.data.code == 100) {
          this.$message({
            showClose: true,
            message: '请选择电箱计数',
            type: 'warning'
          });
        } else {
          this.yeartableData = []
          this.yeartableData.push(res.data.data);

          this.yeartableData[0].totalnum = res.data.sum
          this.picyear = res.data.arrlist
          this.picyeartitle = Object.keys(res.data.data)
          for (let i = 0; i < this.picyeartitle.length; i++) {
            if (this.picyeartitle[i] == 'totalnum') {
              this.picyeartitle.splice(i, 1)
            } else {
              this.picyeartitle[i] = this.picyeartitle[i] + '月'
            }
          }

          this.picyeartitle = this.picyeartitle.sort()
          this.getStudentyear()
        }

      });
    },

    // 日数据图
    getStudentday() {
      let _this = this;
      // arr.length = _this.jdate;
      let arr = ['00点', '01点', '02点', '03点', '04点', '05点', '06点', '07点', '08点', '09点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点']
      let num = this.picday.length
      arr.length = num;
      setTimeout(() => {
        var zhexian = _this.$echarts.init(document.getElementById("dayechart"));
        $(window).resize(function () {
          try {
            zhexian.resize();
          } catch (error) {
            // console.log(error);
          }
        });
        zhexian.setOption({
          title: {
            text: '日总能耗',
            textStyle: { //主标题文本样式
              color: "#606060"
            },
            x: "10",
            y: "10"
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['总能耗'],
            textStyle: {
              color: '#606060'//字体颜色
            },
          },
          toolbox: {
            show: true,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              // dataView: { readOnly: false },
              magicType: { type: ['bar', 'line'] },
              restore: {},
              saveAsImage: {}
            },
            iconStyle: {
              normal: {
                borderColor: '#606060'
              }
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
            name: "单位：（kW/h）",
            type: 'value',
            // axisLabel: {
            //   formatter: '{value} °C'
            // },
            splitLine: {
              show: true,
              // lineStyle: {
              //   color: ['#47d'],
              //   width: 1,
              //   type: 'solid'
              // }
            },
            axisLine: {
              lineStyle: {
                color: '#606060',
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
                color: '#606060',//坐标值得具体的颜色
              }
            },
          },
          series: [
            {
              name: '总能耗',
              type: 'line',
              smooth: true,
              data: this.picday,
              barWidth: 30,
              itemStyle: {
                normal: {
                  label: { show: true },
                  color: "#1478c5", //图例的颜色
                  lineStyle: {
                    color: "#1478c5" //改变折线颜色
                  }
                }
              },
              // markPoint: {
              //   data: [
              //     { type: 'max', name: '最大值' },
              //     { type: 'min', name: '最小值' }
              //   ]
              // },
              // markLine: {
              //   data: [
              //     { type: 'average', name: '平均值' }
              //   ]
              // }
            }
          ]
        });
      }, 0);
    },
    // 月数据图
    getStudentmonth() {
      let _this = this;
      // arr.length = _this.jdate;
      setTimeout(() => {
        var zhexian = _this.$echarts.init(document.getElementById("monthechart"));
        $(window).resize(function () {
          try {
            zhexian.resize();
          } catch (error) {
            // console.log(error);
          }
        });
        let lengthnum = _this.picmonth.length
        var timedata = ['1号', '2号', '3号', '4号', '5号', '6号', '7号', '8号', '9号', '10号', '11号', '12号', '13号', '14号', '15号', '16号', '17号', '18号', '19号', '20号', '21号', '22号', '23号', '24号', '25号', '26号', '27号', '28号', '29号', '30号', '31号']
        timedata.length = lengthnum
        zhexian.setOption({
          title: {
            text: '月总能耗',
            textStyle: { //主标题文本样式
              color: "#606060"
            },
            x: "10",
            y: "10"
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['总能耗'],
            textStyle: {
              color: '#606060'//字体颜色
            },
          },
          toolbox: {
            show: true,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              // dataView: { readOnly: false },
              magicType: { type: ['bar', 'line'] },
              restore: {},
              saveAsImage: {}
            },
            iconStyle: {
              normal: {
                borderColor: '#606060'
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.picmonthdate,
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     color: ['#47d'],
            //     width: 1,
            //     type: 'solid'
            //   }
            // },
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
          },
          yAxis: {
            name: "单位：（kW/h）",
            type: 'value',
            splitLine: {
              show: true,
              // lineStyle: {
              //   color: ['#47d'],
              //   width: 1,
              //   type: 'solid'
              // }
            },
            // axisLabel: {
            //   formatter: '{value} °C'
            // },
            axisLine: {
              lineStyle: {
                color: '#606060',
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
                color: '#606060',//坐标值得具体的颜色
              }
            },
          },
          series: [
            {
              name: '能耗',
              type: 'line',
              smooth: true,
              data: this.picmonth,
              barWidth: 30,
              itemStyle: {
                normal: {
                  label: { show: true },
                  color: "#1478c5", //图例的颜色
                  lineStyle: {
                    color: "#1478c5" //改变折线颜色
                  }
                }
              },
              // markPoint: {
              //   data: [
              //     { type: 'max', name: '最大值' },
              //     { type: 'min', name: '最小值' }
              //   ]
              // },
              // markLine: {
              //   data: [
              //     { type: 'average', name: '平均值' }
              //   ]
              // }
            }
          ]
        });
      }, 0);
    },
    // 年数据图
    getStudentyear() {
      let _this = this;
      // arr.length = _this.jdate;
      let arr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      let num = this.picyear.length
      arr.length = num
      setTimeout(() => {
        var zhexian = _this.$echarts.init(document.getElementById("yearechart"));
        $(window).resize(function () {
          try {
            zhexian.resize();
          } catch (error) {
            // console.log(error);
          }
        });
        zhexian.setOption({
          title: {
            text: '年总能耗',
            textStyle: { //主标题文本样式
              color: "#606060"
            },
            x: "10",
            y: "10"
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['总能耗'],
            textStyle: {
              color: '#606060'//字体颜色
            },
          },
          toolbox: {
            show: true,
            feature: {
              // dataZoom: {
              //   yAxisIndex: 'none'
              // },
              // dataView: { readOnly: false },
              magicType: { type: ['bar', 'line'] },
              restore: {},
              saveAsImage: {}
            },
            iconStyle: {
              normal: {
                borderColor: '#606060'
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.picyeartitle,
            axisLine: {
              lineStyle: {
                color: '#606060',
              }
            },
          },
          yAxis: {
            name: "单位：（kW/h）",
            type: 'value',
            // axisLabel: {
            //   formatter: '{value} °C'
            // },
            splitLine: {
              show: true,
              // lineStyle: {
              //   color: ['#47d'],
              //   width: 1,
              //   type: 'solid'
              // }
            },
            axisLine: {
              lineStyle: {
                color: '#606060',
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
                color: '#606060',//坐标值得具体的颜色
              }
            },
          },
          series: [
            {
              name: '能耗',
              type: 'line',
              smooth: true,
              data: this.picyear,
              barWidth: 30,
              itemStyle: {
                normal: {
                  label: { show: true },
                  color: "#1478c5", //图例的颜色
                  lineStyle: {
                    color: "#1478c5" //改变折线颜色
                  }
                }
              },
              // markPoint: {
              //   data: [
              //     { type: 'max', name: '最大值' },
              //     { type: 'min', name: '最小值' }
              //   ]
              // },
              // markLine: {
              //   data: [
              //     { type: 'average', name: '平均值' }
              //   ]
              // }
            }
          ]
        });
      }, 0);
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
  },
  mounted() {
    this.$refs.table1.$el.style.width = '99%'
  },
  created() {
    // this.getList(1);
    // this.getStudentday()
    this.getNowFormatDate()

    this.getListday(1)
  }
};
</script>
  
 <style lang="less" scoped>
.electricBoxInfo .el-header .el-form /deep/ .el-radio-button__inner {
  padding: 7px 10px !important;
}

// 小屏
@media screen and (min-height: 650px) and (max-height: 750px) {
  #dayechart,
  #monthechart,
  #yearechart {
    height: 300px !important;
  }
}
// 小屏全屏
@media screen and(min-height:750px) and(max-height: 850px) {
  #dayechart,
  #monthechart,
  #yearechart {
    height: 300px !important;
  }
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
        // border-radius: 0;
        border: none;
        background: #1478c5;
        // background-image: linear-gradient(to right, #32a581, #158c86);
        // float: right;
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
        background: #e4e4e4;
        border: none;
        // border-radius: 0;
      }

      .three {
        // background: url(../../../public/static/images/daochu.png) no-repeat 12px 6px;
        background-size: 21px 21px;
        // padding-left: 38px;
        border: 1px solid;
        background: transparent;
        color: #158c86;
        border-image: linear-gradient(to right, #32a581, #158c86) 1 20;
      }
    }

    .maintable {
      // color: #ccc;
      td {
        padding: 12px 10px;
      }
    }

    #dayechart,
    #monthechart,
    #yearechart {
      margin-top: 30px;
      width: 99%;
      height: 500px;
      margin: 30px auto 0 auto;
      background: #fff;
      padding: 20px 0 0 0;
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
  