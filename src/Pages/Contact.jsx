import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formState);
    // Reset form after submission
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex justify-center items-center mt-50 flex-col py-15 relative " data-aos="fade-up">
      <motion.h1 
        className="section-title font-bold uppercase text-white text-4xl pb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact
      </motion.h1>

      <div className="flex flex-col lg:flex-row w-[80%] mt-10 gap-10">
        {/* Contact Info */}
        <motion.div 
          className="flex-1 card glass p-8 rounded-xl border-2 border-[#0f1d30]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          data-aos="fade-right"
        >
          <h2 className="gradient-text text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-white mb-8">Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
          
          <div className="space-y-6">
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ x: 5 }}
            >
              <div className="bg-[#0a1525] p-3 rounded-full">
                <FontAwesomeIcon icon={faPhone} className="text-[#0088ff]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Phone</h3>
                <p className="text-gray-400">+212 638100939</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ x: 5 }}
            >
              <div className="bg-[#0a1525] p-3 rounded-full">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#0088ff]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Email</h3>
                <p className="text-gray-400">Aminesorati35@gmail.com</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ x: 5 }}
            >
              <div className="bg-[#0a1525] p-3 rounded-full">
                <FontAwesomeIcon icon={faLocationDot} className="text-[#0088ff]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Location</h3>
                <p className="text-gray-400">Morocco</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form 
          className="flex-1 card glass p-8 rounded-xl border-2 border-[#0f1d30]"
          data-aos="fade-left"
          id="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="gradient-text text-2xl font-bold mb-6">Send Message</h2>
          
          <div className="flex flex-col gap-5">
            <div className="relative">
              <motion.input
                type="text"
                placeholder=""
                name="name"
                value={formState.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                className="w-full p-4 bg-[#0a1525] bg-opacity-70 backdrop-blur-sm text-white rounded-lg border-2 border-transparent focus:border-[#0088ff] outline-none transition-all duration-300 pt-6 shadow-inner"
                required
              />
              <motion.label 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focused === 'name' || formState.name ? 'text-xs text-[#0088ff] top-2' : 'text-gray-400 top-4'}`}
                animate={{ y: focused === 'name' || formState.name ? 0 : 0 }}
              >
                Your Name
              </motion.label>
            </div>
            
            <div className="relative">
              <motion.input
                type="email"
                placeholder=""
                name="email"
                value={formState.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full p-4 bg-[#0a1525] bg-opacity-70 backdrop-blur-sm text-white rounded-lg border-2 border-transparent focus:border-[#0088ff] outline-none transition-all duration-300 pt-6 shadow-inner"
                required
              />
              <motion.label 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focused === 'email' || formState.email ? 'text-xs text-[#0088ff] top-2' : 'text-gray-400 top-4'}`}
                animate={{ y: focused === 'email' || formState.email ? 0 : 0 }}
              >
                Your Email
              </motion.label>
            </div>
            
            <div className="relative">
              <motion.textarea
                name="message"
                placeholder=""
                value={formState.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                className="w-full p-4 bg-[#0a1525] bg-opacity-70 backdrop-blur-sm text-white rounded-lg border-2 border-transparent focus:border-[#0088ff] outline-none transition-all duration-300 min-h-[120px] resize-none pt-6 shadow-inner"
                required
              ></motion.textarea>
              <motion.label 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${focused === 'message' || formState.message ? 'text-xs text-[#0088ff] top-2' : 'text-gray-400 top-4'}`}
                animate={{ y: focused === 'message' || formState.message ? 0 : 0 }}
              >
                Your Message
              </motion.label>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: '#0066cc' }}
              whileTap={{ scale: 0.97 }} 
              transition={{ duration: 0.2 }} 
              type="submit"
              className="border-2 border-[#0088ff] w-full mt-2 p-4 text-lg font-bold cursor-pointer rounded-lg text-white transition-all duration-1"
            >
              Send Message
            </motion.button>
          </div>       
        </motion.form>      
      </div>
    </div>
  );
};


export default Contact;
