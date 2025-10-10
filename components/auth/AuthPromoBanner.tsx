'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function AuthPromoBanner() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.6 }}
			className="pt-6 border-t border-neutral-200 dark:border-neutral-700"
		>
			<div className="flex items-start gap-2 p-4 rounded-xl bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/20 dark:to-red-950/20 border border-pink-200/50 dark:border-pink-800/50">
				<Sparkles className="size-5 text-pink-600 dark:text-pink-400 mt-0.5 flex-shrink-0" />
				<p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
					Join thousands of legal professionals using AI to streamline their workflow
				</p>
			</div>
		</motion.div>
	);
}
