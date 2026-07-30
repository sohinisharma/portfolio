import { Box, Grid, Text, VStack, HStack, Flex } from '@chakra-ui/react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';


const tagColors = {
  'Python':           { color: '#3776ab', bg: 'rgba(55,118,171,0.12)' },
  'Machine Learning': { color: '#ff6b9d', bg: 'rgba(255,107,157,0.12)' },
  'GUI':              { color: '#6c63ff', bg: 'rgba(108,99,255,0.12)' },
  'Data Science':     { color: '#00d4ff', bg: 'rgba(0,212,255,0.12)' },
  'React JS':         { color: '#61dafb', bg: 'rgba(97,218,251,0.12)' },
  'JSON-Server':      { color: '#a8ff78', bg: 'rgba(168,255,120,0.10)' },
  'Tailwind CSS':     { color: '#38bdf8', bg: 'rgba(56,189,248,0.12)' },
  'REST API':         { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
};

const topGradients = [
  'linear-gradient(90deg,#6c63ff,#00d4ff)',
  'linear-gradient(90deg,#00d4ff,#ff6b9d)',
  'linear-gradient(90deg,#ff6b9d,#6c63ff)',
];

const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(108,99,255,0.22)',
  borderRadius: '16px',
  backdropFilter: 'blur(14px)',
  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
};

export default function Projects({ projects }) {
  return (
    <Box
      as="section"
      id="projects"
      py={{ base: '80px', md: '112px' }}
      bg="#080d1a"
      position="relative"
      overflow="hidden"
    >
      {/* BG blob */}
      <Box
        position="absolute" bottom={0} right={0}
        w="500px" h="500px" borderRadius="50%"
        pointerEvents="none" opacity={0.25}
        style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.1) 0%, transparent 70%)' }}
      />

      <Box maxW="1200px" mx="auto" px={6}>
        {/* Header */}
        <VStack textAlign="center" mb={20} data-aos="fade-up">
          <Box
            display="inline-block"
            px={5} py="6px"
            borderRadius="full"
            fontSize="xs" fontWeight="700"
            textTransform="uppercase" letterSpacing="widest"
            color="#ff6b9d"
            border="1px solid rgba(255,107,157,0.3)"
            bg="rgba(255,107,157,0.06)"
            mb={3}
          >
            Portfolio
          </Box>
          <Text
            as="h2"
            fontFamily="'Outfit', sans-serif"
            fontWeight="900"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            style={{
              background: 'linear-gradient(135deg,#ffffff 20%,#00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Featured Projects
          </Text>
          <Text color="#718096" fontSize="sm" maxW="500px">
            Things I've built — from machine learning tools to full-stack web apps
          </Text>
        </VStack>

        {/* Project Cards */}
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2,1fr)', xl: 'repeat(3,1fr)' }} gap={8}>
          {projects?.map((project, idx) => (
            <Box
              key={project.id}
              style={glassCard}
              display="flex"
              flexDirection="column"
              overflow="hidden"
              data-aos="fade-up"
              data-aos-delay={idx * 130}
              role="group"
              _hover={{
                borderColor: 'rgba(108,99,255,0.45)',
                boxShadow: '0 0 40px rgba(108,99,255,0.18)',
                transform: 'translateY(-4px)',
              }}
            >
              {/* Gradient top bar */}
              <Box h="4px" w="100%" style={{ background: topGradients[idx % topGradients.length] }} />

              <VStack align="start" p={7} gap={5} flex={1}>
                {/* Card top row */}
                <HStack justify="space-between" w="100%">
                  {/* Icon */}
                  <Flex
                    w="56px" h="56px"
                    borderRadius="2xl"
                    align="center"
                    justify="center"
                    fontSize="2xl"
                    bg="rgba(255,255,255,0.04)"
                    border="1px solid rgba(108,99,255,0.2)"
                    transition="transform 0.3s"
                    _groupHover={{ transform: 'scale(1.1)' }}
                  >
                    {project.icon || '🚀'}
                  </Flex>

                  {/* Icon links */}
                  <HStack gap={2}>
                    {[
                      { href: project.github, icon: <FiGithub size={16} />, title: 'GitHub',
                        border: 'rgba(108,99,255,0.3)', hBorder: '#6c63ff', hBg: 'rgba(108,99,255,0.2)' },
                      { href: project.live,   icon: <FiExternalLink size={16} />, title: 'Live Demo',
                        border: 'rgba(0,212,255,0.3)', hBorder: '#00d4ff', hBg: 'rgba(0,212,255,0.2)' },
                    ].map(({ href, icon, title, border, hBorder, hBg }) => (
                      <Box
                        key={title}
                        as="a"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        title={title}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        w="36px" h="36px"
                        borderRadius="lg"
                        border={`1px solid ${border}`}
                        bg="rgba(255,255,255,0.04)"
                        color="#a0aec0"
                        transition="all 0.2s"
                        _hover={{ color: 'white', borderColor: hBorder, bg: hBg }}
                      >
                        {icon}
                      </Box>
                    ))}
                  </HStack>
                </HStack>

                {/* Title & desc */}
                <Box>
                  <Text
                    fontFamily="'Outfit', sans-serif"
                    fontWeight="700"
                    color="white"
                    fontSize="xl"
                    mb={2}
                  >
                    {project.title}
                  </Text>
                  <Text color="#a0aec0" fontSize="sm" lineHeight="1.8">
                    {project.description}
                  </Text>
                </Box>

                {/* Tags */}
                <HStack wrap="wrap" gap={2}>
                  {project.tags.map((tag) => {
                    const tc = tagColors[tag] || { color: '#6c63ff', bg: 'rgba(108,99,255,0.12)' };
                    return (
                      <Box
                        key={tag}
                        px={3} py="4px"
                        borderRadius="full"
                        fontSize="xs"
                        fontWeight="600"
                        style={{ color: tc.color, background: tc.bg, border: `1px solid ${tc.color}35` }}
                      >
                        {tag}
                      </Box>
                    );
                  })}
                </HStack>

                {/* CTA row */}
                <HStack
                  gap={3}
                  pt={2}
                  borderTop="1px solid rgba(255,255,255,0.06)"
                  w="100%"
                  mt="auto"
                >
                  <Box
                    as="a"
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="8px"
                    py="10px"
                    borderRadius="xl"
                    fontSize="sm"
                    fontWeight="600"
                    color="#a0aec0"
                    border="1px solid rgba(108,99,255,0.3)"
                    transition="all 0.2s"
                    _hover={{ color: 'white', bg: 'rgba(108,99,255,0.15)', borderColor: '#6c63ff' }}
                  >
                    <FiGithub size={15} /> GitHub
                  </Box>
                  <Box
                    as="a"
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    flex={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap="8px"
                    py="10px"
                    borderRadius="xl"
                    fontSize="sm"
                    fontWeight="600"
                    color="white"
                    style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
                    transition="all 0.2s"
                    _hover={{ opacity: 0.9, transform: 'translateY(-1px)' }}
                  >
                    <FiExternalLink size={15} /> Live Demo
                  </Box>
                </HStack>
              </VStack>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
