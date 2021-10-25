(function ($) {
	$(document).ready(function() {
		var ethexplorer = "EK-5UhBZ-bVLfdyY-jUqwE";
		var tokenContract = "0xcd7492db29e2ab436e819b249452ee1bbdf52214";
		$.ajax({
			type: 'GET',
			url: `https://api.ethplorer.io/getTokenInfo/${tokenContract}?apiKey=${ethexplorer}`,
			dataType: 'json',
			success: function(data) {
				$("#holder_count").html(data['holdersCount']);
			},
			error: function(data) {
				$("#holder_count").html('???');
			}
		});
	});
})(jQuery);

