'use client';

import { Card, CardBody, Tab, Tabs, Table, TableBody, TableHeader, TableCell, TableRow, TableColumn } from '@nextui-org/react';
import { useState } from 'react';
import Leaderboard from '@/components/leaderboard';

export default function LeaderboardLayout() {
	const [leaderboardData] = useState({
		Weekly: [
			{ id: 1, rank: 1, username: 'AliceCrypto', xp: 1500, correctAnswers: 95 },
			{ id: 2, rank: 2, username: 'BobChain', xp: 1250, correctAnswers: 88 },
		],
		Monthly: [
			{ id: 1, rank: 1, username: 'CarolCoin', xp: 2200, correctAnswers: 112 },
			{ id: 2, rank: 2, username: 'AliceCrypto', xp: 2000, correctAnswers: 105 },
		],
		Overall: [
			{ id: 1, rank: 1, username: 'DavidNode', xp: 5000, correctAnswers: 250 },
			{ id: 2, rank: 2, username: 'CarolCoin', xp: 4800, correctAnswers: 240 },
		],
	});

	const tabs = [
		{ id: "Weekly", label: "Weekly" },
		{ id: "Monthly", label: "Monthly" },
		{ id: "Overall", label: "Overall" },
	];


	return (
		<div className="flex w-full flex-col p-4">
		  <Tabs
			aria-label="Leaderboard Tabs"
			items={tabs}
			className="text-black mb-4 mt-4"
			color="primary"
		  >
			{(item) => (
			  <Tab key={item.id} title={item.label}>
				<Card className="bg-gray-800">
				  <CardBody className="">
					<Leaderboard data={leaderboardData[item.id as keyof typeof leaderboardData]} />
				  </CardBody>
				</Card>
			  </Tab>
			)}
		  </Tabs>
		</div>
	  );
	}