import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import handlebars from "handlebars";

// Configuração de caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helpers do Handlebars
handlebars.registerHelper("formatDate", (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
});

handlebars.registerHelper("currency", (value) => {
  return parseFloat(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
});

handlebars.registerHelper("defaultValue", (value, defaultValue) => {
  return value || defaultValue;
});
handlebars.registerHelper("eq", function (a, b, options) {
  // se veio o objeto options (uso em bloco {{#eq}}…{{/eq}})
  if (options && typeof options.fn === "function") {
    return a == b ? options.fn(this) : options.inverse(this);
  }
  // caso contrário (uso em subexpressão), retorna boolean
  return a == b;
});

export default async function createPDF(data) {
  let browser;
  try {
    // Carrega o template
    const templatePath = path.join(__dirname, "pdfTemplate", "pdf.hbs");
    const templateHtml = fs.readFileSync(templatePath, "utf8");

    // Compila o template
    const template = handlebars.compile(templateHtml);
    const html = template(data);
    console.log("Generated HTML:", html.substring(0, 1000) + "…");

    // Configuração do Puppeteer
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Configuração do PDF
    // calcula a pasta onde está o pdf.html
    const templateDir = path.dirname(templatePath);

    await page.setContent(html, {
      waitUntil: "networkidle0",
      // informa ao Puppeteer a "URL base" para href/src
      url: `file://${templateDir}/pdf.html`,
    });

    const pdfOptions = {
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    return pdfBuffer;
  } catch (error) {
    throw new Error(`Falha na geração do PDF: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
