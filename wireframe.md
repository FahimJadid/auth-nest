# Auth Module Wireframe

├── Controller
│ ├── POST /auth/signup
│ │ ├── Request Body: { email, password }
│ │ └── Response: { message: "User created successfully" }
│ ├── POST /auth/login
│ │ ├── Request Body: { email, password }
│ │ └── Response: { token }
│ ├── GET /auth/profile
│ │ ├── Request Headers: { Authorization: Bearer {token} }
│ │ └── Response: { user }
│ └── GET /auth/logout
│ └── Response: { message: "Logged out successfully" }
├── Service
│ ├── signUp(userDto): Promise<User>
│ ├── validateUser(email, password): Promise<User>
│ ├── generateAccessToken(user): string
│ └── verifyToken(token): Promise<User>
├── LocalStrategy
├── JwtStrategy
└── AuthGuard (Custom)

# Explanation:

- Auth Module: This module handles authentication-related endpoints.
- Controller: The controller defines the API endpoints for signup, login, profile, and logout. It receives requests, processes them, and sends back responses.
- Service: The service contains the business logic for authentication, such as signing up a new user, validating user credentials, generating JWT tokens, and verifying JWT tokens.
- LocalStrategy: This strategy is responsible for authenticating users using their email and password. It is used during the login process.
- JwtStrategy: This strategy is responsible for validating JWT tokens sent with requests. It is used to protect routes that require authentication.
- AuthGuard: This is a custom guard that verifies the presence and validity of the JWT token in the request headers.

# Auth Folder Wireframe

auth
├── controllers
│ └── auth.controller.ts
├── dtos
│ ├── login.dto.ts
│ └── register.dto.ts
├── guards
│ ├── jwt-auth.guard.ts
│ └── roles.guard.ts
├── interfaces
│ ├── jwt-payload.interface.ts
│ └── user.interface.ts
├── strategies
│ ├── jwt.strategy.ts
│ └── local.strategy.ts
├── services
│ ├── auth.service.ts
│ ├── jwt.service.ts
│ └── user.service.ts
└── auth.module.ts

# Explanation:

- auth: The root directory for the authentication module.
- controllers: Contains the controller responsible for handling authentication endpoints.
- dtos: Contains data transfer objects (DTOs) used for input validation during authentication.
- guards: Contains guards responsible for protecting routes using authentication and authorization.
- interfaces: Contains interfaces used for defining data structures related to authentication.
- strategies: Contains passport strategies for different authentication methods (e.g., JWT, local).
- services: Contains services responsible for the business logic and operations related to authentication.

* auth.module.ts: The module file that imports and configures the components related to authentication.
  This wireframe follows a modular structure where the components related to authentication, such as controllers, services, guards, and strategies, are organized within their respective directories. DTOs and interfaces are used for defining and validating data structures. The module file (auth.module.ts) brings all the components together by importing and configuring them.

# Implementation:

`nest g module auth`
`nest g service auth --no-spec`
`nest g controller auth --no-spec`

inject the authentication service in auth.controller:
`@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}`
