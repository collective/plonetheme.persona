/* This is a bundle that uses RequireJS to pull in dependencies.
   These dependencies are defined in the registry.xml file */


/* do not include jquery multiple times */
if(window.jQuery){
  define('jquery', [], function(){
    return window.jQuery;
  });
}

require([
  'jquery',
  'pat-registry',
  'logging',
  'mockup-patterns-livesearch'
], function($, registry, logging){
  'use strict';

  var logger = logging.getLogger('persona-main');

  var sidebar = new function() {

    this.fix = function () {
      var winHeight = $(window).height();
      if($('#left_sidebar_content_area').height()<winHeight || $('#main-content-area').height()<winHeight) {
        $('#left_sidebar_content_area, #main-content-area').css({'min-height':winHeight});
      }

      if($('#left_sidebar_content_area').height()>=$('#main-content-area').height()){
        var SelectHeight = $('#left_sidebar_content_area').height();
        SelectHeight += "px";
        $('#left_sidebar_content_area, #main-content-area').css({'min-height':SelectHeight});
      }
      else
      {
        var SelectHeight = $('#main-content-area').height();
        SelectHeight += "px";
        $('#left_sidebar_content_area, #main-content-area').css({'min-height':SelectHeight});
      }
    };

    this.open = function () {
      // Go to the top of the window.
      $('html,body').scrollTop(0);

      $('#expand_content_menu').addClass('open');
      $('#expand_content_menu span').removeClass('persona-menu');
      $('#expand_content_menu span').addClass('persona-cancel');
      $('#left_sidebar_content_area').animate({'margin-left':"0px"},100);

      var expandAreaWide = $('#left_sidebar_content_area').width();
      $('#main-content-area').fadeIn(200);
      $('#main-content-area').animate({"margin-right":'-'+expandAreaWide+'px'},100);

      this.setOpenButtonLeft();

      // Remember the state of the sidebar.
      window.localStorage.setItem('sidebarState', 'open');
    };

    this.close = function () {
      $('#expand_content_menu').removeClass('open');
      $('#expand_content_menu span').addClass('persona-menu');
      $('#expand_content_menu span').removeClass('persona-cancel');
      // $('#main-content-area').fadeOut(200);
      $('#left_sidebar_content_area').animate({"margin-left":"-100%"},500);
      $('#main-content-area').animate({"margin-right":'0px'},500);

      this.setOpenButtonLeft();

      // Remember the state of the sidebar.
      window.localStorage.setItem('sidebarState', 'closed');
    };

    this.setOpenButtonLeft = function () {
      if($('#expand_content_menu').hasClass('open')) {
        if($(window).width()>=768){
          var left = 290;
          left += $('#edit-zone').width();
          $('#expand_content_menu').animate({left:left},100);
          $('#searchbox-wrapper').animate({left:left},100);
        }
      }
      else
      {
        if($(window).width()>=768){
          var left = 10;
          left += $('#edit-zone').width();
          $('#expand_content_menu').animate({left:left},100);
          $('#searchbox-wrapper').animate({left:left},100);
        }
      }
    };
  };

  // initialize only if we are in top frame
  if (window.parent === window) {
    $(window).resize(function(){
      sidebar.fix();
    });

    $(window).scroll(function(){
      sidebar.fix();
    });

    $(document).ready(function() {
      $('body').addClass('pat-plone');
      if (!registry.initialized) {
        registry.init();
      }

      $('body').addClass('persona-main');

      sidebar.fix();
      sidebar.setOpenButtonLeft();

      // Reopen the sidebar if it was open last time.
      if (window.localStorage.getItem('sidebarState') == 'open') {
        sidebar.open();
      }

      $('#expand_content_menu').click(function(){
        var expandAreaWide = $('#left_sidebar_content_area').width();
        if(!$('#expand_content_menu').hasClass('open'))
        {
          sidebar.open();
        }
        else{
          sidebar.close();
        }
      });
    })
;  };
});
