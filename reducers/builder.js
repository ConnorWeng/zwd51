export const REQUEST_INITIAL_STATE = {
  isLoading: false,
  data: [],
  page: 1,
  isEnd: false,
  message: '',
};

export function buildReducer(defaultState, defaultHandler, requestState) {
  const handlers = [];
  const mergeState = {};
  for (var requestKey in requestState) {
    const isListRequest = typeof(requestState[requestKey]) !== 'object';
    if (isListRequest) {
      mergeState[requestKey] = REQUEST_INITIAL_STATE;
      const requestName = requestState[requestKey];
      handlers.push(
        ((requestName, key) => {
          return (state, action) => {
            const newState = {};
            switch (action.type) {
            case `${requestName}_REQUEST`:
              newState[key] = {
                isLoading: true,
                message: '',
                data: state[key].data,
                page: state[key].page,
                isEnd: false,
              };
              return Object.assign({}, state, newState);
            case `${requestName}_CHECK`:
              if (action.json.error) {
                newState[key] = Object.assign({}, REQUEST_INITIAL_STATE, {
                  message: action.json.message,
                });
                return Object.assign({}, state, newState);
              } else {
                newState[key] = {
                  isLoading: false,
                  message: '',
                  data: [
                    ...state[key].data,
                    ...action.json,
                  ],
                  page: action.json.length > 0 ? state[key].page + 1 : state[key].page,
                  isEnd: action.json.length < 10 ? true : false,
                };
                return Object.assign({}, state, newState);
              }
            }
            return null;
          };
        })(requestName, requestKey)
      );
    } else {
      mergeState[requestKey] = {
        isLoading: false,
        message: '',
      };
      for (const mappingKey in requestState[requestKey].mapping) {
        if (typeof(requestState[requestKey].mapping[mappingKey]) !== 'object') {
          mergeState[requestKey][mappingKey] = '';
        } else {
          mergeState[requestKey][mappingKey] = requestState[requestKey].mapping[mappingKey].init;
        }
      }
      const requestName = requestState[requestKey].name;
      handlers.push(
        ((requestName, key) => {
          return (state, action) => {
            const newState = {};
            switch (action.type) {
            case `${requestName}_REQUEST`:
              newState[key] = {
                isLoading: true,
                message: '',
              };
              for (const mappingKey in requestState[key].mapping) {
                if (typeof(requestState[key].mapping[mappingKey]) !== 'object') {
                  newState[key][mappingKey] = '';
                } else {
                  newState[key][mappingKey] = requestState[key].mapping[mappingKey].init;
                }
              }
              return Object.assign({}, state, newState);
            case `${requestName}_CHECK`:
              if (action.json.error) {
                newState[key] = {
                  message: action.json.message,
                };
                for (const mappingKey in requestState[key].mapping) {
                  if (typeof(requestState[key].mapping[mappingKey]) !== 'object') {
                    newState[key][mappingKey] = '';
                  } else {
                    newState[key][mappingKey] = requestState[key].mapping[mappingKey].init;
                  }
                }
                return Object.assign({}, state, newState);
              } else {
                newState[key] = {
                  isLoading: false,
                  message: '',
                };
                for (const mappingKey in requestState[key].mapping) {
                  let mappingValue;
                  if (typeof(requestState[key].mapping[mappingKey]) !== 'object') {
                    mappingValue = requestState[key].mapping[mappingKey];
                  } else {
                    mappingValue = requestState[key].mapping[mappingKey].name;
                  }
                  newState[key][mappingKey] = action.json[mappingValue];
                }
                return Object.assign({}, state, newState);
              }
            }
            return null;
          };
        })(requestName, requestKey)
      );
    }
  }
  if (defaultHandler) {
    handlers.push(defaultHandler);
  }
  return (state = Object.assign({}, defaultState, mergeState), action) => {
    for (let i = 0; i < handlers.length; i++) {
      const newState = handlers[i](state, action);
      if (newState) {
        return newState;
      }
    }
    return state;
  };
}
