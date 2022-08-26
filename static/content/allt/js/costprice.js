let gridObj = null; // 그리드 객체
let _divNames = {};
let _deptNames = {};
let _onClickModal;
let _modalDivisionList, _modalDeptList;

let rowInit = {
	select: true,
	addDate: '',
	addUserId: '',
	agentCode: '',
	areaName: '',
	attachFileNo2: '',
	buyerCode: '',
	buyerId: '',
	buyerName: '',
	categoryCode: '',
	categoryGroupId: '',
	categoryId: '',
	categoryName: '',
	categoryUrl: '',
	changeCode: '',
	changeDate: '',
	changeReason: '',
	changeUserId: '',
	contNo: '',
	contSeq: 0,
	contTypeCode: '',
	contUnitPrice: 0,
	costPriceId: '',
	cur: 'KRW',
	dealCode: 'DIRECTLY',
	delRemark: '',
	delReqUserId: '',
	delStatus: 'UNDELETED',
	erpIfId: '',
	erpIfSendFlag: '0',
	execNo: '',
	execSeq: 0,
	itemClass1: '',
	itemClass2: '',
	itemClass3: '',
	itemClass4: '',
	itemCode: '',
	itemDesc: '',
	leadTime: 0,
	leadTimeCode: 'ETC',
	leadTimeRemark: '',
	modDate: '',
	modUserId: '',
	monoBuyerCode: '',
	monoBuyerName: '',
	moqQty: 1,
	originVendorCode: '',
	priceChangeReason: '',
	purchaseStatus: '',
	qtaUnitPrice: 0,
	regDate: '',
	regUserId: '',
	rvQty: 1,
	saleStatus: '',
	salesUnitPrice: 0,
	taxCode: 'TAXATION',
	validFromDate: '',
	validToDate: '',
	vendorCode: '',
	vendorId: '',
	vendorName: '',
};

// 그리드 객체 세팅
function setGridObj(obj) {
	gridObj = obj;
}

