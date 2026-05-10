import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: "us",
        pageSize: 8,
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            totalArticles: 0,
            hasMore: true
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsBites`;
    }

    async updateNews() {
        this.props.setProgress(10);
        // ✅ Fix 1: Changed localhost to Render URL
        let url = `https://newsbites-jn3e.onrender.com/api/news?country=${this.props.country}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log("API Response:", parsedData);
        this.setState({
            articles: parsedData.articles || [],
            totalArticles: parsedData.totalResults || 0,
            hasMore: (parsedData.articles || []).length > 0
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMore = async () => {
        const nextPage = this.state.page + 1;
        this.setState({ page: nextPage });
        // ✅ Fix 2: Changed localhost to Render URL + using nextPage instead of hardcoded 1
        let url = `https://newsbites-jn3e.onrender.com/api/news?country=${this.props.country}&page=${nextPage}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        const newArticles = parsedData.articles || [];
        this.setState(prevState => ({
            articles: prevState.articles.concat(newArticles),
            totalArticles: parsedData.totalResults || 0,
            hasMore: newArticles.length > 0
        }));
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className='text-center' style={{ margin: "30px 0px" }}>
                    NewsBites - Top Headlines from {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}
                </h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMore}
                    hasMore={this.state.hasMore}
                    endMessage={<p style={{ textAlign: 'center' }}>All articles loaded.</p>}
                    loader={<Spinner />}
                    style={{ overflow: "visible" }}
                >
                    <div className="row">
                        {/* ✅ Fix 3: Added index to key to prevent duplicate key warnings */}
                        {this.state.articles.map((element, index) => (
                            <div className="col-6 col-sm-4 col-md-3 mb-4" key={`${element.url}-${index}`}>
                                <NewsItem
                                    title={element.title?.slice(0, 56)}
                                    description={element.description?.slice(0, 57)}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    publishedAt={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News;