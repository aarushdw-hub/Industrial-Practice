@echo off
echo ===================================================
echo Compiling JobHub AI Java Application...
echo ===================================================
if not exist "bin" mkdir bin
javac -encoding UTF-8 -d bin -sourcepath src src/com/jobhub/ai/Main.java
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Compilation complete. Classes saved in bin/
) else (
    echo [ERROR] Compilation failed.
)
