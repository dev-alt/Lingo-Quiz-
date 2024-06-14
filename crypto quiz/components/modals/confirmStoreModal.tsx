import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner, Spacer } from "@nextui-org/react";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Product } from '@/types/';

interface ComfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product
    handleBuy: () => void;

}

const ConfirmPurchaseModal: React.FC<ComfirmModalProps> = ({ isOpen, onClose, product, handleBuy }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);


    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            size="md"
            draggable
            className="bg-gray-800 bg-opacity-90 backdrop-blur-sm"
        >
            <ModalContent className=" rounded-lg">
                <ModalHeader className="border-b border-gray-600 py-4">
                    <p className="text-center text-lg font-semibold text-white">
                        {product?.title}
                    </p>
                </ModalHeader>
                <ModalBody className="py-6 px-8">
                    <div className="mb-4">
                        <Image
                            width={300}
                            src={product?.imageUrl}
                            alt={product?.title}
                            className="w-full h-auto rounded-md"
                        />
                    </div>
                    <p className="text-gray-300 mb-2">Price: ${product?.price}</p>
                    <p className="text-gray-300"><span className="text-bold text-xl">Description:</span> {product?.description}</p>
                </ModalBody>
                <ModalFooter className="border-t border-gray-600 py-4 px-8 flex justify-between">
                    <Button
                        className="bg-green-500 text-white hover:bg-green-600 rounded-md px-4 py-2 transition-colors duration-200"
                        variant="light"
                        onPress={handleBuy}
                    >
                        Buy
                    </Button>
                    <Button
                        className="bg-red-500 text-white hover:bg-red-600 rounded-md px-4 py-2 transition-colors duration-200"
                        variant="light"
                        onPress={onClose}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ConfirmPurchaseModal;