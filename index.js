class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name
        this.bookings = bookings
        this.rate = rate
        this.discount = discount
    }
    isOccupied(date) {
        const myDate = new Date(date)

        for (let i = 0;i < this.bookings.length;i++) {
            const startDate = new Date(this.bookings[i].checkIn)
            const endDate = new Date(this.bookings[i].checkOut)

            if (myDate >= startDate && myDate <= endDate) {
                return true
            }
        }
        return false
    }
    occupancyPercentage(startingDate, endingDate) {
        const startDate = new Date(startingDate)
        const endDate = new Date(endingDate)

        let sumOneDay = 0
        const daysInMonth = (year, month) => new Date(year, month, 0).getDate()
        if (daysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) === 31) {
            sumOneDay = 1
        }

        const totalDaysInrange = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000) + 1 + sumOneDay

        let occupiedDays = 0
        for (let i = startDate;i <= endDate;i.setDate(i.getDate() + 1)) {
            if (this.isOccupied(i)) {
                occupiedDays++
            }
        }
        const percentage = (occupiedDays / totalDaysInrange) * 100
        return parseFloat(percentage.toFixed(1))
    }
    // static totalOccupancyPercentage(rooms, startDate, endDate) {

    //     if (!Array.isArray(rooms) || rooms.every((room) => !(room instanceof Room))) {
    //         return 0
    //     }

    //     function countDays(startDate, endDate) {
    //         const oneDay = 24 * 60 * 60 * 1000
    //         return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1
    //     }

    //     let totalOccupiedDays = 0
    //     let totalDaysInRange = countDays(new Date(startDate), new Date(endDate))

    //     if (totalDaysInRange === 0) {
    //         return 0
    //     }

    //     rooms.forEach((room) => {
    //         totalOccupiedDays += room.occupancyPercentage(startDate, endDate)
    //     })

    //     const percentage = (totalOccupiedDays / rooms.length).toFixed(1)

    //     return parseFloat(percentage)
    // }
}

class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
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
    Booking
}
