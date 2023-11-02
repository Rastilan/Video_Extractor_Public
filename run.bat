@echo off

rem Specify the name of the mylist.txt file
set "myListFileName=mylist.txt"

rem Check if mylist.txt exists in the parent folder
if not exist "..\%myListFileName%" (
    echo mylist.txt not found in the parent folder.
    pause
    exit
)

rem Extract the base name (excluding extension) from the first input file in the list
for %%i in (*.mp4) do (
    set "inputFile=%%~ni"
    goto :break
)
:break

rem Create an "output" directory if it doesn't exist
if not exist "output" mkdir "output"

rem Run FFmpeg to concatenate the videos using the moved mylist.txt
ffmpeg -f concat -safe 0 -i "..\%myListFileName%" -c copy "output\%inputFile%.mp4"

rem Clean up by removing the moved mylist.txt
del "..\%myListFileName%"

rem Clean up by removing only mp4 files found in the current directory
for %%i in (*.mp4) do del "%%i"

