'use client';

import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import SidebarItem from "@/components/myProgress";
import XpBar from "@/components/xpBar";
import { InviteFriend } from "@/components/inviteFriend";
import { CommunityBar } from "@/components/communityInfo";
import { useAuth } from "./AuthContext";
import LoginModal from "./LoginModal";


const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useAuth();

    return (
        <div className="relative flex flex-col min-h-screen">
            <Navbar isLoggedIn={isLoggedIn} loginElement={<LoginModal />} />
            <main className="container mx-auto max-w-14xl pt-16 px-6 flex-grow bg-gray-800">
                <div className="flex flex-col md:flex-row-reverse">
                    {/* sidebar */}
                    <div className="bg-gray-800 md:min-h-screen md:w-80 flex flex-col items-stretch p-4 space-y-4">
                        <SidebarItem
                            avatar=""
                            username="John Doe"
                            level={5}
                            totalXP={1200}
                            rank={"Bronze"}
                            badges={5}
                            streak={3}
                        />
                        <XpBar />
                        <div className="hidden md:flex">
                            <InviteFriend />
                        </div>
                        <div className="hidden md:flex">
                            <CommunityBar />
                        </div>
                    </div>

                    {/* main body */}
                    <div className="flex-1 mb-8 md:mb-0">{children}</div>
                </div>
            </main>
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default AppLayout;