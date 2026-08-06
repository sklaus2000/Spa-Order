/* ==========================================================
   Mountain Health Bar
   Pool Service Backend
   Version 1.0
========================================================== */

"use strict";


/* ----------------------------------------------------------
   GENERAL CONFIGURATION
---------------------------------------------------------- */

const SETTINGS = {
  sheetName: "Requests",

  timeZone: "Europe/Vienna",

  serviceChatIdProperty: "SERVICE_CHAT_ID",
  spaChatIdProperty: "SPA_CHAT_ID",
  telegramTokenProperty: "TELEGRAM_BOT_TOKEN",

  requestCounterProperty: "REQUEST_COUNTER",

  validRequestTypes: [
    "service",
    "towels"
  ],

  validAreas: {
    "indoor-pool": "Indoor Pool",

    "outdoor-pool-mountain-side":
      "Outdoor Pool Mountain Side",

    "outdoor-pool-garden-side":
      "Outdoor Pool Garden Side",

    "outdoor-pool-restaurant-side":
      "Outdoor Pool Restaurant Side",

    "mountain-health-bar-indoor-area":
      "Mountain Health Bar Indoor Area",

    "pool-terrace":
      "Pool Terrace"
  }
};


/* ----------------------------------------------------------
   WEB APP ENTRY POINTS
---------------------------------------------------------- */

/**
 * Opens a small status response when the web-app URL
 * is visited directly in a browser.
 */
function doGet(e) {
  const parameters =
    e && e.parameter
      ? e.parameter
      : {};

  if (parameters.action === "menu") {
    return safelyCreatePublicResponse(
      getPublicMenuData,
      "The menu could not be loaded."
    );
  }

  if (parameters.action === "categories") {
    return safelyCreatePublicResponse(
      getPublicCategoriesData,
      "The categories could not be loaded."
    );
  }

  if (parameters.action === "settings") {
    return safelyCreatePublicResponse(
      getPublicSettingsData,
      "The settings could not be loaded."
    );
  }

  if (parameters.page === "admin") {
    const properties =
      PropertiesService.getScriptProperties();

    const correctKey =
      properties.getProperty("ADMIN_ACCESS_KEY");

    if (
      !correctKey ||
      parameters.key !== correctKey
    ) {
      return HtmlService
        .createHtmlOutput(
          "<h2>Access denied</h2>" +
          "<p>The admin access key is invalid.</p>"
        )
        .setTitle("Access denied");
    }

    const template =
      HtmlService.createTemplateFromFile("Admin");

    return template
      .evaluate()
      .setTitle("Mountain Health Bar Admin")
      .setXFrameOptionsMode(
        HtmlService.XFrameOptionsMode.ALLOWALL
      );
  }

  return createJsonResponse({
    success: true,
    application: "Mountain Health Bar Backend",
    version: "2.1",
    status: "online"
  });
}

function safelyCreatePublicResponse(
  dataFunction,
  fallbackMessage
) {
  try {
    return createJsonResponse(
      dataFunction()
    );
  } catch (error) {
    console.error(error);

    return createJsonResponse({
      success: false,
      message:
        error.message ||
        fallbackMessage
    });
  }
}

/**
 * Receives requests from the Mountain Health Bar website.
 */
function doPost(e) {
  try {
    const payload = parseRequestPayload(e);

    validateRequestPayload(payload);

    const requestId = getNextRequestId();
    const requestData = createRequestData(payload, requestId);

    const telegramResult = sendTelegramNotification(requestData);

    saveRequestToSheet(
      requestData,
      telegramResult.groupName,
      "Sent"
    );

    return createJsonResponse({
      success: true,
      requestId: requestData.requestId,
      message: "Request processed successfully."
    });

  } catch (error) {
    console.error(error);

    saveErrorToSheet(error, e);

    return createJsonResponse({
      success: false,
      message: error.message || "Unknown backend error."
    });
  }
}


/* ----------------------------------------------------------
   REQUEST PARSING
---------------------------------------------------------- */

function parseRequestPayload(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("No request data was received.");
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error("The request data is not valid JSON.");
  }
}


/* ----------------------------------------------------------
   VALIDATION
---------------------------------------------------------- */

function validateRequestPayload(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("The request payload is invalid.");
  }

  if (!SETTINGS.validRequestTypes.includes(payload.requestType)) {
    throw new Error("Invalid request type.");
  }

  if (!payload.areaKey) {
    throw new Error("The area key is missing.");
  }

  if (!SETTINGS.validAreas[payload.areaKey]) {
    throw new Error("Unknown pool area.");
  }

  if (
    payload.language !== "en" &&
    payload.language !== "de"
  ) {
    throw new Error("Invalid language.");
  }

  if (
    typeof payload.reminder !== "boolean"
  ) {
    throw new Error("Invalid reminder value.");
  }
}


