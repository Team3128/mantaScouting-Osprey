let settings = {
    "imported": {
        "transitionMode": "auto"
    },
    "auto": [
        //cube cone buttons
        {
            "label": "Auto Amp",
            "trigger": "e",
            "columnStart": 1,
            "columnEnd": 3,
            "rowStart": 1,
            "rowEnd": 3,
            "writeType": "int"
        },
        {
            "label": "Oof Time",
            "trigger": "k",
            "columnStart": 4,
            "columnEnd": 5,
            "rowStart": 3,
            "rowEnd": 4,
            "writeType": "inc"
        },
        {
            "label": "Midline Notes",
            "trigger": "m",
            "columnStart": 4,
            "columnEnd": 5,
            "rowStart": 4,
            "rowEnd": 5,
            "writeType": "int"
        },
        {
            "label": "Auto Miss S",
            "trigger": "s",
            "columnStart": 1,
            "columnEnd": 2,
            "rowStart": 3,
            "rowEnd": 5,
            "writeType": "int"
        },
        {
            "label": "Auto Miss A",
            "trigger": "d",
            "columnStart": 2,
            "columnEnd": 3,
            "rowStart": 3,
            "rowEnd": 5,
            "writeType": "int"
        },
        {
            "label": "Auto Speaker",
            "trigger": "r",
            "columnStart": 3,
            "columnEnd": 5,
            "rowStart": 1,
            "rowEnd": 3,
            "writeType": "int"
        },
        //cube cone buttons end

        {
            "label": "Leave",
            "trigger": "j",
            "columnStart": 3,
            "columnEnd": 4,
            "rowStart": 3,
            "rowEnd": 5,
            "writeType": "bool"
        }
    ],
    "tele": [
        //cube cone buttons
        {
            "label": "Tele Amp",
            "trigger": "e",
            "columnStart": 1,
            "columnEnd": 2,
            "rowStart": 1,
            "rowEnd": 3,
            "writeLoc": 5,
            "writeType": "int"
        },
        {
            "label": "Tele Speaker",
            "trigger": "r",
            "columnStart": 2,
            "columnEnd": 3,
            "rowStart": 1,
            "rowEnd": 3,
            "writeLoc": 7,
            "writeType": "int"
        },
        {
            "label": "Tele Miss A",
            "trigger": "d",
            "columnStart": 1,
            "columnEnd": 2,
            "rowStart": 3,
            "rowEnd": 4,
            "writeLoc": 6,
            "writeType": "int"
        },
        {
            "label": "Tele Miss S",
            "trigger": "f",
            "columnStart": 2,
            "columnEnd": 3,
            "rowStart": 3,
            "rowEnd": 4,
            "writeLoc": 8,
            "writeType": "int"
        },
        {
            "label": "Trap note",
            "trigger": "u",
            "columnStart": 3,
            "columnEnd": 4,
            "rowStart": 1,
            "rowEnd": 2,
            "writeLoc": 10,
            "writeType": "int"
        },
        //scoring buttons end
        {
            "label": "Penalty",
            "trigger": "o",
            "columnStart": 3,
            "columnEnd": 5,
            "rowStart": 2,
            "rowEnd": 3,
            "writeLoc": 16,
            "writeType": "int"
        },
        {
            "label": "Forced Misses",
            "trigger": "v",
            "columnStart": 1,
            "columnEnd": 3,
            "rowStart": 4,
            "rowEnd": 5,
            "writeLoc": 14,
            "writeType": "int"
        },
        {
            "label": "Spotlight",
            "trigger": "k",
            "columnStart": 3,
            "columnEnd": 4,
            "rowStart": 4,
            "rowEnd": 5,
            "writeLoc": 11,
            "writeType": "bool"
        },
        {
            "label": "Climb Level",
            "trigger": "j",
            "columnStart": 3,
            "columnEnd": 4,
            "rowStart": 3,
            "rowEnd": 4,
            "writeLoc": 12,
            "writeType": "cycG",
            "cycGOptions": [0, 1, 3],
            "writeCycGOptions": 3
        },
        {
            "label": "Fed Note",
            "trigger": "p",
            "columnStart": 4,
            "columnEnd": 5,
            "rowStart": 3,
            "rowEnd": 4,
            "writeLoc": 9,
            "writeType": "int"
        },
        {
            "label": "Oof Time",
            "trigger": "l",
            "columnStart": 4,
            "columnEnd": 5,
            "rowStart": 4,
            "rowEnd": 5,
            "writeLoc": 15,
            "writeType": "inc"
        },
        {
            "label": "Defence",
            "trigger": "i",
            "columnStart": 4,
            "columnEnd": 5,
            "rowStart": 1,
            "rowEnd": 2,
            "writeLoc": 13,
            "writeType": "inc"
        }
    ],

    "after": [

        {
            "label": "Climbing QATA",
            "writeType": "str",
            "placeholder": "e.g. harmonized? speed? good trap+climb?"
        },
        {
            "label": "Defense QATA",
            "writeType": "str",
            "placeholder": "how did they play defense? push power? speed?"
        },
        {
            "label": "QATA",
            "writeType": "str",
            "placeholder": "e.g. how are they scoring? speed? skill?"
        }
    ],
    "start": [
        {
            "label": "Scout ID",
            "writeType": "strBegin",
            "placeholder": "your team # + your name"
        },
        {
            "label": "Team Number",
            "writeType": "strBegin",
            "placeholder": "# of the team you are scouting"
        },
        {
            "label": "Match Number",
            "writeType": "strBegin",
            "placeholder": "current match #"
        },
        {
            "label": "Team Position",
            "writeType": "strBegin",
            "placeholder": "1, 2, or 3"
        }
    ]

}

