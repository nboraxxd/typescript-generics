import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

/**
 * There are two possible solutions to this problem - and it's
 * to do with the way you specify the generic. Can you get
 * both solutions?
 */

/**
 * Function typedObjectKeys không đảm bảo type cho obj và kết quả trả về của hàm không được định nghĩa rõ ràng.
 * Yêu cầu:
 * Sửa đổi function typedObjectKeys để nó có thể nhận type generic TObject
 * và trả về các key của object dưới dạng một mảng với type chính xác.
 */

// const typedObjectKeys = <TObject extends object>(obj: TObject) => {
//   return Object.keys(obj) as Array<keyof TObject>
// }

const typedObjectKeys = <TKey extends string>(obj: Record<TKey, any>) => {
  return Object.keys(obj) as Array<TKey>
}

it('Should return the keys of the object', () => {
  const result1 = typedObjectKeys({
    a: 1,
    b: 2,
  })

  expect(result1).toEqual(['a', 'b'])

  type test = Expect<Equal<typeof result1, Array<'a' | 'b'>>>
})
