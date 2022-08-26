<svelte:head>
  <title>장바구니 | 운영사</title>
</svelte:head>

<div class="location">
    <a href="/opmanager/budgets/default">- 주문관리</a> &gt; <a href="/opmanager/budgets/default">주문관리</a> &gt; <a href="/opmanager/budgets/default" class="on">장바구니</a>
</div>

<!-- 페이지 영역 -->
<h3><span>장바구니</span></h3>

<div class="wj-content_wrap">
  <div class="btn_box between">
    <div class="flex_box">
      <strong class="txt_cost_bold">Total : KRW 24,730</strong>
      <span class="txt_cost">(부가세별도)</span>
      <button type="button" class="btn btn-default" data-toggle="modal" data-target="#enterOrderInfoModal">주문정보입력</button>
    </div>
    <div class="flex_box">
      <button type="button" class="btn btn-default">Excel 다운로드</button>
      <button type="button" class="btn btn-default">삭제</button>
      <button type="button" class="btn btn-default">주문</button>
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
        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#accountCodeModal">계정코드</button>
      </div>
      <span style="font-size: 14px;">버튼 디자인 추가</span>
      <div class="btn_box">
        <button type="button" class="btn btn-default btn_icon">
          <img src="/content/opmanager/images/icon/ico_pencil.svg" alt="수정하기">
        </button>
        <button type="button" class="btn btn-default btn_icon">
          <img src="/content/opmanager/images/icon/ico_srch.svg" alt="찾기">
        </button>
      </div>
    </div>
  </div>
  <!-- //wijmo area -->
</div>
<!-- //페이지 영역 -->

<!-- 주문정보 입력 Modal -->
<div class="modal fade" id="enterOrderInfoModal" tabindex="-1" role="dialog">
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
                인수자
              </th>
              <td>
                <input type="text" class="form-control" value="홍길동" style="width: 17.6rem">
              </td>
              <th scope="row">
                부서
              </th>
              <td>
                <input type="text" class="form-control" value="관리팀" style="width: 17.6rem">
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
                <div class="chk_label">
                  <input type="checkbox" class="form-control" id="chk_prearrival">
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
                희망납기일
              </th>
              <td colspan="3">
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

<!-- 계정코드 Modal -->
<div class="modal fade" id="accountCodeModal" tabindex="-1" role="dialog">
  <div class="modal-dialog modal_md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">계정코드</h5>
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
                <input type="text" class="form-control" value="홍길동" style="width: 10rem">
              </td>
              <th scope="row">
                부서
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