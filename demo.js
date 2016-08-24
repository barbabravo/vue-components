import Vue from 'vue'
import {select} from './index.js'
/**或者使用以下方法
    import qvSelect from 'vue-select'
**/

new Vue({
    el:'body',
    components:{
        qvSelect:Vue.component('qvSelect', select),
        // qvPage: Vue.component('qvPage', page)
    },
    data:{
        aaa:'',
        options:[{
            value:'',
            text:'全部'
        },{
            value:'abc',
            text:'英文ABC',
        },{
            value:'123',
            text:'数字123',
        },{
            value:'!@#',
            text:'乱码'
        }],
        page_data:{
            total:30,
            page_size:10,
            page:2
        }
    },
    methods:{
        triggerInput: function(input){
            console.log("输入了:" + input, '此处通常触发ajax获取数据');
        },
        triggerSelect: function(val){
            console.log('选中了:', JSON.parse(JSON.stringify(val)));
        },
        triggerChangePage: function(val){
            console.log('选中了:', JSON.parse(JSON.stringify(val)));
        }
    }
})