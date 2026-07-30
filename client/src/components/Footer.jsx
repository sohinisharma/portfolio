import { useState, useEffect } from 'react';
import { Box, Flex, VStack, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiHeart, FiArrowUp } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
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
        {/* Content */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          gap={10}
          mb={10}
        >
          {/* Brand */}
          <VStack align="start" spacing={3} maxW="300px">
            <Link to="hero" smooth duration={500}>
              <Text
                fontSize="2xl"
                fontWeight="800"
                cursor="pointer"
                display="flex"
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

            <Text color="#94a3b8" fontSize="sm">
              Frontend Developer passionate about building scalable,
              responsive, and high-performance web applications using
              modern technologies.
            </Text>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" spacing={3}>
            <Text color="white" fontWeight="600">
              Quick Links
            </Text>

            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={500}
                offset={-70}
              >
                <Text
                  cursor="pointer"
                  color="#94a3b8"
                  _hover={{ color: "#6c63ff" }}
                >
                  {item.label}
                </Text>
              </Link>
            ))}
          </VStack>

          {/* Technologies */}
          <VStack align="start" spacing={3}>
            <Text color="white" fontWeight="600">
              Technologies
            </Text>

            {[
              "React.js",
              "Next.js",
              "TypeScript",
            ].map((tech) => (
              <Text key={tech} color="#94a3b8">
                {tech}
              </Text>
            ))}
          </VStack>

          {/* Contact */}
          <VStack align="start" spacing={3}>
            <Text color="white" fontWeight="600">
              Get In Touch
            </Text>

            <Text color="#94a3b8">
              📍 India
            </Text>

            <Text color="#94a3b8">
              📧 sharmasohini80@email.com
            </Text>

            <HStack spacing={3} gap={4} pt={2}>
              <Box
                as="a"
                href={profile?.github}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub />
              </Box>

              <Box
                as="a"
                href={profile?.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FiLinkedin />
              </Box>
            </HStack>
          </VStack>
        </Flex>

        {/* Gradient divider */}
        <Box
          w="100%" h="1px" mb={8}
          style={{ background: 'linear-gradient(90deg,transparent,rgba(108,99,255,0.4),transparent)' }}
        />

        <Flex
          justify="space-between"
          align="center"
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Text color="#94a3b8" fontSize="sm">
            © {new Date().getFullYear()} {firstName}. All rights reserved.
          </Text>

          <HStack spacing={1}>
            <Text color="#94a3b8" fontSize="sm">
              Built with React, Chakra UI & Node.js
            </Text>

            <FiHeart color="#6c63ff" />
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
