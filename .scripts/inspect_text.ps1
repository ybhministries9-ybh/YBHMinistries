$src='C:\Users\Boggarapu\OneDrive\Desktop\hms-enrollments-export-2025-12-15 (1).xlsx'
$text = Get-Content -LiteralPath $src -Raw -ErrorAction Stop
$text = $text.Substring(0,[Math]::Min(3000,$text.Length))
Write-Output $text
