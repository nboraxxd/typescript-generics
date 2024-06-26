import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

/**
 * class Component nhận vào props có kiểu unknown và trả về giá trị của props.
 * Làm sao để class nhận vào props với các kiểu dữ liệu bất kỳ
 * và đảm bảo rằng kiểu của props được duy trì trong suốt quá trình sử dụng.
 */
export class Component<TProps> {
  private props: TProps

  constructor(props: TProps) {
    this.props = props
  }

  getProps = () => this.props
}

it('Should create an object containing props', () => {
  const component = new Component({ a: 1, b: 2, c: 3 })

  const result = component.getProps()

  expect(result).toEqual({ a: 1, b: 2, c: 3 })

  type tests = [Expect<Equal<typeof result, { a: number; b: number; c: number }>>]
})
