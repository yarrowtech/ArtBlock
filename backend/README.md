# ArtBlock Backend

This is the backend server for the ArtBlock platform, a social media platform for artists and creators.

## Features

- User authentication and authorization
- Post creation and management
- Creator subscriptions
- Direct messaging
- User profiles and following system
- File uploads for posts and profile images

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd artblock
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGO_URI=mongodb://localhost:27017/faculty-feedback
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Create the required directories:
```bash
mkdir -p uploads/profiles
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/public` - Get all public posts
- `GET /api/posts/feed` - Get posts for user's feed
- `GET /api/posts/:id` - Get a specific post
- `PATCH /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `POST /api/posts/:id/like` - Like/Unlike a post
- `POST /api/posts/:id/comment` - Add a comment to a post

### Users
- `GET /api/users/profile/:userId` - Get user profile
- `PATCH /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password
- `POST /api/users/block/:userId` - Block/Unblock user
- `POST /api/users/follow/:userId` - Follow/Unfollow user
- `GET /api/users/followers` - Get user's followers
- `GET /api/users/following` - Get user's following

### Subscriptions
- `POST /api/subscriptions/:creatorId` - Subscribe to a creator
- `GET /api/subscriptions/my-subscriptions` - Get user's active subscriptions
- `GET /api/subscriptions/my-subscribers` - Get creator's subscribers
- `POST /api/subscriptions/:subscriptionId/cancel` - Cancel subscription
- `POST /api/subscriptions/:subscriptionId/renew` - Renew subscription

### Messages
- `POST /api/messages` - Send a message
- `GET /api/messages/conversation/:userId` - Get conversation with a user
- `GET /api/messages/conversations` - Get all conversations
- `POST /api/messages/read/:senderId` - Mark messages as read
- `DELETE /api/messages/:messageId` - Delete a message

## File Structure

```
artblock/
├── config/
│   └── db.js
├── middleware/
│   └── auth.js
├── models/
│   ├── user.model.js
│   ├── post.model.js
│   ├── subscription.model.js
│   └── message.model.js
├── routes/
│   ├── auth.routes.js
│   ├── post.routes.js
│   ├── user.routes.js
│   ├── subscription.routes.js
│   └── message.routes.js
├── uploads/
│   └── profiles/
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
