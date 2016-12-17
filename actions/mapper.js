import * as actions from './index';

export const mapDispatchToProps = (dispatch) => {
  const mapped = {};
  for (const name in actions) {
    mapped[name] = (...args) => {
      return dispatch(actions[name](...args));
    };
  }
  return mapped;
};
