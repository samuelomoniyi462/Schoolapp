import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Improved LandingPage with Blue Color Palette
 * - Consistent blue color scheme throughout
 * - Better accessibility with proper ARIA attributes
 * - Performance optimizations with useMemo for static data
 * - Improved semantic HTML structure
 */

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Extracted components for better maintainability
const Header = ({ navItems, scrollToSection, mobileMenuOpen, setMobileMenuOpen }) => {
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, [setMobileMenuOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-blue-800 md:backdrop-blur-md">
      <nav aria-label="Main navigation" className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-1"
            aria-label="Go to homepage"
          >
            Academic Excellence
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-1"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white/90 hover:text-white px-2 py-1 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label={`Scroll to ${item} section`}
                >
                  {item}
                </button>
              </li>
            ))}
            <Link to="/login" className="text-white">Login</Link>
          </ul>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <ul
            id="mobile-menu"
            className="md:hidden mt-3 rounded-lg bg-blue-700 border border-white/10 overflow-hidden"
            role="menu"
          >
            {navItems.map((item) => (
              <li key={item} className="border-b border-white/10 last:border-b-0" role="none">
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="w-full text-left text-white px-4 py-3 hover:bg-blue-600 transition focus:outline-none focus:bg-blue-600"
                  role="menuitem"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.article
    variants={fadeUp}
    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 border border-blue-100"
    tabIndex={0}
  >
    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600" />
    <div className="text-5xl mb-5 text-blue-600" aria-hidden="true">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-blue-800">{title}</h3>
    <p className="text-blue-700 leading-relaxed">{description}</p>
  </motion.article>
);

const NewsCard = ({ icon, title, date, description }) => (
  <motion.article
    variants={fadeUp}
    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2 focus-within:ring-2 focus-within:ring-blue-500 border border-blue-100"
    tabIndex={0}
  >
    <div className="h-44 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-5xl" aria-hidden="true">
      {icon}
    </div>
    <div className="p-6">
      <h3 className="text-lg font-bold mb-1 text-blue-800">{title}</h3>
      <time className="text-blue-600 text-sm mb-3 block" dateTime={new Date(date).toISOString()}>
        {date}
      </time>
      <p className="text-blue-700 leading-relaxed">{description}</p>
    </div>
  </motion.article>
);

const TestimonialCard = ({ quote, author }) => (
  <motion.blockquote
    variants={fadeUp}
    className="bg-blue-700/80 backdrop-blur-lg p-6 rounded-2xl border border-blue-400 focus:outline-none focus:ring-2 focus:ring-white"
    tabIndex={0}
  >
    <p className="text-white italic text-lg mb-4 leading-relaxed">"{quote}"</p>
    <footer className="text-blue-100 font-semibold opacity-90">— {author}</footer>
  </motion.blockquote>
);

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
      // Focus on the section for better accessibility
      setTimeout(() => el.setAttribute('tabindex', '-1') && el.focus({ preventScroll: true }), 300);
    }
  }, []);

  // Content data with useMemo to prevent unnecessary re-renders
  const navItems = useMemo(() => ["Home", "About", "Programs", "Admissions", "News", "Contact"], []);

  const features = useMemo(() => [
    {
      icon: "🎓",
      title: "Elementary Excellence",
      description: "We support every child through their formative years with an innovative curriculum that nurtures curiosity and foundational skills.",
    },
    {
      icon: "🌟",
      title: "Future Leaders",
      description: "We build character, confidence, and critical thinking—preparing responsible global citizens with strong values.",
    },
    {
      icon: "🎯",
      title: "University Pathway",
      description: "Certified teachers and mentors guide students with personalized academic pathways to top global universities.",
    },
  ], []);

  const stats = useMemo(() => [
    { value: "98%", label: "Graduation Rate" },
    { value: "15:1", label: "Student-Teacher Ratio" },
    { value: "25+", label: "Nationalities" },
    { value: "100%", label: "University Acceptance" },
  ], []);

  const programs = useMemo(() => [
    {
      icon: "🌱",
      title: "Early Years Program",
      description: "A Montessori-inspired, play-based approach that fosters creativity, independence, and a love of learning.",
    },
    {
      icon: "📚",
      title: "Primary Education",
      description: "International Primary Curriculum (IPC) that builds global awareness and academic excellence through thematic learning.",
    },
    {
      icon: "🎖️",
      title: "Secondary School",
      description: "British curriculum preparing students for IGCSEs with advanced facilities and expert teaching staff.",
    },
  ], []);

  const news = useMemo(() => [
    {
      icon: "🏆",
      title: "Students Win International Science Championship",
      date: "March 2025",
      description: "Our students secured first place in the Global Science Innovation Challenge, earning recognition and scholarships.",
    },
    {
      icon: "👨‍🏫",
      title: "Teacher Excellence Recognition",
      date: "February 2025",
      description: "Our mathematics teacher ranked in the top 1% globally, bringing honor to our community.",
    },
    {
      icon: "🎭",
      title: "Annual Cultural Festival Success",
      date: "January 2025",
      description: "A vibrant celebration of talent and diversity with record participation and community engagement.",
    },
  ], []);

  const testimonials = useMemo(() => [
    {
      quote: "The teachers are attentive and genuinely care about each student. The personalized approach makes all the difference.",
      author: "Sarah Johnson, Parent",
    },
    {
      quote: "The school's whole-child philosophy is evident. Academic Excellence truly educates beyond the books.",
      author: "Michael Chen, Parent",
    },
    {
      quote: "Quality education at its finest. I can see steady progress in my child across academics and character.",
      author: "Amara Okafor, Parent",
    },
  ], []);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        navItems={navItems} 
        scrollToSection={scrollToSection} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden"
        aria-label="Introduction"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900" />
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300 rounded-full animate-pulse delay-100" />
          <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-blue-500 rounded-full animate-pulse delay-200" />
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-blue-400 rounded-full animate-pulse delay-300" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 max-w-4xl px-6"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Give Your Child a Great Head Start in Life
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            Every child deserves a quality and well-rounded education. We provide world-class international
            learning that prepares students for global citizenship and academic excellence.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("admissions")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:-translate-y-1 hover:shadow-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              Apply for Admission
            </button>
            <button
              onClick={() => scrollToSection("programs")}
              className="bg-transparent border-2 border-white hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Explore Programs
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-blue-50" aria-labelledby="about-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-800">
              Leading International Education
            </h2>
            <motion.div variants={fadeIn} className="w-16 h-1 bg-blue-600 mx-auto mb-14" />
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-800 text-white" aria-label="School Statistics">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="p-2">
                <div className="text-4xl md:text-5xl font-bold mb-2">{s.value}</div>
                <p className="text-blue-200">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 bg-white" aria-labelledby="programs-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 id="programs-heading" className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-800">
              Our Academic Programs
            </h2>
            <motion.div variants={fadeIn} className="w-16 h-1 bg-blue-600 mx-auto mb-14" />
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((p) => (
                <FeatureCard key={p.title} {...p} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="py-20 bg-blue-50" aria-labelledby="news-heading">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 id="news-heading" className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-800">
              Featured News & Achievements
            </h2>
            <motion.div variants={fadeIn} className="w-16 h-1 bg-blue-600 mx-auto mb-14" />
            <div className="grid md:grid-cols-3 gap-8">
              {news.map((n) => (
                <NewsCard key={n.title} {...n} />
              ))}
            </div>
            <motion.div variants={fadeUp} className="text-center mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-300">
                View All News & Events
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-blue-900 relative overflow-hidden" aria-label="Testimonials">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 rounded-full animate-pulse delay-100" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            What Our Parents Say
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} {...t} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Admissions / CTA */}
      <section
        id="admissions"
        className="py-20 bg-blue-800 text-center text-white"
        aria-labelledby="admissions-heading"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 id="admissions-heading" className="text-4xl md:text-5xl font-bold mb-6">
            2025/26 Scholarship Entrance Examination
          </h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed"
          >
            Prepare your child for a bright future. Apply for our scholarship examination and unlock access to
            quality education that fosters self-development and career success.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-white hover:bg-blue-100 text-blue-800 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:-translate-y-1 hover:shadow-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Apply Now
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white">
              Download Brochure
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-blue-900 text-white py-16" aria-labelledby="footer-heading">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Academic Excellence</h3>
              <p className="text-blue-100 mb-4">
                Providing world-class international education that prepares students for global citizenship and
                academic excellence.
              </p>
              <div className="flex space-x-4" aria-label="Social links">
                <a href="#" className="text-blue-100 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1" aria-label="Facebook">
                  <span className="text-xl" aria-hidden="true">📱</span>
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1" aria-label="Twitter">
                  <span className="text-xl" aria-hidden="true">🐦</span>
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1" aria-label="Instagram">
                  <span className="text-xl" aria-hidden="true">📸</span>
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1" aria-label="LinkedIn">
                  <span className="text-xl" aria-hidden="true">💼</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <address className="space-y-3 text-blue-100 not-italic">
                <p className="flex items-center">
                  <span className="mr-3" aria-hidden="true">📍</span>123 Education Boulevard
                </p>
                <p className="flex items-center">
                  <span className="mr-3" aria-hidden="true">📞</span>+1 (555) 123-4567
                </p>
                <p className="flex items-center">
                  <span className="mr-3" aria-hidden="true">✉️</span>admissions@academicexcellence.edu
                </p>
              </address>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Quick Links</h3>
              <nav aria-label="Footer navigation">
                <div className="space-y-3 text-blue-100">
                  {["Admissions", "Programs", "News", "Contact"].map((item) => (
                    <p key={item}>
                      <button
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="hover:text-white transition text-left focus:outline-none focus:text-white"
                      >
                        • {item}
                      </button>
                    </p>
                  ))}
                </div>
              </nav>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Newsletter</h3>
              <p className="text-blue-100 mb-4">Stay updated with our latest news and events</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks for subscribing!");
                }}
                className="flex"
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-l-lg focus:outline-none flex-grow text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-r-lg transition focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-blue-700 pt-8 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} Academic Excellence School. Leading international education with excellence and innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;