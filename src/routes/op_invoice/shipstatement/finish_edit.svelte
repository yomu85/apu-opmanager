<svelte:head>
  <title>납품완료 입력/수정 | 운영사</title>
</svelte:head>

<script>
import { onMount } from 'svelte';

onMount(() => {
  (function( $ ) {
    //스크립트 영역
    $('#checkAll').click(function() {
      if($('#checkAll').is(':checked')) {
        $('input[name="checkLine"]').prop('checked', function(){
            $(this).parents('tr').addClass('active')
          return true
        });
      }else{
        $('input[name="checkLine"]').prop('checked', function(){
            $(this).parents('tr').removeClass('active')
          return false
        });
      }
    })
    $('input[name="checkLine"]').click(function(){
      var totalLeng = $('input[name="checkLine"]').length;
      var checkedLeng = $('input[name="checkLine"]:checked').length;
      if(totalLeng != checkedLeng) {
        $('#checkAll').prop('checked', false);
      }else{
        $('#checkAll').prop('checked', true)
      }

      var checked = $(this).prop('checked');
      if(checked){
        $(this).parents('tr').addClass('active')
      }else{
        $(this).parents('tr').removeClass('active')
      }
    })
    //스크립트 영역
  })(jQuery);
})
</script>

<!-- 페이지 영역 -->
<h3><span>납품완료 입력/수정</span></h3>
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
        조회일자
      </th>
      <td>
        <div class="flex_box">
          <select class="form-control" style="width: 88px">
            <option value="">납품생성일</option>
          </select>
          <input type="date" value="2022-06-17" class="form-control" style="width: 102px" />
          <div class="half_frog">~</div>
          <input type="date" value="2022-06-17" class="form-control half_frog" style="width: 102px" />
        </div>
      </td> 
      <th scope="row">
        상품코드
      </th> 
      <td>
        <input type="text" class="form-control inp_srch" style="width: 192px;"> 
      </td>
      <th scope="row">
        상품명
      </th>
      <td>
        <input type="text" class="form-control" style="width: 192px;"> 
      </td>
    </tr>
    <tr>
      <th scope="row">
        고객사
      </th> 
      <td>
        <input type="text" class="form-control inp_srch" style="width: 192px;"> 
      </td>
      <th scope="row">
        사업부
      </th>
      <td>
        <select class="form-control" style="width: 192px">
          <option value="">-----</option>
        </select>
      </td>
      <th scope="row">
        주문자
      </th> 
      <td>
        <input type="text" class="form-control inp_srch" style="width: 192px;"> 
      </td>
    </tr>
    <tr>
      <th scope="row">
        제조사
      </th> 
      <td>
        <input type="text" class="form-control inp_srch" style="width: 192px;"> 
      </td>
      <th scope="row">
        규격
      </th>
      <td>
        <input type="text" class="form-control" style="width: 192px;">
      </td>
      <th scope="row">
        모델번호
      </th> 
      <td>
        <input type="text" class="form-control" style="width: 192px;">
      </td>
    </tr>
    <tr>
      <th scope="row">
        주문상태
      </th>
      <td>
        <input type="text" class="form-control inp_srch" style="width: 192px;">
      </td>
      <th scope="row">
        납품번호
      </th>
      <td>
        <input type="text" class="form-control" style="width: 192px;"> 
      </td>
      <th scope="row">
        납품완료상태
      </th>
      <td>
        <div class="rdo_area">
          <div class="rdo_label">
            <input type="radio" name="completeOrNot" class="form-control" id="all"  checked>
            <label for="all">전체</label>
          </div>
          <div class="rdo_label">
            <input type="radio" name="completeOrNot" class="form-control" id="complete">
            <label for="complete">완료</label>
          </div>
          <div class="rdo_label">
            <input type="radio" name="completeOrNot" class="form-control" id="not">
            <label for="not">미완료</label>
          </div>
        </div>
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
      <button type="button" class="btn btn-default">납품완료</button>
      <button type="button" class="btn btn-default">완료취소</button>
      <!-- <strong class="txt_cost_bold frog">Total : KRW 24,730.00</strong>
      <span class="txt_cost">(부가세별도)</span> -->
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
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#itemDetailsModal">품목상세정보</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#supplierInquiryModal">공급사 조회</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#customerInquiryModal">고객사 조회</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#userDetailsModal">사용자 상세정보</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#consigneeInfoModal">인수자 정보</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#enterdeliveryEndDateModal">납품완료일 입력</button>
      </div>
    </div>
  </div>
  <!-- //wijmo area -->
