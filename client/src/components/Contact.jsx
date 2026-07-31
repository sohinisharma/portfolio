import { useState } from 'react';
import { Box, Grid, Text, VStack, HStack, Flex } from '@chakra-ui/react';
import {
  FiSend, FiUser, FiMail, FiMessageCircle,
  FiCheckCircle, FiGithub, FiLinkedin, FiMapPin,
  FiAlertCircle, FiPhone,
} from 'react-icons/fi';

// ── Styles ────────────────────────────────────────────────────
const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(108,99,255,0.22)',
  borderRadius: '16px',
  backdropFilter: 'blur(14px)',
  transition: 'all 0.3s',
};

const getInputStyle = (hasError) => ({
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${hasError ? '#ff6b9d' : 'rgba(108,99,255,0.22)'}`,
  borderRadius: '12px',
  padding: '14px 16px',
  color: 'white',
  fontSize: '14px',
  outline: 'none',
  fontFamily: "'Inter', sans-serif",
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxShadow: hasError ? '0 0 0 3px rgba(255,107,157,0.15)' : 'none',
});

// ── Validation rules ──────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  if (!name)               errors.name    = 'Name is required.';
  else if (name.length < 2) errors.name   = 'Name must be at least 2 characters.';

  if (!email)                     errors.email = 'Email is required.';
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Please enter a valid email address.';

  if (!message)                errors.message = 'Message is required.';
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters.';
  else if (message.length > 2000) errors.message = 'Message must be under 2000 characters.';

  return errors;
}

// ── Styled Input with validation ─────────────────────────────
function Field({ id, label, icon, error, touched, children }) {
  return (
    <Box>
      <HStack as="label" htmlFor={id} gap={2} mb={2}
        fontSize="xs" fontWeight="700" color={touched && error ? '#ff6b9d' : '#a0aec0'}
        textTransform="uppercase" letterSpacing="wider"
        transition="color 0.2s"
      >
        {icon} {label}
      </HStack>
      {children}
      {touched && error && (
        <HStack gap="6px" mt="6px">
          <FiAlertCircle size={12} color="#ff6b9d" />
          <Text fontSize="xs" color="#ff6b9d">{error}</Text>
        </HStack>
      )}
    </Box>
  );
}

function StyledInput({ id, type = 'text', name, value, onChange, onBlur, placeholder, hasError }) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      autoComplete="off"
      style={getInputStyle(hasError)}
      onFocus={(e) => {
        if (!hasError) {
          e.target.style.borderColor = '#6c63ff';
          e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.18)';
        }
      }}
      onBlurCapture={(e) => {
        if (!hasError) {
          e.target.style.borderColor = 'rgba(108,99,255,0.22)';
          e.target.style.boxShadow = 'none';
        }
      }}
    />
  );
}

function StyledTextarea({ id, name, value, onChange, onBlur, placeholder, hasError }) {
  return (
    <Box position="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={5}
        style={{ ...getInputStyle(hasError), resize: 'none' }}
        onFocus={(e) => {
          if (!hasError) {
            e.target.style.borderColor = '#6c63ff';
            e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.18)';
          }
        }}
        onBlurCapture={(e) => {
          if (!hasError) {
            e.target.style.borderColor = 'rgba(108,99,255,0.22)';
            e.target.style.boxShadow = 'none';
          }
        }}
      />
      {/* Character count */}
      <Text
        position="absolute" bottom="10px" right="14px"
        fontSize="10px"
        color={value.length > 1800 ? '#ff6b9d' : '#4a5568'}
      >
        {value.length}/2000
      </Text>
    </Box>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function Contact({ apiUrl, profile }) {
  const [form,    setForm]    = useState({ name: '', email: '', message: '' });
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [status,  setStatus]  = useState('idle'); // idle | loading | success | error
  const [apiError, setApiError] = useState('');

  // Mark field as touched on blur → triggers its validation message
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate({ ...form }));
  };

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    // Re-validate touched fields live
    if (touched[e.target.name]) {
      setErrors(validate(updated));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields to show errors
    setTouched({ name: true, email: true, message: true });
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return; // block submit if invalid

    setStatus('loading');
    setApiError('');

    try {
      const res  = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setApiError(err.message);
    }
  };

  // ── Success state ─────────────────────────────────────────
  if (status === 'success') {
    return (
      <Box as="section" id="contact" py={{ base: '80px', md: '112px' }} bg="#0d1530">
        <Box maxW="500px" mx="auto" px={6} data-aos="zoom-in">
          <VStack style={glassCard} p={12} textAlign="center" gap={5}>
            <Box
              w="72px" h="72px"
              borderRadius="full"
              display="flex" alignItems="center" justifyContent="center"
              style={{ background: 'linear-gradient(135deg,rgba(0,212,110,0.2),rgba(0,212,110,0.05))', border: '2px solid rgba(0,212,110,0.4)' }}
            >
              <FiCheckCircle size={34} color="#00d46e" />
            </Box>
            <Text fontFamily="'Outfit', sans-serif" fontWeight="800" fontSize="2xl" color="white">
              Message Sent! 🎉
            </Text>
            <Text color="#a0aec0" fontSize="sm" lineHeight="1.8" maxW="300px">
              Thanks for reaching out! You'll receive a confirmation email shortly, and I'll get back to you within 24 hours.
            </Text>
            <Box
              as="button"
              mt={2} px={8} py="12px"
              borderRadius="full"
              color="white" fontWeight="600" fontSize="sm"
              border="none" cursor="pointer"
              style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
              transition="all 0.2s"
              _hover={{ transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(108,99,255,0.5)' }}
              onClick={() => { setStatus('idle'); setApiError(''); }}
            >
              Send Another Message
            </Box>
          </VStack>
        </Box>
      </Box>
    );
  }

  const isValid = Object.keys(validate(form)).length === 0;

  return (
    <Box
      as="section"
      id="contact"
      py={{ base: '80px', md: '112px' }}
      bg="#0d1530"
      position="relative"
      overflow="hidden"
    >
      {/* BG blobs */}
      <Box
        position="absolute" top="-160px" left="-160px"
        w="500px" h="500px" borderRadius="50%"
        pointerEvents="none" opacity={0.3}
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)' }}
      />
      <Box
        position="absolute" bottom="-100px" right="-100px"
        w="400px" h="400px" borderRadius="50%"
        pointerEvents="none" opacity={0.2}
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)' }}
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
          {/* ── Info Panel ──────────────────────────────────── */}
          <VStack
            style={glassCard}
            p={8}
            align="start"
            gap={7}
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <Box>
              <Text fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="xl" color="white" mb={2}>
                Say Hello 👋
              </Text>
              <Text color="#a0aec0" fontSize="sm" lineHeight="1.9">
                I'm currently open to freelance projects and full-time opportunities.
                Whether you have a question or just want to say hi — my inbox is always open!
              </Text>
            </Box>

            <Box w="100%" h="1px" bg="rgba(255,255,255,0.06)" />

            <VStack align="start" gap={5} w="100%">
              {[
                { icon: <FiMail size={18} />,  label: 'Email',    value: profile?.email    || 'sohinideveloper@gmail.com', href: `mailto:${profile?.email}`, color: '#6c63ff' },
                { icon: <FiPhone size={18} />, label: 'Phone',    value: profile?.phone    || '+91-7550466420',            href: `tel:${profile?.phone}`,    color: '#00d4ff' },
                { icon: <FiMapPin size={18} />,label: 'Location', value: profile?.location || 'India',                    href: null,                        color: '#ff6b9d' },
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
                    <Text fontSize="xs" color="#718096" fontWeight="700"
                      textTransform="uppercase" letterSpacing="wider" mb="2px">
                      {label}
                    </Text>
                    {href
                      ? <Box as="a" href={href} fontSize="sm" color="#a0aec0"
                          _hover={{ color: 'white' }} transition="color 0.2s">{value}</Box>
                      : <Text fontSize="sm" color="#a0aec0">{value}</Text>
                    }
                  </Box>
                </HStack>
              ))}
            </VStack>

            <Box w="100%" h="1px" bg="rgba(255,255,255,0.06)" />

            {/* Social */}
            <Box w="100%">
              <Text fontSize="xs" color="#718096" fontWeight="700"
                textTransform="uppercase" letterSpacing="wider" mb={4}>
                Connect
              </Text>
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

            {/* Email note */}
            <Box
              w="100%"
              px={4} py={3}
              borderRadius="xl"
              bg="rgba(0,212,255,0.05)"
              border="1px solid rgba(0,212,255,0.2)"
            >
              <HStack gap={2}>
                <FiMail size={13} color="#00d4ff" />
                <Text fontSize="xs" color="#718096" lineHeight="1.6">
                  You'll receive an <Text as="span" color="#00d4ff" fontWeight="600">instant confirmation email</Text> after submitting.
                </Text>
              </HStack>
            </Box>
          </VStack>

          {/* ── Form ────────────────────────────────────────── */}
          <Box
            as="form"
            style={glassCard}
            p={8}
            onSubmit={handleSubmit}
            noValidate
            data-aos="fade-left"
            data-aos-delay="150"
          >
            <VStack gap={5} align="stretch">
              {/* Name */}
              <Field
                id="name"
                label="Your Name"
                icon={<FiUser size={13} color={touched.name && errors.name ? '#ff6b9d' : '#6c63ff'} />}
                error={errors.name}
                touched={touched.name}
              >
                <StyledInput
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Sohini Sharma"
                  hasError={touched.name && !!errors.name}
                />
              </Field>

              {/* Email */}
              <Field
                id="email"
                label="Email Address"
                icon={<FiMail size={13} color={touched.email && errors.email ? '#ff6b9d' : '#6c63ff'} />}
                error={errors.email}
                touched={touched.email}
              >
                <StyledInput
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. yourname@gmail.com"
                  hasError={touched.email && !!errors.email}
                />
              </Field>

              {/* Message */}
              <Field
                id="message"
                label="Your Message"
                icon={<FiMessageCircle size={13} color={touched.message && errors.message ? '#ff6b9d' : '#6c63ff'} />}
                error={errors.message}
                touched={touched.message}
              >
                <StyledTextarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about your project, idea, or just say hi..."
                  hasError={touched.message && !!errors.message}
                />
              </Field>

              {/* API Error banner */}
              {status === 'error' && (
                <HStack
                  gap={3}
                  px={4} py={3}
                  borderRadius="xl"
                  bg="rgba(255,107,157,0.08)"
                  border="1px solid rgba(255,107,157,0.3)"
                >
                  <FiAlertCircle size={16} color="#ff6b9d" />
                  <Text color="#ff6b9d" fontSize="sm">{apiError}</Text>
                </HStack>
              )}

              {/* Submit button */}
              <Box
                as="button"
                type="submit"
                disabled={status === 'loading'}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="10px"
                w="100%"
                px={8} py="15px"
                borderRadius="xl"
                color="white"
                fontWeight="700"
                fontSize="sm"
                letterSpacing="wide"
                border="none"
                cursor={status === 'loading' ? 'not-allowed' : 'pointer'}
                opacity={status === 'loading' ? 0.7 : 1}
                style={{ background: 'linear-gradient(135deg,#6c63ff,#00d4ff)' }}
                transition="all 0.3s"
                _hover={{
                  transform: status === 'loading' ? 'none' : 'translateY(-2px)',
                  boxShadow: status === 'loading' ? 'none' : '0 10px 30px rgba(108,99,255,0.55)',
                }}
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

              <Text fontSize="xs" color="#4a5568" textAlign="center">
                Both you and I will receive an email confirmation 📧
              </Text>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
