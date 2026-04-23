#  Playwright Automation Testing - SCOS React Application

##  Project Overview
This project contains end-to-end automation testing for the **SCOS React Application** using **Playwright**.

The automation covers complete user flow:
> **Login → Institute → Role → Dashboard → Logout → Dark Mode**

All test cases are mapped with real scenarios and executed successfully.

---

##  Modules Covered

###  Login Module
- Valid Login
- Invalid Credentials
- Empty Fields Validation
- Input Validations (Email, Password)
- Error UI Validation
- No Institute User

---

###  Institute Module
- Load Institutes
- Select Institute
- No Role Alert Handling
- Search Functionality
- Single Institute Flow

---

###  Role Module
- Load Roles
- Select Role
- Multiple Roles Validation
- Switch Institute
- Role Navigation Flow

---

###  Dashboard Module
- Dashboard Load Validation
- User Name Verification
- UI Components Validation
- Session Persistence after Refresh

---

###  Logout Module
- Logout Redirection
- Login Page Visibility after Logout

---

###  Dark Mode Module
- Enable Dark Mode
- Theme Persistence after Refresh
- UI Visibility in Dark Mode
- Navigation Consistency
- Error UI in Dark Mode

---

##  Test Coverage

-  Total Test Cases: **30**
-  Passed: **30**
-  Failed: **0**
-  Coverage: **End-to-End Flow**

---
##  Project Structure
playwright-project/
│
├── tests/
│ ├── auth/login.spec.js
│ ├── flow/institute.spec.js
│ ├── flow/role.spec.js
│ ├── flow/dashboard.spec.js
│ ├── flow/logout.spec.js
│ ├── flow/darkmode.spec.js
│
├── pages/
│ ├── LoginPage.js
│ ├── InstitutePage.js
│ ├── RolePage.js
│ ├── DashboardPage.js
│
├── utils/
│ └── testData.js
│
├── playwright.config.js


---

##  Tech Stack

- Playwright  
- JavaScript  
- Node.js  
- Page Object Model (POM)

---

##  How to Run Tests

### Install dependencies

npm install


### Install Playwright browsers

npx playwright install


### Run all tests

npx playwright test


### Run in UI mode

npx playwright test --ui


---

##  Key Features

- Reusable Page Object Model (POM)
- Dynamic test data handling
- Real-world scenario coverage
- Proper wait/synchronization handling
- Clean and maintainable code
- Covers edge cases and validations

---

##  Learning Outcomes

- Playwright automation fundamentals
- Writing real-world test cases
- Handling dynamic UI flows
- Managing async operations
- Implementing scalable POM structure

---

##  Conclusion

This project demonstrates a complete automation testing workflow using Playwright with industry-level practices and full end-to-end coverage.

---

##  Author
Pratik Patil

---

##  Note
This project is built as part of an automation testing exercise and follows real-world QA practices.
