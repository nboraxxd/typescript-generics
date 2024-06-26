import { Equal, Expect } from '../helpers/type-utils'

/**
 * Hiện tại, hàm createSet không có kiểu mặc định, dẫn đến việc otherStringSet không có kiểu chính xác là Set<string>.
 * Làm thế nào để bạn định nghĩa lại type cho hàm createSet để hỗ trợ kiểu mặc định là string.
 */
export const createSet = <T = string>() => {
  return new Set<T>()
}

const numberSet = createSet<number>()
const stringSet = createSet<string>()
const otherStringSet = createSet()

type tests = [
  Expect<Equal<typeof numberSet, Set<number>>>,
  Expect<Equal<typeof stringSet, Set<string>>>,
  Expect<Equal<typeof otherStringSet, Set<string>>>
]
