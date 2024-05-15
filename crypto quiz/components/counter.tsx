"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";

export const Counter = () => {
	const [count, setCount] = useState(0);
	const { isOpen, onOpen, onClose } = useDisclosure();  

	return (
		<Button radius="full" onPress={() => setCount(count + 1)}>
			Count is {count}
		</Button>
	);
};
