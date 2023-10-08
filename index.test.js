const Room = require('./index')

describe('Room occupied?', () => {
    test('isOccupied will be true if the provided date matches the current room occupancy.', () => {
        const fancyRoom = new Room('102', [{ date: '09-20-2023' }, { date: '09-21-2023' }, { date: '09-22-2023' }], 205, 5)
        const result = fancyRoom.isOccupied('09-21-2023')
        expect(result).toBeTruthy()
    })
    test("isOccupied will be false if the given date doesn't match the current room occupancy.", () => {
        const fancyRoom = new Room('102', [{ date: '09-20-2023' }, { date: '09-21-2023' }, { date: '09-22-2023' }], 205, 5)
        const result = fancyRoom.isOccupied('09-30-2023')
        expect(result).toBeFalsy()
    })
    test("occupancyPercentage, percentage occupancy of a certain room between two given dates", () => {
        const fancyRoom = new Room('102',
            [{ date: '2023-09-21' }, { date: '2023-09-22' }, { date: '2023-09-23' }, { date: '2023-09-23' }], 205, 5)
        const result = fancyRoom.occupancyPercentage('2023-09-20', '2023-09-26')
        expect(result).toBe(67)
    })
})