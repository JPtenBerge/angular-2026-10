import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarViewer } from '../../components/car-viewer/car-viewer';

@Component({
	imports: [CarViewer],
	templateUrl: './change-detection.page.html',
	changeDetection: ChangeDetectionStrategy.Eager,
})
export class ChangeDetectionPage {
	cars = [
		{ make: 'Cupra', model: 'Born' },
		{ make: 'Peugeot', model: 'e208' },
		{ make: 'Fiat', model: '500' },
	];

	addCar() {
		// this.cars = [...this.cars, { make: 'Tesla', model: 'Model Y'}]
		this.cars.push({ make: 'Tesla', model: 'Model 3'});
	}
}
