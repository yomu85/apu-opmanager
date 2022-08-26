$.ajaxSetup({
    beforeSend: function ( xhr ) {
    }
});

let _onClickModal;
let gridObj = null; // 그리드 객체

let rowInit = {
    select: true,
    amId: '',
    amName: '',
    approvalUseStatus: 'UNUSE',
    attachedFileId: '',
    bizCategory: '',
    bizRegNo: '',
    bizType: '',
    budgetUseStatus: 'UNUSE',
    buyerCode: '',
    buyerId: '',
    buyerName: '',
    buyerRegionRegionCodes: [],
    corpNo: '',
    creditLimitAmount: 0,
    creditRating: '',
    delStatus: 'UNDELETED',
    domain: '',
    email: '',
    fax: '',
    foundationDate: '',
    headcount: 0,
    hqAddress: '',
    hqAddressDetail: '',
    hqZipcode: '',
    ipoDate: '',
    ipoStatus: 'UNLISTED',
    modDate: '',
    modUserId: '',
    mysiteUseStatus: 'UNUSE',
    plantAddress: '',
    plantAddressDetail: '',
    plantZipcode: '',
    prevYearSales: '',
    regDate: '',
    regUserId: '',
    repName: '',
    tel: '',
    tier: 'NA',
    wmsUseStatus: 'UNUSE'
};

// 그리드 객체 세팅
function setGridObj(obj) {
    gridObj = obj;
}

// 그리드 이벤트 리스닝
function onGridEvent(eventFunc, params) {
    console.log(`[buyerList.jsp] on grid event: ${eventFunc}`, params);
    switch (eventFunc) {
        case 'itemClicked':
            let clickedBinding = gridObj.getColumns()[params.col].binding;
            switch (clickedBinding) {
                case 'amName' :
                    _onClickModal = function () {
                        let p = {
                            amModalId: $('#amModalSelect').val()
                        };
                        let usr = agentUserList.find(agent => agent.userId == p.amModalId);
                        p.amModalName = usr.userName;
                        if (p.amModalName == '' || p.amModalId == '') {
                            alert('AM을 선택해 주세요.');
                            return false;
                        }
                        let row = gridObj.getRowData(params.row);
                        row.amId = p.amModalId;
                        row.amName = p.amModalName;
                        gridObj.setRowData(params.row, row);
                        $("#amModal").modal('hide');
                    };
                    $("#amModal").modal();
                    break;
            }
            break;
        case 'setCellData':
            gridObj.setCellData(params.row, params.col, params.data);
            break;
    }
}

$(function () {
    $('#searchBuyerName').autocomplete({
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
                            }
                        })
                    );
                }
            });
        },
        select: function (event, ui) {
            $("#searchBuyerId").val(ui.item.id);
            $("#searchBuyerName").text(ui.item.label);
            $.ajax({
                url: "/opmanager/budgets/findBuyerDivisionName",
                type: "GET",
                data: {
                    "buyerId": ui.item.id
                },
                beforeSend: function (xhr) {
                },
                success: function (data) {
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

    $('#amModalName').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'GET',
                url: '/opmanager/agents/users/findAgentUserByUserName',
                data: {
                    'userName': request.term
                },
                beforeSend: function (xhr) {
                },
                success: function (data) {
                    // 서버에서 json 데이터 response 후 목록 추가
                    response(
                        $.map(data, function (item) {
                            return {
                                id: item.amId,
                                label: item.amName
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
            $("#amModalId").val(ui.item.id);
            $("#amModalName").val(ui.item.name);
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

function goSubmit() {
    $("#dataForm").submit();
}

function saveBuyer() {
    let obj = gridObj.getCheckedData('select');
    console.log(JSON.stringify(obj));
    if (obj.length == 0) {
        alert('데이터를 하나 이상 선택해 주세요.');
        return false;
    }
    $.ajax({
        type: "PUT",
        url: "/opmanager/buyer/buyers",
        data : JSON.stringify(obj),
        processData: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {},
        success: function (data) {
            alert("저장이 완료되었습니다.");
            goSubmit();
        }
    });
}

function removeBuyer() {
    let obj = gridObj.getCheckedData('select');
    if (obj.length == 0) {
        alert('데이터를 하나 이상 선택해 주세요.');
        return false;
    }
    for (let key in obj) {
        obj[key].delStatus = 'DELETED';
    }
    $.ajax({
        type: "PUT",
        url: "/opmanager/buyer/buyers",
        data : JSON.stringify(obj),
        processData: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function ( xhr ) {},
        success: function (data) {
            alert("삭제가 완료되었습니다.");
            goSubmit();
        }
    });
}

function openModal() {
    $("#transferModal").modal();
}

function addRowData() {
    console.log('[buyerList.jsp] addRowData', rowInit);
    gridObj.addRow(rowInit);
}

function deleteRowData() {
    gridObj.deleteCheckedRow('select');
}

function saveExcel() {
    gridObj.saveToExcel('buyer-management.xlsx', '고객사정보관리');
}

function loadExcel() {
    gridObj.loadFromExcel(rowInit);
}

function checkedRow() {
    let rows = gridObj.getCheckedData('select');
    console.log('[buyerList.jsp] checkedRow', rows);
    return rows;
}

$(document).ready(function () {
    // ID 입력 제한
    $("#loginId").keyup(function (event) {
        if (!(event.keyCode >=37 && event.keyCode <= 40)) {
            let inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^a-z0-9]/gi, ''));
        }
    });
    $("#mobile").keyup(function (event) {
        if (!(event.keyCode >=37 && event.keyCode <= 40)) {
            let inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^0123456789-]/g, ''));
        }
    });
    $("#tel").keyup(function (event) {
        if (!(event.keyCode >=37 && event.keyCode <= 40)) {
            let inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^0123456789-]/g, ''));
        }
    });
    $("#fax").keyup(function (event) {
        if (!(event.keyCode >=37 && event.keyCode <= 40)) {
            let inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^0123456789-]/g, ''));
        }
    });
    $("#headcount").keyup(function (event) {
        if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^0123456789]/g, ''));
        }
    });
    $("#corpNo").keyup(function (event) {
        if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^0123456789]/g, ''));
        }
    });
    $("#prevYearSales").keyup(function (event) {
        if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^0123456789]/g, ''));
        }
    });
    // input file 파일 첨부시 fileCheck 함수 실행
    $("#input_file").on("change", fileCheck);
    // 주소창
    document.getElementById("hqAddressBtn").addEventListener("click", function () {   // 주소입력칸을 클릭하면
        // 카카오 지도 발생
        new daum.Postcode({
            oncomplete: function (data) {    // 선택시 입력값 세팅
                console.log(`[buyerList.jsp] daum.Postcode()`, data);
                document.getElementById("hqAddress").value = data.address;  // 주소 넣기
                document.getElementById("hqZipcode").value = data.zonecode; // 우편번호
                document.querySelector("input[name=hqAddressDetail]").focus();  //상세입력 포커싱
            }
        }).open();
    });
    document.getElementById("plantAddressBtn").addEventListener("click", function () {  //주소입력칸을 클릭하면
        // 카카오 지도 발생
        new daum.Postcode({
            oncomplete: function (data) {   //선택시 입력값 세팅
                document.getElementById("plantAddress").value = data.address;   // 주소 넣기
                document.getElementById("plantZipcode").value = data.zonecode;  // 우편번호
                document.querySelector("input[name=plantAddressDetail]").focus();   //상세입력 포커싱
            }
        }).open();
    });
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        };
    }, true);
});

