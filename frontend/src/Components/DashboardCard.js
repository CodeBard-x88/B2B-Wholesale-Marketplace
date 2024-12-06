import React from 'react';
import { motion } from 'framer-motion';

const DashboardCard = ({ fieldName, fieldValue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-lg p-6 w-64 h-40 flex flex-col justify-between"
      style={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold text-[#34383A]"
      >
        {fieldValue}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="text-sm font-medium text-[#FF7104]"
      >
        {fieldName}
      </motion.div>
    </motion.div>
  );
};

export default DashboardCard;

