import React, { useEffect, useState } from 'react';
import { Collapse, Carousel } from 'antd';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './style.css';
import "antd/dist/reset.css";

import { useGetBySectionAllImagesQuery } from '../../../../Redux/services/ImageCreateApi';

const initialServicesData = [
  {
    key: '1',
    title: 'Экстерьер',
    description: (
      <div className="service-description">
        The CYLIND studio specializes in creating powerful and memorable first impressions for future buildings. Exterior design plays a crucial role in overall aesthetic appeal, incorporating elements such as architectural features, facades, and color schemes.
      </div>
    ),
  },
  {
    key: '2',
    title: 'Интерьер',
    description: (
      <div className="service-description">
        In architectural design, interior spaces are as essential as exteriors. Interior design involves meticulous planning of room layouts, furniture placement, and lighting. With our 3D architectural visualization services, architects and designers can create realistic representations that enhance both comfort and functionality through immersive, photorealistic designs.
      </div>
    ),
  },
  {
    key: '3',
    title: 'Анимация',
    description: (
      <div className="service-description">
        Animation in architectural visualization offers dynamic visual representations that vividly illustrate a building's functionality and aesthetics. By partnering with our 3D visualization company, clients can see their projects come to life through captivating animations that showcase their design intentions.
      </div>
    ),
  },
  {
    key: '4',
    title: 'Виртуальный тур',
    description: (
      <div className="service-description">
        Our 3D architectural visualization studio offers immersive virtual tours, enabling clients to explore both interior and exterior environments from a 360-degree perspective. This innovative approach provides a realistic understanding of layouts and design concepts, making it an indispensable tool for real estate marketing and client engagement.
      </div>
    ),
  },
  {
    key: '5',
    title: 'Планы этажей',
    description: (
      <div className="service-description">
        Floorplans in architecture serve as the foundational layout designs of buildings. They allow designers and clients to understand spatial relationships and functional flow within structures. Our floorplan visualizations provide a clear and accurate representation of how a space will be organized and utilized.
      </div>
    ),
  },
  {
    key: '6',
    title: 'Моделирование',
    description: (
      <div className="service-description">
        Modeling in architecture involves creating three-dimensional digital representations of buildings, allowing architects and designers to visualize and manipulate the structure. These models provide a tangible look into how the building will appear and function before it's constructed.
      </div>
    ),
  },
];

function Service() {
  const [services, setServices] = useState(initialServicesData);
  const [activeKey, setActiveKey] = useState("1");
  const [carouselImages, setCarouselImages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: imgData, isLoading, isError } = useGetBySectionAllImagesQuery("service");

  useEffect(() => {
   
    const token = localStorage.getItem('token');
    setIsAdmin(!!token); 
  }, []);

  useEffect(() => {
    if (imgData?.data) {
      const exteriorImages = imgData.data.filter(
        image => image.category.name.toLowerCase() === "exterior"
      );
      const imageUrls = exteriorImages.map(img => img.image);
      setCarouselImages(imageUrls);
    }
  }, [imgData]);

  const handleCollapseChange = (key) => {
    const selectedService = services.find(service => service.key === String(key));
    if (selectedService) {
      setActiveKey(key);

      const matchedImages = imgData?.data?.filter(
        image => image.category.name.toLowerCase() === selectedService.title.toLowerCase()
      );
      const imageUrls = matchedImages?.map(img => img.image);

      setCarouselImages(imageUrls ?? []);
    }
  };

  const handleDragEnd = (result) => {

    if (!isAdmin) return;
    
    const { source, destination } = result;
    if (!destination) return;

    const reordered = Array.from(services);
    const [removed] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, removed);
    setServices(reordered);
  };

  if (isLoading) return <div style={{ color: "white" }}>Loading...</div>;
  if (isError) return <div style={{ color: "white" }}>Error loading</div>;


  if (!isAdmin) {
    return (
      <section id="Услуга" className="services-section">
        <div className="services-overlay"></div>

        <div className="services-content">
          <div className="services-navigation">
            <Collapse
              accordion
              activeKey={activeKey}
              onChange={handleCollapseChange}
              bordered={false}
              className="services-collapse"
              items={services.map((service, index) => ({
                key: service.key,
                label: (
                  <div className="panel-header">
                    <span style={{ marginRight: "10px" }}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className='service-title'>{service.title}</span>
                  </div>
                ),
                children: service.description,
              }))}
            />
          </div>
        </div>

        <div className="slider">
          {carouselImages.length > 0 && (
            <Carousel effect="fade" autoplay autoplaySpeed={5000} dots={false}>
              {carouselImages.map((src, index) => (
                <div key={index} className="carousel-slide">
                  <img src={src} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </section>
    );
  }

  // Admin version with drag and drop
  return (
    <section id="услуга" className="services-section">
      <div className="services-overlay"></div>

      <div className="services-content">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="services">
            {(provided) => (
              <div
                className="services-navigation"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <Collapse
                  accordion
                  activeKey={activeKey}
                  onChange={handleCollapseChange}
                  bordered={false}
                  className="services-collapse"
                  items={services.map((service, index) => ({
                    key: service.key,
                    label: (
                      <Draggable
                        key={service.key}
                        draggableId={service.key}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="panel-header"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                          >
                            <span style={{ marginRight: "10px" }}>
                              {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <span className='service-title'>{service.title}</span>
                          </div>
                        )}
                      </Draggable>
                    ),
                    children: service.description,
                  }))}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="slider">
        {carouselImages.length > 0 && (
          <Carousel effect="fade" autoplay autoplaySpeed={5000} dots={false}>
            {carouselImages.map((src, index) => (
              <div key={index} className="carousel-slide">
                <img src={src} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}

export default Service;