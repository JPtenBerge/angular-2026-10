import { render, screen } from '@testing-library/angular';
import { UserEvent, userEvent } from '@testing-library/user-event';
import { MockedObject } from 'vitest';
import { NavigateService } from '../../services/navigate.service';
import { Autocompleter } from './autocompleter';

describe('Integration`with Testing Library: Autocompleter', () => {
	let user: UserEvent;
	let navigateServiceMock: MockedObject<NavigateService>;

	beforeEach(async () => {
		// let mock = jasmine.createSpyObj<NavigateService>('navigateServiceMock', ['next'])
		navigateServiceMock = { next: vi.fn() };
		await render(Autocompleter<{ x: string }>, {
			inputs: {
				data: [{ x: 'hoi' }, { x: 'hey' }, { x: 'hallo' }],
			},
			providers: [{ provide: NavigateService, useValue: navigateServiceMock }],
		});
		user = userEvent.setup();
	});

	it('autocompletes a list suggestions', async () => {
		let queryInput = screen.getByRole('textbox');
		await user.type(queryInput, 'o');
		await user.type(queryInput, '{arrowdown}');

		let suggestionList = screen.getByRole('list');
		expect(suggestionList).toBeVisible();

		let suggestions = screen.getAllByRole('listitem');
		expect(suggestions.length).toBe(2);
		expect(suggestionList).toHaveTextContent('hoi');
		expect(suggestionList).toHaveTextContent('hallo');
		expect(suggestionList).not.toHaveTextContent('hey');
	});

	it('nexts through suggestions', async () => {
		let queryInput = screen.getByRole('textbox');
		await user.type(queryInput, 'o');

		let suggestionList = screen.getByRole('list');
		expect(suggestionList).toBeVisible();

		await user.type(queryInput, '{arrowdown}');
		expect(navigateServiceMock.next).toHaveBeenCalled();
	});
});
