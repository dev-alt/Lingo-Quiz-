'use client';

import { Card, CardBody, Tab, Tabs, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react';
import { useState } from 'react';
import { LeaderboardEntry } from '../types/leaderboard.types';



function Leaderboard({ data }: { data: LeaderboardEntry[] }) {
  const columns: { key: keyof LeaderboardEntry; label: string }[] = [
    { key: 'rank', label: 'Rank' },
    { key: 'username', label: 'Username' },
    { key: 'xp', label: 'XP' },
    { key: 'correctAnswers', label: 'Correct Answers' },
  ];

  return (
    <div className="w-full p-4 overflow-x-auto"> 
    <Table aria-label="Leaderboard Table"    
          classNames={{
             table: "p-0 m-0 w-full h-full overflow-x-auto ",
            // thead: "[&>tr]:first:shadow-none [&>tr]:first:rounded-none border-b-2 border-default-200",
            // th: "bg-transparent font-bold text-lg text-green-500 border-r-2 border-default-200 last:border-none pb-0 rounded-none first:rounded-t-none first:rounded-b-none last:rounded-t-none last:rounded-b-none last:rounded-t-none",
            // base: "h-full max-w-5xl h-fit",
            // td: "text-lg border-r-2 last:border-none border-default-200",
             wrapper: " bg-gray-800 border-4 shadow-lg border-teal-200 rounded-lg",
            // tbody: "border-t",
            // tr: "even:bg-green-500 even:bg-opacity-50 data-[selected=true]:bg-default-100",
          }}
    >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} 
                        className="bg-teal-500 text-white text-center font-semibold ">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.key} className="bg-yellow-100 text-black">{item[column.key]}</TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Leaderboard;