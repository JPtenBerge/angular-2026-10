import { JsonPipe } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { NavigateService } from '../../services/navigate.service';

@Component({
	selector: 'app-autocompleter',
	templateUrl: './autocompleter.html',
	imports: [JsonPipe],
})
export class Autocompleter<T extends {}> {
	data = input.required<T[]>();
	select = output<T>();

	query = signal('');
	suggestions: T[] | null = null;
	activeSuggestionIndex: number | null = null;

	navigateService = inject(NavigateService);

	autocomplete() {
		if (!this.query()) return;

		this.suggestions = [];

		for (let item of this.data()) {
			let keys = Object.keys(item) as (keyof T)[];

			for (let prop of keys.filter(x => typeof item[x] === 'string')) {
				let value = item[prop] as string;
				if (value.includes(this.query())) {
					this.suggestions.push(item);
					break;
				}
			}
		}
	}

	next() {
		if (!this.suggestions) return;
		this.activeSuggestionIndex = this.navigateService.next(this.suggestions, this.activeSuggestionIndex);
	}

	enter() {
		if (!this.suggestions || this.activeSuggestionIndex === null) return;

		let activeSuggestion = this.suggestions[this.activeSuggestionIndex];
		this.select.emit(activeSuggestion);
	}
}
