/* ==========================================================
   Mountain Health Bar
   Pool Service Website
   Version 1.0
========================================================== */

"use strict";

/* ----------------------------------------------------------
   CONFIGURATION CHECK
---------------------------------------------------------- */

const CONFIG = window.APP_CONFIG;
let MENU = window.MENU_DATA;

if (!CONFIG) {
  throw new Error("APP_CONFIG could not be loaded.");
}

if (!MENU) {
  throw new Error("MENU_DATA could not be loaded.");
}


/* ----------------------------------------------------------
   TRANSLATIONS
---------------------------------------------------------- */

const translations = {
  en: {
    welcomeEyebrow: "Poolside service",
    welcomeTitle: "How may we assist you?",
    welcomeText: "Select an option below and our team will be notified.",

    yourLocation: "Your location",

    callService: "Call for Service",
    callServiceDescription:
      "A member of our service team will come to you.",

    freshTowels: "Fresh Towels",
    freshTowelsDescription:
      "Our spa team will bring fresh towels.",

    viewMenu: "View Menu",
    viewMenuDescription:
      "Explore our drinks and food selection.",

    checkingOpeningHours: "Checking opening hours",
    currentlyOpen: "Service requests are currently available",
    currentlyClosedShort: "Service requests are currently unavailable",

    menuEyebrow: "Mountain Health Bar",
    menuTitle: "Menu",
    menuDescription: "Please explore our current selection.",

    priceInformation:
      "All prices are stated in euros and include local taxes.",

    milkInformation:
      "Decaffeinated coffee and lactose-free, soy, oat, almond or rice milk are available on request.",

    requestConfirmation: "Request confirmation",
    cancel: "Cancel",
    confirmRequest: "Confirm Request",

    serviceModalTitle: "Call for Service",
    serviceModalText:
      "Would you like to notify our service team?",

    towelsModalTitle: "Fresh Towels",
    towelsModalText:
      "Would you like to notify our spa team?",

    requestSent: "Request sent",
    thankYou: "Thank you",
    teamComingSoon:
      "A member of our team will be with you shortly.",

    close: "Close",
    stillWaiting: "Still waiting? Remind our team",

    currentlyClosed:
      "The Mountain Health Bar is currently closed.",

    openingHoursMessage:
      "Our opening hours are from 11:00 to 17:00.",

    contactSpaDirectly:
      "For assistance, please contact our Spa Team directly.",

    sendingRequest: "Sending request",

    requestError:
      "The request could not be sent. Please contact our team directly.",

    reminderSent:
      "Your reminder has been sent to our team.",

    requestAlreadySent:
      "This request has already been sent.",

    invalidLocation:
      "The location could not be identified.",

    demoRequestSent:
      "Test request completed successfully.",

    announcementLabel: "Today at the Mountain Health Bar",
    weatherLabel: "Weather in Jochberg",
    temperatureLabel: "Temperature",
    uvLabel: "UV Index",
    weatherUnavailable: "Weather currently unavailable",
    feelsLikeLabel: "Feels like",
    humidityLabel: "Humidity",
    windLabel: "Wind",
    sunriseLabel: "Sunrise",
    sunsetLabel: "Sunset",
    updatedLabel: "Updated",
    uvAfterSunset: "No UV radiation",

    emptyCategory:
      "No items are currently listed in this category."
  },

  de: {
    welcomeEyebrow: "Service am Pool",
    welcomeTitle: "Wie dürfen wir Ihnen helfen?",
    welcomeText:
      "Wählen Sie eine Option aus und unser Team wird benachrichtigt.",

    yourLocation: "Ihr Standort",

    callService: "Service rufen",
    callServiceDescription:
      "Ein Mitglied unseres Serviceteams kommt zu Ihnen.",

    freshTowels: "Frische Handtücher",
    freshTowelsDescription:
      "Unser Spa-Team bringt Ihnen frische Handtücher.",

    viewMenu: "Karte ansehen",
    viewMenuDescription:
      "Entdecken Sie unser Getränke- und Speisenangebot.",

    checkingOpeningHours: "Öffnungszeiten werden geprüft",
    currentlyOpen: "Serviceanfragen sind derzeit möglich",
    currentlyClosedShort: "Serviceanfragen sind derzeit nicht möglich",

    menuEyebrow: "Mountain Health Bar",
    menuTitle: "Karte",
    menuDescription: "Entdecken Sie unser aktuelles Angebot.",

    priceInformation:
      "Alle Preise verstehen sich in Euro und beinhalten die lokalen Steuern.",

    milkInformation:
      "Koffeinfreier Kaffee sowie laktosefreie Milch, Sojamilch, Hafermilch, Mandelmilch oder Reismilch sind auf Wunsch erhältlich.",

    requestConfirmation: "Anfrage bestätigen",
    cancel: "Abbrechen",
    confirmRequest: "Anfrage senden",

    serviceModalTitle: "Service rufen",
    serviceModalText:
      "Möchten Sie unser Serviceteam benachrichtigen?",

    towelsModalTitle: "Frische Handtücher",
    towelsModalText:
      "Möchten Sie unser Spa-Team benachrichtigen?",

    requestSent: "Anfrage gesendet",
    thankYou: "Vielen Dank",
    teamComingSoon:
      "Ein Mitglied unseres Teams ist in Kürze bei Ihnen.",

    close: "Schließen",
    stillWaiting: "Warten Sie noch? Team erneut erinnern",

    currentlyClosed:
      "Die Mountain Health Bar ist derzeit geschlossen.",

    openingHoursMessage:
      "Unsere Öffnungszeiten sind von 11:00 bis 17:00 Uhr.",

    contactSpaDirectly:
      "Für Unterstützung kontaktieren Sie bitte direkt unser Spa-Team.",

    sendingRequest: "Anfrage wird gesendet",

    requestError:
      "Die Anfrage konnte nicht gesendet werden. Bitte kontaktieren Sie unser Team direkt.",

    reminderSent:
      "Ihre Erinnerung wurde an unser Team gesendet.",

    requestAlreadySent:
      "Diese Anfrage wurde bereits gesendet.",

    invalidLocation:
      "Der Standort konnte nicht erkannt werden.",

    demoRequestSent:
      "Die Testanfrage wurde erfolgreich abgeschlossen.",

    announcementLabel: "Heute in der Mountain Health Bar",
    weatherLabel: "Wetter in Jochberg",
    temperatureLabel: "Temperatur",
    uvLabel: "UV-Index",
    weatherUnavailable: "Wetter derzeit nicht verfügbar",
    feelsLikeLabel: "Gefühlt",
    humidityLabel: "Luftfeuchtigkeit",
    windLabel: "Wind",
    sunriseLabel: "Sonnenaufgang",
    sunsetLabel: "Sonnenuntergang",
    updatedLabel: "Aktualisiert",
    uvAfterSunset: "Keine UV-Strahlung",

    emptyCategory:
      "In dieser Kategorie sind derzeit keine Artikel eingetragen."
  }
};


