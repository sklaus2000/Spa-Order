/* ==========================================================
   Mountain Health Bar
   Local Menu Fallback

   The live menu is loaded from Google Sheets.
   This file is used only if the online menu is unavailable.
========================================================== */

window.MENU_DATA = {
  "categories": [
    {
      "id": "softdrinks",
      "name": {
        "en": "Soft Drinks",
        "de": "Softdrinks"
      }
    },
    {
      "id": "whiteWine",
      "name": {
        "en": "White Wine",
        "de": "Weißwein"
      }
    },
    {
      "id": "redWine",
      "name": {
        "en": "Red Wine",
        "de": "Rotwein"
      }
    },
    {
      "id": "beer",
      "name": {
        "en": "Beer",
        "de": "Bier"
      }
    },
    {
      "id": "aperitif",
      "name": {
        "en": "Aperitif",
        "de": "Aperitif"
      }
    },
    {
      "id": "coffeeTea",
      "name": {
        "en": "Coffee & Tea",
        "de": "Kaffee & Tee"
      }
    },
    {
      "id": "food",
      "name": {
        "en": "Food Menu",
        "de": "Speisekarte"
      }
    }
  ],
  "items": [
    {
      "id": "soft-001",
      "category": "softdrinks",
      "name": {
        "en": "Red Bull",
        "de": "Red Bull"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "0.25 l",
        "de": "0,25 l"
      },
      "price": 6,
      "visible": true,
      "sortOrder": 1
    },
    {
      "id": "soft-002",
      "category": "softdrinks",
      "name": {
        "en": "Coca-Cola | Zero",
        "de": "Coca-Cola | Zero"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "0.20 l",
        "de": "0,20 l"
      },
      "price": 5,
      "visible": true,
      "sortOrder": 2
    },
    {
      "id": "soft-003",
      "category": "softdrinks",
      "name": {
        "en": "Fanta | Sprite",
        "de": "Fanta | Sprite"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "0.20 l",
        "de": "0,20 l"
      },
      "price": 5,
      "visible": true,
      "sortOrder": 3
    },
    {
      "id": "soft-004",
      "category": "softdrinks",
      "name": {
        "en": "Almdudler",
        "de": "Almdudler"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "0.35 l",
        "de": "0,35 l"
      },
      "price": 6,
      "visible": true,
      "sortOrder": 4
    },
    {
      "id": "soft-005",
      "category": "softdrinks",
      "name": {
        "en": "Rauch Juices",
        "de": "Säfte von Rauch"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "0.20 l",
        "de": "0,20 l"
      },
      "price": 4.5,
      "visible": true,
      "sortOrder": 5
    },
    {
      "id": "soft-006",
      "category": "softdrinks",
      "name": {
        "en": "Juice Spritzer",
        "de": "Saftschorle"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "0.30 l",
        "de": "0,30 l"
      },
      "price": 4.5,
      "visible": true,
      "sortOrder": 6
    },
    {
      "id": "white-001",
      "category": "whiteWine",
      "name": {
        "en": "Grüner Veltliner “Löss”",
        "de": "Grüner Veltliner „Löss“"
      },
      "description": {
        "en": "Kamptal – Austria",
        "de": "Kamptal – Österreich"
      },
      "volume": {
        "en": "0.125 l",
        "de": "0,125 l"
      },
      "price": 7.5,
      "visible": true,
      "sortOrder": 7
    },
    {
      "id": "white-002",
      "category": "whiteWine",
      "name": {
        "en": "Chardonnay “Sinner”",
        "de": "Chardonnay „Sinner“"
      },
      "description": {
        "en": "Schützen, Burgenland – Austria",
        "de": "Schützen, Burgenland – Österreich"
      },
      "volume": {
        "en": "0.125 l",
        "de": "0,125 l"
      },
      "price": 8.9,
      "visible": true,
      "sortOrder": 8
    },
    {
      "id": "white-003",
      "category": "whiteWine",
      "name": {
        "en": "Riesling “Steilheit”",
        "de": "Riesling „Steilheit“"
      },
      "description": {
        "en": "Senftenberg, Kremstal – Weingut Proidl",
        "de": "Senftenberg, Kremstal – Weingut Proidl"
      },
      "volume": {
        "en": "0.125 l",
        "de": "0,125 l"
      },
      "price": 8.5,
      "visible": true,
      "sortOrder": 9
    },
    {
      "id": "red-001",
      "category": "redWine",
      "name": {
        "en": "Primitivo “di Manduria”",
        "de": "Primitivo „di Manduria“"
      },
      "description": {
        "en": "Cantine San Marzano, San Marzano – Italy",
        "de": "Cantine San Marzano, San Marzano – Italien"
      },
      "volume": {
        "en": "0.125 l",
        "de": "0,125 l"
      },
      "price": 8.2,
      "visible": true,
      "sortOrder": 10
    },
    {
      "id": "beer-001",
      "category": "beer",
      "name": {
        "en": "Trumer Pils",
        "de": "Trumer Pils"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "0.33 l",
        "de": "0,33 l"
      },
      "price": 5.5,
      "visible": true,
      "sortOrder": 11
    },
    {
      "id": "beer-002",
      "category": "beer",
      "name": {
        "en": "Tegernseer Hell",
        "de": "Tegernseer Hell"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "0.33 l",
        "de": "0,33 l"
      },
      "price": 6,
      "visible": true,
      "sortOrder": 12
    },
    {
      "id": "beer-003",
      "category": "beer",
      "name": {
        "en": "Radler",
        "de": "Radler"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "0.33 l",
        "de": "0,33 l"
      },
      "price": 3.5,
      "visible": true,
      "sortOrder": 13
    },
    {
      "id": "aperitif-001",
      "category": "aperitif",
      "name": {
        "en": "Aperol Spritz",
        "de": "Aperol Spritz"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 12,
      "visible": true,
      "sortOrder": 14
    },
    {
      "id": "aperitif-002",
      "category": "aperitif",
      "name": {
        "en": "Hugo",
        "de": "Hugo"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 12,
      "visible": true,
      "sortOrder": 15
    },
    {
      "id": "coffee-001",
      "category": "coffeeTea",
      "name": {
        "en": "Espresso",
        "de": "Espresso"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 3.5,
      "visible": true,
      "sortOrder": 16
    },
    {
      "id": "coffee-002",
      "category": "coffeeTea",
      "name": {
        "en": "Double Espresso",
        "de": "Doppelter Espresso"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 4.5,
      "visible": true,
      "sortOrder": 17
    },
    {
      "id": "coffee-003",
      "category": "coffeeTea",
      "name": {
        "en": "Americano",
        "de": "Americano"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 4.9,
      "visible": true,
      "sortOrder": 18
    },
    {
      "id": "coffee-004",
      "category": "coffeeTea",
      "name": {
        "en": "Cappuccino",
        "de": "Cappuccino"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 5,
      "visible": true,
      "sortOrder": 19
    },
    {
      "id": "coffee-005",
      "category": "coffeeTea",
      "name": {
        "en": "Latte Macchiato",
        "de": "Latte Macchiato"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 6,
      "visible": true,
      "sortOrder": 20
    },
    {
      "id": "coffee-006",
      "category": "coffeeTea",
      "name": {
        "en": "Hot Chocolate",
        "de": "Heiße Schokolade"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 5.5,
      "visible": true,
      "sortOrder": 21
    },
    {
      "id": "coffee-007",
      "category": "coffeeTea",
      "name": {
        "en": "Hot Lemon with Honey",
        "de": "Heiße Zitrone mit Honig"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 4.5,
      "visible": true,
      "sortOrder": 22
    },
    {
      "id": "coffee-008",
      "category": "coffeeTea",
      "name": {
        "en": "Ronnefeldt Tea",
        "de": "Ronnefeldt Tee"
      },
      "description": {
        "en": "",
        "de": ""
      },
      "volume": {
        "en": "",
        "de": ""
      },
      "price": 9,
      "visible": true,
      "sortOrder": 23
    }
  ]
};
