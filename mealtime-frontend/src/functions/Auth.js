const createUser = (token, callback) => {
  sessionStorage.setItem('token', token);
}

const destroyUser = () => {
  sessionStorage.remove('token');
}

const getToken = () => {
  return sessionStorage.getItem('token');
}

const isAuthenticated = () => {

  const time = Date.now();
  if(time > sessionStorage.getItem('expiration')) {
    sessionStorage.removeItem('token');
    window.alert('session expired');
    window.location.pathname = '/login'
  }

  // const token = sessionStorage.getItem('token');
  // let tokenIsStored = false;
  // let ret = false;
  // if (store) {
  //   const state = store.getState();
  //   const isAuthenticated = state.user.isAuthenticated;
  //   if (token) tokenIsStored = token.length > 10;

  //   if (isAuthenticated && tokenIsStored) {
  //     ret = true;
  //   } else if (!isAuthenticated && tokenIsStored) {
  //     store.dispatch(updateAuth(true));
  //     ret = true;
  //   } else if (isAuthenticated && !tokenIsStored) {
  //     store.dispatch(updateAuth(false));
  //     ret = false
  //   }

  //   return ret;
  // }
}

export {createUser, destroyUser, getToken, isAuthenticated};