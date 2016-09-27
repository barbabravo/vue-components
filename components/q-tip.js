var isCreateDom = false;
var css = `
	.qui-tip{
		position: fixed;
		top: 100px;
		left: 0;
		width: 100%;
		text-align: center;
		display: none;
		z-index: 1100;
		opacity: 0;
	    -webkit-transform:scale(0.1,1);
	    -moz-transform:scale(0.1,1);
	    -o-transform:scale(0.1,1);
	    -ms-transform:scale(0.1,1);
	    transform:scale(0.1,1);

		transition-property:opacity,transform;
		transition-duration:0.3s;
		-webkit-transition-property:opacity,transform;
		-webkit-transition-duration:0.3s;
		-moz-transition-property:opacity,transform;
		-moz-transition-duration:0.3s;
		-o-transition-property:opacity,transform;
		-o-transition-duration:0.3s;
		-ms-transition-property:opacity,transform;
		-ms-transition-duration:0.3s;
	}
	.qui-tip-box{
		display: inline-block;
		min-width:120px;
		max-width:390px;
		padding:20px 30px;
		background-color:#fff;
		box-shadow: 0 2px 7px rgba(0,0,0,0.25);
		border: solid 1px #c0c0c0;
		text-align:left;
		font-size: 18px;
		line-height: 32px;
	}
	.qui-tip-text { display:block; position:relative; padding-left:34px;}
	.qui-tip-textIcon {  
		position:absolute; left:0; top:50%;margin-top: -12px; width:24px; height:24px; 
		background:#fff url() no-repeat;
		background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAABoCAYAAADrVTA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGM0MzNThDRTc3QTUxMUU0OEQ2NzlCMkE2NTY1RkUxNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGM0MzNThDRjc3QTUxMUU0OEQ2NzlCMkE2NTY1RkUxNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBRjUzQTdGNzc5RTExRTQ4RDY3OUIyQTY1NjVGRTE2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRBRjUzQTgwNzc5RTExRTQ4RDY3OUIyQTY1NjVGRTE2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+G/DxdQAABHtJREFUeNrsmGtoFUcUx3dvrrlJfSAatYqiIEhTpRjFB0UQSygovtAitIIfrEgRP1RDtBJFLbUqRSNUW6roBz/4Bh/FBzRERaWlBW3wrZ/E1kRTH2gLRmpv/yf8N07G3Z25u5ticQ/82Lt3Z8+5M3PmzPxvdmG9E2bdwDRQCYaBXiAD7oPL4BQ4CJqDHGQCvu8K1oPfwU4wBwwF/4AiBvsQfAdugy2gzDbAcHARLAFPwZdgDOgMBoG+IMd2q8ATsABcA5NMAaTBWdAfrAODQQ34GTxX2v0NGsBqtpG23cERMDcowGiwH7hgClgGHjtme8y28k4L2Kr2xAvwBtgLSsE8cNwp3OSdj+lzJxOiLUA1x1cma7cT3faAzaAn+Fy+cJGmMmF3QBYMBI8KdNoDnOC8vMu5uAVKZC4zHC9ptCuCc/mldWAUM8uhD/FVDGZKgAl88H0E5z+ACnAdTFaeeb4qJUA5b27EcC4/slF53sBruQTow5vflAZSAs6DNyM4F7vLay8JkOeNqzQoooN6LYiNc4cJI5aXAE286a80mMFulitBbJ2LDeD1ngS4wpsxSoNmVlA1SJ2lc9XX5QxfFJulNfpDCzLc0rnqq04WWjFLbhnL8FWtsXx/iHk+1cK5/JhLrEutC+0ZqGXZ+JYTrPdkHBeTyXkRfWRY9B54taiW9Xw8WBOjFq2hjyaW8rZi18Id6k+wlDtVpwIcd+I7Szki4uuhvh/8yuUuD+aDn5QyEmbS5ke+I85nc6G2WxCenQZjOakjmJ4XwGFwjnMgSdEPjATTmbpeJfgInPFbcard4MufgsV0UGHY0b7h3v1Ef+gaji2SmhPBe0zh3hzWZi5QGYqjnDtfyxrGt4XDdShqWrn5fN7pSEsDpAHSAGmA1yPAX4c71L9xP4itk4N6IDp5OeVpF2XzaeIu11s7kWwHK3mGSlQnrzbpZL0H0mAf9dVXYK2FlO1GGVvNezm+7PALIDr5JD9/EEHKyuHggHKGPRZFJ4vM3daROvkT/gB7nYwhKkQn+8kt3RLVyX6WmE4Os9g62WRGnRzXjDo5yJ4XWOPyWdaXd6iTbxpe/NpS+bTp5CyP4e+z3pgCLLLsgZVOjmMvdDIWmkknO9qfJMX84ykxnazaU7a31sleNc1RZb7FP2Q/izg06yhlJXHeFsX6/9fJfnvyEIo+r4TE0slBm36popPLLP75DdbJhnNRbJ2cnk3TAGmANEAaIA3QGuCX0g7WyQEBXhmdvMqok7UeJK+TlQD/uU7OFeA8V6hOlsPVPbDBoHxcnoka6etlnYwhCtLJG3jw2sRrPsC5iPMvwIpCdXIV2MgT3katJ6rztYrzl3Ry1qCTq3hdrF0955LCNQE6WZ5XZi10sh6kxOC8nU7OWupkPUiY80g62WUqO0pau0npZFcb8xJtTvJxdLIbMqFhQax0cpjzsBRur5Ox0IJ08hZWybAJ9RZjrdIjK53cuki4QmsM2bWeqtL11cmspqlODtbJPntysjo5YNNPTicbji2xdfK/AgwAzNL/ZCRZXFoAAAAASUVORK5CYII=);
	}
	.qui-tip-box-error .qui-tip-textIcon { background-position:0 -80px;}
	.qui-tip-box-warning .qui-tip-textIcon { background-position:0 -40px;}
`;

var domTemplate = `
	<div id="__utils__tip__" class="qui-tip" style="display:none;">
	   <div class="qui-tip-box">
	       <span class="qui-tip-text fontYaHei">
	           <span class="qui-tip-textIcon"></span>
	           <span class="qui-tip-textContent"></span>
	       </span>
	   </div>
	</div> `;

    // 添加css 片段到 dom 
function addCssCodeToHead(cssString){
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");

    // IE  
    if (style.styleSheet) {
        style.styleSheet.cssText = cssString;
    } else {
        // w3c  
        var cssText = document.createTextNode(cssString);
        style.appendChild(cssText);
    }

    var heads = document.getElementsByTagName("head");
    if (heads.length)
        heads[0].appendChild(style);
    else
        document.documentElement.appendChild(style);
}

module.exports = function(option) {
	var $dom,box;
	option = option || {};
	if (!isCreateDom) {
		$dom = $(domTemplate);
		$dom.appendTo(document.body);
		addCssCodeToHead(css);
		isCreateDom = true;
	}
	$dom = $dom || $('#__utils__tip__');
	box  = $dom.find(".qui-tip-box");

	box[0].className = 'qui-tip-box';
	if (option.type == 'error') {
		box.addClass('qui-tip-box-error')
	} else if (option.type == 'warning') {
		box.addClass('qui-tip-box-warning')
	}
    $dom.find('.qui-tip-textContent').html(option.text).end().show();
    setTimeout(function(){
        $dom.css({opacity:1,transform:'scale(1,1)'});
        setTimeout(function(){
        	$dom.css({opacity:0,transform:'scale(0.1,1)'});
            setTimeout(function(){
            	$dom.hide();
            },350);
        },option.time||3000);
    },100);
}
