$('.cmMegaMenu .mb_childArrow').each(function() {
    $(this).click(function() {
        $(this).toggleClass('cmActive');
        $(this).siblings('.megaWrap').slideToggle();
    });
});