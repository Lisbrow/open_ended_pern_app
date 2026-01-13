import { motion } from 'motion/react';
import './Tabs.css';

const tabs = [
  { id: 'today', label: 'Today' },
  { id: 'history', label: 'History' },
  { id: 'insights', label: 'Insights' },
];

function Tabs({ activeTab, onChange }) {
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  return (
    // Tabs container with fade-in animation
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='TabsContainer glass-card'
    >
      {/* TAB MENU */}
      <div className='Tabs'>
        {tabs.map((tab) => (
          // Sliding colored tab pill animation
          <button
            key={tab.id}
            className='TabPill'
            onClick={() => onChange(tab.id)}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId='active-pill'
                className='ActivePill'
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}

            {/* TAB TEXT */}
            <span className={activeTab === tab.id ? 'active' : ''}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default Tabs;
