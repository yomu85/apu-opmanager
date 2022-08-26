let gridObj = null; // 그리드 객체
let _divNames = {};
let _deptNames = {};
let _onClickModal;
let _modalDivisionList;

let rowInit = {
    select: true,
    buyerCode: '',
    buyerId: '',
    buyerName: '',
    delStatus: "UNDELETED",
    deptCode: '',
    deptId: '',
    deptName: '',
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
            let binding = gridObj.getColumns()[params.col].binding;
            switch (binding) {
                case 'buyerName':   // 고객사명
                case 'buyerId' :
                case 'buyerCode' :
                    _onClickModal = function () {
                        let p = {
                            buyerModalName: $('#buyerModalName').val(),
                            buyerModalId: $('#buyerModalId').val(),
                            buyerModalCode: $('#buyerModalCode').val(),
                        };
                        if (p.buyerModalName == '' || p.buyerModalId == '') {
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
                case 'divisionName':   // 고객사명
                case 'divisionId' :
                case 'divisionCode' :
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
                                    console.log(`[departmentList.js] ${binding} modal on click`, p);
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
                    $("#divisionModal").modal();
                    break;
            }
            break;
        case 'setCellData':
            gridObj.setCellData(params.row, params.col, params.data);
            break;
        }
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
            $("#buyerId").val(ui.item.id);
            $("#deptId").empty();
            let str = "<option value=\"0\">----선택----</option>";
            $("#deptId").append(str);
            $("#searchBuyer").text(ui.item.label);
            $.ajax({
                url: "/opmanager/budgets/findBuyerDivisionName",
                type: "GET",
                data: {
                    "buyerId": ui.item.id
                },
                beforeSend: function (xhr) {
                },
                success: function (data) {
                    for (let key in data) {
                        str += "<option value=\"" + data[key].divisionId + "\">" + data[key].divisionName + " </option>";
                    }
                    $("#divisionId").empty();
                    $("#divisionId").append(str);
                }
            })
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

function saveDepartment() {
    let obj = gridObj.getCheckedData('select');
    if (obj.length == 0) {
        alert('데이터를 하나 이상 선택해 주세요.');
        return false;
    }
    $.ajax({
        type: "POST",
        url: "/opmanager/buyer/departments",
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

function removeDepartment() {
    let obj = gridObj.getCheckedData('select');
    if (obj.length == 0) {
        alert('데이터를 하나 이상 선택해 주세요.');
        return false;
    }
    let queryString = ''
    for (let key in obj) {
        obj[key].delStatus = 'DELETED';
        queryString += 'deptId=' + obj[key].deptId + '&';
    }
    let columns = gridObj.getColumns();
    obj.forEach(function (item, index) {
        if (item._added) {
            obj.splice(index, 1);
        }
    });
    $.ajax({
        type: "DELETE",
        url: "/opmanager/buyer/departments?" + queryString,
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

$(function() {
    $('#deptName').autocomplete({
        source : function(request, response) {
            $.ajax({
                type : 'GET',
                url: '/opmanager/buyer/departments/findBuyerDeptNameByDeptName',
                data:{
                    'deptName':request.term
                },
                beforeSend: function ( xhr ) {
                },
                success : function(data) {
                    // 서버에서 json 데이터 response 후 목록 추가
                    response(
                        $.map(data, function(item) {
                            return {
                                label : item.deptName
                            }
                        })
                    );
                }
            });
        },
        focus : function(event, ui) {
            return false;
        },
        minLength : 2,
        autoFocus : true,
        classes : {
            'ui-autocomplete': 'highlight'
        },
        delay : 500,
        position : { my : 'right top', at : 'right bottom' },
        close : function(event) {
            // console.log(event);
        }
    });
});

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
                success : function (data) {
                    // 서버에서 json 데이터 response 후 목록 추가
                    response(
                        $.map(data, function (item) {
                            return {
                                label: item.buyerName,
                                id: item.buyerId,
                            }
                        })
                    );
                }
            });
        },
        select: function (event, ui) {
            $("#buyerId").val(ui.item.id);
            $("#deptId").empty();
            let str = "<option value=\"0\">----선택----</option>";
            $("#deptId").append(str);
            $("#searchBuyer").text(ui.item.label);
            _divNames = {};
            _deptNames = {};
            $.ajax({
                url: "/opmanager/budgets/findBuyerDivisionName",
                type: "GET",
                data: {
                    "buyerId": ui.item.id
                },
                beforeSend: function (xhr) {
                },
                success: function (data) {
                    for (let key in data) {
                        str += "<option value=\"" + data[key].divisionId + "\">" + data[key].divisionName + " </option>";
                        _divNames[data[key].divisionId] = data[key].divisionName;
                    }
                    $("#divisionId").empty();
                    $("#divisionId").append(str);
                }
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
                                code: item.buyerCode,
                                id: item.buyerId
                            }
                        })
                    );
                }
            });
        },
        select: function (event, ui) {
            console.log('[budgetList.jsp] #buyerModalName.autocomplete.select', { event: event, ui: ui });
            $("#buyerModalId").val(ui.item.id);
            $("#buyerModalCode").val(ui.item.code);
            $("#buyerModalName").val(ui.item.Name)
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
    $('#divisionModalName').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/opmanager/buyer/divisions/findByBuyerIdAndDivisionName",
                type: "GET",
                data: {
                    "divisionName": request.term,
                    "buyerId": $("#buyerModalId").val()
                },
                beforeSend: function (xhr) {
                },
                success : function (data) {
                    // 서버에서 json 데이터 response 후 목록 추가
                    response(
                        $.map(data, function (item) {
                            return {
                                label: item.divisionName,
                                code: item.divisionCode,
                                id: item.divisionId
                            }
                        })
                    );
                }
            });
        },
        select: function (event, ui) {
            console.log('[budgetList.jsp] #divisionModalName.autocomplete.select', { event: event, ui: ui });
            $("#divisionModalId").val(ui.item.id);
            $("#divisionModalCode").val(ui.item.code);
            $("#divisionModalName").val(ui.item.Name)
        },
        focus: function (event, ui) {
            return false;
        },
        minLength: 0,
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
        $("#deptId").append("<option value=\"0\">----선택----</option>");
        return false;
    }
    $.ajax({
        url: "/opmanager/budgets/findBuyerDeptName",
        type: "GET",
        data: {
            "divisionId": id
        },
        beforeSend: function (xhr) {
        },
        success: function (data) {
            let str = "<option value=\"0\">----선택----</option>";
            for (let key in data) {
                str += "<option value=\"" + data[key].deptId + "\">" + data[key].deptName + " </option>";
                _deptNames[data[key].deptId] = data[key].deptName;
            }
            $("#deptId").empty();
            $("#deptId").append(str);
        }
    });
}

function addRowData() {
    console.log('[departmentList.jsp] addRowData', rowInit);
    gridObj.addRow(rowInit);
}

function deleteRowData() {
    gridObj.deleteCheckedRow('select');
}

function saveExcel() {
    gridObj.saveToExcel('department-list.xlsx', '부서관리');
}

function loadExcel() {
    gridObj.loadFromExcel(rowInit);
}

function checkedRow() {
    let rows = gridObj.getCheckedData('select');
    console.log('[departmentList.jsp] checkedRow', rows);
    return rows;
}

function requestAjax(params, callback) {
    let p = {
        type: params.type,
        url: params.url,
        data: params.data,
        beforeSend: function (xhr) {
            console.log(`[departmentList.js] ${params.url} request`, params.data);
        },
        success: function (data) {
            console.log(`[departmentList.js] ${params.url} respone`, data);
            callback(data);
        },
        error: function (msg) {
            console.log(`[departmentList.js] ${params.url} error`, msg);
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
    let form = $('form');
    form.each(function () {
        this.reset();
    });
    form.find('input[type=hidden]').each(function(){
        this.value = '';
    });
}