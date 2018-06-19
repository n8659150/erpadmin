<template>
<header id="J-page-header" class="page-header collapse">
<div class="nav-container">
	<div class="nav-left">
		<div class="logo">
			<a href="/#/" class="router-link-active"><img :src="imgSrc" preload="" class="logo-img"></a>
		</div>
		<i class="icon icon-menu nav-icon"></i>
	</div>
  <div class="searchbar">
    <at-input class="search-input" placeholder="请输入内容" v-model="keywords" append-button>
      <template slot="append">
            <!-- <i class="icon icon-search search-button" @click="getRecordByCode(keywords)"></i> -->
            <at-button icon="icon-search" class="search-button" @click="getRecordByCode(keywords)" :disabled="keywords.length === 0"></at-button>
      </template>
    </at-input>
</div>
	<div class="nav-right" style="height:80px;">
		<!-- <ul class="navbar">
			<li><a href="#/zh/guide/" class="">指南</a></li>
			<li><a href="#/zh/docs/" class="">组件</a></li>
			<li><a href="#/zh/resource/" class="router-link-active">资源</a></li>
		</ul> -->
    
      <div class="btn-language">
        EN
      </div>
    
	</div>
</div>
</header>
</template>

<script>
import queries from "@/api/queries/queries";
export default {
  name: "navBar",
  data() {
    return {
        keywords:'',
        isKeywordEmpty:false,
        imgSrc:"data:image/png;base64,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"
    };
  },
  methods: {
        async getRecordByCode(){
            this.$Loading.start();
            if (this.keywords.length === 0) {
                return 
            }

            let response = await queries.getRecordByCode(this.keywords);
            if(!response) {
                return
            }
            
            let results = response.data.data;
            console.log(results)
            this.$Loading.finish();
            // 有返回条目时就计算步骤，不然就不计算。
            if (results.length > 0){
                for (let result of results) {
                    result['step'] = -1
                    if (result['APPLY_DATE']) { //有申请日期，说明已申请
                        result['step'] = 0
                        console.log('step 0')
                    }
                    if (result['IMPORT_DATE']) { // 有申请日期和导入日期
                        result['step'] = 1
                        console.log('step 1')
                    }
                    if(result['ORG'] !== 1) { // 如果不是主组织，则需要有成本才可启用
                        if (result['ITEM_COST'] && result['ACTIVE'] == 'Need Check') {
                            result['step'] = 2
                            console.log('step 2')
                        } 
                        if (result['ITEM_COST'] && result['ACTIVE'] == 'Active') {
                            result['step'] = 3
                            console.log('step 3')
                        } 
                    } else { // 如果是主组织，则无成本也可启用
                        if (result['ACTIVE'] == 'Need Check') {
                            result['step'] = 2
                            console.log('step 2')
                        }
                        if (result['ACTIVE'] == 'Active') {
                            result['step'] = 3
                            console.log('step 3')
                        }
                    }
                    
                }
            }
            
            localStorage.setItem("keywords", JSON.stringify(this.keywords));
            localStorage.setItem("currentRecords", JSON.stringify(results));
            if(results[0]) {
                localStorage.setItem("activatedRecord", JSON.stringify(results[0]));
            } else {
                localStorage.setItem("activatedRecord", JSON.stringify(results));
            }
            this.$store.commit("updateKeywords", JSON.parse(localStorage.getItem('keywords')));
            this.$store.commit("updateRecords", JSON.parse(localStorage.getItem('currentRecords')));
            this.$store.commit("activateRecord", JSON.parse(localStorage.getItem('activatedRecord')));
            console.log(1);
            this.$router.push('/result');
            this.keywords = '';
      }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-header {
    position: relative !important;
}
.page-header.collapse {
    background-color: #fff;
    box-shadow: 0 10px 60px 0 rgba(29,29,31,0.07);
    opacity: 0.98;
}
.page-header {
    /* position: fixed; */
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: transparent;
    transition: all .3s;
    z-index: 100;
}

.nav-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin: 0 auto;
    width: 90%; */
    color: #1D1D1F;
}

/* .nav-container .nav-left {
    float: left;
} */

.nav-container .nav-left .logo {
    position: relative;
    height: 80px;
    line-height: 80px;
}

.nav-container .nav-left .logo img {
    position: absolute;
    top: 50%;
    margin-top: -15px;
    width: 113px;
    height: 30px;
}

/* .nav-container .nav-left .logo span {
    margin-left: 40px;
    color: #3473e7;
    font-weight: bold;
    font-size: 16px;
} */


.nav-container .nav-left .nav-icon {
    display: none;
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -10px;
    font-size: 20px;
}

/* .nav-container .nav-right {
    float: right;
} */

.nav-container .nav-right .navbar {
    display: inline-block;
    margin: 0;
    padding: 0;
    height: 80px;
    font-size: 14px;
    line-height: 80px;
    list-style-type: none;
}

.nav-container .nav-right .navbar li {
    position: relative;
    display: inline-block;
    margin: 0 24px;
    cursor: pointer;
    transition: color .3s;
}

.nav-container .nav-right .navbar a {
    display: inline-block;
    color: #1D1D1F;
}

.nav-container .nav-right .navbar a.router-link-active::after {
    display: inline-block;
}

.nav-container .nav-right .navbar a::after {
    content: '';
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #6190E8;
}

.nav-container .nav-right .btn-language {
    display: inline-block;
    /* height: 80px; */
    /* line-height: 80px; */
    margin: 27px 0;
    padding: 2px 12px;
    border: 1px solid #1D1D1F;
    border-radius: 2px;
    cursor: pointer;
    transition: color .3s, border .3s;
}
.search-input {
    /* height: 40px; */
    width: 100%;
}

.searchbar {
    /* float: left; */
    display:flex;
    width: 33%;
    height:40px;
    /* margin: 20px 0 20px 90px; */
}
.search-button {
    padding:6px 10px;
    border: 0px;
    background:transparent
}

.disabled {
    cursor: not-allowed !important;
}
</style>
