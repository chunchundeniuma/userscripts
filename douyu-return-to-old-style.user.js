// ==UserScript==
// @name         douyu-return-to-old-style
// @namespace    https://www.github.com/chunchundeniuma/userscripts
// @match        *://*.douyu.com/*
// @grant        none
// @version      1.2.1
// @author       chunchundeniuma
// @description  返回旧版 web 页面
// @run-at       document-start
// @grant        window.onurlchange
// @license      MIT
// @downloadURL  https://raw.githubusercontent.com/chunchundeniuma/userscripts/refs/heads/master/douyu-return-to-old-style.user.js
// @supportURL   https://www.github.com/chunchundeniuma/userscripts/issues
// ==/UserScript==


//2025/12/22 add: douyu 移除了旧版 url，以前的 beta 版网页替代了旧版网页，此脚本已失效。
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
