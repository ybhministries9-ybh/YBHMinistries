$src='C:\Users\Boggarapu\OneDrive\Desktop\hms-enrollments-export-2025-12-15 (1).xlsx'
$dst='C:\Sateesh\Projects\YBH Ministries\Website\YBHMinistries\hms-enrollments-export-2025-12-15.fixed.xlsx'
try {
  $xl = New-Object -ComObject Excel.Application
  $xl.DisplayAlerts = $false
  $wb = $xl.Workbooks.Open($src, $null, $false)
  $wb.SaveAs($dst, 51)
  $wb.Close()
  $xl.Quit()
  Write-Output "OK"
} catch {
  Write-Output "ERROR: $($_.Exception.Message)"
}
