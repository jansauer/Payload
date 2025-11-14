import { describe, expect, test } from 'vitest'
import { discoverWebmentionEndpoint } from './endpoint-discovery'

describe('Webmention Endpoint Discovery', () => {

  test('Discovery Test #1', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/1'))
      .toEqual('https://webmention.rocks/test/1/webmention?head=true')
  })

  test('Discovery Test #2', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/2'))
      .toEqual('https://webmention.rocks/test/2/webmention?head=true')
  })

  test('Discovery Test #3', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/3'))
      .toEqual('https://webmention.rocks/test/3/webmention')
  })

  test('Discovery Test #4', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/4'))
      .toEqual('https://webmention.rocks/test/4/webmention')
  })

  test('Discovery Test #5', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/5'))
      .toEqual('https://webmention.rocks/test/5/webmention')
  })

  test('Discovery Test #6', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/6'))
      .toEqual('https://webmention.rocks/test/6/webmention')
  })

  test('Discovery Test #7', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/7'))
      .toEqual('https://webmention.rocks/test/7/webmention?head=true')
  })

  test('Discovery Test #8', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/8'))
      .toEqual('https://webmention.rocks/test/8/webmention?head=true')
  })

  test('Discovery Test #9', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/9'))
      .toEqual('https://webmention.rocks/test/9/webmention')
  })

  test('Discovery Test #10', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/10'))
      .toEqual('https://webmention.rocks/test/10/webmention?head=true')
  })

  test('Discovery Test #11', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/11'))
      .toEqual('https://webmention.rocks/test/11/webmention')
  })

  test('Discovery Test #12', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/12'))
      .toEqual('https://webmention.rocks/test/12/webmention')
  })

  test('Discovery Test #13', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/13'))
      .toEqual('https://webmention.rocks/test/13/webmention')
  })

  test('Discovery Test #14', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/14'))
      .toEqual('https://webmention.rocks/test/14/webmention')
  })

  test('Discovery Test #15', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/15'))
      .toEqual('https://webmention.rocks/test/15')
  })

  test('Discovery Test #16', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/16'))
      .toEqual('https://webmention.rocks/test/16/webmention')
  })

  test('Discovery Test #17', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/17'))
      .toEqual('https://webmention.rocks/test/17/webmention')
  })

  test('Discovery Test #18', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/18'))
      .toEqual('https://webmention.rocks/test/18/webmention?head=true')
  })

  test('Discovery Test #19', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/19'))
      .toEqual('https://webmention.rocks/test/19/webmention?head=true')
  })

  test('Discovery Test #20', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/20'))
      .toEqual('https://webmention.rocks/test/20/webmention')
  })

  test('Discovery Test #21', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/21'))
      .toEqual('https://webmention.rocks/test/21/webmention?query=yes')
  })

  test('Discovery Test #22', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/22'))
      .toEqual('https://webmention.rocks/test/22/webmention')
  })

  test('Discovery Test #23', async () => {
    expect(await discoverWebmentionEndpoint('https://webmention.rocks/test/23/page'))
      .toMatch(/^https:\/\/webmention\.rocks\/test\/23\/webmention-endpoint\/[\w\d]{20}$/)
  })
})
