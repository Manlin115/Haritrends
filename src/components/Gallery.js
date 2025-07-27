import React from 'react';

const Gallery = () => {
  const dresses = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      title: "Elegant Evening Dress",
      description: "Perfect for special occasions and formal events"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      title: "Casual Summer Dress",
      description: "Light and comfortable for everyday wear"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      title: "Business Professional",
      description: "Sophisticated styles for the modern woman"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      title: "Party Wear",
      description: "Stand out at any celebration"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      title: "Vintage Collection",
      description: "Timeless classics with a modern twist"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      title: "Bridal Collection",
      description: "Make your special day unforgettable"
    }
  ];

  return (
    <section id="gallery" className="section">
      <h2>Our Collection</h2>
      <div className="gallery-grid">
        {dresses.map(dress => (
          <div key={dress.id} className="gallery-item">
            <img src={dress.image} alt={dress.title} />
            <div className="gallery-overlay">
              <h3>{dress.title}</h3>
              <p>{dress.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;