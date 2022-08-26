let gridObj = null; // 그리드 객체

// 그리드 객체 세팅
function setGridObj(obj) {
    gridObj = obj;
}

// 그리드 이벤트 리스닝
function onGridEvent(eventFunc, params) {
    switch (eventFunc) {
        case 'itemClicked':
            break;
        case 'setCellData':
            gridObj.setCellData(params.row, params.col, params.data);
            break;
    }
}



function goSubmit(){
    $("#dataForm").submit();
}

function objectifyForm(formArray) {
    //serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function saveBuyer(){
    var formData = objectifyForm($("#modalForm").serializeArray());
    console.log(formData);
    $.ajax({
        url:"/opmanager/buyer/users",
        type:"POST",
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType : "application/json",
        success:function (){
            alert('성공!');
        }
    })
}

function openModal(){
    $("#userModal").on("shown.bs.modal", function() { $("#buyerName").autocomplete("option", "appendTo", "#userModal") })


    $("#userModal").modal();
}

//주소창
document.getElementById("addressBtn").addEventListener("click", function(){ //주소입력칸을 클릭하면
    //카카오 지도 발생
    new daum.Postcode({
        oncomplete: function(data) { //선택시 입력값 세팅
            console.log(data);
            document.getElementById("address").value = data.address; // 주소 넣기
            document.getElementById("zipcode").value = data.zonecode; // 우편번호
            document.querySelector("input[name=addressDetail]").focus(); //상세입력 포커싱
        }
    }).open();
});

//주소창
document.getElementById("deliveryAddressBtn").addEventListener("click", function(){ //주소입력칸을 클릭하면
    //카카오 지도 발생
    new daum.Postcode({
        oncomplete: function(data) { //선택시 입력값 세팅
            console.log(data);
            document.getElementById("deliveryAddress").value = data.address; // 주소 넣기
            document.getElementById("deliveryZipcode").value = data.zonecode; // 우편번호
            document.querySelector("input[name=deliveryAddressDetail]").focus(); //상세입력 포커싱
        }
    }).open();
});


document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
    };
}, true);


$(function() {
    $('#buyerName').autocomplete({
        source : function(request, response) {

            $.ajax({
                type : 'GET',
                url: '/opmanager/budgets/findBuyerName',
                data:{
                    'buyerName':request.term
                },
                beforeSend: function ( xhr ) {
                },
                success : function(data) {
                    // 서버에서 json 데이터 response 후 목록 추가
                    response(
                        $.map(data, function(item) {
                            return {
                                label : item.buyerName,
                                id : item.buyerId,
                                code : item.buyerCode
                            }
                        })
                    );
                }
            });
        },
        select : function(event, ui) {
            let str = "<option value=\"0\">----선택----</option>";
            $("#buyerId").val(ui.item.id);
            $("#buyerCode").val(ui.item.code);
            $("#deptId").empty();
            $("#deptId").append(str);
            $.ajax({
                url:"/opmanager/budgets/findBuyerDivisionName",
                type: "GET",
                data:{
                    "buyerId":ui.item.id
                },
                beforeSend: function ( xhr ) {
                },
                success : function(data){
                    for(key in data){
                        str += "<option value=\""+data[key].divisionId+"\">" + data[key].divisionName +" </option>";
                    }
                    $("#divisionId").empty();
                    $("#divisionId").append(str);
                }
            })
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
function findDeptName(id){

    if(id==0){
        return false;
    }

    $.ajax({
        url:"/opmanager/budgets/findBuyerDeptName",
        type:"GET",
        data:{
            "divisionId":id
        },
        beforeSend: function ( xhr ) {
        },
        success:function (data){
            let str = "<option value=\"0\">----선택----</option>";
            for(key in data){
                str += "<option value=\""+data[key].deptId+"\">" + data[key].deptName +" </option>";
            }
            $("#deptId").empty();
            $("#deptId").append(str);
        }
    })
}

function recipientCheck(){
    var flag = $("#recipientBox").prop('checked');
    if(flag){
        var userName = $("#userName").val();
        var deptName = $("#deptId option:checked").text();
        var tel = $("#tel").val();
        var mobile = $("#mobile").val();
        var email = $("#email").val();
        var zipcode = $("#zipcode").val();
        var address = $("#address").val();
        var addressDetail = $("#addressDetail").val();

        $("#recipientName").val(userName);
        $("#recipientDeptName").val(deptName);
        $("#recipientTel").val(tel);
        $("#recipientMobile").val(mobile);
        $("#recipientEmail").val(email);
        $("#deliveryZipcode").val(zipcode);
        $("#deliveryAddress").val(address);
        $("#deliveryAddressDetail").val(addressDetail);
    }else{
        $("#recipientName").val('');
        $("#recipientDeptName").val('');
        $("#recipientTel").val('');
        $("#recipientMobile").val('');
        $("#recipientEmail").val('');
        $("#deliveryZipcode").val('');
        $("#deliveryAddress").val('');
        $("#deliveryAddressDetail").val('');
    }
}

function removeUsers() {
    let obj = gridObj.getCheckedData('select');
    if (obj.length == 0) {
        alert('데이터를 하나 이상 선택해 주세요.');
        return false;
    }
    let queryString = ''
    for (let key in obj) {
        queryString += 'userId=' + obj[key].userId + '&';
    }
    let columns = gridObj.getColumns();
    obj.forEach(function (item, index) {
        if (item._added) {
            obj.splice(index, 1);
        }
    });
    $.ajax({
        type: "DELETE",
        url: "/opmanager/buyer/users?" + queryString,
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

function initSearchCondition() {
    let form = $('form');
    form.each(function () {
        this.reset();
    });
    form.find('input[type=hidden]').each(function(){
        this.value = '';
    });
}