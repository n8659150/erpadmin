<script type="text/javascript">
import globalConsts from "../globalConsts/globalConsts.vue";
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);

//按关键词搜索物料信息
function getRecordByCode(code) {
  var fullUrl =
    globalConsts.serverUrl + globalConsts.records + "code=" + code;
    return Vue.http.get(fullUrl);
}

export default {
  getRecordByCode
};
</script>
