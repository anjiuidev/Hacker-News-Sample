import { news } from '../actionTypes';

const initialSate = {
    news: new Array<any>(),
    isLoading: false
}



const NewsReducer = (state = initialSate, action) => {
    const newState = { ...state };
    switch (action.type) {
        case news.LOAD_NEWS:
            return {
                ...state,
                news: [],
                isLoading: true
            }
        case news.LOAD_NEWS_SUCCESS:
            const { data } = action.payload;
            return {
                ...state,
                news: data,
                isLoading: false
            }
        case news.LOAD_NEWS_FAILURE:
            return {
                ...state,
                news: [],
                isLoading: false
            }
        default:
            return newState;
    }
}

export default NewsReducer;