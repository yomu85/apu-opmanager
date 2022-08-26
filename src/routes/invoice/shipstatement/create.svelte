<svelte:head>
  <title>납품서 생성/거부 | 공급사</title>
</svelte:head>

<!-- 페이지 영역 -->
<h3><span>납품서 생성/거부</span></h3>
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
        주문일자
      </th>
      <td>
        <div class="flex_box">
          <input type="date" value="2022-06-17" class="form-control" style="width: 10.2rem" />
          <div class="half_frog">~</div>
          <input type="date" value="2022-06-17" class="form-control half_frog" style="width: 10.2rem" />
        </div>
      </td> 
      <th scope="row">
        상품코드
      </th>
      <td>
        <input type="text" class="form-control" style="width: 19.2rem;">
      </td>
      <th scope="row">
        상품명
      </th>
      <td>
        <input type="text" class="form-control" style="width: 19.2rem;">
      </td>
    </tr>
    <tr>
      <th scope="row">
        고객사
      </th> 
      <td>
        <input type="text" class="form-control inp_srch" style="width: 19.2rem;">
      </td> 
      <th scope="row">
        주문자
      </th>
      <td>
        <input type="text" class="form-control inp_srch" style="width: 19.2rem;">
      </td>
      <th scope="row">
        주문번호
      </th>
      <td>
        <input type="text" class="form-control" style="width: 19.2rem;">
      </td>
    </tr>
    <tr>
      <th scope="row">주문상태</th>
      <td colspan="5">
        <div class="rdo_area">
          <div class="rdo_label">
            <input type="radio" name="orderStatus" class="form-control" id="status1"  checked>
            <label for="status1">주문생성</label>
          </div>
          <div class="rdo_label">
            <input type="radio" name="orderStatus" class="form-control" id="status2">
            <label for="status2">납품거부</label>
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
      <button type="button" class="btn btn-default">납품생성</button>
      <button type="button" class="btn btn-default">분할생성</button>
      <button type="button" class="btn btn-default">납품거부</button>
      <button type="button" class="btn btn-default">납품거부취소</button>
      <strong class="txt_cost_bold frog">Total : KRW 24,730.00</strong>
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
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#userDetailsModal">사용자 상세정보</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#consigneeInfoModal">인수자정보</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#requestsModal">요청사항</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#userInquiryModal">사용자 조회</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#enterReason1Modal">지연사유 입력</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#enterReason2Modal">납품거부사유 입력</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#createDivDeliveryModal">분할납품 생성</button>
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
                27681 서울특별시 영등포구 구로디지털단지로 2112 가길 215-20 스타빌리지 301호
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

<!-- 요청사항 Modal -->
<div class="modal fade" id="requestsModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">요청사항</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <div class="txta_result" style="min-height: 67px; max-height: 130px;">
          납품 전 연락부탁드립니다. <br>
          줄바꿈 되고 줄바꿈되고<br>
          스크롤 생성되고 <br>
          납품 전 연락부탁드립니다.<br>
          줄바꿈 되고 줄바꿈되고<br>
          납품 전 연락부탁드립니다. <br>
          줄바꿈 되고 줄바꿈되고<br>
          스크롤 생성되고 <br>
          납품 전 연락부탁드립니다.<br>
          줄바꿈 되고 줄바꿈되고<br>
          스크롤 생성되고
        </div>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">취소</button>
      </div>
    </div>
  </div>
</div>

