// import autoSettings from "./autoSettings.json";

//variable declarations
let state = "init", timer = 135, timerIsTicking = false, delay = true, rowContent = new Map(), notesToggled = false, allianceColor = "n";

let isFieldFlipped = false;
let useTimer = false;
const teamListCheck = false;
let dataPoints = new Map();
let timeInt = 1000; // Time Interval, SHOULD BE 1000, 10 if speed!!!!!!!
let testing = false; // DISABLES INTRO PAGE CHECKS IF TRUE
let holdingShift = false;

let startAudio = new Audio("sfx/amyMeowing.mp3")

//import field image and draw on canvas for starting position
var img = new Image();
img.src = 'img/field.png';
var canvas = document.getElementById('fieldCanvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(img, 0, 0);

document.getElementById("fieldCanvas").addEventListener("click", () => {
    canvasClicked()
})

document.getElementById("flipBtn").addEventListener("click", flipField);

document.getElementById("timerBtn").addEventListener("click", enableTimerSetting);

function flipField() {
    if (isFieldFlipped) {
        document.getElementById("flipBtn").classList.add("red");
        document.getElementById("flipBtn").classList.remove("green");
    }
    else {
        document.getElementById("flipBtn").classList.add("green");
        document.getElementById("flipBtn").classList.remove("red");
    }
    isFieldFlipped = !isFieldFlipped;
}

function enableTimerSetting() {
    if (useTimer) {
        document.getElementById("timerBtn").classList.add("red");
        document.getElementById("timerBtn").classList.remove("green");
    }
    else {
        document.getElementById("timerBtn").classList.add("green");
        document.getElementById("timerBtn").classList.remove("red");
    }
    useTimer = !useTimer;
}

//canvas functions to get mouse position, translate to canvas position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
function canvasClicked() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    var pos = getMousePos(canvas, event);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    console.log("canvas clicked, x: " + Math.round(pos.x) + ", y: " + Math.round(pos.y));
}

window.onscroll = () => { window.scroll(0, 0); }; //stops scrolling, hacky bugfix

//code for search qr popup
var modal = document.getElementById("myModal");
var btn = document.getElementById("searchBtn");
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x) or clicks anywhere outside of the modal, close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//transitions to 
document.getElementById("initBtn").addEventListener("click", () => {
    transition(0);
})

//localStorage console commands
function clearStorage() {
    console.log("CLEARING DATA");
    localStorage.clear()
    return;
}
function getStorage() {
    console.log("GETTING DATA")
    let allData = "";
    for (var i in localStorage) {
        if (typeof localStorage[i] == "string") {
            allData += localStorage[i] + "\n"
        }
    }
    console.log(allData)
    return;
}
function setColor(col) {
    allianceColor = col;
    console.log("Alliance color set to: " + allianceColor)
    return;
}

//switches alliance color when TITLE is pressed on the main page
document.getElementById("initColor").addEventListener("click", () => {
    switchColor()
    console.log("color clicked")
})
allianceColor = "b";
switchColor();

document.getElementById("continue").addEventListener("click", nextStage);
document.getElementById("back").addEventListener("click", previousStage);

//always starts on red when app first launches
function switchColor() {
    if (allianceColor == "b") {
        allianceColor = "r";
        document.getElementById("initColor").style.backgroundColor = "var(--r)";
    } else {
        allianceColor = "b"
        document.getElementById("initColor").style.backgroundColor = "var(--b)";
    }
}

//search function for localStorage

let keys = [];
for (let i = 0; i < settings.auto.length; i++) {
    keys.push(settings.auto[i].trigger);
}
for (let i = 0; i < settings.tele.length; i++) {
    keys.push(settings.tele[i].trigger);
}
let uniqueKeys = keys.filter((i, index) => {
    return keys.indexOf(i) === index;
});

//updates QR code on qata page every second
// let qrRefresh = setInterval(() => { if (state == "after") updateQr() }, 1000);
window.addEventListener('keyup', function (keystroke) {
    if (!keystroke.shiftKey) {
        holdingShift = false;
    }
});

//code for hotkeys, notes
window.addEventListener('keydown', function (keystroke) {
    if (!notesToggled && keystroke.key == "Enter") {
        nextStage();
    }
    if (!notesToggled && keystroke.key == "Tab") {
        previousStage();
    }
    if (keystroke.shiftKey) {
        holdingShift = true;
    }
    if (keystroke.key == "Alt") {
        keystroke.preventDefault();
        if (state == "init" || state == "after") {
            return;
        }
        console.log("toggled")
        document.getElementById("notes").classList.remove("notesAnim")
        document.getElementById("notes").classList.remove("notesAnimR")
        document.getElementById("notesPage").classList.remove("notesPageAnim")
        document.getElementById("notesPage").classList.remove("notesPageAnimR")

        const qataKey = state == "tele" ? "qata" : "auto_qata"
        console.log(qataKey);

        if (!notesToggled) {
            document.getElementById('notesPage').classList.add("notesPageAnim")
            document.getElementById('notes').classList.add("notesAnim")
            document.getElementById('notes').focus()
            notesToggled = true;

            if (dataPoints.get(qataKey) == null) {
                document.getElementById("notes").value = "";
            } else {
                document.getElementById("notes").value = dataPoints.get(qataKey);
            }
        }
        else {
            document.getElementById('notes').blur();

            document.getElementById('notesPage').classList.add("notesPageAnimR");
            document.getElementById('notes').classList.add("notesAnimR");
            dataPoints.set(qataKey, document.getElementById("notes").value);
            console.log(dataPoints.get(qataKey));
            notesToggled = false;
        }

    }
    if (notesToggled) {
        return;
    }
    console.log(keystroke.key)
    // if (state == "after") {
    //     updateQr();
    // }
    if (keystroke.key == " " && state == "standby") {
        transition(1)
    }

    if (state == "auto" && false) {
        if (autoKeybinds.has(keystroke.key)) {
            autoKeybinds.get(keystroke.key)();
        }
        return;
    }
    for (let i = 0; i < uniqueKeys.length; i++) {
        var set = settings.auto[i];
        var tes = settings.tele[i];
        if (state == "auto") {
            if (set && set.trigger == keystroke.key) {
                clickEvt(set.writeType, set.label);
                return;
            }
            if (set && set.trigger.toUpperCase() == keystroke.key) {
                clickEvt(set.writeType, set.label, true);
                console.log("reverse")
                return;
            }
        }
        if (state == "tele") {
            if (tes && tes.trigger == keystroke.key) {
                clickEvt(tes.writeType, tes.label);
                return;
            }
            if (tes && tes.trigger.toUpperCase() == keystroke.key) {
                clickEvt(tes.writeType, tes.label, true);
                console.log("reverse")
                return;
            }
        }
    }
}
)