/* ----------------------------------------------------------
   APPLICATION STATE
---------------------------------------------------------- */

const state = {
  language: loadSavedLanguage(),
  areaKey: getAreaFromUrl(),
  location: null,
  selectedRequestType: null,
  lastRequestType: null,
  lastRequestTime: null,
  reminderTimer: null,
  toastTimer: null,
  settings: {},
  weather: null
};


/* ----------------------------------------------------------
   ELEMENTS
---------------------------------------------------------- */

const siteHeader = document.getElementById("siteHeader");
const homeButton = document.getElementById("homeButton");

const languageEn = document.getElementById("languageEn");
const languageDe = document.getElementById("languageDe");

const locationName = document.getElementById("locationName");
const modalLocationName = document.getElementById("modalLocationName");
const successLocationName = document.getElementById(
  "successLocationName"
);

const serviceButton = document.getElementById("serviceButton");
const towelsButton = document.getElementById("towelsButton");
const menuButton = document.getElementById("menuButton");

const openingStatus = document.getElementById("openingStatus");
const closedPanel = document.getElementById("closedPanel");

const menuNavigation = document.getElementById("menuNavigation");
const menuContent = document.getElementById("menuContent");

const requestModal = document.getElementById("requestModal");
const modalCloseButton = document.getElementById(
  "modalCloseButton"
);
const cancelRequestButton = document.getElementById(
  "cancelRequestButton"
);
const confirmRequestButton = document.getElementById(
  "confirmRequestButton"
);

const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const successOverlay = document.getElementById("successOverlay");
const closeSuccessButton = document.getElementById(
  "closeSuccessButton"
);
const reminderButton = document.getElementById("reminderButton");

const loadingOverlay = document.getElementById("loadingOverlay");
const toast = document.getElementById("toast");

const guestInformation = document.getElementById("guestInformation");
const announcementCard = document.getElementById("announcementCard");
const announcementLabel = document.getElementById("announcementLabel");
const announcementTitle = document.getElementById("announcementTitle");
const announcementText = document.getElementById("announcementText");

const weatherCard = document.getElementById("weatherCard");
const weatherLabel = document.getElementById("weatherLabel");
const weatherIcon = document.getElementById("weatherIcon");
const weatherCondition = document.getElementById("weatherCondition");
const weatherTemperature = document.getElementById("weatherTemperature");
const weatherFeelsLike = document.getElementById("weatherFeelsLike");
const weatherHumidity = document.getElementById("weatherHumidity");
const weatherWind = document.getElementById("weatherWind");
const weatherSunrise = document.getElementById("weatherSunrise");
const weatherSunset = document.getElementById("weatherSunset");
const weatherUpdated = document.getElementById("weatherUpdated");
const weatherUv = document.getElementById("weatherUv");
const weatherUvValue = document.getElementById("weatherUvValue");
const weatherUvNote = document.getElementById("weatherUvNote");


