<svelte:head>
  <title>주문조회(취소) | 운영사</title>
</svelte:head>

<div class="location">
    <a href="/opmanager/budgets/default">- 주문관리</a> &gt; <a href="/opmanager/budgets/default">주문관리</a> &gt; <a href="/opmanager/budgets/default" class="on">주문조회(취소)</a>
</div>

<!-- 페이지 영역 -->
<h3><span>주문조회(취소)</span></h3>
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
        사업부
      </th> 
      <td>
        <select name="" class="form-control">
          <option value="">-----</option>
        </select>
      </td> 
      <th scope="row">
        부서
      </th>
      <td>
        <select name="" class="form-control">
          <option value="">-----</option>
        </select>
      </td>
      <th scope="row">
        주문자
      </th>
      <td>
        <input type="text" class="form-control inp_srch" style="width: 19.2rem;">
      </td>
    </tr>
    <tr>
      <th scope="row">
        주문생성일
      </th>
      <td>
        <div class="flex_box">
          <input type="date" value="2022-06-17" class="form-control" style="width: 10.2rem" />
          <div class="frog">~</div>
          <input type="date" value="2022-06-17" class="form-control frog" style="width: 10.2rem" />
        </div>
      </td> 
      <th scope="row">
        주문번호
      </th>
      <td>
        <input type="text" class="form-control" style="width: 19.2rem;">
      </td>
      <th scope="row">
        공급사
      </th>
      <td>
        <div class="flex_box">
          <input type="text" class="form-control" style="width: 16.4rem">
          <button type="button" class="btn btn-default btn_icon half_frog" data-toggle="modal" data-target="#findSupplierModal">
            <img src="/content/opmanager/images/icon/ico_srch.svg" alt="팝업 열기">
          </button>
        </div>
      </td>
    </tr>
    <tr>
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
      <th scope="row">
        주문상태
      </th>
      <td>
        <select name="" class="form-control">
          <option value="">-----</option>
        </select>
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
      <button type="button" class="btn btn-default">주문서출력</button>
    </div>
    <div class="flex_box">
      <button type="button" class="btn btn-default">주문취소</button>
      <button type="button" class="btn btn-default">저장</button>
      <button type="button" class="btn btn-default btn_icon">
        <img src="/content/opmanager/images/icon/ico_select_column.svg" alt="컬럼선택">
      </button>
    </div>
  </div>

  <!-- wijmo area -->
  <div id="contentGridEl" class="wj-control wj-content wj-flexgrid" style="position: relative;">
    <div style="position: absolute; top: 50%; transform: translateY(-50%); width: 100%; height: auto; font-size:50px; text-align: center;">
      wijmo area
      <div class="btn_box">
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#consigneeInfoModal">인수자정보</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#requestsModal">요청사항</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#userDetailsModal">사용자 상세정보</button>
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#orderProgressInfoModal">주문진행정보</button>
      </div>
    </div>
  </div>
  <!-- //wijmo area -->
</div>
<!-- //페이지 영역 -->

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
                <input type="text" class="form-control" value="홍길동" style="width: 17.6rem">
              </td>
              <th scope="row">
                부서
              </th>
              <td>
                <input type="text" class="form-control" value="부서명" style="width: 17.6rem">
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
          </tbody>
        </table>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">취소</button>
        <button type="button" class="btn btn-secondary line">초기화</button>
        <button type="button" class="btn btn-secondary">저장</button>
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
        <textarea class="form-control" cols="30" rows="10">
납품 전 연락부탁드립니다.
줄바꿈 되고 줄바꿈되고
스크롤 생성되고 
납품 전 연락부탁드립니다.
줄바꿈 되고 줄바꿈되고
스크롤 생성되고
        </textarea>
      </div>
      <div class="modal-footer btn_box">
        <button type="button" class="btn btn-secondary line" data-dismiss="modal">취소</button>
        <button type="button" class="btn btn-secondary">저장</button>
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

