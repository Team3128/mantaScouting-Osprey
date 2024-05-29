let autoSettingsCopy = new Map();
autoSettingsCopy.set("fieldLength", 16.4846); //Full Field: 16.4846
autoSettingsCopy.set("starting", {
    "type": "start",
    "isMoving": false,
    "points" : [
        {
            "label": "Top",
            "x": 1.3,
            "y": 7,
            "next": "score"
        },
        {
            "label": "Middle",
            "x": 1.3,
            "y": 5.55,
            "next": "score"
        },
        {
            "label": "Bottom",
            "x": 1.3,
            "y": 4.1,
            "next": "score"
        },
        {
            "label": "Extreme Bottom",
            "x": 1.3,
            "y": 1.5,
            "next": "score"
        }
    ]
});
autoSettingsCopy.set("score", {
    "type": "normal",
    "isMoving": false,
    "points": [
        {
            "label": "Speaker Score",
            "x": 0,
            "y": 6.1,
            "next": "pickup",
            "coord": [{x: 0, y: 5.55}]
        },
        {
            "label": "Speaker Miss",
            "x": 0,
            "y": 5,
            "next": "pickup",
            "coord": [{x: 0, y: 5.55}]
        },
        {
            "label": "Amp Score",
            "x": 3.4,
            "y": 8.15,
            "next": "pickup"
        },
        {
            "label": "Amp Miss",
            "x": 0.5,
            "y": 8.15,
            "next": "pickup"
        }
    ]
});
autoSettingsCopy.set("pickup", {
    "type": "remove",
    "isMoving": true,
    "points": [
        {
            "label": "note1.1",
            "x": 2.9,
            "y": 7,
            "next": "score"
        },
        {
            "label": "note1.2",
            "x": 2.9,
            "y": 5.55,
            "next": "score"
        },
        {
            "label": "note1.3",
            "x": 2.9,
            "y": 4.1,
            "next": "score"
        },
        {
            "label": "note2.1",
            "x": 8.2423,
            "y": 7.45,
            "next": "score",
            "coord": [{x: 8.2423, y: 7.45}, {x: 5.57115, y: 6.725}]
        },
        {
            "label": "note2.2",
            "x": 8.2423,
            "y": 5.8,
            "next": "score",
            "coord": [{x: 8.2423, y: 5.8}, {x: 5.57115, y: 6.525}]
        },
        {
            "label": "note2.3",
            "x": 8.2423,
            "y": 4.1,
            "next": "score",
            "coord": [{x: 8.2423, y: 4.1}, {x: 5.57115, y: 4.1}, {x: 2, y: 5.5}]
        },
        {
            "label": "note2.4",
            "x": 8.2423,
            "y": 2.45,
            "next": "score",
            "coord": [{x: 8.2423, y: 2.45}, {x: 5.57115, y: 1.7}]
        },
        {
            "label": "note2.5",
            "x": 8.2423,
            "y": 0.75,
            "next": "score",
            "coord": [{x: 8.2423, y: 0.75}, {x: 5.57115, y: 1.5}]
        }
    ]
});
    