/* ----------------------------------------------------------
   INITIALIZATION
---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
  state.location = getLocationObject();

  updateLanguageButtons();
  updateTranslations();
  updateLocationLabels();

  await Promise.all([
    loadMenuFromGoogleSheets(),
    loadCategoriesFromGoogleSheets(),
    loadSettingsFromGoogleSheets()
  ]);

  renderMenu();
  updateOpeningStatus();
  renderAnnouncement();
  updateWeatherVisibility();

  addEventListeners();
  initializePremiumAnimations();

  if (isSettingEnabled("Weather Widget", true)) {
    loadWeather();
  }

  window.setInterval(updateOpeningStatus, 30000);
  window.setInterval(loadWeather, 10 * 60 * 1000);

  window.requestAnimationFrame(function () {
    document.body.classList.add("app-ready");
  });
}


/* ----------------------------------------------------------
   EVENT LISTENERS
---------------------------------------------------------- */

function addEventListeners() {
  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  homeButton.addEventListener("click", scrollToTop);

  languageEn.addEventListener("click", function () {
    setLanguage("en");
  });

  languageDe.addEventListener("click", function () {
    setLanguage("de");
  });

  serviceButton.addEventListener("click", function () {
    openRequestModal("service");
  });

  towelsButton.addEventListener("click", function () {
    openRequestModal("towels");
  });

  menuButton.addEventListener("click", scrollToMenu);

  modalCloseButton.addEventListener("click", closeRequestModal);
  cancelRequestButton.addEventListener("click", closeRequestModal);

  confirmRequestButton.addEventListener(
    "click",
    confirmSelectedRequest
  );

  closeSuccessButton.addEventListener(
    "click",
    closeSuccessOverlay
  );

  reminderButton.addEventListener("click", sendReminder);

  requestModal.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-close-modal")) {
      closeRequestModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeRequestModal();
      closeSuccessOverlay();
    }
  });
}


/* ----------------------------------------------------------
   HEADER
---------------------------------------------------------- */

