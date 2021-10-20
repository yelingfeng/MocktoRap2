import { mount } from '@vue/test-utils'
import MockRap from '../index.vue'

describe('MockRap.vue', () => {
  test('render', () => {
    const wrapper = mount(MockRap, {
      props: {},
    })
    expect(wrapper.classes()).toContain('mock-rap')
  })
})
