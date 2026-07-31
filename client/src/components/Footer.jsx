import { useState, useEffect } from 'react';
import { Box, Flex, VStack, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiHeart, FiArrowUp } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home',       to: 'hero' },
  { label: 'About',      to: 'about' },
  { label: 'Skills',     to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects',   to: 'projects' },
  { label: 'Contact',    to: 'contact' },
];

export default function Footer({ profile }) {
  const [showTop, setShowTop] = useState(false);
  const firstName = profile?.name?.split(' ')[0] || 'Sohini';

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Box
      as="footer"
      bg="#080d1a"
      borderTop="1px solid rgba(108,99,255,0.18)"
      position="relative"
      overflow="hidden"
    >
      {/* Ambient glow */}
      <Box
        position="absolute"
        bottom={0}
        left="50%"
        transform="translateX(-50%)"
        w="800px" h="300px"
        pointerEvents="none"
        style={{ background: 'radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)' }}
      />

      <Box position="relative" maxW="1200px" mx="auto" px={6} py="56px">
        {/* Top row */}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          align={{ base: 'start', sm: 'center' }}
          justify="space-between"
          gap={8}
          mb={10}
        >
          {/* Logo + tagline */}
          <VStack align="start" gap={2}>
            <Link to="hero" smooth duration={500} style={{ cursor: 'pointer' }}>
              <Text
                fontFamily="'Outfit', sans-serif"
                fontWeight="800"
                fontSize="2xl"
                display="flex"
                alignItems="center"
                gap="1px"
              >
                <Text as="span" color="#6c63ff">&lt;</Text>
                <Text
                  as="span"
                  style={{
                    background: 'linear-gradient(135deg,#6c63ff,#00d4ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {firstName}
                </Text>
                <Text as="span" color="#6c63ff">/&gt;</Text>
              </Text>
            </Link>
            <Text color="#718096" fontSize="sm" maxW="280px">
              Frontend Developer passionate about building scalable, responsive, and high-performance web applications.
            </Text>
          </VStack>

          {/* Quick nav links */}
          <Flex wrap="wrap" gap={{ base: 4, md: 6 }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} smooth duration={500} offset={-70} style={{ cursor: 'pointer' }}>
                <Text
                  fontSize="sm"
                  color="#718096"
                  transition="color 0.2s"
                  _hover={{ color: '#6c63ff' }}
                >
                  {link.label}
                </Text>
              </Link>
            ))}
          </Flex>
        </Flex>

        {/* Technologies row */}
        <Flex
          wrap="wrap"
          gap={3}
          mb={8}
          pb={8}
          borderBottom="1px solid rgba(255,255,255,0.06)"
        >
          {['HTML', 'CSS', 'JavaScript', 'React JS', 'Next JS', 'Tailwind CSS', 'Bootstrap', 'Chakra UI', 'Git & GitHub'].map((tech) => (
            <Box
              key={tech}
              px={3} py="4px"
              borderRadius="full"
              fontSize="xs"
              fontWeight="600"
              color="#6c63ff"
              bg="rgba(108,99,255,0.08)"
              border="1px solid rgba(108,99,255,0.2)"
            >
              {tech}
            </Box>
          ))}
        </Flex>

        {/* Gradient divider */}
        <Box
          w="100%" h="1px" mb={8}
          style={{ background: 'linear-gradient(90deg,transparent,rgba(108,99,255,0.4),transparent)' }}
        />

        {/* Bottom row */}
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          align="center"
          justify="space-between"
          gap={4}
        >
          <Text color="#718096" fontSize="sm" display="flex" alignItems="center" gap="6px">
            Made with{' '}
            <Box as="span" display="inline-flex" color="#ff6b9d" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}>
              <FiHeart size={14} />
            </Box>
            {' '}by{' '}
            <Text as="span" color="white" fontWeight="500">{profile?.name || 'Sohini Sharma'}</Text>
            {' '}· {new Date().getFullYear()}
          </Text>

          {/* Social icons */}
          <HStack gap={3}>
            {[
              { href: profile?.github   || '#', icon: <FiGithub size={17} />,   label: 'GitHub' },
              { href: profile?.linkedin || '#', icon: <FiLinkedin size={17} />, label: 'LinkedIn' },
            ].map(({ href, icon, label }) => (
              <Box
                key={label}
                as="a"
                href={href}
                target="_blank"
                rel="noreferrer"
                title={label}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="36px" h="36px"
                borderRadius="full"
                border="1px solid rgba(108,99,255,0.28)"
                bg="rgba(255,255,255,0.04)"
                color="#718096"
                transition="all 0.2s"
                _hover={{ color: 'white', borderColor: '#6c63ff', bg: 'rgba(108,99,255,0.14)', transform: 'translateY(-2px)' }}
              >
                {icon}
              </Box>
            ))}
          </HStack>
        </Flex>
      </Box>

      {/* Back to Top button */}
      <Box
        as="button"
        position="fixed"
        bottom="32px"
        right="32px"
        zIndex={50}
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="44px" h="44px"
        borderRadius="full"
        color="white"
        border="none"
        cursor="pointer"
        style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
        boxShadow="0 4px 20px rgba(108,99,255,0.35)"
        transition="all 0.3s"
        opacity={showTop ? 1 : 0}
        transform={showTop ? 'translateY(0)' : 'translateY(16px)'}
        pointerEvents={showTop ? 'auto' : 'none'}
        _hover={{ transform: showTop ? 'translateY(-4px)' : 'translateY(16px)', boxShadow: '0 8px 28px rgba(108,99,255,0.6)' }}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FiArrowUp size={18} />
      </Box>
    </Box>
  );
}
