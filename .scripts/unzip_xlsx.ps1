$src = 'C:\Users\Boggarapu\OneDrive\Desktop\hms-enrollments-export-2025-12-15 (1).xlsx'
$out = 'C:\Sateesh\Projects\YBH Ministries\Website\YBHMinistries\.scripts\xlsx_unzip'
Remove-Item -Path $out -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $out | Out-Null
try {
  Expand-Archive -LiteralPath $src -DestinationPath $out -Force
  Write-Output "OK"
} catch {
  Write-Output "ERROR: $($_.Exception.Message)"
}
