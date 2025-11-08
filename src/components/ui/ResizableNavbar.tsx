'use client';
import { cn } from '@/lib/utils';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

interface NavbarProps {
	children: React.ReactNode;
	className?: string;
}

interface NavBodyProps {
	children: React.ReactNode;
	className?: string;
	visible?: boolean;
}

interface NavItemsProps {
	items: {
		name: string;
		link: string;
	}[];
	className?: string;
	onItemClick?: () => void;
}

interface MobileNavProps {
	children: React.ReactNode;
	className?: string;
	visible?: boolean;
}

interface MobileNavHeaderProps {
	children: React.ReactNode;
	className?: string;
}

interface MobileNavMenuProps {
	children: React.ReactNode;
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({
		target: ref,
		offset: ['start start', 'end start']
	});
	const [visible, setVisible] = useState<boolean>(false);

	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (latest > 100) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	});

	return (
		<motion.div
			ref={ref}
			// IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
			className={cn('fixed inset-x-0 top-5 z-40 w-full', className)}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			transition={{ delay: 0.7, duration: 0.7 }}
		>
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
					: child
			)}
		</motion.div>
	);
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
	return (
		<motion.div
			animate={{
				backdropFilter: visible ? 'blur(10px)' : 'none',
				boxShadow: visible
					? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
					: 'none',
				width: visible ? '40%' : '100%',
				y: visible ? 20 : 0
			}}
			transition={{
				type: 'spring',
				stiffness: 200,
				damping: 50
			}}
			style={{
				minWidth: '1400px'
			}}
			className={cn(
				'relative isolate z-[60] mx-auto hidden w-full max-w-[1800px] flex-row items-center justify-between self-start rounded-full px-4 py-2 2xl:flex dark:bg-transparent',
				className
			)}
		>
			{visible && (
				<div
					className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm dark:bg-neutral-950/20"
					style={{ zIndex: -1 }}
				/>
			)}
			{children}
		</motion.div>
	);
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
	const [hovered, setHovered] = useState<number | null>(null);

	return (
		<motion.div
			onMouseLeave={() => setHovered(null)}
			className={cn(
				'absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-xl font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 2xl:flex 2xl:space-x-2',
				className
			)}
			style={{ zIndex: 1 }}
		>
			{items.map((item, idx) => (
				<Link
					onMouseEnter={() => setHovered(idx)}
					onClick={onItemClick}
					className="relative px-4 py-2 text-white"
					key={`link-${idx}`}
					href={item.link}
				>
					{hovered === idx && (
						<motion.div
							layoutId="hovered"
							className="absolute inset-0 h-full w-full rounded-full bg-neutral-950/30"
						/>
					)}
					<span className="relative z-20">{item.name}</span>
				</Link>
			))}
		</motion.div>
	);
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
	return (
		<div
			className={cn('relative z-50 mx-auto w-full max-w-[calc(100vw-2rem)] 2xl:hidden', className)}
		>
			<motion.div
				animate={{
					width: visible ? '90%' : '100%',
					y: visible ? 20 : 0
				}}
				transition={{
					type: 'spring',
					stiffness: 200,
					damping: 50
				}}
				className="relative mx-auto flex flex-row items-center justify-between rounded-full px-4 py-2"
			>
				{visible && (
					<div
						className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm dark:bg-neutral-950/20"
						style={{ zIndex: -1 }}
					/>
				)}
				{children}
			</motion.div>
		</div>
	);
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
	return (
		<div className={cn('flex w-full flex-row items-center justify-between', className)}>
			{children}
		</div>
	);
};

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{
						opacity: 1,
						scale: 1
					}}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{
						type: 'spring',
						stiffness: 300,
						damping: 30
					}}
					className={cn(
						'fixed top-28 left-1/2 z-[100] w-[90%] max-w-[calc(90vw-2rem)] -translate-x-1/2 rounded-3xl bg-white/10 px-6 py-6 backdrop-blur-md dark:bg-neutral-950/30',
						className
					)}
					style={{
						boxShadow:
							'0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
					}}
				>
					<div className="flex w-full flex-wrap nav-fit-h:flex-col items-center nav-fit-h:items-start justify-between nav-fit-h:justify-start gap-2 nav-fit-h:gap-1 [&>*]:w-auto nav-fit-h:[&>*]:w-full [&>*]:flex-shrink [&>*:last-child]:order-1 [&>*:last-child]:ml-auto [&>*:last-child]:my-auto nav-fit-h:[&>*:last-child]:order-none nav-fit-h:[&>*:last-child]:ml-0 nav-fit-h:[&>*:last-child]:my-0">{children}</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
	return isOpen ? (
		<IconX className="text-black dark:text-white" onClick={onClick} />
	) : (
		<IconMenu2 className="text-black dark:text-white" onClick={onClick} />
	);
};

export const NavbarLogo = () => {
	return (
		<Link
			href="/"
			className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-xl font-normal text-black"
		>
			<Image src="/neptune-full-logo.svg" alt="logo" width={170} height={30} />
		</Link>
	);
};
