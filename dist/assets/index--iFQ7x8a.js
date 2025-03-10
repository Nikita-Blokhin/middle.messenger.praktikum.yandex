(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();document.querySelector("#app").innerHTML=`
  <div>
    <ul> Список доступных страниц </ul>
    <li><a href="./src/pages/Auth/Authorization/Authorization.html">Авторизация</a></li>
    <li><a href="./src/pages/Chat/Chat.html">Чат</a></li>
    <li><a href="./src/pages/Error/500/500.html">Ошибка 500</a></li>
    <li><a href="./src/pages/Error/404/404.html">Ошибка 404</a></li>
    <li><a href="./src/pages/Auth/Registrations/Registrations.html">Регистрация</a></li>
    <li><a href="./src/pages/UserSettings/UserSettingsStatus/UserSettingsStatus.html">Данные пользователя</a></li>
    <li><a href="./src/pages/UserSettings/UserSettingsEdit/UserSettingsEdit.html">Изменение данных пользователя</a></li>
    <li><a href="./src/pages/UserSettings/UserSettingsPasswordEdit/UserSettingsPasswordEdit.html">Изменение пароля пользователя</a></li>
    </div>
`;
