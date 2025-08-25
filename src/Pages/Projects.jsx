import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { motion } from 'framer-motion'

// Sample project data - replace with real projects later
const projects = [
  {
  id: 1,
  title: 'Tourist Car Reservation',
  description: 'A tourist car reservation application with multilingual support',
  image: '/assets/projects/B1.PNG',
  tags: ['Laravel', 'MySQL', 'JavaScript'],
  github: 'https://github.com/Aminesorati35/BestServiceTours.git',
  demo: 'https://bestservicetours.infinityfreeapp.com/'
},
  {
    id: 2,
    title: 'Car Rental Booking Platform',
    description: 'A car rental application with booking and multilingual support',
    image: '/assets/projects/R1.PNG',
    tags: ['React', 'Laravel', 'MySQL'],
    github: 'https://github.com/Aminesorati35/RentCar.git',
    demo: '#'
  },
  {
  id: 3,
  title: 'Restaurant Reservation Platform',
  description: 'A restaurant reservation website with booking and management features.',
  image: '/assets/projects/JN.PNG', // replace with your actual image path
  tags: ['React', 'Laravel', 'MySQL',"Framer Motion","Tailwind"],
  github: 'https://github.com/Aminesorati35/JANA_MARRAKECH.git',
  demo: 'https://janarestaurant.netlify.app/'
},
  {
  id: 4,
  title: 'Order Management App',
  description: 'An order management application with CRUD operations',
  image: '/assets/projects/GC.PNG', // replace with your actual image path
  tags: ['React', 'Laravel', 'MySQL'],
  github: '#',
  demo: '#'
},
  {
  id: 5,
  title: 'Search Film App',
  description: 'A movie search application using a public film API',
  image: '/assets/projects/S2.PNG', // replace with your actual image path
  tags: ['React', 'API'],
  github: 'https://github.com/Aminesorati35/Search_Film_App_With_React.git',
  demo: '#'
},
/*{
  id: 6,
  title: 'Order Management App',
  description: 'An order management application with CRUD operations',
  image: '/assets/projects/GC.PNG', // replace with your actual image path
  tags: ['React', 'Laravel', 'MySQL'],
  github: 'https://github.com/Aminesorati35/Order-Management',
  demo: '#'
},*/

];

const Projects = () => {
  return (
    <div data-aos="fade-up" className='flex flex-col items-center justify-center mt-30' >
      <motion.h1 
        className='section-title font-bold uppercase text-white text-4xl pb-5 mt-20' 
        data-aos="fade-up"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h1>
      
      <section className='grid sm:grid-cols-2 lg:grid-cols-3 w-[80%] mt-10 gap-8' data-aos="fade-up" >
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className='card glass flex flex-col relative h-100 overflow-hidden rounded-xl border-2 border-[#0f1d30] hover:border-[#0088ff] transition-all duration-300'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration:0.3 }}
            whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 136, 255, 0.2)'}}
            data-aos="zoom-in"
            data-aos-delay={index * 50}
          >
            <div className='overflow-hidden w-full h-90 bg-[#0a1525]'>
              <motion.img 
                src={project.image} 
                alt={project.title} 
                
                className='w-full  object-cover  ' 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className='p-4 flex flex-col flex-grow'>
              <h3 className='text-[#0088ff] font-bold text-xl mb-2'>{project.title}</h3>
              <p className='text-white text-sm mb-3'>{project.description}</p>
              
              <div className='flex flex-wrap gap-2 mb-4'>
                {project.tags.map((tag, i) => (
                  <span key={i} className='bg-[#0a1525] text-[#0088ff] text-xs px-2 py-1 rounded'>{tag}</span>
                ))}
              </div>
              
              <div className='flex justify-between mt-auto'>
                <motion.a 
                  href={project.github} 
                  className='text-white hover:text-[#0088ff] transition-colors'
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </motion.a>
                
                <motion.a 
                  href={project.demo==="#" ? '#home' : project.demo } 
                  className='text-white hover:text-[#0088ff] transition-colors'
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
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
