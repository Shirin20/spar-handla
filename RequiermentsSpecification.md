## Non-Functional Product Requirements
- The deployed application uses HTTPS.
- Measures have been taken to complicate XSS (Cross-Site Scripting) attacks.
- Measures have been taken to complicate CSRF (Cross-Site Request Forgery) attacks.
- There should be at least one test case per requirement.

## Non-Functional Organizational Requirements

- It is clearly visible what has been planned for each iteration, as well as a follow-up of what has been done.
- Tasks have been broken down to a suitable size for planning.
- There are functional requirements that describe the product's functionality at an appropriate level.
- There are ethical considerations regarding the application and the project.
- Testing

### 3.1 Version Control

Git should be used for version control of the code. A working version of the project should always be in the master branch. Functionality/debugging will be committed locally and then, once everything is finalized for the day, commits will be pushed to the master branch.

### 3.2 Code Standards

- The code is divided into several files and modules to facilitate other developers.
- For the application backend, eslint with a special configuration belonging to LNU (@lnu/eslint-config) is used.

### 3.3 Code Documentation

- In the application, every function is documented according to JS docs comments.
- Parts of the code that are complicated or difficult to understand are documented with a line of comments.
- The Product API is documented in README.md located in the root folder.

## 4. External Requirements (Non-Functional)

### 4.1 Ethical Requirements
- The application must be morally defensible. In the event of any moral error, this will be rectified as soon as possible.
- In the event of deficiencies in function, individuals can get incorrect information, e.g., the application presents wrong product prices. This will be checked and corrected, and the correct prices will be displayed.

### 4.2 Laws & Standards

- [Sveriges Ingenjörer Code of Ethics](https://www.sverigesingenjorer.se/om-forbundet/organisation/hederskodex/)
- [IEEE Code of Ethics](https://www.ieee.org/about/corporate/governance/p7-8.html)