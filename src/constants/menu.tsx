import { ReactNode } from "react";
import {
  FaUsers,

} from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";
import { VscDebugStart } from "react-icons/vsc";


export interface Item {
  name: string;
  path: string;
  icon?: ReactNode;
}

export interface MenuItem extends Item {
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [

  {
    name: "Yakka tartibda",
    path: "/start",
    icon: <VscDebugStart />,
  },

  {
    name: "Jamoaviy tartibda",
    path: "/start",
    icon: <VscDebugStart />,
  },
  {
    name: "Natijalar",
    path: "/results",
    icon: <GrScorecard />,
  },

  {
    name: "Sozlamalar",
    path: "/settings",
    icon: <IoSettingsOutline />,
  },
  {
    name: "Adminlar",
    path: "/admins",
    icon: <FaUsers />,
  },



];
