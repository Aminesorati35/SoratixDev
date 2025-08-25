import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { skills } from "../data/skills";
import { motion } from "motion/react";
const About = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-5 mt-10 " data-aos="fade-up">
      <h1 className="section-title font-bold uppercase text-white text-4xl pb-5" data-aos="fade-up">
        About me
      </h1>
      <p className="font-mono text-white text-[15px] lg:text-2xl italic leading-normal mt-15 w-[80%] md:w-[60%] text-justify break-words " data-aos="fade-up">
        Hey, I’m Amine Sekhal — a full-stack web developer and designer based in
        Morocco. I discovered web development early in my teenage years and
        quickly became fascinated by how ideas could be turned into real,
        interactive experiences on the web. That passion led me to pursue formal
        training in full-stack digital development at OFPPT, where I recently
        completed my diploma. <br />
        <br />
        Over the years, I’ve built projects that range from responsive
        multi-language web apps to admin dashboards and booking platforms. I
        specialize in using modern web technologies like React, Laravel, MySQL,
        and Node.js to build clean, scalable, and user-focused applications.{" "}
        <br />
        <br />
        While I have a solid foundation in UI/UX design and tools like Figma, I
        focus mainly on development — transforming design concepts into
        functional, production-ready code. I love solving problems, automating
        tasks, and continuously learning new tools that improve performance,
        security, and scalability. <br />
        <br />
        I’ve also worked as a freelancer, helping clients bring their ideas to
        life with efficient, customized web solutions. Whether it’s a small
        business website or a full-featured application, I take pride in writing
        clean code and delivering polished products. <br />
        <br />
        I’m currently open to new opportunities — remote or hybrid — and
        especially interested in dynamic teams, early-stage projects, and roles
        where I can grow technically while contributing meaningfully. If you’re
        building something cool or need a passionate developer with a strong
        design sense — let’s talk. <br />
        <br />I primarily use the following technologies, tools and libraries,
        but always open to pick up more:
      </p>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[60%] gap-5 mt-10" data-aos="fade-up">
        {skills.map((skill, index) => (
          <motion.div 
            key={index} 
            className="card glass flex flex-col justify-center items-center h-50 rounded-xl overflow-hidden border-2 border-[#0f1d30] hover:border-[#0088ff] transition-all duration-300" 
            whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 136, 255, 0.2)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration:0.3}}

          >
            <div className="flex justify-center items-center h-30 w-full">
              {skill.icon && (
                <FontAwesomeIcon 
                  icon={skill.icon} 
                  className="text-6xl" 
                  style={skill.color ? {color: `#${skill.color}`} : {color: 'white'}} 
                />
              )}
            </div>
            <div className="bg-[#0a1525] w-full p-3 text-center">
              <h3 className="text-[#0088ff] font-bold">{skill.nom} </h3>
              
            </div>
          </motion.div>
        ))}
      </section>
      <p className="font-mono text-white text-[15px] lg:text-2xl italic leading-normal mt-15 w-[80%] md:w-[60%] text-justify break-words" data-aos="fade-up">
        I also have experience with workflow and DevOps tools. I use Git for
        version control and have worked with both GitHub and GitLab for managing
        projects and collaboration. I'm familiar with Docker for
        containerization and comfortable working with REST APIs and implementing
        authentication systems using JWT. For deployment, I’ve used platforms
        like Vercel, Netlify, and GitHub Pages. I can also work with basic CI/CD
        pipelines and have no problem picking up new tools or adapting to a
        team’s workflow.
      </p>
    </div>
  );
};

export default About;
