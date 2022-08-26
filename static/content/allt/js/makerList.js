let gridObj = null; // 그리드 객체
let _divNames = {};
let _deptNames = {};
let _onClickModal;
let _modalDivisionList, _modalDeptList;

let rowInit = {
    select: true,
    delStatus: 'UNDELETED',
    majorItemText: '',
    makerCode: '',
    makerId: '',
    makerName: '',
    modDate: '',
    modUserId: '',
    regDate: '',
    regUserId: '',
    remark: '',
    useStatus: 'USE',
};

// 그리드 객체 세팅
function setGridObj(obj) {
    gridObj = obj;
}

// 그리드 이벤트 리스닝
function onGridEvent(eventFunc, params) {
    console.log(`[budgetList.jsp] onGridEvent: ` + eventFunc, params);
    switch (eventFunc) {
        case 'itemClicked':
            let target = '/opmanager/seller/grid-popup' +
                '?row=' + params.row +
                '&col=' + params.col +
                '&cellData=' + params.cellData;
            // Common.popup(target, 'find_seller', 500, 250, 1);
            break;
        case 'addRowClicked':
            switch (gridObj.getColumns()[params.col].binding) {
                case 'buyerName':   // 고객사명
                    _onClickModal = function () {
                        let p = {
                            buyerName: $('#buyerModalName').val(),
                            buyerId: $('#buyerModalId').val()
                        };
                        console.log(`[budgetList.jsp] buyerName modal on click`, p);
                        gridObj.setCellData(params.row, params.col, p.buyerName);
                        gridObj.getRowData(params.row).buyerId = p.buyerId;
                        $("#buyerModal").modal('hide');
                    };
                    $("#buyerModal").modal();
                    $('#buyerModalName').autocomplete('option', 'appendTo', '#buyerModal');
                    break;
                case 'divisionName':   // 사업부명
                    let byrId = gridObj.getRowData(params.row).buyerId;
                    if (!byrId || byrId == '') {
                        alert('고객사를 먼저 선택해주세요.');
                        return;
                    }
                    $.ajax({
                        url: "/opmanager/budgets/findBuyerDivisionName",
                        type: "GET",
                        data: {
                            "buyerId": gridObj.getRowData(params.row).buyerId
                        },
                        beforeSend: function (xhr) {
                        },
                        success: function (data) {
                            console.log('[budgetList.jsp] findBuyerDivisionName', data);
                            _modalDivisionList = data;
                            if (_modalDivisionList.length > 0) {
                                $("#divisionModalSelect").empty();
                                let str = "<option value=\"0\">----선택----</option>";
                                _modalDivisionList.forEach(item => {
                                    str += "<option value=\"" + item.divisionId + "\">" + item.divisionName + "</option>";
                                });
                                $("#divisionModalSelect").append(str);
                                _onClickModal = function () {
                                    let p = {
                                        divisionId: $('#divisionModalSelect').val()
                                    };
                                    p.divisionName = _modalDivisionList.find(item => item.divisionId == p.divisionId).divisionName;
                                    console.log(`[budgetList.jsp] divisionName modal on click`, p);
                                    gridObj.setCellData(params.row, params.col, p.divisionName);
                                    gridObj.getRowData(params.row).divisionId = p.divisionId;
                                    $("#divisionModal").modal('hide');
                                };
                                $("#divisionModal").modal();
                            } else {
                                alert('사업부 목록을 확인할 수 없습니다.');
                            }
                        }
                    })
                    break;
                case 'deptCode':   // 부서코드
                case 'deptName':   // 부서명
                    let divId = gridObj.getRowData(params.row).divisionId;
                    if (!divId || divId == '') {
                        alert('사업부를 먼저 선택해주세요.');
                        return;
                    }
                    $.ajax({
                        url: "/opmanager/budgets/findBuyerDeptName",
                        type: "GET",
                        data: {
                            "divisionId": gridObj.getRowData(params.row).divisionId
                        },
                        beforeSend: function (xhr) {
                        },
                        success: function (data) {
                            console.log('[budgetList.jsp] findBuyerDeptName', data);
                            _modalDeptList = data;
                            if (_modalDeptList.length > 0) {
                                $("#deptModalSelect").empty();
                                let str = "<option value=\"0\">----선택----</option>";
                                _modalDeptList.forEach(item => {
                                    str += "<option value=\"" + item.deptId + "\">" + item.deptName + "</option>";
                                });
                                $("#deptModalSelect").append(str);
                                _onClickModal = function () {
                                    let p = {
                                        deptId: $('#deptModalSelect').val()
                                    };
                                    let sel = _modalDeptList.find(item => item.deptId == p.deptId);
                                    p.deptName = sel.deptName;
                                    p.deptCode = sel.deptCode;
                                    console.log(`[budgetList.jsp] deptName modal on click`, p);
                                    let dptCdCol, dptNmCol;
                                    gridObj.getColumns().forEach((col, idx) => {
                                        if (col.binding == 'deptCode') {
                                            dptCdCol = idx;
                                        } else if (col.binding == 'deptName') {
                                            dptNmCol = idx;
                                        }
                                    });
                                    gridObj.setCellData(params.row, dptCdCol, p.deptCode);
                                    gridObj.setCellData(params.row, dptNmCol, p.deptName);
                                    gridObj.getRowData(params.row).deptId = p.deptId;
                                    $("#deptModal").modal('hide');
                                };
                                $("#deptModal").modal();
                            } else {
                                alert('부서 목록을 확인할 수 없습니다.');
                            }
                        }
                    })
                    break;

            }
            break;
        case 'setCellData':
            gridObj.setCellData(params.row, params.col, params.data);
            break;
    }
}
//autocomplete 설정
$(function () {
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
                                label: item.makerName,
                                id: item.makerId,
                            }
                        })
                    );
                }
            });
        },
        select: function (event, ui) {
            console.log('[makerList.jsp] #makerName.autocomplete.select', {event: event, ui: ui});
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
        delay: 500,
        position: {my: 'right top', at: 'right bottom'},
        close: function (event) {
            // console.log(event);
        }
    });
});


function goSubmit() {
    $("#dataForm").submit();
}

function saveMakerBulk() {
    alert('준비중인 기능 입니다.');
    return false;
}

function saveMaker() {
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

    $.ajax({
        type: "POST",
        url: "/opmanager/makers",
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

function removeMaker() {
    let obj = gridObj.getCheckedData('select');

    if (obj.length == 0) {
        alert('데이터를 하나 이상 선택해 주세요.');
        return false;
    }

    for (let key in obj) {
        obj[key].delStatus = 'DELETED';
    }

    $.ajax({
        type: "POST",
        url: "/opmanager/makers",
        data: JSON.stringify(obj),
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

function addRowData() {
    console.log('[makerList.jsp] addRowData', rowInit);
    gridObj.addRow(rowInit);
}

function saveExcel() {
    gridObj.saveToExcel('maker-list.xlsx', '제조사관리');
}

function loadExcel() {
    gridObj.loadFromExcel(rowInit);
}

function accountNameChk() {
    $("#accountId").val('');
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