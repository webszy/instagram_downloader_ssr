import Vue from 'vue'
import { 
    Image,
    Message,
    Input
} from 'element-ui' //引入组件
Vue.prototype.$ELEMENT = { size: 'small' };
// Vue.use(Loading);
Vue.use(Image);
Vue.use(Input);
Vue.prototype.$message = Message;
