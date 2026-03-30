import CallToAction from "@/components/blocks/call-to-action/call-to-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// — Icons —
const AboutIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="12" cy="12" r="10" />
		<line x1="12" y1="8" x2="12" y2="12" />
		<line x1="12" y1="16" x2="12.01" y2="16" />
	</svg>
);

const ImpactIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
	</svg>
);

const TeamIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
		<path d="M16 3.13a4 4 0 0 1 0 7.75" />
	</svg>
);

const EmpathyIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
	</svg>
);

const SustainIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M12 22V12" />
		<path d="M12 12C12 12 7 9 7 5a5 5 0 0 1 10 0c0 4-5 7-5 7z" />
	</svg>
);

const CollabIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="18" cy="5" r="3" />
		<circle cx="6" cy="12" r="3" />
		<circle cx="18" cy="19" r="3" />
		<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
		<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
	</svg>
);

// — Data —
const values = [
	{
		icon: <EmpathyIcon className="size-5 text-white" />,
		iconBg: "bg-[#4ade80]",
		title: "Empathy",
		description:
			"We approach each community with respect, listening to their stories and understanding their needs.",
	},
	{
		icon: <SustainIcon className="size-5 text-white" />,
		iconBg: "bg-[#facc15]",
		title: "Sustainability",
		description:
			"Transparency and accountability are at the heart of MabeCare. We are committed to lasting change.",
	},
	{
		icon: <CollabIcon className="size-5 text-white" />,
		iconBg: "bg-primary",
		title: "Collaboration",
		description:
			"We believe change is a collective effort. By working hand-in-hand with local communities, we go further.",
	},
];

const impacts = [
	{ stat: "5K+", label: "Mothers supported from across Ghana" },
	{ stat: "300+", label: "Outreach programs completed" },
	{ stat: "10K+", label: "Individuals directly impacted" },
	{ stat: "₵2M+", label: "Raised to support health and education" },
];

const team = [
	{
		name: "Abena Mensah",
		role: "Executive Director",
		image:
			"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
	},
	{
		name: "Kwame Asante",
		role: "Programs Coordinator",
		image:
			"https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=80",
	},
	{
		name: "Efua Boateng",
		role: "Community Outreach Lead",
		image:
			"https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80",
	},
	{
		name: "Kofi Darko",
		role: "Finance & Operations",
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
	},
];

