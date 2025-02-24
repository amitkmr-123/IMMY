$(document).ready(function () {
	function submitForm() {
		let formData = $(".glossTop").serialize(); // Get form data

		$.ajax({
			url: window.location.pathname, // Keep current URL
			type: "GET",
			data: formData,
			beforeSend: function () {
				$(".glossList").html("<p>Loading...</p>");
			},
			success: function (response) {
				let newHtml = $(response).find(".glossList").html();
				$(".glossList").html(newHtml);
			},
			error: function () {
				$(".glossList").html("<p>Error loading results.</p>");
			},
		});
	}

	// Auto-submit on search input change
	$(".glossSearch input[type='search']").on("input", function () {
		submitForm();
	});

	// Auto-submit on radio button selection
	$(".glossCat input[type='radio']").on("change", function () {
		submitForm();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	$('.glossBtn').click(function(){
		$(this).parents('.glossItems').toggleClass('cntToggle').siblings().removeClass('cntToggle');
	})
});
