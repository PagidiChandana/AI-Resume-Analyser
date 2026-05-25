import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadElementAsPdf = async (elementId, fileName = "resume-analysis-report.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Report section not found");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true
  });

  const imageData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imageHeight = (canvas.height * pageWidth) / canvas.width;

  let heightLeft = imageHeight;
  let position = 0;

  pdf.addImage(imageData, "PNG", 0, position, pageWidth, imageHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imageHeight;
    pdf.addPage();
    pdf.addImage(imageData, "PNG", 0, position, pageWidth, imageHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(fileName);
};
