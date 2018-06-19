<template>

<!-- 无搜索结果时 -->
<div class="at-container row" v-if="(records) && (records.length == 0)">
	<div class="at-sidebar col-sm-24 col-md-6 col-lg-4">
		<nav class="at-nav">
		<h2 class="at-nav__title">组织</h2>
		<ul class="at-nav__items">
			<li class="at-nav__item">
                <a class="at-nav__page router-link-exact-active router-link-active">
                 无数据
                </a>
            </li>
		</ul>
		</nav>
	</div>
	<div class="at-markdown col-sm-24 col-md-18 col-lg-20">
		<section> 
        <div class="md-title">
            <h1>{{keywords}} - 无数据</h1>
            <!-- 启用/未启用 开关 -->
            <span class="at-switch status-btn">
                <span class="at-switch__text">Need Check</span>
            </span>
        </div>
		<hr>
        <at-steps :current='-1' direction="horizontal">
            <at-step title="申请" description="无数据" icon="icon-user"></at-step>
            <at-step title="导入" description="无数据" icon="icon-airplay"></at-step>
            <at-step title="维护" description="无数据" icon="icon-info"></at-step>
            <at-step title="启用" icon="icon-check-circle"></at-step>
        </at-steps>
        <div class="info">
            <div class="info-wrapper" style="flex:1;">
                <h2>
                    物料信息
                </h2>
                <p>
                    编码 ：<code>无数据</code> 
                </p>
                <p>
                    描述 ：<code>无数据</code> 
                </p>
                <p>
                    类别 ：<code>无数据</code> 
                </p>
                <p>
                    属性 ：<code>无数据</code> 
                </p>
                <p>
                    可采购 ：<code>无数据</code> 
                </p>
                <p>
                    识别码 ：<code>无数据</code> 
                </p>
                <p>
                    收入科目 ：<code>无数据</code> 
                </p>
                <p>
                    冻结成本 ：<code>无数据</code> 
                </p>
                <p>
                    BOM状态 ：<code>无数据</code> 
                </p>
                <p>
                    子库存 ：<code>无数据</code> 
                </p>
                <p>
                    物料状态 ：<code>无数据</code> 
                </p>
            </div>
            <div class="info-wrapper" style="flex:1;">
                <h2>
                    维护人员
                </h2>
                <p>
                    申请人员 ：<code>无数据</code> 
                </p>
                <p>
                    申请部门 ：<code>无数据</code> 
                </p>
                <p>
                    申请日期 ：<code>无数据</code> 
                </p>
                <p>
                    导入人员 ：<code>无数据</code> 
                </p>
                <p>
                    导入日期 ：<code>无数据</code> 
                </p>
                <p>
                    更新人员 ：<code>无数据</code> 
                </p>
                <p>
                    更新日期 ：<code>无数据</code> 
                </p>
            </div>
        </div>
		</section>
	</div>
