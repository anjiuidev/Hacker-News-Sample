import { combineReducers } from 'redux';
import NewsReducer from './newsReducer';

const reducer = combineReducers({
	news: NewsReducer
})

export default reducer;