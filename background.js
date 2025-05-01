// List of blacklisted domains
const blacklistedDomains = ["example.com", "facebook.com", "twitter.com"];

// Function to display a notification
function showNotification(domain) {
  chrome.notifications.create(
    {
      type: "basic",
      iconUrl: "icon.png",
      title: "Warning!",
      message: `You are visiting a blacklisted domain: ${domain}. Please be cautious.`,
      priority: 2
    },
    (notificationId) => {
      if (chrome.runtime.lastError) {
        console.error("Notification Error:", chrome.runtime.lastError);
      } else {
        console.log(`Notification created with ID: ${notificationId}`);
      }
    }
  );
}

// Listen for web requests
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    try {
      const url = new URL(details.url);
      if (blacklistedDomains.includes(url.hostname)) {
        console.log(`Visiting blacklisted domain: ${url.hostname}`); // Debugging log
        showNotification(url.hostname); // Show notification
      }
    } catch (error) {
      console.error("Error parsing URL:", error); // Debugging log
    }
  },
  { urls: ["<all_urls>"] }
);

// Debugging: Log to ensure the event listener is working
console.log("Blacklisted Domain Warning extension is running.");