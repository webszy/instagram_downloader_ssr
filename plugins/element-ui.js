import Vue from 'vue'
import { 
    Image,
    Message,
    Input,
    Radio ,
    Autocomplete,
    Loading
} from 'element-ui' //引入组件
Vue.prototype.$ELEMENT = { size: 'small' };
// Vue.use(Loading);
Vue.use(Image).use(Input).use(Radio).use(Autocomplete);
Vue.prototype.$message = Message;
Vue.prototype.$loading=Loading