const field = document.createElement("img");
field.src = "img/newField.png";
field.id = "field";
const autoData = autoSettingsCopy;
const fieldLength = autoData.get("fieldLength");
var autoPath = [];
var autoHistory = [];
const autoKeybinds = new Map();
// const autoData = new Map(JSON.parse(JSON.stringify(autoSettings)));

function createAuto(page) {
    autoKeybinds.clear();
    const autoPage = document.getElementById("autoPage");
    autoPage.innerHTML = "";
    autoPage.style.display = "flex";
    const box = document.createElement("div");
    box.id = "autoContainer";
    const canvas = document.createElement("canvas");
    autoPage.appendChild(box);
    box.appendChild(canvas);
    box.appendChild(field);
    const pixelsPerMeter = field.width / fieldLength;
    let widthOffset = 0;
    const data = autoData.get(page);
    for (let i = 0; i < data.points.length; i++) {
        const point = data.points[i];
        if (data.type == "remove" && autoPath.some(otherPoint => otherPoint.label == point.label)) continue;
        const pointBox = document.createElement("button");
        pointBox.innerHTML = point.display != null ? point.display : point.label;
        if (point.trigger != null) {
            autoKeybinds.set(point.trigger, ()=>{nextPoint(point, page)});
            pointBox.innerHTML += " (" + point.trigger + ")";
        }
        pointBox.id = point.label;
        pointBox.classList.add("autoButton");
        pointBox.addEventListener("click", () => {
            nextPoint(point, page);
        });
        box.appendChild(pointBox, false);
        const coord = getAbsPosition(point);
        const top = field.height - coord.y * pixelsPerMeter - pointBox.offsetHeight / 2;
        const left = coord.x * pixelsPerMeter - widthOffset - pointBox.offsetWidth / 2;
        pointBox.style.top = top + "px";
        pointBox.style.left = left + "px";
        widthOffset += pointBox.offsetWidth;
    }

    const stateBox = document.createElement("div");
    stateBox.style.top = field.height + "px";
    stateBox.style.position = "relative";
    stateBox.style.display = "flex";
    const back = document.createElement("p");
    back.innerHTML = "BACK";
    back.id = "backButton";
    back.classList.add("autoButton");
    back.addEventListener("click", backupPoint);
    stateBox.appendChild(back);
    box.appendChild(stateBox);

    canvas.width = field.width;
    canvas.height = field.height;
    canvas.style.position = "absolute";
    canvas.style.zIndex = 1;

    drawPath(canvas, pixelsPerMeter);
}

function nextPoint(point, page) {
    if (autoHistory.length == 1) {
        timerStart()
        if (isFieldFlipped) startAudio.play();
        resetAutoSettings();
    }
    autoPath.push(point);
    autoHistory.push(page);
    if (point.function != null) point.function();
    createAuto(point.next);
}

function getAbsPosition(point) {
    const offset = getRelPosition(point, point.position, autoPath.length);
    if (point.position.toLowerCase().includes("quasi")) {
        point.x = offset.x;
        point.y = offset.y;
        point.position = "absolute";
    }
    let x = (allianceColor == "r" ? fieldLength - offset.x : offset.x);
    let y = offset.y;

    if (isFieldFlipped) {
        x = fieldLength - x;
        y = fieldLength / 2 - y;
    }
    return { x, y };
}

function getRelPosition(coord, position, index) {
    let x = coord.x;
    let y = coord.y;
    if (position.toLowerCase().includes("relative")) {
        let coord;
        if (position.toLowerCase().includes("moving")) {
            coord = getPrevPoint(index);
        }
        else {
            coord = getRelPosition(autoPath[index - 1], autoPath[index - 1].position, index - 1);
        }
        x += coord.x;
        y += coord.y;
    }
    return { x, y };
}

function getPrevPoint(index) {
    for (let i = index - 1; i >= 0; i--) {
        if (autoData.get(autoHistory[i]).isMoving) {
            const point = autoPath[i];
            let coords = getCoords(point, point.position, i);
            return coords[coords.length - 1];
        }
    }
    alert("U fucked up");
}

function getCoords(point, index) {
    let coords = "coord" in point ? point.coord : [{ x: point.x, y: point.y }];
    for (var c in coords) {
        coords[c] = getRelPosition(coords[c], point.position, index);
    }
    return coords;
}

function drawPath(canvas, pixelsPerMeter) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 1; i < autoPath.length; i++) {
        const page = autoData.get(autoHistory[i]);
        if (!page.shouldDrawLine) continue;
        const point = getCoords(autoPath[i], i);
        const isMoving = autoData.get(autoHistory[i]).isMoving;
        let prevPoint = getPrevPoint(i);
        for (let j = 0; j < point.length; j++) {
            if (isMoving) {
                ctx.strokeStyle = allianceColor == "r" ? "red" : "blue";
                ctx.lineWidth = 2;
            }
            else {
                console.log(autoPath[i]);
                ctx.strokeStyle = autoPath[i].color;
                ctx.lineWidth = 1;
            }
            drawLine(ctx, prevPoint, point[j], pixelsPerMeter);
            prevPoint = point[j];
            if (i == autoPath.length - 1) break;
        }
    }
}

