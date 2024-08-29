import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";
import redoc from "redoc-express";
import { ServerSettings } from "../../server";

export class SwaggerExtension implements ServerSettings {
  private setupSwagger(app: Express) {
    const swaggerDocument = require(`${process.cwd()}` + "/swagger.json");
    app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get("/swagger.json", (_: Request, res: Response) => {
      return res.sendFile(process.cwd() + "/swagger.json");
    });
  }

  private setupRedoc(app: Express) {
    app.get(
      "/docs",
      redoc({
        title: "Documentação",
        specUrl: "/swagger.json",
        nonce: "",
        redocOptions: {
          theme: {
            colors: {
              primary: {
                main: "#6EC5AB",
              },
            },
            typography: {
              fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
              fontSize: "15px",
              lineHeight: "1.5",
              code: {
                code: "#87E8C7",
                backgroundColor: "#4D4D4E",
              },
            },
            menu: {
              backgroundColor: "#ffffff",
            },
          },
        },
      })
    );
  }

  setConfig(app: Express) {
    this.setupSwagger(app);
    this.setupRedoc(app);
  }
}
