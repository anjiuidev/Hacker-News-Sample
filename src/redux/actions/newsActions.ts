import { news } from '../actionTypes';

export const loadNews = req => {
    return { type: news.LOAD_NEWS, payload: req }
}

export const loadNewsSuccess = data => {
    return { type: news.LOAD_NEWS_SUCCESS, payload: data }
}

export const loadNewsFailure = () => {
    return { type: news.LOAD_NEWS_FAILURE }
}

export const upVote = voteId => {
    return { type: news.UP_VOTE, payload: voteId }
}

export const hideNews = id => {
    return { type: news.HIDE_NEWS, payload: id }
}