<!-- 사용자 조회 Modal -->
<div class="modal fade" id="userInquiryModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">사용자조회</h5>
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
                사용자 ID
              </th>
              <td>
                <input type="text" class="form-control" style="width: 10rem">
              </td>
              <th scope="row">
                사용자명
              </th>
              <td>
                <input type="text" class="form-control" style="width: 10rem">
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btn_box mt8">
          <button type="button" class="btn btn-default btn_srch_left">조회</button>
        </div>
        <div class="table_sticky_wrap mt32" style="max-height:174px">
          <table class="table_sticky">
            <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
            <colgroup>
              <col style="width: 11.4%">
              <col style="width: 7.9%">
              <col style="width: 22.5%">
              <col style="width: 9.6%">
              <col style="width: 9.6%">
              <col style="width: 16.5%">
              <col style="width: 22.5%">
            </colgroup>
            <tbody>
              <tr>
                <th scope="col">사용자ID</th>
                <th scope="col">사용자명</th>
                <th scope="col">회사명</th>
                <th scope="col">사업부명</th>
                <th scope="col">부서명</th>
                <th scope="col">휴대전화</th>
                <th scope="col">사업부코드</th>
              </tr>
              <tr>
                <td>testid3222</td>
                <td>홍길동</td>
                <td class="txt_left">주식회사 테스트</td>
                <td>사업부명</td>
                <td>부서명</td>
                <td>010-3273-2498</td>
                <td>2000001100</td>
              </tr>
              <tr>
                <td>testid3222</td>
                <td>홍길동</td>
                <td class="txt_left">주식회사 테스트</td>
                <td>사업부명</td>
                <td>부서명</td>
                <td>010-3273-2498</td>
                <td>2000001100</td>
              </tr>
              <tr>
                <td>testid3222</td>
                <td>홍길동</td>
                <td class="txt_left">주식회사 테스트</td>
                <td>사업부명</td>
                <td>부서명</td>
                <td>010-3273-2498</td>
                <td>2000001100</td>
              </tr>
              <tr>
                <td>testid3222</td>
                <td>홍길동</td>
                <td class="txt_left">주식회사 테스트</td>
                <td>사업부명</td>
                <td>부서명</td>
                <td>010-3273-2498</td>
                <td>2000001100</td>
              </tr>
              <tr>
                <td>testid3222</td>
                <td>홍길동</td>
                <td class="txt_left">주식회사 테스트</td>
                <td>사업부명</td>
                <td>부서명</td>
                <td>010-3273-2498</td>
                <td>2000001100</td>
              </tr>
              <tr>
                <td>testid3222</td>
                <td>홍길동</td>
                <td class="txt_left">주식회사 테스트</td>
                <td>사업부명</td>
                <td>부서명</td>
                <td>010-3273-2498</td>
                <td>2000001100</td>
              </tr>
              <tr>
                <td>testid3222</td>
                <td>홍길동</td>
                <td class="txt_left">주식회사 테스트</td>
                <td>사업부명</td>
                <td>부서명</td>
                <td>010-3273-2498</td>
                <td>2000001100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">닫기</button>
      </div>
    </div>
  </div>
</div>

<!-- 지연사유 입력 Modal -->
<div class="modal fade" id="enterReason1Modal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">지연사유 입력</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table_line">
          <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
          <colgroup>
            <col style="width: 22.5%">
            <col style="width: 77.5%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                지연사유
              </th>
              <td>
                <select class="form-control">
                  <option value="">-----</option>
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                상세내역
              </th>
              <td>
                <textarea cols="30" rows="10" style="height: 9.4rem">
납품 전 연락부탁드립니다. 
줄바꿈 되고 줄바꿈되고 
스크롤 생성되고 
납품 전 연락부탁드립니다. 
줄바꿈 되고 줄바꿈되고 
스크롤 생성되고
                </textarea>
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

<!-- 지연사유 입력 Modal -->
<div class="modal fade" id="enterReason2Modal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">납품거부사유 입력</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table_line">
          <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
          <colgroup>
            <col style="width: 22.5%">
            <col style="width: 77.5%">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                거부사유
              </th>
              <td>
                <select class="form-control">
                  <option value="">-----</option>
                </select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                상세내역
              </th>
              <td>
                <textarea cols="30" rows="10" style="height: 9.4rem">
납품 전 연락부탁드립니다. 
줄바꿈 되고 줄바꿈되고 
스크롤 생성되고 
납품 전 연락부탁드립니다. 
줄바꿈 되고 줄바꿈되고 
스크롤 생성되고
                </textarea>
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

