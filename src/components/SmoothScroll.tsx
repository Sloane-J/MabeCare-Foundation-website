import { cancelFrame, frame } from "framer-motion";
import type { LenisRef } from "lenis/react";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export const MOBILE_MENU_EVENT = "mobile-menu-toggle";

const prefersReducedMotion = () =>
	typeof window !== "undefined" &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		function update(data: { timestamp: number }) {
			lenisRef.current?.lenis?.raf(data.timestamp);
		}

		frame.update(update, true);

		return () => cancelFrame(update);
	}, []);

	useEffect(() => {
		function handleMenuToggle(event: Event) {
			const { open } = (event as CustomEvent<{ open: boolean }>).detail;
			const lenis = lenisRef.current?.lenis;

			if (!lenis) return;

			if (open) {
				lenis.stop();
			} else {
				lenis.start();
			}
		}

		window.addEventListener(MOBILE_MENU_EVENT, handleMenuToggle);

		return () => {
			window.removeEventListener(MOBILE_MENU_EVENT, handleMenuToggle);
		};
	}, []);

	return (
		<ReactLenis
			root
			options={{
				autoRaf: false,
				smoothWheel: !prefersReducedMotion(),
			}}
			ref={lenisRef}
		>
			{children}
		</ReactLenis>
	);
};

export default SmoothScroll;