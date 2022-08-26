let gridObj = null; // 그리드 객체
let _divNames = {};
let _deptNames = {};
let _accntNames = {};
let _onClickModal;
let _modalDivisionList, _modalDeptList, _modalAccountList;

let rowInit = {
	select: true,
	budgetId: '',
	budgetYearMonth: '',
	buyerId: '',
	buyerCode: '',
	buyerName: '',
	divisionId: '',
	divisionCode: '',
	divisionName: '',
	deptId: '',
	deptCode: '',
	deptName: '',
	accountId: '',
	accountCode: '',
	accountName: '',
	currency: 'KRW',
	transferedAmount: 0,
	transferedReason: '',
	transferedReqUserName: '',
	budgetAmount: 0,
	exhaustAmount: 0,
	additionalAmount: 0,
	balance: 0,
	delStatus: 'UNDELETED',
	modDate: '',
	modUserId: '',
	regDate: '',
	regUserId: ''
};

// 그리드 객체 세팅
function setGridObj(obj) {
	gridObj = obj;
}

// 그리드 이벤트 리스닝
function onGridEvent(eventFunc, params) {
	console.log(`[budgetList.js] onGridEvent: ` + eventFunc, params);
	switch (eventFunc) {
		case 'itemClicked':
			break;
		case 'addRowClicked':
			let binding = gridObj.getColumns()[params.col].binding;
			switch (binding) {
				case 'buyerId':   // 고객사ID
				case 'buyerCode':   // 고객사코드
				case 'buyerName':   // 고객사명
					_onClickModal = function () {
						let p = {
							buyerName: $('#buyerModalName').val(),
							buyerId: $('#buyerModalId').val(),
							buyerCode: $('#buyerModalCode').val(),
						};
						console.log(`[budgetList.js] ${binding} modal on click`, p);
						let row = gridObj.getRowData(params.row);
						row.buyerName = p.buyerName;
						row.buyerId = p.buyerId;
						row.buyerCode = p.buyerCode;
						gridObj.setRowData(params.row, row);
						$('#buyerModal').modal('hide');
					};
					$('#buyerModal').modal();
					$('#buyerModalName').autocomplete('option', 'appendTo', '#buyerModal');
					break;
				case 'divisionId':   // 사업부ID
				case 'divisionCode':   // 사업부코드
				case 'divisionName':   // 사업부명
					let byrId = gridObj.getRowData(params.row).buyerId;
					if (!byrId || byrId == '') {
						alert('고객사를 먼저 선택해주세요.');
						return;
					}
					requestAjax(
						{
							type: 'GET',
							url: '/opmanager/budgets/findBuyerDivisionName',
							data: {
								buyerId: byrId
							}
						},
						function (data) {
							_modalDivisionList = data;
							if (_modalDivisionList.length > 0) {
								$('#divisionModalSelect').empty();
								let str = '<option value="0">----선택----</option>';
								_modalDivisionList.forEach(item => {
									str += '<option value="' + item.divisionId + '">' + item.divisionName + '</option>';
								});
								$('#divisionModalSelect').append(str);
								_onClickModal = function () {
									let p = {
										divisionId: $('#divisionModalSelect').val()
									};
									let div = _modalDivisionList.find(item => item.divisionId == p.divisionId);
									p.divisionName = div.divisionName;
									p.divisionCode = div.divisionCode;
									console.log(`[budgetList.js] ${binding} modal on click`, p);
									let row = gridObj.getRowData(params.row);
									row.divisionName = p.divisionName;
									row.divisionId = p.divisionId;
									row.divisionCode = p.divisionCode;
									gridObj.setRowData(params.row, row);
									$('#divisionModal').modal('hide');
								};
								$('#divisionModal').modal();
							} else {
								alert('사업부 목록을 확인할 수 없습니다.');
							}
						});
					break;
				case 'deptId':   // 부서ID
				case 'deptCode':   // 부서코드
				case 'deptName':   // 부서명
					let divId = gridObj.getRowData(params.row).divisionId;
					if (!divId || divId == '') {
						alert('사업부를 먼저 선택해주세요.');
						return;
					}
					requestAjax(
						{
							type: 'GET',
							url: '/opmanager/budgets/findBuyerDeptName',
							data: {
								divisionId: divId
							}
						},
						function (data) {
							_modalDeptList = data;
							if (_modalDeptList.length > 0) {
								$('#deptModalSelect').empty();
								let str = '<option value="0">----선택----</option>';
								_modalDeptList.forEach(item => {
									str += '<option value="' + item.deptId + '">' + item.deptName + '</option>';
								});
								$('#deptModalSelect').append(str);
								_onClickModal = function () {
									let p = {
										deptId: $('#deptModalSelect').val()
									};
									let sel = _modalDeptList.find(item => item.deptId == p.deptId);
									p.deptName = sel.deptName;
									p.deptCode = sel.deptCode;
									console.log(`[budgetList.js] ${binding} modal on click`, p);
									let row = gridObj.getRowData(params.row);
									row.deptId = p.deptId;
									row.deptName = p.deptName;
									row.deptCode = p.deptCode;
									gridObj.setRowData(params.row, row);
									$('#deptModal').modal('hide');
								};
								$('#deptModal').modal();
							} else {
								alert('부서 목록을 확인할 수 없습니다.');
							}
						});
					break;
				case 'accountId':   // 계정ID
				case 'accountCode':   // 계정코드
				case 'accountName':   // 계정명
					let byrId2 = gridObj.getRowData(params.row).buyerId;
					if (!byrId2 || byrId2 == '') {
						alert('고객사를 먼저 선택해주세요.');
						return;
					}
					requestAjax(
						{
							type: 'GET',
							url: '/opmanager/account/accounts/findBuyerAccountByBuyerId',
							data: {
								buyerId: byrId2
							}
						},
						function (data) {
							_modalAccountList = data;
							if (_modalAccountList.length > 0) {
								$('#accountModalSelect').empty();
								let str = '<option value="0">----선택----</option>';
								_modalAccountList.forEach(item => {
									str += '<option value="' + item.accountId + '">' + item.accountName + '</option>';
								});
								$('#accountModalSelect').append(str);
								_onClickModal = function () {
									let p = {
										accountId: $('#accountModalSelect').val()
									};
									let sel = _modalAccountList.find(item => item.accountId == p.accountId);
									p.accountName = sel.accountName;
									p.accountCode = sel.accountCode;
									console.log(`[budgetList.js] ${binding} modal on click`, p);
									let row = gridObj.getRowData(params.row);
									row.accountName = p.accountName;
									row.accountId = p.accountId;
									row.accountCode = p.accountCode;
									gridObj.setRowData(params.row, row);
									$('#accountModal').modal('hide');
								};
								$('#accountModal').modal();
							}
						});
					break;
			}
			break;
		case 'setCellData':
			gridObj.setCellData(params.row, params.col, params.data);
			break;
	}
}