let dataSettings = new Map();

function getDataSettings() {
    if (dataSettings.size == 0) {
        dataSettings = new Map(getDataArray());
    }
    console.log(dataSettings);
    return dataSettings;
}


function getDataArray() {
    const dataArray = [];
    for (const data of [settings.auto, settings.tele])
        for (let i = 0; i < data.length; i++) {
            const point = data[i];
            let value = 0;
            switch (point.writeType) {
                case "str":
                    value = "";
                    break;
                case "bool":
                    value = false;
                    break;
                case "cycG":
                    value = point.cycGOptions[0];
                    break;
                default:
                    value = 0;
                    break;
            }

            dataArray.push([point.label, value]);
        }
    return dataArray;
}

const teamList = [
    60,
    294,
    359,
    399,
    498,
    597,
    687,
    696,
    1148,
    1197,
    2102,
    2122,
    2658,
    2659,
    2710,
    3128,
    3255,
    3309,
    3476,
    3647,
    3882,
    4079,
    4141,
    4276,
    4322,
    4414,
    4415,
    4419,
    4738,
    5137,
    5199,
    5835,
    6220,
    6995,
    7042,
    7157,
    8521,
    8888,
    9271,
    9408,
    9452,
    9615
]


const themes = {
    "mainStyleSheet": ["#000", "#999999", "#fff", "#f3f3f3", "#E54C38", "invert(0%) sepia(100%) saturate(7430%) hue-rotate(46deg) brightness(81%) contrast(114% opacity(50%))"],
    // main, second, bg, highlight, 
    "styleCarbon": ["#eee", "#444", "#111", "#191919", "#da3333", "invert(100%) sepia(0%) saturate(6935%) hue-rotate(270deg) brightness(111%) contrast(87%) opacity(50%)"],
    "styleMilkshake": ["#000", "#999999", "#fff", "#f3f3f3", "#ffd1dc", "invert(0%) sepia(100%) saturate(7430%) hue-rotate(46deg) brightness(81%) contrast(114% opacity(50%))"],
    "styleIceberg": ["#212b43", "#62cfe6", "#f3fdff", "#ddeff3", "#e58c9d", "invert(16%) sepia(9%) saturate(2627%) hue-rotate(185deg) brightness(95%) contrast(96%) opacity(50%)"],
    "styleLavender": ["#54338e", "#9375c7", "#c4b2e3", "#e3daf2", "#e3daf2", "invert(11%) sepia(32%) saturate(6816%) hue-rotate(238deg) brightness(97%) contrast(99%) opacity(50%)"],
    "styleHightide": ["#094a58", "#00b6ae", "#fff", "#c1c1c1", "#3b3b3b", "invert(22%) sepia(51%) saturate(742%) hue-rotate(143deg) brightness(94%) contrast(96%) opacity(50%)"],
    "styleEvergreen": ["#edf5e1", "#05386b", "#5cdb95", "#8ee4af", "#379683", "invert(96%) sepia(9%) saturate(491%) hue-rotate(43deg) brightness(106%) contrast(92%) opacity(50%)"],
    "styleOlivia": ["#f2efed", "#deaf9d", "#1c1b1d", "#4e3e3e", "#bf616a", "invert(97%) sepia(47%) saturate(304%) hue-rotate(292deg) brightness(104%) contrast(90%) opacity(50%)"],
    "style2077": ["#e8e8e8", "#feff04", "#212121", "rgba(92,74,156,0.5)", "#da3333", "invert(100%) sepia(2%) saturate(421%) hue-rotate(168deg) brightness(115%) contrast(82%) opacity(50%)"],
    "styleAlpine": ["#d8dee9", "#617b94", "#242933", "#1b1f27", "#bf616a", "invert(92%) sepia(7%) saturate(277%) hue-rotate(180deg) brightness(97%) contrast(92%) opacity(50%)"],
    "styleShadow": ["#383e42", "#5e676e", "#010203", "#121212", "#e25303", "invert(22%) sepia(16%) saturate(303%) hue-rotate(161deg) brightness(95%) contrast(91%) opacity(50%)"]
}