<template>
    <div class="q-select" :data-cache-id="cache_id">
        <input class="q-select-input" type="text" :value="modelText" @click="toggleSelect($event)" :placeholder="placeholder" :disabled="disabled" readonly="readonly">
        <input type="hidden" :name="name" :value="model">
        <div class="q-select-box" v-show="show_select==true">
            <input class="q-select-box-input" type="text" v-model="private_input" @input="updateInput(private_input)">
            <a class="q-select-box-clear" @click="clearInput" href="javascript:;">
                <span class="glyphicon glyphicon-remove"></span>
            </a>
            <slot>
            <div class="q-select-box-select">
                <a class="q-select-box-item" v-for="o in options" :value="o.value" @click="updateSelect(o)" v-text="o.text"></a>   
            </div>
            </slot>
        </div>
    </div>
</template>

<style lang="less">
.q-select{
    position:relative;
}
.q-select-box{
    position:absolute;
    z-index:9999;
    top:0;
    left:0;
    right:0;
    bottom:0;
    &.hidden{
        display:none;
    }
}
.q-select-input{
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    width:100%;
    height:100%;
    border:none;
}
.q-select-box-input{
    display:block;
    width:100%;
    height:100%;
}
.q-select-box-loading{
    display:block;
    position:absolute;
    top:10px;
    right:10px;
}
.q-select-box-select{
    position:absolute;
    z-index:999;
    min-width:100%;
    display:block;
    border:1px solid #ccc;
    box-sizing:border-box;
    background:#FFF;
    box-shadow:0 0 6px rgba(0,0,0,.6);
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
.q-select-box-clear{
    position:absolute;
    right:5px;
    top:0px;
    line-height:30px;
    border-radius:50%;
    color:#000;
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
            is_model_change:false,
            select_item_text:'',
            ajaxing:false
        }
    },
    created:function(){
        var self = this;
        var monitor = function(e){
            var root_node = document.querySelector(".q-select[data-cache-id='" + self.cache_id + "']");
            if(root_node && e.target.parentNode != root_node.querySelector('.q-select-box')){
                self.show_select = false;
            }
        }

        if(document.addEventListener){
            document.addEventListener('click', monitor, true);
        }else{
            document.attachEvent('onClick', monitor, true);
        }
    },
    methods:{
        clearInput: function(){
            this.show_select = false;
            this.private_input = '';
            this.model = this.modelText = '';
            this.$dispatch('on-clear');
        },
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
            this.show_select = false;
            this.model = item.value;
            this.modelText = item.text;
            this.$dispatch('on-select', item);
        },
        updateInput: function(input_value){
            this.$dispatch('on-input', input_value);
        }
    },
    props:['options', "model", "modelText", "name", "placeholder", "disabled"]
}
</script>