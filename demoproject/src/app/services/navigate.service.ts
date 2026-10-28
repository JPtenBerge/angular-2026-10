import { Injectable, Service } from '@angular/core';

// @Injectable({ providedIn: 'root'})

@Service() // === @Injectable({ providedIn: 'root'})
export class NavigateService {
	next<T extends {}>(data: T[], index: number | null) {
        console.log('next vanuit navservice');
		index ??= -1;
		return (index + 1) % data.length;
	}
}
