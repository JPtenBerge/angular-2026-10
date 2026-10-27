import { render, screen } from '@testing-library/angular';
import { Autocompleter } from './autocompleter';
import { userEvent } from '@testing-library/user-event';

describe('Integration: Autocompleter', () => {
	beforeEach(() => {});

	it('autocompletes a list suggestions', async () => {
		await render(Autocompleter<{ x: string }>, {
			inputs: {
				data: [{ x: 'hoi' }, { x: 'hey' }, { x: 'hallo' }],
			},
		});
		let session = userEvent.setup();

		let queryInput = screen.getByRole('textbox');
		await session.type(queryInput, 'o');

		let suggestionList = screen.getByRole('list');
		expect(suggestionList).toBeVisible();

		let suggestions = screen.getAllByRole('listitem');
		expect(suggestions.length).toBe(2);
		expect(suggestionList).toHaveTextContent('hoi');
		expect(suggestionList).toHaveTextContent('hallo');
		expect(suggestionList).not.toHaveTextContent('hey');
	});
});
