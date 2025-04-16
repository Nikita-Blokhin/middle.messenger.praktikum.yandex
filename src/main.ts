// import Router from './utils/Route';
// // @ts-ignore
// import SignInPage from './pages/Auth/Authorization/Authorization.html';
// // @ts-ignore
// import SignUpPage from './pages/Auth/Registrations/Registrations.html';
// // @ts-ignore
// import ProfilePage from './pages/UserSettings/UserSettingsStatus/UserSettingsStatus.html';
// // @ts-ignore
// import MessengerPage from './pages/Chat/Chat.html';
// // @ts-ignore
// import NotFoundPage from './pages/Error/404/404.html';
// // @ts-ignore
// import ErrorPage from './pages/Error/500/500.html';
// import './style.scss';

// // const element: HTMLDivElement | null = document.querySelector('#app');

// // const template = `
// //   <nav>
// //     <span>Список доступных страниц</span>
// //     <ul>
// //       <li><a href='./src/pages/Auth/Authorization/Authorization.html'>Авторизация</a></li>
// //       <li><a href='./src/pages/Chat/Chat.html'>Чат</a></li>
// //       <li><a href='./src/pages/Error/500/500.html'>Ошибка 500</a></li>
// //       <li><a href='./src/pages/Error/404/404.html'>Ошибка 404</a></li>
// //       <li><a href='./src/pages/Auth/Registrations/Registrations.html'>Регистрация</a></li>
// //       <li><a href='./src/pages/UserSettings/UserSettingsStatus/UserSettingsStatus.html'>Данные пользователя</a></li>
// //       <li><a href='./src/pages/UserSettings/UserSettingsEdit/UserSettingsEdit.html'>Изменение данных пользователя</a></li>
// //       <li><a href='./src/pages/UserSettings/UserSettingsPasswordEdit/UserSettingsPasswordEdit.html'>Изменение пароля пользователя</a></li>
// //     </ul>
// //   </nav>
// // `;
// // if (element) {
// //     element.innerHTML = template;
// // };


// function initApp() {
//     console.log('Инициализация приложения с роутером...');

//     const appElement = document.querySelector('#app');
//     if (!appElement) {
//         console.error('Корневой элемент #app не найден');
//         return;
//     }

//     appElement.innerHTML = `
//         <div class='loading'>
//         <div>
//             <h2>Загрузка приложения...</h2>
//             <p>Пожалуйста, подождите</p>
//         </div>
//         </div>
//     `;

//     try {
//         const router = new Router('#app');

//         router
//             .use('/', SignInPage)
//             .use('/sign-up', SignUpPage)
//             .use('/settings', ProfilePage)
//             .use('/messenger', MessengerPage)
//             .use('/404', NotFoundPage)
//             .use('/500', ErrorPage)
//             .use('*', NotFoundPage)
//             .start();

//         router.setProtectedRoutes(true, '/');

//         router.start();

//         console.log('Роутер успешно инициализирован');
//     } catch (error) {
//         console.error('Ошибка при инициализации роутера:', error);

//         appElement.innerHTML = `
//         <div style='padding: 20px; text-align: center;'>
//             <h1>Произошла ошибка</h1>
//             <p>Не удалось загрузить приложение. Пожалуйста, обновите страницу.</p>
//             <p>Подробности: ${error instanceof Error ? error.message : String(error)}</p>
//         </div>
//         `;
//     };
// }

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM загружен');

//     try {
//         initApp();
//     } catch (error) {
//         console.error('Ошибка при инициализации приложения:', error);

//         const appElement = document.getElementById('app');
//         if (appElement) {
//             appElement.innerHTML = `
//                 <div style='padding: 20px; text-align: center;'>
//                     <h1>Произошла ошибка</h1>
//                     <p>Не удалось загрузить приложение. Пожалуйста, обновите страницу.</p>
//                     <p>Подробности: ${error instanceof Error ? error.message : String(error)}</p>
//                 </div>
//             `;
//         }
//     }
// });


import router from './core/router';
import LoginPage from './pages/Auth/Authorization/Authorization.ts';
import SignUpPage from './pages/Auth/Registrations/Registrations.ts';
// import SettingsPage from './pages/settings';
// import MessengerPage from './pages/messenger';
import AuthController from './controller/AuthController.ts';

// Инициализация роутера
router
    .use('/', LoginPage)
    .use('/signup', SignUpPage)
    // .use('/settings', ProfilePage)
    // .use('/messenger', MessengerPage)
    // .use('/404', NotFoundPage)
    // .use('/500', ErrorPage)
    // .use('*', NotFoundPage)
    .start();

// Проверка авторизации перед запуском приложения
async function initApp() {
    try {
    // Проверяем, авторизован ли пользователь
        await AuthController.fetchUser();

        // Если пользователь авторизован и находится на странице логина или регистрации,
        // перенаправляем его на страницу чатов
        const currentPath = window.location.pathname;
        if (currentPath === '/' || currentPath === '/signup') {
            router.go('/messenger');
        }
    } catch (e) {
    // Если пользователь не авторизован и находится не на странице логина или регистрации,
    // перенаправляем его на страницу логина
        const currentPath = window.location.pathname;
        if (currentPath !== '/' && currentPath !== '/signup') {
            router.go('/');
        }
    } finally {
    // Запускаем роутер
        router.start();
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', initApp);