</div>
<!-- //페이지 영역 -->

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

<!-- 공급사 조회 Modal -->
<div class="modal fade" id="supplierInquiryModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">공급사 조회</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <h6 class="s_title">협력사 정보</h6>
        <table class="table_line">
          <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
          <colgroup>
            <col style="width: 22.5%">
            <col style="width: 27.5%">
            <col style="width: 22.5%">
            <col style="width: 27.5%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">공급사코드</th>
              <td>S00420</td>
              <th scope="row">공급사명</th>
              <td>주식회사 성화티앤피</td>
            </tr>
            <tr>
              <th scope="row">사업자등록번호</th>
              <td>2498702263</td>
              <th scope="row">부서</th>
              <td>김정화</td>
            </tr>
            <tr>
              <th scope="row">회사주소(본사)</th>
              <td colspan="3">
                <p>46977</p>
                <p>부산광역시 사상구 괘감로 37</p>
                <p>부산산업유통상가 26동 136호</p>
              </td>
            </tr>
            <tr>
              <th scope="row">회사주소(공장)</th>
              <td colspan="3">
                <p>31247</p>
                <p>서울특별시 강남구 언주로 652 (논현동, 쿠쿠빌딩)</p>
                <p>테스트 빌딩 16층 1623호</p>
              </td>
            </tr>
            <tr>
              <th scope="row">대표전화번호</th>
              <td>031-357-5808</td>
              <th scope="row">대표팩스번호</th>
              <td>031-355-1121</td>
            </tr>
            <tr>
              <th scope="row">업태</th>
              <td>제조업</td>
              <th scope="row">종목</th>
              <td>골판지상자</td>
            </tr>
            <tr>
              <th scope="row">대표 E-mail</th>
              <td>testid123@domain.com</td>
              <th scope="row">종업원수</th>
              <td>31<span class="txt_cost">(명)</span></td>
            </tr>
            <tr>
              <th scope="row">법인등록번호</th>
              <td>2498702263</td>
              <th scope="row">설립일자</th>
              <td>2021/04/27</td>
            </tr>
            <tr>
              <th scope="row">전년도 매출액</th>
              <td>0<span class="txt_cost">(천만원)</span></td>
              <th scope="row">신용등급</th>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">상장여부</th>
              <td>Yes</td>
              <th scope="row">상장일자</th>
              <td>2022/04/27</td>
            </tr>
            <tr>
              <th scope="row">사업자유형</th>
              <td>법인</td>
              <th scope="row">거래중인 구매대행사</th>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">배송차량수</th>
              <td colspan="3">2<span class="txt_cost">(대)</span></td>
            </tr>
            <tr>
              <th scope="row">주요취급품목</th>
              <td colspan="3">
                <div class="chk_area">
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems1" disabled>
                    <label for="mainItems1" class="disabled">공기구</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems2" disabled>
                    <label for="mainItems2" class="disabled">공조/유체</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems3" disabled>
                    <label for="mainItems3" class="disabled">기계요소</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems4" disabled>
                    <label for="mainItems4" class="disabled">동력기기</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems5" disabled>
                    <label for="mainItems5" class="disabled">사무자재</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems6" disabled>
                    <label for="mainItems6" class="disabled">소방안전</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems7" disabled>
                    <label for="mainItems7" class="disabled">수리/용역</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems8" disabled>
                    <label for="mainItems8" class="disabled">포장</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems9" disabled>
                    <label for="mainItems9" class="disabled">의료</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems10" checked disabled>
                    <label for="mainItems10" class="disabled">실험/측정</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems11" disabled>
                    <label for="mainItems11" class="disabled">운반/저장</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems12" disabled>
                    <label for="mainItems12" class="disabled">유공압</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems13" disabled>
                    <label for="mainItems13" class="disabled">전기전자</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems14" disabled>
                    <label for="mainItems14" class="disabled">전산장비</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems15" disabled>
                    <label for="mainItems15" class="disabled">청소/환경</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems16" disabled>
                    <label for="mainItems16" class="disabled">토목건설</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="mainItems17" disabled>
                    <label for="mainItems17" class="disabled">화학/가스/연료/유류</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">납품가능지역</th>
              <td colspan="3">
                <div class="chk_area">
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea1" disabled>
                    <label for="deliveryArea1" class="disabled">전국</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea2" disabled>
                    <label for="deliveryArea2" class="disabled">수도권</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea3" disabled>
                    <label for="deliveryArea3" class="disabled">강원</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea4" checked disabled>
                    <label for="deliveryArea4" class="disabled">충청</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea5" disabled>
                    <label for="deliveryArea5" class="disabled">전남</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea6" disabled>
                    <label for="deliveryArea6" class="disabled">전북</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea7" disabled>
                    <label for="deliveryArea7" class="disabled">대구/경북</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea8" disabled>
                    <label for="deliveryArea8" class="disabled">부산/경남</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">첨부파일</th>
              <td colspan="3">
                <ul class="file_list">
                  <li>
                    <a href="#" class="link_file">성화티앤피 통장사본.pdf</a>
                    <span class="txt_info1">0.26 MB</span>
                  </li>
                  <li>
                    <a href="#"  class="link_file">성화티앤피 사업자등록증.pdf</a>
                    <span class="txt_info1">0.33 MB</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">공급사비고</th>
              <td colspan="3">
                <textarea cols="30" rows="10" style="height: 4rem"></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <h6 class="s_title mt32">담당자 정보</h6>
        <div class="table_sticky_area">
          <div class="btn_area">
            <button type="button" class="btn btn-default" style="width: 60px">삭제</button>
            <button type="button" class="btn btn-default" style="width: 60px">저장</button>
          </div>
          <div class="table_sticky_wrap" style="max-height:137px">
            <table class="table_sticky">
              <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
              <colgroup>
                <col style="width: 4%">
                <col style="width: 16.5%">
                <col style="width: 12.5%">
                <col style="width: 12.5%">
                <col style="width: 22.5%">
                <col style="width: 12.5%">
                <col style="width: 6.5%">
                <col style="width: 6.5%">
                <col style="width: 6.5%">
              </colgroup>
              <tbody>
                <tr>
                  <th scope="col">
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" id="checkAll">
                    </div>
                  </th>
                  <th scope="col"><span class="co_red">*</span>성명</th>
                  <th scope="col"><span class="co_red">*</span>전화번호</th>
                  <th scope="col"><span class="co_red">*</span>휴대전화</th>
                  <th scope="col"><span class="co_red">*</span>E-mail</th>
                  <th scope="col">팩스번호</th>
                  <th scope="col">영업</th>
                  <th scope="col">물류</th>
                  <th scope="col">정산</th>
                </tr>
                <tr>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" name="checkLine">
                    </div>
                  </td>
                  <td>성화티앤피</td>
                  <td>031-357-5808</td>
                  <td>010-9013-1274</td>
                  <td>sunghwa210427@hanmail.net</td>
                  <td>031-355-1121</td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" checked disabled>
                    </div>
                  </td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" disabled>
                    </div>
                  </td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" checked disabled>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" name="checkLine">
                    </div>
                  </td>
                  <td>성화티앤피</td>
                  <td>031-357-5808</td>
                  <td>010-9013-1274</td>
                  <td>sunghwa210427@hanmail.net</td>
                  <td>031-355-1121</td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" checked disabled>
                    </div>
                  </td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" disabled>
                    </div>
                  </td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" checked disabled>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" name="checkLine">
                    </div>
                  </td>
                  <td>성화티앤피</td>
                  <td>031-357-5808</td>
                  <td>010-9013-1274</td>
                  <td>sunghwa210427@hanmail.net</td>
                  <td>031-355-1121</td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" checked disabled>
                    </div>
                  </td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" disabled>
                    </div>
                  </td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" checked disabled>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" name="checkLine">
                    </div>
                  </td>
                  <td>성화티앤피</td>
                  <td>031-357-5808</td>
                  <td>010-9013-1274</td>
                  <td>sunghwa210427@hanmail.net</td>
                  <td>031-355-1121</td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" checked disabled>
                    </div>
                  </td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" disabled>
                    </div>
                  </td>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control" checked disabled>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">닫기</button>
      </div>
    </div>
  </div>
