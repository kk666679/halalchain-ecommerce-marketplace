import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFOptions {
  title?: string;
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

export class PDFGenerator {
  private doc: jsPDF;

  constructor(options: PDFOptions = {}) {
    const { format = 'a4', orientation = 'portrait' } = options;
    this.doc = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });
  }

  async addPageFromElement(element: HTMLElement, options: { scale?: number } = {}): Promise<void> {
    const { scale = 2 } = options;

    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      this.doc.addPage();
      this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  }

  async addPageFromHTML(html: string, options: { scale?: number } = {}): Promise<void> {
    // Create a temporary element to render HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '210mm'; // A4 width
    document.body.appendChild(tempDiv);

    try {
      await this.addPageFromElement(tempDiv, options);
    } finally {
      document.body.removeChild(tempDiv);
    }
  }

  addText(text: string, x: number, y: number, options: { fontSize?: number; font?: string } = {}): void {
    const { fontSize = 12, font = 'helvetica' } = options;
    this.doc.setFont(font);
    this.doc.setFontSize(fontSize);
    this.doc.text(text, x, y);
  }

  addImage(imageData: string, x: number, y: number, width: number, height: number): void {
    this.doc.addImage(imageData, 'PNG', x, y, width, height);
  }

  addPage(): void {
    this.doc.addPage();
  }

  save(filename: string = 'document.pdf'): void {
    this.doc.save(filename);
  }

  getBlob(): Blob {
    return this.doc.output('blob');
  }

  getDataURL(): string {
    return this.doc.output('dataurlstring');
  }
}

// Utility functions for common PDF generation tasks
export const generateInvestorDeck = async (element: HTMLElement): Promise<void> => {
  const generator = new PDFGenerator({
    title: 'HalalChain Investor Deck',
    filename: 'halalchain-investor-deck.pdf'
  });

  await generator.addPageFromElement(element);
  generator.save('halalchain-investor-deck.pdf');
};

export const generateProductCatalog = async (products: Array<{name: string; price: number; vendor?: {storeName?: string}}>): Promise<void> => {
  const generator = new PDFGenerator({
    title: 'HalalChain Product Catalog',
    filename: 'halalchain-product-catalog.pdf'
  });

  // Add title page
  generator.addText('HalalChain Product Catalog', 20, 30, { fontSize: 24 });
  generator.addText(`Generated on ${new Date().toLocaleDateString()}`, 20, 50);

  // Add products
  products.forEach((product, index) => {
    if (index > 0 && index % 5 === 0) {
      generator.addPage();
    }

    const y = 70 + (index % 5) * 50;
    generator.addText(product.name, 20, y);
    generator.addText(`Price: $${product.price}`, 20, y + 10);
    generator.addText(`Vendor: ${product.vendor?.storeName || 'Unknown'}`, 20, y + 20);
  });

  generator.save();
};

export const generateReport = async (
  title: string,
  data: Record<string, unknown>,
  element?: HTMLElement
): Promise<void> => {
  const generator = new PDFGenerator({
    title,
    filename: `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`
  });

  if (element) {
    await generator.addPageFromElement(element);
  } else {
    // Generate basic report from data
    generator.addText(title, 20, 30, { fontSize: 20 });

    let y = 60;
    Object.entries(data).forEach(([key, value]) => {
      generator.addText(`${key}: ${value}`, 20, y);
      y += 15;
      if (y > 270) {
        generator.addPage();
        y = 30;
      }
    });
  }

  generator.save();
};
