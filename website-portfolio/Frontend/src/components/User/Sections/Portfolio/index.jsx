import React, { useRef } from 'react'
import './style.css'
import { Carousel } from 'antd';
import { motion, useInView } from "framer-motion";
import { useGetBySectionAllImagesQuery } from '../../../../Redux/services/ImageCreateApi';

const container = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { data: imgData, isLoading, isError } = useGetBySectionAllImagesQuery("portfolio")


  if (isLoading) return <div style={{color:"white"}}>Загрузка...</div>;
  if (isError) return <div  style={{color:"white"}}>Ошибка при загрузке</div>;


  // Slayd nömrələrinə görə şəkilləri qruplaşdırir
  function groupImagesBySlideNumber(slideNumber) {
    return imgData?.data?.filter(image => image.slide === slideNumber);
  };
 
  return ( 
    <section id="Портфолио" className="section portfolio-section" ref={ref}>
      <div className='content'>
        <motion.div
       variants={container}
       initial="hidden"
       animate="visible" // birbaşa göstər
       className="portfolio-content">
          <motion.div
            className="box-img" 
            variants={container}
            initial="hidden"
            animate="visible" 
          >

            <motion.div className="portfolio-img " variants={item} >
              {/* Carousel 1 */}
              <Carousel autoplay dots={false}>
                {groupImagesBySlideNumber(1).map(image => (
                  <div key={image._id} className="carousel-image">
                    <img src={image.image} alt={`portf-img-${image.slide}`} />
                  </div>
                ))}
              </Carousel>
            </motion.div>

            <motion.div className="portfolio-img " variants={item}>
              {/* c-2 */}
              <Carousel autoplay dots={false}>
                {groupImagesBySlideNumber(2).map(image => (
                  <div key={image._id} className="carousel-image">
                    <img src={image.image} alt={`portf-img-${image.slide}`} />
                  </div>
                ))}
              </Carousel>
            </motion.div>
          </motion.div>

          <motion.div
            variants={item}
            className="portfolio-img portfolio-img-big"
            initial="hidden"
            animate="visible" 
          >
            {/* c-3 */}
            <Carousel autoplay dots={false}>
              {groupImagesBySlideNumber(3).map(image => (
                <div key={image._id} className="carousel-image">
                  <img src={image.image} alt={`portf-img-${image.slide}`} />
                </div>
              ))}
            </Carousel>
          </motion.div>

          <motion.div
            className="box-img"
            variants={container}
            initial="hidden"
            animate="visible" 
          >
            <motion.div className="portfolio-img " variants={item}>
              {/* C-4 */}
              <Carousel autoplay dots={false}>
                {groupImagesBySlideNumber(4).map(image => (
                  <div key={image._id} className="carousel-image">
                    <img src={image.image} alt={`portf-img-${image.slide}`} />
                  </div>
                ))}
              </Carousel>
            </motion.div>

            <motion.div className="portfolio-img " variants={item}>
              {/* C-5 */}
              <Carousel autoplay dots={false}>
                {groupImagesBySlideNumber(5).map(image => (
                  <div key={image._id} className="carousel-image">
                    <img src={image.image} alt={`portf-img-${image.slide}`} />
                  </div>
                ))}
              </Carousel>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio