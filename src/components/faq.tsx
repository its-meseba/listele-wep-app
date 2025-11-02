import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export default function Faq() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 py-10">
			<div className="flex flex-col items-center justify-center gap-2 max-w-md">
				<h2 className="sm:text-3xl text-2xl font-semibold text-foreground">
					Frequently Asked Questions
				</h2>
				<p className="sm:text-base text-sm text-muted-foreground text-center">
					Everything you need to know about First100. Find answers to common questions.
				</p>
			</div>
			<div className="w-full max-w-lg">
				<Accordion
					type="single"
					collapsible
					className="w-full flex flex-col gap-4"
				>
					<AccordionItem value="item-1">
						<AccordionTrigger className="hover:no-underline">
							Can I export my list?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes, CSV anytime. Export your leads at any time in CSV format. Your data is always yours.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger className="hover:no-underline">
							Do I need code?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							No. First100 is a no-code solution. You can create your waitlist page in minutes without any coding knowledge.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger className="hover:no-underline">
							Can I upload a video?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							Yes, on Pro. Pro plan includes support for uploading images and a teaser video to your waitlist page.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4">
						<AccordionTrigger className="hover:no-underline">
							What payment methods do you accept?
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground">
							We use Stripe/Paddle for payments. You can change your payment method anytime from your account settings.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
