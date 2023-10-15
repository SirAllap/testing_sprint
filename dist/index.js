"use strict"
class Room {
    constructor(name, bookings, rate, discount) {
        this.isOccupied = (date) => {
            const myDate = new Date(date).getTime()
            if (!isNaN(myDate)) {
                for (let i = 0;i < this.bookings.length;i++) {
                    const startDate = new Date(this.bookings[i].checkIn).getTime()
                    const endDate = new Date(this.bookings[i].checkOut).getTime()
                    if (myDate >= startDate && myDate <= endDate) {
                        return true
                    }
                }
                return false
            }
            throw 'You introduce a invalid date'
        }
        this.occupancyPercentage = (startingDate, endingDate) => {
            const startDate = new Date(startingDate)
            const endDate = new Date(endingDate)
            let sumOneDay = 0
            const daysInMonth = (year, month) => new Date(year, month, 0).getDate()
            if (daysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) !==
                31) {
                sumOneDay = 1
            }
            const totalDaysInrange = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000) +
                sumOneDay
            let occupiedDays = 0
            for (let i = startDate;i <= endDate;i.setDate(i.getDate() + 1)) {
                if (this.isOccupied(new Date(i).toISOString())) {
                    occupiedDays++
                }
            }
            const percentage = (occupiedDays / totalDaysInrange) * 100
            return parseFloat(percentage.toFixed(1))
        }
        this.name = name
        this.bookings = bookings
        this.rate = rate
        this.discount = discount
    }
}
Room.totalOccupancyPercentage = (rooms, startDate, endDate) => {
    if (!Array.isArray(rooms) ||
        rooms.every((room) => !(room instanceof Room))) {
        return 'Invalid date'
    }
    function countDays(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000
        return Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)) + 1
    }
    let totalOccupiedDays = 0
    let totalDaysInRange = countDays(new Date(startDate), new Date(endDate))
    if (totalDaysInRange === 0) {
        return 0
    }
    rooms.forEach((room) => {
        totalOccupiedDays += room.occupancyPercentage(startDate, endDate)
    })
    const percentage = (totalOccupiedDays / rooms.length).toFixed(1)
    return parseFloat(percentage)
}
Room.availableRooms = (rooms, startDate, endDate) => {
    const range = checkRange(startDate, endDate)
    let emptyRoomsArr = []
    rooms.forEach((room) => {
        let isRoomEmpty = true
        range.forEach((day) => {
            if (room.isOccupied(day)) {
                isRoomEmpty = false
            }
        })
        if (isRoomEmpty) {
            emptyRoomsArr.push(room.name)
        }
    })
    if (emptyRoomsArr.length > 0) {
        return emptyRoomsArr
    }
    else {
        return 'No available room within the given range'
    }
}
class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.getFee = () => {
            const currentPrice = this.name.room.name.rate
            const currentRoomDiscount = this.name.room.name.discount
            const currentBookingDiscount = this.name.discount
            let priceWithDiscount = 0
            if (currentRoomDiscount !== 0 && currentBookingDiscount !== 0) {
                return (priceWithDiscount =
                    currentPrice -
                    (currentPrice *
                        (currentBookingDiscount + currentRoomDiscount)) /
                    100)
            }
            else if (currentRoomDiscount !== 0) {
                return (priceWithDiscount =
                    currentPrice - (currentPrice * currentRoomDiscount) / 100)
            }
            else if (currentBookingDiscount !== 0) {
                return (priceWithDiscount =
                    currentPrice - (currentPrice * currentBookingDiscount) / 100)
            }
            else
                return 'No discount available to be applied'
        }
        this.name = name
        this.email = email
        this.checkIn = checkIn
        this.checkOut = checkOut
        this.discount = discount
        this.room = room
    }
}
module.exports = {
    Room,
    Booking,
}
function checkRange(startDate, endDate) {
    const startdate = new Date(startDate)
    const enddate = new Date(endDate)
    const fulldays = []
    for (let date = startdate;date <= enddate;date.setDate(date.getDate() + 1)) {
        fulldays.push(new Date(date).toISOString())
    }
    return fulldays
}
//# sourceMappingURL=index.js.map