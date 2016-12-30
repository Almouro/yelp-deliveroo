const checkNamesCorrespond = require('./checkNamesCorrespond');
describe('checkNamesCorrespond', () => {
  it('checks the names correspond', () => {
    expect(checkNamesCorrespond('Fuxia', 'Fuxia Canal Saint Martin')).toBe(true);
    expect(checkNamesCorrespond('I m l i', 'IMLI')).toBe(true);
    expect(checkNamesCorrespond('Futia', 'Fuxia Canal Saint Martin')).toBe(false);
    expect(checkNamesCorrespond('Ahi Poké', 'Ahi Poke')).toBe(true);
  });
});
