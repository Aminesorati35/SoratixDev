import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({handleClick, active}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
        console.log(scrolled)
      } else {
        setScrolled(false);
        console.log(scrolled)
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const linkClass = (section) =>
    `nav-link pb-1.5 transition ease-out duration-400 ${active === section ? 'active-link text-[#0088ff]' : 'text-white'}`;

  const mobileLinkClass = (section) =>
    `block py-3 text-center transition-all duration-300 ${active === section ? 'active-link text-[#0088ff]' : 'text-white hover:text-[#0088ff]'}`;
    
  const handleMobileClick = (section) => {
    handleClick(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full top-0 z-40 transition-all duration-300 p-2 ${scrolled ? 'bg-[#0a1525] shadow-lg' : 'bg-[#0f1d30]'}`}>
      {/* Desktop Navigation */}
      <div className='hidden md:flex justify-between items-center text-white p-5 font-semibold text-lg h-17 max-w-7xl mx-auto'>
        <div className='flex items-center'>
          <img src='/assets/logo.png' alt='SoratixDev Logo' className='h-16 mr-3 nav-logo' />         
        </div>
        <div className='flex gap-10'>
        <motion.a 
          href="#home" 
          onClick={() => handleClick('home')} 
          className={linkClass('home')}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.a>
        <motion.a 
          href="#about" 
          onClick={() => handleClick('about')} 
          className={linkClass('about')}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          About
        </motion.a>
        <motion.a 
          href="#projects" 
          onClick={() => handleClick('projects')} 
          className={linkClass('projects')}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          Projects
        </motion.a>
        <motion.a 
          href="#contact" 
          onClick={() => handleClick('contact')} 
          className={linkClass('contact')}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact
        </motion.a>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className='md:hidden flex justify-between items-center px-5 py-4'>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex items-center'
        >
          <img src='/assets/logo.png' alt='SoratixDev Logo' className='h-15 mr-2 nav-logo' />         
        </motion.div>
        
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='text-white p-2 focus:outline-none'
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon  icon={mobileMenuOpen ? faXmark : faBars} size="2x" />
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className='md:hidden bg-[#0a1525] shadow-lg py-3'
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <a href="#home" onClick={() => handleMobileClick('home')} className={mobileLinkClass('home')}>Home</a>
          <a href="#about" onClick={() => handleMobileClick('about')} className={mobileLinkClass('about')}>About</a>
          <a href="#projects" onClick={() => handleMobileClick('projects')} className={mobileLinkClass('projects')}>Projects</a>
          <a href="#contact" onClick={() => handleMobileClick('contact')} className={mobileLinkClass('contact')}>Contact</a>
        </motion.div>
      )}
    </nav>
  ) 
}

export default Navbar