</div>

<!-- 고객사 조회 Modal -->
<div class="modal fade" id="customerInquiryModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">고객사 조회</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <h6 class="s_title">일반 정보</h6>
        <table class="table_line">
          <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
          <colgroup>
            <col style="width: 22.5%">
            <col style="width: 27.5%">
            <col style="width: 22.5%">
            <col style="width: 27.5%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">고객사코드</th>
              <td>S00420</td>
              <th scope="row">고객사명</th>
              <td>주식회사 성화티앤피</td>
            </tr>
            <tr>
              <th scope="row">사업자등록번호</th>
              <td>2498702263</td>
              <th scope="row">부서</th>
              <td>김정화</td>
            </tr>
            <tr>
              <th scope="row">회사주소(본사)</th>
              <td colspan="3">
                <p>46977</p>
                <p>부산광역시 사상구 괘감로 37</p>
                <p>부산산업유통상가 26동 136호</p>
              </td>
            </tr>
            <tr>
              <th scope="row">회사주소(공장)</th>
              <td colspan="3">
                <p>31247</p>
                <p>서울특별시 강남구 언주로 652 (논현동, 쿠쿠빌딩)</p>
                <p>테스트 빌딩 16층 1623호</p>
              </td>
            </tr>
            <tr>
              <th scope="row">대표전화번호</th>
              <td>031-357-5808</td>
              <th scope="row">대표팩스번호</th>
              <td>031-355-1121</td>
            </tr>
            <tr>
              <th scope="row">업태</th>
              <td>제조업</td>
              <th scope="row">종목</th>
              <td>골판지상자</td>
            </tr>
            <tr>
              <th scope="row">대표 E-mail</th>
              <td>testid123@domain.com</td>
              <th scope="row">종업원수</th>
              <td>31<span class="txt_cost">(명)</span></td>
            </tr>
            <tr>
              <th scope="row">법인등록번호</th>
              <td>2498702263</td>
              <th scope="row">설립일자</th>
              <td>2021/04/27</td>
            </tr>
            <tr>
              <th scope="row">전년도 매출액</th>
              <td>0<span class="txt_cost">(천만원)</span></td>
              <th scope="row">신용등급</th>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">상장여부</th>
              <td>Yes</td>
              <th scope="row">상장일자</th>
              <td>2022/04/27</td>
            </tr>
            <tr>
              <th scope="row">당사 시스템 사용여부</th>
              <td>Yes</td>
              <th scope="row">구매사 Tier</th>
              <td>N/A</td>
            </tr>
            <tr>
              <th scope="row">WMS</th>
              <td>No</td>
              <th scope="row">My site</th>
              <td>No</td>
            </tr>
            <tr>
              <th scope="row">결재사용여부</th>
              <td>No</td>
              <th scope="row">예산사용여부</th>
              <td>No</td>
            </tr>
            <tr>
              <th scope="row">AM</th>
              <td>김명규</td>
              <th scope="row">여신한도</th>
              <td>0<span class="txt_cost">(백만원)</span></td>
            </tr>
            <tr>
              <th scope="row">운영사</th>
              <td>(주)올트</td>
              <th scope="row">자동발주사용여부</th>
              <td>No</td>
            </tr>
            <tr>
              <th scope="row">공급사조회여부</th>
              <td colspan="3">No</td>
            </tr>
            <tr>
              <th scope="row">납품가능지역</th>
              <td colspan="3">
                <div class="chk_area">
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea1" disabled>
                    <label for="deliveryArea1" class="disabled">전국</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea2" disabled>
                    <label for="deliveryArea2" class="disabled">수도권</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea3" disabled>
                    <label for="deliveryArea3" class="disabled">강원</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea4" checked disabled>
                    <label for="deliveryArea4" class="disabled">충청</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea5" disabled>
                    <label for="deliveryArea5" class="disabled">전남</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea6" disabled>
                    <label for="deliveryArea6" class="disabled">전북</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea7" disabled>
                    <label for="deliveryArea7" class="disabled">대구/경북</label>
                  </div>
                  <div class="chk_label">
                    <input type="checkbox" class="form-control" id="deliveryArea8" disabled>
                    <label for="deliveryArea8" class="disabled">부산/경남</label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">첨부파일</th>
              <td colspan="3">
                <ul class="file_list">
                  <li>
                    <a href="#" class="link_file">(주)화진메디칼 통장사본.pdf</a>
                    <span class="txt_info1">0.26 MB</span>
                  </li>
                  <li>
                    <a href="#"  class="link_file">(주)화진메디칼 사업자등록증.pdf</a>
                    <span class="txt_info1">0.33 MB</span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">CI</th>
              <td colspan="3">
                <ul class="file_list">
                  <li>
                    <a href="#" class="link_file">(주)화진메디칼 CI.pdf</a>
                    <span class="txt_info1">0.26 MB</span>
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

