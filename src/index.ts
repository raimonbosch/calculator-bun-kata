import { serve } from "bun";
import index from "./index.html";
import {NumbersCalculatorUseCase} from "@/calculator/application/numbers-calculator.use-case.ts";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/calculator": {
      async POST(req) {
        const useCase = await NumbersCalculatorUseCase.getInstance()
        const data = await req.json()
        const result = await useCase.execute(data?.content)
        return Response.json({
          message: result,
          method: "POST",
        });
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
