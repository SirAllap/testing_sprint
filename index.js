class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name
        this.bookings = bookings
        this.rate = rate
        this.discount = discount
    }

    isOccupied(date) {
        return this.bookings.some(booking => booking.date === date)
    }

    occupancyPercentage(startDate, endDate) {
        const convert = date => new Date(date).getTime()
        const oneDayInMillisecs = 24 * 60 * 60 * 1000
        const nightCount = (convert(endDate) - convert(startDate)) / oneDayInMillisecs
        if (convert(startDate) <= convert(this.bookings[0].date) && convert(endDate) >= convert(this.bookings[this.bookings.length - 1].date)) {
            return Math.ceil((this.bookings.length * 100) / nightCount)
        } else {
            throw new Error('Date range is outside the booking range.')
        }
    }
}

module.exports = Room