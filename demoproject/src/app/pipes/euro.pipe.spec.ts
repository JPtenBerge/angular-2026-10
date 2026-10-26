import { EuroPipe } from './euro.pipe';

describe('Pipe: Euro', () => {
  let sut: EuroPipe;

  beforeEach(() => {
    sut = new EuroPipe();
  });

  it('formats whole numbers as a currency with two decimals', () => {
    let result = sut.transform(123);
    expect(result).toBe('€ 123,00');
  });

  it('formats whole numbers with one decimal as a currency with two decimals', () => {
    let result = sut.transform(123.4);
    expect(result).toBe('€ 123,40');
  });

  it('formats whole numbers with two decimals as a currency with two decimals', () => {
    let result = sut.transform(123.45);
    expect(result).toBe('€ 123,45');
  });

  it('formats whole numbers with five decimals as a currency with two decimals', () => {
    let result = sut.transform(123.45678);
    expect(result).toBe('€ 123,46');
  });
});
