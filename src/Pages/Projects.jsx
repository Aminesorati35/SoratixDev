import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faChevronLeft, faChevronRight, faCircle, faClose, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'

const Projects = ({onOpenImageModal}) => {
  const handleGetAffichedImages = (images) => {
    onOpenImageModal(images)
  }
  
  
  
  
  return (
    <div data-aos="fade-up" className='flex flex-col items-center justify-center mt-20'>
      <motion.h1 
        className='section-title font-bold uppercase text-white text-4xl pb-5' 
        data-aos="fade-up"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h1>
      
      <section className='grid sm:grid-cols-2 lg:grid-cols-3 w-[80%] mt-10 gap-8' data-aos="fade-up">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className='card glass flex flex-col relative h-auto overflow-hidden rounded-xl border-2 border-[#0f1d30] hover:border-[#0088ff] transition-all duration-300'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 136, 255, 0.2)' }}
            data-aos="zoom-in"
            data-aos-delay={index * 50}
          >
            <div className='overflow-hidden w-full h-60 bg-[#0a1525]'>
              <motion.img 
                onClick={() => handleGetAffichedImages(project.images)}
                src={project.images[0]} 
                alt={project.title} 
                className='w-full h-full object-cover cursor-pointer' 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className='p-4 flex flex-col flex-grow'>
              <h3 
                className='text-[#0088ff] font-bold text-xl mb-2 cursor-pointer hover:text-[#087adf] transition-colors' 
                onClick={() => handleGetAffichedImages(project.images)}
              >
                {project.title}
              </h3>
              <p className='text-white text-sm mb-3 flex-grow'>{project.description}</p>
              
              <div className='flex flex-wrap gap-2 mb-4'>
                {project.tags.map((tag, i) => (
                  <span key={i} className='bg-[#0a1525] text-[#0088ff] text-xs px-2 py-1 rounded border border-[#0088ff]/20'>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className='flex justify-between mt-auto'>
                <motion.a 
                  href={project.github} 
                  className='text-white hover:text-[#0088ff] transition-colors'
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </motion.a>
                
                <motion.a 
                  href={project.demo === "#" ? '#home' : project.demo} 
                  className='text-white hover:text-[#0088ff] transition-colors'
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLink} size="lg" />
                </motion.a>
              </div>
            </div>
          </motion.div>     
        ))}   
      </section>     
     
    </div>
  )
}

export default Projects