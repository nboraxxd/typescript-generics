import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

/**
 * Hàm returnBothOfWhatIPassIn nhận vào một object có hai thuộc tính a và b với kiểu unknown
 * trả về một object có hai thuộc tính first và second tương ứng.
 *
 * Làm sao để hàm này có thể nhận vào hai thuộc tính với các kiểu dữ liệu bất kỳ
 * và trả về một object có cùng kiểu dữ liệu như các thuộc tính đã truyền vào.
 */
const returnBothOfWhatIPassIn = <A, B>(params: { a: A; b: B }) => {
  return {
    first: params.a,
    second: params.b,
  }
}

it('Should return an object where a -> first and b -> second', () => {
  const result = returnBothOfWhatIPassIn({
    a: 'a',
    b: 1,
  })

  expect(result).toEqual({
    first: 'a',
    second: 1,
  })

  type test1 = Expect<
    Equal<
      typeof result,
      {
        first: string
        second: number
      }
    >
  >
})
