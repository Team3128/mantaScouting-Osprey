let autoSettingsCopy = new Map();
autoSettingsCopy.set("fieldLength", 16.4846); //Full Field: 16.4846
autoSettingsCopy.set("starting", {
    "type": "normal",
    "points" : [
        {
            "label": "Top",
            "x": 1,
            "y": 3,
            "next": "score"
        },
        {
            "label": "Middle",
            "x": 2,
            "y": 3,
            "next": "score"
        },
        {
            "label": "Bottom",
            "x": 3,
            "y": 3,
            "next": "score"
        },
        {
            "label": "Extreme Bottom",
            "x": 4,
            "y": 3,
            "next": "score"
        }
    ]
});
autoSettingsCopy.set("score", {
    "type": "normal",
    "points": [
        {
            "label": "Speaker Score",
            "x": 0,
            "y": 0,
            "next": "pickup"
        },
        {
            "label": "Speaker Miss",
            "x": 2,
            "y": 3,
            "next": "pickup"
        },
        {
            "label": "Amp Score",
            "x": 3,
            "y": 3,
            "next": "pickup"
        },
        {
            "label": "Amp Miss",
            "x": 4,
            "y": 3,
            "next": "pickup"
        }
    ]
});
autoSettingsCopy.set("pickup", {
    "type": "remove",
    "points": [
        {
            "label": "note1.1",
            "x": 1,
            "y": 3,
            "next": "score"
        },
        {
            "label": "note1.2",
            "x": 2,
            "y": 3,
            "next": "score"
        },
        {
            "label": "note1.3",
            "x": 3,
            "y": 3,
            "next": "score"
        },
        {
            "label": "note2.1",
            "x": 1,
            "y": 4,
            "next": "score"
        },
        {
            "label": "note2.2",
            "x": 2,
            "y": 5,
            "next": "score"
        },
        {
            "label": "note2.3",
            "x": 3,
            "y": 6,
            "next": "score"
        },
        {
            "label": "note2.4",
            "x": 5,
            "y": 3,
            "next": "score"
        },
        {
            "label": "note2.5",
            "x": 6,
            "y": 3,
            "next": "score"
        }
    ]
});
    