// Smooth 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.querySelector(this.getAttribute('href'))) {
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  });
});
// Load
window.addEventListener('load', function () {
  document.body.classList.add('window-loaded');
  //
  AOS.init({
    duration: 1000,
    once: true,
    disable: 'mobile'
  });
});
// Scroll
window.addEventListener('scroll', function () {
  const html = document.documentElement;
  const top = html.scrollTop;
  if (top > 100) {
    document.body.classList.add('page-scrolled');
  }
  else {
    document.body.classList.remove('page-scrolled');
  }
});


// Header----

$('.header .navTrigger').click(function(){
  $(this).toggleClass('cm_active');
  $('.header .rightSection').slideToggle();
});

$('.header .cmSearchBtn').click(function(){
  $('.cmSearch').toggleClass('cm_active_search');
});
$('.cmSearch .close').click(function(e){
  $('.cmSearch').removeClass('cm_active_search');
  e.stopPropagation();
});
$('.cmSearch').click(function(){
  $(this).removeClass('cm_active_search');
});
$('.cmSearchInner').click(function(event){
  event.stopPropagation();
});


