let gridObj = null; // 그리드 객체
let _onClickModal;

// 그리드 객체 세팅
function setGridObj(obj) {
	gridObj = obj;
}

function setOpnerGridObj(row,col,param){
	gridObj.setCellData(row, col, param);
}

function onGridEvent(eventFunc, params) {
	switch (eventFunc) {
		case 'itemClicked':
			let clickedBinding = gridObj.getColumns()[params.col].binding;
			switch (clickedBinding) {
				case 'uuid':
					setUuidModal(params);
					break;
				case 'categoryGroupName':
				case 'categoryGroupId':
				case 'itemClass1Name':
				case 'itemClass1':
				case 'itemClass2Name':
				case 'itemClass2':
				case 'itemClass3Name':
				case 'itemClass3':
				case 'itemClass4Name':
				case 'itemClass4':
					_onClickModal = function () {
						let p = {
							modalCategoryGroupId: $('#modalCategoryGroupId').val(),
							modalCategoryGroupName: $("#modalCategoryGroupId option:checked").text(),
							modalItemClass1: $('#modalItemClass1').val(),
							modalItemClass1Name: $("#modalItemClass1 option:checked").text(),
							modalItemClass2: $('#modalItemClass2').val(),
							modalItemClass2Name: $("#modalItemClass2 option:checked").text(),
						};

						if(p.modalCategoryGroupId == '0' || p.modalItemClass1 == '0' ||p.modalItemClass2 == '0'){
							alert('카테고리를 선택해 주세요.');
							return false;
						}

						let row = gridObj.getRowData(params.row);
						row.categoryGroupId = Number(p.modalCategoryGroupId);
						row.categoryGroupName = p.modalCategoryGroupName;
						row.itemClass1 = p.modalItemClass1;
						row.itemClass1Name = p.modalItemClass1Name;
						row.itemClass2 = p.modalItemClass2;
						row.itemClass2Name = p.modalItemClass2Name;
						row.itemClass3 = '000';
						row.itemClass4 = '000';
						gridObj.setRowData(params.row, row);
						$("#categoryModal").modal('hide');
					};
					$("#categoryModal").modal();
					break;
				case 'makerId':
				case 'makerName':
					_onClickModal = function () {
						let p = {
							modalMakerName: $('#modalMakerName').val(),
							modalMakerId: $('#modalMakerId').val()
						};

						if(p.modalMakerName == '' || p.modalMakerCode == ''){
							alert('제조사를 선택해 주세요.');
							return false;
						}

						let row = gridObj.getRowData(params.row);
						row.makerName = p.modalMakerName;
						row.makerId = p.modalMakerId;
						gridObj.setRowData(params.row, row);
						$("#makerModal").modal('hide');
					};
					$("#makerModal").modal();
					$('#modalMakerName').autocomplete('option', 'appendTo', '#makerModal');
					break;
			}
			break;
		case 'addRowClicked':
			let binding = gridObj.getColumns()[params.col].binding;
			switch(binding){
				case 'categoryGroupName':
				case 'categoryGroupId':
				case 'itemClass1Name':
				case 'itemClass1':
				case 'itemClass2Name':
				case 'itemClass2':
				case 'itemClass3Name':
				case 'itemClass3':
				case 'itemClass4Name':
				case 'itemClass4':
					_onClickModal = function () {
						let p = {
							modalCategoryGroupId: $('#modalCategoryGroupId').val(),
							modalCategoryGroupName: $("#modalCategoryGroupId option:checked").text(),
							modalItemClass1: $('#modalItemClass1').val(),
							modalItemClass1Name: $("#modalItemClass1 option:checked").text(),
							modalItemClass2: $('#modalItemClass2').val(),
							modalItemClass2Name: $("#modalItemClass2 option:checked").text(),
						};

						if(p.modalCategoryGroupId == '0' || p.modalItemClass1 == '0' ||p.modalItemClass2 == '0'){
							alert('카테고리를 선택해 주세요.');
							return false;
						}

						let row = gridObj.getRowData(params.row);
						row.categoryGroupId = Number(p.modalCategoryGroupId);
						row.categoryGroupName = p.modalCategoryGroupName;
						row.itemClass1 = p.modalItemClass1;
						row.itemClass1Name = p.modalItemClass1Name;
						row.itemClass2 = p.modalItemClass2;
						row.itemClass2Name = p.modalItemClass2Name;
						row.itemClass3 = '000';
						row.itemClass4 = '000';
						gridObj.setRowData(params.row, row);
						$("#categoryModal").modal('hide');
					};
					$("#categoryModal").modal();
					break;
				case 'makerName':
				case 'makerId':
					_onClickModal = function () {
						let p = {
							modalMakerName: $('#modalMakerName').val(),
							modalMakerId: $('#modalMakerId').val()
						};

						if(p.modalMakerName == '' || p.modalMakerCode == ''){
							alert('제조사를 선택해 주세요.');
							return false;
						}

						let row = gridObj.getRowData(params.row);
						row.makerName = p.modalMakerName;
						row.makerId = p.modalMakerId;
						gridObj.setRowData(params.row, row);
						$("#makerModal").modal('hide');
					};
					$("#makerModal").modal();
					$('#modalMakerName').autocomplete('option', 'appendTo', '#makerModal');
					break;
			}
			break;
		case 'setCellData':
			gridObj.setCellData(params.row, params.col, params.cellData);
			break;
	}
}

