import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		// { provide: NavigateService, useClass: NavigateServiceMock },
		// NavigateService,

    // optimaliseren  bundle .js
	],
};