$(document).ready(function () {
	let buyerId = $('#buyerId').val();
	// 검색조건 유지
	if (buyerId != '') {
		requestAjax(
			{
				type: 'GET',
				url: '/opmanager/budgets/findBuyerBasicInfoById',
				data: {
					buyerId: buyerId
				}
			},
			function (data) {
				$('#buyerId').val(data.buyerId);
				$('#buyerName').val(data.buyerName);
			});
		requestAjax(
			{
				type: 'GET',
				url: '/opmanager/budgets/findBuyerDivisionName',
				data: {
					buyerId: buyerId
				}
			},
			function (data) {
				let str = '<option value="0">----선택----</option>';
				data.forEach(item => {
					str += '<option value="' + item.divisionId + '" ';
					if (item.divisionId == $('#searchDivisionId').val()) {
						str+= 'selected="selected"';
					}
					str += '>' + item.divisionName + '</option>';
				});
				$('#divisionId').empty();
				$('#divisionId').append(str);
			});
		requestAjax(
			{
				type: 'GET',
				url: '/opmanager/budgets/findBuyerDeptName',
				data: {
					divisionId: $('#searchDivisionId').val()
				}
			},
			function (data) {
				let str = '<option value="0">----선택----</option>';
				data.forEach(item => {
					str += '<option value="' + item.deptId + '" '
					if (item.deptId == $('#searchDeptId').val()) {
						str+= 'selected="selected"';
					}
					str += '>' + item.deptName + '</option>';
				});
				$('#deptId').empty();
				$('#deptId').append(str);
			});
		requestAjax(
			{
				type: 'GET',
				url: '/opmanager/account/accounts/findBuyerAccountByBuyerId',
				data: {
					buyerId: buyerId
				}
			},
			function (data) {
				let str = '<option value="0">----선택----</option>';
				data.forEach(item => {
					str += '<option value="' + item.accountId + '" ';
					if (item.accountId == $('#searchAccountId').val()) {
						str += 'selected="selected"';
					}
					str += '>' + item.accountName + '</option>';
				});
				$('#accountId').empty();
				$('#accountId').append(str);
			});
	}
});

