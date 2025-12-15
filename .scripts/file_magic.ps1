$src='C:\Users\Boggarapu\OneDrive\Desktop\hms-enrollments-export-2025-12-15 (1).xlsx'
$fs = [System.IO.File]::OpenRead($src)
$buffer = New-Object byte[] 8
$fs.Read($buffer,0,8) | Out-Null
$fs.Close()
$hex = ($buffer | ForEach-Object { $_.ToString('X2') }) -join ' '
Write-Output $hex
