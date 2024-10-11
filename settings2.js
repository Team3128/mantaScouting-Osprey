let autoSettingsCopy = new Map();
autoSettingsCopy.set("fieldLength", 16.4846); //Full Field: 16.4846
autoSettingsCopy.set("starting", {
    "type": "start",
    "shouldDrawLine": true,
    "isMoving": true,
    "points" : [
        {
            "label": "Top",
            "x": 1.3,
            "y": 7,
            "next": "score",
            "position": "absolute"
        },
        {
            "label": "Middle",
            "x": 1.3,
            "y": 5.55,
            "next": "score",
            "position": "absolute"
        },
        {
            "label": "Bottom",
            "x": 1.3,
            "y": 4.1,
            "next": "score",
            "position": "absolute"
        },
        {
            "label": "Extreme Bottom",
            "x": 1.3,
            "y": 1.5,
            "next": "score",
            "position": "absolute"
        }
    ]
});
autoSettingsCopy.set("score", {
    "type": "normal",
    "shouldDrawLine": true,
    "isMoving": false,
    "points": [
        {
            "label": "Speaker Score",
            "x": 0,
            "y": 6.1,
            "next": "pickup",
            "position": "absolute",
            "color": "green",
            "coord": [{x: 0, y: 5.55}],
            "trigger": "a"
        },
        {
            "label": "Speaker Miss",
            "x": 0,
            "y": 5,
            "next": "pickup",
            "position": "absolute",
            "color": "yellow",
            "coord": [{x: 0, y: 5.55}],
            "trigger": "d"
        },
        {
            "label": "Amp Score",
            "x": 3.4,
            "y": 8.15,
            "next": "pickup",
            "position": "absolute",
            "color": "green"
        },
        {
            "label": "Amp Miss",
            "x": 0.5,
            "y": 8.15,
            "next": "pickup",
            "position": "absolute",
            "color": "yellow"
        },
        {
            "label": "Hoard",
            "x": -1,
            "y": 0,
            "next": "pickup",
            "position": "movingRelative",
            "color": "orange",
            "function": ()=> {
                autoSettingsCopy.get("pickup").points.push({
                    "display": "H-Note",
                    "label": "H-Note" + UUIDCount,
                    "x": 0,
                    "y": 0,
                    "next": "intakeHoard",
                    "position": "quasiRelative",
                    "markForRemoval": true,
                });
                UUIDCount++;
            },
            "inverseFunction": ()=> {
                autoSettingsCopy.get("pickup").points.pop();
                UUIDCount--;
            },
            "trigger": "s"
        }
    ]
});
autoSettingsCopy.set("scoreHoard", {
    "type": "normal",
    "shouldDrawLine": true,
    "isMoving": false,
    "points": [
        {
            "label": "Speaker Score",
            "x": 0,
            "y": 6.1,
            "next": "pickup",
            "position": "absolute",
            "color": "green",
            "coord": [{x: 0, y: 5.55}],
            "trigger": "a"
        },
        {
            "label": "Speaker Miss",
            "x": 0,
            "y": 5,
            "next": "pickup",
            "position": "absolute",
            "color": "yellow",
            "coord": [{x: 0, y: 5.55}],
            "trigger": "d"
        },
        {
            "label": "Amp Score",
            "x": 3.4,
            "y": 8.15,
            "next": "pickup",
            "position": "absolute",
            "color": "green"
        },
        {
            "label": "Amp Miss",
            "x": 0.5,
            "y": 8.15,
            "next": "pickup",
            "position": "absolute",
            "color": "yellow"
        }
    ]
});
autoSettingsCopy.set("pickup", {
    "type": "remove",
    "shouldDrawLine": true,
    "isMoving": true,
    "points": [
        {
            "label": "note1.1",
            "x": 2.9,
            "y": 7,
            "next": "intake",
            "position": "absolute",
            "trigger": "d"
        },
        {
            "label": "note1.2",
            "x": 2.9,
            "y": 5.55,
            "next": "intake",
            "position": "absolute",
            "trigger": "s"
        },
        {
            "label": "note1.3",
            "x": 2.9,
            "y": 4.1,
            "next": "intake",
            "position": "absolute",
            "trigger": "a"
        },
        {
            "label": "note2.1",
            "x": 8.2423,
            "y": 7.45,
            "next": "intakeMiddle",
            "position": "absolute",
            "coord": [{x: 8.2423, y: 7.45}, {x: 5.57115, y: 6.725}],
            "trigger": "t"
        },
        {
            "label": "note2.2",
            "x": 8.2423,
            "y": 5.8,
            "next": "intakeMiddle",
            "position": "absolute",
            "coord": [{x: 8.2423, y: 5.8}, {x: 5.57115, y: 6.525}],
            "trigger": "r"
        },
        {
            "label": "note2.3",
            "x": 8.2423,
            "y": 4.1,
            "next": "intakeMiddle",
            "position": "absolute",
            "coord": [{x: 8.2423, y: 4.1}, {x: 5.57115, y: 4.1}, {x: 4, y: 5.5}],
            "trigger": "e"
        },
        {
            "label": "note2.4",
            "x": 8.2423,
            "y": 2.45,
            "next": "intakeMiddle",
            "position": "absolute",
            "coord": [{x: 8.2423, y: 2.45}, {x: 5.57115, y: 1.7}],
            "trigger": "w"
        },
        {
            "label": "note2.5",
            "x": 8.2423,
            "y": 0.75,
            "next": "intakeMiddle",
            "position": "absolute",
            "coord": [{x: 8.2423, y: 0.75}, {x: 5.57115, y: 1.5}],
            "trigger": "q"
        }
    ]
});
autoSettingsCopy.set("intake", {
    "type": "normal",
    "shouldDrawLine": false,
    "isMoving": false,
    "points": [
        {
            "label": "Intake",
            "x": 0,
            "y": 0.5,
            "next": "score",
            "position": "relative",
            "trigger": "v"
        },
        {
            "label": "Missed",
            "x": 0,
            "y": -0.5,
            "next": "pickup",
            "position": "relative",
            "trigger": " "
        }
    ]
});
autoSettingsCopy.set("intakeMiddle", {
    "type": "normal",
    "shouldDrawLine": false,
    "isMoving": false,
    "points": [
        {
            "label": "Intake",
            "x": 0,
            "y": 0.5,
            "next": "score",
            "position": "relative",
            "trigger": "v"
        },
        {
            "label": "Beat",
            "x": 0,
            "y": 0,
            "next": "pickup",
            "position": "relative",
            "trigger": "f"
        },
        {
            "label": "Missed",
            "x": 0,
            "y": -0.5,
            "next": "pickup",
            "position": "relative",
            "trigger": " "
        }
    ]
});
autoSettingsCopy.set("intakeHoard", {
    "type": "normal",
    "shouldDrawLine": false,
    "isMoving": false,
    "points": [
        {
            "label": "Intake",
            "x": 0,
            "y": 0.5,
            "next": "scoreHoard",
            "position": "relative",
            "trigger": "v"
        },
        {
            "label": "Missed",
            "x": 0,
            "y": -0.5,
            "next": "pickup",
            "position": "relative",
            "trigger": " "
        }
    ]
});   

