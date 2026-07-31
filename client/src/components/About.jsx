import { Box, Flex, Grid, GridItem, Text, VStack, HStack, Image } from '@chakra-ui/react';
import { FiMapPin, FiMail, FiCode, FiBook, FiAward, FiPhone } from 'react-icons/fi';
import profileImage from "../assets/profile.jpeg";


const gradientText = {
  background: 'linear-gradient(135deg,#ffffff 20%,#00d4ff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(108,99,255,0.22)',
  borderRadius: '16px',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
};

export default function About({ profile, education }) {
  const initials = profile?.name?.split(' ').map((n) => n[0]).join('') || 'SS';

  const stats = [
    { icon: <FiCode size={18} />, label: 'Experience', value: '1.6+yrs', color: '#6c63ff' },
    { icon: <FiBook size={18} />, label: 'Projects', value: '5+', color: '#00d4ff' },
    { icon: <FiAward size={18} />, label: 'Technologies', value: '8+', color: '#ff6b9d' },
  ];

  return (
    <Box
      as="section"
      id="about"
      py={{ base: '80px', md: '112px' }}
      bg="#080d1a"
      position="relative"
      overflow="hidden"
    >
      {/* BG blob */}
      <Box
        position="absolute" top="-160px" right="-160px"
        w="500px" h="500px" borderRadius="50%" pointerEvents="none" opacity={0.4}
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)' }}
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
            color="#00d4ff"
            border="1px solid rgba(0,212,255,0.25)"
            bg="rgba(0,212,255,0.06)"
            mb={3}
          >
            About Me
          </Box>
          <Text
            as="h2"
            fontFamily="'Outfit', sans-serif"
            fontWeight="900"
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            lineHeight="1.2"
            style={gradientText}
          >
            Turning Ideas Into<br />Digital Reality
          </Text>
        </VStack>

        <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={14} alignItems="start">
          {/* Left — Avatar + Stats */}
          <GridItem>
            <VStack gap={8} align="center" data-aos="fade-right" data-aos-delay="100">
              {/* Avatar */}
              <Box position="relative">
                {/* Spinning dashed ring */}
                <Box
                  position="absolute"
                  inset="-14px"
                  borderRadius="50%"
                  border="2px dashed rgba(108,99,255,0.4)"
                  className="anim-spin-slow"
                />
                {/* Gradient ring */}
                <Box
                  w="176px" h="176px"
                  borderRadius="50%"
                  p="6px"
                  style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
                >
                  <Flex
                    w="100%" h="100%"
                    borderRadius="50%"
                    bg="#0d1530"
                    align="center"
                    justify="center"
                  >
                    <Image
                      src={profileImage}
                      alt="Profile"
                      boxSize="150px"
                      borderRadius="full"
                      objectFit="cover"
                    />
                  </Flex>
                </Box>
                {/* Badge */}
                <Box
                  position="absolute" bottom="-12px" right="-12px"
                  display="flex" alignItems="center" gap="6px"
                  px={3} py="6px"
                  borderRadius="full"
                  fontSize="xs" fontWeight="700" color="white"
                  border="1px solid rgba(108,99,255,0.4)"
                  style={{ background: 'linear-gradient(135deg,rgba(108,99,255,0.9),rgba(0,212,255,0.8))' }}
                >
                  <FiCode size={12} />
                  Developer
                </Box>
              </Box>

              {/* Stats */}
              <Grid templateColumns="repeat(3, 1fr)" gap={4} w="100%" maxW="sm">
                {stats.map((s, i) => (
                  <Box
                    key={i}
                    style={glassCard}
                    p={4}
                    textAlign="center"
                    data-aos="zoom-in"
                    data-aos-delay={200 + i * 80}
                    _hover={{ borderColor: 'rgba(108,99,255,0.45)', boxShadow: '0 0 40px rgba(108,99,255,0.18)', transform: 'translateY(-4px) scale(1.05)' }}
                  >
                    <Box mb={1} color={s.color} display="flex" justifyContent="center">{s.icon}</Box>
                    <Text fontFamily="'Outfit', sans-serif" fontWeight="900" fontSize="2xl" color="white">{s.value}</Text>
                    <Text color="#718096" fontSize="xs">{s.label}</Text>
                  </Box>
                ))}
              </Grid>
            </VStack>
          </GridItem>

          {/* Right — Content */}
          <GridItem>
            <VStack align="start" gap={7} data-aos="fade-left" data-aos-delay="150">
              {/* Bio */}
              <Text color="#a0aec0" fontSize="sm" lineHeight="1.9">
                {profile?.bio}
              </Text>

              {/* Contact Info */}
              <VStack align="start" gap={3} w="100%">
                {[
                  { icon: <FiMail size={15} />, text: profile?.email || 'sharmasohini80@gmail.com', color: '#6c63ff' },
                  { icon: <FiPhone size={15} />, text: profile?.phone || '+91-7550466420', color: '#00d4ff' },
                  { icon: <FiMapPin size={15} />, text: profile?.location || 'India', color: '#ff6b9d' },
                ].map(({ icon, text, color }, i) => (
                  <HStack key={i} gap={3} fontSize="sm" color="#a0aec0">
                    <Flex
                      w="32px" h="32px"
                      borderRadius="lg"
                      bg="rgba(255,255,255,0.05)"
                      border="1px solid rgba(108,99,255,0.2)"
                      align="center"
                      justify="center"
                      color={color}
                      shrink={0}
                    >
                      {icon}
                    </Flex>
                    <Text>{text}</Text>
                  </HStack>
                ))}
              </VStack>

              {/* Education */}
              <Box w="100%">
                <HStack mb={4} gap={2}>
                  <FiBook color="#6c63ff" size={18} />
                  <Text fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="lg" color="white">Education</Text>
                </HStack>
                <VStack
                  align="start"
                  gap={4}
                  pl={5}
                  borderLeft="2px solid rgba(108,99,255,0.25)"
                >
                  {education?.map((edu, i) => (
                    <Box
                      key={edu.id}
                      position="relative"
                      w="100%"
                      data-aos="fade-up"
                      data-aos-delay={300 + i * 100}
                    >
                      {/* Dot */}
                      <Box
                        position="absolute"
                        left="-25px"
                        top="20px"
                        w="14px" h="14px"
                        borderRadius="50%"
                        border="2px solid #6c63ff"
                        style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
                      />
                      <Box
                        style={glassCard}
                        p={5}
                        w="100%"
                        _hover={{ borderColor: 'rgba(108,99,255,0.45)', boxShadow: '0 0 40px rgba(108,99,255,0.18)', transform: 'translateY(-4px)' }}
                      >
                        <HStack justify="space-between" wrap="wrap" mb={1} gap={2}>
                          <Box
                            px="10px" py="2px"
                            borderRadius="full"
                            fontSize="xs" fontWeight="600"
                            color="#6c63ff"
                            bg="rgba(108,99,255,0.12)"
                          >
                            {edu.year}
                          </Box>
                          <Box
                            px="10px" py="2px"
                            borderRadius="full"
                            fontSize="xs" fontWeight="700"
                            color={edu.status === 'Pursuing' ? '#00d46e' : '#6c63ff'}
                            bg={edu.status === 'Pursuing' ? 'rgba(0,212,110,0.12)' : 'rgba(108,99,255,0.12)'}
                          >
                            {edu.status === 'Pursuing' ? '● Pursuing' : '✓ Completed'}
                          </Box>
                        </HStack>
                        <Text fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="sm" color="white" mt={2}>{edu.degree}</Text>
                        <Text color="#a0aec0" fontSize="sm">{edu.institution}</Text>
                      </Box>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}
