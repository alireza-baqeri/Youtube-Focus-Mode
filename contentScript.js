// chrome.storage.sync.get(['isEnabled'], (result) => {
//   const isEnabled = result.isEnabled !== undefined ? result.isEnabled : true;
//   if (isEnabled) {
//     blockShorts();
//     setupObserver();
//   }
// });

// function blockShorts() {
//   // مسدود کردن صفحه Shorts
//   if (window.location.href.includes('/shorts/')) {
//     document.documentElement.innerHTML = '<h1 style="text-align:center;padding:20px;">این محتوا توسط اکستنشن مسدود شده است</h1>';
//   }

//   // مخفی کردن محتوای Shorts در صفحات دیگر
//   const shortsElements = document.querySelectorAll('div#contents.style-scope.ytd-item-section-renderer, [is-shorts]');
//   shortsElements.forEach(element => {
//     element.style.display = 'none';
//   });
// }

// function setupObserver() {
//   const observer = new MutationObserver((mutations) => {
//     blockShorts();
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true
//   });
// }

chrome.storage.sync.get(['isEnabled'], (result) => {
  const isEnabled = result.isEnabled !== undefined ? result.isEnabled : true;
  if (isEnabled) {
    blockShorts();
    setupObserver();
  }
});

function blockShorts() {
  // مسدود کردن صفحه Shorts
  if (window.location.href.includes('/shorts/')) {
    document.documentElement.innerHTML = '<h1 style="text-align:center;padding:20px;">این محتوا توسط اکستنشن مسدود شده است</h1>';
  }

  // مخفی کردن المان‌های مورد نظر
  const elementsToHide = [
    'div#contents.style-scope.ytd-item-section-renderer',
    '[is-shorts]',
    '.ytp-endscreen-content' // تگ جدید اضافه شده
  ];
  
  const shortsElements = document.querySelectorAll(elementsToHide.join(', '));
  shortsElements.forEach(element => {
    element.style.display = 'none';
  });
}

function setupObserver() {
  const observer = new MutationObserver((mutations) => {
    blockShorts();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}