'use client';

import React from 'react';
import { motion } from 'motion/react';

export function AuthLogo() {
	return (
		<motion.div
			initial={{ scale: 0.9 }}
			animate={{ scale: 1 }}
			transition={{ duration: 0.5, delay: 0.3 }}
			className="flex items-center justify-center gap-3"
		>
			<div className="relative">
				<img src="/newlogo.svg" alt="SauLM Logo" className="h-12 w-12 sm:h-14 sm:w-14" />
				<motion.div
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.5, 0.8, 0.5],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-full blur-md -z-10"
				/>
			</div>
			<h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 via-pink-600 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
				SauLM
			</h2>
		</motion.div>
	);
}
