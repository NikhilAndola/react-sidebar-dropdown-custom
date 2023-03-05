import { AnimatePresence, motion } from "framer-motion";
import {
  FaAngleDown,
  FaBars,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiCog, BiSearch } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { AiTwotoneFileExclamation, AiFillHeart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";

const Routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />
  },
  {
    path: "/messages",
    name: "Messages",
    icon: <MdMessage />
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />
  },
  {
    path: "/file-manager",
    name: "File Manager",
    icon: <AiTwotoneFileExclamation />
  },
  {
    path: "/order",
    name: "Order",
    icon: <BsCartCheck />
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile",
        icon: <FaUser />
      },
      {
        path: "/settings/2fa",
        name: "2FA",
        icon: <FaLock />
      },
      {
        path: "/settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />
      }
    ]
  },
  {
    path: "/saved",
    name: "Saved",
    icon: <AiFillHeart />
  }
];

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: isOpen ? "200px" : "35px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 11
          }
        }}
        className="sidebar"
      >
        <div className="top_section">
          {isOpen && (
            <motion.h1
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={showAnimation}
              className="logo"
            >
              DoSomeCoding
            </motion.h1>
          )}
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="search">
          <div className="search_icon">
            <BiSearch />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.input
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={inputAnimation}
                placeholder="Search..."
              />
            )}
          </AnimatePresence>
        </div>
        <section className="routes">
          {Routes.map((route) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  isOpen={isOpen}
                  showAnimation={showAnimation}
                  route={route}
                  key={route.name}
                />
              );
            }

            return (
              <NavLink
                activeClassName="active"
                to={route.path}
                key={route.name}
                className="link"
              >
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
              </NavLink>
            );
          })}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
