import { TYPES } from './Constants';


export default (state, action) => {
  switch (action.type) {

    case TYPES.SET_USERS:
      console.log("payload:", action.payload)
      return { ...state, users: action.payload };

    case TYPES.CREATE_USER:
      console.log("payload:", action.payload)
      return { ...state, users: [...state.users, action.payload] };

    default:
      return;
  }
}
