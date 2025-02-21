$(document).ready(function () {
  $(".title").click(function () {
    var $parent = $(this).closest(".items");
    var $content = $parent.find(".content");
    var $pd = $parent.find(".pd");

    // Check if the clicked item is already active
    var isActive = $(this).hasClass("active");

    // Remove 'active' class from all titles, content, and 'accActive' from .pd
    $(".items .title").removeClass("active");
    $(".items .content").slideUp().removeClass("active");
    $(".items .pd").removeClass("accActive");

    // If it wasn't active before, activate it
    if (!isActive) {
      $(this).addClass("active");
      $content.slideDown().addClass("active");
      $pd.addClass("accActive");
    }
  });
});

