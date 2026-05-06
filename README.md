Student Finance Command Center

This project is a full stack web application designed to help students track and understand their daily expenses. The goal was to build something practical that students would actually use, while also focusing on clean design and a smooth user experience.

The application allows users to record expenses, review their spending patterns, and gain simple insights into their financial habits. Instead of being just a basic tracker, it also provides a forward-looking view of spending based on past data.

Features

The application supports adding, viewing, and deleting expenses with real time updates. Expenses are organized in a clear and readable format, making it easy to scan through recent activity.

A dashboard provides a summary of spending for the current day, week, and month. Visual charts are included to help users understand how their money is distributed across different categories and over time.

A budget system allows users to define a monthly limit and monitor how close they are to reaching it. The system provides simple warnings when spending approaches or exceeds the budget.

An additional feature predicts future spending based on current patterns. This gives users a rough estimate of where their spending is heading and helps them make small adjustments early.

Technology Stack

The frontend is built using React with a focus on component based structure and responsive design. Tailwind CSS is used for styling to keep the interface clean and consistent.

The backend is developed using Node.js and Express. It exposes a simple REST API to handle all expense related operations.

MongoDB is used as the database, with Mongoose for schema management and data handling.

Deployment

The frontend is deployed on Vercel.

The backend is deployed on Render.

MongoDB Atlas is used as the hosted database.

Setup Instructions

To run this project locally, clone the repository and install dependencies in both the client and server folders.

In the server directory, create a .env file and add your MongoDB connection string.

Start the backend server, then start the frontend development server. The application should run in the browser with full functionality.

Purpose

This project was built as part of a full stack assignment with an emphasis on building a complete, usable product rather than just implementing basic features. The focus was on clarity, usability, and clean structure across both frontend and backend.

Future Improvements

Possible improvements include authentication, multi user support, and more advanced financial insights. The current version focuses on simplicity and reliability.

