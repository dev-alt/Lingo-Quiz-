import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Logo } from "@/components/icons";
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useState } from "react";
import { useAuth } from "@/app/AuthContext";
import LoginModal from "./loginModal";

interface NavbarProps {
	isLoggedIn: boolean;
}

export const Navbar = ({ isLoggedIn }: NavbarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { logout } = useAuth();
	const { isLoggedIn: isAuthenticated } = useAuth();

	const handleMenuItemClick = () => {
		setIsMenuOpen(false);
	};

	return (
		<NextUINavbar maxWidth="xl" position="sticky" className="bg-gray-900 text-white py-4 shadow-lg z-50">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<Link href="/" passHref className="">
						<Logo />
						<p className="font-bold text-3xl text-inherit text-yellow-400">CryptoQuiz</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			{/* Right side (Navigation items) */}
			<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full " justify="end">
				<ul className="hidden lg:flex gap-6 justify-start ml-2 items-center">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<Link href={item.href} passHref>
								{item.label}
							</Link>
						</NavbarItem>
					))}
				</ul>
				{isLoggedIn ? (
					<Dropdown placement="bottom-end" isOpen={isMenuOpen} onOpenChange={setIsMenuOpen}>
						<DropdownTrigger>
							<Avatar className="ml-4 cursor-pointer border-2 border-white" src="" alt="User Avatar" />
						</DropdownTrigger>
						<DropdownMenu aria-label="User Actions">
							<DropdownItem key="profile">
								<Link href="/profile">Profile</Link>
							</DropdownItem>
							<DropdownItem key="settings">
								<Link href="/settings">Settings</Link>
							</DropdownItem>
							<DropdownItem key="logout" className="text-danger" onClick={logout}>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<Dropdown placement="bottom-end" isOpen={isMenuOpen} onOpenChange={setIsMenuOpen}>
						<DropdownTrigger>
							<Avatar className="ml-4 cursor-pointer border-2 border-white" src="" alt="User Avatar" />
						</DropdownTrigger>
						<DropdownMenu aria-label="User Actions">
							<DropdownItem key="profile">
								<Link href="/profile">Create User</Link>
							</DropdownItem>
							<DropdownItem key="settings">
								<Link href="/settings">Sign In</Link>
							</DropdownItem>
						
						</DropdownMenu>
					</Dropdown>					
				)}
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
							<Link
								className="hover:text-blue-500 transition-colors"
								href={item.href}
								onClick={() => handleMenuItemClick()}
								passHref
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