</div>
<!-- 有搜索结果时 -->
  <div class="at-container row" v-else-if="(records) && (records.length > 0)">
	<div class="at-sidebar col-sm-24 col-md-6 col-lg-4">
		<nav class="at-nav">
		<h2 class="at-nav__title">组织</h2>
		<ul class="at-nav__items">
			<li class="at-nav__item" v-for="(record,key) in records" :key="key" >
                <a
                    class="at-nav__page"  
                    :class="[{'router-link-exact-active':flag==key},{'router-link-active':flag==key}]" @click="activateMenu(key)">
                {{record['ORG'] | orgFilter}}
                </a>
            </li>
		</ul>
		</nav>
	</div>
	<div class="at-markdown col-sm-24 col-md-18 col-lg-20">
		<section> 
        <div class="md-title">
            <h1>{{activateRecord['ITEM_CODE']}} - {{activateRecord['DESCRIPTION']}}</h1>
            <!-- 启用/未启用 开关 -->
            <span class="at-switch status-btn" :class="{'at-switch--checked':activateRecord['ACTIVE'] == 'Active'}">
                <span class="at-switch__text">{{activateRecord['ACTIVE']}}</span>
            </span>
        </div>
		<hr>
        <at-steps :current="activateRecord['step']" direction="horizontal">
            <at-step title="申请" :description="(activateRecord['APPLY_DATE'] !== null)?activateRecord['APPLY_DATE']: '-'" icon="icon-user"></at-step>
            <at-step title="导入" :description="(activateRecord['IMPORT_DATE'] !== null)?activateRecord['IMPORT_DATE']: '-'" icon="icon-airplay"></at-step>
            <at-step title="维护" :description="(activateRecord['LAST_UPDATE_DATE'] !== null)?activateRecord['LAST_UPDATE_DATE']: '-'" icon="icon-info"></at-step>
            <at-step title="启用" icon="icon-check-circle"></at-step>
        </at-steps>
        <div class="info">
            <div class="info-wrapper" style="flex:1;">
                <h2>
                    物料信息
                </h2>
                <p>
                    编码 ：<code>{{(activateRecord['ITEM_CODE'] !== null)?activateRecord['ITEM_CODE']: '-' }}</code> 
                </p>
                <p>
                    描述 ：<code>{{(activateRecord['DESCRIPTION'] !== null)?activateRecord['DESCRIPTION']:'-'}}</code> 
                </p>
                <p>
                    类别 ：<code>{{(activateRecord['ITEM_TYPE'] !== null)?activateRecord['ITEM_TYPE']:'-'}}</code> 
                </p>
                <p>
                    属性 ：<code>{{(activateRecord['MAKE_OR_BUY'] !== null)?activateRecord['MAKE_OR_BUY']:'-' | makeOrBuyFilter}}</code>
                </p>
                <p>
                    可采购 ：<code>{{(activateRecord['CAN_PERCHASE'] !== null)?activateRecord['CAN_PERCHASE']:'-' | purchasableFilter}}</code> 
                </p>
                <p>
                    识别码 ：<code>{{(activateRecord['PREFIX'] !== null)?activateRecord['PREFIX']:'-'}}</code> 
                </p>
                <p>
                    收入科目 ：<code>{{(activateRecord['SALES_INCOME_ACC'] !== null)?activateRecord['SALES_INCOME_ACC']:'-'}}.{{(activateRecord['SALES_INCOME_SUBACC'] !== null)?activateRecord['SALES_INCOME_SUBACC']:'-'}}</code>
                </p>
                <p>
                    冻结成本 ：<code>{{(activateRecord['ITEM_COST'] !== null)?activateRecord['ITEM_COST']:'-'}}</code> 
                </p>
                <p>
                    BOM状态 ：<code>{{(activateRecord['BOM_READY'] !== null)?activateRecord['BOM_READY']:'-' | bomStatusFilter}}</code> 
                </p>
                <p>
                    子库存 ：<code>{{(activateRecord['SUBINV'] !== null)?activateRecord['SUBINV']:'-'}}</code> 
                </p>
                <p>
                    物料状态 ：<code>{{(activateRecord['ACTIVE'] !== null)?activateRecord['ACTIVE']:'-' | itemStatusFilter}}</code> 
                </p>
            </div>
            <div class="info-wrapper" style="flex:1;">
                <h2>
                    维护人员
                </h2>
                <p>
                    申请人员 ：<code>{{(activateRecord['APPLY_BY_READABLE'] !== null)?activateRecord['APPLY_BY_READABLE']:'-'}}</code> 
                </p>
                <p>
                    申请部门 ：<code>{{(activateRecord['APPLY_DEPT'] !== null)?activateRecord['APPLY_DEPT']:'-'}}</code> 
                </p>
                <p>
                    申请日期 ：<code>{{(activateRecord['APPLY_DATE'] !== null)?activateRecord['APPLY_DATE']:'-'}}</code> 
                </p>
                <p>
                    导入人员 ：<code>{{(activateRecord['IMPORT_BY_READABLE'] !== null)?activateRecord['IMPORT_BY_READABLE']:'-'}}</code> 
                </p>
                <p>
                    导入日期 ：<code>{{(activateRecord['IMPORT_DATE'] !== null)?activateRecord['IMPORT_DATE']:'-'}}</code> 
                </p>
                <p>
                    更新人员 ：<code>{{(activateRecord['LAST_UPDATE_BY_READABLE'] !== null)?activateRecord['LAST_UPDATE_BY_READABLE']:'-'}}</code> 
                </p>
                <p>
                    更新日期 ：<code> {{(activateRecord['LAST_UPDATE_DATE'] !== null)?activateRecord['LAST_UPDATE_DATE']:'-'}}</code> 
                </p>
            </div>
        </div>
		</section>
	</div>
