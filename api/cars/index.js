

// Import necessary modules
const cars = require('./cars.json');

module.exports = async function (context, req) {
    // Check the HTTP method
    switch (req.method) {
        case 'GET':
            // Handle GET request to retrieve all cars
            context.res = {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: cars

            };
            break;



        case 'POST':
            // Handle POST request to add a new car
            try {
                // Parse the incoming JSON data
                const newCar = req.body;
                if (!newCar) {
                    context.res = {
                        status: 400,
                        body: 'Invalid request. Please provide car data.'
                    };
                    return;
                }
                // Add the new car to the cars array
                cars.push(newCar);
                // Return a success response
                context.res = {
                    status: 201,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: newCar
                };
            } catch (error) {
                // Handle any errors that occur during the POST operation
                context.res = {
                    status: 500,
                    body: `Error adding car: ${error.message}`
                };
            }
            break;

        case 'DELETE':
            // Handle DELETE request to remove a car
            try {
                const index = parseInt(req.query.index); // Parse the index from the request query
                if (isNaN(index) || index < 0 || index >= cars.length) {
                    context.res = {
                    status: 400,
                    body: 'Invalid index provided.'
            };
            return;
        }
                cars.splice(index, 1);
                context.res = {
                    status: 200,
                    body: { message: `Car with index ${index} deleted successfully.` }
                };
            } catch (error) {
                // Handle any errors that occur during the DELETE operation
                context.res = {
                    status: 500,
                    body: `Error deleting car: ${error.message}`
                };
            }
            break;

        default:
            // Handle unsupported HTTP methods
            context.res = {
                status: 405,
                body: 'Method Not Allowed'
            };
            break;
    }
};