// — Component —
const AboutSection = () => {
	return (
		<div id="about" className="flex flex-col">
			{/* ── 1. MISSION / HERO ── */}
			<section
				aria-labelledby="about-heading"
				className="py-12 sm:py-20 lg:py-28"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Top row */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
						<div className="flex flex-col gap-4">
							<Badge
								variant="outline"
								className="w-fit gap-2 text-sm font-normal px-4 py-1.5"
							>
								<AboutIcon className="size-4 text-primary" />
								About Us
							</Badge>
							<h2
								id="about-heading"
								className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
							>
								Know about our mission, vision, and journey
							</h2>
						</div>

						<div className="flex flex-col gap-5 lg:pt-16">
							<p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
								Together, we can make a real impact in communities around the
								world. Help us bring hope and support to every mother and child
								in Ghana.
							</p>
							<Button
								asChild
								className="w-fit rounded-full bg-foreground text-background hover:bg-foreground/90 px-8"
							>
								<a href="#donation-programs">Learn More</a>
							</Button>
						</div>
					</div>

					{/* Wide image */}
					<div className="overflow-hidden rounded-3xl">
						<img
							src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80"
							alt="Donation packages being prepared for communities in need"
							className="w-full h-64 sm:h-80 lg:h-[480px] object-cover"
							loading="lazy"
						/>
					</div>
				</div>
			</section>

			{/* ── 2. VALUES ── */}
			<section
				aria-labelledby="values-heading"
				className="pb-12 sm:pb-20 lg:pb-28"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="rounded-2xl border border-border overflow-hidden">
						<div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
							{values.map((value, i) => (
								<div
									key={i}
									className="flex flex-col items-center text-center gap-4 p-8 sm:p-10"
								>
									<div
										className={`w-12 h-12 rounded-2xl flex items-center justify-center ${value.iconBg}`}
									>
										{value.icon}
									</div>
									<h3 className="text-base font-semibold text-foreground">
										{value.title}
									</h3>
									<p className="text-muted-foreground text-sm leading-relaxed">
										{value.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── 3. IMPACT STATS ── */}
			<section
				aria-labelledby="impact-heading"
				className="pb-12 sm:pb-20 lg:pb-28"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center text-center gap-4 mb-12">
						<Badge
							variant="outline"
							className="gap-2 text-sm font-normal px-4 py-1.5"
						>
							<ImpactIcon className="size-4 text-primary" />
							Our Impacts
						</Badge>
						<h2
							id="impact-heading"
							className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl max-w-2xl"
						>
							Since our founding, MabeCare has made an extensive impact
						</h2>
					</div>

					{/* Yellow stats card */}
					<div className="rounded-3xl bg-[#F5D547] px-8 py-10 sm:px-12 sm:py-12">
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
							{impacts.map((item, i) => (
								<div key={i} className="flex flex-col gap-2">
									<span className="text-3xl sm:text-4xl font-bold text-[#0a0a0a]">
										{item.stat}
									</span>
									<span className="text-sm text-[#0a0a0a]/70 leading-snug">
										{item.label}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* ── 4. MISSION + CHART ── */}
			<section
				aria-labelledby="mission-heading"
				className="pb-12 sm:pb-20 lg:pb-28"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Image with floating chart */}
						<div className="relative">
							<div className="overflow-hidden rounded-3xl">
								<img
									src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=700&q=80"
									alt="MabeCare volunteers working together in the community"
									className="w-full h-[400px] sm:h-[480px] object-cover"
									loading="lazy"
								/>
							</div>

							{/* Floating chart card */}
							<div className="absolute bottom-6 right-4 sm:right-[-20px] bg-white dark:bg-card rounded-2xl shadow-lg p-5 w-52 sm:w-60">
								<p className="text-sm font-semibold text-foreground mb-0.5">
									Donation chart
								</p>
								<p className="text-xs text-muted-foreground mb-4">
									Donations received in past years
								</p>
								<div className="flex items-end gap-2 h-16">
									{[35, 50, 65, 80, 100].map((h, i) => (
										<div key={i} className="flex-1">
											<div
												className="w-full rounded-t-sm"
												style={{
													height: `${h}%`,
													backgroundColor: i === 4 ? "#ff1493" : "#86efac",
												}}
											/>
										</div>
									))}
								</div>
								<div className="flex gap-2 mt-2">
									{["2020", "2021", "2022", "2023", "2024"].map((yr) => (
										<span
											key={yr}
											className="flex-1 text-center text-[10px] text-muted-foreground"
										>
											{yr}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* Text */}
						<div className="flex flex-col gap-6">
							<Badge
								variant="outline"
								className="w-fit text-sm font-normal px-4 py-1.5"
							>
								Our Mission
							</Badge>
							<h3
								id="mission-heading"
								className="text-2xl sm:text-3xl font-bold leading-snug"
							>
								MabeCare's work is made possible by a dedicated community
							</h3>
							<p className="text-muted-foreground text-base leading-relaxed">
								We value transparency and keep our supporters informed about the
								tangible outcomes of their contributions. Together, we are
								creating a powerful movement of compassion and action across
								Ghana.
							</p>
							<Button
								asChild
								className="w-fit rounded-full bg-foreground text-background hover:bg-foreground/90 px-8"
							>
								<a href="#donate">Make A Quick Donation</a>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* ── 5. TEAM ── */}
			<section
				aria-labelledby="team-heading"
				className="pb-12 sm:pb-20 lg:pb-28"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center text-center gap-4 mb-12">
						<Badge
							variant="outline"
							className="gap-2 text-sm font-normal px-4 py-1.5"
						>
							<TeamIcon className="size-4 text-primary" />
							Our Team
						</Badge>
						<h2
							id="team-heading"
							className="text-3xl font-bold tracking-tight md:text-4xl"
						>
							Meet our incredible team
						</h2>
						<p className="text-muted-foreground text-base sm:text-lg max-w-xl">
							Together, we can make a real impact in communities around the
							world. Help us bring hope and support.
						</p>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
						{team.map((member, i) => (
							<div key={i} className="flex flex-col items-center gap-3">
								<div className="overflow-hidden rounded-2xl w-full bg-muted aspect-[3/4]">
									<img
										src={member.image}
										alt={`${member.name}, ${member.role} at MabeCare Foundation`}
										className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
										loading="lazy"
									/>
								</div>
								<div className="text-center">
									<p className="text-sm font-semibold text-foreground">
										{member.name}
									</p>
									<p className="text-xs text-muted-foreground">{member.role}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── 6. CTA (reusable) ── */}
			<CallToAction />
		</div>
	);
};

export default AboutSection;
