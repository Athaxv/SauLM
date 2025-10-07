import React from 'react';
import { Button } from '@/components/ui/button';

import { ChevronLeftIcon, GithubIcon } from 'lucide-react';
import { Particles } from '@/components/ui/particles';
import { signIn } from 'next-auth/react';

export function MinimalAuthPage() {
	return (
		<div className="relative md:h-screen md:overflow-hidden w-full">
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
			<div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4">
				<Button variant="ghost" className="absolute top-4 left-4" asChild>
					<a href="/">
						<ChevronLeftIcon className="me-1 size-4" />
						Home
					</a>
				</Button>

				<div className="mx-auto space-y-6 sm:w-sm">
					<div className="flex items-center gap-2">
						<img src="/newlogo.svg" alt="SauLM Logo" className="h-8 w-8" />
						<p className="text-xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">SauLM</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h1 className="text-3xl font-bold tracking-tight">
							Sign In or Join Now!
						</h1>
						<p className="text-muted-foreground text-base">
							Login or create your account to get started.
						</p>
					</div>
					<div className="space-y-3 pt-2">
						<Button
							type="button"
							onClick={() => signIn("google")}
							size="lg"
							className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 shadow-lg transition-all duration-200 font-semibold"
						>
							<GoogleIcon className="me-2 size-4" />
							Continue with Google
						</Button>
						<Button
							type="button"
							size="lg"
							className="w-full bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg transition-all duration-200 font-semibold dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
						>
							<GithubIcon strokeWidth={2.5} className="me-2 size-4" />
							Continue with GitHub
						</Button>
					</div>
					<p className="text-muted-foreground text-sm pt-4">
						By clicking continue, you agree to our{' '}
						<a
							href="#"
							className="text-neutral-900 hover:text-pink-600 underline underline-offset-4 transition-colors dark:text-white"
						>
							Terms of Service
						</a>{' '}
						and{' '}
						<a
							href="#"
							className="text-neutral-900 hover:text-pink-600 underline underline-offset-4 transition-colors dark:text-white"
						>
							Privacy Policy
						</a>
						.
					</p>
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
