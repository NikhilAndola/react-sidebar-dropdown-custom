import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SidebarMenu = ({ showAnimation, route, isOpen }) => {
  const menuAnimation = {
    hidden: {
      heigth: 0,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const menuItemAnimation = {
    hidden: (i) => ({
      padding: 0,
      x: "-100%",
      transition: {
        duration: (i + 1) * 0.1
      }
    }),
    show: (i) => ({
      x: 0,
      transition: {
        duration: (i + 1) * 0.1
      }
    })
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={showAnimation}
                className="link_text"
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <FaAngleDown />
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div key={i} custom={i} variants={menuItemAnimation}>
                <NavLink
                  activeClassName="active"
                  to={subRoute.path}
                  className="link"
                >
                  <div className="icon">{subRoute.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        className="link_text"
                      >
                        {subRoute.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
