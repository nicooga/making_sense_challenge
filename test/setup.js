import React from 'react';
import Enzyme from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';
import chai from 'chai';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const { window } = new JSDOM('<!doctype html><html><body></body></html>');

const copyProps = (src, target) => {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
};

global.window = window;
global.document = window.document;
global.navigator = { userAgent: 'node.js' };
global.requestAnimationFrame = callback => setTimeout(callback, 0);
global.cancelAnimationFrame = clearTimeout;

copyProps(window, global);
