const VITE_APP_ENV = import.meta.env.VITE_APP_ENV
const configObj = {
  /* 开发环境 */
  development: {
    api: '/api'
  },
  /* 测试环境 */
  test: {
    api: '/api'
  },
  /* 生产地址 */
  production: {
    api: '/api'
  }
}

const config = configObj[VITE_APP_ENV]

export default config

