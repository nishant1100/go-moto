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
              <div className="readMoreWrapper">
                <button className="trreadBtn" onClick={() => openModal({
                  img,
                  title: [
                    "How To Choose The Right Car",
                    "Enjoy Speed, Choice & Total Control",
                    "Which plan is right for me?",
                  ][idx],
                  author: "Editor",
                  date: "12 April 2024",
                  time: "2 Min Read",
                  content: `Choosing the right car is a significant decision that depends on various personal and practical factors.
                   Whether you are a first-time buyer or looking to upgrade your vehicle, the key is to identify your needs and match them with what the market offers. 
                   Start by considering how you plan to use the car. For example, if you have a long daily commute, prioritize fuel efficiency and comfort. 
                   If you often travel with family or need more space, look into SUVs or sedans with ample legroom and trunk space. 
                   On the other hand, those who enjoy driving or need more power for rough terrains may benefit from a vehicle with a stronger engine, such as a four-wheel drive or crossover.
                   Budget is another critical factor. It’s important to not only consider the upfront cost of the vehicle but also the ongoing expenses such as fuel, insurance, taxes, and maintenance. 
                   Buying within your financial means ensures that your vehicle doesn't become a burden in the long run. 
                   It's also wise to compare both new and used car options—while new cars offer warranties and the latest technology, used cars can be more affordable and still reliable if well maintained.
                   Lastly, always take a test drive before making your final decision. This gives you the opportunity to evaluate how the car feels, how responsive it is, and whether it suits your driving style. 
                   Researching customer reviews, reliability ratings, and resale value is also essential for long-term satisfaction.
                  Choosing the right car isn't just about appearance or brand—it’s about finding the perfect balance of functionality, comfort, and cost for your lifestyle.`,
                })}>Continue reading</button>
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
              <button className="readBtn" onClick={() => openModal(post)}>Continue reading</button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal Popup */}
      {modalData && (
  <div className="modalOverlay" onClick={closeModal}>
    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
      <button className="closeModal" onClick={closeModal}>×</button>

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
        <p>{modalData.content}</p>
      </div>
    </div>
  </div>
)}

    </section>
  );
};

export default BlogPage;