function handleScroll() {
  if (window.scrollY > 40) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function scrollToMenu() {
  const menuSection = document.getElementById("menu");

  menuSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


/* ----------------------------------------------------------
   LANGUAGE
---------------------------------------------------------- */

function loadSavedLanguage() {
  const savedLanguage = localStorage.getItem("mhb-language");

  if (savedLanguage === "de" || savedLanguage === "en") {
    return savedLanguage;
  }

  return "en";
}

function setLanguage(language) {
  if (!translations[language]) {
    return;
  }

  state.language = language;

  localStorage.setItem("mhb-language", language);

  document.documentElement.lang = language;

  updateLanguageButtons();
  updateTranslations();
  updateLocationLabels();
  renderMenu();
  updateOpeningStatus();
  renderAnnouncement();
  updateWeatherDisplay();
}

function updateLanguageButtons() {
  languageEn.classList.toggle(
    "active",
    state.language === "en"
  );

  languageDe.classList.toggle(
    "active",
    state.language === "de"
  );
}

function updateTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach(function (element) {
    const translationKey = element.dataset.i18n;
    const translatedText =
      translations[state.language][translationKey];

    if (translatedText) {
      element.textContent = translatedText;
    }
  });

  document.documentElement.lang = state.language;
}


/* ----------------------------------------------------------
   LOCATION FROM QR-CODE URL
---------------------------------------------------------- */

function getAreaFromUrl() {
  const parameters = new URLSearchParams(window.location.search);
  const area = parameters.get("area");

  if (!area) {
    return null;
  }

  return area.trim().toLowerCase();
}

function getLocationObject() {
  if (
    state.areaKey &&
    Object.prototype.hasOwnProperty.call(
      CONFIG.locations,
      state.areaKey
    )
  ) {
    return CONFIG.locations[state.areaKey];
  }

  return CONFIG.defaultLocation;
}

function getCurrentLocationName() {
  return (
    state.location[state.language] ||
    state.location.en ||
    CONFIG.hotelName
  );
}

function updateLocationLabels() {
  const currentLocation = getCurrentLocationName();

  locationName.textContent = currentLocation;
  modalLocationName.textContent = currentLocation;
  successLocationName.textContent = currentLocation;
}


/* ----------------------------------------------------------
   OPENING HOURS
---------------------------------------------------------- */

function getViennaTimeParts() {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: CONFIG.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(new Date());

  const hourPart = parts.find(function (part) {
    return part.type === "hour";
  });

  const minutePart = parts.find(function (part) {
    return part.type === "minute";
  });

  return {
    hour: Number(hourPart.value),
    minute: Number(minutePart.value)
  };
}

function isServiceOpen() {
  const currentTime = getViennaTimeParts();

  const currentMinutes =
    currentTime.hour * 60 + currentTime.minute;

  const openingMinutes =
    CONFIG.openingHour * 60 + CONFIG.openingMinute;

  const closingMinutes =
    CONFIG.closingHour * 60 + CONFIG.closingMinute;

  return (
    currentMinutes >= openingMinutes &&
    currentMinutes < closingMinutes
  );
}

function updateOpeningStatus() {
  const open = isServiceOpen();

  openingStatus.classList.toggle("open", open);
  openingStatus.classList.toggle("closed", !open);

  const statusText = openingStatus.querySelector(".status-text");

  statusText.textContent = open
    ? translations[state.language].currentlyOpen
    : translations[state.language].currentlyClosedShort;

  serviceButton.disabled = !open;
  towelsButton.disabled = !open;

  closedPanel.classList.toggle("hidden", open);

  const hoursText = formatOpeningHoursText();
  const closedHoursElement = closedPanel.querySelector(
    '[data-i18n="openingHoursMessage"]'
  );

  if (closedHoursElement) {
    closedHoursElement.textContent = hoursText;
  }
}


/* ----------------------------------------------------------
   REMOTE SETTINGS, CATEGORIES AND WEATHER
---------------------------------------------------------- */

async function loadSettingsFromGoogleSheets() {
  if (!CONFIG.settingsApiUrl) {
    return;
  }

  try {
    const response = await fetch(CONFIG.settingsApiUrl, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(
        "Settings server returned status " + response.status
      );
    }

    const result = await response.json();

    if (
      result.success !== true ||
      !result.settings ||
      typeof result.settings !== "object"
    ) {
      throw new Error(
        result.message || "Invalid settings response."
      );
    }

    state.settings = result.settings;

    applyOpeningHoursFromSettings();

  } catch (error) {
    console.error(
      "Google Sheets settings could not be loaded:",
      error
    );
  }
}

async function loadCategoriesFromGoogleSheets() {
  if (!CONFIG.categoriesApiUrl) {
    return;
  }

  try {
    const response = await fetch(CONFIG.categoriesApiUrl, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(
        "Categories server returned status " + response.status
      );
    }

    const result = await response.json();

    if (
      result.success !== true ||
      !Array.isArray(result.categories)
    ) {
      throw new Error(
        result.message || "Invalid categories response."
      );
    }

    if (result.categories.length > 0) {
      MENU.categories = result.categories;
    }

  } catch (error) {
    console.error(
      "Google Sheets categories could not be loaded:",
      error
    );
  }
}

function applyOpeningHoursFromSettings() {
  const openingValue = getSettingValue("Opening Time", "en");
  const closingValue = getSettingValue("Closing Time", "en");

  const opening = parseTimeValue(openingValue);
  const closing = parseTimeValue(closingValue);

  if (opening) {
    CONFIG.openingHour = opening.hour;
    CONFIG.openingMinute = opening.minute;
  }

  if (closing) {
    CONFIG.closingHour = closing.hour;
    CONFIG.closingMinute = closing.minute;
  }
}

function parseTimeValue(value) {
  const match = String(value || "")
    .trim()
    .match(/^(\d{1,2}):(\d{2})$/);

  if (!match) {
    return null;
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return null;
  }

  return {
    hour: hour,
    minute: minute
  };
}

function getSetting(settingName) {
  return state.settings[settingName] || null;
}

function getSettingValue(settingName, language) {
  const setting = getSetting(settingName);

  if (!setting) {
    return "";
  }

  return (
    setting[language] ||
    setting.en ||
    setting.de ||
    ""
  );
}

function isSettingEnabled(settingName, fallbackValue) {
  const setting = getSetting(settingName);

  if (!setting) {
    return fallbackValue;
  }

  return setting.active === true;
}

function formatTime(hour, minute) {
  return (
    String(hour).padStart(2, "0") +
    ":" +
    String(minute).padStart(2, "0")
  );
}

function formatOpeningHoursText() {
  const opening = formatTime(
    CONFIG.openingHour,
    CONFIG.openingMinute
  );

  const closing = formatTime(
    CONFIG.closingHour,
    CONFIG.closingMinute
  );

  if (state.language === "de") {
    return (
      "Unsere Öffnungszeiten sind von " +
      opening +
      " bis " +
      closing +
      " Uhr."
    );
  }

  return (
    "Our opening hours are from " +
    opening +
    " to " +
    closing +
    "."
  );
}

function renderAnnouncement() {
  if (!announcementCard) {
    return;
  }

  const titleSetting = getSetting("Announcement Title");
  const textSetting = getSetting("Announcement Text");

  const isActive =
    Boolean(titleSetting && titleSetting.active) &&
    Boolean(textSetting && textSetting.active);

  const title = getSettingValue(
    "Announcement Title",
    state.language
  );

  const text = getSettingValue(
    "Announcement Text",
    state.language
  );

  if (!isActive || (!title && !text)) {
    announcementCard.classList.add("hidden");
    updateGuestInformationVisibility();
    return;
  }

  announcementLabel.textContent =
    translations[state.language].announcementLabel;

  announcementTitle.textContent = title;
  announcementText.textContent = text;

  announcementCard.classList.remove("hidden");
  updateGuestInformationVisibility();
}

function updateWeatherVisibility() {
  if (!weatherCard) {
    return;
  }

  const showWeather = isSettingEnabled(
    "Weather Widget",
    true
  );

  weatherCard.classList.toggle("hidden", !showWeather);

  if (weatherUv) {
    weatherUv.classList.toggle(
      "hidden",
      !isSettingEnabled("UV Widget", true)
    );
  }

  updateGuestInformationVisibility();
}

function updateGuestInformationVisibility() {
  if (!guestInformation) {
    return;
  }

  const hasVisibleCard =
    !announcementCard.classList.contains("hidden") ||
    !weatherCard.classList.contains("hidden");

  guestInformation.classList.toggle(
    "hidden",
    !hasVisibleCard
  );
}

async function loadWeather() {
  if (
    !weatherCard ||
    !isSettingEnabled("Weather Widget", true)
  ) {
    return;
  }

  try {
    const response = await fetch(
      CONFIG.weatherApiUrl,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        "Weather server returned status " + response.status
      );
    }

    const result = await response.json();
    const current = result.current || {};
    const hourly = result.hourly || {};
    const daily = result.daily || {};

    const currentTime = String(current.time || "");
    const sunrise = Array.isArray(daily.sunrise)
      ? String(daily.sunrise[0] || "")
      : "";
    const sunset = Array.isArray(daily.sunset)
      ? String(daily.sunset[0] || "")
      : "";

    const isDaylight = isTimeBetween(
      currentTime,
      sunrise,
      sunset
    );

    let uvIndex = getCurrentHourlyUv(
      hourly,
      currentTime
    );

    // Open-Meteo can return a daytime UV forecast value near the
    // edges of the day. Once the sun is below the horizon, the
    // guest-facing value must always be zero.
    if (!isDaylight) {
      uvIndex = 0;
    }

    state.weather = {
      temperature:
        typeof current.temperature_2m === "number"
          ? current.temperature_2m
          : null,

      apparentTemperature:
        typeof current.apparent_temperature === "number"
          ? current.apparent_temperature
          : null,

      humidity:
        typeof current.relative_humidity_2m === "number"
          ? current.relative_humidity_2m
          : null,

      windSpeed:
        typeof current.wind_speed_10m === "number"
          ? current.wind_speed_10m
          : null,

      weatherCode:
        typeof current.weather_code === "number"
          ? current.weather_code
          : null,

      uvIndex: uvIndex,
      sunrise: sunrise,
      sunset: sunset,
      currentTime: currentTime,
      isDaylight: isDaylight,
      loadedAt: new Date()
    };

    updateWeatherDisplay();

  } catch (error) {
    console.error("Weather could not be loaded:", error);

    state.weather = null;
    updateWeatherDisplay();
  }
}

