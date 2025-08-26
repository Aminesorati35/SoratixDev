import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Pages/Navbar'
import './App.css'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import Contact from './Pages/Contact'
import ParticleBackground from './components/ParticleBackground'
import { useEffect, useState } from 'react'
import ImagesModal from './components/ImagesModal';

function App() {
  const [active, setActive] = useState('home');
  const [modalImages, setModalImages] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleOpenImageModal = (images)=>{
    setModalImages(images)
    setIsModalOpen(true)
  }
   const handleCloseModal = () => {
    setIsModalOpen(false)
    setModalImages([])
  }





  const handleClick = (section)=>{
    setActive(section)
  }
useEffect(() => {
  AOS.init({
    duration: 500, 
    once: false, 
    mirror: true, 
    easing: 'ease-in-out', 

  });
}, []);



  return (
    <>
      <ParticleBackground />
      <Navbar handleClick={handleClick} active={active} />
      <div id="home" className="min-h-200 "><Home handleClick={handleClick} /></div>
      <div id="about" className="min-h-200 py-10"><About /></div>
      <div id="projects" className="min-h-200 py-10"><Projects onOpenImageModal={handleOpenImageModal} /></div> 
      <div id="contact" className="min-h-200 py-10"><Contact /></div>       
       <ImagesModal 
       images={modalImages}
       isOpen={isModalOpen}
       onClose={handleCloseModal}
     />
      
      
      <footer className="bg-[#0a1525] text-white text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} Amine Sekhal. All rights reserved.</p>
        <p className="text-sm text-[#0088ff] mt-2">Full-Stack Web Developer & Designer</p>
      </footer>
    </>
  )
}

export default App
