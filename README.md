# SURAtech Front-End Technical Assessment

**Candidate:** Adarleika Silva
**Role:** Front-End Developer

This repository contains the solutions for the Front-End Technical Assessment, composed of a React SPA (Frontend) and a Strapi v4 API (Backend).

## 🚀 Installation & Execution Instructions

To run this project locally, you need Node.js installed (v18 or v20 recommended).

### 1. Backend Setup (Strapi)
1. Navigate to the backend directory:
   \`cd backend\`
2. Install dependencies:
   \`npm install\`
3. Start the Strapi development server:
   \`npm run develop\`
4. The API will be available at \`http://localhost:1337\`.

### 2. Frontend Setup (React + Vite)
1. Open a new terminal and navigate to the frontend directory:
   \`cd frontend\`
2. Install dependencies:
   \`npm install\`
3. Start the Vite development server:
   \`npm run dev\`
4. The application will run at \`http://localhost:5173\`.

---

## 🤖 AI Usage & Technical Decisions

## Exercise 1: AI Assistance in Frontend (React SPA & Testing)

> **AI Contribution:** I used AI to quickly set up the React app using Vite. For the styling, the AI helped me write clean, mobile-first CSS using CSS Grid instead of relying on heavy external libraries. It also guided me on how to structure the fetch call inside a useEffect to connect with the local Strapi API, including how to handle loading and error states. Finally, the AI showed me how to set up and write the unit test using Vitest.


## Exercise 2: AI Assistance in API Integration

> **AI Contribution:** I asked the AI to help me create a clean service layer (productService.js) to keep the code organized. It helped me write the logic to catch different types of errors (like 4xx, 5xx, or network issues) using response.ok and response.status. 


## 🏗️ Exercise 3: Architecture Reasoning

1. *AI Prompts Used*
"Act as a Frontend Architect. Design a scalable front-end architecture using microfrontends and DevOps practices. Please explain: 1) The microfrontend strategy, 2) The CI/CD pipeline, and 3) Scalability, maintainability, and performance."

2. *Chosen Microfrontend Strategy*
I chose Webpack Module Federation for this. It lets us build separate mini-apps and put them together into one main app dynamically in the browser.
Why Module Federation? It's better and cleaner than using heavy iframes or complicated server routing. Also, different teams can share libraries (like React), so the user doesn't have to download the same thing twice.
Structure: We will have a "Host" app for the main layout, and multiple "Remote" apps (like Product Catalog or User Profile) that different teams can build and deploy independently.

3. *CI/CD Pipeline Design*
We can use GitHub Actions for each microfrontend repository.
Continuous Integration (CI): When a developer makes a Pull Request, it automatically runs code checks (ESLint) and tests (Jest) to make sure nothing is broken.
Continuous Deployment (CD): When the code is merged into main, it builds the app and uploads the files to a cloud bucket (like AWS S3). The Host application will automatically show the updated module to the users without needing to restart the whole system.

4. *Scalability, Maintainability, and Performance Considerations*
* *Scalability:* Teams can work on their own parts without blocking others. If the Catalog has a lot of traffic, we can scale its backend services without touching the User Profile.

* *Maintainability:* The codebases are smaller and easier to manage. We can update tools in one specific microfrontend without breaking the entire application.

* *Performance:* Sharing libraries makes the app smaller. We can also use lazy loading (React.lazy) so users only download the code for the section they are currently looking at, making the initial load much faster.

## ♻️ Exercise 4: AI-Assisted Code Refactoring

1. *AI Prompts Used*
"Refactor the following JavaScript fetch function into modern code. Please use async/await, add a try/catch block for errors, use clear variable names, and add JSDoc comments. Original code: function getUser(d) { return fetch("https://jsonplaceholder.typicode.com/users/"+d).then(x=>x.json()).then(j=>console.log(j)) }"

2. *Refactored Code*

 * Fetches user data from the JSONPlaceholder API by user ID.
 * @param {number|string} userId - The unique identifier of the user.
 * @returns {Promise<Object|null>} The user data object, or null if an error occurs.
 
 
 ```javascript
async function getUser(userId) {
  if (!userId) {
    console.error(&quot;Error: A valid userId must be provided.&quot;);
    return null;
  }

  const apiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();
    console.log(&quot;User Data retrieved successfully:&quot;, userData);
    
    return userData;

  } catch (error) {
    console.error(`Failed to fetch user with ID ${userId}:`, error.message);
    return null;
  }
}
```

3. *AI Assistance Explanation*
> **AI Contribution:** The AI helped me change the old .then() syntax to modern async/await, making the code much easier to read. It also added a try/catch block and checked response.ok to handle errors properly if the API fails. Finally, it changed the confusing variable names to clear ones (like userId instead of d) and added comments to document what the function does.