<svelte:head>
  <title>마이 수정 | 공급사</title>
</svelte:head>

<style>
.wj-content_wrap {
    height: calc(100% - 144px);
}
</style>

<!-- 마이 수정 -->
<div class="location">
  <a href="/opmanager/budgets/default">- 마이페이지</a> &gt; <a href="/opmanager/budgets/default">마이deps2</a> &gt; <a href="/opmanager/account/accounts" class="on">마이수정</a>
</div>

<h3><span>마이 수정</span></h3>
<form id="dataForm" name="dataForm" method="GET" action="/opmanager/account/accounts">
    <div class="board_write">
        <table class="board_write_table" summary="계정관리">
            <caption>예산관리</caption>
            <colgroup>
                <col style="width:90px;">
                <col style="width:auto;">
                <col style="width:90px;">
                <col style="width:auto;">
            </colgroup>
            <tbody>
                <tr>
                    <td class="label">정산내역</td>
                    <td>
                        <div style="float: left">
                            <span role="status" aria-live="polite" class="ui-helper-hidden-accessible"></span><input type="text" id="buyerName" name="buyerName" value="" onkeydown="buyerNameChk()" class="ui-autocomplete-input" autocomplete="off">
                            <input type="text" style="display:none;"> <input type="hidden" id="buyerId" name="buyerId" value="">
                            <input type="text" style="display: none">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="btn_all">
        <button type="button" class="btn btn-secondary line" onclick="initSearchCondition()">
            초기화
        </button>
        <button type="button" class="btn btn-secondary" onclick="goSubmit()">
            조회
        </button>
    </div>
</form>

<div class="wj-content_wrap">
    <div class="btn_box between">
        <div class="btn_box">
            <button type="button" class="btn btn-default" onclick="saveAccount()">
                저장
            </button>
            <button type="button" class="btn btn-default" onclick="removeAccount()">
                삭제
            </button>
        </div>
        <div class="btn_box">
            <button type="button" class="btn btn-default" onclick="loadExcel()">
                Excel 가져오기
            </button>
            <button type="button" class="btn btn-default" onclick="saveExcel()">
                Excel 내보내기
            </button>
        </div>
    </div>
    <!-- wijmo area -->
    <div id="contentGridEl" class="wj-control wj-content wj-flexgrid" style="position: relative;">
      <div style="position: absolute; top: 50%; transform: translateY(-50%); width: 100%; height: auto; font-size:50px; text-align: center;">
        wijmo area
      </div>
    </div>
    <!-- //wijmo area -->
    <div class="btn_box right mt_half">
        <button type="button" class="btn btn-default" onclick="addRowData()">
            행추가
        </button>
    </div>
</div>

<!-- 고객사 입력 Modal -->
<div class="modal fade" id="buyerModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">고객사 입력</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><img src="/content/opmanager/images/pop_close.svg" alt=""></span>
                </button>
            </div>
            <div class="modal-body">
                <input type="text" id="buyerModalName" name="buyerName" class="form-control" style="width: 384px" value="" />
                <input type="hidden" id="buyerModalId" name="buyerId" value="" />
                <input type="hidden" id="buyerModalCode" name="buyerCode" value="" />
            </div>
            <div class="modal-footer btn_box">
                <button type="button" class="btn btn-secondary line" data-dismiss="modal">닫기</button>
                <button type="button" class="btn btn-secondary" onclick="_onClickModal()">저장</button>
            </div>
        </div>
    </div>
</div>