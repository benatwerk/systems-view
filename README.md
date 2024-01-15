# Systems View

A web application to visualize and interact with system data. The "Systems View" app allows users to search, filter, and view systems based on various criteria such as data use, data categories, and more.

## Features

-   **Search Functionality**: Allows users to search for systems by name.
-   **Dynamic Filtering**: Users can filter systems based on data use, data categories, and other attributes.
-   **Responsive Design**: Works on various screen sizes and devices.
-   **Minimalistic UI**: Clean and user-friendly interface.

## Built with Vite

This project is bootstrapped with [Vite](https://vitejs.dev/)

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/benatwerk/systems-view.git
    cd systems-view
    ```

2. **Install Dependencies**

    Make sure you have [Node.js](https://nodejs.org/) installed. Then run:

    ```bash
    npm install
    ```

3. **Run the Application**

    To start the development server, run:

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`. Note: Vite does not automatically open the application in your web browser but it will prompte you with the local url above.

## Project notes and feedback

### How much time you spent building the project?

About 4 hours, maybe a little over.

### Any assumptions you made

I assumed I'd have more time to work on the UI rather than the filtering

### Any trade-offs you made

Mostly time trade-offs

-   Filters could have been more robust. They should combine with each other and show what filters are selected but I made a very minimal UI due to time.
-   Initially I made the tags in the cards clickable as filters but removed the feature because I wasn't sure how to generalize the code and knew it'd put me out of scope to prototype and implement it.
-   I had a different idea for the UI. My initial thought was to have the CardView be limited to just enough cards to fill the screen, memoize the results, and then have a page for each system type that showed all of its systems but as I was building it I felt I could only do that if I didn't do the filtering and data handling aspects and since the data set is small and for the purposes of this as an exercise, I punted on it.
-   I didn't add tests, I could spend another 20 or so minutes on it but that'd put me too far over 4 hours so left out due to time. vite also uses vitest which I don't think anyone uses over something like jest.

### Any special/unique features you added

-   Love
-   I think the way I handled the cards styles is nicely managable and I like using more than just greyscale border colors.

### Anything else you want us to know about

-   If you have any issues running the code please let me know

### Any feedback you have on this technical challenge -- we care deeply about our hiring process here at Ethyca, and about the engineers who go through it (that's you!) -- we wholeheartedly promise any feedback will be met with a warm thank you!

Overall it's a good challenge and the time limit is reasonable to accomplish it. It's more of a fullstack challenge at least for me. I spent more time on the filter than the UI. My filter ended up being simple but I went through a few iterations and I don't think I accomplished the task in the best way. I saw that I was spending too large a chunk of my time on it so I had to reduce it to a simpler generalized filter.
