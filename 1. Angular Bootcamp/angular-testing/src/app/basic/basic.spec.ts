import { myArrayFunc, myNumberFunc, myStringFunc } from './basic';

beforeAll(() => {
  console.log('beforeAll');
});
afterAll(() => {
  console.log('afterAll');
});
beforeEach(() => {
  console.log('beforeEach');
});
afterEach(() => {
  console.log('afterEach');
});

// ************************************************
//                  STRING TESTING
// ************************************************
describe('String Testing', () => {
  // TEST 1
  it('Returns a string', () => {
    const resp = myStringFunc('Hector');
    expect(typeof resp).toBe('string');
  });
  // TEST 2
  it('Proofs that returning string contains the input string in response', () => {
    const name = 'Hector';
    const resp = myStringFunc(name);
    expect(resp).toContain(name);
  });
});

// ************************************************
//                  NUMBER TESTING
// ************************************************
describe('Numbers Testing', () => {
  // TEST 1
  it('Returns a number in all cases', () => {
    expect(typeof myNumberFunc(-10)).toBe('number');
    expect(typeof myNumberFunc(10)).toBe('number');
    expect(typeof myNumberFunc(110)).toBe('number');
  });
  // TEST 2
  it('Returns n + 1 in a value between 1-99', () => {
    const n = 10;
    const resp = myNumberFunc(n);
    expect(resp).toBe(n + 1);
  });
  // TEST 3
  it('Returns 100 with a value equal or higher than 100', () => {
    const resp = myNumberFunc(110);
    expect(resp).toBe(100);
  });
  // TEST 4
  it('Returns 0 with a value less or equal than 0', () => {
    const resp = myNumberFunc(-200);
    expect(resp).toBe(0);
  });
});

// ************************************************
//                  ARRAY TESTING
// ************************************************
describe('Array Testing', () => {
  // TEST 1
  it('Returns a non empty array', () => {
    expect(myArrayFunc().length).toBeGreaterThanOrEqual(1);
    expect(myArrayFunc('Splinter').length).toBeGreaterThanOrEqual(1);
  });
  // TEST 2
  it('Returns an array containing the input string', () => {
    const value = 'Splinter';
    const resp = myArrayFunc(value);
    expect(resp).toContain(value);
  });
});
