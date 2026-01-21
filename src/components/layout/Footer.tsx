import SocialLink from '@/components/buttons/SocialLink';
import Image from 'next/image';
import Link from 'next/link';
import { FaDiscord, FaGithub, FaRedditAlien, FaTelegram, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
	return (
		<footer className="mt-auto w-full">
			<div className="mx-auto max-w-7xl space-y-1.5 px-4 py-8 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-3">
						<Image src="/neptune-text-logo.svg" alt="Neptune Cash" width={120} height={40} />
					</Link>

					{/* Links */}
					<nav className="flex flex-wrap justify-center gap-8">
						<Link href="/whitepaper" className="text-lg text-white transition-opacity hover:opacity-70">
							Whitepaper
						</Link>
						<Link href="/blog" className="text-lg text-white transition-opacity hover:opacity-70">
							Blog
						</Link>
						<Link href="/learn" className="text-lg text-white transition-opacity hover:opacity-70">
							Learn
						</Link>
						<Link
							href="https://github.com/imalfect/neptune-website"
							className="text-lg text-white transition-opacity hover:opacity-70"
							target="_blank"
						>
							Website source
						</Link>
					</nav>

					<div className="flex items-center gap-6">
						<SocialLink
							icon={<FaDiscord size={28} />}
							href="https://discord.gg/e8gtNffG8R"
							label="Discord"
						/>
						<SocialLink
							icon={<FaTelegram size={27} />}
							href="https://t.me/neptune_project"
							label="Telegram"
						/>
						<SocialLink
							icon={<FaXTwitter size={28} />}
							href="https://x.com/NeptuneCash"
							label="Twitter"
						/>
						<SocialLink
							icon={<FaGithub size={28} />}
							href="https://github.com/Neptune-Crypto"
							label="GitHub"
						/>
						<SocialLink
							icon={<FaRedditAlien size={28} />}
							href="https://www.reddit.com/r/neptunecash/"
							label="Reddit"
						/>
					</div>
				</div>
				<span>
					&copy; {new Date().getFullYear()} Neptune Cash Developers. All rights reserved. Anonymous,
					cookie-free{' '}
					<Link href="https://www.rybbit.io" target="_blank" className="underline">
						analytics
					</Link>{' '}
					are used to improve content.
				</span>
			</div>
		</footer>
	);
}
