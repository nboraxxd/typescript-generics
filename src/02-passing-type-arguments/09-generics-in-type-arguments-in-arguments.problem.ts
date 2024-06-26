import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

export class Component<TProps> {
  private props: TProps

  constructor(props: TProps) {
    this.props = props
  }

  getProps = () => this.props
}

/**
 * Đoạn mã dưới gặp lỗi vì cloneComponent được định nghĩa với tham số component có kiểu unknown và không thể gọi phương thức getProps trên kiểu unknown.
 * Sửa đổi hàm cloneComponent để nó có thể nhận và hoạt động đúng với tham số component có kiểu Component<TProps> và giữ nguyên chức năng của nó.
 */
const cloneComponent = <T>(component: Component<T>) => {
  return new Component(component.getProps())
}

it('Should clone the props from a passed-in Component', () => {
  const component = new Component({ a: 1, b: 2, c: 3 })

  const clonedComponent = cloneComponent(component)

  const result = clonedComponent.getProps()

  expect(result).toEqual({ a: 1, b: 2, c: 3 })

  type tests = [Expect<Equal<typeof result, { a: number; b: number; c: number }>>]
})
