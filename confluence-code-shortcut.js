// ==UserScript==
// @name         Extend Confluence with shortcut for monospace
// @version      0.1
// @description  Fix the UI fail of not providing shortcut for monospace (no dev using confluence, right?) - or at least configurable shortcuts
// @author       Me
// @namespace    http://tampermonkey.net/
// @ match        *://*/pages/editpage.action*
// @ match        *://*/pages/createpage.action*
// @ match        *://*/pages/resumedraft.action*
// @include      /^https?://confluence/
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var iv = null;
    iv = setInterval(function() {
        if (tinyMCE && tinyMCE.activeEditor) {
            console.log("Adding monospace shortcut: ctrl+alt+m");
            tinyMCE.activeEditor.addShortcut("ctrl+alt+m","monospace","confMonospace");
            clearInterval(iv);
        }
    }, 500);
})();