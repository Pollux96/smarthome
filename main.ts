input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P8, 110)
    pins.servoWritePin(AnalogPin.P9, 180)
})
input.onButtonPressed(Button.AB, function () {
    if (kühlung_stop == 1) {
        kühlung_stop = 0
    } else {
        kühlung_stop = 1
    }
})
input.onButtonPressed(Button.B, function () {
    pins.servoWritePin(AnalogPin.P8, 0)
    pins.servoWritePin(AnalogPin.P9, 0)
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_EVT_ANY, function () {
    if (dht11_dht22.readDataSuccessful()) {
        I2C_LCD1602.ShowString("Temp:", 0, 0)
        temperatur = dht11_dht22.readData(dataType.temperature)
        I2C_LCD1602.ShowNumber(temperatur, 5, 0)
        I2C_LCD1602.ShowString("C°", 10, 0)
        I2C_LCD1602.ShowString("Feucht:", 0, 1)
        I2C_LCD1602.ShowNumber(dht11_dht22.readData(dataType.humidity), 7, 1)
        I2C_LCD1602.ShowString("%", 11, 1)
    }
    basic.pause(2000)
})
let temperatur = 0
let kühlung_stop = 0
basic.showIcon(IconNames.Yes)
music.playTone(440, music.beat(BeatFraction.Whole))
pins.servoSetPulse(AnalogPin.P9, 1500)
pins.servoWritePin(AnalogPin.P9, 0)
pins.setPull(DigitalPin.P15, PinPullMode.PullNone)
pins.setPull(DigitalPin.P16, PinPullMode.PullNone)
pins.digitalWritePin(DigitalPin.P12, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
let strip = neopixel.create(DigitalPin.P14, 4, NeoPixelMode.RGB)
strip.showRainbow(1, 360)
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.ShowString("Hallo Max und", 0, 0)
I2C_LCD1602.ShowString("Stefan", 0, 1)
basic.pause(2000)
I2C_LCD1602.clear()
basic.forever(function () {
    control.raiseEvent(
    EventBusSource.MICROBIT_ID_IO_P1,
    EventBusValue.MICROBIT_EVT_ANY
    )
    basic.pause(2000)
})
basic.forever(function () {
    strip.rotate(1)
    strip.show()
    basic.pause(100)
})
basic.forever(function () {
    basic.pause(500)
    if (pins.analogReadPin(AnalogPin.P0) < 150) {
        pins.servoWritePin(AnalogPin.P8, 110)
    } else if (pins.analogReadPin(AnalogPin.P0) > 500) {
        pins.servoWritePin(AnalogPin.P8, 0)
    } else if (pins.analogReadPin(AnalogPin.P0) > 200) {
        pins.servoWritePin(AnalogPin.P8, 55)
    } else {
    	
    }
})
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P16) == 1) {
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(30000)
        pins.digitalWritePin(DigitalPin.P15, 0)
    }
})
basic.forever(function () {
    if (temperatur >= 30 && kühlung_stop == 0) {
        pins.digitalWritePin(DigitalPin.P13, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P13, 0)
    }
})
