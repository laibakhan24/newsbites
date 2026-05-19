import React from 'react';

const About = () => {
    // const theme = darkMode ? 'dark' : 'light';

    const features = [
        {
            icon: '📰',
            title: 'Real-Time Headlines',
            text: 'Fetches the latest breaking news from trusted global sources, updated continuously throughout the day.',
        },
        {
            icon: '🗂️',
            title: 'Category Browsing',
            text: 'Explore news by topic — Business, Entertainment, Health, Science, Sports, and Technology.',
        },
        {
            icon: '♾️',
            title: 'Infinite Scroll',
            text: 'Seamlessly load more articles as you scroll — no pagination, no interruptions.',
        },
        {
            icon: '🌗',
            title: 'Dark / Light Mode',
            text: 'Switch between dark and light themes instantly to suit your reading environment.',
        },
        {
            icon: '🔗',
            title: 'Source Attribution',
            text: 'Every article shows its original source and author, with a direct link to read the full story.',
        },
        {
            icon: '⚡',
            title: 'Fast & Lightweight',
            text: 'Built with performance in mind — quick load times and a smooth, responsive experience on all devices.',
        },
    ];

    const categories = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];
    const techStack = ['React', 'Node.js', 'Express', 'NewsAPI', 'Bootstrap 5', 'Vercel', 'Render'];

    return (
        <div className="about-page">
            <div className="container">

                {/* Hero */}
                <div className="about-hero">
                    <h1 className="about-hero-title">
                        About <span className="about-accent">NewsBites</span>
                    </h1>
                    <p className="about-hero-subtitle">
                        Your daily digest of top headlines from around the world — curated by category,
                        delivered instantly, and designed for a comfortable reading experience.
                    </p>
                    <div className="about-divider"></div>
                </div>

                {/* Features Grid */}
                <div className="mb-5">
                    <h2 className="about-section-title">What NewsBites Offers</h2>
                    <div className="row g-4">
                        {features.map((f, i) => (
                            <div className="col-12 col-sm-6 col-md-4" key={i}>
                                <div className="about-card">
                                    <div className="about-card-icon">{f.icon}</div>
                                    <h5 className="about-card-title">{f.title}</h5>
                                    <p className="about-card-text">{f.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories */}
                <div className="text-center mb-5">
                    <h2 className="about-section-title">News Categories</h2>
                    <p className="about-muted mb-3">Browse headlines across 7 curated topics.</p>
                    <div>
                        {categories.map((cat, i) => (
                            <span key={i} className="about-category-badge">{cat}</span>
                        ))}
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="text-center mb-5">
                    <h2 className="about-section-title">Built With</h2>
                    <p className="about-muted mb-3">A modern full-stack setup for reliability and speed.</p>
                    <div>
                        {techStack.map((tech, i) => (
                            <span key={i} className="about-tech-badge">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Footer note */}
                <div className="about-footer">
                    <p>
                        NewsBites is a personal project built for learning and exploration. <br />
                        News data is powered by <strong>NewsAPI</strong>.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default About;