"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";

interface InputState {
	area: string;
	items: string[];
	talents: string[];
	numSlimes: number;
	timeOfDay: string;
	charLevel: number;
}

const validAreas = ["Forest", "Swamp", "Cave"];
const validItems = ["Slime Necklace", "Lucky Charm"];
const validTalents = ["Slime Whisperer", "Treasure Hunter"];
const validTimes = ["Day", "Night"];

// Prior probabilities (can be adjusted based on game data)
const pRareItem = 0.05;
const pNoRareItem = 1 - pRareItem;

// Conditional probabilities (hypothetical example)
const pAreaGivenRareItem = { Forest: 0.6, Swamp: 0.2, Cave: 0.2 };
const pAreaGivenNoRareItem = { Forest: 0.3, Swamp: 0.4, Cave: 0.3 };
const pItemGivenRareItem = { "Slime Necklace": 0.35, "Lucky Charm": 0.35 };
const pItemGivenNoRareItem = { "Slime Necklace": 0.2, "Lucky Charm": 0.3 };
const pTalentGivenRareItem = { "Slime Whisperer": 0.15, "Treasure Hunter": 0.2 };
const pTalentGivenNoRareItem = { "Slime Whisperer": 0.1, "Treasure Hunter": 0.2 };
const pTimeGivenRareItem = { Day: 0.4, Night: 0.6 };
const pTimeGivenNoRareItem = { Day: 0.6, Night: 0.4 };

function calculateRareItemProbability(inputs: InputState): number {

	// Number of slimes influence (simplified model)
	const pNumSlimesGivenRareItem = 1 - Math.pow(1 - pRareItem, inputs.numSlimes);
	const pNumSlimesGivenNoRareItem = Math.pow(1 - pRareItem, inputs.numSlimes);

	// Character level influence (simplified model)
	const pCharLevelGivenRareItem = Math.min(0.001 * inputs.charLevel, 0.5);
	const pAreaGivenRareItem: { [key: string]: number } = { Forest: 0.6, Swamp: 0.2, Cave: 0.2 };
	const pTimeGivenRareItem: { [key: string]: number } = { Day: 0.4, Night: 0.6 };

	// Calculate numerator of Bayes' Theorem
	let numerator =
		pRareItem *
		pAreaGivenRareItem[inputs.area] *
		pTimeGivenRareItem[inputs.timeOfDay] *
		pNumSlimesGivenRareItem *
		pCharLevelGivenRareItem;

	for (const item of inputs.items) {
		numerator *= (pItemGivenRareItem[item as keyof typeof pItemGivenRareItem] || 1.0);
	}

	const pAreaGivenNoRareItem: { [key: string]: number } = { Forest: 0.3, Swamp: 0.4, Cave: 0.3 };

	const pTimeGivenNoRareItem: { [key: string]: number } = { Day: 0.6, Night: 0.4 };

	for (const talent of inputs.talents) {
		numerator *= (pTalentGivenRareItem[talent as keyof typeof pTalentGivenRareItem] || 1.0);
	}

	// Calculate denominator of Bayes' Theorem (similar to numerator, but with no rare item)
	let denominator =
		pNoRareItem *
		pAreaGivenNoRareItem[inputs.area] *
		pTimeGivenNoRareItem[inputs.timeOfDay] *
		pNumSlimesGivenNoRareItem *
		pCharLevelGivenRareItem;

	for (const item of inputs.items) {
		denominator *= (pItemGivenNoRareItem[item as keyof typeof pItemGivenNoRareItem] || 1.0);
	}

	for (const talent of inputs.talents) {
		denominator *= (pTalentGivenNoRareItem[talent as keyof typeof pTalentGivenNoRareItem] || 1.0);
	}

	// Final probability
	const finalProbability = numerator / (numerator + denominator);
	return finalProbability;
}


