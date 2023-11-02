# Reason for uploading this in a non-working state

This program is made to download videos from a site that allows you to stream its content. That way I can watch it offline. However, as I'm not sure on the legal specifics, this extension release is only for my resume.
This will not work as is, but can be modified to work.



# VideoExtractor
A program made to extract videos from a certain site.  

# How To Use
Place run.bat and FFMPEG.exe into Downloads/videos/   
add the extension to firefox using about:debugging  
select the manifest.json file  

load the video you want on *redacted*
click the extension button   
click download  
KEEP MOUSE ON DOWNLOAD BUTTON WHILE DOWNLOADING!  
changing the tab or closing the extension popup window will stop the process  

run the run.bat  
delete leftover video files in folder  

# Bugs to fix
does not auto run the bat file  
stops if extension popup page is closed (changing tabs or clicking elsewhere) before completion  

# Warning
Deletes all .mp4 files in the folder where .bat is run DO NOT LEAVE ANY OTHER VIDEO FILES IN THIS FOLDER. This does not include the output folder, that will be fine.  

# Work Around
In about:debugging, inspect the extension.  
click the 3 dots at the top right of the new windows  
Make sure "Disable Popup Auto-Hide" is checked. This will keep the window from closing and breaking your downloads.  
be sure to disable this when done. This makes ANY popup window not auto close. This includes right clicking or other popup windows.  
