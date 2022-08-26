<svelte:head>
  <title>상품조회 | 운영사</title>
</svelte:head>

<script>
// import { onMount } from 'svelte';

// onMount(() => {
//   (function( $ ) {
//     // 스크립트 영역
//     // $( "input[name=rdo_choice]:radio").click( function (){
//     //   if ($("input[name=rdo_choice]:radio" ).is( ":checked")){
//     //     //체크 검사
//     //   });
//     // });
//     // $("input[name=rdo_choice]:radio").on('change', function(e) {
//     //   console.log(e.target.id)
//     //   switch(String(e.target.id)) {
//     //     case 'subject0':
//     //       $("#sub-category").find("div[id^=chk_menu]").hide();
//     //       break;
//     //     case 'subject1':
//     //       $("#sub-category").find("div[id^=chk_menu]").hide();
//     //       $("#sub-category").find("div[id=chk_menu1]").show();
//     //       break;
//     //     case 'subject2':
//     //       $("#sub-category").find("div[id^=chk_menu]").hide();
//     //       $("#sub-category").find("div[id=chk_menu2]").show();
//     //       break;
//     //     case 'subject3':
//     //       $("#sub-category").find("div[id^=chk_menu]").hide();
//     //       $("#sub-category").find("div[id=chk_menu3]").show();
//     //       break;
//     //     case 'subject4':
//     //       $("#sub-category").find("div[id^=chk_menu]").hide();
//     //       $("#sub-category").find("div[id=chk_menu4]").show();
//     //       break;
//     //     case 'subject5':
//     //       $("#sub-category").find("div[id^=chk_menu]").hide();
//     //       $("#sub-category").find("div[id=chk_menu5]").show();
//     //       break;
//     //     case 'subject6':
//     //       $("#sub-category").find("div[id^=chk_menu]").hide();
//     //       $("#sub-category").find("div[id=chk_menu6]").show();
//     //       break;
//     //     default:
//     //       alert('품목분류 관련 스크립트 이슈 발생')
//     //   }
//     //   if($("#sub-category").find("div[id^=chk_menu]:visible").length > 0) {
//     //     $("#sub-category").parents('tr').show()
//     //   }else{
//     //     $("#sub-category").parents('tr').hide()
//     //   }
//     //   $("input[name=rdo_choice]:radio").prop('checked');
//     //   //checked프로파티값을 표시 → true / false
//     // });
//     // 스크립트 영역
//   })(jQuery);
// });
</script>

<div class="location">
    <a href="/opmanager/budgets/default">- 주문관리</a> &gt; <a href="/opmanager/budgets/default">주문관리</a> &gt; <a href="/opmanager/budgets/default" class="on">상품조회</a>
</div>

<!-- 페이지 영역 -->
<h3><span>상품조회</span></h3>
<button type="button" class="btn btn-default btn_srch" data-toggle="collapse" data-target="#srch_area" aria-controls="srch_area" aria-expanded="false">
  <img src="/content/opmanager/images/icon/arr_srch.svg" alt="검색창 여닫이">
</button>
<div class="srch_area collapse in" id="srch_area">
  <table class="table_line">
    <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
    <colgroup>
      <col style="width: 10%">
      <col style="width: 23.3%">
      <col style="width: 10%">
      <col style="width: 23.3%">
      <col style="width: 10%">
      <col style="width: 23.4%">
    </colgroup>
    <tbody>
      <tr>
        <th scope="row">
          품목분류
        </th>
        <td colspan="5">
          <div class="rdo_area">
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject0">
              <label for="subject0">선택안함</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject1" disabled>
              <label for="subject1" class="disabled">건설/건축자재</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject2" checked>
              <label for="subject2">공구</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject3">
              <label for="subject3">기계요소</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject4">
              <label for="subject4">동력전달/운송기기</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject5">
              <label for="subject5">사무/전산용품</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject6">
              <label for="subject6">생활잡화</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject7">
              <label for="subject7">석유/화학제품</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject8">
              <label for="subject8">소방/안전</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject9">
              <label for="subject9">실험/계측자재</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject10">
              <label for="subject10">유공압/공조</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject11">
              <label for="subject11">전기/전자</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject12">
              <label for="subject12">청소환경용품</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo_choice" class="form-control" id="subject13">
              <label for="subject13">포장/판촉/인쇄물</label>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th scope="row">
          세부분류
        </th>
        <td colspan="5">
          <div class="rdo_area">
            <div class="rdo_label">
              <input type="radio" name="rdo2_menu" class="form-control" id="subdivision1" disabled>
              <label for="subdivision1" class="disabled">전체</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo2_menu" class="form-control" id="subdivision2" checked>
              <label for="subdivision2">금형공구</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo2_menu" class="form-control" id="subdivision3">
              <label for="subdivision3">작업공구</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo2_menu" class="form-control" id="subdivision4">
              <label for="subdivision4">용접기자재</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo2_menu" class="form-control" id="subdivision5">
              <label for="subdivision5">절단절삭공구</label>
            </div>
            <div class="rdo_label">
              <input type="radio" name="rdo2_menu" class="form-control" id="subdivision6">
              <label for="subdivision6">진동/엔진공구</label>
            </div>
          </div>
        </td> 
      </tr>
      <tr>
        <th scope="row">고객사 <span class="co_red">*</span></th> 
        <td>
          <input type="text" class="form-control" style="width: 19.2rem">
        </td>
        <th scope="row">상품코드</th> 
        <td>
          <input type="text" class="form-control" style="width: 19.2rem">
        </td>
        <th scope="row">상품명</th> 
        <td >
          <input type="text" class="form-control" style="width: 19.2rem">
        </td>
      </tr>
    </tbody>
  </table>
  <div class="btn_box">
    <button type="button" class="btn btn-secondary line">초기화</button>
    <button type="button" class="btn btn-secondary">조회</button>
  </div>