</div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
        // orgs:[
        //     {'name':'主要'},
        //     {'name':'上海'},
        //     {'name':'南昌'},
        //     {'name':'印度'}
        // ],
        flag:0
        // records:null
    };
  },
  computed:{
      keywords() {
          return this.$store.state.keywords
      },
      records() {
          return this.$store.state.currentRecords
      },
      activateRecord() {
          return this.$store.state.activateRecord
      }
  },
  methods:{
      activateMenu(index){
          this.flag = index;
          this.$store.state.activateRecord = this.$store.state.currentRecords[index]
        //   localStorage.setItem("activatedRecord", JSON.stringify(this.$store.state.activateRecord));
      }
  },
  filters: {
  orgFilter(org) {
    switch (org) {
        case 1:
            return '主组织'
            break;
        case 21:
            return '上海'
            break;
        case 828:
            return '南昌'
            break;
        case 889:
            return '冷暖'
            break;
        case 909:
            return '印度'
            break;            
    }
  },
  makeOrBuyFilter(make_or_buy) {
    switch (make_or_buy) {
        case 1:
            return '制造'
            break;
        case 2:
            return '购买'
            break;
    }
  },
  purchasableFilter(purchaseable) {
    switch (purchaseable) {
        case 'Y':
            return '是'
            break;
        case 'N':
            return '否'
            break;
    }
  },
  bomStatusFilter(bomStatus) {
    switch (bomStatus) {
        case 'Y':
            return '已制作'
            break;
        default:
            return '未制作/无需'
            break; 
    }   
  },
  itemStatusFilter(itemStatus) {
    switch (itemStatus) {
        case 'Active':
            return '生效'
            break;
        case 'Need Check':
            return '待定'
            break;
        case 'Inactive':
            return '失效'
            break;
    }   
  }
},
  mounted() {
    //   this.records = JSON.parse(localStorage.getItem('currentRecords'))
    this.$store.commit("updateKeywords", JSON.parse(localStorage.getItem('keywords')));
    this.$store.commit("updateRecords", JSON.parse(localStorage.getItem('currentRecords')));
    this.$store.commit("activateRecord", JSON.parse(localStorage.getItem('currentRecords'))[0]);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.at-container {
    position: relative;
    margin: 48px auto;
    width: 90%;
    background-color: #fff;
    box-shadow: 0 4px 30px 0 rgba(223,225,230,0.5);
}

.at-sidebar {
    display: inline-block;
    margin: 32px 0;
    padding: 0;
    color: #3F536E;
    background-color: #fff;
    border-right: 1px solid #ECECEC;
    z-index: 99;
}

.at-nav {
    font-size: 14px;
}

.at-nav__title {
    padding: 0 24px 8px;
    color: #8DABC4;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.at-nav__items {
    margin: 0 0 32px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.8;
}

.at-nav__item {
    position: relative;
}

.at-nav__page.active, .at-nav__page.router-link-active {
    background-color: rgba(236,242,252,0.2);
}

.at-nav__page.active:after, .at-nav__page.router-link-active:after {
    display: inline-block;
}

.at-nav__page:after {
    content: '';
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: #6190E8;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 1px 0 12px 0 #6190E8;
}

.at-nav__page {
    display: block;
    position: relative;
    padding: 8px 24px;
    color: #3F536E;
    font-weight: normal;
    line-height: 1.5;
    cursor: pointer;
}

.at-nav__page:hover {
    color: #79A1EB;
    background-color: rgba(236,242,252,0.25);
}

.at-markdown {
    padding: 32px 48px 48px;
}

.at-markdown>section {
    margin: 0 auto;
}

.at-markdown>section>h1, .at-markdown>section>.md-title>h1{
    margin-top: 0;
    font-size: 24px;
}

.at-markdown>section>h1, .at-markdown>section>h2, .at-markdown>section>h3, .at-markdown>section>h4 {
    margin: 16px 0;
    line-height: 1.5;
}

.at-markdown>section>hr {
    margin: 1.2em 0;
    border: 0;
    border-bottom: 1px solid #C5D9E8;
}

.at-markdown>section>p {
    padding: 1.2em 0;
    line-height: 1.7;
}

.at-markdown>section code {
    padding: .3em .5em;
    font-size: .9em;
    vertical-align: middle;
    border: 1px solid #ECECEC;
    border-radius: 2px;
    background-color: #F7F7F7;
}

.md-title {
    display:flex;
    align-items:center;
}

.md-title code {
    margin-left:20px;
}
.status-btn {
    margin-left:35px;
}

.info {
    display:flex;padding:38px 0 60px 35px;
}

.info-wrapper p {
    padding: 1em 0;
}

.info-wrapper h2 {
    padding-bottom:0.3em;
}
</style>
