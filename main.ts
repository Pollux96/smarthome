input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Happy)
    pins.servoWritePin(AnalogPin.P8, 110)
    pins.servoWritePin(AnalogPin.P9, 180)
})
input.onButtonPressed(Button.B, function () {
    pins.servoWritePin(AnalogPin.P8, 0)
    pins.servoWritePin(AnalogPin.P9, 0)
})
basic.showIcon(IconNames.Yes)
music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
pins.servoSetPulse(AnalogPin.P9, 1500)
pins.servoWritePin(AnalogPin.P9, 0)
pins.setPull(DigitalPin.P15, PinPullMode.PullNone)
pins.setPull(DigitalPin.P16, PinPullMode.PullNone)
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.ShowString("Hallo Max und", 0, 0)
I2C_LCD1602.ShowString("Stefan", 0, 1)
basic.pause(5000)
I2C_LCD1602.clear()
serial.redirectToUSB()
basic.forever(function () {
    serial.writeValue("Temperatur", input.temperature())
    serial.writeValue("Feuchtigkeit", dht11_dht22.readData(dataType.humidity))
    I2C_LCD1602.ShowString("Temp:", 0, 0)
    I2C_LCD1602.ShowNumber(input.temperature(), 5, 0)
    I2C_LCD1602.ShowString("C°", 10, 0)
    I2C_LCD1602.ShowString("Feucht:", 0, 1)
    I2C_LCD1602.ShowNumber(dht11_dht22.readData(dataType.humidity), 10, 1)
    I2C_LCD1602.ShowString("%", 11, 1)
    basic.pause(2000)
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
        basic.pause(60000)
        pins.digitalWritePin(DigitalPin.P15, 0)
    }
})
