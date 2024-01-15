/*
    1. Create a event of your choice.
    2. Log the newly created event. (Just that event, not all events)
    3. Create another event of your choice.
    4. Query all events, and log them all
    5. Create the 3rd event of your choice.
    6. Log the newly created 3rd event. (Just that event, not all events)
    7. Rename the first event
    8. Log the first event with the updated name. 
    9. Remove the second event you created.
    10. Query all events, and log them all
    11. Try to create an event with bad input parameters to make sure it throws errors.
    12. Try to remove an event that does not exist to make sure it throws errors.
    13. Try to rename an event that does not exist to make sure it throws errors.
    14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
    15. Try getting an event by ID that does not exist to make sure it throws errors.
*/
import * as event from './data/events.js'
import * as connect from './config/mongoConnection.js'


const db = await connect.dbConnection();
await db.dropDatabase();

console.log(await event.create("aaaaa's Big End of Summer BBQ", "Come join us for our yearly end of summer bbq!", 
{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "OK", zip: "07030"}, "phill@stevens.edu",
30, 0, "08/25/2024", "2:00PM", "8:00PM", false))

console.log(await event.create("Patrick's Big End of Summer BBQ", "Come join us for our yearly end of summer bbq!", 
{streetAddress: "1 Castle Point Terrace", city: "Hoboken", state: "NJ", zip: "07030"}, "phill@stevens.edu",
30, 20, "08/25/2024", "2:00PM", "8:00PM", false))

console.log(await event.create("Aiden's Birthday Bash", "   Aiden turns 5 and you're all invited!", 
{streetAddress: "2 Castle Point Terrace", city: "Hoboken", state: "NY", zip: "07030"}, "ahill@stevens.edu",
15, 0, "09/04/2024", "1:00PM", "4:00PM", false))


// console.log(await event.create("     Juniper Sky reunion concert!", "The boys of Juniper Sky reunite for a one night only show at The Chance Theater in Poughkeepsie NY!", 
// {streetAddress: "6 Crannell St   ", city: "Poughkeepsie", state: "nj", zip: "12601"}, "js@juniperskyrocks.com",
// 90, 1225, "10/15/2023", "11:50AM", "12:50PM", true))


console.log(await event.getAll())

// console.log(await event.get('652affc04b8faced92465474'))
// console.log(await event.remove('652affc04b8faced92465479          '))
// console.log(await event.rename('652affc04b8faced92465473    ', 'go000'))

await connect.closeConnection();