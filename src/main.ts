import './style.scss'

const element: HTMLDivElement | null = document.querySelector('#app');

const template = `
  <nav>
    <span>Список доступных страниц</span>
    <ul>
      <li><a href="./src/pages/Auth/Authorization/Authorization.html">Авторизация</a></li>
      <li><a href="./src/pages/Chat/Chat.html">Чат</a></li>
      <li><a href="./src/pages/Error/500/500.html">Ошибка 500</a></li>
      <li><a href="./src/pages/Error/404/404.html">Ошибка 404</a></li>
      <li><a href="./src/pages/Auth/Registrations/Registrations.html">Регистрация</a></li>
      <li><a href="./src/pages/UserSettings/UserSettingsStatus/UserSettingsStatus.html">Данные пользователя</a></li>
      <li><a href="./src/pages/UserSettings/UserSettingsEdit/UserSettingsEdit.html">Изменение данных пользователя</a></li>
      <li><a href="./src/pages/UserSettings/UserSettingsPasswordEdit/UserSettingsPasswordEdit.html">Изменение пароля пользователя</a></li>
    </ul>
  </nav>
`;
if (element) {
    element.innerHTML = template;
};