</div>
<div class="wj-content_wrap">
  <div class="btn_box between">
    <div class="flex_box">
      <button type="button" class="btn btn-default btn_icon">
        <img src="/content/opmanager/images/icon/ico_select_column.svg" alt="컬럼선택">
      </button>
      <button type="button" class="btn btn-default">장바구니 담기</button>
      <button type="button" class="btn btn-default">바로 구매하기</button>
    </div>
    <div class="flex_box">
      <button type="button" class="btn btn-default">Excel 다운로드</button>
    </div>
  </div>

  <!-- wijmo area -->
  <div id="contentGridEl" class="wj-control wj-content wj-flexgrid" style="position: relative;">
    <div style="position: absolute; top: 50%; transform: translateY(-50%); width: 100%; height: auto; font-size:50px; text-align: center;">
      wijmo area
      <div class="btn_box">
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#ordererInputModal">주문자 입력</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#manufactureSearchModal">제조사검색</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#itemDetailsModal">품목상세정보</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#buyNowModal">바로구매</button>
      </div>
    </div>
  </div>
  <!-- //wijmo area -->
</div>
<!-- //페이지 영역 -->

<!-- 주문자 입력 Modal -->
<div class="modal fade" id="ordererInputModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">주문자 입력</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table_line">
          <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
          <colgroup>
            <col style="width: 27%">
            <col style="width: 73%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                주문자 <span class="co_red">*</span>
              </th>
              <td>
                <input type="text" class="form-control" style="width: 192px">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">취소</button>
        <button type="button" class="btn btn-secondary">저장</button>
      </div>
    </div>
  </div>
</div>

<!-- 제조사검색 Modal -->
<div class="modal fade" id="manufactureSearchModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">제조사검색</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table_line">
          <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
          <colgroup>
            <col style="width: 21.5%">
            <col style="width: 28.5%">
            <col style="width: 21.5%">
            <col style="width: 28.5%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                제조사코드
              </th>
              <td>
                <input type="text" class="form-control" value="홍길동" style="width: 10rem">
              </td>
              <th scope="row">
                제조사명
              </th>
              <td>
                <input type="text" class="form-control" value="부서명" style="width: 10rem">
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btn_box mt8">
          <button type="button" class="btn btn-default btn_srch_left">조회</button>
        </div>
        <!-- wijmo area -->
        <div class="wj-control wj-content wj-flexgrid mt32" style="position: relative; height: 17.4rem;">
          <div style="position: absolute; top: 50%; transform: translateY(-50%); width: 100%; height: auto; font-size:50px; text-align: center;">
            wijmo area
          </div>
        </div>
        <!-- //wijmo area -->
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">닫기</button>
      </div>
    </div>
  </div>
</div>

