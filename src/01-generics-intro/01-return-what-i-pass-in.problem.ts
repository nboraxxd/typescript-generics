import { Equal, Expect } from '../helpers/type-utils'

/**
 * Hàm returnWhatIPassIn hiện tại nhận vào một tham số kiểu unknown và trả về tham số đó.
 * Làm sao để hàm này có thể nhận vào bất kỳ giá trị nào và trả về giá trị đó với cùng kiểu dữ liệu.
 */
const returnWhatIPassIn = <T>(t: T) => {
  return t
}

const one = returnWhatIPassIn(1)
const matt = returnWhatIPassIn('matt')

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, 'matt'>>]