$(function () {
    $('#btn-upload').click(function (e) {
        e.preventDefault();
        $('#input_file').click();
    });
});

// 파일 현재 필드 숫자 totalCount 랑 비교값
let fileCount = 0;
// 해당 숫자를 수정하여 전체 업로드 갯수를 정한다.
let totalCount = 10;
// 파일 고유넘버
let fileNum = 0;
// 첨부파일 배열
let content_files = new Array();

function fileCheck(e) {
    let files = e.target.files;
    // 파일 배열 담기
    let filesArr = Array.prototype.slice.call(files);
    // 파일 개수 확인 및 제한
    if (fileCount + filesArr.length > totalCount) {
        $.alert('파일은 최대 ' + totalCount + '개까지 업로드 할 수 있습니다.');
        return;
    } else {
        fileCount = fileCount + filesArr.length;
    }
    // 각각의 파일 배열담기 및 기타
    filesArr.forEach(function (f) {
        $('#loadingDiv').show();
        let reader = new FileReader();
        reader.onload = function (e) {
            content_files.push(f);
            $('#articlefileChange').append(
                '<div id="file' + fileNum + '" onclick="fileDelete(\'file' + fileNum + '\')">'
                + '<font style="font-size:12px">' + f.name + '</font>'
                + '<img src="/content/opmanager/images/category/icon_delete.png" style="width:10px; height:auto; vertical-align: middle; cursor: pointer;"/>'
                + '<div/>'
            );
            fileNum++;
            $('#loadingDiv').hide();
        };
        reader.readAsDataURL(f);
    });
    // 초기화 한다.
    $("#input_file").val("");
}

// 파일 부분 삭제 함수
function fileDelete(fileNum) {
    var no = fileNum.replace(/[^0-9]/g, "");
    content_files[no].is_delete = true;
    $('#' + fileNum).remove();
    fileCount--;
}

$(function () {
    $('#am').autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'GET',
                url: '/opmanager/buyer/buyers/ams',
                data: {
                    'amName': request.term
                },
                beforeSend: function (xhr) {},
                success: function (data) {
                    // 서버에서 json 데이터 response 후 목록 추가
                    response(
                        $.map(data, function (item) {
                            return {
                                label: item.amName,
                                id: item.amId,
                            }
                        })
                    );
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
});

function objectifyForm(formArray) {
    //serialize data function
    let returnArray = {};
    for (let i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function postBuyer() {
    let formData = objectifyForm($("#modalForm").serializeArray());
    console.log(formData);
    $.ajax({
        url: "/opmanager/buyer/buyers",
        type: "POST",
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: "application/json",
        success: function () {
            alert('성공!');
        }
    })
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