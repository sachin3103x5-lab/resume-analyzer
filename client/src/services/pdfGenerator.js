import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Generates a comprehensive, full-detail A4 PDF from any DOM element and triggers automatic download.
 * Ensures zero content cutoff by capturing unconstrained dimensions and supporting multi-page auto-split.
 * @param {HTMLElement} element - The DOM element to capture
 * @param {string} fileName - The downloaded PDF filename
 */
export async function downloadElementAsPdf(element, fileName = 'ATS_Audit_Report.pdf') {
  if (!element) return;

  try {
    // Clone element to a clean unconstrained offscreen container
    const clone = element.cloneNode(true);
    clone.style.width = '850px';
    clone.style.maxWidth = '850px';
    clone.style.height = 'auto';
    clone.style.maxHeight = 'none';
    clone.style.overflow = 'visible';
    clone.style.position = 'fixed';
    clone.style.top = '-99999px';
    clone.style.left = '0';
    clone.style.zIndex = '-9999';
    clone.style.padding = '24px';
    clone.style.boxSizing = 'border-box';
    document.body.appendChild(clone);

    // Capture crisp high-DPI canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // 2x high resolution for crisp text
      useCORS: true,
      logging: false,
      backgroundColor: clone.classList.contains('dark') ? '#0b4d26' : '#ffffff',
      windowWidth: 850,
      windowHeight: clone.scrollHeight + 100
    });

    document.body.removeChild(clone);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 8;
    const imgWidth = pageWidth - margin * 2;
    const pageContentHeight = pageHeight - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    // First page
    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageContentHeight;

    // Add subsequent pages if the full detail report spans more than 1 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageContentHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('PDF Generation failed:', error);
    window.print();
    return false;
  }
}
