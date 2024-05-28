import React from 'react';
import WordCloud from '../components/WordCloud';

const Header = () => (
  <header>
    <h1>zz</h1>
    <nav>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
);

const MainContent = () => (
  <main>
    {/* Main content area */}
    <section id="features">
      <h2>메뉴 1</h2>
      {/* Feature content goes here */}
    </section>
    <section id="pricing">
      <h2>메뉴 1</h2>
      {/* Pricing content goes here */}
    </section>
    <section id="contact">
      <h2>콘택트</h2>
      {/* Contact form or information goes here */}
    </section>
    <section>
      <h2>WordCloud</h2>
      <WordCloud />
    </section>
  </main>
);

const Footer = () => (
  <footer>
    <p>&copy; 2024 Semacoral. All rights reserved.</p>
    <nav>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
      </ul>
    </nav>
  </footer>
);

const HomePage = () => (
  <div>
    <Header />
    <MainContent />
    <Footer />
  </div>
);

export default HomePage;