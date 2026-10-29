import { inject, Service, signal } from '@angular/core';
import { FrameworkDal } from '../dal/framework.dal';
import { Framework } from '../entities/framework';

@Service()
export class FrameworkStore {
	private readonly frameworkDal = inject(FrameworkDal);
	private readonly frameworksWritable = signal<Framework[]>([]);
	frameworks = this.frameworksWritable.asReadonly();

	constructor() {
		this.frameworkDal.getAll().then(frameworks => this.frameworksWritable.set(frameworks));
	}

	add(framework: Framework) {
		this.frameworkDal
			.create(framework)
			.then(updatedFramework => this.frameworksWritable.update(frameworks => [...frameworks, updatedFramework]));
	}
}
