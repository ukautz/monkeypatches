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

    var $ = jQuery;

    // bind all incident items to open new tab on ctrl+click or middle mouse button
    function bindItemsToMMB() {
        var items = $('.ops-alert-list-item');
        if (items.length === 0) return;

        var found = 0;
        items.not('.x-mmb-monkeypatch-applied').each(function() {
            if ($(this).hasClass('x-mmb-monkeypatch-applied')) {
                console.log("Bad apple");
                return;
            }
            found++;
            $(this).addClass('x-mmb-monkeypatch-applied');
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
        if (found) console.log("Applied MMB patch to", found, "items");
    }

    // tech so far solid, intercom button just annoys
    function clearIntercom() {
        $('#intercom-container-body,#intercom-container').remove();
    }

    console.log("Loading MMB patch");
    setInterval(bindItemsToMMB, 1000);
    setInterval(clearIntercom, 1000);

    // Your code here...
})();