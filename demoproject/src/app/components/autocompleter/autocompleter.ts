import { JsonPipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

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

	autocomplete() {
		if (!this.query()) return;

		this.suggestions = [];

		for (let item of this.data()) {
			let keys = Object.keys(item) as (keyof T)[];

			for (let prop of keys) {
				if (typeof item[prop] !== 'string') continue;

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

		this.activeSuggestionIndex ??= -1;
		this.activeSuggestionIndex = (this.activeSuggestionIndex + 1) % this.suggestions.length;
	}

	enter() {
		if (!this.suggestions || this.activeSuggestionIndex === null) return;
		
		let activeSuggestion = this.suggestions[this.activeSuggestionIndex];
		this.select.emit(activeSuggestion);
	}
}
