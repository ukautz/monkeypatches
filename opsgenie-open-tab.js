// ==UserScript==
// @name         OpsGenie Open incident in new tab
// @version      0.1
// @description  Revert the UI fail of using JS instead of native A tags, which disables ctrl+click and midle mouse button to open new tabs
// @author       Me
// @match        https://app.opsgenie.com/alert/V2
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var inited = -1, $ = jQuery;

    // bind all incident items to open new tab on ctrl+click or middle mouse button
    function bindItemsToMMB() {
        var items = $('.ops-alert-list-item');
        if (items.length === 0) return;
        if (items.length === inited) return;
        if (inited == -1) console.log("Init MMB for", items.length, "items");

        inited = items.length;
        items.not('[data-with-monkeypatch]').each(function() {
            $(this).data('with-mmb-monkeypatch', true);
            $(this).on('mousedown', function(ev) {
                if (ev.ctrlKey && ev.button === 0 || ev.button == 1) {
                    var counter = $(this).find('.item-counter');
                    var id = $.trim(counter.text()).replace(/[^0-9]/, '');
                    var url = 'https://opsg.in/i/'+ id;
                    window.open(url, '_blank');
                    return false;
                }
            });
        });
    }

    // tech so far solid, intercom button just annoys
    function clearIntercom() {
        $('#intercom-container-body,#intercom-container').remove();
    }

    console.log("Loading MMB");
    setInterval(bindItemsToMMB, 500);
    setInterval(clearIntercom, 1000);

    // Your code here...
})();