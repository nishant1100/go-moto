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
      content: `This article dives deep into modern infotainment systems in cars, analyzing user interfaces, voice controls, connectivity with mobile devices, and how these enhance the driving experience.
      Many car rental companies now feature vehicles loaded with high-tech infotainment systems. 
      These systems typically include large touchscreens, smartphone integration (such as Apple CarPlay and Android Auto), voice controls, and even real-time navigation with traffic updates. 
      For travelers, this means you can stay connected, entertained, and on track without taking your eyes off the road.
      Some standout models in this category include the Hyundai Tucson, Kia Sportage, and Toyota Fortuner, all offering intuitive touchscreen interfaces, crisp displays, and easy-to-use controls. 
      For a more premium experience, cars like the BMW X5, Audi Q5, and Mercedes-Benz GLE elevate the game with AI-powered voice commands, gesture control, and customizable displays.
      Advanced infotainment isn’t just about entertainment—it also boosts safety. Features like reverse camera display, parking assist, and hands-free calling help reduce distractions and improve driver focus. 
      For families and long-distance travelers, built-in Wi-Fi hotspots, USB charging ports, and rear-seat entertainment screens ensure a smoother ride for everyone.
      When renting a car, checking the infotainment features can significantly enhance your trip. 
      Whether you’re navigating unfamiliar roads, streaming your favorite playlist, or taking calls on the go, a smart infotainment system makes your drive more enjoyable and efficient.
      So next time you rent, don’t just look at engine power or fuel economy—pay attention to what’s inside the dashboard. Your comfort, entertainment, and connectivity may just depend on it.`,
    },
    {
      img: post2,
      title: "The Rise of Electric Cars in Nepal",
      author: "AutoBuzz",
      date: "Feb 15 2024",
      time: "4 Min Read",
      content: `Nepal is gradually embracing electric mobility. 
      We explore current EV models in the market, available charging stations, government incentives, and how electric cars are shaping Nepal's future.
      Nepal is experiencing a quiet but powerful revolution on its roads—the rapid rise of electric cars. In recent years, electric vehicle (EV) adoption has skyrocketed, with over 80% of new four-wheeler imports in Nepal being electric as of 2024.
       This marks a massive shift from just a few years ago when fuel-powered vehicles dominated the market. The primary driver behind this shift is Nepal’s unique energy profile.
        With more than 90% of its electricity generated from hydropower, EVs in Nepal are not only cost-efficient but also incredibly eco-friendly. Unlike many other countries, where EVs still rely partly on fossil-fuel-generated electricity, Nepal's clean energy grid gives electric cars a truly green edge.
        Government policy has played a critical role as well. Heavy import taxes on petrol and diesel vehicles—once up to 300%—have been significantly reduced for EVs, making them far more affordable. 
        Banks have also introduced favorable financing options, making it easier for individuals and businesses to make the switch. Brands like BYD, MG, Tata, Hyundai, and Neta are seeing rising popularity, offering a variety of electric models suited for different budgets and needs.
        Despite this progress, challenges remain. The country's charging infrastructure is still developing, with limited charging stations in remote areas and cities alike. 
        Long-distance travel can be difficult without a reliable charging network, especially outside major urban hubs like Kathmandu and Pokhara. Additionally, while private EV use is growing rapidly, public transportation still relies heavily on diesel-powered buses and trucks.`,
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
        <p>Choosing the right car depends on your lifestyle, needs, and budget. Consider how often you drive, fuel economy, seating capacity, cargo space, and whether you need features like all-wheel drive or advanced infotainment.
         For city driving, compact cars might be ideal; for families, consider SUVs or sedans. Always test drive and compare reviews before making a purchase.
         Daily rentals are ideal for quick errands, one-day events, or short city trips. They offer flexibility and are perfect for those who don’t need a vehicle for more than 24–48 hours.
        If you're visiting a new city for a day or need a temporary replacement while your own car is being serviced, this plan fits well.
        Weekly rentals are best for vacations or business trips that span several days. They often come with discounted rates compared to daily rentals and give you the freedom to explore without worrying about returning the car too soon. 
       If you’re planning a family getaway, this is often the most cost-effective and comfortable option.
       Monthly or long-term plans are perfect for remote workers, students, or anyone staying in one place for an extended time.
        These plans provide better value, more stability, and often include maintenance and support perks. You also avoid the hassle of renewing short-term agreements over and over again.</p>`,
    },
    {
      img: trending2,
      title: "Enjoy Speed, Choice & Total Control",
      author: "Roshan",
      date: "1l July 2025",
      time: "2 Min Read",
      content: `
        <p>Modern car rentals and ownership programs give you flexibility to pick the perfect vehicle for any situation—whether you're craving performance, efficiency, or luxury. 
        Speed doesn’t just mean fast engines; it also means fast booking, instant upgrades, and adaptive driving modes that put you in control.
         Explore options that match your lifestyle and driving mood.
         Speed starts with a seamless online booking process. With just a few clicks, users can browse a wide range of vehicles, compare prices, and secure their rental instantly. 
         No more waiting in long queues or dealing with confusing paperwork. 
         Whether you need a car urgently or are planning ahead, efficiency is built into every step.
         Choice is just as important. Every traveler has different needs—some prefer compact cars for urban travel, while others may want SUVs for family trips or luxury vehicles for special occasions.
          A quality rental platform provides diverse options so that every customer finds the right fit. 
          You can filter by brand, size, price range, fuel type, and more to find a vehicle that matches your style and purpose.
          Finally, total control gives renters the confidence to shape their journey.
          From flexible rental durations to add-ons like GPS, insurance, or child seats, customers have the tools to customize their experience. Want to pick up in one city and drop off in another?
           No problem. Need to extend your rental or switch cars mid-trip? That’s possible too.</p>`,
    },
    {
      img: trending3,
      title: "Which Plan Is Right For Me?",
      author: "Manish",
      date: "12 June 2025",
      time: "2 Min Read",
      content: `
        <p>Choosing the right plan whether for leasing, renting, or purchasing comes down to how frequently you use the vehicle, your budget, and long-term goals.
         Leasing offers flexibility and lower monthly costs, while purchasing gives full ownership. 
         Evaluate insurance packages, mileage limits, and maintenance services included in each plan before deciding.
         Start by considering the purpose of your trip and the number of passengers. If you're traveling solo or as a couple, a compact or economy car can save you money on fuel and rental costs.
          For family trips or group travel, an SUV or a minivan offers more space and comfort. Planning a special occasion? Luxury cars can add a touch of elegance and style to your journey.
         Next, think about the destination and terrain. For city driving, smaller cars are easier to park and maneuver through traffic.
         If you're heading to hilly or off-road locations, a vehicle with four-wheel drive or higher ground clearance is more suitable. 
         Don’t forget to check for luggage space, especially if you’re carrying multiple bags or equipment.
         Fuel efficiency, rental price, insurance coverage, and extra features like GPS or child seats are also important factors. 
         Always compare options, read reviews, and check for hidden fees before booking.</p>`,
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
