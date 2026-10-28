import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Autocompleter } from '../../components/autocompleter/autocompleter';
import { LifeComponent } from '../../components/life/life.component';
import { FrameworkDal } from '../../dal/framework.dal';
import { Framework } from '../../entities/framework';

@Component({
	imports: [ReactiveFormsModule, FormsModule, LifeComponent, Autocompleter],
	selector: 'app-dump',
	templateUrl: './dump.page.html',
})
export class DumpPage {
	private readonly frameworkDal = inject(FrameworkDal);

	naam = 'JP';
	naamSignal = signal('JP');
	showLife = false;

	frameworks = signal<Framework[] | null>(null);

	ngOnInit() {
		this.frameworkDal.getAll().then(contacts => this.frameworks.set(contacts));
	}

	changeName() {
		setTimeout(() => {
			this.naamSignal.update(currentValue => `${currentValue} Marnix`);
			this.naam += ' Marnix';
		}, 1000);
	}

	handleSelect(framework: Framework) {
		console.log('hey er is iets geselecteerd in de autocompleter', framework);
	}
}
