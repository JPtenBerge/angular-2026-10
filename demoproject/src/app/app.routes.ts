import { Routes } from '@angular/router';
import { DumpPage } from './pages/dump/dump.page';
import { FrameworkPage } from './pages/framework/framework.page';
import { ReactivePage } from './pages/reactive/reactive.page';
import { ChangeDetectionPage } from './pages/change-detection/change-detection.page';

export const routes: Routes = [
	{ path: 'frameworks', component: FrameworkPage },
	{ path: 'dump', component: DumpPage },
	{ path: 'reactivity', component: ReactivePage },
	{ path: 'change-detection', component: ChangeDetectionPage },
	// { path: '**', component: FancyNotFoundPage },
	{ path: '', redirectTo: '/frameworks', pathMatch: 'full' },
];
