import 'jest-enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import './testHelpers';

Enzyme.configure({ adapter: new Adapter() });
