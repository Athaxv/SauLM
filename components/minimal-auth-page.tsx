'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, GithubIcon, Sparkles } from 'lucide-react';
import { Particles } from '@/components/ui/particles';
import { signIn } from 'next-auth/react';
import { motion } from 'motion/react';

export function MinimalAuthPage() {
	return (
		<div className="relative min-h-screen w-full overflow-hidden">
			<Particles
				color="#f44545"
				quantity={120}
				ease={20}
				className="absolute inset-0"
			/>
			<div
				aria-hidden
				className="absolute inset-0 isolate -z-10 contain-strict"
			>
				<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
				<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
				<div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
			</div>

			<div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
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

				<div className="flex flex-1 items-center justify-center py-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="w-full max-w-md"
					>
						<div className="backdrop-blur-xl bg-white/60 dark:bg-neutral-900/60 rounded-3xl shadow-2xl border border-white/20 dark:border-neutral-700/50 p-8 sm:p-12 space-y-8">
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
										className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-full blur-xl -z-10"
									/>
								</div>
								<h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 via-pink-600 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
									SauLM
								</h2>
							</motion.div>

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
						</div>

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
					</motion.div>
				</div>
			</div>
		</div>
	);
}

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
