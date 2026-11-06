import AestheticFluidBackground from '@/components/AestheticFluidBackground';
import Footer from '@/components/layout/Footer';
import { WebsiteNavbar } from '@/components/layout/Navbar';
import * as motion from 'motion/react-client';
import { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Script from 'next/script';
import React from 'react';
import './globals.css';

const dmSans = DM_Sans({
	subsets: ['latin'],
	weight: ['400', '700', '900']
});
export const metadata: Metadata = {
	metadataBase: new URL('https://neptune.cash')
};
export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="focus-mode:bg-black bg-[#07122f]">
			<body className={`${dmSans.className} circ antialiased`}>
				<div className={'relative w-full'}>
					<WebsiteNavbar />
				</div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, ease: 'easeInOut' }}
					style={{
						height: '115vh',
						width: '100%',
						zIndex: -100,
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0
					}}
				>
					<AestheticFluidBackground
						colors={['#2a4d77', '#66acfb', '#345280', '#5e7efd', '#30bce6']}
						loop={false}
						radius_inner={0.1}
						radius_outer={0.3}
					/>
				</motion.div>
				{children}
				<div className="mt-32">
					<Footer />
				</div>
				<Script
					src="https://rybbit.imal.dev/api/script.js"
					data-site-id="3"
					strategy="afterInteractive"
				/>
			</body>
		</html>
	);
}
