import { useEffect, useRef } from 'react';
import { Box, Flex, Text, HStack, VStack } from '@chakra-ui/react';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiArrowDown, FiDownload } from 'react-icons/fi';

const gradientText = {
  background: 'linear-gradient(135deg,#6c63ff,#00d4ff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const whiteToBlueGrad = {
  background: 'linear-gradient(135deg,#ffffff 20%,#00d4ff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

export default function Hero({ profile }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId, particles = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 90; i++) {
        particles.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          dx: (Math.random() - 0.5) * 0.45, dy: (Math.random() - 0.5) * 0.45,
          opacity: Math.random() * 0.55 + 0.1,
        });
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${p.opacity})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(108,99,255,${0.07 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    const handleResize = () => { resize(); createParticles(); };
    resize(); createParticles(); draw();
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <Box
      as="section"
      id="hero"
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="#080d1a"
    >
      {/* Canvas */}
      <Box
        as="canvas"
        ref={canvasRef}
        position="absolute"
        inset={0}
        w="100%" h="100%"
        pointerEvents="none"
      />

      {/* Glow blobs */}
      <Box
        position="absolute"
        top="25%" left="25%"
        w="600px" h="600px"
        borderRadius="50%"
        pointerEvents="none"
        transform="translate(-50%,-50%)"
        className="anim-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)' }}
      />
      <Box
        position="absolute"
        bottom="25%" right="25%"
        w="500px" h="500px"
        borderRadius="50%"
        pointerEvents="none"
        transform="translate(50%,50%)"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)', animation: 'pulse-glow 5s ease-in-out infinite 1.5s' }}
      />

      {/* Main content */}
      <VStack
        position="relative"
        zIndex={1}
        maxW="1200px"
        mx="auto"
        px={6}
        textAlign="center"
        gap={0}
        mt={20}
      >
        {/* Badge */}
        <Box
          display="inline-flex"
          alignItems="center"
          gap="8px"
          px={4} py="8px"
          borderRadius="full"
          fontSize="xs"
          fontWeight="700"
          color="#00d4ff"
          border="1px solid rgba(0,212,255,0.25)"
          bg="rgba(0,212,255,0.06)"
          mb={8}
          textTransform="uppercase"
          letterSpacing="widest"
          style={{ animation: 'fade-up 0.6s ease 0.1s forwards', opacity: 0 }}
        >
          <span className="badge-dot" />
          Available for opportunities
        </Box>

        {/* Heading */}
        <Text
          as="h1"
          fontFamily="'Outfit', sans-serif"
          fontWeight="900"
          fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl' }}
          lineHeight="1.1"
          mb={6}
          style={{ animation: 'fade-up 0.6s ease 0.2s forwards', opacity: 0 }}
        >
          Hi, I'm{' '}
          <Text as="span" style={gradientText}>
            {profile?.name || 'Sohini Sharma'}
          </Text>
        </Text>

        {/* Type animation */}
        <Box
          fontSize={{ base: 'xl', md: '2xl' }}
          fontFamily="'Outfit', sans-serif"
          fontWeight="600"
          color="#a0aec0"
          mb={6}
          minH="40px"
          style={{ animation: 'fade-up 0.6s ease 0.35s forwards', opacity: 0 }}
        >
          <TypeAnimation
            sequence={[
              'Frontend Developer', 2000,
              'React & Next.js Expert', 2000,
              '1.6+ Years Experience', 2000,
              'UI/UX Enthusiast', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            style={whiteToBlueGrad}
          />
        </Box>

        {/* Bio */}
        <Text
          color="#a0aec0"
          fontSize={{ base: 'sm', md: 'md' }}
          maxW="600px"
          mx="auto"
          lineHeight="1.8"
          mb={10}
          style={{ animation: 'fade-up 0.6s ease 0.5s forwards', opacity: 0 }}
        >
          {profile?.bio || 'Passionate about creating seamless, intuitive, and aesthetically pleasing digital experiences.'}
        </Text>

        {/* CTAs */}
        <HStack
          gap={4}
          justify="center"
          wrap="wrap"
          mb={12}
          style={{ animation: 'fade-up 0.6s ease 0.65s forwards', opacity: 0 }}
        >
          <Link to="projects" smooth duration={500} offset={-70} style={{ cursor: 'pointer' }}>
            <Box
              as="span"
              display="inline-flex"
              alignItems="center"
              gap="8px"
              px={8}
              py="14px"
              borderRadius="full"
              fontWeight="600"
              fontSize="sm"
              color="white"
              style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-3px)', boxShadow: '0 12px 36px rgba(108,99,255,0.6)' }}
              cursor="pointer"
            >
              View My Work
            </Box>
          </Link>
          <Box
            as="a"
            href="/Sohini_Frontend_Developer.pdf"
            download="Sohini_Frontend_Developer.pdf"
            display="inline-flex"
            alignItems="center"
            gap="8px"
            px={8}
            py="14px"
            borderRadius="full"
            fontWeight="600"
            fontSize="sm"
            color="white"
            border="1px solid rgba(108,99,255,0.35)"
            bg="rgba(108,99,255,0.08)"
            backdropFilter="blur(10px)"
            transition="all 0.3s"
            _hover={{ borderColor: 'rgba(108,99,255,0.7)', bg: 'rgba(108,99,255,0.18)', transform: 'translateY(-3px)' }}
          >
            <FiDownload size={16} />
            Download CV
          </Box>
        </HStack>

        {/* Social Links */}
        <HStack
          gap={3}
          justify="center"
          style={{ animation: 'fade-up 0.6s ease 0.8s forwards', opacity: 0 }}
        >
          {[
            { href: profile?.github || '#',   icon: <FiGithub size={20} />,   label: 'GitHub' },
            { href: profile?.linkedin || '#', icon: <FiLinkedin size={20} />, label: 'LinkedIn' },
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
              w="44px" h="44px"
              borderRadius="full"
              border="1px solid rgba(108,99,255,0.3)"
              bg="rgba(255,255,255,0.04)"
              color="#a0aec0"
              transition="all 0.3s"
              _hover={{ color: 'white', borderColor: '#6c63ff', bg: 'rgba(108,99,255,0.15)', transform: 'translateY(-3px)' }}
            >
              {icon}
            </Box>
          ))}
        </HStack>
      </VStack>

      {/* Scroll Indicator */}
      {/* <Link to="about" smooth duration={500} offset={-70} style={{ cursor: 'pointer' }}>
        <VStack
          position="absolute"
          bottom="40px"
          left="50%"
          transform="translateX(-50%)"
          gap={1}
          color="#718096"
          className="anim-float"
          _hover={{ color: '#6c63ff' }}
          transition="color 0.3s"
        >
          <Text fontSize="xs" textTransform="uppercase" letterSpacing="widest" fontWeight="500">Scroll</Text>
          <FiArrowDown size={18} />
        </VStack>
      </Link> */}
    </Box>
  );
}
