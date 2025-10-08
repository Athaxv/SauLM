'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { GithubIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { motion } from 'motion/react';

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<g>
			<path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
		</g>
	</svg>
);

export function AuthButtons() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5 }}
			className="space-y-4"
		>
			<Button
				type="button"
				onClick={() => signIn("google")}
				size="lg"
				className="w-full h-12 bg-gradient-to-r from-red-500 via-pink-600 to-red-500 bg-[length:200%_auto] text-white hover:shadow-xl hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold text-base group relative overflow-hidden"
			>
				<span className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-700 to-red-600 bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				<GoogleIcon className="me-2 size-5 relative z-10" />
				<span className="relative z-10">Continue with Google</span>
			</Button>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-4 bg-white/60 dark:bg-neutral-900/60 text-muted-foreground backdrop-blur-sm">
						or
					</span>
				</div>
			</div>

			<Button
				type="button"
				size="lg"
				className="w-full h-12 bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-xl hover:shadow-neutral-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold text-base dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 group"
			>
				<GithubIcon strokeWidth={2.5} className="me-2 size-5 group-hover:rotate-12 transition-transform duration-300" />
				Continue with GitHub
			</Button>
		</motion.div>
	);
}
