import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockedObject } from 'vitest';
import { NavigateService } from '../../services/navigate.service';
import { Autocompleter } from './autocompleter';

describe('Integration with native Angular tooling: Autocompleter', () => {
	let fixture: ComponentFixture<Autocompleter<{}>>;
	let element: HTMLElement;
	let navigateServiceMock: MockedObject<NavigateService>;

	beforeEach(() => {
		navigateServiceMock = { next: vi.fn() };

		TestBed.configureTestingModule({
			providers: [{ provide: NavigateService, useValue: navigateServiceMock }],
		});

		fixture = TestBed.createComponent(Autocompleter);
		fixture.componentRef.setInput('data', [{ x: 'hoi' }, { x: 'hey' }, { x: 'hallo' }]);
		element = fixture.nativeElement;
	});

	it('autocompletes a list suggestions', async () => {
		const queryInput = fixture.nativeElement.querySelector('input');

		queryInput.value = 'o';
		queryInput.dispatchEvent(new Event('input'));
		queryInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'o' }));
		queryInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

		fixture.detectChanges();

		const suggestionList = fixture.nativeElement.querySelector('ul');
		expect(suggestionList).not.toBeNull();

		const suggestions = suggestionList.querySelectorAll('li');
		expect(suggestions.length).toBe(2);

		expect(suggestionList.textContent).toContain('hoi');
		expect(suggestionList.textContent).toContain('hallo');
		expect(suggestionList.textContent).not.toContain('hey');
	});

	it('nexts through suggestions', async () => {
		let queryInput = element.querySelector('input')!;
		queryInput.value = 'o';
		queryInput.dispatchEvent(new Event('input', { bubbles: true }));
		queryInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'o', bubbles: true }));

		fixture.detectChanges();

		const suggestionList = element.querySelector('ul');
		expect(suggestionList).not.toBeNull();

		queryInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(navigateServiceMock.next).toHaveBeenCalled();
	});
});
