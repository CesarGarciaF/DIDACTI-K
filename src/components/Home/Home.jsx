import { useAuth } from "../../context/AuthContext";
import React, { useState, useRef, useEffect } from "react";
import { Layout, theme } from "antd";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import {
  LuActivity,
  LuBookMarked,
  LuBookOpen,
  LuCalendar,
  LuGroup,
  LuHome,
  LuMenuSquare,
  LuSettings,
  LuUsers2,
} from "react-icons/lu";
import "./Home.css";

import { Sidebar, SidebarItem } from "./Layout/Sidebar/Sidebar.component";
import "primeicons/primeicons.css";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Breadcrumb } from "./Layout/Breadcrumb/Breadcrumb.component";
import { Toolbar } from "./Layout/Toolbar/Toolbar.component";

// import { useUsers } from "../../context/UserContext";

const userP = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Home() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [sidebarClass, setSidebarClass] = useState("sidebar");
  const [isSwitched, setIsSwitched] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const navigation = [
    // { name: "Dashboard", href: "#", current: true },
    // { name: "Team", href: "#", current: false },
    // { name: "Projects", href: "#", current: false },
    // { name: "Calendar", href: "#", current: false },
    // { name: "Reports", href: "#", current: false },
  ];
  const userNavigation = [
    { name: "Your Profile", href: "/home/profile" },
    { name: "Settings", href: "#" },
    { name: "Sign out", onclick: () => logout() },
  ];

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  // const { currentUser, fetchUserById } = useUsers();
  // const [error, setError] = useState(null);

  // const toggleTheme = () => {
  //   setDarkTheme(!darkTheme);
  // };

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  // const cambiarClase = () => {
  //   setSidebarClass(() => (isSwitched ? "sidebar" : "sidebar-toggle"));
  //   setIsSwitched(!isSwitched);
  // };

  return (
    <>
      <div className="grid grid-cols-[max-content_minmax(0,1fr)]">
        <Sidebar>
          <SidebarItem
            icon={<LuHome size={20} />}
            text={"Dashboard"}
            link={"dashboard"}
            alert
          />
          <SidebarItem
            icon={<LuCalendar size={20} />}
            text={"Calendario"}
            link={"calendario"}
          />
          <SidebarItem
            icon={<LuGroup size={20} />}
            text={"Grupos"}
            link={"grupos"}
          />
          {/* <SidebarItem
            icon={<LuBookMarked size={20} />}
            text={"Cursos"}
            link={"cursos"}
          /> */}
          <SidebarItem
            icon={<LuBookOpen size={20} />}
            text={"Planeaciones"}
            link={"planeaciones"}
          />
          {/* <SidebarItem
            icon={<LuUsers2 size={20} />}
            text={"Patrocinadores"}
            link={"sponsors"}
          /> */}
          <SidebarItem
            icon={<LuSettings size={20} />}
            text={"Ajustes"}
            link={"ajustes"}
          />
        </Sidebar>
        <div className="h-screen">
          <Disclosure
            as="nav"
            style={{ minHeight: "0" }}
            className="bg-gray-800 rounded-lg mx-1 my-1"
          >
            {({ open }) => (
              <>
                <div className="mx-auto w-full max-w-7xl py-1 px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 items-center">
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user?.avatar}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {/* {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))} */}

                              <Menu.Item
                                className="block px-4 py-2 text-sm text-gray-700"
                                as="button"
                                onClick={() => logout()}
                              >
                                Cerrar Sesión
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <Disclosure.Button as="a" to={() => logout}>
                      Cerrar Sesión
                    </Disclosure.Button>
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user?.photo}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user?.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    {/* <div className="mt-3 space-y-1 px-2">
                    </div> */}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <header>
            <div className="max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {/* Dashboard */}
                <Breadcrumb />
                <Toolbar />
              </h1>
            </div>
          </header>
          <main className="w-full max-h-[calc(100%-132px)] overflow-y-auto">
            <div className="sm:px-6 lg:px-8">
              {/* Your content */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