<!-- 주문진행정보 Modal -->
<div class="modal fade" id="orderProgressInfoModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">주문진행정보</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <ol class="order_progress_olist">
          <li class="active">주문생성</li>
          <li class="active">납품생성</li>
          <li>납품완료</li>
          <li>입고</li>
        </ol>
        <h6 class="pop_subTitle">품목정보</h6>
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
                품목코드
              </th>
              <td>
                5000020900
              </td>
              <th scope="row">
                고객사품목코드
              </th>
              <td>
                5000020900
              </td>
            </tr>
            <tr>
              <th scope="row">
                품목명
              </th>
              <td>
                스프레이락카
              </td>
              <th scope="row">
                규격
              </th>
              <td>
                흑색(305), 420ML, 1BOX=40EA
              </td>
            </tr>
            <tr>
              <th scope="row">
                제조사
              </th>
              <td>
                럭키산업
              </td>
              <th scope="row">
                모델번호
              </th>
              <td>
                -
              </td>
            </tr>
            <tr>
              <th scope="row">
                Sourcing담당
              </th>
              <td>
                김명규
              </td>
              <th scope="row">
                전화번호
              </th>
              <td>
                02-2635-8788
              </td>
            </tr>
            <tr>
              <th scope="row">
                휴대폰
              </th>
              <td>
                010-4108-4503
              </td>
              <th scope="row">
                e-mail
              </th>
              <td>
                testid3789@testdomain.co.kr
              </td>
            </tr>
          </tbody>
        </table>
        <h6 class="pop_subTitle">주문정보</h6>
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
                주문번호
              </th>
              <td>
                CPO22060031
              </td>
              <th scope="row">
                문서 Type
              </th>
              <td>
                U/I
              </td>
            </tr>
            <tr>
              <th scope="row">
                사업부
              </th>
              <td>
                B00127-1
              </td>
              <th scope="row">
                예산체크
              </th>
              <td>
                N
              </td>
            </tr>
            <tr>
              <th scope="row">
                소속부서
              </th>
              <td>
                관리팀
              </td>
              <th scope="row">
                결재여부
              </th>
              <td>
                N
              </td>
            </tr>
            <tr>
              <th scope="row">
                예산부서
              </th>
              <td>
                -
              </td>
              <th scope="row">
                공급사
              </th>
              <td>
                -
              </td>
            </tr>
            <tr>
              <th scope="row">
                계정
              </th>
              <td>
                -
              </td>
              <th scope="row">
                주문수량
              </th>
              <td>
                10 BOX
              </td>
            </tr>
            <tr>
              <th scope="row">
                주문자
              </th>
              <td>
                홍길동
              </td>
              <th scope="row">
                주문단가
              </th>
              <td>
                61,600
              </td>
            </tr>
            <tr>
              <th scope="row">
                인수자
              </th>
              <td>
                홍길동 부장
              </td>
              <th scope="row">
                주문금액
              </th>
              <td>
                616,000 KRW
              </td>
            </tr>
            <tr>
              <th scope="row">
                주문생성일
              </th>
              <td>
                2022/06/29
              </td>
              <th scope="row">
                주문일(결재완료일)
              </th>
              <td>
                2022/06/29
              </td>
            </tr>
            <tr>
              <th scope="row">
                희망납기일
              </th>
              <td>
                2022/06/29
              </td>
              <th scope="row">
                표준납기일
              </th>
              <td>
                2022/06/29
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
            <tr>
              <th scope="row">
                요청사항
              </th>
              <td colspan="3">
                <textarea cols="30" rows="10" style="height: 4.8rem">납품 전 연락부탁드립니다. 줄바꿈 되고 줄바꿈되고 스크롤 생성되고 납품 전 연락부탁드립니다. 줄바꿈 되고 줄바꿈되고 스크롤 생성되고</textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <h6 class="pop_subTitle">품목정보</h6>
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
                공급사
              </th>
              <td>
                테스트테스트공급사
              </td>
              <th scope="row">
                대표 전화번호
              </th>
              <td>
                02-2635-8788
              </td>
            </tr>
            <tr>
              <th scope="row">
                공급사 담당자
              </th>
              <td>
                홍길동
              </td>
              <th scope="row">
                담당자 전화번호
              </th>
              <td>
                02-2635-8788
              </td>
            </tr>
            <tr>
              <th scope="row">
                휴대폰
              </th>
              <td>
                럭키산업
              </td>
              <th scope="row">
                e-mail
              </th>
              <td>
                testid3789@testdomain.co.kr
              </td>
            </tr>
          </tbody>
        </table>
        <!-- wijmo area -->
        <div class="wj-control wj-content wj-flexgrid mt16" style="position: relative; height: 15rem;">
          <div style="position: absolute; top: 50%; transform: translateY(-50%); width: 100%; height: auto; font-size:50px; text-align: center;">
            wijmo area
          </div>
        </div>
        <!-- //wijmo area -->
        <h6 class="pop_subTitle">입고정보</h6>
        <!-- wijmo area -->
        <div class="wj-control wj-content wj-flexgrid" style="position: relative; height: 15rem;">
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

<!-- 공급사찾기 Modal -->
<div class="modal fade" id="findSupplierModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">공급사찾기</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt="close"></span>
        </button>
      </div>
      <div class="modal-body">
        <!-- wijmo area -->
        <div class="wj-control wj-content wj-flexgrid" style="position: relative; height: 17.4rem;">
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