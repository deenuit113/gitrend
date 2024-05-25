import { useEffect, useState } from 'react';
import { fetchTrendingRepos } from '../lib/github';
import WordCloud from '../components/WordCloud';
import TrendChart from '../components/TrendChart';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const trendingRepos = await fetchTrendingRepos();
      setRepos(trendingRepos);
      const wordData = trendingRepos.map(repo => ({ text: repo.name, value: repo.stargazers_count }));
      setWords(wordData);
    };
    loadData();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>GitHub Trends</div>
          <ul className={styles.navLinks}>
            <li><a href="#wordcloud">Word Cloud</a></li>
            <li><a href="#trendchart">Trend Chart</a></li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <section id="wordcloud" className={styles.section}>
          <motion.div
            className={styles.wordCloud}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <WordCloud words={words} />
          </motion.div>
        </section>
        <section id="trendchart" className={styles.section}>
          <TrendChart data={repos} />
        </section>
      </main>
    </div>
  );
};

export default Home;