<!-- 품목상세정보 Modal -->
<div class="modal fade" id="itemDetailsModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">품목상세정보</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <div class="flex_box">
          <!-- 썸네일 정보 있음 -->
          <div class="tableWithImg_box">
            <img src="/content/opmanager/images/temp/temp_item1.png" alt="상품">
          </div>
          <!-- //썸네일 정보 있음 -->
          <table class="table_line">
            <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
            <colgroup>
              <col style="width: 21.5%">
              <col style="width: 28.5%">
              <col style="width: 21.5%">
              <col style="width: 28.5%">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">배송지 정보</th>
                <td colspan="3">1차분류 &gt; 2차분류 &gt; 3차분류 &gt; 4차분류</td>
              </tr>
              <tr>
                <th scope="row">휴대폰</th>
                <td>2000001100</td>
                <th scope="row">거래유형</th>
                <td>직납</td>
              </tr>
              <tr>
                <th scope="row">품명</th>
                <td colspan="3">프리즈마팁&amp;전극</td>
              </tr>
              <tr>
                <th scope="row">규격</th>
                <td colspan="3">P-80(1.8)/SET=10조</td>
              </tr>
            </tbody>
          </table>
        </div>
        <table class="table_line mt32">
          <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
          <colgroup>
            <col style="width: 21.5%">
            <col style="width: 28.5%">
            <col style="width: 21.5%">
            <col style="width: 28.5%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">제조사</th>
              <td>CRETOS</td>
              <th scope="row">모델번호</th>
              <td>CRETOS</td>
            </tr>
            <tr>
              <th scope="row">단위</th>
              <td>조</td>
              <th scope="row">원산지</th>
              <td>대한민국</td>
            </tr>
            <tr>
              <th scope="row">Catalog담당</th>
              <td>김명규</td>
              <th scope="row">Sourcing담당</th>
              <td>김명규</td>
            </tr>
            <tr>
              <th scope="row">
                첨부파일
              </th>
              <td colspan="3">
                <ul class="file_list">
                  <li>
                    <a href="#" class="link_file">프리즈마팁&amp;전극.pdf</a>
                    <span class="txt_info1">12MB</span>
                    <span class="txt_info2">상태</span>
                  </li>
                  <li>
                    <a href="#"  class="link_file">FH813SZY.PNG</a>
                    <span class="txt_info1">7MB</span>
                    <span class="txt_info2">상태</span>
                  </li>
                  <li>
                    <a href="#"  class="link_file">SETA3870SZY_1.jpg</a>
                    <span class="txt_info1">7MB</span>
                    <span class="txt_info2">상태</span>
                  </li>
                  <li>
                    <a href="#"  class="link_file">SETA3870SZY_1.jpg</a>
                    <span class="txt_info1">2.64MB</span>
                    <span class="txt_info2">상태</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">닫기</button>
      </div>
    </div>
  </div>
</div>

<!-- 바로구매 Modal -->
<div class="modal fade" id="buyNowModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">주문정보 입력</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table_line">
          <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
          <colgroup>
            <col style="width: 21.5%">
            <col style="width: 28.5%">
            <col style="width: 21.5%">
            <col style="width: 28.5%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                주문자 <span class="co_red">*</span>
              </th>
              <td colspan="3">
                <input type="text" class="form-control" value="홍길동" style="width: 17.6rem">
              </td>
            </tr>
            <tr>
              <th scope="row">
                부서
              </th>
              <td>
                <input type="text" class="form-control" value="관리팀" style="width: 17.6rem">
              </td>
              <th scope="row">
                인수자
              </th>
              <td>
                <input type="text" class="form-control" value="홍길동" style="width: 17.6rem">
              </td>
            </tr>
            <tr>
              <th scope="row">
                휴대폰
              </th>
              <td>
                <div class="flex_box">
                  <select class="form-control" style="width: 5.6rem;">
                    <option value="010">010</option>
                  </select>
                  <span class="half_frog">-</span>
                  <input type="text" value="2222" class="form-control half_frog" style="width: 4.8rem">
                  <span class="half_frog">-</span>
                  <input type="text" value="2222" class="form-control half_frog" style="width: 4.8rem">
                </div>
              </td>
              <th scope="row">
                연락처
              </th>
              <td>
                <div class="flex_box">
                  <select class="form-control" style="width: 5.6rem;">
                    <option value="010">010</option>
                  </select>
                  <span class="half_frog">-</span>
                  <input type="text" value="2222" class="form-control half_frog" style="width: 4.8rem">
                  <span class="half_frog">-</span>
                  <input type="text" value="2222" class="form-control half_frog" style="width: 4.8rem">
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                선입고여부
              </th> 
              <td>
                <div class="rdo_label">
                  <input type="radio" class="form-control" id="chk_prearrival">
                  <label for="chk_prearrival">선입고</label>
                </div>
              </td> 
              <th scope="row">
                희망납기일
              </th>
              <td>
                <input type="date" class="form-control" style="width: 10.2rem">
              </td>
            </tr>
            <tr>
              <th scope="row">
                납품장소
              </th>
              <td colspan="3">
                <div class="flex_box">
                  <input type="text" class="form-control" value="07201" style="width: 8.5rem">
                  <button type="button" class="btn btn-default frog">우편번호찾기</button>
                </div>
                <input type="text" class="form-control mt8" value="서울시 영등포구 구로디지털단지로 2112가길 215-20" style="width: 100%" disabled>
                <input type="text" class="form-control mt8" value="스타빌리지 301호" style="width: 100%">
              </td>
            </tr>
            <tr>
              <th scope="row">
                요청사항
              </th>
              <td colspan="3">
                <textarea cols="30" rows="10" style="height: 4.8rem"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">취소</button>
        <button type="button" class="btn btn-secondary">주문</button>
      </div>
    </div>
  </div>
</div>