// autocomplete 설정
$(function () {
	$('#buyerName').autocomplete({
		source: function (request, response) {
			requestAjax(
				{
					type: 'GET',
					url: '/opmanager/budgets/findBuyerName',
					data: {
						buyerName: request.term
					}
				},
				function (data) {
					// 서버에서 json 데이터 response 후 목록 추가
					response(
						$.map(data, function (item) {
							return {
								label: item.buyerName,
								id: item.buyerId,
								code: item.buyerCode,
							}
						})
					);
				});
		},
		select: function (event, ui) {
			console.log('[budgetList.js] #buyerName.autocomplete.select', {event: event, ui: ui});
			$('#buyerId').val(ui.item.id);
			let str = '<option value="0">----선택----</option>';
			$('#deptId').empty();
			$('#deptId').append(str);
			$('#accountId').empty();
			$('#accountId').append(str);
			_divNames = {};
			_deptNames = {};
			_accntNames = {};
			requestAjax(
				{
					type: 'GET',
					url: '/opmanager/budgets/findBuyerDivisionName',
					data: {
						buyerId: ui.item.id
					}
				},
				function (data) {
					for (let key in data) {
						str += '<option value="' + data[key].divisionId + '">' + data[key].divisionName + ' </option>';
						_divNames[data[key].divisionId] = data[key].divisionName;
					}
					$('#divisionId').empty();
					$('#divisionId').append(str);
					str = '<option value="0">----선택----</option>';
					requestAjax(
						{
							type: 'GET',
							url: '/opmanager/account/accounts/findBuyerAccountByBuyerId',
							data: {
								buyerId: ui.item.id
							}
						},
						function (data) {
							data.forEach(item => {
								str += '<option value="' + item.accountId + '">' + item.accountName + ' </option>';
								_accntNames[item.accountId] = item.accountName;
							});
							$('#accountId').empty();
							$('#accountId').append(str);
						});
				});
		},
		focus: function (event, ui) {
			return false;
		},
		minLength: 2,
		autoFocus: true,
		classes: {
			'ui-autocomplete': 'highlight'
		},
		delay: 500,
		position: {my: 'right top', at: 'right bottom'},
		close: function (event) {
			// console.log(event);
		}
	});
	$('#buyerModalName').autocomplete({
		source: function (request, response) {
			requestAjax(
				{
					type: 'GET',
					url: '/opmanager/budgets/findBuyerName',
					data: {
						buyerName: request.term
					}
				},
				function (data) {
					// 서버에서 json 데이터 response 후 목록 추가
					response(
						$.map(data, function (item) {
							return {
								label: item.buyerName,
								id: item.buyerId,
								code: item.buyerCode,
							}
						})
					);
				});
		},
		select: function (event, ui) {
			console.log('[budgetList.js] #buyerModalName.autocomplete.select', {event: event, ui: ui});
			$('#buyerModalId').val(ui.item.id);
			$('#buyerModalCode').val(ui.item.code);
		},
		focus: function (event, ui) {
			return false;
		},
		minLength: 2,
		autoFocus: true,
		classes: {
			'ui-autocomplete': 'highlight'
		},
		delay: 500,
		position: { my: 'right top', at: 'right bottom' },
		close: function (event) {
			// console.log(event);
		}
	});
});

function findDeptName(id) {
	_deptNames = {};
	if (id == 0) {
		$("#deptId").empty();
		$("#deptId").append('<option value="0">----선택----</option>');
		return false;
	}
	requestAjax(
		{
			type: 'GET',
			url: '/opmanager/budgets/findBuyerDeptName',
			data: {
				divisionId: id
			}
		},
		function (data) {
			let str = '<option value="0">----선택----</option>';
			for (let key in data) {
				str += '<option value="' + data[key].deptId + '">' + data[key].deptName + '</option>';
				_deptNames[data[key].deptId] = data[key].deptName;
			}
			$('#deptId').empty();
			$('#deptId').append(str);
		});
}

function goSubmit() {
	var yearMonth = $("#year").val() + $("#month").val();
	$("#yearMonth").val(yearMonth);
	$("#dataForm").submit();
}

function saveBudgetBulk() {
	alert('준비중인 기능 입니다.');
	return false;
}

