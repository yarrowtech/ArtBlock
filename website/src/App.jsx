// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import FeedPage from './pages/FeedPage';
import CreatorProfile from './pages/CreatorProfile';
import CreatePost from './components/CreatePost';
import MessageSlide from './components/MessageSlide';
import NotificationPanel from './components/NotificationPanel';
import AuthPage from './pages/AuthPage';
import Subscribe from './pages/Subscribe';
import CreatorDashboard from './pages/CreatorDashboard';
import Explore from './pages/Explore';
import Subscription from './pages/Subscription';
import SettingsPage from './pages/SettingsPage';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Support from './pages/Support';
import CreatorEditProfile from './components/CreatorEditProfile';

import ProfileEdit from './components/ProfileEdit';
import EmailNotifications from './components/EmailNotifications';
import PaymentHistory from './components/PaymentHistory';
import BlockedAccounts from './components/BlockedAccounts';
import CreatorStories from './components/CreateStories';

export default function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/creatorprofile" element={<CreatorProfile />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/creatordashboard" element={<CreatorDashboard />} />
          <Route path="/notification" element={<NotificationPanel />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/subscriptions" element={<Subscription />} />
          <Route path="/messages" element={<MessageSlide />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/support" element={<Support />} />
          <Route path="/creatoredit" element={<CreatorEditProfile />} />
          <Route path="/createstories" element={<CreatorStories />} />

          {/* Nested settings routes */}
          <Route path="/settings" element={<SettingsPage />}>
            <Route path="profile" element={<ProfileEdit />} />
            <Route
              path="email-notifications"
              element={<EmailNotifications />}
            />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="blocked-accounts" element={<BlockedAccounts />} />
          </Route>

          {/* Optionally: Add a fallback for 404 */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
