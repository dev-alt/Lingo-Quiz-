import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from '../app/user/page'

const LoginModal = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: '-100vh' },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login</button>

      <AnimatePresence initial={false}>
        {showLogin && (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              variants={modalVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white p-8 rounded-lg shadow-md w-80 space-y-4"
            >
              <LoginForm onClose={handleCloseLogin} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginModal;