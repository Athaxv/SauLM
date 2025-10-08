'use client';

import React from 'react';
import { motion } from 'motion/react';

export function AuthFooter() {
	return (
		<>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.7 }}
				className="text-center text-xs sm:text-sm text-muted-foreground leading-relaxed"
			>
				By continuing, you agree to our{' '}
				<a
					href="#"
					className="text-neutral-900 hover:text-pink-600 dark:text-white dark:hover:text-pink-400 underline underline-offset-4 transition-colors font-medium"
				>
					Terms
				</a>{' '}
				and{' '}
				<a
					href="#"
					className="text-neutral-900 hover:text-pink-600 dark:text-white dark:hover:text-pink-400 underline underline-offset-4 transition-colors font-medium"
				>
					Privacy Policy
				</a>
			</motion.p>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className="mt-8 text-center"
			>
				<p className="text-sm text-muted-foreground">
					Need help?{' '}
					<a href="#" className="text-pink-600 dark:text-pink-400 hover:underline font-medium">
						Contact Support
					</a>
				</p>
			</motion.div>
		</>
	);
}
