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
            let { data } = action.payload;
            data.hits = data.hits
                .filter(item => !newState.hiddenNews[item.objectID])
                .map((item, i) => {
                    if (newState.upVotes[item.objectID]) {
                        item.points = item.points ? item.points + newState.upVotes[item.objectID] : newState.upVotes[item.objectID];
                    }
                    return item;
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
            const newsData = { ...newState.news };
            const id = action.payload;
            const index = newsData.hits.findIndex(item => item.objectID === id);
            newsData.hits[index] = { ...newsData.hits[index], points: newsData.hits[index].points ? newsData.hits[index].points + 1 : 1 }
            if (!newState.upVotes[id]) {
                newState.upVotes[id] = 1;
            } else {
                newState.upVotes[id] += 1;
            }
            localStorage.setItem('upVotes', JSON.stringify(newState.upVotes));
            return {
                ...newState,
                news: newsData
            }
        case news.HIDE_NEWS:
            if (!newState.hiddenNews[action.payload]) {
                const index = newState.news.hits.findIndex(item => item.objectID === action.payload);
                newState.news.hits.splice(index, 1);
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