function getCurrentHourlyUv(hourly, currentTime) {
  if (
    !hourly ||
    !Array.isArray(hourly.time) ||
    !Array.isArray(hourly.uv_index) ||
    hourly.time.length === 0
  ) {
    return null;
  }

  const targetTimestamp = Date.parse(currentTime);

  if (Number.isNaN(targetTimestamp)) {
    return null;
  }

  let closestIndex = -1;
  let closestDifference = Infinity;

  hourly.time.forEach(function (timeValue, index) {
    const timestamp = Date.parse(timeValue);

    if (Number.isNaN(timestamp)) {
      return;
    }

    const difference = Math.abs(
      timestamp - targetTimestamp
    );

    if (difference < closestDifference) {
      closestDifference = difference;
      closestIndex = index;
    }
  });

  if (closestIndex < 0) {
    return null;
  }

  const value = hourly.uv_index[closestIndex];

  return typeof value === "number"
    ? value
    : null;
}

function isTimeBetween(currentTime, startTime, endTime) {
  const current = Date.parse(currentTime);
  const start = Date.parse(startTime);
  const end = Date.parse(endTime);

  if (
    Number.isNaN(current) ||
    Number.isNaN(start) ||
    Number.isNaN(end)
  ) {
    return false;
  }

  return current >= start && current < end;
}

