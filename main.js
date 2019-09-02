input.onGesture(Gesture.Shake, function () {
    control.reset()
})
let CurDNI = 0
let ABP = 0
let NowSelected = 0
let Musics: number[][] = []
for (let i = 0; i < 1; i++) {
    images.iconImage(IconNames.SmallDiamond).showImage(0)
    images.iconImage(IconNames.Target).showImage(0)
    images.iconImage(IconNames.Diamond).showImage(0)
}
let AudioSet = [262, 294, 330, 349, 392]
let Music1 = [60, 3 + 1 / 10, 2 + 1 / 10, 1 + 1 / 10, 2 + 1 / 10, 3 + 1 / 10, 3 + 1 / 10, 3 + 1 / 10, -1, -1, -1, -1, -1]
let Music2 = [120, 3 + 1 / 10, 2 + 1 / 10, 1 + 1 / 10, 2 + 1 / 10, 3 + 1 / 10, 3 + 1 / 10, 3 + 1 / 10, -1, -1, -1, -1, -1]
Musics.push(Music1)
Musics.push(Music2)
let SelectBreak = 1
while (SelectBreak) {
    basic.showNumber(NowSelected + 1)
    if (input.buttonIsPressed(Button.AB)) {
        SelectBreak = 0
    } else if (input.buttonIsPressed(Button.B)) {
        NowSelected += 1
        if (NowSelected >= Musics.length) {
            NowSelected = Musics.length - 1
        }
    } else if (input.buttonIsPressed(Button.A)) {
        NowSelected += -1
        if (NowSelected < 0) {
            NowSelected = 0
        }
    }
}
basic.showLeds(`
    # . # . .
    . # . # .
    . # # # .
    # . . . .
    # . . . .
    `)
let Music = Musics[NowSelected]
let NowBPM = Music.shift()
let NowCur = 0
let NowNote = 0
let CNC = 0
for (let value of Music) {
    ABP = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    if (Music[NowNote] != -1) {
        led.plot(0, 4 - Music[NowNote])
    }
    if (Music[NowNote + 1] != -1) {
        led.plot(1, 4 - Music[NowNote + 1])
    }
    if (Music[NowNote + 2] != -1) {
        led.plot(2, 4 - Music[NowNote + 2])
    }
    if (Music[NowNote + 3] != -1) {
        led.plot(3, 4 - Music[NowNote + 3])
    }
    if (Music[NowNote + 4] != -1) {
        led.plot(4, 4 - Music[NowNote + 4])
    }
    if (1 <= value && value < 2) {
        music.ringTone(AudioSet[0])
    } else if (2 <= value && value < 3) {
        music.ringTone(AudioSet[1])
    } else if (3 <= value && value < 4) {
        music.ringTone(AudioSet[2])
    } else if (4 <= value && value < 5) {
        music.ringTone(AudioSet[3])
    } else if (5 <= value && value < 6) {
        music.ringTone(AudioSet[4])
    } else if (-1 == value) {
        music.stopMelody(MelodyStopOptions.All)
    } else {
        music.stopMelody(MelodyStopOptions.All)
    }
    for (let i = 0; i < value % 1 * (1000 * (60 / NowBPM)); i++) {
        if (input.buttonIsPressed(Button.B)) {
            if (CurDNI == 0) {
                led.unplot(0, 4 - NowCur)
                if (Music[NowNote] != -1) {
                    led.plot(0, 4 - Music[NowNote])
                }
                NowCur += 1
                if (NowCur >= 5) {
                    NowCur = 4
                }
                led.plot(0, 4 - NowCur)
                CurDNI = 1
            }
        } else if (input.buttonIsPressed(Button.A)) {
            if (CurDNI == 0) {
                led.unplot(0, 4 - NowCur)
                if (Music[NowNote] != -1) {
                    led.plot(0, 4 - Music[NowNote])
                }
                NowCur += -1
                if (NowCur < 0) {
                    NowCur = 0
                }
                led.plot(0, 4 - NowCur)
                CurDNI = 1
            }
        } else if (input.buttonIsPressed(Button.AB)) {
            ABP = NowCur
        } else {
            CurDNI = 1
        }
        basic.pause(10)
    }
    if (1 <= value && value < 2) {
        if (ABP == 0) {
            CNC += 1
        } else {
            CNC += -1
        }
    } else if (2 <= value && value < 3) {
        if (ABP == 1) {
            CNC += 1
        } else {
            CNC += -1
        }
    } else if (3 <= value && value < 4) {
        if (ABP == 2) {
            CNC += 1
        } else {
            CNC += -1
        }
    } else if (4 <= value && value < 5) {
        if (ABP == 3) {
            CNC += 1
        } else {
            CNC += -1
        }
    } else if (5 <= value && value < 6) {
        if (ABP == 4) {
            CNC += 1
        } else {
            CNC += -1
        }
    }
    NowNote += 1
    music.stopMelody(MelodyStopOptions.All)
}
basic.showNumber(CNC)
while (true) {
	
}
