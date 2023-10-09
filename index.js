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

        const totalDaysInrange = (endDate - startDate) / (24 * 60 * 60 * 1000) + 1

        let occupiedDays = 0
        for (let i = startDate;i <= endDate;i.setDate(i.getDate() + 1)) {
            if (this.isOccupied(i)) {
                occupiedDays++
            }
        }
        const percentage = (occupiedDays / totalDaysInrange) * 100
        return parseFloat(percentage.toFixed(1))
    }
    static totalOccupancyPercentage(rooms, startDate, endDate) {
        let allPercentages = 0
        rooms.forEach((room) => {
            allPercentages += room.occupancyPercentage(startDate, endDate)
        })
        const totalPercentage = allPercentages / rooms.length
        return totalPercentage
    }
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
