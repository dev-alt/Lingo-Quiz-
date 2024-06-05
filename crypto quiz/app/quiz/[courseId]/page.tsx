'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Card, CardBody, Progress, Spacer } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { usePathname } from 'next/navigation';




export default function CoursePage() {
  const router = useRouter();
  const pathname = usePathname();
  const { courseId } = useParams() as { courseId: string };

 
  return (
    <div className="container">

    </div>
  );
}