function updateWeatherDisplay() {
  if (!weatherCard) {
    return;
  }

  const language = state.language;
  const text = translations[language];

  weatherLabel.textContent = text.weatherLabel;

  if (!state.weather) {
    weatherCondition.textContent = text.weatherUnavailable;
    weatherTemperature.textContent = "–";
    setWeatherText(weatherFeelsLike, "–");
    setWeatherText(weatherHumidity, "–");
    setWeatherText(weatherWind, "–");
    setWeatherText(weatherSunrise, "–");
    setWeatherText(weatherSunset, "–");
    setWeatherText(weatherUpdated, "–");
    weatherUvValue.textContent = "–";
    setWeatherText(weatherUvNote, "");
    weatherIcon.textContent = "○";
    return;
  }

  const weatherDetails = getWeatherCodeDetails(
    state.weather.weatherCode,
    language
  );

  weatherCondition.textContent = weatherDetails.label;
  weatherIcon.textContent = weatherDetails.icon;

  weatherTemperature.textContent =
    state.weather.temperature === null
      ? "–"
      : Math.round(state.weather.temperature) + "°C";

  setWeatherText(
    weatherFeelsLike,
    state.weather.apparentTemperature === null
      ? "–"
      : text.feelsLikeLabel + " " +
        Math.round(state.weather.apparentTemperature) + "°C"
  );

  setWeatherText(
    weatherHumidity,
    state.weather.humidity === null
      ? "–"
      : Math.round(state.weather.humidity) + "%"
  );

  setWeatherText(
    weatherWind,
    state.weather.windSpeed === null
      ? "–"
      : Math.round(state.weather.windSpeed) + " km/h"
  );

  setWeatherText(
    weatherSunrise,
    formatWeatherTime(state.weather.sunrise)
  );

  setWeatherText(
    weatherSunset,
    formatWeatherTime(state.weather.sunset)
  );

  setWeatherText(
    weatherUpdated,
    formatUpdateTime(state.weather.loadedAt)
  );

  weatherUvValue.textContent =
    state.weather.uvIndex === null
      ? "–"
      : formatUvIndex(state.weather.uvIndex);

  setWeatherText(
    weatherUvNote,
    state.weather.isDaylight
      ? ""
      : text.uvAfterSunset
  );
}

function setWeatherText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function formatWeatherTime(value) {
  const match = String(value || "").match(/T(\d{2}:\d{2})/);
  return match ? match[1] : "–";
}

function formatUpdateTime(dateValue) {
  if (!(dateValue instanceof Date)) {
    return "–";
  }

  return new Intl.DateTimeFormat(
    state.language === "de" ? "de-AT" : "en-GB",
    {
      timeZone: CONFIG.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }
  ).format(dateValue);
}

function formatUvIndex(value) {
  const roundedValue = Math.max(
    0,
    Math.round(value * 10) / 10
  );
  const level = getUvLevel(roundedValue, state.language);

  return roundedValue.toFixed(1) + " · " + level;
}

function getUvLevel(value, language) {
  const labels = language === "de"
    ? ["Niedrig", "Mäßig", "Hoch", "Sehr hoch", "Extrem"]
    : ["Low", "Moderate", "High", "Very high", "Extreme"];

  if (value < 3) {
    return labels[0];
  }

  if (value < 6) {
    return labels[1];
  }

  if (value < 8) {
    return labels[2];
  }

  if (value < 11) {
    return labels[3];
  }

  return labels[4];
}

function getWeatherCodeDetails(code, language) {
  const descriptions = {
    0: {
      en: "Clear sky",
      de: "Klarer Himmel",
      icon: "☀"
    },
    1: {
      en: "Mainly clear",
      de: "Überwiegend klar",
      icon: "☀"
    },
    2: {
      en: "Partly cloudy",
      de: "Teilweise bewölkt",
      icon: "◐"
    },
    3: {
      en: "Overcast",
      de: "Bedeckt",
      icon: "☁"
    },
    45: {
      en: "Fog",
      de: "Nebel",
      icon: "≋"
    },
    48: {
      en: "Rime fog",
      de: "Raureifnebel",
      icon: "≋"
    },
    51: {
      en: "Light drizzle",
      de: "Leichter Nieselregen",
      icon: "☂"
    },
    53: {
      en: "Drizzle",
      de: "Nieselregen",
      icon: "☂"
    },
    55: {
      en: "Heavy drizzle",
      de: "Starker Nieselregen",
      icon: "☂"
    },
    61: {
      en: "Light rain",
      de: "Leichter Regen",
      icon: "☂"
    },
    63: {
      en: "Rain",
      de: "Regen",
      icon: "☂"
    },
    65: {
      en: "Heavy rain",
      de: "Starker Regen",
      icon: "☂"
    },
    71: {
      en: "Light snow",
      de: "Leichter Schneefall",
      icon: "✦"
    },
    73: {
      en: "Snow",
      de: "Schneefall",
      icon: "✦"
    },
    75: {
      en: "Heavy snow",
      de: "Starker Schneefall",
      icon: "✦"
    },
    80: {
      en: "Light showers",
      de: "Leichte Schauer",
      icon: "☂"
    },
    81: {
      en: "Showers",
      de: "Schauer",
      icon: "☂"
    },
    82: {
      en: "Heavy showers",
      de: "Starke Schauer",
      icon: "☂"
    },
    95: {
      en: "Thunderstorm",
      de: "Gewitter",
      icon: "ϟ"
    },
    96: {
      en: "Thunderstorm with hail",
      de: "Gewitter mit Hagel",
      icon: "ϟ"
    },
    99: {
      en: "Heavy thunderstorm",
      de: "Starkes Gewitter",
      icon: "ϟ"
    }
  };

  const details = descriptions[code] || {
    en: "Current weather",
    de: "Aktuelles Wetter",
    icon: "○"
  };

  return {
    label: details[language] || details.en,
    icon: details.icon
  };
}


