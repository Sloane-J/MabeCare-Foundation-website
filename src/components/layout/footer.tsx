import {
	FacebookIcon,
	GithubIcon,
	LinkedinIcon,
	MailIcon,
	XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
	return (
		<footer className="bg-background pt-16 pb-8">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-16">
					{/* Brand & Newsletter Column */}
					<div className="lg:col-span-5 flex flex-col gap-6">
						<a href="/#home" className="flex items-center gap-3">
							<img
								src="/images/site-logo.png"
								alt="Logo"
								className="h-8 w-auto"
							/>
							<span className="text-xl sm:text-2xl font-md tracking-tight text-foreground">
								MummyCare <span className="text-primary">Foundation</span>
							</span>
						</a>

						<p className="text-muted-foreground max-w-sm text-base sm:text-lg">
							Together, we can make a real impact in communities around the
							world.
						</p>

						{/* Newsletter Input Pill */}
						<div className="relative flex w-full max-w-md items-center rounded-full bg-muted/50 p-1 pr-1.5 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
							<div className="flex items-center pl-3 sm:pl-4 pr-2 text-muted-foreground">
								<MailIcon className="size-4 sm:size-5" />
							</div>
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 min-w-0 bg-transparent py-2.5 sm:py-3 text-sm outline-none placeholder:text-muted-foreground"
							/>
							<Button className="rounded-full bg-foreground text-background px-4 sm:px-6 text-sm hover:bg-foreground/90 font-medium whitespace-nowrap">
								Subscribe
							</Button>
						</div>
					</div>

					{/* Navigation Links Columns */}
					<div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
						{/* Quick Links */}
						<div className="flex flex-col gap-4">
							<h4 className="font-md text-foreground text-base sm:text-lg">
								Quick Links
							</h4>
							<nav className="flex flex-col gap-3">
								{["Donation", "About Us", "Programs"].map((link) => (
									<a
										key={link}
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
									>
										{link}
									</a>
								))}
							</nav>
						</div>

						{/* More */}
						<div className="flex flex-col gap-4">
							<h4 className="font-md text-foreground text-base sm:text-lg">
								More
							</h4>
							<nav className="flex flex-col gap-3">
								{["Blog", "Blog details", "Testimonials"].map((link) => (
									<a
										key={link}
										href="#"
										className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
									>
										{link}
									</a>
								))}
							</nav>
						</div>

						{/* Legal */}
						<div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
							<h4 className="font-md text-foreground text-base sm:text-lg">
								Legal & Policy
							</h4>
							<nav className="flex flex-col gap-3">
								{["Privacy Policy", "Terms of Service", "Contact Us"].map(
									(link) => (
										<a
											key={link}
											href="#"
											className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
										>
											{link}
										</a>
									),
								)}
							</nav>
						</div>
					</div>
				</div>

				<Separator className="opacity-50" />

				{/* Bottom Bar */}
<div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
					<p className="text-muted-foreground text-sm text-center sm:text-left">
						Copyright © {new Date().getFullYear()} All Rights Reserved by{" "}
						<a
							href="https://sloanedev.vercel.app/"
							className="font-medium text-foreground hover:underline underline-offset-4"
						>
							Sloane.Dev
						</a>
					</p>

					<div className="flex items-center gap-8 sm:gap-10">
						<a
							href="#"
							className="text-foreground hover:text-primary transition-colors p-2"
						>
							<FacebookIcon className="size-5" />
						</a>

						<a
							href="#"
							className="text-foreground hover:text-primary transition-colors p-2"
						>
							<XIcon className="size-5" />
						</a>

						<a
							href="#"
							className="text-foreground hover:text-primary transition-colors p-2"
						>
							<GithubIcon className="size-5" />
						</a>

						<a
							href="#"
							className="text-foreground hover:text-primary transition-colors p-2"
						>
							<LinkedinIcon className="size-5" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;