function onGridEvent(eventFunc, params) {
	console.log(`[itemMasterList.jsp] on grid event: ${eventFunc}`, params);
	switch (eventFunc) {
		case 'itemClicked':
		case 'addRowClicked':
			let clickedBinding = gridObj.getColumns()[params.col].binding;
			switch (clickedBinding) {
				case 'buyerId' :
				case 'buyerName' :
				case 'buyerCode' :
					_onClickModal = function () {
						let p = {
							buyerModalName: $('#buyerModalName').val(),
							buyerModalId: $('#buyerModalId').val(),
							buyerModalCode: $('#buyerModalCode').val(),
						};

						if(p.buyerModalName == '' || p.buyerModalId == ''|| p.buyerModalCode == ''){
							alert('고객사를 선택해 주세요.');
							return false;
						}

						let row = gridObj.getRowData(params.row);
						row.buyerId = p.buyerModalId;
						row.buyerCode = p.buyerModalCode;
						row.buyerName = p.buyerModalName;
						gridObj.setRowData(params.row, row);
						$("#buyerModal").modal('hide');
					};
					$("#buyerModal").modal();
					$('#buyerModalName').autocomplete('option', 'appendTo', '#buyerModal');
					break;
				case 'vendorId' :
				case 'vendorName' :
				case 'vendorCode' :
					_onClickModal = function () {
						let p = {
							vendorModalName: $('#vendorModalName').val(),
							vendorModalId: $('#vendorModalId').val(),
							vendorModalCode: $('#vendorModalCode').val(),
						};

						if(p.vendorModalName == '' || p.vendorModalId == ''|| p.vendorModalCode == ''){
							alert('공급사를 선택해 주세요.');
							return false;
						}

						let row = gridObj.getRowData(params.row);
						row.vendorId = p.vendorModalId;
						row.vendorCode = p.vendorModalCode;
						row.vendorName = p.vendorModalName;
						gridObj.setRowData(params.row, row);
						$("#vendorModal").modal('hide');
					};
					$("#vendorModal").modal();
					$('#vendorModalName').autocomplete('option', 'appendTo', '#vendorModal');
					break;
				case 'itemDesc' :
				case 'itemCode' :
					_onClickModal = function () {
						let p = {
							itemModalDesc: $('#itemModalDesc').val(),
							itemModalCode: $('#itemModalCode').val(),
						};

						if(p.itemModalDesc == '' || p.itemModalCode == ''){
							alert('아이템을 선택해 주세요.');
							return false;
						}

						let row = gridObj.getRowData(params.row);
						row.itemCode = p.itemModalCode;
						row.itemDesc = p.itemModalDesc;
						gridObj.setRowData(params.row, row);
						$("#itemModal").modal('hide');
					};
					$("#itemModal").modal();
					$('#itemModalDesc').autocomplete('option', 'appendTo', '#itemModal');
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

})

function validateSearchCondition() {
	var categoryGroupId = $("#categoryGroupId").val();
	var itemClass1 = $("#itemClass1").val();
	var itemClass2 = $("#itemClass2").val();
	var itemCode = $("#itemCode").val();
	var itemDesc = $("#itemDesc").val();
	var vendorName = $("#vendorName").val();
	var vendorId = $("#vendorId").val();
	var buyerName = $("#buyerName").val();
	var buyerId = $("#buyerId").val();

	if (categoryGroupId == '0' && itemClass1 == '0' && itemClass2 == '0'
		&& itemCode == '' && itemDesc == ''
		&& vendorName == '' && vendorId == ''
		&& buyerName == '' && buyerId == '') {
		alert('상품분류, 상품코드, 상품명, 공급사명, 고객사명 중 하나 이상의 검색 조건을 입력해주세요.');
		return false;
	}

	if(categoryGroupId !='0' && (itemClass1 == '0' || itemClass2 == '0')){
		alert('상품분류를 모두 선택해 주세요.');
		return false;
	}


	if (itemCode.length > 0 && itemCode.length < 7) {
		alert('상품코드 검색 시 앞자리 7자리이상 검색해 주세요.');
		$("#itemCode").focus();
		return false;
	}

	if (itemDesc.length > 0 && itemDesc.length < 2) {
		alert('상품명 검색시 2글자 이상 검색해 주세요.');
		$("#itemDesc").focus();
		return false;
	}
}


function goSubmit() {
	var categoryGroupId = $("#categoryGroupId").val();
	var itemClass1 = $("#itemClass1").val();
	var itemClass2 = $("#itemClass2").val();
	var itemCode = $("#itemCode").val();
	var itemDesc = $("#itemDesc").val();
	var vendorName = $("#vendorName").val();
	var vendorId = $("#vendorId").val();
	var buyerName = $("#buyerName").val();
	var buyerId = $("#buyerId").val();

	if (categoryGroupId == '0' && itemClass1 == '0' && itemClass2 == '0'
		&& itemCode == '' && itemDesc == ''
		&& vendorName == '' && vendorId == ''
		&& buyerName == '' && buyerId == '') {
		alert('상품분류, 상품코드, 상품명, 공급사명, 고객사명 중 하나 이상의 검색 조건을 입력해주세요.');
		return false;
	}

	if(categoryGroupId !='0' && (itemClass1 == '0' || itemClass2 == '0')){
		alert('상품분류를 모두 선택해 주세요.');
		return false;
	}


	if (itemCode.length > 0 && itemCode.length < 7) {
		alert('상품코드 검색 시 앞자리 7자리이상 검색해 주세요.');
		$("#itemCode").focus();
		return false;
	}

	if (itemDesc.length > 0 && itemDesc.length < 2) {
		alert('상품명 검색시 2글자 이상 검색해 주세요.');
		$("#itemDesc").focus();
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
			let str2 = "<option value=\"0\">소분류</option>";

			for (key in json) {
				str += "<option value=\"" + json[key].categoryClass1 + "\""

				if(json[key].categoryClass1 == $("#searchItemClass1").val()){
					str+= "selected=\"selected\"";
				}
				str += ">" + json[key].categoryName + " </option>";
			}
			$("#itemClass1").empty();
			$("#itemClass2").empty();
			$("#itemClass1").append(str);
			$("#itemClass2").append(str2);
			$("#searchItemClass1").val('');
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
			$("#searchItemClass2").val('');
		}
	});
}

function addRowData() {
	console.log('[costprice.js] addRowData', rowInit);
	gridObj.addRow(rowInit);
}

function deleteRowData() {
	gridObj.deleteCheckedRow('select');
}

function saveExcel() {
	gridObj.saveToExcel('cost-price.xlsx', '상품가격관리');
}

function loadExcel() {
	gridObj.loadFromExcel(rowInit);
}

function checkedRow() {
	let rows = gridObj.getCheckedData('select');
	console.log('[costprice.js] checkedRow', rows);
	return rows;
}

function saveCostPrice() {
	let obj = gridObj.getCheckedData('select');
	if (obj.length == 0) {
		alert('데이터를 하나 이상 선택해 주세요.');
		return false;
	}
	let columns = gridObj.getColumns();
	let ok = true;
	obj.forEach(row => {
		if (row._added) {
			columns.forEach(col => {
				if (col.required) {
					let data = row[col.binding];
					if (!data || data == '') {
						ok = false;
					}
				}
			});
		}
	});
	if (!ok) {
		alert('필수 데이터는 반드시 입력해야 합니다.');
		return false;
	}
	requestAjax(
		{
			type: 'POST',
			url: '/opmanager/costprice',
			data: JSON.stringify(obj)
		},
		function (data) {
			alert('저장이 완료되었습니다.');
			location.reload();
		});
}
function requestAjax(params, callback) {
	let p = {
		type: params.type,
		url: params.url,
		data: params.data,
		beforeSend: function (xhr) {},
		success: function (data) {
			console.log(`[costprice.js] ${params.url}`, {request: params.data, response: data});
			callback(data);
		}
	}
	if (params.type == 'POST') {
		p.processData = false;
		p.contentType = 'application/json; charset=utf-8';
	}
	$.ajax(p);
}

