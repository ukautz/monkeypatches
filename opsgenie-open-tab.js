// ==UserScript==
// @name         OpsGenie Open incident in new tab
// @version      0.1
// @description  Revert the UI fail of using JS instead of native A tags, which disables ctrl+click and midle mouse button to open new tabs
// @author       Me
// @match        https://*.app.opsgenie.com/alert*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("OpsGenie improvements online");

    var $ = jQuery;

    // bind all incident items to open new tab on ctrl+click or middle mouse button
    function bindItemsToMMB() {
        var items = $('.og-alert-item');
        if (items.length === 0) return;

        var found = 0;
        items.not('.x-mmb-monkeypatch-applied').each(function() {
            if ($(this).hasClass('x-mmb-monkeypatch-applied')) {
                console.log("OpsGenie improvements: Bad apple");
                return;
            }
            found++;
            $(this).addClass('x-mmb-monkeypatch-applied');
            $(this).on('mousedown', function(ev) {
                if ((ev.ctrlKey && ev.button === 0) || ev.button == 1) {
                    window.open($(this).attr('href'));

                }
            });
        });
        if (found) console.log("OpsGenie improvements: Applied MMB patch to", found, "items");
    }

    // tech so far solid, intercom button just annoys
    function clearIntercom() {
        $('.intercom-app').remove();
    }

    function run() {
        clearIntercom();
        bindItemsToMMB();
    }

    console.log("Loading MMB patch");
    setInterval(run, 1000);

    // Your code here...
})();
