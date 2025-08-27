import React from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const Home = ({ handleClick }) => {
  return (
    <div className="flex flex-col xl:flex-row justify-center items-center gap-10 md:gap-30 mt-30 px-5 md:px-0 p-5 bg-pattern">
      <section className="flex justify-center flex-col text-white p-5 md:p-15 mt-20 md:w-1/2 md:ml-0 ml-5  ">
        <motion.div
          className=""
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.6,
            type:'spring',
            stiffness: 200,
          }}
        >
          <motion.h1 className="font-bold text-4xl md:text-5xl gradient-text w-full md:w-50 glow">
            Hi There
          </motion.h1>

          <motion.h1 className="font-bold text-4xl md:text-5xl whitespace-nowrap">
            I'm <span className="gradient-text-large">Amine</span> Sekhal
          </motion.h1>

          <motion.div
            className="font-bold text-3xl md:text-5xl whitespace-nowrap"
            style={{ minHeight: "3.5rem" }} // Fixed height to prevent jumping
          >
            I'm a{" "}
            <span className="inline-block min-w-[300px] md:min-w-[400px]">
              {" "}
              {/* Fixed minimum width */}
              <Typewriter
                words={[
                  "Full-Stack Developer",
                  "UI/UX Designer",
                  "Problem Solver",
                  "Creative Thinker",                  
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </motion.div>

          <motion.h1 className="font-bold text-3xl md:text-4xl md:mt-2">
            From Morocco
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 200, delay: 0.6 }}
          className="w-80 md:w-170 2xl:w-190 font-semibold text-xl md:text-2xl mt-5"
        >
          I'm passionate about building clean, modern applications with React,
          PHP, and Laravel. I transform ideas into powerful digital solutions
          that solve real-world problems.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            delay: 0.9,
            stiffness: 200,
          }}
        >
          <motion.div className="flex flex-row gap-5 mt-10">
            <motion.a
              href="https://github.com/Aminesorati35"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="transition-all duration-20"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="text-white text-3xl hover:text-[#0088ff] transition-all duration-300"
              />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/amine-sekhal-46470728a/"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="transition-all duration-20"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-white text-3xl hover:text-[#0088ff] transition-all duration-300"
              />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="transition-all duration-20"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-white text-3xl hover:text-[#0088ff] transition-all duration-300"
              />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="transition-all duration-20"
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-white text-3xl hover:text-[#0088ff] transition-all duration-300"
              />
            </motion.a>
          </motion.div>

          <div className="flex gap-4 mt-10">
            <motion.a
              onClick={() => handleClick("contact")}
              whileHover={{ scale: 1.05, backgroundColor: "#0066cc" }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="btn-primary text-lg md:text-xl font-bold cursor-pointer text-center flex items-center justify-center"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="relative flex items-center justify-center mt-10 md:mt-0 float"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1
        }}
      >
        <motion.div
          className="absolute w-[380px] h-[380px] md:w-[510px] md:h-[510px] rounded-full bg-gradient-to-r from-[#0088ff] to-[#6600ff] opacity-20 blur-xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden border-6 border-[#0088ff] shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#0088ff] to-[#6600ff] opacity-10 hover:opacity-20 transition duration-300 ease"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <img
            src="/assets/me5.png"
            className="w-full h-full object-cover"
            alt="Amine Sekhal"
          />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
