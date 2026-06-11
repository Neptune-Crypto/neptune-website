'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { HTMLMotionProps, motion } from 'motion/react';
import Link from 'next/link';
import { forwardRef } from 'react';

const ctaButtonVariants = cva('flex items-center gap-3 rounded-full px-6 py-3 font-bold', {
	variants: {
		variant: {
			primary: 'bg-white text-black',
			outline: 'border border-2 border-white text-white',
			navy: 'bg-[#0f1f5c] text-white hover:bg-[#3b82f6] transition-colors'
		},
		size: {
			sm: 'text-base',
			md: 'text-2xl',
			lg: 'text-3xl'
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'md'
	}
});

export interface CTAButtonProps
	extends Omit<HTMLMotionProps<'button'>, 'href'>,
		VariantProps<typeof ctaButtonVariants> {
	href?: string;
	target?: React.HTMLAttributeAnchorTarget;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, CTAButtonProps>(
	({ href, target, ...props }, ref) => {
		const className = clsx(
			ctaButtonVariants({ variant: props.variant, size: props.size }),
			props.className
		);

		const motionProps = {
			whileHover: {
				x: 1,
				y: -2,
				scale: 1.01
			},
			whileTap: {
				x: 0,
				y: 0,
				scale: 1
			}
		};

		if (href) {
			return (
				<Link href={href} passHref legacyBehavior>
					<motion.a
						{...motionProps}
						ref={ref as React.Ref<HTMLAnchorElement>}
						className={className}
						target={target}
						rel={target === '_blank' ? 'noopener noreferrer' : undefined}
					>
						{props.children}
					</motion.a>
				</Link>
			);
		}

		return (
			<motion.button
				{...props}
				ref={ref as React.Ref<HTMLButtonElement>}
				className={className}
				{...motionProps}
			>
				{props.children}
			</motion.button>
		);
	}
);

Button.displayName = 'Button';

export default Button;
