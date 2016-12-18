import './jsdom';
import chai from 'chai';
import lodash from 'lodash';
import { mount, shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';


global.expect = chai.expect;
global._ = lodash;
global.shallow = shallow;
global.mount = mount;
global.React = React;
global.sinon = sinon;
