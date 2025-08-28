import { faChevronLeft, faChevronRight, faClose } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ImagesModal = ({images,isOpen,onClose}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullSize, setIsFullSize] = useState(false)
  const [imageKey, setImageKey] = useState(0)
  
  useEffect(() => {
    if (isOpen && images.length > 0) {
      setCurrentIndex(0)
      setIsFullSize(false)
      setImageKey(0)
    }
  }, [isOpen, images])
  const changeImg = (type) => {
    if (type === "next") {
      if (currentIndex === images.length - 1) {
        setCurrentIndex(0)
      } else {
        setCurrentIndex((prev) => prev + 1)
      }
    } else if (type === "prev") {
      if (currentIndex === 0) {
        setCurrentIndex(images.length - 1)
      } else {
        setCurrentIndex((prev) => prev - 1)
      }
    }
    setImageKey(prev => prev + 1) 
  }
  const changeImgByCircle = (index) => {
    setCurrentIndex(index)
    setImageKey(prev => prev + 1) // Force re-animation
  }
    if (!isOpen || images.length === 0) return null
  return (
    <div>
      <motion.div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex justify-center items-center p-4" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="relative w-full max-w-6xl max-h-[95vh] bg-gradient-to-br from-[#0a1525] via-[#0f1d35] to-[#152a45] rounded-2xl overflow-hidden shadow-2xl border border-[#0088ff]/20"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.7, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 100 }}
            transition={{ 
              duration: 0.6, 
              type: "spring", 
              stiffness: 100,
              damping: 15
            }}
          >
            {/* Header with controls */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 z-20">
              <div className="flex justify-between items-center">
                <motion.div 
                  className="text-white/80 text-sm font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentIndex + 1} / {images.length}
                </motion.div>
                
                <div className="flex gap-3">
                  {/* Toggle Size Button */}
                  <button  
                    onClick={() => setIsFullSize(!isFullSize)}  
                    className="p-2 px-4 flex justify-center items-center rounded-full bg-white/10 backdrop-blur-md hover:bg-red-500/20 cursor-pointer hover:scale-105 transition-all duration-300 text-white text-sm font-medium border border-white/20"
                   
                  >
                    <span                     
                    >
                      {isFullSize ? 'Fit Screen' : 'Full Size'}
                    </span>
                  </button>

                  {/* Close Button */}
                  <button  
                    onClick={onClose}  
                    className="p-3 w-11 h-11 flex justify-center items-center rounded-full bg-white/10 backdrop-blur-md hover:bg-red-500/20 transition-all duration-300 shadow-lg border border-white/20 hover:scale-105 cursor-pointer"
                    
                  >
                    <FontAwesomeIcon className="text-white text-lg" icon={faClose} />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div className={`relative w-full h-[70vh] ${isFullSize ? 'overflow-auto' : 'overflow-hidden'} flex ${isFullSize ? 'items-start justify-start' : 'items-center justify-center'}`}>
              <motion.img 
                key={`${currentIndex}-${imageKey}`}
                src={images[currentIndex]} 
                alt="" 
                className={`rounded-lg cursor-pointer ${
                  isFullSize 
                    ? 'min-w-0 min-h-0 max-w-none' 
                    : 'max-w-full max-h-full object-contain'
                }`}
                onClick={() => setIsFullSize(!isFullSize)}
                title={isFullSize ? 'Click to fit to container' : 'Click to view full size'}
                initial={{ opacity: 0, scale: 0.9, x: 100 }}
                loading='lazy'
                animate={{ 
                  opacity: 1, 
                  scale: isFullSize ? 1 : 1,
                  x: 0
                }}
                exit={{ opacity: 0, scale: 0.9, x: -100 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                whileTap={{ scale: isFullSize ? 1 : 0.98 }}
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <motion.button 
                    onClick={() => changeImg('prev')} 
                    className="absolute cursor-pointer top-1/2 left-4 -translate-y-1/2 p-4 w-14 h-14 flex justify-center items-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20  shadow-xl border border-white/20 group"
                    whileHover={{ 
                      scale: 1.1,                       
                      backgroundColor: "rgba(255,255,255,0.2)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0  }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <FontAwesomeIcon 
                      className="text-[#0088ff] text-xl group-hover:text-[#3c48f5] transition-colors" 
                      icon={faChevronLeft} 
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0088ff]/20 to-transparent"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  
                  <motion.button  
                    onClick={() => changeImg('next')} 
                    className="absolute top-1/2 right-4 cursor-pointer -translate-y-1/2 p-4 w-14 h-14 flex justify-center items-center rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20  shadow-xl border border-white/20 group"
                    whileHover={{ 
                      scale: 1.1,                       
                      backgroundColor: "rgba(255,255,255,0.2)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration:0.2, type: "spring", stiffness: 100 }}
                  >
                    <FontAwesomeIcon 
                      className=" text-xl text-[#0088ff]  group-hover:text-[#3c48f5] transition-colors" 
                      icon={faChevronRight} 
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-l from-[#0088ff]/20 to-transparent"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </>
              )}
            </div>
            
            {/* Pagination Dots */}
            {images.length > 1 && (
              <motion.div 
                className="flex gap-3 justify-center py-4 bg-[#0a1525]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => changeImgByCircle(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                      currentIndex === index 
                        ? "bg-[#0088ff]" 
                        : "bg-white/50 hover:bg-white/80"
                    }`}                    
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
    </div>
  )
}

export default ImagesModal