/* ----------------------------------------------------------
   REQUEST DATA
---------------------------------------------------------- */

function createRequestData(payload, requestId) {
  const timestamp = new Date();

  return {
    requestId: requestId,

    requestType: payload.requestType,

    reminder: payload.reminder,

    areaKey: payload.areaKey,

    location:
      SETTINGS.validAreas[payload.areaKey],

    language: payload.language,

    timestamp: timestamp,

    formattedDate: Utilities.formatDate(
      timestamp,
      SETTINGS.timeZone,
      "dd.MM.yyyy"
    ),

    formattedTime: Utilities.formatDate(
      timestamp,
      SETTINGS.timeZone,
      "HH:mm:ss"
    ),

    source:
      payload.source ||
      "Mountain Health Bar Website"
  };
}


/* ----------------------------------------------------------
   REQUEST ID
---------------------------------------------------------- */

function getNextRequestId() {
  const lock = LockService.getScriptLock();

  lock.waitLock(10000);

  try {
    const properties =
      PropertiesService.getScriptProperties();

    const currentCounter = Number(
      properties.getProperty(
        SETTINGS.requestCounterProperty
      ) || "0"
    );

    const nextCounter = currentCounter + 1;

    properties.setProperty(
      SETTINGS.requestCounterProperty,
      String(nextCounter)
    );

    return "MHB-" + String(nextCounter).padStart(4, "0");

  } finally {
    lock.releaseLock();
  }
}


/* ----------------------------------------------------------
   TELEGRAM
---------------------------------------------------------- */

function sendTelegramNotification(requestData) {
  const properties =
    PropertiesService.getScriptProperties();

  const token = properties.getProperty(
    SETTINGS.telegramTokenProperty
  );

  if (!token) {
    throw new Error(
      "The Telegram bot token is missing."
    );
  }

  let chatId;
  let groupName;

  if (requestData.requestType === "service") {
    chatId = properties.getProperty(
      SETTINGS.serviceChatIdProperty
    );

    groupName = "Service Team";
  } else {
    chatId = properties.getProperty(
      SETTINGS.spaChatIdProperty
    );

    groupName = "Spa Team";
  }

  if (!chatId) {
    throw new Error(
      "The Telegram chat ID is missing."
    );
  }

  const message =
    buildTelegramMessage(requestData);

  const telegramUrl =
    "https://api.telegram.org/bot" +
    token +
    "/sendMessage";

  const telegramPayload = {
    chat_id: chatId,
    text: message,
    parse_mode: "HTML",
    disable_web_page_preview: true
  };

  const response = UrlFetchApp.fetch(
    telegramUrl,
    {
      method: "post",

      contentType: "application/json",

      payload: JSON.stringify(
        telegramPayload
      ),

      muteHttpExceptions: true
    }
  );

  const responseCode =
    response.getResponseCode();

  const responseText =
    response.getContentText();

  let responseData;

  try {
    responseData = JSON.parse(responseText);
  } catch (error) {
    throw new Error(
      "Telegram returned an invalid response."
    );
  }

  if (
    responseCode < 200 ||
    responseCode >= 300 ||
    responseData.ok !== true
  ) {
    throw new Error(
      "Telegram error: " +
      (
        responseData.description ||
        responseText
      )
    );
  }

  return {
    success: true,
    groupName: groupName
  };
}


/* ----------------------------------------------------------
   TELEGRAM MESSAGE DESIGN
---------------------------------------------------------- */

function buildTelegramMessage(requestData) {
  const isReminder = requestData.reminder === true;
  const isService =
    requestData.requestType === "service";

  const headline = isReminder
    ? "⚠️ <b>SERVICE REMINDER</b>"
    : isService
      ? "🔔 <b>NEW SERVICE REQUEST</b>"
      : "🧺 <b>NEW TOWEL REQUEST</b>";

  const requestLabel = isService
    ? "Call for Service"
    : "Fresh Towels";

  const reminderText = isReminder
    ? "\n\n<b>The guest is still waiting.</b>"
    : "";

  return [
    headline,
    "",
    "<b>Request ID</b>",
    escapeTelegramHtml(requestData.requestId),
    "",
    "<b>Location</b>",
    escapeTelegramHtml(requestData.location),
    "",
    "<b>Request</b>",
    escapeTelegramHtml(requestLabel),
    "",
    "<b>Time</b>",
    escapeTelegramHtml(requestData.formattedTime),
    "",
    "<b>Date</b>",
    escapeTelegramHtml(requestData.formattedDate),
    reminderText
  ].join("\n");
}


/* ----------------------------------------------------------
   GOOGLE SHEET
---------------------------------------------------------- */

