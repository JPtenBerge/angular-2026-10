import { TestBed } from '@angular/core/testing';
import { MagicService, ReactivePage } from './reactive.page';
import { ReactiveFormsModule } from '@angular/forms';
import { MockedObject } from 'vitest';
import { of, from } from 'rxjs';




describe('Page: Reactive', () => {
	let sut: ReactivePage;
	let magicServiceMock: MockedObject<MagicService>;

	beforeEach(() => {
        // from([1,2,3])

		magicServiceMock = {
			giveMagicNumbers: vi.fn().mockReturnValue(from([16, 23, 42])),
		};
		// magicServiceMock.giveMagicNumbers.mock

		vi.useFakeTimers();
		// vi.setSystemTime(new Date('2023-07-04T12:30:00Z'));

		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule],
			providers: [{ provide: MagicService, useValue: magicServiceMock }],
		});
		sut = TestBed.createComponent(ReactivePage).componentInstance;
	});

	it('handles async stuff', () => {
		vi.advanceTimersByTime(3000);
		expect(sut.values()).toEqual([40, 80, 150, 160, 230, 420]);
	});

	it('mocks observables', () => {
		sut.doMagic();
		expect(sut.magicNumbers).toEqual([320, 460, 840]);
	});
});
