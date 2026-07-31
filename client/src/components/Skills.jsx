import { useEffect, useRef } from 'react';
import { Box, Grid, Text, VStack, HStack, Flex } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import {
  SiHtml5, SiCss, SiReact, SiTailwindcss,
  SiJavascript, SiNextdotjs, SiBootstrap, SiGit, SiChakraui,
} from 'react-icons/si';

const categoryConfig = {
  Languages:    { color: '#6c63ff', bg: 'rgba(108,99,255,0.12)', border: 'rgba(108,99,255,0.35)', label: '💬 Languages' },
  Technologies: { color: '#00d4ff', bg: 'rgba(0,212,255,0.10)',  border: 'rgba(0,212,255,0.35)',  label: '⚛️ Technologies' },
  Tools:        { color: '#ff6b9d', bg: 'rgba(255,107,157,0.10)',border: 'rgba(255,107,157,0.35)',label: '🛠️ Tools' },
};

const skillIcons = {
  HTML:           <SiHtml5       size={26} style={{ color: '#E34F26' }} />,
  CSS:            <SiCss         size={26} style={{ color: '#264DE4' }} />,
  JavaScript:     <SiJavascript  size={26} style={{ color: '#F7DF1E' }} />,
  'React JS':     <SiReact       size={26} style={{ color: '#61DAFB' }} />,
  'Next JS':      <SiNextdotjs   size={26} style={{ color: '#ffffff' }} />,
  'Tailwind CSS': <SiTailwindcss size={26} style={{ color: '#38BDF8' }} />,
  'Chakra UI':    <SiChakraui    size={26} style={{ color: '#319795' }} />,
  Bootstrap:      <SiBootstrap   size={26} style={{ color: '#7952B3' }} />,
  'Git & GitHub': <SiGit         size={26} style={{ color: '#F05032' }} />,
};

const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(108,99,255,0.22)',
  borderRadius: '16px',
  backdropFilter: 'blur(14px)',
  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
};

function SkillBar({ skill, color, inView, delay }) {
  const barRef = useRef(null);
  useEffect(() => {
    if (inView && barRef.current) barRef.current.style.width = `${skill.level}%`;
  }, [inView, skill.level]);

  return (
    <VStack align="stretch" gap={2}>
      <HStack justify="space-between">
        <HStack gap="10px">
          <Flex
            w="36px" h="36px"
            borderRadius="lg"
            bg="rgba(255,255,255,0.05)"
            align="center"
            justify="center"
          >
            {skillIcons[skill.name] || <Text>🔧</Text>}
          </Flex>
          <Text fontSize="sm" fontWeight="600" color="white">{skill.name}</Text>
        </HStack>
        <Text fontSize="xs" fontWeight="700" color={color}>{skill.level}%</Text>
      </HStack>
      <Box
        w="100%" h="8px"
        bg="rgba(255,255,255,0.06)"
        borderRadius="full"
        overflow="hidden"
      >
        <Box
          ref={barRef}
          h="100%"
          borderRadius="full"
          w="0%"
          style={{
            background: `linear-gradient(90deg,${color},rgba(0,212,255,0.85))`,
            transition: `width 1.1s ease ${delay}ms`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </Box>
    </VStack>
  );
}

export default function Skills({ skills }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const grouped = skills?.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {}) || {};

  return (
    <Box
      as="section"
      id="skills"
      py={{ base: '80px', md: '112px' }}
      bg="#0d1530"
      position="relative"
      overflow="hidden"
    >
      {/* BG blob */}
      <Box
        position="absolute" top={0} left={0}
        w="400px" h="400px" borderRadius="50%"
        pointerEvents="none" opacity={0.3}
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)' }}
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
            color="#6c63ff"
            border="1px solid rgba(108,99,255,0.3)"
            bg="rgba(108,99,255,0.08)"
            mb={3}
          >
            Expertise
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
            Skills &amp; Technologies
          </Text>
          <Text color="#718096" fontSize="sm" maxW="400px">
            A snapshot of my technical toolkit and proficiency levels
          </Text>
        </VStack>

        {/* Skills grid */}
        <Grid
          ref={ref}
          templateColumns={{ base: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }}
          gap={6}
        >
          {Object.entries(grouped).map(([category, items], gi) => {
            const cfg = categoryConfig[category] || categoryConfig.Frontend;
            return (
              <Box
                key={category}
                style={glassCard}
                p={6}
                data-aos="fade-up"
                data-aos-delay={gi * 120}
                _hover={{
                  borderColor: 'rgba(108,99,255,0.45)',
                  boxShadow: '0 0 40px rgba(108,99,255,0.18)',
                  transform: 'translateY(-4px)',
                }}
              >
                {/* Category badge */}
                <Box
                  display="inline-flex"
                  alignItems="center"
                  gap="6px"
                  px={3} py="4px"
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="700"
                  mb={5}
                  style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  {cfg.label}
                </Box>

                <VStack gap={5} align="stretch">
                  {items.map((skill, idx) => (
                    <SkillBar
                      key={skill.id}
                      skill={skill}
                      color={cfg.color}
                      inView={inView}
                      delay={gi * 120 + idx * 90}
                    />
                  ))}
                </VStack>
              </Box>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
