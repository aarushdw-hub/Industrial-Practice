@echo off
echo ===================================================
echo Starting JobHub AI Java Application...
echo ===================================================
if not exist "bin" (
    call build.bat
)
java -cp bin com.jobhub.ai.Main %*
