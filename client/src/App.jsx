import { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import AOS from 'aos';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Skills     from './components/Skills';
import Experience from './components/Experience';
import Projects   from './components/Projects';
import Contact    from './components/Contact';
import Footer     from './components/Footer';

const API_URL = 'https://portfoliobackend-nodejs.vercel.app';
// const API_URL = 'http://localhost:5002';


function App() {
  const [profile,    setProfile]    = useState(null);
  const [skills,     setSkills]     = useState([]);
  const [projects,   setProjects]   = useState([]);
  const [education,  setEducation]  = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [pR, sR, prR, eR, exR] = await Promise.all([
          fetch(`${API_URL}/api/profile`),
          fetch(`${API_URL}/api/skills`),
          fetch(`${API_URL}/api/projects`),
          fetch(`${API_URL}/api/education`),
          fetch(`${API_URL}/api/experience`),
        ]);
        const [pd, sd, prd, ed, exd] = await Promise.all([
          pR.json(), sR.json(), prR.json(), eR.json(), exR.json(),
        ]);
        setProfile(pd.data);
        setSkills(sd.data);
        setProjects(prd.data);
        setEducation(ed.data);
        setExperience(exd.data);
      } catch (e) {
        console.error('Fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <Flex align="center" justify="center" h="100vh" bg="#080d1a">
        <Flex gap="12px">
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              w="14px" h="14px"
              borderRadius="50%"
              style={{
                background: 'linear-gradient(135deg,#6c63ff,#00d4ff)',
                animation: `bounce-dot 0.8s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </Flex>
      </Flex>
    );
  }

  return (
    <Box bg="#080d1a" minH="100vh">
      <Navbar     profile={profile} />
      <Hero       profile={profile} />
      <About      profile={profile} education={education} />
      <Skills     skills={skills} />
      <Experience experience={experience} />
      <Projects   projects={projects} />
      <Contact    apiUrl={API_URL} profile={profile} />
      <Footer     profile={profile} />
    </Box>
  );
}

export default App;
