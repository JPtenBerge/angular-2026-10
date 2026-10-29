import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, Service, signal } from '@angular/core';
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
	cdr = inject(ChangeDetectorRef);
	magicService = inject(MagicService);

	// values: number[] = [];
	values = signal<number[]>([]);

	autocomplete() {
		console.log('autocompleting met query:', this.query.value);
	}

	magicNumbers: number[] = [];
	doMagic() {
		this.magicService
			.giveMagicNumbers()
			.pipe(map(x => x * 20))
			.subscribe(x => this.magicNumbers.push(x));
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

		let source = new ReplaySubject<number>();

		// 3 subjects:
		// Subject<T>
		// BehaviorSubject<T> - onthoudt de laatste
		// ReplaySubject<T> - configureerbare geschiedenis

		source.next(4);
		source.next(8);
		source.next(15);
		source.pipe(map(x => x * 10)).subscribe(value => {
			// this.values.push(value);
			this.values.update(currentValues => [...currentValues, value]);
			console.log('value nu met push 2:', value);
		});
		source.next(16);
		source.next(23);

		// http.get<Product[]>('api/products').pipe(x => ensureProducts(x))

		setTimeout(() => {
			source.next(42);
			// this.cdr.markForCheck();
		}, 2000);
	}
}

@Service()
export class MagicService {
	giveMagicNumbers() {
		let source = new ReplaySubject<number>();
		source.next(4);
		source.next(8);
		source.next(15);
		return source.asObservable();
	}
}
