<script>
  import { page } from  "$app/stores"
  import gnbOpmanagerData from "$lib/data/gnb_opmanager.json"
  import gnbSellerData from "$lib/data/gnb_seller.json"

  $: menus = isOpmanager ? gnbOpmanagerData : gnbSellerData
  //$: console.log('pathname: ', $page.url.pathname)

  let isOpmanager;
  // 운영사 Flag 변수
  if($page.url.pathname === '/' || $page.url.pathname.startsWith('/order') || $page.url.pathname.startsWith('/op_invoice')) {
    isOpmanager = true;
  }else{
    isOpmanager = false;
  }
  
</script>
  
{#if isOpmanager}
  <!-- 운영사 -->
  <div id="header">
    <!-- topMenu -->
    <div class="topMenu">
      <ul class="tnb clear_fix">
        <li class="login">
          <a class="btn_logout" href="/invoice/shipstatement/create" on:click={()=>(isOpmanager =! isOpmanager)} title="공급사로 이동">Go공급사</a>
        </li>
        <li class="login">
          <a class="btn_logout" href="https://apuc.arong.bar/" title="고객사로 이동">Go고객사</a>
        </li>
      </ul>
    </div>
    <!-- gnb -->
    <div class="clear_fix">
      <h1 class="logo">
        <a href="/" title="ALLT B2B 포탈 운영사"><img src="/content/opmanager/images/allt_logo_white.svg" alt="allt">
          <span>운영사</span>
        </a>
      </h1>
      <ul class="gnb clear_fix">
        {#each menus as menu}
          <li class:on={$page.url.pathname.startsWith(menu.path)}>
            <a href={menu.href}>{menu.name}</a>
          </li>  
        {/each}
        <!-- <li class="on"><a href="/budget/budgetList">환경설정</a></li>
        <li><a href="#" on:click={()=>{alert('서비스 준비 중 입니다.'); return false}}>정산관리</a></li> -->
      </ul>
    </div>
  </div>
  <!-- 홈 경우 예외처리 -->
  {#if $page.url.pathname === '/'}
    <div class="lnb">
      <h2>APU 홈</h2>
    </div>
  {:else}
    <div class="lnb">
      {#each menus as menu}
        {#if $page.url.pathname.startsWith(menu.path)}
        <h2>{menu.name}</h2>
        <ul class="lnbs">
          {#each menu.deps2Menus as deps2}
            <li class="menu on">
              <a class="on">{deps2.name}</a>
              <ul class="depth2">
                {#each deps2.deps3Menus as deps3}
                  <li class="sub_menu" class:on={$page.url.pathname === deps3.href}>
                    <a href={deps3.href}>{deps3.name}</a>
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
        <!-- <h2 id="">환경설정</h2>
        <ul class="lnbs">
          <li class="menu">
            <a class="on">예산/계정관리</a>
            <ul class="depth2">
              <li class="sub_menu"><a href="/budget/budgetList" class="on">예산관리</a></li>
              <li class="sub_menu"><a href="/budget/account/accountList">계정관리</a></li>
            </ul>
          </li>
        </ul> -->
        {/if}
      {/each}
    </div>
  {/if}
{:else}
  <!-- 공급사 -->
  <div id="header">
    <!-- topMenu -->
    <div class="topMenu">
      <ul class="tnb clear_fix">
        <li class="login">
          <a class="btn_logout" href="/" on:click={()=>(isOpmanager =! isOpmanager)} title="운영사로 이동">Go운영사</a>
        </li>
        <li class="login">
          <a class="btn_logout" href="https://apuc.arong.bar/" title="고객사로 이동">Go고객사</a>
        </li>
      </ul>
    </div>
    <!-- gnb -->
    <div class="clear_fix">
      <h1 class="logo">
        <a href="/invoice/shipstatement/create" title="ALLT B2B 포탈 공급사"><img src="/content/opmanager/images/allt_logo_white.svg" alt="allt">
          <span>공급사</span>
        </a>
      </h1>
      <ul class="gnb clear_fix">
        {#each menus as menu}
          <li class:on={$page.url.pathname.startsWith(menu.path)}>
            <a href={menu.href}>{menu.name}</a>
          </li>  
        {/each}
        <!-- <li class="on"><a href="#">마이페이지</a></li>
        <li><a href="#" on:click={()=>{alert('서비스 준비 중 입니다.'); return false}}>배송관리</a></li> -->
      </ul>
    </div>
  </div>
  <div class="lnb">
    {#each menus as menu}
      {#if $page.url.pathname.startsWith(menu.path)}
      <h2>{menu.name}</h2>
      <ul class="lnbs">
        {#each menu.deps2Menus as deps2}
          <li class="menu on">
            <a class="on">{deps2.name}</a>
            <ul class="depth2">
              {#each deps2.deps3Menus as deps3}
                <li class="sub_menu" class:on={$page.url.pathname === deps3.href}>
                  <a href={deps3.href}>{deps3.name}</a>
                </li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
      <!-- <h2 id="">마이페이지</h2>
      <ul class="lnbs">
        <li class="menu">
          <a class="on">공지사항</a>
          <ul class="depth2">
            <li class="sub_menu"><a href="#" on:click={()=>{alert('서비스 준비 중 입니다.'); return false}} class="on">납품게시판</a></li>
          </ul>
        </li>
      </ul> -->
      {/if}
    {/each}
  </div>
{/if}