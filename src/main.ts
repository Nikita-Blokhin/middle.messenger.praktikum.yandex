import router from './core/router';
import LoginPage from './pages/Auth/Authorization/Authorization.ts';
import SignUpPage from './pages/Auth/Registrations/Registrations.ts';
// import SettingsPage from './pages/settings';
// import MessengerPage from './pages/messenger';
import AuthController from './controller/AuthController.ts';

router
    .use('/', LoginPage)
    .use('/signup', SignUpPage)
    // .use('/settings', ProfilePage)
    // .use('/messenger', MessengerPage)
    // .use('/404', NotFoundPage)
    // .use('/500', ErrorPage)
    // .use('*', NotFoundPage)
    .start();

async function initApp() {
    try {
        await AuthController.fetchUser();
        const currentPath = window.location.pathname;
        if (currentPath === '/' || currentPath === '/signup') {
            router.go('/chats');
        };
    } catch (e) {
        const currentPath = window.location.pathname;
        if (currentPath !== '/' && currentPath !== '/signup') {
            router.go('/');
        };
    } finally {
        router.start();
    };
};

document.addEventListener('DOMContentLoaded', initApp);
