import { Component, computed, input } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ValidationField } from './validation-field';

const DEFAULT_MESSAGES: Record<string, string> = {
	required: 'Invullen graag',
	pattern: 'Ongeldige invoer',
	email: 'Vul een geldig e-mailadres in',
	minLength: 'De invoer is te kort',
	maxLength: 'De invoer is te lang',
	min: 'De waarde is te laag',
	max: 'De waarde is te hoog',
};

@Component({
	selector: 'app-validation-message',
	templateUrl: './validation-message.html',
})
export class ValidationMessage {
	readonly field = input.required<() => ValidationField>();

	readonly customMessages = input<Record<string, string>>({});

	readonly messages = computed(() => {
		const field = this.field()();
		if (!field.touched()) return [];

		// eventueel kun je ook nog kiezen om maar 1 melding tegelijkertijd terug te geven ipv alles
		return field.errors().map(error => this.customMessages()[error.kind] ?? DEFAULT_MESSAGES[error.kind] ?? 'Ongeldige invoer');
	});
}
