import { useState, useEffect } from 'react';
import { Box, Flex, HStack, Text, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-scroll';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import logo from '../assets/logo.svg';

const NAV_LINKS = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
];

// Reusable glassmorphic nav link
function NavLink({ label, to, onClick }) {
  return (
    <Link
      to={to}
      smooth
      duration={500}
      offset={-70}
      spy
      activeClass="active-nav"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Text
        as="span"
        fontSize="sm"
        fontWeight="500"
        color="#a0aec0"
        position="relative"
        transition="color 0.2s"
        _hover={{ color: 'white' }}
        sx={{
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-4px',
            left: 0,
            width: 0,
            height: '2px',
            background: 'linear-gradient(90deg,#6c63ff,#00d4ff)',
            transition: 'width 0.3s',
          },
          '&:hover::after': { width: '100%' },
          '&.active-nav': { color: '#6c63ff' },
        }}
      >
        {label}
      </Text>
    </Link>
  );
}

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const firstName = profile?.name?.split(' ')[0] || 'Sohini';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      transition="all 0.3s"
      bg={scrolled ? 'rgba(8,13,26,0.92)' : 'transparent'}
      backdropFilter={scrolled ? 'blur(20px)' : 'none'}
      borderBottom={scrolled ? '1px solid rgba(108,99,255,0.2)' : '1px solid transparent'}
      boxShadow={scrolled ? '0 4px 24px rgba(0,0,0,0.4)' : 'none'}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={6}
        h="64px"
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Link to="hero" smooth duration={500} style={{ cursor: "pointer" }}>
          <Image
            src={logo}
            alt="Sohini Sharma Logo"
            h={{ base: "60px", md: "90px", lg: "110px" }}
            w="auto"
            objectFit="contain"
            transition="transform .3s ease"
            _hover={{
              transform: "scale(1.05)",
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <HStack gap={8} display={{ base: 'none', md: 'flex' }}>
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} {...l} />
          ))}
          <Box
            as="a"
            href="/Sohini_Frontend_Developer.pdf"
            download="Sohini_Frontend_Developer.pdf"
            display="flex"
            alignItems="center"
            gap="8px"
            px={5}
            py="8px"
            borderRadius="full"
            fontSize="sm"
            fontWeight="600"
            color="white"
            style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-2px)', boxShadow: '0 8px 28px rgba(108,99,255,0.55)' }}
          >
            <FiDownload size={14} />
            Hire Me
          </Box>
        </HStack>

        {/* Hamburger */}
        <Box
          as="button"
          display={{ base: 'flex', md: 'none' }}
          alignItems="center"
          justifyContent="center"
          p={2}
          borderRadius="lg"
          color="white"
          bg="transparent"
          border="none"
          cursor="pointer"
          _hover={{ bg: 'rgba(255,255,255,0.1)' }}
          transition="bg 0.2s"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </Box>
      </Flex>

      {/* Mobile Menu */}
      {menuOpen && (
        <Box
          display={{ md: 'none' }}
          borderTop="1px solid rgba(108,99,255,0.2)"
          bg="rgba(8,13,26,0.97)"
          backdropFilter="blur(20px)"
          style={{ animation: 'slide-down 0.3s ease forwards' }}
        >
          <Flex
            maxW="1200px"
            mx="auto"
            px={6}
            py={4}
            direction="column"
            gap={1}
          >
            {NAV_LINKS.map((l) => (
              <Box
                key={l.to}
                px={4}
                py="10px"
                borderRadius="xl"
                _hover={{ bg: 'rgba(255,255,255,0.06)' }}
                transition="bg 0.2s"
              >
                <NavLink label={l.label} to={l.to} onClick={() => setMenuOpen(false)} />
              </Box>
            ))}
            <Box
              as="a"
              href="/Sohini_Frontend_Developer.pdf"
              download="Sohini_Frontend_Developer.pdf"
              mt={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="8px"
              px={5}
              py="12px"
              borderRadius="full"
              fontSize="sm"
              fontWeight="600"
              color="white"
              style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
              onClick={() => setMenuOpen(false)}
            >
              <FiDownload size={14} />
              Hire Me — Download CV
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
