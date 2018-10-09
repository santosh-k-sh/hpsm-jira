import reducer from './reducer';
import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    rootReducer: reducer,
    form: formReducer
});

