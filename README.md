# Gauss UPM - Academic Performance Dashboard

A modern web application built with Next.js for analyzing and visualizing academic performance data from Universidad Politécnica de Madrid (UPM). This dashboard provides comprehensive insights into student performance metrics, faculty changes, and evaluation methods across different academic years.

## 🌟 Features

### 📊 Academic Performance Analysis
- **Real-time Performance Metrics**: Visualize performance rates, success rates, and absenteeism rates
- **Historical Trends**: Track academic performance over multiple years
- **Interactive Charts**: Dynamic visualizations using Chart.js for performance data

### 👨‍🏫 Faculty Management Insights
- **Faculty Change Tracking**: Monitor changes in teaching staff over time
- **Performance Correlation**: Analyze the impact of faculty changes on student performance
- **Professor Information**: Detailed faculty listings with contact information and office hours

### 📋 Evaluation Methods Analysis
- **Method Tracking**: Monitor changes in evaluation methods across academic years
- **Impact Assessment**: Correlate evaluation method changes with performance outcomes
- **Detailed Evaluation Criteria**: View comprehensive evaluation activities and criteria

### 🔍 Advanced Search & Navigation
- **Smart Search**: Real-time subject search with autocomplete
- **Subject Details**: Comprehensive subject information including UPM API integration
- **Responsive Design**: Mobile-first approach with modern glassmorphism UI

### 🔐 Authentication & Security
- **Secure Authentication**: Cookie-based authentication with middleware protection
- **Role-based Access**: Different access levels for students, professors, and administrators
- **Session Management**: Secure session handling with automatic redirects

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.0 with App Router
- **Styling**: Tailwind CSS 4.0.9 with custom gradients
- **Charts**: Chart.js & React Chart.js 2
- **Animations**: Framer Motion 12.4.7
- **TypeScript**: Full TypeScript support

### Backend Integration
- **API Integration**: Custom REST API client for academic data
- **UPM API**: Direct integration with Universidad Politécnica de Madrid APIs
- **Data Management**: Structured data types for academic information

### Authentication
- **Auth System**: Custom authentication context with React hooks
- **Cookie Management**: js-cookie for secure client-side storage
- **Route Protection**: Middleware-based route protection

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/henny-hen/DASOS-UPM.git
   cd dasos-upm
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_USE_MOCK_DATA=true
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── dashboard/               # Dashboard pages and layouts
│   │   ├── layout.tsx          # Dashboard layout with auth protection
│   │   ├── page.tsx            # Main dashboard page
│   │   ├── subjectdata/        # Subject analysis pages
│   │   │   ├── [subjectId]/    # Dynamic subject detail pages
│   │   │   │   ├── page.tsx    # Subject performance analysis
│   │   │   │   └── info/       # Subject information page
│   │   │   └── page.tsx        # All subjects listing
│   │   ├── settings/           # User settings page
│   │   └── profile/            # User profile page
│   ├── login/                  # Authentication page
│   ├── api/                    # API routes
│   │   └── subjects/           # Subject search API
│   ├── layout.tsx              # Root layout with auth provider
│   └── ui/                     # Global styles
├── components/                  # Reusable React components
│   ├── charts/                 # Chart components
│   │   ├── PerformanceChart.tsx
│   │   ├── FacultyChanges.tsx
│   │   └── EvaluationMethods.tsx
│   ├── navigation/             # Navigation components
│   │   ├── Menu.tsx
│   │   ├── Navbar.tsx
│   │   └── Searchbar.tsx
│   ├── subject/                # Subject-related components
│   │   ├── SubjectCard.tsx
│   │   ├── FacultyList.tsx
│   │   ├── ResourcesList.tsx
│   │   └── EvaluationDetails.tsx
│   └── ui/                     # UI components
│       ├── InsightCard.tsx
│       └── RecommendationList.tsx
├── context/                    # React contexts
│   └── auth.tsx               # Authentication context
├── hooks/                      # Custom React hooks
│   └── useAuthRedirect.ts     # Authentication redirect hook
├── lib/                       # Utility libraries
│   └── api.ts                 # API client functions
├── types/                     # TypeScript type definitions
│   ├── index.ts              # Main application types
│   └── upm-api.ts            # UPM API response types
├── middleware.ts              # Next.js middleware for auth
└── public/                    # Static assets
    ├── upm-logo.png
    └── icons/
```

## 🔧 Configuration

### Authentication Configuration
The app uses a custom authentication system. For demo purposes, any valid email format will authenticate:

```typescript
// Demo credentials
Email: student@example.com (or any valid email)
Password: any password works in demo mode
```

### API Configuration
Configure the API endpoints in `lib/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5000/api/v1';
```

For development with mock data:
```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Middleware Configuration
Route protection is handled in `middleware.ts`:
- Protected routes: All `/dashboard/*` routes
- Public routes: `/login`, `/reset-password`
- Automatic redirects based on authentication status

## 📊 Data Sources

### Internal API
- Academic performance data
- Historical trends
- Faculty and evaluation changes
- Correlation analysis results

### UPM API Integration
- Real-time subject information
- Faculty details and contact information
- Evaluation activities and criteria
- Academic resources and bibliography

## 🎨 UI/UX Features

### Design System
- **Glassmorphism**: Modern glass-like UI elements with backdrop blur
- **Purple Gradient Theme**: Consistent purple-based color scheme
- **Responsive Design**: Mobile-first approach with responsive grids
- **Dark Theme**: Optimized for extended use with comfortable contrast

### Interactive Elements
- **Hover Effects**: Smooth transitions and interactive feedback
- **Loading States**: Skeleton loaders and progress indicators
- **Animated Charts**: Smooth chart animations with Chart.js
- **Modal Dialogs**: Clean modal interfaces for detailed views

## 🔐 Authentication Flow

1. **Login**: User enters credentials on `/login` page
2. **Validation**: Authentication context validates credentials
3. **Cookie Storage**: Secure cookie stores user session
4. **Middleware Check**: Middleware verifies authentication on protected routes
5. **Dashboard Access**: Authenticated users access dashboard features
6. **Auto-redirect**: Automatic redirects based on authentication status

## 📱 Responsive Design (WIP)

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced experience on tablets (768px+)
- **Desktop**: Full-featured desktop experience (1024px+)
- **Large Screens**: Optimized for large displays (1440px+)


## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.



---

**Made with ❤️ for Universidad Politécnica de Madrid**
