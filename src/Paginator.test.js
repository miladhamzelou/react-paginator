import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import Paginator from './'

describe('Paginator', () => {
  describe('labels', () => {
    it('should be possible to specify custom labels', () => {
      const tree = renderer.create(
        <Paginator
          breakLabel="..."
          firstAriaLabel="Premier"
          firstLabel="<<"
          lastAriaLabel="Dernier"
          lastLabel=">>"
          nbRowsPerPage={20}
          nextAriaLabel="Suivant"
          nextLabel=">"
          page={1}
          previousAriaLabel="Précédent"
          previousLabel="<"
          total={300}
        />,
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe('onPageChange', () => {
    it('should be called when we click on buttons', () => {
      const spy = jest.fn()
      const wrapper = mount(<Paginator nbRowsPerPage={20} onPageChange={spy} page={10} total={300} />)

      const buttons = wrapper.find('li a')

      spy.mockClear()
      buttons.first().simulate('click') // first
      expect(spy).toHaveBeenCalledWith(1)

      spy.mockClear()
      buttons.last().simulate('click') // last
      expect(spy).toHaveBeenCalledWith(15)

      spy.mockClear()
      buttons.at(1).simulate('click') // previous
      expect(spy).toHaveBeenCalledWith(9)

      spy.mockClear()
      buttons.at(buttons.length - 2).simulate('click') // next
      expect(spy).toHaveBeenCalledWith(11)

      spy.mockClear()
      buttons.at(2).simulate('click') // first break
      expect(spy).toHaveBeenCalledWith(9)

      spy.mockClear()
      buttons.at(buttons.length - 3).simulate('click') // last break
      expect(spy).toHaveBeenCalledWith(13)
    })
  })

  describe('condensed', () => {
    it('should display a condensed version of paginator', () => {
      const tree = renderer.create(<Paginator condensed nbRowsPerPage={20} page={10} total={300} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('size', () => {
    it('should be medium by default', () => {
      const tree = renderer.create(<Paginator nbRowsPerPage={20} page={10} total={300} />)
      expect(tree).toMatchSnapshot()
    })

    it('should work with small', () => {
      const tree = renderer.create(<Paginator nbRowsPerPage={20} page={10} size="small" total={300} />)
      expect(tree).toMatchSnapshot()
    })

    it('should work with large', () => {
      const tree = renderer.create(<Paginator nbRowsPerPage={20} page={10} size="large" total={300} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('showInfos', () => {
    it('should display informations', () => {
      const tree = renderer.create(<Paginator nbRowsPerPage={20} page={10} showInfos size="large" total={300} />)
      expect(tree).toMatchSnapshot()
    })
  })

  describe('className', () => {
    it('should support className', () => {
      const tree = renderer.create(
        <Paginator className="my-classname" nbRowsPerPage={20} page={10} showInfos total={300} />,
      )
      expect(tree).toMatchSnapshot()
    })
  })

  describe('disabled', () => {
    it('should support disabled', () => {
      const spy = jest.fn()
      const wrapper = mount(
        <Paginator disabled nbRowsPerPage={20} onPageChange={spy} page={10} showInfos total={300} />,
      )

      const buttons = wrapper.find('li')
      buttons.forEach((button) => {
        expect(button.hasClass('disabled'))
        button.find('a').simulate('click')
      })

      expect(spy).not.toHaveBeenCalled()
    })
  })
})