var UUIDCount = 0;

function convertAutoPathToData(dataMap, autoPath) {
    const history = [];
    for (let i = 0; i < autoPath.length; i++) {
        const point = autoPath[i];
        const label = point.label.toLowerCase();
        history.push(point.label);
        
        if (label == "Speaker Score".toLowerCase()) {
            dataMap.set("Auto Speaker", dataMap.get("Auto Speaker") + 1);
        }
        if (label == "Speaker Miss".toLowerCase()) {
            dataMap.set("Auto Miss S", dataMap.get("Auto Miss S") + 1);
        }
        if (label == "Amp Score".toLowerCase()) {
            dataMap.set("Auto Amp", dataMap.get("Auto Amp") + 1);
        }
        if (label == "Amp Miss".toLowerCase()) {
            dataMap.set("Auto Miss A", dataMap.get("Auto Miss A") + 1);
        }
        if (label.includes("note") || label.includes("leave")) dataMap.set("Leave", true);

        if (label.includes("note2")) {
            if (i == autoPath.length - 1) continue;
            const nextPoint = autoPath[i + 1];
            if (nextPoint.label == "Intake") {
                dataMap.set("Midline Notes", dataMap.get("Midline Notes") + 1);
            }
        }
    }
    dataPoints.set("Auto Path", history);
}