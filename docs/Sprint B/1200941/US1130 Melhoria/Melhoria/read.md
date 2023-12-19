Create a Lift - User Story README
=================================

Overview
--------

This document provides an overview of the "Create a Lift" user story, part of our building management system. It outlines the functionality, key components of the front-end implementation, and the interaction between different services.

User Story
----------

**As a** building manager,  
**I want to** create a new lift entry in the system,  
**So that** I can manage and track the lift within my building.

Features
--------

*   Fill out a form with lift details (localization, state, building).
*   Validate input data.
*   Submit lift data to the backend server.
*   Display confirmation or error messages.

Front-End Implementation
------------------------

The front-end is implemented using Angular. The main components include:

*   **CreateLiftComponent**: Manages the form for creating a new lift.
*   **LiftService**: Communicates with the backend to create lift entries.
*   **BuildingService**: Fetches building data for the dropdown in the form.
*   **MessageService**: Displays messages based on the operation's success or failure.

Sequence Diagrams
-----------------

### Form Interaction and Data Submission

**SHOW LVL 1**: This diagram illustrates the user interaction with the form and the subsequent data submission process.

### Service Interactions

**SHOW LVL 2**: This diagram details the interactions between `CreateLiftComponent` and various services (`LiftService`, `BuildingService`, `MessageService`) during the lift creation process.

How to Run
----------

*   Clone the repository.
*   Navigate to the project directory.
*   Run `npm install` to install dependencies.
*   Start the application using `ng serve`.
*   Open a browser and go to `http://localhost:4200`.

Dependencies
------------

*   Angular
*   RxJS
*   HttpClient for API communication