function saveRequestToSheet(
  requestData,
  telegramGroup,
  status
) {
  const sheet = getRequestSheet();

  ensureSheetHeaders(sheet);

  sheet.appendRow([
    requestData.timestamp,
    getRequestTypeLabel(
      requestData.requestType
    ),
    requestData.reminder ? "Yes" : "No",
    requestData.location,
    requestData.areaKey,
    requestData.language.toUpperCase(),
    telegramGroup,
    status,
    requestData.requestId
  ]);
}


/**
 * Stores backend errors in the same sheet so that
 * technical issues can be checked later.
 */
function saveErrorToSheet(error, eventObject) {
  try {
    const sheet = getRequestSheet();

    ensureSheetHeaders(sheet);

    const rawRequest =
      eventObject &&
      eventObject.postData &&
      eventObject.postData.contents
        ? eventObject.postData.contents
        : "";

    sheet.appendRow([
      new Date(),
      "Backend Error",
      "",
      "",
      "",
      "",
      "",
      error.message || String(error),
      rawRequest
    ]);

  } catch (sheetError) {
    console.error(
      "The backend error could not be logged:",
      sheetError
    );
  }
}


function getRequestSheet() {
  const spreadsheet =
    SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error(
      "The connected Google Sheet could not be found."
    );
  }

  let sheet =
    spreadsheet.getSheetByName(
      SETTINGS.sheetName
    );

  if (!sheet) {
    sheet = spreadsheet.insertSheet(
      SETTINGS.sheetName
    );
  }

  return sheet;
}


function ensureSheetHeaders(sheet) {
  const expectedHeaders = [
    "Timestamp",
    "Request Type",
    "Reminder",
    "Location",
    "Area Key",
    "Language",
    "Telegram Group",
    "Status",
    "Request ID"
  ];

  const existingHeaders = sheet
    .getRange(1, 1, 1, expectedHeaders.length)
    .getValues()[0];

  const headersAreMissing =
    expectedHeaders.some(function (
      expectedHeader,
      index
    ) {
      return (
        existingHeaders[index] !==
        expectedHeader
      );
    });

  if (!headersAreMissing) {
    return;
  }

  sheet
    .getRange(
      1,
      1,
      1,
      expectedHeaders.length
    )
    .setValues([expectedHeaders]);

  sheet
    .getRange(
      1,
      1,
      1,
      expectedHeaders.length
    )
    .setFontWeight("bold");

  sheet.setFrozenRows(1);

  sheet.autoResizeColumns(
    1,
    expectedHeaders.length
  );
}


/* ----------------------------------------------------------
   LABELS
---------------------------------------------------------- */

function getRequestTypeLabel(requestType) {
  if (requestType === "service") {
    return "Call for Service";
  }

  if (requestType === "towels") {
    return "Fresh Towels";
  }

  return requestType;
}


/* ----------------------------------------------------------
   JSON RESPONSE
---------------------------------------------------------- */

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(
      JSON.stringify(data)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}


/* ----------------------------------------------------------
   SECURITY AND TEXT HELPERS
---------------------------------------------------------- */

function escapeTelegramHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}


/* ----------------------------------------------------------
   MANUAL BACKEND TEST
---------------------------------------------------------- */

/**
 * Run this function manually inside Apps Script
 * to test the Telegram and Sheet connection.
 */
function testServiceRequest() {
  const testPayload = {
    requestType: "service",
    reminder: false,
    areaKey: "outdoor-pool-mountain-side",
    language: "en",
    source: "Manual Apps Script Test"
  };

  const requestId = getNextRequestId();

  const requestData =
    createRequestData(
      testPayload,
      requestId
    );

  const telegramResult =
    sendTelegramNotification(
      requestData
    );

  saveRequestToSheet(
    requestData,
    telegramResult.groupName,
    "Test Sent"
  );

  console.log(
    "Test request sent successfully:",
    requestId
  );
}


/**
 * Run this function manually to test the towel group.
 */
