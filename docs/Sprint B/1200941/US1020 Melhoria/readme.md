Robot State Change - User Story README
==============================================

Overview
--------

This document provides an overview of the "Robot State Change" user story, part of our robot management system. It outlines the functionality, key components of the front-end and back-end implementation, and the interaction between different services.

User Story
----------

**As an** admin,  
**I want to** change the state of a robot in the system,  
**So that** I can manage and control the state of robots effectively.

Features
--------

*   View a list of active robots.
*   Change the state of a robot.
*   Display success or error messages for state changes.

Front-End Implementation
------------------------

The front-end is implemented using Angular. The main components include:

*   **ViewComponent**: Displays the list of active robots.
*   **RobotComponent**: Manages the state change for a robot.
*   **MessageService**: Displays messages based on the operation's success or failure.
*   **RoutingService**: Handles routing and navigation.

Diagrams
--------

### Level 1
![LEVEL1](/docs/Sprint%20B/1200941/US1020%20Melhoria/svg/docs/Sprint%20B/1200941/US1020%20Melhoria/Melhoria/LEVEL1_FE_INIBROBOT.svg)

This diagram illustrates the user interaction with the list of active robots and the process of changing a robot's state.

### Level 2
![LEVEL2](/docs/Sprint%20B/1200941/US1020%20Melhoria/svg/docs/Sprint%20B/1200941/US1020%20Melhoria/Melhoria/LEVEL2_FE_INIBROBOT.svg)

This diagram details the interactions between `RobotComponent`, `RobotService`, `RoutingService`, `RobotController`, and `BackendRobotService` during the robot state change process.

## Level 3
![LEVEL3](/docs/Sprint%20B/1200941/US1020%20Melhoria/svg/docs/Sprint%20B/1200941/US1020%20Melhoria/Melhoria/LVL3_FE_INIBROBOT.svg)

 This diagram details the interactions between every component and service and a deeper knowledge about the backend!



To change the state of a robot, follow these steps:

1. Admin logs in to the system.
2. Admin views the list of active robots using the "ViewComponent."
3. Admin selects a robot and initiates a state change using the "RobotComponent."
4. The system communicates with the back end to update the robot's state.
5. Success or error messages are displayed using the "MessageService."



