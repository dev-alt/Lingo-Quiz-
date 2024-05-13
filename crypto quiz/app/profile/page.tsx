'use client';

import {
	Avatar,
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Link,
} from '@nextui-org/react'; // Removed Grid, Row, and Text
import { Icon } from '@iconify/react';
import { CSSProperties } from 'react'; // Import CSSProperties for style typing

interface ProfilePageProps {
	username: string;
	handle: string;
	avatarUrl: string;
	level: number;
	xp: number;
	badges: number;
	streak: number;
	challengesCompleted: number;
	joinDate: string;
	bio?: string;
	skills?: string[];
}
const fakeProfileData: ProfilePageProps = {
	username: 'CryptoCrafter', // Creative crypto-related username
	handle: '@0xCrafter',       // Handle often includes "0x" or similar crypto references
	avatarUrl: 'https://i.pravatar.cc/150?img=21', // Placeholder image service
	level: 15,                 // Level can be a simple number
	xp: 3850,                  // XP should reflect the user's progress
	badges: 7,                 // Number of badges earned
	streak: 10,                // Current daily streak
	challengesCompleted: 42,   // Number of challenges successfully completed
	joinDate: 'January 1, 2023', // Date the user joined the platform
	bio: "Crypto enthusiast and lifelong learner. Passionate about decentralization and the future of finance. Let's build together!",
	skills: [                    // Skills can be related to crypto or general
		'Solidity',
		'Smart Contracts',
		'DeFi',
		'Technical Analysis',
		'Blockchain Development',
	],
};


const ProfilePage: React.FC<ProfilePageProps> = ({
	username,
	handle,
	avatarUrl,
	level,
	xp,
	badges,
	streak,
	challengesCompleted,
	joinDate,
	bio,
	skills,
}) => {
	return (
		<div className="bg-gray-800 min-h-screen p-8 text-white">
			<div className=' shadow-lg shadow-slate-100'>
				{/* Header Section */}
				<div className="relative">
					<img
						src="https://e0.pxfuel.com/wallpapers/774/739/desktop-wallpaper-town-8-bit-resolution-artist-and-background-8-bit-anime.jpg" // Replace with actual image URL
						alt="Profile Banner"
						className="w-full h-40 object-cover rounded-lg mb-4"
					/>
					<div className="absolute bottom-4 left-4">
						<Avatar src={fakeProfileData.avatarUrl} size="lg" color="default" />
					</div>
				</div>

				{/* User Info Section */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-semibold">{fakeProfileData.username}</h1>
						<p className="text-sm text-gray-400">{fakeProfileData.handle}</p>
					</div>
					<Button>Edit Profile</Button>
				</div>
			</div>

			{/* Bio Section */}
			<Card className="bg-gray-900 p-4 rounded-lg mb-4 text-white shadow-lg shadow-slate-500">
				<CardBody>
					<p className="text-base">
						{fakeProfileData.bio || "You don't have anything in your bio. Go to Account and Edit Profile to add something cool about yourself."}
					</p>
				</CardBody>
				<CardFooter>
					<div className="flex items-center">
						<Icon icon="mdi:calendar-range" className="mr-1 text-teal-400" />
						<p className="text-sm">Joined {fakeProfileData.joinDate}</p>
					</div>
				</CardFooter>
			</Card>
			<Divider className="my-4" />
			{/* Stats Section */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-2">Stats</h2>
				<Divider className="my-4 " />
				<div className="grid grid-cols-2 gap-4">
					<div className='border-2'>
						<div>Challenges</div>
						{fakeProfileData.challengesCompleted}
					</div>
					<div className='border-2'>
						<div> Total XP	  </div>
						{fakeProfileData.xp}
					</div>
					<div className='border-2'>
						<div> Badges	  </div>
						{fakeProfileData.badges}
					</div>
					<div className='border-2'>
						<div>  Daily Streak	  </div>
						{fakeProfileData.streak}
					</div>
				</div>
			</div>
			<Divider className="my-4" />
		</div>
	);
};

export default ProfilePage;