$(document).ready(function () {
	var searchCategoryGroupId = $('#searchCategoryGroupId').val();
	var searchItemClass1 = $('#searchItemClass1').val();
	var searchItemClass2 = $('#searchItemClass2').val();

	if(searchCategoryGroupId != undefined && searchCategoryGroupId != '' && searchCategoryGroupId != '0'){
		categoryLevel1(searchCategoryGroupId);
	}

	if(searchItemClass1 != undefined && searchItemClass1 != '' && searchItemClass1 != '0'){
		categoryLevels('2',searchItemClass1)
	}

	// if(getRowData().length == 0){
	// 	alert('');
	// }

})

function goSubmit() {

	var categoryGroupId = $("#categoryGroupId").val();
	var itemClass1 = $("#itemClass1").val();
	var itemClass2 = $("#itemClass2").val();
	var itemCode = $("#itemCode").val();
	var itemDesc = $("#itemDesc").val();
	var makerName = $("#makerName").val();

	if(categoryGroupId == '0' && itemClass1 == '0' && itemClass2 == '0' && itemCode == '' && itemDesc == '' && makerName == ''){
		alert('상품분류, 상품코드, 상품명, 제조사 중 하나 이상의 검색 조건을 입력해 주세요.');
		return false;
	}

	if(categoryGroupId !='0' && (itemClass1 == '0' || itemClass2 == '0')){
		alert('상품분류를 모두 선택해 주세요.');
		return false;
	}

	if(itemCode.length>0 && itemCode.length<7){
		alert('상품코드 검색시 앞자리 7자리이상 검색해 주세요.');
		$("#itemCode").focus();
		return false;
	}
	$("#dataForm").submit();
}

function categoryLevel1(categoryGroupId) {
	$.ajax({
		type: 'GET',
		url: '/opmanager/categories/findCategoriesLevel1',
		data: {
			'categoryGroupId': categoryGroupId
		},
		beforeSend: function (xhr) {
		},
		success: function (data) {
			var json = JSON.parse(data);

			let str = "<option value=\"0\">중분류</option>";
			for (key in json) {
				str += "<option value=\"" + json[key].categoryClass1 + "\""

				if(json[key].categoryClass1 == $("#searchItemClass1").val()){
					str+= "selected=\"selected\"";
				}
				str += ">" + json[key].categoryName + " </option>";
			}
			$("#itemClass1").empty();
			$("#itemClass1").append(str);
		}
	});
}

