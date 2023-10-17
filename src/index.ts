interface InterfaceRoom {
	name: string
	bookings: Booking[]
	rate: number
	discount: number
}

export class Room implements InterfaceRoom {
	name: string
	bookings: Booking[]
	rate: number
	discount: number

	constructor(
		name: string,
		bookings: Booking[],
		rate: number,
		discount: number
	) {
		this.name = name
		this.bookings = bookings
		this.rate = rate
		this.discount = discount
	}

	isOccupied = (date: string): boolean => {
		const myDate = new Date(date).getTime()
		if (!isNaN(myDate)) {
			for (let i: number = 0; i < this.bookings.length; i++) {
				const startDate: number = new Date(
					this.bookings[i].checkIn
				).getTime()
				const endDate: number = new Date(
					this.bookings[i].checkOut
				).getTime()
				if (myDate >= startDate && myDate <= endDate) {
					return true
				}
			}
			return false
		}
		throw 'You introduce a invalid date'
	}

	occupancyPercentage = (
		startingDate: string,
		endingDate: string
	): number => {
		const startDate = new Date(startingDate)
		const endDate = new Date(endingDate)

		let sumOneDay = 0
		const daysInMonth = (year: number, month: number) =>
			new Date(year, month, 0).getDate()
		if (
			daysInMonth(startDate.getFullYear(), startDate.getMonth() + 1) !==
			31
		) {
			sumOneDay = 1
		}

		const totalDaysInrange =
			(endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000) +
			sumOneDay

		let occupiedDays = 0
		for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
			if (this.isOccupied(new Date(i).toISOString())) {
				occupiedDays++
			}
		}
		const percentage = (occupiedDays / totalDaysInrange) * 100
		return parseFloat(percentage.toFixed(1))
	}

	static totalOccupancyPercentage = (
		rooms: Room[],
		startDate: string,
		endDate: string
	): number | string => {
		if (
			!Array.isArray(rooms) ||
			rooms.every((room) => !(room instanceof Room))
		) {
			return 'Invalid date'
		}

		function countDays(startDate: Date, endDate: Date) {
			const oneDay = 24 * 60 * 60 * 1000
			return (
				Math.round(
					Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
				) + 1
			)
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

	static availableRooms = (
		rooms: Room[],
		startDate: string,
		endDate: string
	): string | string[] => {
		const range = checkRange(startDate, endDate)
		let emptyRoomsArr: string[] = []

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
		} else {
			return 'No available room within the given range'
		}
	}
}

type RoomType = {
	name: string
	rate: number
	discount: number
}

interface InterfaceBooking {
	name: string
	email: string
	checkIn: string | Date
	checkOut: string | Date
	discount: number
	room: RoomType
}

export class Booking implements InterfaceBooking {
	name: string
	email: string
	checkIn: string
	checkOut: string
	discount: number
	room: RoomType

	constructor(
		name: string,
		email: string,
		checkIn: string,
		checkOut: string,
		discount: number,
		room: RoomType
	) {
		this.name = name
		this.email = email
		this.checkIn = checkIn
		this.checkOut = checkOut
		this.discount = discount
		this.room = room
	}
	getFee = () => {
		const currentPrice = this.room.rate
		const currentRoomDiscount = this.room.discount
		const currentBookingDiscount = this.discount
		if (currentRoomDiscount !== 0 && currentBookingDiscount !== 0) {
			return (
				currentPrice -
				(currentPrice *
					(currentBookingDiscount + currentRoomDiscount)) /
					100
			)
		} else if (currentRoomDiscount !== 0) {
			return currentPrice - (currentPrice * currentRoomDiscount) / 100
		} else if (currentBookingDiscount !== 0) {
			return currentPrice - (currentPrice * currentBookingDiscount) / 100
		} else return 'No discount available to be applied'
	}
}

function checkRange(startDate: string, endDate: string): string[] {
	const startdate = new Date(startDate)
	const enddate = new Date(endDate)
	const fulldays: string[] = []

	for (
		let date = startdate;
		date <= enddate;
		date.setDate(date.getDate() + 1)
	) {
		fulldays.push(new Date(date).toISOString())
	}

	return fulldays
}
