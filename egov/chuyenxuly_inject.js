var submitChuyenXuLyMultiText = 'function abc(){}'
var submitNoneHXLMultiText = 'function def(){}'
var submitButPheChuyenXuLyText = 'function mnp(){}'
var submitNoneHXLText = 'function mnp1(){}'
var replaceReload = `$("html").html('<span id="dachuyen">ĐÃ CHUYỂN!</span>');$("iframe", window.parent.document).each(function(){ let body = $(this).contents().find("body"); a = body.find("#dachuyen"); if(a.length > 0){ $(this).closest("table").closest("tr").remove() }           })`



$('script').each(function(){
	
	//console.log($(this).text())
	
	if($(this).text().includes('submitChuyenXuLyMulti')){
		
		// alert('CXL')
		
		submitChuyenXuLyMultiText = submitChuyenXuLyMulti.toString()
		submitChuyenXuLyMultiText = submitChuyenXuLyMultiText.replace(/window.parent.location.reload()/g, replaceReload);
		// submitChuyenXuLyMultiText = submitChuyenXuLyMultiText.replace(/Văn bản chỉ được chuyển/g, 'ga con');
		// console.log(abc)
		
		submitNoneHXLMultiText = submitNoneHXLMulti.toString()
		submitNoneHXLMultiText = submitNoneHXLMultiText.replace(/window.parent.location.reload()/g, replaceReload);
		
		
		
	}
	
	if($(this).text().includes('submitButPheChuyenXuLy')){
		
		// alert('bpcxl')
		
		submitButPheChuyenXuLyText = submitButPheChuyenXuLy.toString()
		submitButPheChuyenXuLyText = submitButPheChuyenXuLyText.replace(/window.parent.location.reload()/g, replaceReload);

		submitNoneHXLText = submitNoneHXL.toString()
		submitNoneHXLText = submitNoneHXLText.replace(/window.parent.location.reload()/g, replaceReload);
		
	}	
		
	
})

submitChuyenXuLyMulti = 111
eval(submitChuyenXuLyMultiText);

submitNoneHXLMulti= 111
eval(submitNoneHXLMultiText);

submitButPheChuyenXuLy= 111
eval(submitButPheChuyenXuLyText);

submitNoneHXL = 111
eval(submitNoneHXLText);


// $('input[name="send"]').each(function(){
	
	// $(this).parent().append(`<input class="egov-button " type="button" value="Gui" id="" name="send" onclick="submitChuyenXuLyMulti(1); return false;">`)
	
// })