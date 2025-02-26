$(document).ready(function () {
	function submitForm() {
		let formData = $(".glossTop").serialize(); // Get form data

		$.ajax({
			url: window.location.pathname, // Keep current URL
			type: "GET",
			data: formData,
			beforeSend: function () {
				$(".glossList").html("<div class='errMsg'><div class='page-center'><p>Loading...</p></div></div>");
			},
			success: function (response) {
				let newHtml = $(response).find(".glossList").html();
				$(".glossList").html(newHtml);
			},
			error: function () {
				$(".glossList").html("<div class='errMsg'><div class='page-center'><p>Error loading results.</p></div></div>");
			},
		});
	}
	function ToggleClass() {
		$(".glossBtn").on("click", function () {
			$(this)
				.parents(".glossItems")
				.toggleClass("cntToggle")
				.siblings()
				.removeClass("cntToggle");
		});
	}
	// Auto-submit on search input change
	$(".glossSearch input[type='search']").on("input", function () {
		submitForm();
		setTimeout(function() {
			ToggleClass();
		}, 1500);
	});

	// Auto-submit on radio button selection
	$(".glossCat input[type='radio']").on("change", function () {
		submitForm();
		setTimeout(function() {
			ToggleClass();
		}, 1500);
		$(this).parent().addClass("active").siblings().removeClass("active");
	});

	ToggleClass();
});