<!-- 분할납품 생성 Modal -->
<div class="modal fade" id="createDivDeliveryModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">분할납품 생성</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
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
              <th scope="row">상품코드</th>
              <td>
                홍길동
              </td>
              <th scope="row">희망납기일</th>
              <td>
                2022/07/22
              </td>
            </tr>
            <tr>
              <th scope="row">상품명</th>
              <td colspan="3">
                안면부 여과식 방진마스크
              </td>
            </tr>
            <tr>
              <th scope="row">규격</th>
              <td colspan="3">
                규격 [M820301]핸디맨)콘크리트 못 세트(25m
              </td>
            </tr>
            <tr>
              <th scope="row">주문수량</th>
              <td>
                010-2222-4444
              </td>
              <th scope="row">납품가능수량</th>
              <td>
                031-4444-7777
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table_sticky_area mt32">
          <div class="btn_area">
            <button type="button" class="btn btn-default btn_icon"><img src="/content/opmanager/images/icon/ico_plus.svg" alt="추가"></button>
            <button type="button" class="btn btn-default btn_icon"><img src="/content/opmanager/images/icon/ico_minus.svg" alt="삭제"></button>
          </div>
          <div class="table_sticky_wrap" style="max-height:125px">
            <table class="table_sticky">
              <caption>Allt에서 관리하는 정보를 조회하기 위한 입력 폼입니다.</caption>
              <colgroup>
                <col style="width: 7%">
                <col style="width: 23%">
                <col style="width: 19%">
                <col style="width: 51%">
              </colgroup>
              <tbody>
                <tr>
                  <th scope="col">
                    <div class="chk_label">
                      <input type="checkbox" class="form-control">
                    </div>
                  </th>
                  <th scope="col"><span class="co_red">*</span>납품약속일</th>
                  <th scope="col"><span class="co_red">*</span>납품수량</th>
                  <th scope="col">지연사유</th>
                </tr>
                <tr>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control">
                    </div>
                  </td>
                  <td>
                    <input type="date" value="2022-06-17" class="form-control" style="width: 100%" />
                  </td>
                  <td>
                    <input type="text" value="1" class="form-control" style="width: 100%" />
                  </td>
                  <td class="txt_left txt_with_btn">
                    지연사유 지연사유 지연사유
                    <button type="button" class="btn btn_icon btn_cell_right"><img src="/content/opmanager/images/icon/ico_pencil.svg" alt="수정"></button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control">
                    </div>
                  </td>
                  <td>
                    <input type="date" value="2022-06-17" class="form-control" style="width: 100%" />
                  </td>
                  <td>
                    <input type="text" value="1" class="form-control" style="width: 100%" />
                  </td>
                  <td class="txt_left txt_with_btn">
                    지연사유 지연사유 지연사유 지연사
                    <button type="button" class="btn btn_icon btn_cell_right"><img src="/content/opmanager/images/icon/ico_pencil.svg" alt="수정"></button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control">
                    </div>
                  </td>
                  <td>
                    <input type="date" value="2022-06-17" class="form-control" style="width: 100%" />
                  </td>
                  <td>
                    <input type="text" value="1" class="form-control" style="width: 100%" />
                  </td>
                  <td class="txt_left txt_with_btn">
                    지연사유 지연사유 지연사유
                    <button type="button" class="btn btn_icon btn_cell_right"><img src="/content/opmanager/images/icon/ico_pencil.svg" alt="수정"></button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="chk_label">
                      <input type="checkbox" class="form-control">
                    </div>
                  </td>
                  <td>
                    <input type="date" value="2022-06-17" class="form-control" style="width: 100%" />
                  </td>
                  <td>
                    <input type="text" value="1" class="form-control" style="width: 100%" />
                  </td>
                  <td class="txt_left txt_with_btn">
                    지연사유 지연사유 지연사유
                    <button type="button" class="btn btn_icon btn_cell_right"><img src="/content/opmanager/images/icon/ico_pencil.svg" alt="수정"></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">취소</button>
        <button type="button" class="btn btn-secondary">납품생성</button>
      </div>
    </div>
  </div>
</div>