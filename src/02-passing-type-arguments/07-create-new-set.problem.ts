import { Equal, Expect } from '../helpers/type-utils'

/**
 * Hàm createSet hiện không hỗ trợ kiểu generic, dẫn đến việc các giá trị return của nó là unknown.
 * Định nghĩa type cho hàm createSet để hỗ trợ kiểu generic cho giá trị return
 */
export const createSet = <T>() => {
  return new Set<T>()
}

const stringSet = createSet<string>()
const numberSet = createSet<number>()
const unknownSet = createSet()

type tests = [
  Expect<Equal<typeof stringSet, Set<string>>>,
  Expect<Equal<typeof numberSet, Set<number>>>,
  Expect<Equal<typeof unknownSet, Set<unknown>>>
]
