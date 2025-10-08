'use client';

import React from 'react';
import { motion } from 'motion/react';

export function AuthHeader() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.4 }}
			className="text-center space-y-3"
		>
			<h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 dark:from-white dark:via-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent">
				Welcome Back
			</h1>
			<p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
				Sign in to access your AI-powered legal assistant
			</p>
		</motion.div>
	);
}