export default function RareItemCalculator() {
	const [inputs, setInputs] = useState<InputState>({
		area: validAreas[0],
		items: [],
		talents: [],
		numSlimes: 1,
		timeOfDay: validTimes[0],
		charLevel: 1,
	});
	const [probability, setProbability] = useState<number | null>(null);
	const [error, setError] = useState<string>("");

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void => {
		const { name, value, type } = e.target as HTMLInputElement;
		const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

		setInputs((prevInputs) => {
			if (type === "checkbox") {
				// Handle checkbox input for items and talents
				const existingValues = prevInputs[name as keyof InputState] as string[];
				const newValues = checked
					? [...existingValues, value] // Add value if checked
					: existingValues.filter((val) => val !== value); // Remove value if unchecked
				return {
					...prevInputs,
					[name]: newValues,
				};
			} else if (type === "number") {
				// Handle number input for numSlimes and charLevel
				const parsedValue = parseInt(value, 10);
				if (!isNaN(parsedValue)) {
					return { ...prevInputs, [name]: parsedValue };
				} else {
					// If parsing fails, don't update the state
					return prevInputs;
				}
			} else {
				// Handle other input types (select, text, etc.)
				return { ...prevInputs, [name]: value };
			}
		});
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			// Input validation
			if (!validAreas.includes(inputs.area)) {
				throw new Error("Invalid area.");
			}
			for (const item of inputs.items) {
				if (!validItems.includes(item)) {
					throw new Error("Invalid item.");
				}
			}
			for (const talent of inputs.talents) {
				if (!validTalents.includes(talent)) {
					throw new Error("Invalid talent.");
				}
			}
			if (!validTimes.includes(inputs.timeOfDay)) {
				throw new Error("Invalid time of day.");
			}
			if (inputs.numSlimes <= 0 || !Number.isInteger(inputs.numSlimes)) {
				throw new Error("Number of slimes must be a positive integer.");
			}
			if (inputs.charLevel <= 0 || !Number.isInteger(inputs.charLevel)) {
				throw new Error("Character level must be a positive integer.");
			}

			const probability = calculateRareItemProbability(inputs);
			setProbability(probability);
		} catch (err: unknown) {
			// Type guard for error
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred.");
			}
		}
	};

	return (
		<div className="container mx-auto py-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
			<h1 className="text-3xl font-bold mb-4 text-center">
				Rare Item Drop Calculator
			</h1>

			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				{/* Area Dropdown */}
				<label htmlFor="area">Area:</label>
				<select name="area" value={inputs.area} onChange={handleChange}>
					{validAreas.map((area) => (
						<option key={area} value={area}>
							{area}
						</option>
					))}
				</select>

				{/* Items Checkboxes */}
				<fieldset>
					<legend>Items:</legend>
					{validItems.map((item) => (
						<div key={item}>
							<label htmlFor={item}>
								<input
									type="checkbox"
									id={item}
									name="items"
									value={item}
									checked={inputs.items.includes(item)}
									onChange={handleChange}
								/>
								{item}
							</label>
						</div>
					))}
				</fieldset>

				{/* Talents Checkboxes */}
				<fieldset>
					<legend>Talents:</legend>
					{validTalents.map((talent) => (
						<div key={talent}>
							<label htmlFor={talent}>
								<input
									type="checkbox"
									id={talent}
									name="talents"
									value={talent}
									checked={inputs.talents.includes(talent)}
									onChange={handleChange}
								/>
								{talent}
							</label>
						</div>
					))}
				</fieldset>

				{/* Number of Slimes */}
				<label htmlFor="numSlimes">Number of Slimes:</label>
				<input
					type="number"
					id="numSlimes"
					name="numSlimes"
					value={inputs.numSlimes}
					onChange={handleChange}
					min="1"
				/>

				{/* Time of Day Dropdown */}
				<label htmlFor="timeOfDay">Time of Day:</label>
				<select name="timeOfDay" value={inputs.timeOfDay} onChange={handleChange}>
					{validTimes.map((time) => (
						<option key={time} value={time}>
							{time}
						</option>
					))}
				</select>

				{/* Character Level */}
				<label htmlFor="charLevel">Character Level:</label>
				<input
					type="number"
					id="charLevel"
					name="charLevel"
					value={inputs.charLevel}
					onChange={handleChange}
					min="1"
				/>
				<button type="submit" className="bg-blue-500 mb-4 rounded w-96">Calculate</button>
			</form>

			{/* Display error or results */}
			{error && <p className="text-red-500 mt-4">{error}</p>}
			{probability !== null && (
				<p className="mt-4">
					Probability of obtaining the rare item:{" "}
					{(probability * 100).toFixed(2)}%
				</p>
			)}
		</div>
	);
}