function categoryLevels(categoryLevel,itemClass1) {
	$.ajax({
		type: 'GET',
		url: '/opmanager/categories/findCategoriesLevels',
		data: {
			'categoryLevel' : categoryLevel,
			'itemClass1' : itemClass1
		},
		beforeSend: function (xhr) {
		},
		success: function (data) {
			var json = JSON.parse(data);

			let str = "<option value=\"0\">소분류</option>";
			for (key in json) {
				str += "<option value=\"" + json[key].categoryClass2 + "\""

				if(json[key].categoryClass2 == $("#searchItemClass2").val()){
					str+= "selected=\"selected\"";
				}
				str += ">" + json[key].categoryName + " </option>";
			}
			$("#itemClass2").empty();
			$("#itemClass2").append(str);
		}
	});
}

function saveExcel() {
	gridObj.saveToExcel('find-item.xlsx', '상품조회');
}

function checkedRow() {
	let rows = gridObj.getCheckedData('select');
	console.log('[finditem.js] checkedRow', rows);
}

//
// function saveItem() {
// 	let obj = gridObj.getCheckedData('select');
//
// 	if (obj.length == 0) {
// 		alert('데이터를 하나 이상 선택해 주세요.');
// 		return false;
// 	}
//
// 	let columns = gridObj.getColumns();
// 	let ok = true;
// 	obj.forEach(row => {
// 		columns.forEach(col => {
// 			let data = row[col.binding];
// 			if (data == '') {
// 				row[col.binding] = null;
// 			}
// 			if (col.required) {
// 				if (!data) {
// 					ok = false;
// 					return false;
// 				}
// 			}
// 		});
// 	});
// 	if (!ok) {
// 		alert('필수 데이터는 반드시 입력해야 합니다.');
// 		return false;
// 	}
//
// 	$.ajax({
// 		type: "POST",
// 		url: "/opmanager/item",
// 		data: JSON.stringify(obj),
// 		processData: false,
// 		contentType: "application/json; charset=utf-8",
// 		beforeSend: function (xhr) {
// 		},
// 		success: function (data) {
// 			alert("저장이 완료되었습니다.");
// 			goSubmit();
// 		}
// 	});
// }
//
//
// function removeItem() {
// 	let obj = gridObj.getCheckedData('select');
//
// 	if (obj.length == 0) {
// 		alert('데이터를 하나 이상 선택해 주세요.');
// 		return false;
// 	}
//
// 	for(key in obj){
// 		obj[key].delStatus='DELETED';
// 	}
//
// 	let columns = gridObj.getColumns();
// 	obj.forEach(function(item,index) {
// 		if (item._added) {
// 			obj.splice(index,1);
// 		}
// 	});
//
// 	$.ajax({
// 		type: "POST",
// 		url: "/opmanager/item",
// 		data: JSON.stringify(obj),
// 		processData: false,
// 		contentType: "application/json; charset=utf-8",
// 		beforeSend: function (xhr) {
// 		},
// 		success: function (data) {
// 			alert("저장이 완료되었습니다.");
// 			goSubmit();
// 		}
// 	});
// }


function modalCategoryLevel1(categoryGroupId) {
	$.ajax({
		type: 'GET',
		url: '/opmanager/categories/findCategoriesLevel1',
		data: {
			'categoryGroupId': categoryGroupId
		},
		beforeSend: function (xhr) {
		},
		success: function (data) {
			var json = JSON.parse(data);

			let str = "<option value=\"0\">중분류</option>";
			for (key in json) {
				str += "<option value=\"" + json[key].categoryClass1 + "\""

				str += ">" + json[key].categoryName + " </option>";
			}
			$("#modalItemClass1").empty();
			$("#modalItemClass1").append(str);
		}
	});
}

