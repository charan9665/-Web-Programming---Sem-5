const tickerTrack = document.querySelector("#ticker-track");
const tickerMessage = document.querySelector("#ticker-message");

const announcements = [
  "Upcoming: Check with the examination cell for semester exam dates. Annual college events — dates to be announced.",
  "Stay tuned for updates about upcoming examinations, campus events, and important college notices."
];

let announcementIndex = 0;

tickerTrack.addEventListener("animationiteration", () => {
  announcementIndex = (announcementIndex + 1) % announcements.length;
  tickerMessage.textContent = announcements[announcementIndex];
});
