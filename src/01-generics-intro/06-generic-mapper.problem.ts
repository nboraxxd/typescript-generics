import { expect, it } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

/**
 * Hàm concatenateFirstNameAndLastName nhận user có kiểu unknown làm parameter
 * Return về một object mới, thêm user vào object mới này và có thêm thuộc tính fullName
 * nhưng đang có lỗi là user không chứa firstName hoặc lastName.
 *
 * Định nghĩa lại type của hàm concatenateFirstNameAndLastName để nó nhận vào một cái gì đó có chứa các thuộc tính firstName và lastName,
 * và trả về một đối tượng mới có thêm thuộc tính fullName.
 */
export const concatenateFirstNameAndLastName = <T extends { firstName: string; lastName: string }>(user: T) => {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }
}

it('Should add fullName to an object which only contains firstName and lastName', () => {
  const users = [
    {
      firstName: 'Matt',
      lastName: 'Pocock',
    },
  ]

  const newUsers = users.map(concatenateFirstNameAndLastName)

  expect(newUsers).toEqual([
    {
      firstName: 'Matt',
      lastName: 'Pocock',
      fullName: 'Matt Pocock',
    },
  ])

  type tests = [Expect<Equal<typeof newUsers, Array<{ firstName: string; lastName: string } & { fullName: string }>>>]
})

it('Should retain other properties passed in', () => {
  const users = [
    {
      id: 1,
      firstName: 'Matt',
      lastName: 'Pocock',
    },
  ]

  const newUsers = users.map(concatenateFirstNameAndLastName)

  expect(newUsers).toEqual([
    {
      id: 1,
      firstName: 'Matt',
      lastName: 'Pocock',
      fullName: 'Matt Pocock',
    },
  ])

  type tests = [
    Expect<
      Equal<
        typeof newUsers,
        Array<
          { id: number; firstName: string; lastName: string } & {
            fullName: string
          }
        >
      >
    >
  ]
})

it('Should fail when the object passed in does not contain firstName', () => {
  const users = [
    {
      firstName: 'Matt',
    },
  ]

  const newUsers = users.map(
    // @ts-expect-error
    concatenateFirstNameAndLastName
  )
})
