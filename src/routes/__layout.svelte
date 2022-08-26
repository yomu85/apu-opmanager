<script>
	import Header from '$lib/Header.svelte'
</script>

<Header />
<div class="contents">
  <div class="contents_inner">
    <slot />
  </div>
</div>

<style>
:global(button[data-target="#enterdeliveryEndDateModal"]),
:global(button[data-target="#customerInquiryModal"]),
:global(button[data-target="#supplierInquiryModal"]),
:global(button[data-target="#ordererInputModal"]),
:global(button[data-target="#attachmentsModal"]),
:global(button[data-target="#createDivDeliveryModal"]),
:global(button[data-target="#enterReason1Modal"]),
:global(button[data-target="#enterReason2Modal"]),
:global(button[data-target="#findCustomerModal"]),
:global(button[data-target="#userInquiryModal"]),
:global(button[data-target="#findSupplierModal"]),
:global(button[data-target="#buyNowModal"]),
:global(button[data-target="#manufactureSearchModal"]),
:global(button[data-target="#itemDetailsModal"]),
:global(button[data-target="#orderProgressInfoModal"]),
:global(button[data-target="#userDetailsModal"]),
:global(button[data-target="#accountCodeModal"]),
:global(button[data-target="#requestsModal"]),
:global(button[data-target="#consigneeInfoModal"]),
:global(button[data-target="#enterOrderInfoModal"]) {
	animation-duration: 2.5s;
  animation-name: BoxShadow;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes BoxShadow {
	0% { 
		box-shadow: none;
	}
	100% { 
		box-shadow: 1px 1px 12px 3px #A6C8FF;
	}
}
</style>