function saveBudget() {
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
			url: '/opmanager/budgets',
			data: JSON.stringify(obj)
		},
		function (data) {
			alert('저장이 완료되었습니다.');
			goSubmit();
		});
}

function removeBudget() {
	let obj = gridObj.getCheckedData('select');
	if (obj.length == 0) {
		alert('데이터를 하나 이상 선택해 주세요.');
		return false;
	}
	for (let key in obj) {
		obj[key].delStatus = 'DELETED';
	}
	requestAjax(
		{
			type: 'POST',
			url: '/opmanager/budgets',
			data : JSON.stringify(obj)
		},
		function (data) {
			alert('삭제가 완료되었습니다.');
			goSubmit();
		});
}

function transferBudget () {
	let reqUserName = $('#reqUser').val();
	let reason = $('#reason').val();
	if (reason == '') {
		alert('이월 사유를 입력해 주세요.');
		return false;
	}
	if (reqUserName == '') {
		alert('요청자를 입력해 주세요.');
		return false;
	}
	$('#transferModal').modal('hide');
	let obj = gridObj.getCheckedData('select');
	let budgetId =obj[0].budgetId;
	if (obj.length > 1) {
		alert('이월은 하나 이상 선택할 수 없습니다.');
		return false;
	}
	let json = new Object();
	json.transferedReason = reason;
	json.transferedReqUserName = reqUserName;
	requestAjax(
		{
			type: 'PUT',
			url: '/opmanager/budgets/' + budgetId + '/transfer',
			data : JSON.stringify(json)
		},
		function (data) {
			alert('완료되었습니다.');
			goSubmit();
		});
}

function transferBudgetModal() {
	$('#reqUser').val('');
	$('#reason').val('');
	let obj = gridObj.getCheckedData('select');
	if (obj.length == 0) {
		alert('이월하실 데이터를 선택해 주세요.');
		return false;
	}
	$('#transferModal').modal();
}

function addRowData() {
	let divId = $('#divisionId').val();
	if (_divNames[divId]) {
		rowInit.divisionId = divId;
		rowInit.divisionName = _divNames[divId];
	}
	let deptId = $('#deptId').val();
	if (_deptNames[deptId]) {
		rowInit.deptId = deptId;
		rowInit.deptName = _deptNames[deptId];
	}
	console.log('[budgetList.js] addRowData', rowInit);
	gridObj.addRow(rowInit);
}

function deleteRowData() {
	gridObj.deleteCheckedRow('select');
}

function saveExcel() {
	gridObj.saveToExcel('budget-management.xlsx', '예산관리');
}

function loadExcel() {
	gridObj.loadFromExcel(rowInit);
}

function checkedRow() {
	let rows = gridObj.getCheckedData('select');
	console.log('[budgetList.js] checkedRow', rows);
	return rows;
}

function accountNameChk() {
	$('#accountId').val('');
}

function buyerNameChk() {
	let str = '<option value="0">----선택----</option>';
	$('#buyerId').val('');
	$('#deptId').empty();
	$('#deptId').append(str);
	$('#divisionId').empty();
	$('#divisionId').append(str);
}

function requestAjax(params, callback) {
	let p = {
		type: params.type,
		url: params.url,
		data: params.data,
		beforeSend: function (xhr) {
			console.log(`[budgetList.js] ${params.url} request`, params.data);
		},
		success: function (data) {
			console.log(`[budgetList.js] ${params.url} respone`, data);
			callback(data);
		},
		error: function (msg) {
			console.log(`[budgetList.js] ${params.url} error`, msg);
			alert(msg);
		}
	}
	if (params.type == 'POST') {
		p.processData = false;
		p.contentType = 'application/json; charset=utf-8';
	}
	$.ajax(p);
}

function initSearchCondition() {
	let form = $('#dataForm');

	form.find('input[type=hidden]').each(function(){
		this.value = '';
	});

	$.ajax({
		url : '/opmanager/budgets/default',
		type : 'GET',
		beforeSend: function (xhr) {
		},
		success : function(data) {
			var resp = $(data);
			$("#buyerName").val(resp.find('#buyerName').val());
			$("#year").html(resp.find('#year').html());
			$("#month").html(resp.find('#month').html());
			$("#divisionId").html(resp.find('#divisionId').html());
			$("#deptId").html(resp.find('#deptId').html());
			$("#accountId").html(resp.find('#accountId').html());


		}
	});
}