function removeItem() {
	let obj = gridObj.getCheckedData('select');

	if (obj.length == 0) {
		alert('데이터를 하나 이상 선택해 주세요.');
		return false;
	}

	for(key in obj){
		obj[key].delStatus='DELETED';
	}

	let columns = gridObj.getColumns();
	obj.forEach(function(item,index) {
		if (item._added) {
			obj.splice(index,1);
		}
	});

	$.ajax({
		type: "POST",
		url: "/opmanager/costprice",
		data: JSON.stringify(obj),
		processData: false,
		contentType: "application/json; charset=utf-8",
		beforeSend: function (xhr) {
		},
		success: function (data) {
			alert("저장이 완료되었습니다.");
			location.reload();
		}
	});
}

//autocomplete 설정
$(function () {
	$('#buyerName').autocomplete({
		source: function (request, response) {
			$.ajax({
				type: 'GET',
				url: '/opmanager/buyer/buyers/findBuyerByBuyerName',
				data: {
					'buyerName': request.term
				},
				beforeSend: function (xhr) {
				},
				success: function (data) {
					// 서버에서 json 데이터 response 후 목록 추가
					response(
						$.map(data, function (item) {
							return {
								id: item.buyerId,
								label: item.buyerName
							}
						})
					);
				},
				error: (log)=>{
					console.log(log)
				}
			});
		},
		select: function (event, ui) {
			$("#buyerId").val(ui.item.id);
			$("#buyerName").val(ui.item.name);
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

	$('#buyerModalName').autocomplete({
		source: function (request, response) {
			$.ajax({
				type: 'GET',
				url: '/opmanager/buyer/buyers/findBuyerByBuyerName',
				data: {
					'buyerName': request.term
				},
				beforeSend: function (xhr) {
				},
				success: function (data) {
					// 서버에서 json 데이터 response 후 목록 추가
					response(
						$.map(data, function (item) {
							return {
								id: item.buyerId,
								code: item.buyerCode,
								label: item.buyerName
							}
						})
					);
				},
				error: (log)=>{
					console.log(log)
				}
			});
		},
		select: function (event, ui) {
			$("#buyerModalId").val(ui.item.id);
			$("#buyerModalCode").val(ui.item.code);
			$("#buyerModalName").val(ui.item.name);
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
	$('#vendorName').autocomplete({
		source: function (request, response) {
			$.ajax({
				type: 'GET',
				url: '/opmanager/vendor/vendors/findVendorByVendorName',
				data: {
					'vendorName': request.term
				},
				beforeSend: function (xhr) {
				},
				success: function (data) {
					// 서버에서 json 데이터 response 후 목록 추가
					response(
						$.map(data, function (item) {
							return {
								id: item.vendorId,
								label: item.vendorName
							}
						})
					);
				},
				error: (log)=>{
					console.log(log)
				}
			});
		},
		select: function (event, ui) {
			$("#vendorId").val(ui.item.id);
			$("#vendorName").val(ui.item.name);
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

	$('#vendorModalName').autocomplete({
		source: function (request, response) {
			$.ajax({
				type: 'GET',
				url: '/opmanager/vendor/vendors/findVendorByVendorName',
				data: {
					'vendorName': request.term
				},
				beforeSend: function (xhr) {
				},
				success: function (data) {
					// 서버에서 json 데이터 response 후 목록 추가
					response(
						$.map(data, function (item) {
							return {
								id: item.vendorId,
								code: item.vendorCode,
								label: item.vendorName
							}
						})
					);
				},
				error: (log)=>{
					console.log(log)
				}
			});
		},
		select: function (event, ui) {
			$("#vendorModalId").val(ui.item.id);
			$("#vendorModalCode").val(ui.item.code);
			$("#vendorModalName").val(ui.item.name);
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

	$('#itemModalDesc').autocomplete({
		source: function (request, response) {
			$.ajax({
				type: 'GET',
				url: '/opmanager/item/findItemBy',
				data: {
					'itemDesc': request.term
				},
				beforeSend: function (xhr) {
				},
				success: function (data) {
					// 서버에서 json 데이터 response 후 목록 추가
					response(
						$.map(data, function (item) {
							return {
								code: item.itemCode,
								label: item.itemDesc
							}
						})
					);
				},
				error: (log)=>{
					console.log(log)
				}
			});
		},
		select: function (event, ui) {
			$("#itemModalCode").val(ui.item.code);
			$("#itemModalDesc").val(ui.item.name);
		},
		focus: function (event, ui) {
			return false;
		},
		minLength: 1,
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

function initSearchCondition() {
	let form = $('form');
	form.each(function () {
		this.reset();
	});
	form.find('input[type=hidden]').each(function(){
		this.value = '';
	});
}
