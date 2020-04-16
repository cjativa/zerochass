// shared/routes.js
import { HomeContainer } from '../src/views/landing/homeContainer';
import { TutorialList } from '../src/views/tutorialsList/tutorialList';
import { About } from '../src/views/singles/about';
import { Contact } from '../src/views/singles/contact';
import { TutorialContainer } from '../src/containers/tutorialContainer';


import * as TutorialService from '../server/api/services/tutorialService';
import * as SingleService from '../server/api/services/singleService';


interface Routes { path: string, exact: boolean, component: any, fetchInitialData?: any };

export const routes: Routes[] = [
    {
        path: '/',
        exact: true,
        component: HomeContainer,
        fetchInitialData: async () => {
            const tutorials = await TutorialService.getTutorials();
            return { tutorials };
        }
    },
    {
        path: '/tutorials',
        exact: true,
        component: TutorialList,
        fetchInitialData: async () => {
            const tutorials = await TutorialService.getTutorials();
            return { tutorials };
        }
    },
    {
        path: '/tutorial/:slug',
        exact: false,
        component: TutorialContainer,
        fetchInitialData: async (path = '') => {
            const slug = path.split('/').pop();
            const tutorial = await TutorialService.getTutorial(slug);
            return { tutorial };
        }
    },
    {
        path: '/about',
        exact: true,
        component: About,
        fetchInitialData: async () => {
            const about = await SingleService.getSingleContent('about')
            return { about };
        }
    },
    {
        path: '/contact',
        exact: true,
        component: Contact,
        fetchInitialData: async () => {
            const contact = await SingleService.getSingleContent('contact')
            return { contact };
        }
    }

];