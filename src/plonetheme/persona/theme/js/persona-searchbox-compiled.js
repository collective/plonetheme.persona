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
], function($){
  'use strict';

  // initialize only if we are in top frame
  if (window.parent === window) {

    $(document).ready(function() {
        var button = $('.searchButton')
        var gadget = $('#searchGadget')
        gadget.addClass('hiddenStructure');

        button.click(function(event) {
            if(gadget.hasClass('hiddenStructure')) {
                gadget.removeClass('hiddenStructure');
            } else {
                gadget.addClass('hiddenStructure');
            }

            event.preventDefault();
        });
    });
  };
});
define("/home/pcdummy/Projekte/Plone/rene.jochums.at-plone5/src/plonetheme.persona/src/plonetheme/persona/theme/js/searchbox.js", function(){});

