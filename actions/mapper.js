import * as actions from './index';

const timers = {};

export const mapDispatchToProps = (dispatch) => {
  const mapped = {};
  for (const name in actions) {
    mapped[name] = (...args) => {
      const now = new Date().getTime();
      // 1.5秒内不能重复操作
      if (timers[name] && now - timers[name] < 1500) {
        return false;
      }
      timers[name] = now;
      return dispatch(actions[name](...args));
    };
  }
  return mapped;
};
