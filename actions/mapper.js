import * as actions from './index';

export const mapDispatchToProps = (dispatch) => {
  const mapped = {};
  for (const name in actions) {
    mapped[name] = (...args) => {
      dispatch(actions[name](...args));
    };
  }
  return mapped;
};
