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
import { useQuery, gql } from '@apollo/client'; 


// GraphQL query to fetch user profile data
const GET_USER_PROFILE_BY_USER_ID = gql`
  query GetUserProfileByUserId($userId: ID!) {
    profileByUserId(userId: $userId) {
      _id
      username
      handle
      level
      xp
      imageUrl
    }
  }
`;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn, user } = useAuth();

    console.log("user",user);

  // Fetch user profile data when logged in
  const { loading, error, data: profileData } = useQuery(GET_USER_PROFILE_BY_USER_ID, {  
    variables: { userId: user?.userId },
    onError: (error) => {
      console.error("Error fetching user profile:", error);
    },
  });
  console.log(profileData);


  console.log("fetching profile",profileData);

    return (
        <div className="relative flex flex-col min-h-screen">
            <Navbar isLoggedIn={isLoggedIn} loginElement={<LoginModal />} />
            <main className="container mx-auto max-w-14xl pt-16 px-6 flex-grow bg-gray-800">
                <div className="flex flex-col md:flex-row-reverse">
                    {/* sidebar */}
                    <div className="bg-gray-800 md:min-h-screen md:w-80 flex flex-col items-stretch p-4 space-y-4">
                        <SidebarItem
                        avatar={profileData?.profileByUserId?.avatarUrl || ""}
                        username={profileData?.profileByUserId?.username || "Guest"}
                        handle={profileData?.profileByUserId?.handle || "guest"}
                        level={profileData?.profileByUserId?.level || 1}
                        totalXP={profileData?.profileByUserId?.xp || 0}
                        rank={profileData?.profileByUserId?.rank || "Bronze"}
                        badges={profileData?.profileByUserId?.badges || []}
                        streak={profileData?.profileByUserId?.streak || 0}
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