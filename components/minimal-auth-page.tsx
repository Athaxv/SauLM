'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
	AuthBackground, 
	AuthNavigation, 
	AuthLogo, 
	AuthHeader, 
	AuthButtons, 
	AuthPromoBanner, 
	AuthFooter 
} from './auth';

export function MinimalAuthPage() {
	return (
		<div className="relative min-h-screen w-full overflow-hidden">
			<AuthBackground />

			<div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
				<AuthNavigation />

				<div className="flex flex-1 items-center justify-center py-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="w-full max-w-md"
					>
						<div className="backdrop-blur-xs bg-white/60 dark:bg-neutral-900/60 rounded-3xl shadow-sm border border-white/20 dark:border-neutral-700/50 p-8 sm:p-12 space-y-8">
							<AuthLogo />
							<AuthHeader />
							<AuthButtons />
							<AuthPromoBanner />
							<AuthFooter />
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
	
}
