import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField, max, min, pattern, required } from '@angular/forms/signals';
import { ValidationMessage } from '../../components/validation-message/validation-message';
import { FrameworkDal } from '../../dal/framework.dal';
import { Framework } from '../../entities/framework';
import { createFramework } from '../../factories/framework.factory';

@Component({
	imports: [ReactiveFormsModule, FormsModule, JsonPipe, UpperCasePipe, FormField, ValidationMessage],
	selector: 'app-framework',
	templateUrl: './framework.page.html',
})
export class FrameworkPage {
	private readonly frameworkDal = inject(FrameworkDal);

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
}
