import { news } from '../actionTypes';

const initialSate = {
    news: {} as any,
    isLoading: false,
    upVotes: JSON.parse(localStorage.getItem('upVotes') || "{}"),
    hiddenNews: JSON.parse(localStorage.getItem('hiddenNews') || '{}'),
}



const NewsReducer = (state = initialSate, action) => {
    const newState = { ...state };
    switch (action.type) {
        case news.LOAD_NEWS:
            return {
                ...newState,
                isLoading: true
            }
        case news.LOAD_NEWS_SUCCESS:
            const { data } = action.payload;
            data && data.hits.forEach((item, i) => {
                if (newState.hiddenNews[item.objectID]) {
                    data.hits.splice(i,1);
                }
                if (newState.upVotes[item.objectID]) {
                    item.points = item.points ? item.points + 1 : 1;
                }
            });
            return {
                ...newState,
                news: data,
                isLoading: false
            }
        case news.LOAD_NEWS_FAILURE:
            return {
                ...newState,
                news: {},
                isLoading: false
            }
        case news.UP_VOTE:
            if (!newState.upVotes[action.payload]) {
                const newsItem = newState.news.hits.find(item => item.objectID === action.payload);
                newsItem.points = newsItem.points ? newsItem.points + 1 : 1;
                newState.upVotes[action.payload] = true;
                localStorage.setItem('upVotes', JSON.stringify(newState.upVotes));
            }
            return {
                ...newState
            }
        case news.HIDE_NEWS:
            if (!newState.hiddenNews[action.payload]) {
                const index = newState.news.hits.findIndex(item => item.objectID === action.payload);
                newState.news.hits.splice(index,1);
                newState.hiddenNews[action.payload] = true;
                localStorage.setItem('hiddenNews', JSON.stringify(newState.hiddenNews));
            }
            return {
                ...newState
            }
        default:
            return newState;
    }
}

export default NewsReducer;