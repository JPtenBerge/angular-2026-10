import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	BehaviorSubject,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	Observable,
	ReplaySubject,
	Subject,
	Subscription,
	takeUntil,
} from 'rxjs';

@Component({
	imports: [ReactiveFormsModule],
	selector: 'app-reactive',
	templateUrl: './reactive.page.html',
})
export class ReactivePage implements OnInit {
	query = new FormControl<string>('');
	subscription!: Subscription;
	destroyRef = inject(DestroyRef);

	autocomplete() {
		console.log('autocompleting met query:', this.query.value);
	}

	// ngOnDestroy() {
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// 	this.subscription.unsubscribe();
	// }

	ngOnInit() {
		this.subscription = this.query.valueChanges
			.pipe(distinctUntilChanged(), debounceTime(300), takeUntilDestroyed(this.destroyRef))
			.subscribe(value => this.autocomplete());

		// new Observable().

		console.log('hallo oninit');

		let source = new BehaviorSubject(108);

		// 3 subjects:
		// Subject<T>
		// BehaviorSubject<T> - onthoudt de laatste
		// ReplaySubject<T> - configureerbare geschiedenis

		// source.next(4);
		// source.next(8);
		// source.next(15);
		source
			.pipe(
				map(x => x * 10),
				filter(x => x > 200),
			)
			.subscribe(value => console.log('value:', value));
		source.next(16);
		source.next(23);

		// http.get<Product[]>('api/products').pipe(x => ensureProducts(x))

		setTimeout(() => {
			source.next(42);
		}, 2000);
	}
}
