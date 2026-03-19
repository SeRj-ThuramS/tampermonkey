// ==UserScript==
// @name         Shikimori watch video from Kodik
// @version      2.1
// @description  Player Window
// @author       Arthur Zarembo
// @match        https://shikimori.me/*
// @match        https://shikimori.one/*
// @match        https://shikimori.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @updateURL    https://raw.githubusercontent.com/SeRj-ThuramS/tampermonkey/refs/heads/master/shikimori_watch_video_from_Kodik/index.js
// @downloadURL  https://raw.githubusercontent.com/SeRj-ThuramS/tampermonkey/refs/heads/master/shikimori_watch_video_from_Kodik/index.js
// @grant        none
// ==/UserScript==

(function() {
	'use strict';


function main() {
    if (location.href.includes("/animes/") && document.querySelector("h1")) {
        createButton();
    }
}

function createButton() {
    var url = location.href;
    var regex = /animes\/[a-z]?(\d+)/;
    var match = regex.exec(url);
    if (!match) return;

    var id = match[1];

    var block = document.querySelector(".cc.block");
    if (!block) return;

    if (document.getElementById("kodik-btn")) return;

    var btnWatch = document.createElement("div");
    var button = document.createElement("button");

    btnWatch.style.textAlign = "center";
    btnWatch.style.margin = "0px 4px 0px 3px";

    button.id = "kodik-btn";
    button.textContent = "Смотреть онлайн";
    button.style.display = "block";
    button.style.width = "100%";
    button.style.background = "#343434";
    button.style.color = "#fff";
    button.style.padding = "8px";
    button.style.fontSize = "15px";
    button.style.fontWeight = "700";
    button.style.cursor = "pointer";
    button.style.border = "none";

    button.onclick = () => openIframe(id);

    btnWatch.appendChild(button);
    block.insertBefore(btnWatch, block.firstChild.nextElementSibling);
}

function openIframe(id) {
    const iframeWidth = 1000;
    const iframeHeight = 607;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.7)";
    overlay.style.zIndex = 9999;

    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.width = `${iframeWidth}px`;
    modal.style.height = `${iframeHeight + 30}px`; // 30px под header
    modal.style.left = `calc(50% - ${iframeWidth / 2}px)`; // половина ширины
    modal.style.top = `calc(50% - ${(iframeHeight + 30) / 2}px)`; // половина высоты
    modal.style.background = "#AEAEAE";
    modal.style.overflow = "hidden";
    modal.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";

    const header = document.createElement("div");
    header.style.height = "30px";
    header.style.background = "#222";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.padding = "0 10px";
    header.style.color = "#fff";

    const title = document.createElement("span");
    title.textContent = "Плеер";

    const closeBtn = document.createElement("span");
    closeBtn.textContent = "✕";
    closeBtn.style.cursor = "pointer";
    closeBtn.onclick = () => overlay.remove();

    header.appendChild(title);
    header.appendChild(closeBtn);

    const iframe = document.createElement("iframe");
    iframe.src = `https://kodik.ydns.eu/?shikimoriID=${id}&width=${iframeWidth}&height=${iframeHeight}&noEmbed`;
    iframe.width = `${iframeWidth}px`;
    iframe.height = `${iframeHeight}px`;
    iframe.frameborder = 0;
    iframe.style.width = `${iframeWidth}px`;
    iframe.style.height = `${iframeHeight}px`;
    iframe.style.border = "none";
    iframe.setAttribute("allow", "autoplay *; fullscreen *");
    iframe.setAttribute("allowfullscreen", "");

    modal.appendChild(header);
    modal.appendChild(iframe);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}

function ready(fn) {
    document.addEventListener('page:load', fn);
    document.addEventListener('turbolinks:load', fn);

    if (document.readyState !== "loading") fn();
    else document.addEventListener('DOMContentLoaded', fn);
}

ready(main);

})();
