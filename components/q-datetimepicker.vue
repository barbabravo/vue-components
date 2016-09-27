<template>
<div class="q-datetimepicker" :data-cache-id="cache_id">
    <input class="q-datetimepicker-input" type="text" :value="modelText" @click="toggleSelect($event)" :placeholder="placeholder" :disabled="disabled" readonly="readonly">
    <input type="hidden" :name="name" :value="model">
    <div class="q-datetimepicker-box" v-show="show_select==true">
        <input class="q-datetimepicker-box-input" type="text" v-model="private_input" @input="updateInput(private_input)"><a class="q-datetimepicker-box-clear" @click="clearInput" href="javascript:;"><span class="glyphicon glyphicon-remove"></span></a>
        <!--<span class="q-datetimepicker-box-loading"></span>-->
        <div class="q-datetimepicker-box-select">
            <a class="q-datetimepicker-box-item" v-for="o in options" :value="o.value" @click="updateSelect(o)" v-text="o.text"></a>   
        </div>
    </div>
</div>
</template>

<style>

.q-datetimepicker{
    position:relative;
}
.q-datetimepicker-box{
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
.q-datetimepicker-input{
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    width:100%;
    height:100%;
    border:none;
}
.q-datetimepicker-box-input{
    display:block;
    width:100%;
    height:100%;
}
.q-datetimepicker-box-loading{
    display:block;
    position:absolute;
    top:10px;
    right:10px;
}
.q-datetimepicker-box-select{
    position:absolute;
    z-index:999;
    min-width:100%;
    display:block;
    border:1px solid #ccc;
    box-sizing:border-box;
    background:#FFF;
    box-shadow:0 0 6px rgba(0,0,0,.6);
}
.q-datetimepicker-box-item{
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
.q-datetimepicker-box-clear{
    position:absolute;
    right:5px;
    top:0px;
    line-height:30px;
    border-radius:50%;
    color:#000;
}
</style>

<script>
export default {
    
}
</script>