<!-- 사용자 상세정보 Modal -->
<div class="modal fade" id="userDetailsModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">사용자 상세정보</h5>
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
              <th scope="row">회사</th>
              <td colspan="3">
                (주)올트테스트테스
              </td>
            </tr>
            <tr>
              <th scope="row">이름</th>
              <td>
                홍길동(TESTID)
              </td>
              <th scope="row">직급</th>
              <td>
                직급명
              </td>
            </tr>
            <tr>
              <th scope="row">사업부</th>
              <td>
                사업부명
              </td>
              <th scope="row">부서명</th>
              <td>
                부서명
              </td>
            </tr>
            <tr>
              <th scope="row">휴대폰</th>
              <td>
                010-2222-4444
              </td>
              <th scope="row">연락처</th>
              <td>
                031-4444-7777
              </td>
            </tr>
            <tr>
              <th scope="row">팩스</th>
              <td colspan="3">
                032-5555-6666
              </td>
            </tr>
            <tr>
              <th scope="row">e-mail</th>
              <td colspan="3">
                testid3789@testdomain.co.kr
              </td>
            </tr>
            <tr>
              <th scope="row">주소</th>
              <td colspan="3">
                <p>27681</p> 
                <p>서울특별시 영등포구 구로디지털단지로 2112 가길 215-20</p>
                <p>스타빌리지 301호</p>
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

<!-- 인수자정보 Modal -->
<div class="modal fade" id="consigneeInfoModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">인수자 정보</h5>
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
                인수자
              </th>
              <td>
                홍길동
              </td>
              <th scope="row">
                부서
              </th>
              <td>
                부서명
              </td>
            </tr>
            <tr>
              <th scope="row">
                휴대폰
              </th>
              <td>
                010-2222-2222
              </td>
              <th scope="row">
                연락처
              </th>
              <td>
                02-2222-1111
              </td>
            </tr>
            <tr>
              <th scope="row">
                납품장소
              </th>
              <td colspan="3">
                <p>31247</p>
                <p>서울특별시 강남구 언주로 652 (논현동, 쿠쿠빌딩)</p>
                <p>테스트 빌딩 16층 1623호</p>
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

<!-- 납품완료일 입력 Modal -->
<div class="modal fade" id="enterdeliveryEndDateModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_sm modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">납품완료일 입력</h5>
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
                납품완료일
              </th>
              <td>
                <input type="date" value="2022-06-17" class="form-control" style="width: 102px" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">취소</button>
        <button type="button" class="btn btn-secondary">확인</button>
      </div>
    </div>
  </div>
</div>