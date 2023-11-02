import React, { useState, useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';


function App() {
  const [videoName, setVideoName] = useState('test');
  const [downloadedVideos, setDownloadedVideos] = useState([]); // Store downloaded video names
  const [statusText, setStatusText] = useState('');
  let contents = [];

   function sanitizeFileName(fileName) {
    // Define a regex pattern to match illegal characters
    const illegalCharacters = /[\/?<>\\:*|'"]/g;
  
    // Replace illegal characters with underscores and remove leading/trailing spaces
    return fileName.replace(illegalCharacters, '_').trim();
  }

  const updateStatusText = (newText) => {
    setStatusText(newText);
  };

const handleDownloadClick = async () => {
  const currentURL = await getCurrentTabUrl();
  console.log(currentURL.contents.result)
  setVideoName(currentURL.contents);
  console.log("Video Name: " + videoName);
  if (videoName && currentURL) {
    // Call the downloadVideo function with currentURL and videoName
    console.log(currentURL);
    downloadVideo(currentURL.url, sanitizeFileName(currentURL.contents.result));
    updateStatusText('Downloading...');
  } else {
    console.log("Error URL: " + currentURL.url + " video name: " + videoName);
    updateStatusText('Error: Unable to download.');
  }
};

const downloadVideo = async (videoUrl, videoName) => {
  let num = 1;
  let files = [];
  const checkForCourseURL = '/course/';
  let videoId;

  if (videoUrl.includes(checkForCourseURL)) {
    videoId = videoUrl.split('/')[6];
    console.log('Video ID1: ' + videoId);
  } else {
    videoId = videoUrl.split('/').pop();
    console.log(videoUrl.split('/'));
  }

  while (true) {
    const pieceNumber = num.toString().padStart(5, '0');
    const url = `redacted/${videoId}/redacted-${pieceNumber}.ts`;
    console.log(url);

    try {
      const response = await fetch(url);
      if (response.ok) {
        const file_name = `${videoName}-${num}.mp4`;
        await downloadSc(url, videoName, num); // You might need to define 'downloadSc' function
        num++;
        // Store the URL and file_name in the 'files' array
        files.push("file '" + file_name + "'");
        const file_size = (response.headers.get('content-length') / 1024).toFixed(2);
        console.log(`Download file: ${file_name} ${file_size} Kb`);
      } else {
        console.log(`Downloaded ${num - 1} files.`);
        console.log('Temporary files deleted...');
        console.log(`Video file ${videoName} created.`);
          saveDownloadedVideosToFile(files);
          updateStatusText('Download Complete!');
        break;
      }
    } catch (error) {
      console.error(error);
      break;
    }
  }
};


const saveDownloadedVideosToFile = (videos) => {
  console.log(videos);
  const text = videos.join('\n');
  const blob = new Blob([text], { type: 'text/plain' });
  saveAs(blob, 'mylist.txt');
};




const getCurrentTabUrl = async () => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs && tabs[0] && tabs[0].url) {
    const tabId = tabs[0].id;
    const results = await browser.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        const elements = document.getElementsByClassName("css-79elbk");
        const contentList = Array.from(elements).map(element => element.textContent);
        const combinedContents = contentList.join(" "); // Combine the contents into a single string
        return combinedContents;
      },
    });

    const combinedContents = results[0]; // Assign the result to the outer combinedContents variable

    return { url: tabs[0].url, contents: combinedContents };
  } else {
    return { url: "No URL found", contents: "" }; // Initialize contents as an empty string
  }
};


  const downloadSc = async (downloadUrl, videoName, counter) => {
    try {
      const response = await fetch(downloadUrl);
      if (response.ok) {
        const blob = await response.blob();
        const blobURL = URL.createObjectURL(blob);
        // Adjust the filename format as needed
        const filename = `redacted/${videoName}-${counter}.mp4`;
  
        // Trigger the download
        const downloadOptions = {
          url: blobURL,
          filename,
        };
        const downloadId = await browser.downloads.download(downloadOptions);
  
        // Handle the download result or save the downloadId for future reference
        // (e.g., updating a download progress UI)
      } else {
        console.error('Response is not okay');
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error during download: ', error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  
  
  

  return (
    <div>
      <button id="downloadButton" onClick={handleDownloadClick}>Download</button>
      <div id="statusText">{statusText}</div>
    </div>
  );
}

export default App;