function drawLine(ctx, prevPoint, point, pixelsPerMeter) {
    let x = (allianceColor == "r" ? fieldLength - point.x : point.x);
    let y = point.y;
    let xStart = (allianceColor == "r" ? fieldLength - prevPoint.x : prevPoint.x);
    let yStart = prevPoint.y;
    if (isFieldFlipped) {
        x = fieldLength - x;
        y = fieldLength / 2 - y;
        xStart = fieldLength - xStart;
        yStart = fieldLength / 2 - yStart
    }
    x *= pixelsPerMeter;
    y = field.height - y * pixelsPerMeter;
    xStart *= pixelsPerMeter;
    yStart = field.height - yStart * pixelsPerMeter;
    // const x = (allianceColor == "r" ? fieldLength - point.x : point.x) * pixelsPerMeter;
    // const y = field.height - point.y * pixelsPerMeter;
    // const xStart = (allianceColor == "r" ? fieldLength - prevPoint.x : prevPoint.x) * pixelsPerMeter;
    // const yStart = field.height - prevPoint.y * pixelsPerMeter;
    const angle = Math.atan2(y - yStart, x - xStart);
    const headLen = 10;

    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(x - headLen * Math.cos(angle - Math.PI / 6), y - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x - headLen * Math.cos(angle + Math.PI / 6), y - headLen * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
}

function backupPoint() {
    if (autoHistory.length == 0) return;
    const point = autoPath.pop();
    if (point.inverseFunction != null) {
        point.inverseFunction();
    }
    createAuto(autoHistory.pop());
    if (autoHistory.length == 1) {
        timerStop();
    }
}

function resetAutoSettings() {
    for (var [key, value] of autoData) {
        if (!(value instanceof Object)) continue;
        const points = value.points;
        for (var j = points.length - 1; j >= 0; j--) {
            if (points[j].markForRemoval) {
                points.splice(j, 1);
            }
        }
    }
}

function resetAuto() {
    if (true) {
        for(i=0; i<settings.auto.length; i++){
            const box = document.createElement("div")
            const wLoc = settings.auto[i].label;
            const display = settings.auto[i].display;
            box.innerHTML = display;
            box.classList.add("mainPageBox");
            box.style.gridColumnStart = settings.auto[i].columnStart;
            box.style.gridColumnEnd = settings.auto[i].columnEnd;
            box.style.gridRowStart = settings.auto[i].rowStart;
            box.style.gridRowEnd = settings.auto[i].rowEnd;
            let wType = settings.auto[i].writeType;
            box.id = "box" + wLoc
            box.addEventListener("click", ()=>clickEvt(wType, wLoc, holdingShift))
            document.getElementById("mainPage").appendChild(box);

            const boxLabel = document.createElement("div");
            boxLabel.classList.add("mainPageLabel");
            boxLabel.style.gridColumn = (settings.auto[i].columnEnd-1) + "/" + (settings.auto[i].columnEnd-1);
            boxLabel.style.gridRow = (settings.auto[i].rowEnd-1) + "/" + (settings.auto[i].rowEnd-1);
            boxLabel.innerHTML = settings.auto[i].trigger.toUpperCase()
            boxLabel.addEventListener("click", ()=>clickEvt(wType, wLoc, holdingShift))
            document.getElementById("mainPage").appendChild(boxLabel);

            const boxCount = document.createElement("div");
            boxCount.classList.add("mainPageCounter");
            boxCount.id = "label" + wLoc;
            boxCount.innerHTML = dataPoints.get(wLoc);
            boxCount.style.gridColumn = settings.auto[i].columnStart + "/" + settings.auto[i].columnStart;
            boxCount.style.gridRow = (settings.auto[i].rowEnd-1) + "/" + (settings.auto[i].rowEnd-1);
            boxCount.addEventListener("click", ()=>clickEvt(wType, wLoc, holdingShift))
            document.getElementById("mainPage").appendChild(boxCount);
            
        }
    }
    else {
        autoPath = [];
        autoHistory = [];
        resetAutoSettings();
        createAuto("starting");
    }
    document.getElementById("initPage").style.display = "none";
    document.getElementById("mainPage").style.display = "grid";
    state = "auto";
}

//reads settings.js file, generates HTML for the app using that info
function generateMainPage(stage) {
    state = stage;
    document.getElementById("display-match").innerHTML = "Match:  " + dataPoints.get("match_number");
    document.getElementById("display-team").innerHTML = "Team: " + dataPoints.get("team_number");
    if (stage == "auto") {
        resetAuto();
        document.getElementById('notes').value = dataPoints.get("auto_qata");
    }
    if (stage == "tele") {
        document.getElementById('notes').blur()
        const notesValue = document.getElementById("notes").value;
        if (notesValue && "" || notesValue != null) dataPoints.set("auto_qata", notesValue);

        document.getElementById('notes').value = dataPoints.get("qata");
        document.getElementById("notes").classList.remove("notesAnim")
        document.getElementById("notes").classList.remove("notesAnimR")
        document.getElementById("notesPage").classList.remove("notesPageAnim")
        document.getElementById("notesPage").classList.remove("notesPageAnimR")

        document.getElementById("autoPage").style.display = "none";
        for (i = 0; i < settings.tele.length; i++) {
            const box = document.createElement("div")
            const wLoc = settings.tele[i].label;
            const display = settings.tele[i].display;
            box.innerHTML = display;
            box.classList.add("mainPageBox");
            box.style.gridColumnStart = settings.tele[i].columnStart;
            box.style.gridColumnEnd = settings.tele[i].columnEnd;
            box.style.gridRowStart = settings.tele[i].rowStart;
            box.style.gridRowEnd = settings.tele[i].rowEnd;
            let wType = settings.tele[i].writeType;
            box.id = "box" + wLoc
            box.addEventListener("click", () => clickEvt(wType, wLoc, holdingShift))
            document.getElementById("mainPage").appendChild(box);

            const boxLabel = document.createElement("div");
            boxLabel.classList.add("mainPageLabel");
            boxLabel.style.gridColumn = (settings.tele[i].columnEnd - 1) + "/" + (settings.tele[i].columnEnd - 1);
            boxLabel.style.gridRow = (settings.tele[i].rowEnd - 1) + "/" + (settings.tele[i].rowEnd - 1);
            boxLabel.innerHTML = settings.tele[i].trigger.toUpperCase()
            boxLabel.addEventListener("click", () => clickEvt(wType, wLoc, holdingShift))
            document.getElementById("mainPage").appendChild(boxLabel);

            const boxCount = document.createElement("div");
            boxCount.classList.add("mainPageCounter");
            boxCount.id = "label" + wLoc;
            boxCount.innerHTML = dataPoints.get(wLoc);
            boxCount.style.gridColumn = settings.tele[i].columnStart + "/" + settings.tele[i].columnStart;
            boxCount.style.gridRow = (settings.tele[i].rowEnd - 1) + "/" + (settings.tele[i].rowEnd - 1);
            boxCount.addEventListener("click", () => clickEvt(wType, wLoc, holdingShift))
            document.getElementById("mainPage").appendChild(boxCount);
        }
        console.log("tele generated");
        state = "tele"
    }
    if (stage == "after") {
        document.getElementById("displayBar").style.display = "none"

        //close notes box if it is open
        document.getElementById('notes').blur()
        const notesValue = document.getElementById("notes").value;
        if (notesValue != null && notesValue != "") dataPoints.set("qata", notesValue);
        document.getElementById("notes").value = "";
        document.getElementById("notes").classList.remove("notesAnim")
        document.getElementById("notes").classList.remove("notesAnimR")
        document.getElementById("notesPage").classList.remove("notesPageAnim")
        document.getElementById("notesPage").classList.remove("notesPageAnimR")

        let mainPage = document.getElementById("mainPage");
        mainPage.style.display = "flex"
        mainPage.classList.remove("mainPage");
        mainPage.classList.add("afterPageContainer");
        let strInputs = document.createElement("div");
        strInputs.classList.add("afterPageStringInputs")
        let qataBox = document.createElement("div");
        qataBox.classList.add("afterPageQata");
        // let editId = document.createElement("input");
        // let editTeam = document.createElement("input");
        // let editMatchNo = document.createElement("input");
        // let editPosNo = document.createElement("input");
        // editMatchNo.setAttribute("type","text");
        // editMatchNo.classList.add("afterPageQata");
        // editPosNo.setAttribute("type","text");
        // editPosNo.classList.add("afterPageQata");
        // editTeam.setAttribute("type","text");
        // editTeam.classList.add("afterPageQata");
        // editId.setAttribute("type", "text");
        // editId.classList.add("afterPageQata")
        // qataBox.append(editPosNo);
        // qataBox.append(editMatchNo);
        // qataBox.append(editTeam);
        // qataBox.append(editId);
        mainPage.appendChild(strInputs);
        strInputs.appendChild(qataBox);


        for (let i = 0; i < settings.after.length; i++) {
            if (settings.after[i].writeType == "cyc") {
                const container = document.createElement("div");
                container.classList.add("cycContainer");
                qataBox.appendChild(container);

                const label = document.createElement("div");
                label.classList.add("qataLabel");
                label.innerHTML = settings.after[i].display;
                container.appendChild(label);

                const bar = document.createElement("div");
                bar.classList.add("qataCycContainer");
                container.appendChild(bar);

                for (let b = 0; b < settings.after[i].cycOptions.length; b++) {
                    const option = document.createElement("div");
                    option.classList.add("qataCyc");
                    option.setAttribute("id", (settings.after[i].label + "cyc" + settings.after[i].cycOptions[b]))
                    option.innerHTML = settings.after[i].cycOptions[b]
                    option.addEventListener("click", () => clickEvt("cyc", settings.after[i].label, settings.after[i].cycOptions[b]))
                    bar.appendChild(option);
                }
                //set default value
                dataPoints.set(settings.after[i].label, settings.after[i].cycOptions[0]);

            }



            if (settings.after[i].writeType == "bool") {
                const container = document.createElement("div");
                container.classList.add("switchContainer");
                qataBox.appendChild(container);

                const labelText = document.createElement("div");
                labelText.classList.add("qataLabel");
                labelText.innerHTML = settings.after[i].display;
                container.appendChild(labelText);

                const labelElem = document.createElement("label");
                labelElem.classList.add("switch")


                container.appendChild(labelElem)

                const input = document.createElement("input");
                input.type = "checkbox";
                input.addEventListener("click", () => clickEvt("afterBool", settings.after[i].label))
                input.setAttribute("id", ("switch" + settings.after[i].label))
                labelElem.appendChild(input);

                const span = document.createElement("span");
                span.classList.add("slider");
                span.classList.add("round");
                labelElem.appendChild(span);

                dataPoints.set(settings.after[i].label, false)
            }
            if (settings.after[i].writeType == "str") {

                const container = document.createElement("div");
                container.classList.add("textContainer");
                if (settings.after[i].label == "Other Qata") {
                    container.style.height = "20vh"
                }
                qataBox.appendChild(container);

                const labelText = document.createElement("div");
                labelText.classList.add("qataLabel");
                labelText.innerHTML = settings.after[i].display;
                container.appendChild(labelText);

                const textbox = document.createElement("textarea");
                textbox.classList.add("afterTextBox");
                textbox.setAttribute("id", ("str" + settings.after[i].label));
                textbox.setAttribute("placeholder", settings.after[i].placeholder);
                textbox.style.height = "14vh";
                textbox.style.paddingTop = "7px";
                textbox.style.resize = "none";
                const value = dataPoints.get(settings.after[i].label);
                console.log("other qata from notes: " + value);
                textbox.value = value != null ? value : ""
                textbox.addEventListener("input", () => {
                    dataPoints.set(settings.after[i].label, textbox.value);
                    updateQr();
                })
                container.appendChild(textbox)

                // if (settings.after[i].label == "qata") {
                //     const textbox = document.createElement("textarea");
                //     textbox.classList.add("afterTextBox");
                //     textbox.setAttribute("id", ("str" + settings.after[i].label));
                //     textbox.setAttribute("placeholder", settings.after[i].placeholder);
                //     textbox.style.height = "14vh";
                //     textbox.style.paddingTop = "7px";
                //     textbox.style.resize = "none";
                //     console.log("other qata from notes: " + dataPoints.get("qata"));
                //     textbox.innerHTML = dataPoints.get("qata");
                //     textbox.addEventListener("input", () => {
                //         dataPoints.set("qata", textbox.value);
                //         updateQr();
                //     })
                //     container.appendChild(textbox)
                // }
                // else {
                //     const textbox = document.createElement("input");
                //     textbox.type = "text";
                //     textbox.classList.add("afterTextBox");
                //     textbox.setAttribute("id", ("str" + settings.after[i].label));
                //     textbox.setAttribute("placeholder", settings.after[i].placeholder)
                //     textbox.addEventListener("input", () => {
                //         dataPoints.set(settings.after[i].label, textbox.value);
                //         updateQr();
                //     })
                //     container.appendChild(textbox)
                //     dataPoints.set(settings.after[i].label, "");
                // }
            }

        }

        // Start Info Text Boxes
        const startContainer = document.createElement("div");
        strInputs.appendChild(startContainer);
        startContainer.classList.add("afterPageStartContainer");
        for (let i = 0; i < settings.start.length; i++) {
            const container = document.createElement("div");
            container.classList.add("afterPageStartItem");
            const labelText = document.createElement("div");
            labelText.classList.add("afterPageStartLabel");
            labelText.innerHTML = settings.start[i].display;
            container.appendChild(labelText);
            const textbox = document.createElement("input");
            textbox.type = "text";
            textbox.classList.add("afterTextBoxStartInfo");
            textbox.value = dataPoints.get(settings.start[i].label);
            textbox.setAttribute("id", ("str" + settings.start[i].label));
            textbox.setAttribute("placeholder", settings.start[i].placeholder);
            textbox.addEventListener("input", ()=> {
                dataPoints.set(settings.start[i].label, !isNaN(textbox.value) ? parseInt(textbox.value) : textbox.value);
                updateQr()
            })
            container.appendChild(textbox)
            startContainer.appendChild(container)
        }
        for (let i = 0; i < 2; i++) {
            let radioDiv = document.createElement("div");
            radioDiv.classList.add("afterPageStartRadio")
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "afterPageStartColors";
            let color = "";
            if (i % 2 == 0) {
                color = "Red";
                radio.value = "r";
                if (allianceColor == "r") radio.checked = true
            } else {
                color = "Blue";
                radio.value = "b";
                if (allianceColor == "b") radio.checked = true
            }
            radio.id = "afterPageStart" + color;
            radio.addEventListener("click", ()=> {
                allianceColor = i % 2 == 0 ? "r" : "b";
                updateQr();
            });
            let radioLabel = document.createElement("label");
            radioLabel.classList.add("afterPageStartLabel");
            radioLabel.innerHTML = color;
            radioLabel.setAttribute("for", "afterPageStart" + color);
            radioDiv.appendChild(radio);
            radioDiv.appendChild(radioLabel);
            startContainer.appendChild(radioDiv)
        }

        let editBox = document.createElement('div');
        editBox.classList.add("afterPageEdit");

        let editTable = document.createElement('div');
        editTable.classList.add("afterEditTable");
        let mainTable = document.createElement("table");
        mainTable.setAttribute("id", "mainTable");
        let tableBody = document.createElement("tbody");
        editTable.appendChild(mainTable);

        editBox.appendChild(editTable);
        mainPage.appendChild(editBox);



        for (i = 0; i < settings.auto.length; i++) {
            if (settings.auto[i].label == "Oof Time") {
                continue;
            }
            rowContent.set(settings.auto[i].label, settings.auto[i]);
        }
        for (i = 0; i < settings.tele.length; i++) {
            rowContent.set(settings.tele[i].label, settings.tele[i]);
        }

        console.log(rowContent.size)

        let index = 0;
        for (const value of rowContent.values()) {
            var row = document.createElement("tr");
            row.addEventListener("click", () => clickEvt("edit", value.label));
            row.setAttribute('id', ("tr" + value.label));
            row.setAttribute('class', "editTableRow");

            for (let b = 0; b < 2; b++) {
                let content;
                if (b % 2 == 0) {
                    content = value.display;
                }
                if (b % 2 == 1) {
                    content = dataPoints.get(value.label);
                }
                var cell = document.createElement("td");
                var cellText = document.createTextNode(content);
                cell.appendChild(cellText);
                if (b % 2 == 0) {
                    cell.setAttribute('id', 'qataPageCellID' + value.label + '')
                    cell.setAttribute('class', 'qataPageCellID')
                }
                if (b % 2 == 1) {
                    cell.setAttribute('id', 'qataPageCellNumber' + value.label + '')
                    cell.setAttribute('class', 'qataPageCellNumber')
                }
                row.appendChild(cell);
            }
            if (index == settings.auto.length) {
                var title = document.createElement("h4");
                title.innerHTML = "Teleop";
                title.classList.add("editPageTitle");
                tableBody.appendChild(title);
            }
            else if (index == 0) {
                var title = document.createElement("h4");
                title.innerHTML = "Auto";
                title.classList.add("editPageTitle");
                tableBody.appendChild(title);
            }

            tableBody.appendChild(row);
            index ++;
        }
        mainTable.appendChild(tableBody)
        editTable.appendChild(mainTable);
        editBox.appendChild(editTable);

        let header = mainTable.createTHead();
        let hRow = header.insertRow(0);
        let hCell = hRow.insertCell(0);
        hCell.innerText = "item";
        hCell.classList.add("qataPageCellID")
        let hCell2 = hRow.insertCell(1);
        hCell2.innerText = "value";
        hCell2.classList.add("qataPageCellNumber")

        //buttons that user selects while editing
        let editor = document.createElement("div");
        editor.classList.add("afterEditor")
        editBox.appendChild(editor);

        let btn = document.createElement("button");
        btn.setAttribute("id", "editMinusBtn");
        btn.setAttribute("class", "editBtn");
        btn.innerHTML = "-"
        editor.appendChild(btn);
        document.getElementById("editMinusBtn").addEventListener("click", () => clickEvt("editBtn", null, "minus"));

        const textbox = document.createElement("input");
        textbox.type = "text";
        textbox.setAttribute("id", "editTextBox");
        textbox.disabled = true;
        textbox.addEventListener("change", () => clickEvt("editBtn", null, "value"))
        editor.appendChild(textbox)

        let btn2 = document.createElement("button");
        btn2.setAttribute("id", "editPlusBtn");
        btn2.setAttribute("class", "editBtn");
        btn2.innerHTML = "+"
        editor.appendChild(btn2);
        document.getElementById("editPlusBtn").addEventListener("click", () => clickEvt("editBtn", null, "plus"));



        let qrBox = document.createElement("div");
        qrBox.classList.add("afterPageQr");
        mainPage.appendChild(qrBox);

        let qrContainer = document.createElement("div");
        qrContainer.classList.add("qrContainer");
        qrContainer.setAttribute('id', "qrContainer");
        qrBox.appendChild(qrContainer);

        let qrText = document.createElement("div");
        qrText.setAttribute("id", "qrText");
        qrText.addEventListener("click", () => {
            navigator.clipboard.writeText(document.getElementById("qrText").innerHTML);
            alert("String copied to clipboard")
        })
        qrBox.appendChild(qrText);

        let qrBtn = document.createElement("button");
        qrBtn.setAttribute("id", "qrBtn");
        qrBtn.innerHTML = "continue";
        qrBtn.addEventListener("click", () => clickEvt("transition", null, null))
        qrBox.appendChild(qrBtn);

        updateQr()

    }
}

document.getElementById("qrTextDisplay").addEventListener("click", () => {
    navigator.clipboard.writeText(document.getElementById("qrTextDisplay").innerHTML);
    alert("String copied to clipboard");
})

timerInit();

//defines time length, starts timer 
function timerInit() {
    // if (window.timerFunction != null) return;
    // timer = 135;
    // delay = true;
    // updateTimer();
    window.timerFunction = setInterval(updateTimer, timeInt)
    // console.log("timer started")
}

function timerStart() {
    const firstStart = !timerIsTicking
    timerIsTicking = true;
    if (firstStart) {
        timer = useTimer ? 150 : 135;
        updateTimer();
    }
}

function timerStop() {
    timerIsTicking = false;
    document.getElementById("display-timer").innerHTML = "";
}

function updateTimer() {
    if (!timerIsTicking) return;
    document.getElementById("display-timer").innerHTML = timer;
    if (settings.imported.transitionMode == "manual") {
        timer--;
    }
    if (settings.imported.transitionMode == "auto") {
        if (useTimer) {
            if (timer == 135 && delay) { //janky implementation of 2 second auto to teleop delay
                timer = 136; //136??? check delay
                delay = !delay
            }
            if (timer == 135 && !delay) {
                state = "tele"
                transition(2)
            }
            if (timer == 30) {
                //state = "end"
                //transition(3)
                //this was removed because the endgame page was the same as the teleop page
            }
            if (timer == 0) {
                console.log("Game over");
                timer -= 1;
                state = "after";
                transition(4)
            }
        }

        if (timer > 0) {
            timer--;
        }
    }
    // if (timer == 0) {
    //     console.log("Game over");
    //     timer -= 1;
    //     state = "after";
    //     transition(4)
    // }
}

let isSorted = false;
function updateQr() {
    combAllianceColor = allianceColor + dataPoints.get("team_position");
    dataPoints.set("alliance_color", allianceColor);

    if (!isSorted) sortData();

    //reference for qr gen: https://github.com/kazuhikoarase/qrcode-generator/blob/master/js/README.md

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    console.log(dataPoints);
    let stuff = JSON.stringify(dataPoints, (key, value) => (value instanceof Map ? [...value] : value));
    console.log(stuff);
    qr.addData(stuff);
    qr.make();
    document.getElementById('qrContainer').innerHTML = qr.createImgTag();
    document.getElementById("qrText").innerHTML = stuff;
}

function sortData() {
    const sortedData = new Map();
    const metaData = ["scout_id", "team_number", "match_number", "team_position", "scout_team", "alliance_color"]
    for (const key of metaData) {
        sortedData.set(key, dataPoints.get(key));
    }

    for (const [key, value] of dataPoints) {
        if (key in metaData) continue;
        console.log ("Key: " + key);
        if (typeof value == "string") {
            console.log("Key: " + key);

            let textValue = value;

            textValue = textValue.replace(/\n/g, ' ');
            if (textValue.length == 0) {
                dataPoints.set(key, "None");
            } else {
                dataPoints.set(key, textValue);
            }
        }
        sortedData.set(key, value);
    }
    isSorted = true;
    dataPoints = sortedData;
}

let incArr = []
let selected = -1;
function clickEvt(type, loc, rev = null) {
    console.log(type + " " + loc);
    const randomIndex = Math.floor(Math.random() * sounds.length);
    let clickAudio = new Audio(sounds[randomIndex]);
    if (isFieldFlipped) clickAudio.play();
    //during game
    if (type == "int") {
        document.getElementById("box" + loc).classList.remove("clickAnim");
        void document.getElementById("box" + loc).offsetWidth;
        if (rev) {
            dataPoints.set(loc, dataPoints.get(loc) - 1);
            document.getElementById("box" + loc).classList.add("clickAnim");
        }
        if (!rev) {
            dataPoints.set(loc, dataPoints.get(loc) + 1);
            document.getElementById("box" + loc).classList.add("clickAnim");
        }
        document.getElementById("label" + loc).innerHTML = dataPoints.get(loc);
    }
    if (type == "bool") {
        dataPoints.set(loc, !dataPoints.get(loc));
        document.getElementById("label" + loc).innerHTML = dataPoints.get(loc);
        if (dataPoints.get(loc)) {
            document.getElementById("box" + loc).style.backgroundColor = "var(--accentColor)"
        } else {
            document.getElementById("box" + loc).style.backgroundColor = "var(--altBgColor)"
        }
    }
    if (type == "inc") {
        if (rev) {
            return;
        }
        if (incArr.includes(loc)) {
            incArr.splice(incArr.indexOf(loc), 1);
            document.getElementById("box" + loc).style.backgroundColor = "var(--altBgColor)";
        }
        else {
            incArr.push(loc);
            document.getElementById("box" + loc).style.backgroundColor = "var(--accentColor)";
        }
        document.getElementById("label" + loc).innerHTML = dataPoints.get(loc);
    }



    if (type == "cycG") {
        document.getElementById("box" + loc).classList.remove("clickAnim");
        void document.getElementById("box" + loc).offsetWidth;
        let curVal = dataPoints.get(loc);
        let cycOptions;
        for (let sectionName in settings) {
            let section = settings[sectionName];
            for (let i = 0; i < section.length; i++) {
                if (section[i].label == loc) {
                    cycOptions = section[i].cycGOptions
                    break;
                }
            }
        }
        let index = (cycOptions.indexOf(curVal) + 1) % cycOptions.length;
        dataPoints.set(loc, cycOptions[index]);
        document.getElementById("label" + loc).innerHTML = dataPoints.get(loc);
        document.getElementById("box" + loc).classList.add("clickAnim");
    }
    //after game

    if (type == "cyc") {
        if (dataPoints.get(loc)) {
            dataPoints.get(loc) = rev;
            for (let i = 0; i < settings.after[0].cycOptions.length; i++) {
                document.getElementById((loc + "cyc" + settings.after[0].cycOptions[i])).style.border = "2px solid var(--highlightColor)";
            }
            document.getElementById((loc + "cyc" + rev)).style.border = "2px solid var(--accentColor)";
        }
        if (!dataPoints.get(loc)) {
            dataPoints.set(loc, rev);
            document.getElementById((loc + "cyc" + rev)).style.border = "2px solid var(--accentColor)";
        }
    }

    if (type == "afterBool") {
        dataPoints.set(loc, !dataPoints.get(loc));
    }

    if (type == "edit") {

        for (const key of rowContent.keys()) {
            document.getElementById(("tr" + key)).classList.remove("editSelect");
        }
        selected = loc;
        document.getElementById(("tr" + loc)).classList.add("editSelect");
        if (rowContent.get(loc).writeType == "bool") {
            document.getElementById("editTextBox").disabled = true;
        }
        if (rowContent.get(loc).writeType != "bool") {
            document.getElementById("editTextBox").disabled = false;
        }
        document.getElementById("editTextBox").value = dataPoints.get(loc);
    }
    if (type == "editBtn") {
        if (selected == -1) {
            alert("nothing selected")
            return;
        }

        if (rev == "value") {
            const entry = document.getElementById("editTextBox").value;
            if (!isNaN(entry)) {
                dataPoints.set(selected, parseInt(entry));
                document.getElementById(("qataPageCellNumber" + selected)).innerHTML = dataPoints.get(selected);
            }
        }

        if (rowContent.get(selected).writeType == "bool") {
            dataPoints.set(selected, !dataPoints.get(selected));
        }

        if ((rowContent.get(selected).writeType == "int") || (rowContent.get(selected).writeType == "inc")) {
            if (rev == "plus") {
                dataPoints.set(selected, dataPoints.get(selected) + 1);
            }
            if (rev == "minus") {
                dataPoints.set(selected, dataPoints.get(selected) - 1);
            }
        }
        if (rowContent.get(selected).writeType == "cycG") {
            let curVal = dataPoints.get(selected);
            let cycOptions = rowContent.get(selected).cycGOptions;
            const index = (cycOptions.indexOf(curVal) + 1) % cycOptions.length;
            dataPoints.set(selected, cycOptions[index]);
            console.log(dataPoints.get(selected));
        }

        document.getElementById(("qataPageCellNumber" + selected)).innerHTML = dataPoints.get(selected);
        document.getElementById("editTextBox").value = dataPoints.get(selected);

    }

    if (state == "after") {
        updateQr();
    }

    if (type == "transition") {
        if (confirm("Resetting game... Are you sure you have been scanned and given OK?")) {
            localStorage.setItem(dataPoints.get("match_number"), JSON.stringify(dataPoints, (key, value) => (value instanceof Map ? [...value] : value)));
            console.log("Final Data: " + dataPoints);
            resetGame()
        }
    }

    console.log(dataPoints);
}

//def and climb timers
setInterval(() => {
    if ((state == "after") || (state == "init")) {
        return;
    }
    if (timer > 0) {
        for (let i = 0; i < incArr.length; i++) {
            dataPoints.set(incArr[i], dataPoints.get(incArr[i]) + 1);
            document.getElementById("label" + incArr[i]).innerHTML = dataPoints.get(incArr[i]);
        }
    }
}, 1000)

function  transition(i) {
    if (i == 0 && state == "init") {
        dataPoints = new Map(getDataSettings());
        const scoutID = document.getElementById("initIdForm").value;
        const matchNum = document.getElementById("initMatchForm").value;
        const teamNum = document.getElementById("initNumberForm").value;
        const teamPos = document.getElementById("initPositionForm").value;
        const scoutTeam = document.getElementById("initTeamForm").value;

        if (!testing) {
            if (!(allianceColor == 'b' || allianceColor == 'r')) { //check alliance color
                alert("Did you enter the alliance color by clicking eScouting?")
                return;
            }
            if (scoutID == "") { //check scout name
                alert("Enter your Scout ID.")
                return;
            }
            if (!(/^\d+$/.test(teamNum)) || (teamListCheck && !teamList.includes(parseInt(teamNum)))) { //check if team number is a number
                alert("Enter your team number correctly.")
                return;
            }
            if (!(/^\d+$/.test(matchNum)) || parseInt(matchNum) < 0 || parseInt(matchNum) > 500) { //check if match number is a number
                alert("Enter the match number correctly.")
                return;
            }
            if (scoutTeam == "") {
                alert("Enter your scout team number.");
                return;
            }
            if (!(teamPos == 1 || teamPos == 2 || teamPos == 3)) { //check if team position is 1, 2, or 3
                alert("Enter your team position correctly.")
                return;
            }
        }

        dataPoints.set("scout_id", scoutID);
        dataPoints.set("team_number", parseInt(teamNum));
        dataPoints.set("match_number", parseInt(matchNum));
        dataPoints.set("team_position", parseInt(teamPos));
        dataPoints.set("scout_team", parseInt(scoutTeam));
        dataPoints.set("alliance_color", allianceColor);

        combAllianceColor = allianceColor + teamPos;
        console.log("alliance color: " + combAllianceColor);
        document.getElementById("infoBar").innerHTML = "Match: " + matchNum + ", Team: " + teamNum + ", Position: " + combAllianceColor

        document.getElementById("initFormContainer").classList.add("transitionEvent0");
        setTimeout(() => {
            document.getElementById("initFormContainer").classList.add("hideClass");
        }, 100)
        document.getElementById("initDivLine").classList.add("transitionEvent1");
        document.getElementById("standbyContainer").classList.add("transitionEvent0Rev");
        setTimeout(() => {
            document.getElementById("standbyContainer").style.display = "flex";
            //canvasClicked()
        }, 1000)
        state = "standby"
        return;

    }
    if (i == 1 && state == "standby") {
        if (isFieldFlipped) field.classList.add("rotated");
        else field.classList.remove("rotated");
        if (isFieldFlipped) startAudio.play();
        if (useTimer) timerStart();
        generateMainPage("auto");
    }
    if (i == 2) {
        notesToggled = false;
        let removeElem = (settings.auto.length) * 3
        for (let i = 0; i < removeElem; i++) {
            mainPageElem = document.getElementById("mainPage");
            mainPageElem.removeChild(mainPageElem.lastElementChild)
        }
        timerStart();
        // convertAutoPathToData(dataPoints, autoPath);
        generateMainPage("tele");
    }
    if (i == 4) {
        notesToggled = false;
        let removeElem = (settings.tele.length) * 3
        for (let i = 0; i < removeElem; i++) {

            mainPageElem = document.getElementById("mainPage");
            mainPageElem.removeChild(mainPageElem.lastElementChild)
        }
        generateMainPage("after");
    }
}

function resetGame() {
    isSorted = false;
    document.getElementById("autoPage").style.display = "none";
    state = "init";
    timer = useTimer ? 150 : 135;
    delay = true;
    rowContent = new Map();
    incArr = [];
    selected = -1;
    timerStop();
    notesToggled = false;

    //clearing main page and generating the displaybar
    document.getElementById("mainPage").innerHTML = '';
    let displayBar = document.createElement("div");
    displayBar.setAttribute("id", "displayBar");
    mainPage.appendChild(displayBar);

    //clear infobar
    document.getElementById("infoBar").innerHTML = '';

    //resetting initial page values
    document.getElementById("initIdForm").value = dataPoints.get("scout_id");
    document.getElementById("initNumberForm").value = '';
    document.getElementById("initMatchForm").value = parseInt(dataPoints.get("match_number")) + 1;
    document.getElementById("initPositionForm").value = dataPoints.get("team_position");
    document.getElementById("initColor").style = "background-color: var(--" + allianceColor + ")";
    document.getElementById("qrImage").innerHTML = "";
    document.getElementById("searchForm").value = '';
    document.getElementById("notes").value = '';

    // dataPoints = new Map(getDataSettings());

    //close out of note box
    document.getElementById('notes').blur()

    const box1 = document.createElement("div");
    box1.classList.add("flex");
    const box2 = document.createElement("div");
    box2.classList.add("flex");
    let displayMatch = document.createElement("div");
    displayMatch.setAttribute("id", "display-match");
    // displayBar.appendChild(displayMatch);
    let displayTimer = document.createElement("div");
    displayTimer.setAttribute("id", "display-timer");
    // displayBar.appendChild(displayTimer);
    let displayTeam = document.createElement("div");
    displayTeam.setAttribute("id", "display-team");
    // displayBar.appendChild(displayTeam);
    let backBtn = document.createElement("button");
    backBtn.setAttribute("id", "back");
    backBtn.setAttribute("class", "autoButton");
    backBtn.innerHTML = "Back";
    let continueBtn = document.createElement("button");
    continueBtn.setAttribute("id", "continue");
    continueBtn.setAttribute("class", "autoButton");
    continueBtn.innerHTML = "Next";
    // console.log("Continue Button Created");

    box1.appendChild(displayMatch);
    box1.appendChild(displayTeam);
    box2.appendChild(backBtn);
    box2.appendChild(continueBtn);

    displayBar.appendChild(box1);
    displayBar.appendChild(displayTimer);
    displayBar.appendChild(box2);

    mainPage.innerHTML += '<div id="reset" onclick="abortMatch()">Abort</div>';
    document.getElementById("mainPage").style.display = "none";

    document.getElementById("initPage").style.display = "flex";
    document.getElementById("standbyContainer").style.display = "none";
    document.getElementById("initDivLine").classList.remove("transitionEvent1")
    document.getElementById("initFormContainer").classList.remove("hideClass")
    document.getElementById("initFormContainer").classList.remove("transitionEvent0")

    document.getElementById("mainPage").classList.remove("afterPageContainer");
    document.getElementById("mainPage").classList.add("mainPage");

    document.getElementById("continue").addEventListener("click", nextStage);
    document.getElementById("back").addEventListener("click", previousStage);
}

function nextStage() {
    const nextStageAudio = new Audio("sfx/saevin.mp3")
    if (isFieldFlipped) nextStageAudio.play();
    if (state == "auto") {
        transition(2);
    }
    else if (state == "tele") {
        transition(4);
    }
    console.log("Continue Button Clicked");
}

function previousStage() {
    if (state == "auto") {
        abortMatch();
    }
    else if (state == "tele") {
        let removeElem = (settings.tele.length) * 3
        for (let i = 0; i < removeElem; i++) {
            mainPageElem = document.getElementById("mainPage");
            mainPageElem.removeChild(mainPageElem.lastElementChild)
        }
        if (true) {
            generateMainPage("auto");
        }
        // createAuto(autoPath.length > 0 ? autoPath[autoPath.length - 1].next : "starting")
        state = "auto";
    }
    console.log("Back Button Clicked");
}

//buffers for phase switching
//manual vs auto phase switching
//hour logging?
//till next break>??
//custom keybinds
//custom colour themes
//custom sounds but its already implemented :shrug:
document.getElementById("exitSettingsButton").addEventListener("click", () => {
    document.getElementById("initPage").style.display = "flex";
    document.getElementById("settingsPage").style.display = "none";
})

document.getElementById("settingsBtn").addEventListener("click", () => {
    document.getElementById("settingsPage").style.display = "flex";
    document.getElementById("initPage").style.display = "none";
})


let appearanceBtn = document.getElementsByClassName("appearanceBtnElem");
for (let i = 0; i < appearanceBtn.length; i++) {
    appearanceBtn[i].addEventListener("click", () => {
        changeColor(appearanceBtn[i].getAttribute("id"));
    })
}

function changeColor(id) {
    var r = document.querySelector(':root')
    r.style.setProperty('--mainColor', themes[id][0]);
    r.style.setProperty('--subColor', themes[id][1]);
    r.style.setProperty('--accentColor', themes[id][1]);
    r.style.setProperty('--bgColor', themes[id][2]);
    r.style.setProperty('--altBgColor', themes[id][3]);
    r.style.setProperty('--highlightColor', themes[id][3]);
    r.style.setProperty("--filter", themes[id][5])

    //main, second, bg, highlight
}
function abortMatch() {
    if (confirm("Are you sure you want to reset the match?")) {
        // The user clicked "OK", so proceed with the action
        console.log("User confirmed, proceeding...");
        let tempNum = document.getElementById("initNumberForm").value;
        dataPoints.set("match_number", dataPoints.get("match_number") - 1);
        resetGame();
        document.getElementById("initNumberForm").value = tempNum;
        notesToggled = false;
        document.getElementById('notes').blur()
    } else {
        return;
    }
}

document.getElementById("customStyleBtn").addEventListener("click", () => {
    let arr = document.getElementsByClassName("appearanceForm");
    for (let i = 0; i < arr.length; i++) {
        var input = arr[i].value;
        var regex = /[0-9A-Fa-f]{6}/g;
        if (input.match(regex)) {
            document.querySelector(":root").style.setProperty(("--" + arr[i].getAttribute("id")), "#" + arr[i].value)
        } else {
            alert(arr[i].getAttribute("id") + " is not a valid hex color");
        }

    }
})

document.getElementById("searchBtn").addEventListener("click", () => {
    document.getElementById("searchPage").style.display = "flex";
    document.getElementById("initPage").style.display = "none";
})

document.getElementById("searchReturn").addEventListener("click", () => {
    document.getElementById("searchPage").style.display = "none";
    document.getElementById("initPage").style.display = "flex";
})

document.getElementById("searchConfirm").addEventListener("click", () => {
    searchTerm = document.getElementById("searchForm").value
    value = localStorage.getItem(searchTerm)
    if (value == null || searchTerm == null || searchTerm == '') {
        document.getElementById('qrImage').innerHTML = "";
        document.getElementById('qrTextDisplay').display = "none";
        console.log("No data found")
        return
    }

    console.log("Search term: " + searchTerm)
    console.log("Data: " + value)

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(value);
    qr.make();
    /*
    var mod = qr.getModuleCount();
    var length = 8 + 2 * mod
    document.getElementById('qrOutput').style.width = length;
    document.getElementById('qrOutput').style.height = length;
    */

    const qrImage = qr.createImgTag();
    document.getElementById('qrImage').innerHTML = qrImage;
    document.getElementById('qrTextDisplay').style.display = "flex";
    document.getElementById('qrTextDisplay').innerHTML = value;
    
    console.log("Data found for match " + searchTerm + ": ");
    console.log(value);
})