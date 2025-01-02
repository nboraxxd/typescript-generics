import { expect, it, describe } from 'vitest'
import { Equal, Expect } from '../helpers/type-utils'

/**
 * Đoạn mã dưới gặp lỗi vì hàm getHomePageFeatureFlags không được định nghĩa với kiểu dữ liệu chính xác cho tham số config và hàm override.
 * Sửa đổi hàm getHomePageFeatureFlags để nó có thể nhận kiểu dữ liệu generic TConfig và trả về dữ liệu đúng kiểu từ homePage.
 */

// export const getHomePageFeatureFlags = <TConfig extends { rawConfig: { featureFlags: { homePage: any } } }>(
//   config: TConfig,
//   override: (
//     flags: TConfig['rawConfig']['featureFlags']['homePage']
//   ) => TConfig['rawConfig']['featureFlags']['homePage']
// ) => {
//   return override(config.rawConfig.featureFlags.homePage)
// }

export const getHomePageFeatureFlags = <HomePageFlags>(
  config: { rawConfig: { featureFlags: { homePage: HomePageFlags } } },
  override: (flags: HomePageFlags) => HomePageFlags
) => {
  return override(config.rawConfig.featureFlags.homePage)
}

describe('getHomePageFeatureFlags', () => {
  const EXAMPLE_CONFIG = {
    apiEndpoint: 'https://api.example.com',
    apiVersion: 'v1',
    apiKey: '1234567890',
    rawConfig: {
      featureFlags: {
        homePage: {
          showBanner: true,
          showLogOut: false,
        },
        loginPage: {
          showCaptcha: true,
          showConfirmPassword: false,
        },
      },
    },
  }
  it('Should return the homePage flag object', () => {
    const flags = getHomePageFeatureFlags(EXAMPLE_CONFIG, (defaultFlags) => defaultFlags)

    expect(flags).toEqual({
      showBanner: true,
      showLogOut: false,
    })

    type tests = [Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>]
  })

  it('Should allow you to modify the result', () => {
    const flags = getHomePageFeatureFlags(EXAMPLE_CONFIG, (defaultFlags) => ({
      ...defaultFlags,
      showBanner: false,
    }))

    expect(flags).toEqual({
      showBanner: false,
      showLogOut: false,
    })

    type tests = [Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>]
  })
})
