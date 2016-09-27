<template>
  <div v-show="is_show" transition="modal" class="modal-mask" :class="modal_theme">
    <div class="modal modal-wrapper">
      <div class="modal-dialog">
        <slot name="modal-container"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    is_show: Boolean,
    modal_info: Object,
    modal_theme:String
  },
  watch: {
    is_show: function(val, oldVal) {
      if (val) {
        $("body").addClass("modal-open");
        this.$dispatch('init-modal', this.modal_info);
      } else {
        $("body").removeClass("modal-open");
        this.$dispatch('close-modal');
      }
    }
  }
}
</script>
<style lang="less">

.modal-body{
  padding:15px 15px 30px;
}

/* modal */
#modal-core{
  width:100%!important;
}
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

@media (min-width: 1000px){
  .modal-mask{
    &.wide{
      .modal-dialog{
        width:800px;
        margin:30px auto;
      }
    }
  }
}

.modal-wrapper {
  vertical-align: middle;
  display: table-cell;
  overflow-x: hidden;
  overflow-y: auto;
}


.modal-content {
  padding-left:0;
  padding-right:0;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-enter {
  opacity: 0;
}
.modal-leave{
  display:none;
}

.modal-enter .modal-content,
.modal-leave .modal-content {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
