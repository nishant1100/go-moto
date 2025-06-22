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
        <p>News / 12 April 2024</p>

        {/* ✅ Button Wrapper */}
        <div className="readMoreWrapper">
          <button className="trreadBtn">Continue reading</button>
        </div>
      </div>
    ))}
  </div>
</div>



      <hr className="separator" />

      <div className="allPostsSection">
  <h2>All posts</h2>

  {/* Post 1 */}
  <div className="postCard">
    <img src={post1} alt="Post 1" />
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
      <button className="readBtn">Continue reading</button>
    </div>
  </div>

  {/* Post 2 */}
  <div className="postCard">
    <img src={post2} alt="Post 2" />
    <div className="postContent">
      <h3>The Rise of Electric Cars in Nepal</h3>
      <div className="meta">
        <User size={16} />
        <span> AutoBuzz</span>
        <span> | Feb 15 2024</span>
        <span> • 4 Min Read</span>
      </div>
      <p>
        With the global shift towards electric mobility, Nepal is
        witnessing an increase in the adoption of EVs. This article
        explores the growing infrastructure and benefits of electric cars.
      </p>
      <button className="readBtn">Continue reading</button>
    </div>
  </div>

  {/* Post 3 */}
  <div className="postCard">
    <img src={post1} alt="Post 3" />
    <div className="postContent">
      <h3>Tips for First-Time Car Renters</h3>
      <div className="meta">
        <User size={16} />
        <span> TravelNepal</span>
        <span> | March 3 2024</span>
        <span> • 5 Min Read</span>
      </div>
      <p>
        Renting a car for the first time? Here's everything you need to
        know about insurance, vehicle checks, fuel policies, and
        hidden fees to avoid.
      </p>
      <button className="readBtn">Continue reading</button>
    </div>
  </div>

  {/* Post 4 */}
  <div className="postCard">
    <img src={post2} alt="Post 4" />
    <div className="postContent">
      <h3>How To Maintain A Rental Car Like Your Own</h3>
      <div className="meta">
        <User size={16} />
        <span> AutoGuru</span>
        <span> | April 8 2024</span>
        <span> • 3 Min Read</span>
      </div>
      <p>
        Even if you’re renting a car, keeping it clean and maintained
        benefits both the renter and the rental service. Here's a
        practical guide to responsible car use.
      </p>
      <button className="readBtn">Continue reading</button>
    </div>
  </div>
</div>

    </section>
  );
};

export default BlogPage;
