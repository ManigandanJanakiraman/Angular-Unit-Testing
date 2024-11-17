import { pluck, range } from "./utils";

describe('utils', () => {
  describe('range', () => {
    it('returns ccorrect range from 1 to 5', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    })
  })
  describe('pluck', () => {
    it('returns correct id', () => {
      const names = [
        { id: 1, name: 'Mani' },
        { id: 2, name: 'vipin' },
        { id: 3, name: 'Dani' }
      ]
      expect(pluck(names, 'id')).toEqual([1, 2, 3]);
    })
  })

})