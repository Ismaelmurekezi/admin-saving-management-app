import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin Management API",
      version: "1.0.0",
      description: "API documentation for Admin Management Application",
    },
    servers: process.env.NODE_ENV === "production"
      ? [
          {
            url: process.env.RENDER_EXTERNAL_URL || "https://your-render-app.onrender.com",
            description: "Production server (current)",
          },
          {
            url: "http://localhost:5001",
            description: "Development server (may not work from production)",
          }
        ]
      : [
          {
            url: "http://localhost:5001",
            description: "Development server (current)",
          },
          {
            url: process.env.RENDER_EXTERNAL_URL || "https://your-render-app.onrender.com",
            description: "Production server",
          }
        ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: process.env.NODE_ENV === "production" 
    ? ["./dist/routes/*.js"]
    : ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
