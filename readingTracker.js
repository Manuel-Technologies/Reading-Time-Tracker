// 
// Active Reading Time Tracker for Web / React
// Tracks real user reading time, with inactivity threshold, visibility handling, and session accumulation.

class ReadingTracker {
  /**
   * @param {number} inactivityLimit - Time in milliseconds before pausing due to inactivity (default 4 min)
   */
  constructor(inactivityLimit = 4 * 60 * 1000) {
    this.startTime = null;          // timestamp when current session starts
    this.lastActiveTime = null;     // timestamp of last user activity
    this.totalTime = 0;             // accumulated reading time in ms
    this.isTracking = false;        // is the tracker currently active
    this.inactivityLimit = inactivityLimit; 
    this.checkInterval = null;      // reference to interval timer

    // Bind event handlers for consistent 'this'
    this.handleActivity = this.handleActivity.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  // Start tracking
  start() {
    if (this.isTracking) return;
    const now = Date.now();
    this.startTime = now;
    this.lastActiveTime = now;
    this.isTracking = true;

    this.attachEvents();
    this.startInactivityChecker();
  }

  // Called whenever user performs activity
  handleActivity() {
    const now = Date.now();
    this.lastActiveTime = now;
    if (!this.isTracking) {
      this.resume();
    }
  }

  // Resume tracking after pause
  resume() {
    if (this.isTracking) return;
    const now = Date.now();
    this.startTime = now;
    this.lastActiveTime = now;
    this.isTracking = true;
  }

  // Pause tracking
  pause() {
    if (!this.isTracking) return;
    const now = Date.now();
    this.totalTime += now - this.startTime;
    this.isTracking = false;
  }

  // Stop tracker and cleanup
  stop() {
    this.pause();
    this.detachEvents();
    clearInterval(this.checkInterval);
    return this.totalTime;
  }

  // Periodically check for inactivity
  startInactivityChecker() {
    this.checkInterval = setInterval(() => {
      const now = Date.now();
      if (this.isTracking && now - this.lastActiveTime > this.inactivityLimit) {
        this.pause();
      }
    }, 5000); // check every 5 seconds
  }

  // Handle browser tab visibility changes
  handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else {
      this.handleActivity();
    }
  }

  // Attach DOM/browser events for activity
  attachEvents() {
    window.addEventListener("scroll", this.handleActivity);
    window.addEventListener("click", this.handleActivity);
    window.addEventListener("keydown", this.handleActivity);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  // Detach events (cleanup)
  detachEvents() {
    window.removeEventListener("scroll", this.handleActivity);
    window.removeEventListener("click", this.handleActivity);
    window.removeEventListener("keydown", this.handleActivity);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
  }

  // Returns total reading time in milliseconds
  getTotalTime() {
    if (this.isTracking) {
      // Include ongoing session
      return this.totalTime + (Date.now() - this.startTime);
    }
    return this.totalTime;
  }

  // Convenience: total time in seconds
  getTotalTimeInSeconds() {
    return Math.floor(this.getTotalTime() / 1000);
  }

  // Convenience: total time in minutes
  getTotalTimeInMinutes() {
    return Math.floor(this.getTotalTime() / 60000);
  }
}

// Example usage (React or plain JS):
// const tracker = new ReadingTracker(); tracker.start();
// On exit or unmount: const total = tracker.stop();

export default ReadingTracker;
