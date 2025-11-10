# PowerShell script to remove version numbers from imports
$files = Get-ChildItem -Path "src" -Include *.tsx,*.ts -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace "@[\d\.]+([`"`'])", '$1'
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Fixed: $($file.FullName)"
    }
}

Write-Host "Done! Fixed versioned imports."
