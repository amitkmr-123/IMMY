document.addEventListener("DOMContentLoaded", function () {
  const glossMain = document.querySelector(".glossMain");
  const glossTop = document.querySelector(".glossTop");
  const glossInr = document.querySelector(".glossInr");
  const placeholder = document.createElement("div");
  
  let isFixed = false;

  function checkSticky() {
    const glossMainRect = glossMain.getBoundingClientRect();
    const glossInrRect = glossInr.getBoundingClientRect();

    if (glossMainRect.top <= 0 && glossInrRect.bottom > window.innerHeight) {
      if (!isFixed) {
        placeholder.style.height = `${glossTop.offsetHeight}px`;
        glossMain.insertBefore(placeholder, glossTop);
        glossTop.classList.add("fixed");
        isFixed = true;
      }
    } else {
      if (isFixed) {
        placeholder.style.height = "0px";
        glossTop.classList.remove("fixed");
        isFixed = false;
      }
    }
  }

  window.addEventListener("scroll", checkSticky);
});

$(document).ready(function () {
  function adjustGlossInrHeight() {
    let glossListHeight = $(".glossList").outerHeight();
    $(".glossInr").css("min-height", glossListHeight + "px");
  }

  function submitForm() {
    let formData = $(".glossTop").serialize(); // Get form data
    adjustGlossInrHeight(); // Set current height before content update

    $.ajax({
      url: window.location.pathname, // Keep current URL
      type: "GET",
      data: formData,
      beforeSend: function () {
        $(".glossList").html(
          "<div class='errMsg'><div class='page-center'><p>Loading...</p></div></div>"
        );
      },
      success: function (response) {
        let newHtml = $(response).find(".glossList").html();
        $(".glossList").html(newHtml);
        
        // Recalculate and adjust height after content update
        adjustGlossInrHeight();

        // Smooth scroll to .glossInr after content update
        scrollToGlossInr();
      },
      error: function () {
        $(".glossList").html(
          "<div class='errMsg'><div class='page-center'><p>Error loading results.</p></div></div>"
        );
      },
    });
  }

  function scrollToGlossInr() {
    let glossTopHeight = $(".glossTop").outerHeight();
    $("html, body").animate(
      {
        scrollTop: $(".glossInr").offset().top - glossTopHeight - 10,
      },
      500
    );
  }

  // Adjust height on first load
  adjustGlossInrHeight();

  // Recalculate height on window resize
  $(window).on("resize", function () {
    adjustGlossInrHeight();
  });

  // Event delegation for dynamic elements
  $(document).on("click", ".glossBtn", function () {
    $(this)
      .parents(".glossItems")
      .toggleClass("cntToggle")
      .siblings()
      .removeClass("cntToggle");
      $(this).parents('.catItems').slideUp();
  });

  // Auto-submit on search input change & adjust height
  $(document).on("input", ".glossSearch input[type='search']", function () {
    submitForm();
  });

  // Auto-submit on radio button selection & adjust height
  $(document).on("change", ".glossCat input[type='radio']", function () {
    submitForm();
    $(this).parent().addClass("active").siblings().removeClass("active");
    $(this).parents('.catItems').slideUp();
  });
  $(document).on("click", ".mobileIcon", function () {
    $(this).toggleClass('active');
    $(this).next('.catItems').slideToggle();
  });

});
