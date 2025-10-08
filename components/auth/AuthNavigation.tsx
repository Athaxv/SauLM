'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { motion } from 'motion/react';

export function AuthNavigation() {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			className="py-6"
		>
			<Button variant="ghost" className="group hover:bg-white/80 dark:hover:bg-neutral-800/80 backdrop-blur-sm" asChild>
				<a href="/">
					<ChevronLeftIcon className="me-1 size-4 transition-transform group-hover:-translate-x-1" />
					Home
				</a>
			</Button>
		</motion.div>
	);
}
