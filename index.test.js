const { Room, Booking } = require('./index.js')

describe('Testing class Room', () => {
    it('isOccupied is true cuando la habitacion esta ocupada en una fecha dada', () => {
        const room = {
            name: 'Habitacion 1',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room)
        const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room)
        const bookings = [
            booking1,
            booking2,
        ]
        const room1 = new Room(room.name, bookings, room.rate, room.discount)
        const isOccupiedTest1 = room1.isOccupied('2023-10-10')
        expect(isOccupiedTest1).toBeTruthy()
    })
    it('isOccupied is false cuando la habitacion no esta ocupada en una fecha dada ', () => {
        const room = {
            name: 'Habitacion 1',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room)
        const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room)
        const bookings = [
            booking1,
            booking2,
        ]
        const room1 = new Room(room.name, bookings, room.rate, room.discount)
        const isOccupiedTest1 = room1.isOccupied('2023-10-18')
        expect(isOccupiedTest1).toBeFalsy()

    })
    it('isOccupied is boolean sin importar el dato que le pasemos', () => {
        const room = {
            name: 'Habitacion 1',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking('booking 1', 'booking1@bo.com', '2023-10-01', '2023-10-06', 10, room)
        const booking2 = new Booking('booking 2', 'booking1@bo.com', '2023-10-07', '2023-10-15', 10, room)
        const bookings = [
            booking1,
            booking2,
        ]
        const room2 = new Room(room.name, bookings, room.rate, room.discount)
        const isOccupiedTest1 = room2.isOccupied('Hola')
        const isOccupiedTest2 = room2.isOccupied(0)
        expect(typeof isOccupiedTest1).toBe('boolean')
        expect(typeof isOccupiedTest2).toBe('boolean')
    })
    it('occupancyPercentage nos retorna el porcentaje de dias ocupado, segun el rango de fechas que pasemos', () => {
        const room = {
            name: 'Habitacion 1',
            rate: 150,
            discount: 10,
        }
        const booking1 = new Booking(
            'booking 1',
            'booking1@bo.com',
            '2023-09-01',
            '2023-09-15',
            10,
            room)
        const booking2 = new Booking(
            'booking 2',
            'booking1@bo.com',
            '2023-09-16',
            '2023-09-30',
            10,
            room)
        const bookings = [
            booking1,
            booking2,
        ]

        const room3 = new Room(room.name, bookings, room.rate, room.discount)
        const percentageNumber = room3.occupancyPercentage(
            '2023-09-01',
            '2023-09-30'
        )
        const percentageNumber2 = room3.occupancyPercentage(
            '2023-09-01',
            '2023-10-15'
        )
        const percentageNumber3 = room3.occupancyPercentage(
            '2023-09-01',
            '2023-12-31'
            //?October has 31 days and we are trying to count 30 days every month, in this case if we put the last day of December, 31, we will have to sum 2 more days to our calculation.
        )
        const percentageNumber4 = room3.occupancyPercentage(
            '2023-11-26',
            '2023-09-01'
        )
        expect(percentageNumber).toBe(100)
        expect(percentageNumber2).toBe(66.7)
        expect(percentageNumber3).toBe(24.6)
        expect(percentageNumber4).toBe(0)
    })
    // test("totalOccupancyPercentage tiene que devolver 50 si las fechas pasadas al metodo ocupan el 50% del rango", () => {
    //     const roomA = {
    //         name: "roomA",
    //         rate: 150,
    //         discount: 10,
    //     }

    //     const booking1 = new Booking(
    //         "booking 1",
    //         "bok@bok.es",
    //         "2023-09-01",
    //         "2023-09-06",
    //         10,
    //         roomA
    //     )

    //     const booking2 = new Booking(
    //         "booking 2",
    //         "bok2@bok.es",
    //         "2023-09-07",
    //         "2023-09-15",
    //         10,
    //         roomA
    //     )

    //     const bookingsA = [booking1, booking2]

    //     const roomB = {
    //         name: "roomB",
    //         rate: 150,
    //         discount: 10,
    //     }

    //     const booking3 = new Booking(
    //         "booking 3",
    //         "bok@bok.es",
    //         "2023-09-16",
    //         "2023-09-22",
    //         10,
    //         roomB
    //     )

    //     const booking4 = new Booking(
    //         "booking 4",
    //         "bok2@bok.es",
    //         "2023-09-23",
    //         "2023-09-30",
    //         10,
    //         roomB
    //     )

    //     const bookingsB = [booking3, booking4]

    //     const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount)
    //     const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount)

    //     const roomArray = [room1, room2]

    //     const percentage = Room.totalOccupancyPercentage(
    //         roomArray,
    //         "2023-09-01",
    //         "2023-09-30"
    //     )

    //     expect(percentage).toBe(50)
    // })
    // test("totalOccupancyPercentage tiene que devolver 100 si las fechas pasadas al metodo ocupan el 100% del rango", () => {
    //     const roomA = {
    //         name: "roomA",
    //         rate: 150,
    //         discount: 10,
    //     }

    //     const booking1 = new Booking(
    //         "booking 1",
    //         "bok@bok.es",
    //         "2023-09-01",
    //         "2023-09-06",
    //         10,
    //         roomA
    //     )

    //     const booking2 = new Booking(
    //         "booking 2",
    //         "bok2@bok.es",
    //         "2023-09-07",
    //         "2023-09-15",
    //         10,
    //         roomA
    //     )

    //     const bookingsA = [booking1, booking2]

    //     const roomB = {
    //         name: "roomB",
    //         rate: 150,
    //         discount: 10,
    //     }

    //     const booking3 = new Booking(
    //         "booking 3",
    //         "bok@bok.es",
    //         "2023-09-01",
    //         "2023-09-06",
    //         10,
    //         roomB
    //     )

    //     const booking4 = new Booking(
    //         "booking 4",
    //         "bok2@bok.es",
    //         "2023-09-07",
    //         "2023-09-15",
    //         10,
    //         roomB
    //     )

    //     const bookingsB = [booking3, booking4]

    //     const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount)
    //     const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount)

    //     const roomArray = [room1, room2]

    //     const percentage = Room.totalOccupancyPercentage(
    //         roomArray,
    //         "2023-09-01",
    //         "2023-09-15"
    //     )

    //     expect(percentage).toBe(100)
    // })
    // test("totalOccupancyPercentage tiene que devolver 0 si las fechas pasadas al metodo están fuera del rango", () => {
    //     const roomA = {
    //         name: "roomA",
    //         rate: 150,
    //         discount: 10,
    //     }

    //     const booking1 = new Booking(
    //         "booking 1",
    //         "bok@bok.es",
    //         "2023-09-01",
    //         "2023-09-06",
    //         10,
    //         roomA
    //     )

    //     const booking2 = new Booking(
    //         "booking 2",
    //         "bok2@bok.es",
    //         "2023-09-07",
    //         "2023-09-15",
    //         10,
    //         roomA
    //     )

    //     const bookingsA = [booking1, booking2]

    //     const roomB = {
    //         name: "roomB",
    //         rate: 150,
    //         discount: 10,
    //     }

    //     const booking3 = new Booking(
    //         "booking 3",
    //         "bok@bok.es",
    //         "2023-09-16",
    //         "2023-09-22",
    //         10,
    //         roomB
    //     )

    //     const booking4 = new Booking(
    //         "booking 4",
    //         "bok2@bok.es",
    //         "2023-09-23",
    //         "2023-09-30",
    //         10,
    //         roomB
    //     )

    //     const bookingsB = [booking3, booking4]

    //     const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount)
    //     const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount)

    //     const roomArray = [room1, room2]

    //     const percentage = Room.totalOccupancyPercentage(
    //         roomArray,
    //         "2023-10-01",
    //         "2023-10-15"
    //     )

    //     expect(percentage).toBe(0)
    // })
    // test("totalOccupancyPercentage tiene que devolver 0 si los datos pasados son cualquier otro dato erroneo", () => {
    //     const fakeData = ["hola", "mundo"]

    //     const percentage = Room.totalOccupancyPercentage(fakeData, "hola", "mundo")
    //     const percentage1 = Room.totalOccupancyPercentage({}, [], "2023-10-15")
    //     const percentage2 = Room.totalOccupancyPercentage("hola", "2023-10-15", "mundo")
    //     const percentage3 = Room.totalOccupancyPercentage(fakeData, "2023-10-01", "2023-10-15")

    //     expect(percentage).toBe(0)
    //     expect(percentage1).toBe(0)
    //     expect(percentage2).toBe(0)
    //     expect(percentage3).toBe(0)
    // })
})
