import { useState } from 'react';
import { Box, Grid, Text, VStack, HStack, Flex, Textarea } from '@chakra-ui/react';
import {
  FiSend, FiUser, FiMail, FiMessageCircle,
  FiCheckCircle, FiGithub, FiLinkedin, FiMapPin,
} from 'react-icons/fi';

const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(108,99,255,0.22)',
  borderRadius: '16px',
  backdropFilter: 'blur(14px)',
  transition: 'all 0.3s',
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(108,99,255,0.22)',
  borderRadius: '12px',
  padding: '14px 16px',
  color: 'white',
  fontSize: '14px',
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

function StyledInput({ id, type = 'text', name, value, onChange, placeholder, required }) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={inputStyle}
      onFocus={(e) => { e.target.style.borderColor = '#6c63ff'; e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.18)'; }}
      onBlur={(e)  => { e.target.style.borderColor = 'rgba(108,99,255,0.22)'; e.target.style.boxShadow = 'none'; }}
    />
  );
}

function StyledTextarea({ id, name, value, onChange, placeholder, required }) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={5}
      style={{ ...inputStyle, resize: 'none' }}
      onFocus={(e) => { e.target.style.borderColor = '#6c63ff'; e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.18)'; }}
      onBlur={(e)  => { e.target.style.borderColor = 'rgba(108,99,255,0.22)'; e.target.style.boxShadow = 'none'; }}
    />
  );
}

