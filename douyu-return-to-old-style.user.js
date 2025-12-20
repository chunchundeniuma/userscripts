// ==UserScript==
// @name         douyu-return-to-old-style
// @namespace    https://www.github.com/chunchundeniuma/userscripts
// @match        *://*.douyu.com/*
// @grant        none
// @version      1.2.0
// @author       chunchundeniuma
// @description  返回旧版 web 页面
// @run-at       document-start
// @grant        window.onurlchange
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/chunchundeniuma/userscripts/refs/heads/master/douyu-return-to-old-style.user.js
// @supportURL   https://www.github.com/chunchundeniuma/userscripts/issues
// ==/UserScript==

(function () {
    "use strict";

    function ReturnToOldStyle() {
        window.localStorage.setItem("newWebLive", "A");
        if (window.location.href.match("/beta/")) {
            let currUrl = window.location.href;
            let oldstyleUrl = currUrl.replace("/beta", "");
            window.location.href = oldstyleUrl;
        }
    }
})();
