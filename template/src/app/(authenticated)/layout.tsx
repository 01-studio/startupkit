"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  Calendar,
  ChartPie,
  DownloadCloud,
  Folder,
  Home,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { AppHeader } from "@/components/app/AppHeader";

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Team", href: "#", icon: Users, current: false },
  { name: "Projects", href: "#", icon: Folder, current: false },
  { name: "Calendar", href: "#", icon: Calendar, current: false },
  { name: "Documents", href: "#", icon: DownloadCloud, current: false },
  { name: "Reports", href: "#", icon: ChartPie, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <div className="hidden sm:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex flex-col px-6 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
            <div className="flex items-center h-16 shrink-0">
              <Image
                alt="StartupKit"
                src="/startupkit-logo.svg"
                className="w-auto h-12 -ml-3"
                width={100}
                height={100}
              />
            </div>
            <nav className="flex flex-col flex-1">
              <ul role="list" className="flex flex-col flex-1 gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              item.current
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0",
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your teams
                  </div>
                  <ul role="list" className="mt-2 -mx-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? "border-indigo-600 text-indigo-600"
                                : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium",
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto -mx-6">
                  <a
                    href="#"
                    className="flex items-center px-6 py-3 text-sm font-semibold leading-6 text-gray-900 gap-x-4 hover:bg-gray-50"
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="w-8 h-8 rounded-full bg-gray-50"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <AppHeader />

        <main className="h-screen py-10 lg:pl-72 bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
