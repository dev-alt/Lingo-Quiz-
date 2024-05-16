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
  import { Avatar, AvatarGroup } from "@nextui-org/avatar";

  export const Navbar = () => {
	return (
	  // NextUI's Navbar component - the container for all navigation elements
	  <NextUINavbar maxWidth="xl" position="sticky" className="bg-gray-900 text-white" >    
		{/* First NavbarContent section (left side) */}
		<NavbarContent className="basis-1/5 sm:basis-full" justify="start">  
		  {/* NavbarBrand: Contains the logo and site name */}
		  <NavbarBrand as="li" className="gap-3 max-w-fit"> 
			<NextLink className="flex justify-start items-center gap-1" href="/"> 
			  <Logo />
			  <p className="font-bold text-inherit">CryptoQuiz</p> 
			</NextLink>
		  </NavbarBrand> 
		</NavbarContent>
  
		{/* Second NavbarContent section (right side, hidden on small screens) */}
		<NavbarContent
		  className="hidden sm:flex basis-1/5 sm:basis-full" // Hidden on small screens, takes 1/5 space on medium and up
		  justify="end"
		>
		  {/*Navigation items*/}
		  <NavbarItem className="hidden sm:flex gap-2 ">
			<ul className="hidden lg:flex gap-4 justify-start ml-2">
			  {siteConfig.navItems.map((item) => (
				<NavbarItem key={item.href}>
				  <NextLink
					className={clsx(
					  linkStyles({ color: "success" }), 
					  "data-[active=true]:text-white data-[active=true]:font-medium" 
					)}
					color="foreground"
					href={item.href}
				  >
					{item.label}
				  </NextLink>
				</NavbarItem>
				
			  ))}
			</ul>	
			<Avatar  src=""  />
		  </NavbarItem>
		</NavbarContent>
  
		{/* Third NavbarContent section (toggle for mobile menu) */}
		<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
		  <NavbarMenuToggle />
		</NavbarContent>
  
		{/* Mobile menu (hidden by default, opens when toggle is clicked) */}
		<NavbarMenu>
		  <div className="mx-4 mt-2 flex flex-col gap-2">
			{siteConfig.navMenuItems.map((item, index) => ( 
			  <NavbarMenuItem key={`${item}-${index}`}>
				<Link 
				  color={  
					index === 2
					  ? "primary"
					  : index === siteConfig.navMenuItems.length - 1
						? "danger"
						: "foreground"
				  }
				  href="#" 
				  size="lg"
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
  