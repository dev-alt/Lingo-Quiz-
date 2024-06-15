'use client';

import { Card, CardBody, Tab, Tabs, Table, TableBody, TableHeader, TableCell, TableRow, TableColumn } from '@nextui-org/react';
import { useState } from 'react';
import Leaderboard from '@/components/leaderboard';

export default function LeaderboardLayout() {
	const [leaderboardData] = useState({
		Weekly: [
			{ id: 1, rank: 1, username: 'AliceCrypto', xp: 1500, correctAnswers: 95, avatar: 'https://randomuser.me/api/portraits'},
			{ id: 2, rank: 2, username: 'BobChain', xp: 1250, correctAnswers: 88, avatar: 'https://randomuser.me/api/portraits'},
			{ id: 3, rank: 3, username: 'BobChain3', xp: 1250, correctAnswers: 88, avatar: 'https://randomuser.me/api/portraits'},
			{ id: 4, rank: 4, username: 'BobChain', xp: 1250, correctAnswers: 88, avatar: 'https://randomuser.me/api/portraits'},
			{ id: 5, rank: 5, username: 'BobChain', xp: 1250, correctAnswers: 88, avatar: 'https://randomuser.me/api/portraits'},
			{ id: 6, rank: 6, username: 'BobChain', xp: 1250, correctAnswers: 88, avatar: 'https://randomuser.me/api/portraits'},
			{ id: 7, rank: 7, username: 'BobChain', xp: 1250, correctAnswers: 88, avatar: 'https://randomuser.me/api/portraits'},
			{ id: 8, rank: 8, username: 'BobChain', xp: 1250, correctAnswers: 88, avatar: 'https://randomuser.me/api/portraits'},
			{ id: 9, rank: 9, username: 'BobChain', xp: 1250, correctAnswers: 88, avatar: 'https://randomuser.me/api/portraits'},
			{ id: 10, rank: 10, username: 'BobChain', xp: 1250, correctAnswers: 88, avatar: 'https://randomuser.me/api/portraits'},
		]
	});



	return (
		<div className="flex w-full flex-col p-4 border-teal-400 border-2">
		  {Object.entries(leaderboardData).map(([key, leaderboard]) => (
			<Card key={key} className="bg-gray-800 mb-4">
			  <CardBody className="flex flex-col items-center">

				<Leaderboard data={leaderboard} />
			  </CardBody>
			</Card>
		  ))}
		</div>
	  );
	}