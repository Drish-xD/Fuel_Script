import { type FC, Fragment } from "hono/jsx";

type SideStripProps = {
	side_logo: string;
	side_logo_text: string;
};

const NO_OF_SIDES = 2;

const SideStrip: FC<SideStripProps> = ({ side_logo, side_logo_text }) => {
	return (
		<div
			class="h-[400px] absolute top-10 -right-4 flex flex-row items-center justify-between gap-10 opacity-60"
			style={{ writingMode: "vertical-rl" }}
		>
			{Array.from({ length: NO_OF_SIDES }).map((_, index) => (
				<Fragment key={`side-strip-${index + 1}`}>
					<p class="whitespace-nowrap text-[6px] rotate-180">
						{side_logo_text}
					</p>
					<img
						alt="HDFC Bank Logo"
						class="object-contain h-[12px] -rotate-90 mix-blend-multiply"
						src={side_logo}
					/>
				</Fragment>
			))}
		</div>
	);
};

export default SideStrip;
