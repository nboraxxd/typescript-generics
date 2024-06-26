import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

/**
 * Sửa đổi hàm fetchData để nó có thể nhận kiểu dữ liệu generic TData và trả về dữ liệu đúng kiểu từ API.
 */
const fetchData = async <TData>(url: string): Promise<TData> => {
  const data = await fetch(url).then((response) => response.json())
  return data
}

it('Should fetch data from an API', async () => {
  const data = await fetchData<{ name: string }>('https://swapi.dev/api/people/1')
  expect(data.name).toEqual('Luke Skywalker')

  type tests = [Expect<Equal<typeof data, { name: string }>>]
})
