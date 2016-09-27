var isCreateDom = false;
var tpl = `
	<div class="modal fade" id="__qyerUtil__alert__" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	   <div class="modal-dialog" style="width: 400px;margin-top: 200px;">
	      <div class="modal-content">
	         <div class="modal-header">
	            <button type="button" class="close" 
	               data-dismiss="modal" aria-hidden="true">
	                  &times;
	            </button>
	            <h4 class="modal-title" id="myModalLabel">
	               提醒
	            </h4>
	         </div>
	         <div class="modal-body">
	         </div>
	         <div class="modal-footer">
	            <button type="button" class="btn btn-primary" 
	               data-dismiss="modal">确定
	            </button>
	         </div>
	      </div>
	</div>
`;

module.exports = function (text){
	var modal;
	if(!isCreateDom){
		modal = $(tpl);
		modal.appendTo(document.body);
		isCreateDom =true;

		modal.on('hidden.bs.modal',function(e){

			var modals = document.body.innerHTML.match(/id=['"]__qyer__modal__.*?['"]/gi);
			var id     = '';

			if(!modals || !modals.length){
				return ;
			}

			for(var i=0;i<modals.length;i++){
				id = modals[i].replace(/['""]|id=/gi,'');
				if( $('#'+id).css('display') != 'none'){
	        		$(document.body).addClass('modal-open');
	        		return ;
				}
			}
	    })
		.on('shown.bs.modal',function(e){
			$(document.body).addClass('modal-open');
		});
	}
	modal = modal || $('#__qyerUtil__alert__');
	modal.find('.modal-body').html(text);
	modal.modal({backdrop: 'static', keyboard: false});

}