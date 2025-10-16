import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ThemeToggle } from '../../../components/theme-toggle';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [createExpanded, setCreateExpanded] = useState(true);
  const [generatorsExpanded, setGeneratorsExpanded] = useState(true);

  const navItems = [
    { icon: 'fas fa-plus-circle', label: 'New Project', active: true },
    { icon: 'fas fa-certificate', label: 'Halal Certification' },
    { icon: 'fas fa-file-import', label: 'Import from Figma' },
  ];

  const generators = [
    { icon: 'fas fa-shopping-bag', label: 'Product Page Generator' },
    { icon: 'fas fa-rocket', label: 'Landing Page Builder' },
    { icon: 'fas fa-blog', label: 'Blog Post Creator' },
    { icon: 'fas fa-envelope', label: 'Email Campaign Designer' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.aside
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70 }}
    >
      <div className={styles.logo}>
        <motion.button
          className={styles.collapseBtn}
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </motion.button>
        {!isCollapsed && <h1><i className="fas fa-mosque"></i> HalalChain AI</h1>}
      </div>

      <motion.div
        className={styles.navSection}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          variants={itemVariants}
          className={styles.sectionHeader}
          onClick={() => setCreateExpanded(!createExpanded)}
          whileHover={{ backgroundColor: 'rgba(0, 245, 255, 0.1)' }}
        >
          {!isCollapsed && <motion.h3>Create</motion.h3>}
          <motion.i
            className={`fas ${createExpanded ? 'fa-chevron-down' : 'fa-chevron-right'}`}
            animate={{ rotate: createExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
        <AnimatePresence>
          {createExpanded && (
            <motion.div
              className={styles.expandedContent}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map(({ icon, label, active }) => (
                <motion.div
                  variants={itemVariants}
                  whileHover={{
                    x: isCollapsed ? 5 : 8,
                    scale: 1.05,
                    backgroundColor: 'rgba(0, 245, 255, 0.15)',
                    boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  key={label}
                  className={`${styles.navItem} ${active ? styles.active : ''} ${isCollapsed ? styles.collapsedItem : ''}`}
                  title={isCollapsed ? label : ''}
                >
                  <motion.i
                    className={icon}
                    whileHover={{ scale: 1.1, color: 'var(--primary-neon)' }}
                  />
                  {!isCollapsed && <span>{label}</span>}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={styles.navSection}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          variants={itemVariants}
          className={styles.sectionHeader}
          onClick={() => setGeneratorsExpanded(!generatorsExpanded)}
          whileHover={{ backgroundColor: 'rgba(0, 245, 255, 0.1)' }}
        >
          {!isCollapsed && <motion.h3>Generators</motion.h3>}
          <motion.i
            className={`fas ${generatorsExpanded ? 'fa-chevron-down' : 'fa-chevron-right'}`}
            animate={{ rotate: generatorsExpanded ? 0 : -90 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
        <AnimatePresence>
          {generatorsExpanded && (
            <motion.div
              className={styles.expandedContent}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {generators.map(({ icon, label }) => (
                <motion.div
                  variants={itemVariants}
                  whileHover={{
                    x: isCollapsed ? 5 : 8,
                    scale: 1.05,
                    backgroundColor: 'rgba(0, 245, 255, 0.15)',
                    boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  key={label}
                  className={`${styles.navItem} ${isCollapsed ? styles.collapsedItem : ''}`}
                  title={isCollapsed ? label : ''}
                >
                  <motion.i
                    className={icon}
                    whileHover={{ scale: 1.1, color: 'var(--accent-neon)' }}
                  />
                  {!isCollapsed && <span>{label}</span>}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className={styles.themeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <ThemeToggle />
      </motion.div>
    </motion.aside>
  );
}
