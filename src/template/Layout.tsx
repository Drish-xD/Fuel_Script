import { css, Style } from "hono/css";
import type { FC, PropsWithChildren } from "hono/jsx";

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<title>Fuel Receipt</title>
				<script src="https://cdn.tailwindcss.com"></script>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
					rel="stylesheet"
				/>

				<Style>
					{css`
          @media print {
            @page {
              size: 300px auto;
              margin: 0;
            }

            .print-page {
              page-break-after: always;
              break-after: page;
            }

            .print-page:last-child {
              page-break-after: auto;
              break-after: auto;
            }
          }

          .font-press {
            font-family: 'Press Start 2P', monospace;
          }
        `}
				</Style>
			</head>
			<body class="bg-white">
				<div
					class="print-page w-full min-h-screen flex flex-col items-center justify-center"
					style={{
						backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
						backgroundSize: "cover",
						transform: "rotate(-0.2deg)",
						filter: "grayscale(0.1) brightness(0.95) contrast(1.05)",
						boxShadow: "inset 0 0 10px rgba(0,0,0,0.03)",
					}}
				>
					{children}
					<div
						class="absolute inset-0 pointer-events-none"
						style={{
							backgroundImage:
								"url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
							opacity: 0.05,
							zIndex: 10,
						}}
					/>
				</div>
			</body>
		</html>
	);
};

export default Layout;