/* ----------------------------------------------------------
   PREMIUM ANIMATIONS
---------------------------------------------------------- */

function initializePremiumAnimations() {
  const animatedElements = document.querySelectorAll(
    ".guest-info-card, .section-heading, .menu-category, .menu-footer"
  );

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach(function (element) {
      element.classList.add("revealed");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("revealed");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08
    }
  );

  animatedElements.forEach(function (element) {
    observer.observe(element);
  });
}

/* ----------------------------------------------------------
   MENU RENDERING
---------------------------------------------------------- */
/* ----------------------------------------------------------
   LOAD MENU FROM GOOGLE SHEETS
---------------------------------------------------------- */

async function loadMenuFromGoogleSheets() {
  if (!CONFIG.menuApiUrl) {
    console.warn(
      "No menu API URL configured. Using local menu data."
    );

    return;
  }

  try {
    const response = await fetch(
      CONFIG.menuApiUrl,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(
        "Menu server returned status " + response.status
      );
    }

    const result = await response.json();

    if (
      result.success !== true ||
      !Array.isArray(result.items)
    ) {
      throw new Error(
        result.message || "Invalid menu response."
      );
    }

    MENU = {
      categories: MENU.categories,
      items: result.items
    };

    console.log(
      "Menu loaded from Google Sheets:",
      result.items.length,
      "products"
    );

  } catch (error) {
    console.error(
      "Google Sheets menu could not be loaded:",
      error
    );

    console.warn(
      "The local menu-data.js file will be used instead."
    );
  }
}
function renderMenu() {
  menuNavigation.innerHTML = "";
  menuContent.innerHTML = "";

  MENU.categories.forEach(function (category, categoryIndex) {
    const categoryItems = MENU.items.filter(function (item) {
      return item.category === category.id;
    });

    createMenuNavigationButton(
      category,
      categoryIndex === 0
    );

    createMenuCategory(category, categoryItems);
  });

  activateMenuNavigationTracking();
}

function createMenuNavigationButton(category, active) {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "menu-category-button";
  button.textContent =
    category.name[state.language] || category.name.en;

  if (active) {
    button.classList.add("active");
  }

  button.dataset.categoryTarget = category.id;

  button.addEventListener("click", function () {
    const section = document.getElementById(
      "category-" + category.id
    );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });

  menuNavigation.appendChild(button);
}

function createMenuCategory(category, items) {
  const section = document.createElement("section");

  section.className = "menu-category";
  section.id = "category-" + category.id;

  const header = document.createElement("div");
  header.className = "menu-category-header";

  const title = document.createElement("h3");
  title.className = "menu-category-title";
  title.textContent =
    category.name[state.language] || category.name.en;

  const number = document.createElement("span");
  number.className = "menu-category-number";
  number.textContent = String(items.length).padStart(2, "0");

  header.appendChild(title);
  header.appendChild(number);

  const itemsContainer = document.createElement("div");
  itemsContainer.className = "menu-items";

  if (items.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.className = "menu-item-description";
    emptyMessage.textContent =
      translations[state.language].emptyCategory;

    itemsContainer.appendChild(emptyMessage);
  } else {
    items.forEach(function (item) {
      itemsContainer.appendChild(createMenuItem(item));
    });
  }

  section.appendChild(header);
  section.appendChild(itemsContainer);

  menuContent.appendChild(section);
}

function createMenuItem(item) {
  const article = document.createElement("article");
  article.className = "menu-item";

  const main = document.createElement("div");
  main.className = "menu-item-main";

  const name = document.createElement("h4");
  name.className = "menu-item-name";
  name.textContent =
    item.name[state.language] || item.name.en;

  main.appendChild(name);

  const descriptionText =
    item.description[state.language] ||
    item.description.en ||
    "";

  if (descriptionText) {
    const description = document.createElement("p");

    description.className = "menu-item-description";
    description.textContent = descriptionText;

    main.appendChild(description);
  }

  const volumeText =
    item.volume[state.language] ||
    item.volume.en ||
    "";

  if (volumeText) {
    const volume = document.createElement("p");

    volume.className = "menu-item-volume";
    volume.textContent = volumeText;

    main.appendChild(volume);
  }

  const price = document.createElement("div");
  price.className = "menu-item-price";
  price.textContent = formatPrice(item.price);

  article.appendChild(main);
  article.appendChild(price);

  return article;
}

function formatPrice(price) {
  if (price === undefined || price === null || price === "") {
    return "";
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return String(price);
  }

  if (Number.isInteger(numericPrice)) {
    return String(numericPrice);
  }

  return numericPrice
    .toFixed(1)
    .replace(".", state.language === "de" ? "," : ".");
}

function activateMenuNavigationTracking() {
  const sections = document.querySelectorAll(".menu-category");

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        const categoryId = entry.target.id.replace(
          "category-",
          ""
        );

        document
          .querySelectorAll(".menu-category-button")
          .forEach(function (button) {
            button.classList.toggle(
              "active",
              button.dataset.categoryTarget === categoryId
            );
          });
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}


