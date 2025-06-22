import React from "react";
import "./blog.css";
import trending1 from "../../assets/blog1.jpg";
import trending2 from "../../assets/blog2.jpg";
import trending3 from "../../assets/blog3.png";
import post1 from "../../assets/post1.jpg";
import post2 from "../../assets/post2.jpeg";
import { User } from "lucide-react";

const BlogPage = () => {
  return (
    <section className="blogPage">
      <h1 className="header">Blog posts & news</h1>

      <div className="trendingSection">
        <h2>Trending blogs</h2>
        <div className="trendingGrid">
          {[trending1, trending2, trending3].map((img, idx) => (
            <div className="trendingCard" key={idx}>
              <img src={img} alt={`trend-${idx}`} />
              <h4>
                {[
                  "How To Choose The Right Car",
                  "Enjoy Speed, Choice & Total Control",
                  "Which plan is right for me?",
                ][idx]}
              </h4>
              <p>News / 12April 2024</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="separator" />

      <div className="allPostsSection">
        <h2>All posts</h2>
        {[post1, post2].map((img, idx) => (
          <div className="postCard" key={idx}>
            <img src={img} alt={`post-${idx}`} />
            <div className="postContent">
              <h3>A Review Of Cars With Advanced Infotainment Systems</h3>
              <div className="meta">
                <User size={16} />
                <span> Daxtren</span>
                <span> | Jan 10 2024</span>
                <span> • 3 Min Read</span>
              </div>
              <p>
                Lorem Ipsum Dolor Sit Amet Consectetur. Consectetur Risus Quis
                Diam Hendrerit. Interdum Mattis In Sed Diam Egestas Metus At
                Duis Commodo. Cursus Quis Cursus Dignissim Egestas Sollicitudin
                Tristique Quis. Orci Neque Quis Porttitor Eu Amet.
              </p>
              <button className="readBtn">Read full article...</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