function modalCategoryLevels(categoryLevel,itemClass1) {
	$.ajax({
		type: 'GET',
		url: '/opmanager/categories/findCategoriesLevels',
		data: {
			'categoryLevel' : categoryLevel,
			'itemClass1' : itemClass1
		},
		beforeSend: function (xhr) {
		},
		success: function (data) {
			var json = JSON.parse(data);

			let str = "<option value=\"0\">소분류</option>";
			for (key in json) {
				str += "<option value=\"" + json[key].categoryClass2 + "\""

				str += ">" + json[key].categoryName + " </option>";
			}
			$("#modalItemClass2").empty();
			$("#modalItemClass2").append(str);
		}
	});
}

//autocomplete 설정
$(function () {
	$('#modalMakerName').autocomplete({
		source: function (request, response) {
			$.ajax({
				type: 'GET',
				url: '/opmanager/makers/findMakerListByName',
				data: {
					'makerName': request.term
				},
				beforeSend: function (xhr) {
				},
				success: function (data) {
					// 서버에서 json 데이터 response 후 목록 추가
					response(
						$.map(data, function (item) {
							return {
								id: item.makerId,
								label: item.makerName,
							}
						})
					);
				}
			});
		},
		select: function (event, ui) {
			$("#modalMakerName").val(ui.item.label);
			$("#modalMakerId").val(ui.item.id);
		},
		focus: function (event, ui) {
			return false;
		},
		minLength: 2,
		autoFocus: true,
		classes: {
			'ui-autocomplete': 'highlight'
		},
		delay: 300,
		position: {my: 'right top', at: 'right bottom'},
		close: function (event) {
		}
	});

	$('#makerName').autocomplete({
		source: function (request, response) {
			$.ajax({
				type: 'GET',
				url: '/opmanager/makers/findMakerListByName',
				data: {
					'makerName': request.term
				},
				beforeSend: function (xhr) {
				},
				success: function (data) {
					// 서버에서 json 데이터 response 후 목록 추가
					response(
						$.map(data, function (item) {
							return {
								id: item.makerId,
								label: item.makerName,
							}
						})
					);
				}
			});
		},
		select: function (event, ui) {
			$("#makerName").val(ui.item.label);
			$("#makerId").val(ui.item.id);
		},
		focus: function (event, ui) {
			return false;
		},
		minLength: 2,
		autoFocus: true,
		classes: {
			'ui-autocomplete': 'highlight'
		},
		delay: 300,
		position: {my: 'right top', at: 'right bottom'},
		close: function (event) {
		}
	});

});


/**
 * 첨부파일로직
 */
$(function () {
	$('#btn-upload').click(function (e) {
		e.preventDefault();
		$('#input_file').click();
	});
});

// 파일 현재 필드 숫자 totalCount랑 비교값
var fileCount = 0;
// 해당 숫자를 수정하여 전체 업로드 갯수를 정한다.
var totalCount = 5;
// 파일 고유넘버
var fileNum = 0;
// 첨부파일 배열
var content_files = new Array();

var fileConst;

function fileCheck(e) {

	var files = e.target.files;

	// 파일 배열 담기
	var filesArr = Array.prototype.slice.call(files);
	// 파일 개수 확인 및 제한
	if (content_files.length == totalCount) {
		alert('파일은 최대 '+totalCount+'개까지 업로드 할 수 있습니다.');
		return false;
	} else {
		fileCount = fileCount + filesArr.length;
	}

	// 각각의 파일 배열담기 및 기타
	filesArr.forEach(function (f) {
		var reader = new FileReader();
		reader.onload = function (e) {
			f.added =true;
			content_files.push(f);
			$('#articlefileChange').append(
				'<div id="file' + fileNum + '" onclick="fileRemove(\'file' + fileNum + '\')">'
				+ '<font style="font-size:12px">' + f.name + '</font>'
				+ '<img src="/content/opmanager/images/category/icon_delete.png" style="width:10px; height:auto; vertical-align: middle; cursor: pointer;"/>'
				+ '<div/>'
			);
			fileNum ++;
		};

		reader.readAsDataURL(f);

	});
	//초기화 한다.
	$("#input_file").val("");
}

