import ExcelJS from 'exceljs';

/**
 * Configuration for Excel export
 */
export interface ExcelExportConfig {
  data: Record<string, any>[];
  sheetName: string;
  filename: string;
  columnWidths?: { wch: number }[];
}

/**
 * Generates an Excel file from data and returns it as a buffer
 */
export async function generateExcelBuffer(config: ExcelExportConfig): Promise<Buffer> {
  const { data, sheetName, columnWidths } = config;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName || 'Sheet1');

  if (data && data.length > 0) {
    // Add header row from keys of first object
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Add data rows
    for (const row of data) {
      const values = headers.map(h => (row as any)[h]);
      worksheet.addRow(values);
    }
  }

  // Apply column widths if provided (convert { wch } -> exceljs width)
  if (columnWidths && columnWidths.length > 0) {
    worksheet.columns = columnWidths.map(col => ({ width: (col.wch || 10) }));
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

/**
 * Formats a UTC timestamp to IST date string (without time)
 */
export function formatISTDate(utcTimestamp: string | Date | null | undefined): string {
  if (!utcTimestamp) return '';
  
  try {
    return new Date(utcTimestamp).toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return '';
  }
}

/**
 * Builds SQL conditions for date range filtering with IST timezone
 */
export function buildDateRangeCondition(
  month: string | undefined,
  year: string | undefined,
  valueOffset: number
): { condition: string; values: any[] } | null {
  if (!month && !year) return null;

  const values: any[] = [];
  let condition = '';

  if (month && year) {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const nextMonth = parseInt(month) === 12 ? 1 : parseInt(month) + 1;
    const nextYear = parseInt(month) === 12 ? parseInt(year) + 1 : parseInt(year);
    const endDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;
    
    condition = `DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${valueOffset + 1} AND DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${valueOffset + 2}`;
    values.push(startDate, endDate);
  } else if (year) {
    const startDate = `${year}-01-01`;
    const endDate = `${parseInt(year) + 1}-01-01`;
    
    condition = `DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') >= $${valueOffset + 1} AND DATE(created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < $${valueOffset + 2}`;
    values.push(startDate, endDate);
  }

  return { condition, values };
}

/**
 * Generates a filename with optional filters and timestamp
 */
export function generateExportFilename(
  baseName: string,
  month?: string,
  year?: string
): string {
  const timestamp = new Date().toISOString().split('T')[0];
  let filename = baseName;

  if (year && month) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    filename += `-${monthNames[parseInt(month) - 1]}-${year}`;
  } else if (year) {
    filename += `-${year}`;
  }

  return `${filename}-${timestamp}.xlsx`;
}

/**
 * Client-side utility to trigger file download
 */
export function downloadExcelFile(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
