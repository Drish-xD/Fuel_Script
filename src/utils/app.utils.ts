import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { trimTrailingSlash } from "hono/trailing-slash";
import packageJSON from "../../package.json";

export const createApp = () => new OpenAPIHono();

export const initOpenAPI = (app: OpenAPIHono) => {
	app.doc("/docs/openapi", {
		info: {
			contact: packageJSON.author,
			description: packageJSON.description,
			license: {
				name: packageJSON.license,
				url: "https://opensource.org/license/gpl-3-0",
			},
			title: packageJSON.description,
			version: packageJSON.version,
		},
		openapi: "3.1.0",
	});

	// initialize the API reference
	app.get(
		"/docs",
		Scalar({
			layout: "classic",
			theme: "saturn",
			url: "/docs/openapi",
		}),
	);
};

export const middleware = (app: OpenAPIHono) => {
	app.use(trimTrailingSlash());
	app.use(requestId());
	app.use(cors());
	app.use(logger());
	app.use(prettyJSON());
};
