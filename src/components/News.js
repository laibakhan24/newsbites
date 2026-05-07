import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from "react-top-loading-bar";

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
            hasMore: true  // 👈 add this
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsBites`;
    }

    async updateNews() {
        let url = `http://localhost:5000/api/news?country=${this.props.country}&page=1&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log("API Response:", parsedData);
        this.setState({
            articles: parsedData.articles || [],
            totalArticles: parsedData.totalResults || 0,
            hasMore: (parsedData.articles || []).length > 0
        });
    }

    async componentDidMount() {
        this.updateNews();
    }

    // fetchMore — infinite scroll
    fetchMore = async () => {
        const nextPage = this.state.page + 1;
        this.setState({ page: nextPage });
        let url = `http://localhost:5000/api/news?country=${this.props.country}&page=${nextPage}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        const newArticles = parsedData.articles || [];  // 👈 fallback
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
                        {this.state.articles.map((element) => (
                            <div className="col-6 col-sm-4 col-md-3 mb-4" key={element.url}>                                <NewsItem
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