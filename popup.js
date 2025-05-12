document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
	
    chrome.storage.sync.get(['isEnabled'], (result) => {
      const isEnabled = result.isEnabled !== undefined ? result.isEnabled : true;
      updateButton(isEnabled);
    });
  
  
  });