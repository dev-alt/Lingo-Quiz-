'use client';
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { Logo } from "@/components/icons";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useState } from "react";
import { useRef } from "react";



export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuItemClick = () => {
		setIsMenuOpen(false);

	};

	return (
		<NextUINavbar maxWidth="xl" position="sticky" className="bg-gray-900 text-white py-4 shadow-lg z-50">		{/* Left side (Brand) */}
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-2" href="/">
						<Logo />
						<p className="font-bold text-3xl text-inherit text-yellow-400">CryptoQuiz</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			{/* Right side (Navigation items) */}
			<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full " justify="end">
				<ul className="hidden lg:flex gap-6 justify-start ml-2 items-center">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "success" }),
									"relative font-bold text-3xl text-yellow-400 hover:text-blue-500 transition-colors duration-300"
								)}
								color="foreground"
								href={item.href}
							>
								<span className="relative z-10  text-xl">{item.label}</span>
								<span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
							</NextLink>
						</NavbarItem>
					))}
				</ul>
				{/* Avatar with Dropdown */}
				<Dropdown placement="bottom-end" isOpen={isMenuOpen} onOpenChange={setIsMenuOpen}>
					<DropdownTrigger>
						<Avatar
							className="ml-4 cursor-pointer border-2 border-white"
							src=""
							alt="User Avatar"
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="User Actions">
						<DropdownItem key="profile">
							<NextLink href="/profile">Profile</NextLink>
						</DropdownItem>
						<DropdownItem key="settings">
							<NextLink href="/settings">Settings</NextLink>
						</DropdownItem>
						<DropdownItem key="logout" className="text-danger">
							Log Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>

			{/* Mobile menu toggle */}
			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<NavbarMenuToggle />
			</NavbarContent>

			{/* Mobile menu */}
			<NavbarMenu>
				<div className="mx-4 mt-8 flex flex-col gap-2 text-end">
					{siteConfig.navItems.map((item) => (
						<NavbarMenuItem key={item.href}>
							<NextLink
								className="hover:text-blue-500 transition-colors"
								href={item.href}
								onClick={() => handleMenuItemClick()} // Use the handler
							>
								{item.label}
							</NextLink>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
