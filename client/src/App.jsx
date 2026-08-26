import { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import AOS from 'aos';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar     from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Skills     from './components/Skills';
import Experience from './components/Experience';
import Projects   from './components/Projects';
import Contact    from './components/Contact';
import Footer     from './components/Footer';

const API_URL = 'https://portfoliobackend-nodejs.vercel.app';
const WHATSAPP_LINK = `https://wa.me/917550466420?text=${encodeURIComponent("Hi Sohini")}`;
// const API_URL = 'http://localhost:5001';


function App() {
  const [profile,    setProfile]    = useState(null);
  const [skills,     setSkills]     = useState([]);
  const [projects,   setProjects]   = useState([]);
  const [education,  setEducation]  = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showTop,    setShowTop]    = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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
      <Box
        as="a"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        position="fixed"
        bottom={showTop ? '88px' : '32px'}
        right={{ base: '10px', md: '20px' }}
        zIndex={40}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="44px"
        h="44px"
        borderRadius="full"
        color="white"
        bg="#25D366"
        boxShadow="0 6px 22px rgba(37,211,102,0.4)"
        transition="all 0.25s"
        _hover={{ transform: 'translateY(-4px)', boxShadow: '0 10px 28px rgba(37,211,102,0.55)' }}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </Box>
    </Box>
  );
}

export default App;
