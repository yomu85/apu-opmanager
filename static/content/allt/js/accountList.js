let gridObj = null; // 그리드 객체
let _onClickModal;

let rowInit = {
    select: true,
    buyerId: '',
    buyerCode: '',
    buyerName: '',
    useStatus: 'USE',
    accountId: '',
    accountCode: '',
    accountName: '',
    delStatus: 'UNDELETED',
    modDate: '',
    modUserId: '',
    regDate: '',
    regUserId: '',
    idExist: '',
    version: ''
};

// 그리드 객체 세팅
function setGridObj(obj) {
    gridObj = obj;
}

// 그리드 이벤트 리스닝
function onGridEvent(eventFunc, params) {
    console.log(`[accountList.jsp] onGridEvent: ` + eventFunc, params);
    switch (eventFunc) {
        case 'itemClicked':
            break;
        case 'addRowClicked':
            switch (gridObj.getColumns()[params.col].binding) {
                case 'buyerId':   // 고객사ID
                case 'buyerCode':   // 고객사코드
                case 'buyerName':   // 고객사명
                    _onClickModal = function () {
                        let p = {
                            buyerName: $('#buyerModalName').val(),
                            buyerId: $('#buyerModalId').val(),
                            buyerCode: $('#buyerModalCode').val(),
                        };
                        console.log(`[accountList.jsp] ${binding} modal on click`, p);
                        let row = gridObj.getRowData(params.row);
                        row.buyerName = p.buyerName;
                        row.buyerId = p.buyerId;
                        row.buyerCode = p.buyerCode;
                        gridObj.setRowData(params.row, row);
                        $("#buyerModal").modal('hide');
                    };
                    $("#buyerModal").modal();
                    $('#buyerModalName').autocomplete('option', 'appendTo', '#buyerModal');
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
            console.log('[accountList.jsp] #buyerName.autocomplete.select', {event: event, ui: ui});
            $('#buyerId').val(ui.item.id);
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
            console.log('[accountList.jsp] #buyerModalName.autocomplete.select', {event: event, ui: ui});
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

function goSubmit() {
    $("#dataForm").submit();
}

function saveBudgetBulk() {
    alert('준비중인 기능 입니다.');
    return false;
}

function saveAccount() {
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
            url: '/opmanager/account/accounts',
            data: JSON.stringify(obj)
        },
        function (data) {
            alert('저장이 완료되었습니다.');
            goSubmit();
        });
}

function removeAccount() {
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
            url: '/opmanager/account/accounts',
            data: JSON.stringify(obj)
        },
        function (data) {
            alert('삭제가 완료되었습니다.');
            goSubmit();
        });
}

function addRowData() {
    console.log('[accountList.jsp] addRowData', rowInit);
    gridObj.addRow(rowInit);
}

function deleteRowData() {
    gridObj.deleteCheckedRow('select');
}

function saveExcel() {
    gridObj.saveToExcel('account-management.xlsx', '계정관리');
}

function loadExcel() {
    gridObj.loadFromExcel(rowInit);
}

function checkedRow() {
    let rows = gridObj.getCheckedData('select');
    console.log('[accountList.jsp] checkedRow', rows);
}

function buyerNameChk() {
    $("#buyerId").val('');
}

function requestAjax(params, callback) {
    let p = {
        type: params.type,
        url: params.url,
        data: params.data,
        beforeSend: function (xhr) {
            console.log(`[accountList.jsp] ${params.url} request`, params.data);
        },
        success: function (data) {
            console.log(`[accountList.jsp] ${params.url} response`, data);
            callback(data);
        },
        error: function (msg) {
            console.log(`[accountList.jsp] ${params.url} error`, msg);
            alert(msg);
        }
    }
    if (params.type == 'POST') {
        p.processData = false;
        p.contentType = 'application/json; charset=utf-8';
    }
    $.ajax(p);
}