const { Room, Booking } = require('./index.js')

describe('Testing class Room', () => {
    test('isOccupied: returns true when the room is occupied on a given date', () => {
        const room = {
            name: 'Room: 1',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking(
            'booking 1',
            'booking1@bo.com',
            '2023-10-01',
            '2023-10-06',
            10,
            room
        )
        const booking2 = new Booking(
            'booking 2',
            'booking1@bo.com',
            '2023-10-07',
            '2023-10-15',
            10,
            room
        )
        const bookings = [booking1, booking2]
        const room1 = new Room(room.name, bookings, room.rate, room.discount)
        const isOccupiedTest = room1.isOccupied('2023-10-10')
        expect(isOccupiedTest).toBeTruthy()
    })
    test('isOccupied: returns false when the room is occupied on a given date ', () => {
        const room = {
            name: 'Room: 1',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking(
            'booking 1',
            'booking1@bo.com',
            '2023-10-01',
            '2023-10-06',
            10,
            room
        )
        const booking2 = new Booking(
            'booking 2',
            'booking1@bo.com',
            '2023-10-07',
            '2023-10-31',
            10,
            room
        )
        const bookings = [booking1, booking2]
        const room1 = new Room(room.name, bookings, room.rate, room.discount)
        const isOccupiedTest1 = room1.isOccupied('2023-11-03')
        expect(isOccupiedTest1).toBeFalsy()
    })
    test('isOccupied: returns `You introduce a invalid date` if the introduced data is not a valid date', () => {
        const room = {
            name: 'Room: 1',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking(
            'booking 1',
            'booking1@bo.com',
            '2023-10-01',
            '2023-10-06',
            10,
            room
        )
        const booking2 = new Booking(
            'booking 2',
            'booking1@bo.com',
            '2023-10-07',
            '2023-10-15',
            10,
            room
        )
        const bookings = [booking1, booking2]
        const room2 = new Room(room.name, bookings, room.rate, room.discount)
        expect(() => { room2.isOccupied('whatever is not a real date') }).toThrow('You introduce a invalid date')
    })
    test('occupancyPercentage: returns the percentage of days occupied based on the date range we provide', () => {
        const room = {
            name: 'Room: 1',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking(
            'booking 1',
            'booking1@bo.com',
            '2023-10-01',
            '2023-10-15',
            10,
            room
        )
        const booking2 = new Booking(
            'booking 2',
            'booking1@bo.com',
            '2023-10-16',
            '2023-10-31',
            10,
            room
        )
        const bookings = [booking1, booking2]
        const booking3 = new Booking(
            'booking 3',
            'booking1@bo.com',
            '2024-01-31',
            '2024-02-09',
            10,
            room
        )
        const booking4 = new Booking(
            'booking 4',
            'booking1@bo.com',
            '2024-02-10',
            '2024-03-10',
            10,
            room
        )
        const bookings1 = [booking3, booking4]

        const room3 = new Room(room.name, bookings, room.rate, room.discount)
        const roomEarlier = new Room(
            room.name,
            bookings1,
            room.rate,
            room.discount
        )
        const percentageNumber = room3.occupancyPercentage(
            '2023-10-01',
            '2023-10-31'
        )
        const percentageNumber2 = room3.occupancyPercentage(
            '2023-10-01',
            '2023-11-15'
        )
        const percentageNumber3 = room3.occupancyPercentage(
            '2023-09-01',
            '2023-12-31'
        )
        const percentageNumber4 = room3.occupancyPercentage(
            '2023-11-26',
            '2023-09-01'
        )
        const percentageNumber5 = roomEarlier.occupancyPercentage(
            '2024-01-01',
            '2024-04-01'
        )
        expect(percentageNumber).toBe(100)
        expect(percentageNumber2).toBe(66.7)
        expect(percentageNumber3).toBe(24.6)
        expect(percentageNumber4).toBe(0)
        expect(percentageNumber5).toBe(44)
    })
    test('totalOccupancyPercentage: returns 50 if the dates passed occupy 50% of the range', () => {
        const roomA = {
            name: 'Room: 2',
            rate: 150,
            discount: 10,
        }

        const booking1 = new Booking(
            'booking 1',
            'bok@bok.es',
            '2023-09-01',
            '2023-09-06',
            10,
            roomA
        )

        const booking2 = new Booking(
            'booking 2',
            'bok2@bok.es',
            '2023-09-07',
            '2023-09-15',
            10,
            roomA
        )

        const bookingsA = [booking1, booking2]

        const roomB = {
            name: 'Room: 3',
            rate: 150,
            discount: 10,
        }

        const booking3 = new Booking(
            'booking 3',
            'bok@bok.es',
            '2023-09-16',
            '2023-09-22',
            10,
            roomB
        )

        const booking4 = new Booking(
            'booking 4',
            'bok2@bok.es',
            '2023-09-23',
            '2023-09-30',
            10,
            roomB
        )

        const bookingsB = [booking3, booking4]

        const room1 = new Room(
            roomA.name,
            bookingsA,
            roomA.rate,
            roomA.discount
        )
        const room2 = new Room(
            roomB.name,
            bookingsB,
            roomB.rate,
            roomB.discount
        )

        const roomArray = [room1, room2]

        const percentage = Room.totalOccupancyPercentage(
            roomArray,
            '2023-09-01',
            '2023-09-30'
        )

        expect(percentage).toBe(50)
    })
    test('totalOccupancyPercentage: returns 100 if the dates passed occupy 100% of the range', () => {
        const roomA = {
            name: 'Room: 2',
            rate: 150,
            discount: 10,
        }

        const booking1 = new Booking(
            'booking 1',
            'bok@bok.es',
            '2023-09-01',
            '2023-09-06',
            10,
            roomA
        )

        const booking2 = new Booking(
            'booking 2',
            'bok2@bok.es',
            '2023-09-07',
            '2023-09-15',
            10,
            roomA
        )

        const bookingsA = [booking1, booking2]

        const roomB = {
            name: 'Room: 3',
            rate: 150,
            discount: 10,
        }

        const booking3 = new Booking(
            'booking 3',
            'bok@bok.es',
            '2023-09-01',
            '2023-09-06',
            10,
            roomB
        )

        const booking4 = new Booking(
            'booking 4',
            'bok2@bok.es',
            '2023-09-07',
            '2023-09-15',
            10,
            roomB
        )

        const bookingsB = [booking3, booking4]

        const room1 = new Room(
            roomA.name,
            bookingsA,
            roomA.rate,
            roomA.discount
        )
        const room2 = new Room(
            roomB.name,
            bookingsB,
            roomB.rate,
            roomB.discount
        )

        const roomArray = [room1, room2]

        const percentage = Room.totalOccupancyPercentage(
            roomArray,
            '2023-09-01',
            '2023-09-15'
        )

        expect(percentage).toBe(100)
    })
    test('totalOccupancyPercentage: returns 0 if the dates passed occupy 0% of the range', () => {
        const roomA = {
            name: 'Room: 2',
            rate: 150,
            discount: 10,
        }

        const booking1 = new Booking(
            'booking 1',
            'bok@bok.es',
            '2023-09-01',
            '2023-09-06',
            10,
            roomA
        )

        const booking2 = new Booking(
            'booking 2',
            'bok2@bok.es',
            '2023-09-07',
            '2023-09-15',
            10,
            roomA
        )

        const bookingsA = [booking1, booking2]

        const roomB = {
            name: 'Room: 3',
            rate: 150,
            discount: 10,
        }

        const booking3 = new Booking(
            'booking 3',
            'bok@bok.es',
            '2023-09-16',
            '2023-09-22',
            10,
            roomB
        )

        const booking4 = new Booking(
            'booking 4',
            'bok2@bok.es',
            '2023-09-23',
            '2023-09-30',
            10,
            roomB
        )

        const bookingsB = [booking3, booking4]

        const room1 = new Room(
            roomA.name,
            bookingsA,
            roomA.rate,
            roomA.discount
        )
        const room2 = new Room(
            roomB.name,
            bookingsB,
            roomB.rate,
            roomB.discount
        )

        const roomArray = [room1, room2]

        const percentage = Room.totalOccupancyPercentage(
            roomArray,
            '2023-10-01',
            '2023-10-15'
        )

        expect(percentage).toBe(0)
    })
    test('totalOccupancyPercentage: returns `Invalid date` if the introduced data is not a valid date', () => {
        const fakeData = ['hola', 'mundo']

        const percentage = Room.totalOccupancyPercentage(
            fakeData,
            'hola',
            'mundo'
        )
        const percentage1 = Room.totalOccupancyPercentage({}, [], '2023-10-15')
        const percentage2 = Room.totalOccupancyPercentage(
            'hola',
            '2023-10-15',
            'mundo'
        )
        const percentage3 = Room.totalOccupancyPercentage(
            fakeData,
            '2023-10-01',
            '2023-10-15'
        )

        expect(percentage).toBe('Invalid date')
        expect(percentage1).toBe('Invalid date')
        expect(percentage2).toBe('Invalid date')
        expect(percentage3).toBe('Invalid date')
    })
    test('availableRooms:returns an array with all the rooms that are not occupied by the given date', () => {
        const roomA = {
            name: 'Room: 2',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking(
            'booking 1',
            'bok@bok.es',
            '2023-09-01',
            '2023-09-06',
            10,
            roomA
        )
        const booking2 = new Booking(
            'booking 2',
            'bok2@bok.es',
            '2023-09-07',
            '2023-09-15',
            10,
            roomA
        )
        const bookingsA = [booking1, booking2]

        const roomB = {
            name: 'Room: 3',
            rate: 150,
            discount: 10,
        }
        const booking3 = new Booking(
            'booking 3',
            'bok@bok.es',
            '2023-09-01',
            '2023-09-02',
            10,
            roomB
        )
        const booking4 = new Booking(
            'booking 4',
            'bok2@bok.es',
            '2023-09-03',
            '2023-09-05',
            10,
            roomB
        )
        const bookingsB = [booking3, booking4]

        const roomC = {
            name: 'Room: 4',
            rate: 150,
            discount: 10,
        }
        const booking5 = new Booking(
            'booking 5',
            'bok@bok.es',
            '2023-12-01',
            '2023-12-14',
            10,
            roomB
        )
        const booking6 = new Booking(
            'booking 6',
            'bok2@bok.es',
            '2023-12-15',
            '2023-12-31',
            10,
            roomB
        )
        const bookingsC = [booking5, booking6]

        const room2 = new Room(
            roomA.name,
            bookingsA,
            roomA.rate,
            roomA.discount
        )
        const room3 = new Room(
            roomB.name,
            bookingsB,
            roomB.rate,
            roomB.discount
        )
        const room4 = new Room(
            roomC.name,
            bookingsC,
            roomC.rate,
            roomC.discount
        )
        const roomArray = [room2, room3, room4]
        const arrayEmptyRooms = Room.availableRooms(
            roomArray,
            '2023-10-01',
            '2023-10-15'
        )

        expect(arrayEmptyRooms).toEqual(['Room: 2', 'Room: 3', 'Room: 4'])
    })
    test('availableRooms: returns `No available room within the given range` if the rooms are occupied during the provided date range.', () => {
        const roomA = {
            name: 'Room: 2',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking(
            'booking 1',
            'bok@bok.es',
            '2023-09-15',
            '2023-09-30',
            10,
            roomA
        )
        const booking2 = new Booking(
            'booking 2',
            'bok2@bok.es',
            '2023-10-01',
            '2023-10-07',
            10,
            roomA
        )
        const bookingsA = [booking1, booking2]

        const room1 = new Room(
            roomA.name,
            bookingsA,
            roomA.rate,
            roomA.discount
        )
        const roomArray = [room1]
        const arrayEmptyRooms = Room.availableRooms(
            roomArray,
            '2023-10-01',
            '2023-10-15'
        )

        expect(arrayEmptyRooms).toBe('No available room within the given range')
    })
})

describe('Testing class Booking', () => {
    test('getFee: returns the fee with 10% discount from the room', () => {
        const deluxeRoom = new Room({
            name: 'Deluxe-Room',
            rate: 790,
            discount: 10,
        })
        const deluxeBooking = new Booking({
            name: 'David PR',
            email: 'david.pr.developer@gmail.com',
            checkIn: '2023-10-10',
            checkOut: '2023-10-11',
            discount: 0,
            room: deluxeRoom,
        })
        expect(deluxeBooking.getFee()).toBe(711)
    })
    test('getFee: returns the fee with 10% discount from the booking', () => {
        const deluxeRoom = new Room({
            name: 'Deluxe-Room',
            rate: 790,
            discount: 0,
        })
        const deluxeBooking = new Booking({
            name: 'David PR',
            email: 'david.pr.developer@gmail.com',
            checkIn: '2023-10-10',
            checkOut: '2023-10-11',
            discount: 20,
            room: deluxeRoom,
        })
        expect(deluxeBooking.getFee()).toBe(632)
    })
    test('getFee: returns the fee with 10% discount from the room + 5% from the booking', () => {
        const deluxeRoom = new Room({
            name: 'Deluxe-Room',
            rate: 790,
            discount: 10,
        })
        const deluxeBooking = new Booking({
            name: 'David PR',
            email: 'david.pr.developer@gmail.com',
            checkIn: '2023-10-10',
            checkOut: '2023-10-11',
            discount: 5,
            room: deluxeRoom,
        })
        expect(deluxeBooking.getFee()).toBe(671.5)
    })
    test('getFee: returns `No discount available to be applied` if there is not discounts to be applied', () => {
        const deluxeRoom = new Room({
            name: 'Deluxe-Room',
            rate: 790,
            discount: 0,
        })
        const deluxeBooking = new Booking({
            name: 'David PR',
            email: 'david.pr.developer@gmail.com',
            checkIn: '2023-10-10',
            checkOut: '2023-10-11',
            discount: 0,
            room: deluxeRoom,
        })
        expect(deluxeBooking.getFee()).toBe('No discount available to be applied')
    })

})
