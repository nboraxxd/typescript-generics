import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

const array = [
  {
    name: 'John',
  },
  {
    name: 'Steve',
  },
]

/**
 * Đoạn mã dưới gặp lỗi vì reduce không được cung cấp kiểu dữ liệu cho accum, dẫn đến việc obj có kiểu unknown hoặc {}.
 * Sửa đổi hàm reduce để đảm bảo obj có kiểu chính xác là Record<string, { name: string }> và giữ nguyên chức năng của nó.
 */
const obj = array.reduce<Record<string, { name: string }>>((accum, item) => {
  accum[item.name] = item
  return accum
}, {})

it('Should resolve to an object where name is the key', () => {
  expect(obj).toEqual({
    John: {
      name: 'John',
    },
    Steve: {
      name: 'Steve',
    },
  })

  type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>]
})