function testTowelRequest() {
  const testPayload = {
    requestType: "towels",
    reminder: false,
    areaKey: "indoor-pool",
    language: "en",
    source: "Manual Apps Script Test"
  };

  const requestId = getNextRequestId();

  const requestData =
    createRequestData(
      testPayload,
      requestId
    );

  const telegramResult =
    sendTelegramNotification(
      requestData
    );

  saveRequestToSheet(
    requestData,
    telegramResult.groupName,
    "Test Sent"
  );

  console.log(
    "Test towel request sent successfully:",
    requestId
  );
}
function admin() {
  return HtmlService
    .createHtmlOutputFromFile("Admin")
    .setTitle("Mountain Health Bar Admin");
}
function getDashboardData() {
  const sheet = getRequestSheet();
  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return {
      todayRequests: 0,
      serviceCalls: 0,
      towelRequests: 0
    };
  }

  const today = Utilities.formatDate(
    new Date(),
    SETTINGS.timeZone,
    "yyyy-MM-dd"
  );

  let todayRequests = 0;
  let serviceCalls = 0;
  let towelRequests = 0;

  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    const row = values[rowIndex];

    const timestamp = row[0];
    const requestType = row[1];
    const status = row[7];

    if (!(timestamp instanceof Date)) {
      continue;
    }

    if (
      requestType === "Backend Error" ||
      status !== "Sent"
    ) {
      continue;
    }

    const rowDate = Utilities.formatDate(
      timestamp,
      SETTINGS.timeZone,
      "yyyy-MM-dd"
    );

    if (rowDate !== today) {
      continue;
    }

    todayRequests++;

    if (requestType === "Call for Service") {
      serviceCalls++;
    }

    if (requestType === "Fresh Towels") {
      towelRequests++;
    }
  }

  return {
    todayRequests: todayRequests,
    serviceCalls: serviceCalls,
    towelRequests: towelRequests
  };
}
/* ----------------------------------------------------------
   PUBLIC MENU DATA
---------------------------------------------------------- */

function getPublicMenuData() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName("Menu");

  if (!sheet) {
    throw new Error('The sheet "Menu" could not be found.');
  }

  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return {
      success: true,
      items: []
    };
  }

  const rows = sheet
    .getRange(2, 1, lastRow - 1, 11)
    .getValues();

  const items = rows
    .filter(function(row) {
      const visibleValue = row[9];

      return (
        visibleValue === true ||
        String(visibleValue).toUpperCase() === "TRUE"
      );
    })
    .map(function(row) {
      return {
        id: String(row[0] || "").trim(),

        category: String(row[1] || "").trim(),

        name: {
          en: String(row[2] || "").trim(),
          de: String(row[3] || "").trim()
        },

        description: {
          en: String(row[4] || "").trim(),
          de: String(row[5] || "").trim()
        },

        volume: {
          en: String(row[6] || "").trim(),
          de: String(row[7] || "").trim()
        },

        price: row[8],

        visible: true,

        sortOrder: Number(row[10]) || 9999
      };
    })
    .filter(function(item) {
      return item.category && (item.name.en || item.name.de);
    })
    .sort(function(firstItem, secondItem) {
      return firstItem.sortOrder - secondItem.sortOrder;
    });

  return {
    success: true,
    items: items
  };
}

/* ==========================================================
   PUBLIC CATEGORIES DATA
========================================================== */

function getPublicCategoriesData() {
  const spreadsheet =
    SpreadsheetApp.getActiveSpreadsheet();

  const sheet =
    spreadsheet.getSheetByName("Categories");

  if (!sheet) {
    throw new Error(
      'The sheet "Categories" could not be found.'
    );
  }

  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return {
      success: true,
      categories: []
    };
  }

  const rows = sheet
    .getRange(2, 1, lastRow - 1, 5)
    .getValues();

  const categories = rows
    .filter(function(row) {
      const visibleValue = row[4];

      return (
        visibleValue === true ||
        String(visibleValue)
          .trim()
          .toUpperCase() === "TRUE"
      );
    })
    .map(function(row) {
      return {
        sortOrder:
          Number(row[0]) || 9999,

        id:
          String(row[1] || "").trim(),

        name: {
          en:
            String(row[2] || "").trim(),

          de:
            String(row[3] || "").trim()
        }
      };
    })
    .filter(function(category) {
      return (
        category.id &&
        (
          category.name.en ||
          category.name.de
        )
      );
    })
    .sort(function(
      firstCategory,
      secondCategory
    ) {
      return (
        firstCategory.sortOrder -
        secondCategory.sortOrder
      );
    });

  return {
    success: true,
    categories: categories
  };
}


/* ==========================================================
   PUBLIC SETTINGS DATA
========================================================== */

function getPublicSettingsData() {
  const spreadsheet =
    SpreadsheetApp.getActiveSpreadsheet();

  const sheet =
    spreadsheet.getSheetByName("Settings");

  if (!sheet) {
    throw new Error(
      'The sheet "Settings" could not be found.'
    );
  }

  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return {
      success: true,
      settings: {}
    };
  }

  const rows = sheet
    .getRange(2, 1, lastRow - 1, 4)
    .getDisplayValues();

  const settings = {};

  rows.forEach(function(row) {
    const key =
      String(row[0] || "").trim();

    if (!key) {
      return;
    }

    settings[key] = {
      en:
        String(row[1] || "").trim(),

      de:
        String(row[2] || "").trim(),

      active:
        String(row[3] || "")
          .trim()
          .toUpperCase() === "TRUE"
    };
  });

  return {
    success: true,
    settings: settings
  };
}
