var isCreateDom = false;
var tpl = `
	<div class="modal fade" id="__qyerUtil__confrim__" tabindex="-1" role="dialog" 
	   aria-labelledby="myModalLabel" aria-hidden="true">
	   <div class="modal-dialog" style="width: 400px;margin-top: 200px;">
	      <div class="modal-content">
	         <div class="modal-header">
	            <button type="button" class="close js_qyerutil_confrim_btn" 
	               data-dismiss="modal" aria-hidden="true">
	                  &times;
	            </button>
	            <h4 class="modal-title" id="myModalLabel">
	               确认
	            </h4>
	         </div>
	         <div class="modal-body">
	         </div>
	         <div class="modal-footer">
	            <button type="button" class="btn btn-default js_qyerutil_confrim_btn" 
	               data-dismiss="modal">取消
	            </button>
	            <button type="button" class="btn btn-primary js_qyerutil_confrim_btn" 
	               data-dismiss="modal">确定
	            </button>
	         </div>
	      </div>
	</div>
`;

module.exports = function (text,onOK,onCancel){
	var modal;
	onOk = onOk || function(){};
	onCancel = onCancle || function(){};
	function callFun(e) {
		if($(this).hasClass('btn-primary')){
			onOK();
		}else{
			onCancel();
		}
	}
	
	if(!isCreateDom){
		modal = $(tpl);
		modal.appendTo(document.body);
		modal.find('.js_qyerutil_confrim_btn').on('click',callFun)
		isCreateDom =true;
	}
	modal = modal || $('#__qyerUtil__confrim__');
	modal.find('.modal-body').text(text);
	modal.modal({backdrop: 'static', keyboard: false});

}