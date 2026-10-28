import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField, max, min, pattern, required } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { ValidationMessage } from './components/validation-message/validation-message';
import { Framework } from './entities/framework';
import { createFramework } from './factories/framework.factory';
import { EuroPipe } from './pipes/euro.pipe';
import { LifeComponent } from './components/life/life.component';
import { Autocompleter } from './components/autocompleter/autocompleter';
import { HttpClient, httpResource } from '@angular/common/http';

@Component({
	imports: [
		RouterOutlet,
		ReactiveFormsModule,
		FormsModule,
		JsonPipe,
		UpperCasePipe,
		LowerCasePipe,
		DatePipe,
		CurrencyPipe,
		EuroPipe,
		FormField,
		ValidationMessage,
		LifeComponent,
		Autocompleter,
	],
	selector: 'app-root',
	styleUrl: './app.css',
	templateUrl: './app.html',
})
export class App {
	naam = 'JP';
	naamSignal = signal('JP');
	showLife = false;

	http = inject(HttpClient);

	newFramework = createFramework();
	// frameworks: Framework[];

	frameworks = httpResource<Framework[]>(() => `http://localhost:3000/frameworks`);

	addFrameworkForm = new FormGroup({
		name: new FormControl<string>('', {
			validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
			nonNullable: true,
		}),
		rating: new FormControl<number>(0, {
			validators: [Validators.required, Validators.min(1), Validators.max(10)],
			nonNullable: true,
		}),
		logoUrl: new FormControl<string>('', { nonNullable: true }),
	});

	addFrameworkValue = signal(createFramework());
	addFrameworkDef = form(this.addFrameworkValue, p => {
		required(p.name);
		pattern(p.name, /^[a-zA-Z0-9]*$/);
		required(p.rating);
		min(p.rating, 1);
		max(p.rating, 10);
	});

	changeName() {
		setTimeout(() => {
			this.naamSignal.update(currentValue => `${currentValue} Marnix`);
			this.naam += ' Marnix';
		}, 1000);
	}

	addFrameworkReactive() {
		let fullFramework: Framework = {
			id: 4,
			...this.addFrameworkForm.getRawValue(),
		};
		// this.frameworks.push(fullFramework);
		this.addFrameworkForm.reset();
	}

	addFrameworkTemplate(form: NgForm) {
		// newFramework clonen
		// let clone = JSON.parse(JSON.stringify(this.newFramework)); // voor simpele objecten (wat door JSON ondersteund wordt, geen bigints/functies/DOM-objecten)
		// let clone2 = { ...this.newFramework }; // voor simpele objecten / shallow copy
		let besteClone = structuredClone(this.newFramework);

		// this.frameworks.push(besteClone);
		form.reset();
	}

	addFrameworkSignal() {
		let fullFramework: Framework = {
			// id: 4,
			...this.addFrameworkValue(),
		};

		this.http.post('http://localhost:3000/frameworks', fullFramework).subscribe();

		// this.frameworks.push(fullFramework);
		this.addFrameworkValue.set(createFramework());
		this.addFrameworkDef().reset();
	}

	handleSelect(framework: Framework) {
		console.log('hey er is iets geselecteerd in de autocompleter', framework);
	}
}
