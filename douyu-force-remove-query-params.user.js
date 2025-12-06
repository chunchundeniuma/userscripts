// ==UserScript==
// @name         douyu-force-remove-query-params
// @namespace    https://github.com/chunchundeniuma/userscripts
// @version      1.1.1
// @description  劫持 history 方法 & popstate，把 URL 里的 ?query 全部剥掉
// @author
// @match        *://*.douyu.com/*
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    /**
     * 将给定的 URL（可能是相对，也可能是绝对）中的 search（?…）清空，
     * 并返回完整的绝对 URL 字符串。
     */
    function stripQuery(u) {
        try {
            // new URL 对相对路径也能正确处理
            const o = new URL(u, window.location.href);
            if (!o.search) {
                return null;    // 本来就没 search，则不必替换
            }
            o.search = '';
            return o.toString();
        } catch (e) {
            return null;
        }
    }

    // 劫持 pushState/replaceState
// —————————————————————————————————————————————————————————————————————————————————————————————
    const rawPush = history.pushState;
    history.pushState = function (state, title, url) {
        const s = stripQuery(url);
        // 如果 stripQuery 有返回（说明原来带 ?search），就把 arguments[2] 换掉
        if (s) arguments[2] = s;
        return rawPush.apply(this, arguments);
    };

    const rawReplace = history.replaceState;
    history.replaceState = function (state, title, url) {
        const s = stripQuery(url);
        if (s) arguments[2] = s;
        return rawReplace.apply(this, arguments);
    };

    // 监听浏览器后退/前进
// —————————————————————————————————————————————————————————————————————————————————————————————
    /*
    window.addEventListener('popstate', () => {
        if (location.search) {
            history.replaceState(null, '', location.pathname + location.hash);
        }
    });
    */
    // 首次加载时去掉原 URL 自带的 search
// —————————————————————————————————————————————————————————————————————————————————————————————
    // document-start 阶段，如果已有 ?…，立刻清除一次
    {
        const stripped = stripQuery(window.location.href);
        if (stripped) {
            history.replaceState(null, '', stripped);
        }
    }
})();
