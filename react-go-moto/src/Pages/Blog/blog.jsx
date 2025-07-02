import React, { useState } from "react";
import "./blog.css";
import trending1 from "../../assets/blog1.jpg";
import trending2 from "../../assets/blog2.jpg";
import trending3 from "../../assets/blog4.jpg";
import post1 from "../../assets/post1.jpg";
import post2 from "../../assets/post2.jpeg";
import { User } from "lucide-react";

const BlogPage = () => {
  const [modalData, setModalData] = useState(null);

  const openModal = (post) => {
    setModalData(post);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const blogPosts = [
    {
      img: post1,
      title: "A Review Of Cars With Advanced Infotainment Systems",
      author: "Daxtren",
      date: "Jan 10 2024",
      time: "3 Min Read",
      content: `This article dives deep into modern infotainment systems in cars, analyzing user interfaces, voice controls, connectivity with mobile devices, and how these enhance the driving experience.`,
    },
    {
      img: post2,
      title: "The Rise of Electric Cars in Nepal",
      author: "AutoBuzz",
      date: "Feb 15 2024",
      time: "4 Min Read",
      content: `Nepal is gradually embracing electric mobility. We explore current EV models in the market, available charging stations, government incentives, and how electric cars are shaping Nepal's future.`,
    },
    {
      img: post1,
      title: "Tips for First-Time Car Renters",
      author: "TravelNepal",
      date: "March 3 2024",
      time: "5 Min Read",
      content: `Insurance types, fuel policies, vehicle inspections, and hidden charges—everything a new renter needs to know before taking their first drive.`,
    },
    {
      img: post2,
      title: "How To Maintain A Rental Car Like Your Own",
      author: "AutoGuru",
      date: "April 8 2024",
      time: "3 Min Read",
      content: `Even if you're renting a car, maintaining it well keeps you safe and helps the rental agency. Learn cleanliness tips, handling advice, and minor checks you should perform.`,
    },
  ];

  // Content for each trending topic
  const trendingPosts = [
    {
      img: trending1,
      title: "How To Choose The Right Car",
      author: "Sishir",
      date: "2 July 2025",
      time: "2 Min Read",
      content: `
        <p>Choosing the right car depends on your lifestyle, needs, and budget. Consider how often you drive, fuel economy, seating capacity, cargo space, and whether you need features like all-wheel drive or advanced infotainment. For city driving, compact cars might be ideal; for families, consider SUVs or sedans. Always test drive and compare reviews before making a purchase.</p>
      `,
    },
    {
      img: trending2,
      title: "Enjoy Speed, Choice & Total Control",
      author: "Roshan",
      date: "1l July 2025",
      time: "2 Min Read",
      content: `
        <p>Modern car rentals and ownership programs give you flexibility to pick the perfect vehicle for any situation—whether you're craving performance, efficiency, or luxury. Speed doesn’t just mean fast engines; it also means fast booking, instant upgrades, and adaptive driving modes that put you in control. Explore options that match your lifestyle and driving mood.</p>
      `,
    },
    {
      img: trending3,
      title: "Which Plan Is Right For Me?",
      author: "Manish",
      date: "12 June 2025",
      time: "2 Min Read",
      content: `
        <p>Choosing the right plan—whether for leasing, renting, or purchasing—comes down to how frequently you use the vehicle, your budget, and long-term goals. Leasing offers flexibility and lower monthly costs, while purchasing gives full ownership. Evaluate insurance packages, mileage limits, and maintenance services included in each plan before deciding.</p>
      `,
    },
  ];

  return (
    <section className="blogPage">
      <h1 className="header">Blog posts & news</h1>

      <div className="trendingSection">
        <h2>Trending blogs</h2>
        <div className="trendingGrid">
          {trendingPosts.map((post, idx) => (
            <div className="trendingCard" key={idx}>
              <img src={post.img} alt={`trend-${idx}`} />
              <h4>{post.title}</h4>
              <p>{post.date}</p>
              <div className="readMoreWrapper">
                <button className="trreadBtn" onClick={() => openModal(post)}>
                  Continue reading
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="separator" />

      <div className="allPostsSection">
        <h2>All posts</h2>

        {blogPosts.map((post, index) => (
          <div className="postCard" key={index}>
            <img src={post.img} alt={post.title} />
            <div className="postContent">
              <h3>{post.title}</h3>
              <div className="meta">
                <User size={16} />
                <span> {post.author}</span>
                <span> | {post.date}</span>
                <span> • {post.time}</span>
              </div>
              <p>{post.content.slice(0, 150)}...</p>
              <button className="readBtn" onClick={() => openModal(post)}>
                Continue reading
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal Popup */}
      {modalData && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="closeModal" onClick={closeModal}>
              ×
            </button>

            {/* Image at top */}
            <img src={modalData.img} alt="modal" className="modalImageTop" />

            {/* Text content below image */}
            <div className="textContent">
              <h2>{modalData.title}</h2>
              <div className="meta">
                <User size={16} />
                <span>{modalData.author}</span>
                <span> | {modalData.date}</span>
                <span> • {modalData.time}</span>
              </div>
              <div
                className="modalHtmlContent"
                dangerouslySetInnerHTML={{ __html: modalData.content }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogPage;
