import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ setProgress, country, pageSize, category }) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const updateNews = async () => {
        setProgress(10);
        let url = `https://newsbites-jn3e.onrender.com/api/news?country=${country}&page=${page}&pageSize=${pageSize}&category=${category}`;
        let data = await fetch(url);
        setProgress(30);
        let parsedData = await data.json();
        setProgress(70);
        setArticles(parsedData.articles || []);
        setTotalArticles(parsedData.totalResults || 0);
        setHasMore((parsedData.articles || []).length > 0);
        setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [country, pageSize, category]);

    const fetchMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        let url = `https://newsbites-jn3e.onrender.com/api/news?country=${country}&page=${nextPage}&pageSize=${pageSize}&category=${category}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        const newArticles = parsedData.articles || [];
        setArticles(prev => prev.concat(newArticles));
        setTotalArticles(parsedData.totalResults || 0);
        setHasMore(newArticles.length > 0);
    }

    return (
        <div className="container my-3">
            <h1 className='text-center news-heading'>
                NewsBites - Top Headlines from {category.charAt(0).toUpperCase() + category.slice(1)}
            </h1>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMore}
                hasMore={hasMore}
                endMessage={<p style={{ textAlign: 'center' }}>All articles loaded.</p>}
                loader={<Spinner />}
                style={{ overflow: "visible" }}
            >
                <div className="row">
                    {articles.map((element, index) => (
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

News.defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;