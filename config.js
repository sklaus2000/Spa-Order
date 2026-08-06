/* ==========================================================
   Mountain Health Bar
   Main Configuration
========================================================== */

window.APP_CONFIG = {
  hotelName: "Mountain Health Bar",

  /* Fallback opening hours if Google Sheets is unavailable */
  timeZone: "Europe/Vienna",
  openingHour: 11,
  openingMinute: 0,
  closingHour: 17,
  closingMinute: 0,

  /* Reminder appears after five minutes */
  reminderDelayMilliseconds: 5 * 60 * 1000,

  /* false = live Telegram and Google Sheets requests */
  demoMode: false,

  /* Google Apps Script backend */
  webAppUrl:
    "https://script.google.com/macros/s/AKfycbxUEfzSQbKEnNMXF2x9OnRTMge1eYmazwi5v9EoygSbo15LSZUMMkCzfVhlexPfKPfK/exec",

  menuApiUrl:
    "https://script.google.com/macros/s/AKfycbxUEfzSQbKEnNMXF2x9OnRTMge1eYmazwi5v9EoygSbo15LSZUMMkCzfVhlexPfKPfK/exec?action=menu",

  categoriesApiUrl:
    "https://script.google.com/macros/s/AKfycbxUEfzSQbKEnNMXF2x9OnRTMge1eYmazwi5v9EoygSbo15LSZUMMkCzfVhlexPfKPfK/exec?action=categories",

  settingsApiUrl:
    "https://script.google.com/macros/s/AKfycbxUEfzSQbKEnNMXF2x9OnRTMge1eYmazwi5v9EoygSbo15LSZUMMkCzfVhlexPfKPfK/exec?action=settings",

  /*
    Open-Meteo weather for Jochberg.
    No personal API key is required.
  */
  weatherApiUrl:
    "https://api.open-meteo.com/v1/forecast?latitude=47.379&longitude=12.418&current=temperature_2m,weather_code&daily=uv_index_max&timezone=Europe%2FVienna&forecast_days=1",

  defaultLocation: {
    en: "Mountain Health Bar",
    de: "Mountain Health Bar"
  },

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
