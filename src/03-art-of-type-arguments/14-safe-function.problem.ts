import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

/**
 * Function makeSafe đang chưa định nghĩa type cho parameter và return của nó.
 *
 * Yêu cầu:
 * Sửa đổi hàm makeSafe để nó có thể nhận generic type TParams và TReturn
 * Đảm bảo rằng hàm này có thể xử lý các tham số và kiểu trả về chính xác.
 */

const makeSafe =
  <TParams extends any[], TReturn>(func: (...args: TParams) => TReturn) =>
  (
    ...args: TParams
  ):
    | {
        type: 'success'
        result: TReturn
      }
    | {
        type: 'failure'
        error: Error
      } => {
    try {
      const result = func(...args)

      return {
        type: 'success',
        result,
      }
    } catch (e) {
      return {
        type: 'failure',
        error: e as Error,
      }
    }
  }

it("Should return the result with a { type: 'success' } on a successful call", () => {
  const func = makeSafe(() => 1)

  const result = func()

  expect(result).toEqual({
    type: 'success',
    result: 1,
  })

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: 'success'
            result: number
          }
        | {
            type: 'failure'
            error: Error
          }
      >
    >
  ]
})

it('Should return the error on a thrown call', () => {
  const func = makeSafe(() => {
    if (1 > 2) {
      return '123'
    }
    throw new Error('Oh dear')
  })

  const result = func()

  expect(result).toEqual({
    type: 'failure',
    error: new Error('Oh dear'),
  })

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: 'success'
            result: string
          }
        | {
            type: 'failure'
            error: Error
          }
      >
    >
  ]
})

it("Should properly match the function's arguments", () => {
  const func = makeSafe((a: number, b: string) => {
    return `${a} ${b}`
  })

  // @ts-expect-error
  func()

  // @ts-expect-error
  func(1, 1)

  func(1, '1')
})
