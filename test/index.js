import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Paginator from '../src';
import jsdom from 'mocha-jsdom';
import chai, {expect} from 'chai';
import chaiDom from 'chai-dom';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';

chai
  .use(chaiDom)
  .use(sinonChai);

describe('Paginator', () => {
  jsdom();

  describe('labels', () => {
    it('should be possible to specify custom labels', () => {
      const instance = TestUtils.renderIntoDocument((
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
        />
      ));

      const domElement = ReactDOM.findDOMNode(instance);

      const first = domElement.querySelector('ul > li:first-child a');
      expect(first).to.have.attr('aria-label', 'Premier');
      expect(first).to.have.text('<<');

      const last = domElement.querySelector('ul > li:last-child a');
      expect(last).to.have.attr('aria-label', 'Dernier');
      expect(last).to.have.text('>>');

      const previous = domElement.querySelector('ul > li:nth-child(2) a');
      expect(previous).to.have.attr('aria-label', 'Précédent');
      expect(previous).to.have.text('<');

      const next = domElement.querySelector('ul > li:nth-last-child(2) a');
      expect(next).to.have.attr('aria-label', 'Suivant');
      expect(next).to.have.text('>');

      const brk = domElement.querySelector('ul > li:nth-last-child(3) a');
      expect(brk).to.have.text('...');
    });
  });

  describe('onPageChange', () => {
    it('should be called when we click on buttons', () => {
      const spy = sinon.spy();
      const instance = TestUtils.renderIntoDocument((
        <Paginator
          nbRowsPerPage={20}
          onPageChange={spy}
          page={10}
          total={300}
        />
      ));

      const domElement = ReactDOM.findDOMNode(instance);

      const first = domElement.querySelector('ul > li:first-child a');
      const last = domElement.querySelector('ul > li:last-child a');
      const previous = domElement.querySelector('ul > li:nth-child(2) a');
      const next = domElement.querySelector('ul > li:nth-last-child(2) a');
      const firstBreak = domElement.querySelector('ul > li:nth-child(3) a');
      const lastBreak = domElement.querySelector('ul > li:nth-last-child(3) a');

      TestUtils.Simulate.click(first);
      expect(spy.lastCall).to.be.calledWith(1);

      TestUtils.Simulate.click(last);
      expect(spy.lastCall).to.be.calledWith(15);

      TestUtils.Simulate.click(previous);
      expect(spy.lastCall).to.be.calledWith(9);

      TestUtils.Simulate.click(next);
      expect(spy.lastCall).to.be.calledWith(11);

      TestUtils.Simulate.click(firstBreak);
      expect(spy.lastCall).to.be.calledWith(9);

      TestUtils.Simulate.click(lastBreak);
      expect(spy.lastCall).to.be.calledWith(13);
    });
  });

  describe('condensed', () => {
    it('should display a condensed version of paginator', () => {
      const instance = TestUtils.renderIntoDocument((
        <Paginator
          condensed
          nbRowsPerPage={20}
          page={10}
          total={300}
        />
      ));

      const domElement = ReactDOM.findDOMNode(instance);

      expect(domElement.querySelectorAll('li')).to.length(2);
      expect(domElement.querySelector('li:first-child')).to.have.text('‹');
      expect(domElement.querySelector('li:last-child')).to.have.text('›');
    });
  });

  describe('size', () => {
    it('should be medium by default', () => {
      const instance = TestUtils.renderIntoDocument((
        <Paginator
          nbRowsPerPage={20}
          page={10}
          total={300}
        />
      ));

      const domElement = ReactDOM.findDOMNode(instance);

      expect(domElement.querySelector('ul')).to.have.class('pagination-md');
    });

    it('should work with small', () => {
      const instance = TestUtils.renderIntoDocument((
        <Paginator
          nbRowsPerPage={20}
          page={10}
          size="small"
          total={300}
        />
      ));

      const domElement = ReactDOM.findDOMNode(instance);

      expect(domElement.querySelector('ul')).to.have.class('pagination-sm');
    });

    it('should work with large', () => {
      const instance = TestUtils.renderIntoDocument((
        <Paginator
          nbRowsPerPage={20}
          page={10}
          size="large"
          total={300}
        />
      ));

      const domElement = ReactDOM.findDOMNode(instance);

      expect(domElement.querySelector('ul')).to.have.class('pagination-lg');
    });
  });

  describe('showInfos', () => {
    it('should display informations', () => {
      const instance = TestUtils.renderIntoDocument((
        <Paginator
          nbRowsPerPage={20}
          page={10}
          showInfos
          size="large"
          total={300}
        />
      ));

      const domElement = ReactDOM.findDOMNode(instance);
      const infos = domElement.querySelector('div:first-child');

      expect(infos).to.have.text('181-200 / 300');
      expect(infos).to.class('pagination-infos');
      expect(infos).to.class('pagination-infos-lg');
    });
  });

  describe('className', () => {
    it('should support className', () => {
      const instance = TestUtils.renderIntoDocument((
        <Paginator
          className="my-classname"
          nbRowsPerPage={20}
          page={10}
          showInfos
          total={300}
        />
      ));

      const domElement = ReactDOM.findDOMNode(instance);

      expect(domElement).to.have.class('my-classname');
    });
  });

  describe('disabled', () => {
    it('should support disabled', () => {
      const spy = sinon.spy();
      const instance = TestUtils.renderIntoDocument((
        <Paginator
          disabled
          nbRowsPerPage={20}
          onPageChange={spy}
          page={10}
          showInfos
          total={300}
        />
      ));

      const domElement = ReactDOM.findDOMNode(instance);
      const first = domElement.querySelector('ul > li:first-child');
      const previous = domElement.querySelector('ul > li:nth-child(2)');
      const centerBreak = domElement.querySelector('ul > li:nth-child(3)');
      const next = domElement.querySelector('ul > li:nth-child(4)');
      const last = domElement.querySelector('ul > li:nth-child(5)');

      expect(first).to.have.class('disabled');
      expect(last).to.have.class('disabled');
      expect(previous).to.have.class('disabled');
      expect(next).to.have.class('disabled');
      expect(centerBreak).to.have.class('disabled');

      TestUtils.Simulate.click(first.querySelector('a'));
      TestUtils.Simulate.click(last.querySelector('a'));
      TestUtils.Simulate.click(previous.querySelector('a'));
      TestUtils.Simulate.click(next.querySelector('a'));
      TestUtils.Simulate.click(centerBreak.querySelector('a'));

      expect(spy).to.not.have.been.called;
    });
  });
});
