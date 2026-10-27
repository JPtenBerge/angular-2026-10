import { Signal } from '@angular/core';

export interface ValidationField {
	touched: Signal<boolean>;
	errors: Signal<readonly { kind: string; message?: string }[]>;
}
