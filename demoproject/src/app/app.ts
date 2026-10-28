import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField, max, min, pattern, required } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { Autocompleter } from './components/autocompleter/autocompleter';
import { LifeComponent } from './components/life/life.component';
import { ValidationMessage } from './components/validation-message/validation-message';
import { FrameworkDal } from './dal/framework.dal';
import { Framework } from './entities/framework';
import { createFramework } from './factories/framework.factory';

@Component({
	imports: [
		RouterOutlet,
		ReactiveFormsModule,
		FormsModule,
		JsonPipe,
		UpperCasePipe,
		FormField,
		ValidationMessage,
		LifeComponent,
		Autocompleter,
	],
	selector: 'app-root',
	styleUrl: './app.css',
	templateUrl: './app.html',
})
export class App implements OnInit {
	private readonly frameworkDal = inject(FrameworkDal);

	naam = 'JP';
	naamSignal = signal('JP');
	showLife = false;

	newFramework = createFramework();
	frameworks = signal<Framework[] | null>(null);

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

	ngOnInit() {
		this.frameworkDal.getAll().then(contacts => this.frameworks.set(contacts));
	}

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
		this.frameworkDal.create(fullFramework);
		this.addFrameworkForm.reset();
	}

	addFrameworkTemplate(form: NgForm) {
		let fullFramework = structuredClone(this.newFramework);
		this.frameworkDal.create(fullFramework);
		form.reset();
	}

	addFrameworkSignal() {
		this.frameworkDal.create(this.addFrameworkValue());
		this.addFrameworkValue.set(createFramework());
		this.addFrameworkDef().reset();
	}

	handleSelect(framework: Framework) {
		console.log('hey er is iets geselecteerd in de autocompleter', framework);
	}
}
