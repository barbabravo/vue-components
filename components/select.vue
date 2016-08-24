<template>
    <div class="q-select" :data-cache-id="cache_id">
        <input class="q-select-input" type="text" :value="select_item_text" @click="toggleSelect($event)" :placeholder="placeholder" readonly="readonly">
        <input type="hidden" :name="name" :value="model">
        <div class="q-select-box" v-show="show_select==true">
            <input class="q-select-box-input" type="text" v-model="private.input" @input="updateInput(private.input)">
            <!--<span class="q-select-box-loading"></span>-->
            <div class="q-select-box-select">
                <a class="q-select-box-item" v-for="o in options" :value="o.value" @click="closeSelect(o)" v-text="o.text"></a>   
            </div>
        </div>
    </div>
</template>

<style lang="less">
.q-select-input{
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    width:100%;
    height:100%;
    border:none;
}
.q-select-box{
    position:absolute;
    z-index:9999;
    min-width:100%;
    height:100%;
    &.hidden{
        display:none;
    }
}
.q-select-box-input{
    display:block;
    border:1px solid #999;
    box-sizing:border-box;
    width:100%;
    height:30px;
}
.q-select-box-loading{
    display:block;
    position:absolute;
    top:10px;
    right:10px;
}
.q-select-box-select{
    display:block;
    border:1px solid #ccc;
    box-sizing:border-box;
}
.q-select-box-item{
    display:block;
    background:#FFF;
    padding:0 10px;
    white-space:nowrap;
    font-size:14px;
    line-height:28px;
    border-bottom:1px solid #ccc;
    box-sizing:border-box;
    &:last-child{
        border:none;
    }
    &:hover{
        cursor:pointer;
        color:#FFF;
        background-color:#336699;
    }
}
</style>

<script>
let _timer = null;
export default {
    data: function(){
        return {
            show_select:false,
            cache_id:new Date().getTime() + '-' + parseInt(Math.random()*1000),
            private_input:'',
            private_option:{},
            is_model_change:false,
            select_item_text:''
        }
    },
    created:function(){
        var self = this;
        var monitor = function(e){
            var root_node = document.querySelector(".q-select[data-cache-id='" + self.cache_id + "']");
            if(e.target.parentNode != root_node.querySelector('.q-select-box')){
                self.show_select = false;
            }
        }

        if(document.addEventListener){
            document.addEventListener('click', monitor, true);
        }else{
            document.attachEvent('onClick', monitor, true);
        }
    },
    computed:{
        select_item_text: function(){
            var self = this, tmp = this.options.slice(0), text='';
            tmp.push(this.private_option);
            tmp.map(function(option){
                if(option.value == self.model){
                    text = option.text;
                    self.private_option = {
                        value:option.value,
                        text:option.text
                    }
                }
            })
            return text;
        }
    },
    methods:{
        toggleSelect: function(e){
            this.show_select = !this.show_select;
            if(this.show_select){
                //为了保证能够focus到输入框中
                setTimeout(function(){
                    var root = e.target.parentNode;
                    root.querySelector(".q-select-box-input").focus();
                })
            }
        },
        updateSelect: function(item){
            this.model = item.value;
            this.show_select = false;
            this.private_option = item;
            this.$dispatch('on-select', item);
        },
        updateInput: function(input_value){
            var self = this;
            if(!_timer){
                this.$dispatch('on-input', input_value);
            
                _timer = setTimeout(function(){
                    clearTimeout(_timer);
                    _timer = null;
                }, 200);
            }
        }
    },
    props:['options', "model", "name", "placeholder"]
}
</script>