// 파일 부분 삭제 함수
function fileRemove(fileNum){
	var no = fileNum.replace(/[^0-9]/g, "");
	if(!content_files[no].added ){
		if(confirm('업로드되어 있는 파일입니다. 삭제하시겠습니까?')){
			content_files[no].delStatus='DELETED';
			//ajax success후 삭제
			$.ajax({
				type: 'POST',
				url: '/opmanager/item/removeItemImage',
				data:
					content_files[no]
				,
				beforeSend: function (xhr) {
				},
				success: function (data) {
					if(data=='SUCCESS'){
						content_files.splice(no,1);
						$('#' + fileNum).remove();
						fileCount --;
						alert('파일이 삭제 되었습니다.');
						location.reload()
					}
				}
			});
		}else{
			return false;
		}
	}else{
		content_files.splice(no,1);
		$('#' + fileNum).remove();
		fileCount --;
	}
}

function fileDownload(fileNum){
	var no = fileNum.replace(/[^0-9]/g, "");
	$("#realFileName").val(content_files[no].realFileName);
	$("#filePath").val(content_files[no].filePath);
	$("#fileExtension").val(content_files[no].fileExtension);
	$("#downLoadForm").submit();
	$('#loading-dimmed').hide();
	$('#loading').hide();
}

function uploadImage(){
	var formData = new FormData(document.getElementById('uploadForm'));

	for (var x = 0; x < content_files.length; x++) {
		formData.append("attach_file", content_files[x]);
	}

	$.ajax({
		type: "POST",
		enctype: "multipart/form-data",
		url: "/opmanager/item/uploadItemImage",
		data : formData,
		processData: false,
		contentType: false,
		success: function (data) {
			if(data == "SUCCESS"){
				alert("업로드가 완료되었습니다");
				location.reload();
			} else
				alert('처리중 오류가 발생했습니다. 관리자에게 문의해 주세요.');
			location.reload()
		},
		error: function (xhr, status, error) {
			alert('처리중 오류가 발생했습니다. 관리자에게 문의해 주세요.');
			location.reload()
			return false;
		}
	});

}

function setUuidModal(params){

	$("#articlefileChange").empty();
	content_files=[];
	fileNum = 0;
	$("#fileItemCode").val(gridObj.getRowData(params.row).itemCode);
	if(gridObj.getRowData(params.row).uuid !=''){
		$.ajax({
			type: "GET",
			url: "/opmanager/item/findItemImageList",
			data : {
				"uuid" : gridObj.getRowData(params.row).uuid
			},
			beforeSend: function (xhr) {
			},
			success: function (data) {

				data.forEach(function(param,index){
					param.added = false;
					content_files.push(param);
					$('#articlefileChange').append(
						'<div id="file' + fileNum + '>'
						+ '<font style="font-size:12px">' + param.realFileName + '</font> '
						+ '<img src="/content/opmanager/images/category/icon_folder.png" style="width:10px; height:auto; vertical-align: middle; cursor: pointer; " onclick="fileDownload(\'file' + fileNum + '\')" />'
						+ ' '
						+ '<img src="/content/opmanager/images/category/icon_delete.png" style="width:10px; height:auto; vertical-align: middle; cursor: pointer; " onclick="fileRemove(\'file' + fileNum + '\')"/>'
						+ '<div/>'
					);
					fileNum++;
				});
				$("#fileModal").modal();
			}
		});
	}else{
		$("#fileModal").modal();
	}
}

function initSearchCondition() {
	let form = $('form');
	form.each(function () {
		this.reset();
	});
	form.find('input[type=hidden]').each(function(){
		this.value = '';
	});
}