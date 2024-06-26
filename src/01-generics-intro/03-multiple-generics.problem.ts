import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

/**
 * func returnBothOfWhatIPassIn nhận vào hai tham số có kiểu unknown và trả về một object chứa hai tham số đó.
 * làm sao để hàm này nhận vào hai tham số với các kiểu dữ liệu bất kỳ và trả về một object có cùng kiểu dữ liệu như các tham số đã truyền vào.
 */
const returnBothOfWhatIPassIn = <A, B>(a: A, b: B) => {
  return {
    a,
    b,
  }
}

it('Should return an object of the arguments you pass', () => {
  const result = returnBothOfWhatIPassIn('a', 1)

  expect(result).toEqual({
    a: 'a',
    b: 1,
  })

  type test1 = Expect<
    Equal<
      typeof result,
      {
        a: string
        b: number
      }
    >
  >
})
