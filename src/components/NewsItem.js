import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props;
        return (
            <div className="card h-100">
                <div className='cardd'>
                    <span className="badge-position rounded-pill bg-danger"> {source}
                    </span>
                </div>
                <img
                    src={imageUrl ? imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLDP5s2j9u1x86fOb7kNKXanJeMn8zZ30ZQ&s"}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLDP5s2j9u1x86fOb7kNKXanJeMn8zZ30ZQ&s";
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(this.props.publishedAt).toLocaleDateString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}

export default NewsItem
