import {mapDispatchToProps} from '../actions/mapper';

describe('mapDispatchToProps', () => {
  it('should wrap login action', () => {
    const dispatch = (action) => {return action;};
    const mapped = mapDispatchToProps(dispatch);
    expect(mapped['login']).toBeDefined();
  });
});
