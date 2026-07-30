import { Box, Flex, Text, VStack, HStack } from '@chakra-ui/react';
import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(108,99,255,0.22)',
  borderRadius: '16px',
  backdropFilter: 'blur(14px)',
  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
};

export default function Experience({ experience }) {
  return (
    <Box
      as="section"
      id="experience"
      py={{ base: '80px', md: '112px' }}
      bg="#080d1a"
      position="relative"
      overflow="hidden"
    >
      {/* BG blob */}
      <Box
        position="absolute" top="50%" right="-100px"
        w="400px" h="400px" borderRadius="50%"
        transform="translateY(-50%)"
        pointerEvents="none" opacity={0.25}
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)' }}
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
            Work History
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
            Experience
          </Text>
          <Text color="#718096" fontSize="sm" maxW="400px">
            Where I've worked and what I've built
          </Text>
        </VStack>

        {/* Timeline */}
        <VStack
          align="stretch"
          gap={8}
          maxW="860px"
          mx="auto"
          position="relative"
        >
          {/* Vertical line */}
          <Box
            position="absolute"
            left={{ base: '18px', md: '28px' }}
            top={0} bottom={0}
            w="2px"
            bg="linear-gradient(180deg, #6c63ff, rgba(0,212,255,0.3))"
            style={{ background: 'linear-gradient(180deg,#6c63ff,rgba(0,212,255,0.3))' }}
          />

          {experience?.map((exp, idx) => (
            <Box
              key={exp.id}
              display="flex"
              gap={{ base: 6, md: 10 }}
              data-aos="fade-up"
              data-aos-delay={idx * 120}
            >
              {/* Timeline dot + icon */}
              <Flex direction="column" align="center" shrink={0} position="relative" zIndex={1}>
                <Flex
                  w={{ base: '38px', md: '58px' }}
                  h={{ base: '38px', md: '58px' }}
                  borderRadius="full"
                  align="center" justify="center"
                  style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
                  boxShadow="0 0 20px rgba(108,99,255,0.4)"
                >
                  <FiBriefcase size={22} color="white" />
                </Flex>
              </Flex>

              {/* Card */}
              <Box
                style={glassCard}
                p={{ base: 5, md: 7 }}
                flex={1}
                _hover={{
                  borderColor: 'rgba(108,99,255,0.45)',
                  boxShadow: '0 0 40px rgba(108,99,255,0.18)',
                  transform: 'translateY(-4px)',
                }}
              >
                {/* Header row */}
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  justify="space-between"
                  align={{ sm: 'center' }}
                  gap={2}
                  mb={2}
                >
                  <Box>
                    <Text
                      fontFamily="'Outfit', sans-serif"
                      fontWeight="800"
                      fontSize="xl"
                      color="white"
                    >
                      {exp.role}
                    </Text>
                    <Text
                      fontWeight="600"
                      fontSize="sm"
                      style={{
                        background: 'linear-gradient(135deg,#6c63ff,#00d4ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {exp.company}
                    </Text>
                  </Box>
                  <HStack gap={2} shrink={0}>
                    <Box
                      display="flex" alignItems="center" gap="6px"
                      px={3} py="4px"
                      borderRadius="full"
                      fontSize="xs" fontWeight="600"
                      color="#00d4ff"
                      bg="rgba(0,212,255,0.1)"
                      border="1px solid rgba(0,212,255,0.3)"
                    >
                      <FiCalendar size={11} />
                      {exp.duration}
                    </Box>
                    <Box
                      px={3} py="4px"
                      borderRadius="full"
                      fontSize="xs" fontWeight="700"
                      color="#00d46e"
                      bg="rgba(0,212,110,0.1)"
                      border="1px solid rgba(0,212,110,0.3)"
                    >
                      {exp.type}
                    </Box>
                  </HStack>
                </Flex>

                {/* Divider */}
                <Box w="100%" h="1px" bg="rgba(255,255,255,0.06)" my={4} />

                {/* Bullet points */}
                <VStack align="start" gap={3}>
                  {exp.points.map((point, i) => (
                    <HStack key={i} align="start" gap={3}>
                      <Box color="#6c63ff" shrink={0} mt="2px">
                        <FiCheckCircle size={15} />
                      </Box>
                      <Text color="#a0aec0" fontSize="sm" lineHeight="1.8">
                        {point}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
