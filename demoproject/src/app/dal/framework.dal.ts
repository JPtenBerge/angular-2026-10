import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Framework } from '../entities/framework';

@Service()
export class FrameworkDal {
	private readonly http = inject(HttpClient);

	async getAll(): Promise<Framework[]> {
		return firstValueFrom(this.http.get<Framework[]>('http://localhost:3000/frameworks'));
	}

	async create(newFramework: Omit<Framework, 'id'>): Promise<Framework> {
		return firstValueFrom(this.http.post<Framework>('http://localhost:3000/frameworks', newFramework));
	}
}
