import { Routes } from '@angular/router';
import { DumpPage } from './pages/dump/dump.page';
import { FrameworkPage } from './pages/framework/framework.page';

export const routes: Routes = [
	{ path: 'frameworks', component: FrameworkPage },
	{ path: 'dump', component: DumpPage },
	// { path: '**', component: FancyNotFoundPage },
	{ path: '', redirectTo: '/frameworks', pathMatch: 'full' },
];
