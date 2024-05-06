// Import the functions to test
import { displayProducts, displayProductsForShop } from "./firebaseFunctions";

// Mock Firebase database operations
jest.mock("https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js", () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    get: jest.fn(),
}));

describe("displayProducts function", () => {
    it("should fetch and display products", async () => {
        // Mock the data returned from the database
        const mockSnapshot = {
            exists: jest.fn().mockReturnValue(true),
            forEach: jest.fn((callback) => {
                // Mock product data
                const productData = {
                    productName: "Test Product",
                    description: "Test Description",
                    productPrice: "$10",
                };
                // Call the callback function with the mocked product data
                callback({
                    val: jest.fn().mockReturnValue(productData),
                });
            }),
        };

        // Mock the Firebase database reference
        const mockRef = jest.fn();
        mockRef.mockReturnValue({
            then: jest.fn().mockResolvedValue(mockSnapshot),
        });

        // Mock the Firebase database
        const mockDatabase = jest.fn();
        mockDatabase.mockReturnValue({
            ref: mockRef,
        });

        // Mock the Firebase database functions
        require("https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js").getDatabase.mockReturnValue(mockDatabase);

        // Call the function to test
        await displayProducts();

        // Add your assertions here
        // For example, check if the product elements are correctly displayed
    });
});

describe("displayProductsForShop function", () => {
    it("should fetch and display products for a shop", async () => {
        // Mock the data returned from the database
        const mockSnapshot = {
            exists: jest.fn().mockReturnValue(true),
            forEach: jest.fn((callback) => {
                // Mock product data
                const productData = {
                    productName: "Test Product",
                    description: "Test Description",
                    productPrice: "$10",
                };
                // Call the callback function with the mocked product data
                callback({
                    val: jest.fn().mockReturnValue(productData),
                });
            }),
        };

        // Mock the Firebase database reference
        const mockRef = jest.fn();
        mockRef.mockReturnValue({
            then: jest.fn().mockResolvedValue(mockSnapshot),
        });

        // Mock the Firebase database
        const mockDatabase = jest.fn();
        mockDatabase.mockReturnValue({
            ref: mockRef,
        });

        // Mock the Firebase database functions
        require("https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js").getDatabase.mockReturnValue(mockDatabase);

        // Call the function to test
        await displayProductsForShop("Test Shop");

        // Add your assertions here
        // For example, check if the product elements for the shop are correctly displayed
    });
});
