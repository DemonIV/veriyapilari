import { describe, expect, it } from 'vitest';
import { recordSteps } from '../lib/sortingSteps';

// Adım listesini bir kopyaya uygulayıp sonucun gerçekten sıralı olduğunu doğrular
function applySteps(input, steps) {
  const arr = [...input];
  for (const step of steps) {
    if (step.type === 'swap') [arr[step.i], arr[step.j]] = [arr[step.j], arr[step.i]];
    else if (step.type === 'set') arr[step.i] = step.value;
  }
  return arr;
}

const algorithms = ['bubble', 'selection', 'insertion', 'quick', 'merge'];

describe('recordSteps', () => {
  for (const name of algorithms) {
    it(`${name} sort adımları diziyi sıralar`, () => {
      const input = [64, 34, 25, 12, 22, 11, 90, 5, 77, 3];
      const sorted = [...input].sort((a, b) => a - b);
      expect(applySteps(input, recordSteps(name, input))).toEqual(sorted);
    });

    it(`${name} sort sıralı diziyi bozmaz`, () => {
      const input = [1, 2, 3, 4, 5];
      expect(applySteps(input, recordSteps(name, input))).toEqual(input);
    });

    it(`${name} sort tekrarlı elemanlarla çalışır`, () => {
      const input = [5, 1, 5, 3, 1, 5];
      const sorted = [...input].sort((a, b) => a - b);
      expect(applySteps(input, recordSteps(name, input))).toEqual(sorted);
    });
  }

  it('girdi dizisini değiştirmez (mutasyon yok)', () => {
    const input = [3, 1, 2];
    recordSteps('quick', input);
    expect(input).toEqual([3, 1, 2]);
  });
});
