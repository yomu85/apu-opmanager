$.ajaxSetup({
    beforeSend: function ( xhr ) {
    }
});

let gridObj = null; // 그리드 객체
let _onClickModal;

let rowInit = {
    select: true,
    buyerCode: '',
    buyerId: '',
    buyerName: '',
    delStatus: '',
    divisionCode: '',
    divisionId: '',
    divisionName: '',
};

// 그리드 객체 세팅
function setGridObj(obj) {
    gridObj = obj;
}

// 그리드 이벤트 리스닝
function onGridEvent(eventFunc, params) {
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
                        console.log(`[divisionList.jsp] ${binding} modal on click`, p);
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

function goSubmit() {
    $("#dataForm").submit();
}

function saveDivision() {
    let obj = gridObj.getCheckedData('select');
    if (obj.length == 0) {
        alert('데이터를 하나 이상 선택해 주세요.');
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/opmanager/buyer/divisions",
        data: JSON.stringify(obj),
        processData: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
        },
        success: function (data) {
            alert("저장이 완료되었습니다.");
            goSubmit();
        }
    });
}

function removeDivision() {
    let obj = gridObj.getCheckedData('select');
    if (obj.length == 0) {
        alert('데이터를 하나 이상 선택해 주세요.');
        return false;
    }
    let queryString = '';
    for (let key in obj) {
        obj[key].delStatus = 'DELETED';
        queryString += 'divisionId=' + obj[key].divisionId + '&'
    }
    let columns = gridObj.getColumns();
    obj.forEach(function(item,index) {
        if (item._added) {
            obj.splice(index,1);
        }
    });
    $.ajax({
        type: "DELETE",
        url: "/opmanager/buyer/divisions?" + queryString,
        processData: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
        },
        success: function (data) {
            alert("삭제가 완료되었습니다.");
            goSubmit();
        }
    });
}
$(function () {
    $('#buyerName').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'GET',
                url: '/opmanager/budgets/findBuyerName',
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
                                label: item.buyerName,
                                id: item.buyerId,
                                code: item.buyerCode
                            }
                        })
                    );
                }
            });
        },
        select: function (event, ui) {
            console.log('[divisionList.jsp] #buyerName.autocomplete.select', {event: event, ui: ui});
            $("#buyerId").val(ui.item.id);
            $("#searchBuyer").text(ui.item.label);
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
            $.ajax({
                type: 'GET',
                url: '/opmanager/budgets/findBuyerName',
                data: {
                    'buyerName': request.term
                },
                beforeSend: function (xhr) {
                },
                success : function (data) {
                    // 서버에서 json 데이터 response 후 목록 추가
                    response(
                        $.map(data, function (item) {
                            return {
                                label: item.buyerName,
                                id: item.buyerId,
                                code: item.buyerCode
                            }
                        })
                    );
                }
            });
        },
        select: function (event, ui) {
            console.log('[divisionList.jsp] #buyerModalName.autocomplete.select', { event: event, ui: ui });
            $("#buyerModalId").val(ui.item.id);
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

function addRowData() {
    console.log('[divisionList.jsp] addRowData', rowInit);
    gridObj.addRow(rowInit);
}

function deleteRowData() {
    gridObj.deleteCheckedRow('select');
}

function saveExcel() {
    gridObj.saveToExcel('division-list.xlsx', '사업부관리');
}

function loadExcel() {
    gridObj.loadFromExcel(rowInit);
}

function checkedRow() {
    let rows = gridObj.getCheckedData('select');
    console.log('[divisionList.jsp] checkedRow', rows);
    return rows;
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