"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

type FocusArea = {
	stat: string;
	label: string;
	pills: string[];
	image: string;
	alt: string;
	bg: string;
	textColor: string;
	pillBg: string;
	pillText: string;
	icon: React.ReactNode;
	overlayGradient: string;
};

const TimerIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="12" cy="12" r="9" />
		<polyline points="12 7 12 12 15 15" />
	</svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<line x1="5" y1="12" x2="19" y2="12" />
		<polyline points="12 5 19 12 12 19" />
	</svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
	</svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
		<path d="M16 3.13a4 4 0 0 1 0 7.75" />
	</svg>
);

const BookIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
		<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
	</svg>
);

const focusAreas: FocusArea[] = [
	{
		stat: "200+",
		label: "Mothers Supported",
		pills: [
			"Welfare support for mothers",
			"pregnant or nursing,",
			"in their most vulnerable moments.",
		],
		image:
			"/images/metrics/mother-braiding-hair.webp",
		alt: "mother-braiding-hair",
		bg: "bg-[#F28B5F]",
		textColor: "text-white",
		pillBg: "bg-white/90",
		pillText: "text-[#171717]",
		icon: <HeartIcon className="size-5 text-white" />,
		overlayGradient:
			"from-[#F28B5F]/70 via-[#F28B5F]/40 to-[#F28B5F]/30",
	},
	{
		stat: "150+",
		label: "Women in Skills Training",
		pills: [
			"Practical skills training",
			"to help mothers earn,",
			"grow, and become independent.",
		],
		image:
			"/images/metrics/working-woman.webp",
		alt: "Women participating in skills training",
		bg: "bg-[#171717]",
		textColor: "text-white",
		pillBg: "bg-white/90",
		pillText: "text-[#171717]",
		icon: <BookIcon className="size-5 text-white" />,
		overlayGradient:
			"from-[#171717]/70 via-[#171717]/40 to-[#171717]/40",
	},
	{
		stat: "300+",
		label: "Children Reached",
		pills: [
			"Supporting children's growth,",
			"education, and well-being",
			"within their communities.",
		],
		image:
			"/images/metrics/smiling-children.webp",
		alt: "Children benefiting from foundation programs",
		bg: "bg-[#F5D547]",
		textColor: "text-[#171717]",
		pillBg: "bg-white/90",
		pillText: "text-[#171717]",
		icon: <UsersIcon className="size-5 text-[#171717]" />,
		overlayGradient:
			"from-[#F5D547]/70 via-[#F5D547]/40 to-[#F5D547]/35",
	},
];

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0 },
};

const stagger = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const AnimatedSection = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<motion.div
			ref={ref}
			variants={fadeUp}
			initial="hidden"
			animate={inView ? "show" : "hidden"}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
};

const ImpactMetrics = () => {
	const cardsRef = useRef(null);
	const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });

	return (
		<section id="impact-metrics" className="py-12 sm:py-20 lg:py-28">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<AnimatedSection className="mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16">
					<Badge
						variant="outline"
						className="gap-2 text-sm font-normal px-4 py-1.5"
					>
						<TimerIcon className="size-4 text-primary" />
						Impactful metrics
					</Badge>
					<h2 className="text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl">
						Programs that <span className="text-primary">change</span> lives
					</h2>
					<p className="text-muted-foreground text-base sm:text-lg max-w-xl">
						From welfare support to skills training, we are walking alongside
						mothers and children in Ghana — one family at a time.
					</p>
				</AnimatedSection>

				{/* Cards Grid */}
				<motion.div
					ref={cardsRef}
					variants={stagger}
					initial="hidden"
					animate={cardsInView ? "show" : "hidden"}
					className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
				>
					{focusAreas.map((area, index) => (
						<motion.div
							key={index}
							variants={fadeUp}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className={`relative overflow-hidden rounded-3xl ${area.bg} p-6 sm:p-8 flex flex-col justify-between min-h-[420px] group`}
						>
							{/* Background Cover Image */}
							<img
								src={area.image}
								alt={area.alt}
								loading="lazy"
								className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-105 pointer-events-none select-none"
							/>

							{/* Gradient Overlay for Legibility */}
							<div
								className={`absolute inset-0 bg-gradient-to-t ${area.overlayGradient} pointer-events-none`}
							/>

							{/* Top Content: icon + stat */}
							<div className="flex flex-col gap-3 z-10 relative">
								<div
									className={`w-10 h-10 rounded-full flex items-center justify-center ${
										area.bg === "bg-[#171717]"
											? "bg-white/10"
											: "bg-black/10"
									}`}
								>
									{area.icon}
								</div>

								<p
									className={`text-5xl sm:text-6xl font-bold leading-none ${area.textColor}`}
								>
									{area.stat}
								</p>

								<p
									className={`text-sm font-semibold uppercase tracking-widest ${area.textColor} opacity-90`}
								>
									{area.label}
								</p>

								<div className="flex flex-col gap-2 mt-2">
									{area.pills.map((pill, i) => (
										<span
											key={i}
											className={`inline-flex w-fit rounded-full px-3.5 py-1.5 text-sm font-medium ${area.pillBg} ${area.pillText} shadow-sm backdrop-blur-sm`}
										>
											{pill}
										</span>
									))}
								</div>
							</div>

							{/* Action Button */}
							<div className="z-10 relative mt-6 flex justify-end">
								<button
									type="button"
									aria-label={`Learn more about ${area.label}`}
									className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
										${
											area.bg === "bg-[#171717]"
												? "bg-white/15 hover:bg-white/25"
												: "bg-black/10 hover:bg-black/20"
										}`}
								>
									<ArrowRightIcon className={`size-4 ${area.textColor}`} />
								</button>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default ImpactMetrics;