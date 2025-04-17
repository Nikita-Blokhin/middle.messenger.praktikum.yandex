import router, { Routes } from './core/router';
import LoginPage from './pages/Auth/Authorization/Authorization.ts';
import SignUpPage from './pages/Auth/Registrations/Registrations.ts';
import ProfilePage from './pages/UserSettings/UserSettingsStatus/UserSettingsStatus.ts';
import ChatsPage from './pages/Chat/Chat.ts';
import AuthController from './controller/AuthController.ts';
import NotFoundPage from './pages/Error/404/404.ts';
import ErrorPage from './pages/Error/500/500.ts';

router
    .use(Routes.Index, LoginPage)
    .use(Routes.Register, SignUpPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Messenger, ChatsPage)
    .use(Routes.Error404, NotFoundPage)
    .use(Routes.Error500, ErrorPage)
    .start();

async function initApp() {
    try {
        const flag = await AuthController.fetchUser();
        if (flag !== null) {
            const currentPath = window.location.pathname;
            if (currentPath === Routes.Index || currentPath === Routes.Register) {
                router.go(Routes.Messenger);
            };
        }
    } catch (e) {
        const currentPath = window.location.pathname;
        if (currentPath !== Routes.Index && currentPath !== Routes.Register) {
            router.go(Routes.Index);
        };
    } finally {
        router.start();
    };
};

document.addEventListener('DOMContentLoaded', initApp);