export default function Contact({ apiUrl, profile }) {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error,  setError]  = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading'); setError('');
    try {
      const res  = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
      else throw new Error(data.error || 'Something went wrong');
    } catch (err) { setStatus('error'); setError(err.message); }
  };

  if (status === 'success') {
    return (
      <Box as="section" id="contact" py={{ base: '80px', md: '112px' }} bg="#0d1530">
        <Box maxW="450px" mx="auto" px={6}>
          <VStack style={glassCard} p={12} textAlign="center" gap={5}>
            <FiCheckCircle size={56} color="#00d46e" />
            <Text fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="2xl" color="white">Message Sent! 🎉</Text>
            <Text color="#a0aec0" fontSize="sm">Thanks for reaching out. I'll get back to you soon.</Text>
            <Box
              as="button"
              mt={2} px={8} py="12px"
              borderRadius="full"
              color="white" fontWeight="600" fontSize="sm"
              border="none" cursor="pointer"
              style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-2px)' }}
              onClick={() => setStatus('idle')}
            >
              Send Another
            </Box>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      as="section"
      id="contact"
      py={{ base: '80px', md: '112px' }}
      bg="#0d1530"
      position="relative"
      overflow="hidden"
    >
      {/* BG blob */}
      <Box
        position="absolute" top="-160px" left="-160px"
        w="500px" h="500px" borderRadius="50%"
        pointerEvents="none" opacity={0.3}
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)' }}
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
            Get In Touch
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
            Let's Work Together
          </Text>
          <Text color="#718096" fontSize="sm" maxW="400px">
            Have a project in mind or want to chat? Drop me a message!
          </Text>
        </VStack>

        <Grid templateColumns={{ base: '1fr', lg: '2fr 3fr' }} gap={8} alignItems="start">
          {/* Info Panel */}
          <VStack
            style={glassCard}
            p={8}
            align="start"
            gap={7}
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <Box>
              <Text fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="xl" color="white" mb={2}>Say Hello 👋</Text>
              <Text color="#a0aec0" fontSize="sm" lineHeight="1.9">
                I'm currently open to freelance projects, and full-time opportunities.
                Whether you have a question or just want to say hi my inbox is always open!
              </Text>
            </Box>

            <Box w="100%" h="1px" bg="rgba(255,255,255,0.06)" />

            <VStack align="start" gap={5} w="100%">
              {[
                { icon: <FiMail size={18} />, label: 'Email', value: profile?.email || 'sharmasohini80@gmail.com', href: `mailto:${profile?.email}`, color: '#6c63ff' },
                { icon: <FiMapPin size={18} />, label: 'Location', value: profile?.location || 'India', href: null, color: '#00d4ff' },
              ].map(({ icon, label, value, href, color }) => (
                <HStack key={label} gap={4} align="start">
                  <Flex
                    w="40px" h="40px"
                    borderRadius="xl"
                    align="center" justify="center"
                    shrink={0}
                    style={{ background: `${color}18`, border: `1px solid ${color}35`, color }}
                  >
                    {icon}
                  </Flex>
                  <Box>
                    <Text fontSize="xs" color="#718096" fontWeight="700" textTransform="uppercase" letterSpacing="wider" mb="2px">{label}</Text>
                    {href
                      ? <Box as="a" href={href} fontSize="sm" color="#a0aec0" _hover={{ color: 'white' }} transition="color 0.2s">{value}</Box>
                      : <Text fontSize="sm" color="#a0aec0">{value}</Text>
                    }
                  </Box>
                </HStack>
              ))}
            </VStack>

            <Box w="100%" h="1px" bg="rgba(255,255,255,0.06)" />

            {/* Social */}
            <Box w="100%">
              <Text fontSize="xs" color="#718096" fontWeight="700" textTransform="uppercase" letterSpacing="wider" mb={4}>Connect</Text>
              <HStack gap={3}>
                {[
                  { href: profile?.github   || '#', icon: <FiGithub size={18} />,   label: 'GitHub' },
                  { href: profile?.linkedin || '#', icon: <FiLinkedin size={18} />, label: 'LinkedIn' },
                ].map(({ href, icon, label }) => (
                  <Box
                    key={label}
                    as="a" href={href} target="_blank" rel="noreferrer" title={label}
                    display="flex" alignItems="center" gap="8px"
                    px={4} py="10px"
                    borderRadius="xl"
                    fontSize="xs" fontWeight="500"
                    color="#a0aec0"
                    border="1px solid rgba(108,99,255,0.25)"
                    bg="rgba(255,255,255,0.04)"
                    transition="all 0.2s"
                    _hover={{ color: 'white', borderColor: '#6c63ff', bg: 'rgba(108,99,255,0.12)' }}
                  >
                    {icon} {label}
                  </Box>
                ))}
              </HStack>
            </Box>
          </VStack>

          {/* Form */}
          <Box
            as="form"
            style={glassCard}
            p={8}
            onSubmit={handleSubmit}
            data-aos="fade-left"
            data-aos-delay="150"
          >
            <VStack gap={6} align="stretch">
              {/* Name */}
              <Box>
                <HStack as="label" htmlFor="name" gap={2} mb={2} fontSize="xs" fontWeight="700" color="#a0aec0" textTransform="uppercase" letterSpacing="wider">
                  <FiUser size={13} color="#6c63ff" /> Your Name
                </HStack>
                <StyledInput id="name" name="name" value={form.name} onChange={handleChange} placeholder="Sohini Sharma" required />
              </Box>

              {/* Email */}
              <Box>
                <HStack as="label" htmlFor="email" gap={2} mb={2} fontSize="xs" fontWeight="700" color="#a0aec0" textTransform="uppercase" letterSpacing="wider">
                  <FiMail size={13} color="#6c63ff" /> Email Address
                </HStack>
                <StyledInput id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="sohini.sharma@example.com" required />
              </Box>

              {/* Message */}
              <Box>
                <HStack as="label" htmlFor="message" gap={2} mb={2} fontSize="xs" fontWeight="700" color="#a0aec0" textTransform="uppercase" letterSpacing="wider">
                  <FiMessageCircle size={13} color="#6c63ff" /> Message
                </HStack>
                <StyledTextarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project or idea..." required />
              </Box>

              {/* Error */}
              {status === 'error' && (
                <Box
                  px={4} py={3}
                  borderRadius="xl"
                  bg="rgba(255,107,157,0.1)"
                  border="1px solid rgba(255,107,157,0.3)"
                  color="#ff6b9d"
                  fontSize="sm"
                >
                  ⚠️ {error}
                </Box>
              )}

              {/* Submit */}
              <Box
                as="button"
                type="submit"
                disabled={status === 'loading'}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="10px"
                px={8} py="14px"
                borderRadius="xl"
                color="white"
                fontWeight="600"
                fontSize="sm"
                border="none"
                cursor={status === 'loading' ? 'not-allowed' : 'pointer'}
                opacity={status === 'loading' ? 0.6 : 1}
                style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
                transition="all 0.3s"
                _hover={{ transform: status === 'loading' ? 'none' : 'translateY(-2px)', boxShadow: '0 8px 28px rgba(108,99,255,0.5)' }}
              >
                {status === 'loading' ? (
                  <>
                    <Box
                      w="16px" h="16px"
                      borderRadius="50%"
                      border="2px solid rgba(255,255,255,0.3)"
                      borderTop="2px solid white"
                      style={{ animation: 'spin 0.7s linear infinite' }}
                    />
                    Sending...
                  </>
                ) : (
                  <><FiSend size={15} /> Send Message</>
                )}
              </Box>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
