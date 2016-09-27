<template>
  <div class="page-prefix">
    <slot name="page-prefix"></slot>
  <div>
  <ul class="pagination pagination-sm" v-show="total_page>1">
    <li v-if="page!=1">
      <a @click="changePageTo(1)" aria-label="Previous">
      <span aria-hidden="true">首页</span>
      </a>
    </li>
    <li :class="{disabled:page==1}">
      <a @click="changePageTo(page>6?page-5:page-1)" aria-label="Previous">
      <span aria-hidden="true">«</span>
      </a>
    </li>
    <li v-for="p in total_page" :class="{active:p+1==page}">
      <template v-if="page-6<p&&page+4>p">
        <a @click="changePageTo(p+1)">
        <span>{{p+1}}</span>
        </a>
      </template>
    </li>
    <li :class="{disabled:(page==total_page || page==total_page-4)}">
      <a @click="changePageTo(page<=total_page-4?page+5:page+1)" aria-label="Next">
      <span aria-hidden="true">»</span>
      </a>
    </li>
    <li v-if="page<total_page">
      <a @click="changePageTo(total_page)" aria-label="Next">
      <span aria-hidden="true">尾页</span>
      </a>
    </li>
  </ul>
  <div class="page-suffix">
    <slot name="page-suffix"></slot>
  </div>
</template>

<script>
export default {
  props: ['total', 'page', 'page_size'],
  computed: {
    total_page: function() {
      var total = Number(this.total),
          page_size = Number(this.page_size),
          page = Number(this.page);
      return total % page_size ? Math.floor(total / page_size) +
      1 :
      total / page_size;
    }
  },
  methods: {
    changePageTo: function(dest_page) {
      var self = this;
      if (this.page != dest_page && dest_page > 0 && dest_page <= this.total_page) {
        console.log(dest_page);
        this.$dispatch('on-change', dest_page)
        //为了兼容老版本
        this.$dispatch('change-page', dest_page)
        this.$dispatch('changePageTo', dest_page)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@page-color:#3f9f5f;
@anti-color:#333;

.pagination{
  margin:0;
  padding:0;
  li{
    float:left;
  }
}

.page-prefix,
.page-suffix,
.pagination{
  display:inline-block;
  vertical-align:middle;
  margin-left:10px;
}

.pagination > li > a, .pagination > li > span {
  position: relative;
  float:left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd; 
}

.pagination > li:first-child > a, .pagination > li:first-child > span {
  margin-left: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px; 
}

.pagination>.active>a,
.pagination>.active>a:focus,
.pagination>.active>a:hover,
.pagination>.active>span,
.pagination>.active>span:focus,
.pagination>.active>span:hover{
  background-color:@page-color;
  border-color:@page-color;
}

.pagination>li>a, .pagination>li>span{
  color:@anti-color;
  cursor:pointer;
}
</style>