/* ----------------------------------------------------------
   REQUEST MODAL
---------------------------------------------------------- */

function openRequestModal(requestType) {
  if (!isServiceOpen()) {
    showToast(
      translations[state.language].currentlyClosed,
      "error"
    );

    return;
  }

  state.selectedRequestType = requestType;

  if (requestType === "service") {
    modalIcon.textContent = "◌";
    modalTitle.textContent =
      translations[state.language].serviceModalTitle;
    modalText.textContent =
      translations[state.language].serviceModalText;
  } else {
    modalIcon.textContent = "▱";
    modalTitle.textContent =
      translations[state.language].towelsModalTitle;
    modalText.textContent =
      translations[state.language].towelsModalText;
  }

  modalLocationName.textContent = getCurrentLocationName();

  requestModal.classList.add("active");
  requestModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  window.setTimeout(function () {
    confirmRequestButton.focus();
  }, 150);
}

function closeRequestModal() {
  requestModal.classList.remove("active");
  requestModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}


/* ----------------------------------------------------------
   REQUEST SENDING
---------------------------------------------------------- */

async function confirmSelectedRequest() {
  if (!state.selectedRequestType) {
    return;
  }

  closeRequestModal();
  showLoading();

  const payload = createRequestPayload(
    state.selectedRequestType,
    false
  );

  try {
    await sendRequest(payload);

    state.lastRequestType = state.selectedRequestType;
    state.lastRequestTime = Date.now();

    hideLoading();
    showSuccessOverlay();
    startReminderTimer();

    if (CONFIG.demoMode) {
      showToast(
        translations[state.language].demoRequestSent,
        "success"
      );
    }
  } catch (error) {
    console.error("Request error:", error);

    hideLoading();

    showToast(
      translations[state.language].requestError,
      "error"
    );
  } finally {
    state.selectedRequestType = null;
  }
}

function createRequestPayload(requestType, reminder) {
  return {
    requestType: requestType,
    reminder: reminder,
    areaKey: state.areaKey || "unknown",
    location: getCurrentLocationName(),
    language: state.language,
    timestamp: new Date().toISOString(),
    source: "Mountain Health Bar Website"
  };
}

async function sendRequest(payload) {
  if (CONFIG.demoMode) {
    console.log("Demo request:", payload);

    await wait(850);

    return {
      success: true,
      demo: true
    };
  }

  if (!CONFIG.webAppUrl) {
    throw new Error("Google Apps Script URL is missing.");
  }

  const response = await fetch(CONFIG.webAppUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(
      "Server returned status " + response.status
    );
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(
      result.message || "Request was not accepted."
    );
  }

  return result;
}


/* ----------------------------------------------------------
   SUCCESS SCREEN
---------------------------------------------------------- */

function showSuccessOverlay() {
  successLocationName.textContent = getCurrentLocationName();

  reminderButton.classList.add("hidden");

  successOverlay.classList.add("active");
  successOverlay.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
}

function closeSuccessOverlay() {
  successOverlay.classList.remove("active");
  successOverlay.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}


/* ----------------------------------------------------------
   REMINDER
---------------------------------------------------------- */

function startReminderTimer() {
  window.clearTimeout(state.reminderTimer);

  reminderButton.classList.add("hidden");

  state.reminderTimer = window.setTimeout(function () {
    reminderButton.classList.remove("hidden");
  }, CONFIG.reminderDelayMilliseconds);
}

async function sendReminder() {
  if (!state.lastRequestType) {
    return;
  }

  reminderButton.disabled = true;
  showLoading();

  const payload = createRequestPayload(
    state.lastRequestType,
    true
  );

  try {
    await sendRequest(payload);

    hideLoading();

    reminderButton.classList.add("hidden");

    showToast(
      translations[state.language].reminderSent,
      "success"
    );
  } catch (error) {
    console.error("Reminder error:", error);

    hideLoading();

    showToast(
      translations[state.language].requestError,
      "error"
    );
  } finally {
    reminderButton.disabled = false;
  }
}


/* ----------------------------------------------------------
   LOADING
---------------------------------------------------------- */

function showLoading() {
  loadingOverlay.classList.remove("hidden");
  loadingOverlay.setAttribute("aria-hidden", "false");
}

function hideLoading() {
  loadingOverlay.classList.add("hidden");
  loadingOverlay.setAttribute("aria-hidden", "true");
}


/* ----------------------------------------------------------
   TOAST
---------------------------------------------------------- */

function showToast(message, type) {
  window.clearTimeout(state.toastTimer);

  toast.textContent = message;

  toast.classList.remove("success", "error");

  if (type) {
    toast.classList.add(type);
  }

  toast.classList.add("show");

  state.toastTimer = window.setTimeout(function () {
    toast.classList.remove("show");
  }, 3500);
}


/* ----------------------------------------------------------
   UTILITIES
---------------------------------------------------------- */

function wait(milliseconds) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, milliseconds);
  });
}

