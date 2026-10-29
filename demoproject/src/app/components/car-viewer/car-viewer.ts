import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, input, OnInit } from '@angular/core';

@Component({
	selector: 'app-car-viewer',
	templateUrl: './car-viewer.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarViewer implements OnInit, DoCheck {
	cdr = inject(ChangeDetectorRef);
	cars = input.required<{ make: string; model: string }[]>();

	ngOnInit() {
		this.cars()[0].make += 'q';
	}

	ngDoCheck() {
		if (this.cars().length % 5 === 0) {
			this.cdr.markForCheck();
		}
		console.log('checking!');
	}

	getDisplayValue(car: { make: string; model: string }) {
		// car.make += 'p';
		return `display value ${car.make} ${car.model}`;
	}

	// ngOnInit() {
	// 	setInterval(() => {
	// 		this.cdr.markForCheck();
	// 	}, 5000)
	// }
}
