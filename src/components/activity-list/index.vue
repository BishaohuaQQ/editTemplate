<template lang="html">
  <div class="create-activity">
    <crunmbs :superiorCatalogue="superiorCatalogue"></crunmbs>
    <div class="main">
      <div class="page-controller">
        <router-link class="item-control" :to="{ path: '/'}">
          <el-button type="primary">活动中心</el-button>
        </router-link>
        <el-button type="primary" disabled>已创建活动</el-button>
      </div>
      <div class="form-list-argument">
        <ul>
          <li>
            <label>活动运营：</label>
            <el-select v-model="operatings" clearable placeholder="请选择">
              <el-option
                v-for="item in operatingsList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <label>活动ID：</label>
            <el-input placeholder="请输入" v-model="ids"></el-input>
          </li>
          <li>
            <label>活动标题：</label>
            <el-input placeholder="请输入" v-model="titles"></el-input>
          </li>
          <li>
            <label>广告位ID/名称：</label>
            <el-select v-model="names" filterable clearable placeholder="请选择" :filter-method="getList" no-data-text="请输入最少一个文字">
              <el-option
                v-for="item in namesList"
                :key="item.value"
                :label="'['+item.value+']'+item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <label>活动类型：</label>
            <el-select v-model="types" clearable placeholder="请选择">
              <el-option
                v-for="item in typesList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <label>活动状态：</label>
            <el-select v-model="states" clearable placeholder="请选择">
              <el-option
                v-for="item in statesList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <label>投放形式：</label>
            <el-select v-model="models" clearable placeholder="请选择">
              <el-option
                v-for="item in modelsList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <el-button @click="search">筛选</el-button>
          </li>
        </ul>
      </div>
      <div style="height: 40px;"></div>
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="活动主题banner" width="195">
            <template slot-scope="scope"><img class="activity-banner"
                                              :src="activityBanner(scope.row.BannerSrc, scope.row.TemplateId)">
            </template>
          </el-table-column>
          <el-table-column prop="Title" label="标题" align="center"></el-table-column>
          <el-table-column prop="ActivityId" label="活动ID" align="center"></el-table-column>
          <el-table-column prop="UserName" label="活动运营" align="center"></el-table-column>
          <el-table-column prop="TempName" label="类型" align="center"></el-table-column>
          <el-table-column label="权重值" align="center">
            <template slot-scope="scope"><span class="weight-table"  @click="changeQuanzhong(scope.row.Weight,scope.row.ActivityId)">{{scope.row.Weight}}</span></template>
          </el-table-column>
          <el-table-column label="时间" align="center" width="180">
            <template slot-scope="scope">{{scope.row.BeginTime | tableDate}}<br/>{{scope.row.EndTime | tableDate}}
            </template>
          </el-table-column>
          <el-table-column label="开启状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="_Enums.OPEN_STATE[''+scope.row.OpenState+'']"
                active-color="#13ce66"
                inactive-color="#999999">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="排序" align="center">
            <template slot-scope="scope">{{scope.row.OrderNum}}</template>
          </el-table-column>
          <el-table-column label="选择媒体" align="center">
            <template slot-scope="scope">{{_Enums.MEDIA_TYPE[''+ scope.row.SourceRange +'']}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="130">
            <template slot-scope="scope">
              <el-popover
                title="删除"
                placement="top"
                width="200"
                :ref="`popovert-${scope.$index}`"
                popper-class="icon-popover">
                <div class="icon-delect-btn">
                  <p>确定删除此活动吗？</p>
                  <p>删除操作不可恢复，请谨慎操作！</p>
                  <div>
                    <el-button  @click="closeDelect(scope._self.$refs[`popovert-${scope.$index}`], '')">取消</el-button>
                    <el-button type="primary" @click="closeDelect(scope._self.$refs[`popovert-${scope.$index}`], scope.row.ActivityId)">确定</el-button>
                  </div>
                </div>
                <el-button slot="reference" class="el-icon-delete"></el-button>
              </el-popover>
              <!--<router-link class="el-icon-document"-->
                           <!--:to="{name: 'create_activity', params: {activity_id: scope.row.ActivityId, template_id: scope.row.TemplateId.toLowerCase()}}"></router-link>-->
              <router-link title="复制" class="el-icon-document" :to="{name: 'create_activity', params: {
                template_id: scope.row.TemplateId.toLowerCase(),
                activity_id: scope.row.ActivityId
              }}"></router-link>
              <i class="el-icon-search" title="预览"></i>
              <el-popover
                title="编辑"
                placement="top"
                width="160"
                popper-class="icon-popover"
                :ref="`popoverb-${scope.$index}`"
                trigger="click">
                <div class="icon-share-btn">
                  <p>请选择复制项</p>
                  <div>
                    <el-button type="primary" @click="copyLink(scope._self.$refs[`popoverb-${scope.$index}`], `test6.api.hqx9.cn/iad/index?appkey=1D7F1F30B2B42C8482C74E8153249F46&activity_id=${scope.row.ActivityId}&preview=1`)">复制预览链接</el-button>
                    <el-button type="primary" @click="copyLink(scope._self.$refs[`popoverb-${scope.$index}`], `test6.api.hqx9.cn/iad/index?appkey=1D7F1F30B2B42C8482C74E8153249F46&activity_id=${scope.row.ActivityId}`)">复制投放链接</el-button>
                  </div>
                </div>
                <el-button slot="reference" class="el-icon-share"></el-button>
              </el-popover>
              <!--<router-link class="el-icon-edit"-->
                           <!--:to="{name: 'create_activity', params: {templateId: scope.row.TemplateId.toLowerCase(), copyId: scope.row.ActivityId}}"></router-link>-->
              <router-link title="编辑" class="el-icon-edit" :to="{name: 'create_activity', params: {
                  template_id: scope.row.TemplateId.toLowerCase(),
                  activity_id: scope.row.ActivityId
              }}"></router-link>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center">
            <template slot-scope="scope">
              <div class="remark">{{scope.row.Remark}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" align="center">
            <template slot-scope="scope">{{scope.row.UpdateDate | tableDate}}</template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      class="weight-dialog"
      width="35%"
      center>
      <div class="weight-dialog-div">
        <span>权重值</span>
        <el-input v-model="inputWeight" placeholder="请输入权重值"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeWeight()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Crunmbs from 'base/crumbs/crumbs'
  import {searchActivityList} from 'api/create-activity'
  import {getOperatingsList} from 'api/create-activity'
  import {getActiveTypeList} from 'api/create-activity'
  import {getActiveNamesList} from 'api/create-activity'
  import {delectActive} from 'api/create-activity'
  import {updataWeight} from 'api/create-activity'
  export default {
    data() {
      return {
        centerDialogVisible: false,
        superiorCatalogue: {
          currentText: '活动中心'
        },
        // 列表数据
        tableData: [],
        ids: '',
        titles: '',
        operatings: 0,
        names: '',
        types: '',
        states: -1,
        models: -1,
        operatingsList: [{
          value: 0,
          label: '默认全部'
        }],
        namesList: [],
        typesList: [],
        statesList: [{
          value: -1,
          label: '默认全部'
        }, {
          value: 1,
          label: '已开启'
        }, {
          value: 0,
          label: '未开启'
        }],
        modelsList: [{
          value: -1,
          label: '全部'
        }, {
          value: 0,
          label: '默认全部'
        }, {
          value: 1,
          label: '定投'
        }, {
          value: 2,
          label: '屏蔽'
        }, {
          value: 3,
          label: '屏蔽+默认全部'
        }],
        inputWeight: null,
        weightParams: {}
      }
    },
    components: {
      Crunmbs
    },
    methods: {
      // 设置活动banner 没有取默认
      activityBanner(banner, templateId) {
        return banner || `http://static.adjuz.com/iad/img/${templateId.toLowerCase()}.jpg`
      },
      search() {
        let that = this;
        searchActivityList({
          Title: that.titles,
          TemplateId: that.types,
          ActiveOperatorId: that.operatings,
          PutOnSourceId: that.names,
          SourceRange: that.models,
          OpenState: that.states
        }).then(res => {
          that.tableData = [];
          let activeId = that.ids;
          if(activeId) {
            let resultList = res;
            resultList.forEach((item, index) => {
              if((item.ActivityId).toString().indexOf(activeId.toString()) > -1) {
                that.tableData.push(item);
              }
            })
          } else {
            that.tableData = res;
          }
        })
      },
      closeDelect(dom,id ) {
        let that = this;
        if(id) {
          delectActive({
            ActivityId: id
          }).then((res) => {
            that.$notify({
              message: '删除成功',
              type: 'success'
            });
            dom.doClose();
            that.search()
          })
        } else {
          dom.doClose();
        }

      },
      copyLink(dom, value) {
        let that = this;
        let body = document.getElementsByTagName('body');
        let input = document.createElement('input');
        input.value = value;
        body[0].appendChild(input);
        input.select();
        document.execCommand("copy");
        dom.doClose();
        this.$notify({
          message: '复制成功',
          type: 'success'
        });
      },
      getList(value) {
        let that = this;
        if(value) {
          getActiveNamesList({
            uname: value
          }).then(res => {
            that.namesList = res.list;
            that.namesList.forEach((item, index) => {
              item.value = item.id;
              item.label = item.name;
            })
          })
        } else {
          that.namesList = [];
        }
      },
      changeQuanzhong(weight,id) {
        let that = this;
        that.inputWeight = weight;
        that.weightParams = {
          activityId: id
        };
        that.centerDialogVisible = true;
      },
      changeWeight() {
        let that = this;
        if(!that.inputWeight) {
          that.$message({
            message: '权重值不能为空',
            type: 'warning'
          });
          return;
        }
        updataWeight({
          activityId: that.weightParams.activityId,
          weight: that.inputWeight
        }).then((res) => {
            console.log(res);
          that.centerDialogVisible = false;
          that.search();
        })
      }
    },
    watch: {
      inputWeight(newValue, oldValue) {
        let that = this;
        let value = newValue.toString();
        if(value) {
          if(value.indexOf('-')> -1) {
            setTimeout(() => {
              that.inputWeight = oldValue;
            })
          }
          if(value.indexOf('.')> -1) {
            if(value.split('.').length > 2) {
              setTimeout(() => {
                that.inputWeight = oldValue;
              })
            } else {
              if(value.split('.')[1].length >2) {
                setTimeout(() => {
                  that.inputWeight = oldValue;
                })
              }
            }
          }
          if(isNaN(value)) {
            setTimeout(() => {
              that.inputWeight = oldValue;
            })
          }
        }
      }
    },
    created() {
      let that = this;
      that.search();
      getOperatingsList().then(res => {
        this.operatingsList = res;
        this.operatingsList.forEach((item, index) =>{
          item.value = item.UserId;
          item.label = item.UserName;
        })
        this.operatingsList.unshift({
          value: 0,
          label: '默认全部'
        })
      })
      getActiveTypeList().then(res => {
        this.typesList = res;
        this.typesList.forEach((item, index) => {
          item.value = item.TemplateId;
          item.label = item.TempName;
        });
        this.typesList.unshift({
          value: '',
          label: '默认全部'
        })
      });
    },
    filters: {
      tableDate(date) {
        if (date) {
          let timeSpan = date.replace('Date', '').replace('(', '').replace(')', '').replace('-', '').replace(/\//g, '');
          let dates = new Date(parseInt(timeSpan));
          let year = dates.getFullYear()
          let month = dates.getMonth() + 1 > 9 ? dates.getMonth() + 1 : '0' + (dates.getMonth() + 1);
          let day = dates.getDate() > 9 ? dates.getDate() : '0' + dates.getDate();
          let hours = dates.getHours() > 9 ? dates.getHours() : '0' + dates.getHours();
          let minutes = dates.getMinutes() > 9 ? dates.getMinutes() : '0' + dates.getMinutes();
          let seconds = dates.getSeconds() > 9 ? dates.getSeconds() : '0' + dates.getSeconds();
          return year + '-' + month + '-' + day + " " + hours + ":" + minutes
        } else {
          return '';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-controller {
    margin: 20px 0;
    .item-control {
      display: inline-block;
    }
  }

  em {
    color: #13ce66;
  }

  // 活动主题banner
  .activity-banner {
    max-width: 187px;
    max-height: 82px;
    border: none;
  }

  .form-list-argument {
    ul:after {
      content: '';
      display: block;
      clear: both;
    }
    ul {
      li {
        float: left;
        width: 25%;
        height: 50px;
        label {
          display: inline-block;
          min-width: 30%;
          max-width: 110px;
          text-align: right;
          font-weight: bold;
        }
        .el-input {
          width: 60%;
        }
        .el-button {
          background: cornflowerblue;
          color: #ffffff;
          margin-left: 10px;
        }
        .el-select {
          width: 60%;
        }
      }
    }
  }
  .el-button.el-popover__reference {
    border: none;
    padding: 0;
  }
  .icon-popover {
    .icon-delect-btn {
      p{
        font-size: 12px;
      }
      div{
        margin-top: 10px;
        text-align: center;
        button {
          padding: 0;
          width: 70px;
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .icon-share-btn {
      text-align: center;
      p{
        font-size: 16px;
      }
      div{
        margin-top: 10px;
        text-align: center;
        button {
          padding: 0;
          width: 100px;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          &.el-button+.el-button {
            margin-left: 0;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .el-select-dropdown__item{
    max-width: 200px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  td .cell button,td .cell a,td .cell i{
    font-size: 16px;
    color: #666666;
    background: none;
    cursor: pointer;
  }
  .weight-table {
    cursor: pointer;
  }
  .weight-dialog {
    .el-dialog{
      min-width: 300px;
    }
    .weight-dialog-div {
      text-align: center;
    }
    .el-input{
      width: 200px;
      margin-left: 20px;
    }
  }
</style>
