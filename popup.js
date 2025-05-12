document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleBtn');
	
    chrome.storage.sync.get(['isEnabled'], (result) => {
      const isEnabled = result.isEnabled !== undefined ? result.isEnabled : true;
      updateButton(isEnabled);
    });
	
	 toggleBtn.addEventListener('click', () => {
      chrome.storage.sync.get(['isEnabled'], (result) => {
        const newState = !result.isEnabled;
        chrome.storage.sync.set({ isEnabled: newState }, () => {
          updateButton(newState);
          chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.reload(tabs[0].id);
          });
        });
      });
    });
  
    function updateButton(isEnabled) {
      toggleBtn.textContent = isEnabled ? 'ON' : 'OFF';
      toggleBtn.style.backgroundColor = isEnabled ? '#4CAF50' : '#f44336';
    }
  
  });