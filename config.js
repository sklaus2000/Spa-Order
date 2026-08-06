/* ==========================================================
   Mountain Health Bar
   Main Configuration
========================================================== */

window.APP_CONFIG = {
  hotelName: "Mountain Health Bar",

  /* Opening hours in Austrian local time */
  timeZone: "Europe/Vienna",
  openingHour: 11,
  openingMinute: 0,
  closingHour: 17,
  closingMinute: 0,

  /* Reminder appears after five minutes */
  reminderDelayMilliseconds: 5 * 60 * 1000,

  /*
    TEST MODE

    true:
    Requests are simulated and no Telegram message is sent.

    false:
    Requests are sent to the Google Apps Script URL below.
  */
  demoMode: false,

  /*
    This URL will be added later when we connect
    Google Apps Script and Telegram.
  */
  webAppUrl: "https://script.google.com/macros/s/AKfycbxUEfzSQbKEnNMXF2x9OnRTMge1eYmazwi5v9EoygSbo15LSZUMMkCzfVhlexPfKPfK/exec",

  /* Default location if no valid QR-code location is detected */
  defaultLocation: {
    en: "Mountain Health Bar",
    de: "Mountain Health Bar"
  },

  /*
    Locations used in the QR-code links.

    Example:
    ?area=indoor-pool
  */
  locations: {
    "indoor-pool": {
      en: "Indoor Pool",
      de: "Innenpool"
    },

    "outdoor-pool-mountain-side": {
      en: "Outdoor Pool Mountain Side",
      de: "Außenpool Bergseite"
    },

    "outdoor-pool-garden-side": {
      en: "Outdoor Pool Garden Side",
      de: "Außenpool Gartenseite"
    },

    "outdoor-pool-restaurant-side": {
      en: "Outdoor Pool Restaurant Side",
      de: "Außenpool Restaurantseite"
    },

    "mountain-health-bar-indoor-area": {
      en: "Mountain Health Bar Indoor Area",
      de: "Mountain Health Bar Innenbereich"
    },

    "pool-terrace": {
      en: "Pool Terrace",
      de: "Poolterrasse"
    }
  }
};