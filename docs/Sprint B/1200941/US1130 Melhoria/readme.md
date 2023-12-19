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

Diagrams
-----------------

### Level 1
 ![LEVEL1](/docs/Sprint%20B/1200941/US1130%20Melhoria/svg/docs/Sprint%20B/1200941/US1130%20Melhoria/Melhoria/LVL1_FE_CREATELIFT.svg)

 This diagram illustrates the user interaction with the form and the subsequent data submission process.

### Level 2

 ![LEVEL2](/docs/Sprint%20B/1200941/US1130%20Melhoria/svg/docs/Sprint%20B/1200941/US1130%20Melhoria/Melhoria/LVL2_FE_CREATLIFT.svg): This diagram details the interactions between `CreateLiftComponent` and various services (`LiftService`, `BuildingService`, `MessageService`) during the lift creation process.

### Level 3

 ![LEVEL3](/docs/Sprint%20B/1200941/US1130%20Melhoria/svg/docs/Sprint%20B/1200941/US1130%20Melhoria/Melhoria/LVL3_FE_CREATELIF.svg): This diagram details the interactions between every component and service and a deeper knowledge about the backend!

Usage
-----

To change the state of a robot, follow these steps:

1. **Admin Authentication**: Log in to the system as an admin using your credentials.

2. **View Active Robots**:
   - After successful authentication, you will be directed to the "ViewComponent," where you can see a list of active robots. This list provides an overview of all robots currently in operation.

3. **Change Robot State**:
   - To change the state of a specific robot, select the robot from the list displayed in the "ViewComponent."
   - Initiate the state change process by clicking on the robot you want to manage. This action will take you to the "RobotComponent."

5. **Feedback Messages**:
   - After the state change operation is complete, the system will provide feedback messages via the "MessageService." These messages will indicate whether the state change was successful or if an error occurred during the process.
   - Successful state changes will be confirmed with a success message, while errors will be reported with an error message.
