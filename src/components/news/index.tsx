import React from 'react';
import { connect } from 'react-redux';
import { loadNews, upVote, hideNews } from '../../redux/actions/newsActions';
import More from './more';
import Chart from './chart';

class News extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.loadMore = this.loadMore.bind(this);
        this.hideNewsItem = this.hideNewsItem.bind(this);
        this.upVote = this.upVote.bind(this);
    }

    componentDidMount() {
        this.props.loadNews({});
    }

    loadMore(event) {
        const { news } = this.props.news;
        const req = {
            page: news.page + (event ? 1 : -1)
        }

        this.props.loadNews(req);
    }

    hideNewsItem(id) {
        this.props.hideNews(id);
    }

    upVote(id) {
        this.props.upVote(id);
    }


    render() {
        const { news, isLoading, upVotes } = this.props.news;


        const timeSince = (date: Date) => {
            let seconds = Math.floor((+new Date() - +new Date(date)) / 1000);

            let interval = Math.floor(seconds / 31536000);

            if (interval >= 1) {
                return interval + " years ago";
            }
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) {
                return interval + " months ago";
            }
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                return interval + " days ago";
            }
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
                return interval + " hours ago";
            }
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
                return interval + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        }

        const getHostname = url => {
            return url ? (new URL(url)).hostname : 'unknown';
        }

        const getColor = votes => {
            let classname = 'upvotes';
            if (votes > 50 && votes < 100) {
                classname += ' red';
            } else if (votes >= 100) {
                classname += ' orange';
            }
            return classname;
        }

        const trow = news && (news.hits || []).map((item, i) => (
            <tr key={i}>
                <td className="comments">{item?.num_comments || '-'}</td>
                <td className={getColor(item?.points)}>{item?.points || '-'}</td>
                <td className="vote">
                    <span className={`arrow ${upVotes[item.objectID] ? 'active' : ''}`} onClick={() => this.upVote(item.objectID)}></span>
                </td>
                <td className="content">
                    <strong className="title"><a href={item?.url ? item?.url : item?.story_url}>{item?.title ? item?.title : item?.story_title}</a></strong>
                    <span className="link">(<a href={item?.url ? item?.url : item?.story_url}>{getHostname(item?.url ? item?.url : item?.story_url)}</a>)</span>
                    <small className="by">by</small>
                    <span className="user">{item?.author}</span>
                    <span className="time">{timeSince(item?.created_at)}</span>
                    <span className="hide">[ <strong onClick={() => this.hideNewsItem(item.objectID)}>hide</strong> ]</span>
                </td>
            </tr>
        ))


        return (
            <main>
                <table>
                    <thead>
                        <tr>
                            <th className="comments">Comments</th>
                            <th className="upvotes">Vote Count</th>
                            <th>UpVote</th>
                            <th>News Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <tr>
                            <td colSpan={4}>Loading News data...</td>
                        </tr> : null}
                        {trow}
                    </tbody>
                </table>
                {!isLoading && <More moreClick={this.loadMore} page={news.page} />}
                {(!isLoading || news.hits) && <Chart data={news.hits ? [...news.hits] : []} />}
            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        news: state.news
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadNews: data => dispatch(loadNews(data)),
        upVote: id => dispatch(upVote(id)),
        hideNews: id => dispatch(hideNews(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(News);