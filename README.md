# CyberRest - Cybersecurity Platform

A comprehensive cybersecurity platform built with React and Vite, featuring a modern and responsive UI with advanced security monitoring capabilities.

## Features

- 🔒 Real-time security monitoring and alerts
- 📊 Interactive security dashboards and analytics
- 🔍 Advanced threat detection and analysis
- 👥 User management and role-based access control
- 📱 Responsive design for all devices
- 🌙 Dark/Light mode support
- ⌨️ Keyboard shortcuts for improved productivity

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/mustaphahaadi/cyberrest.git
   cd cyberrest
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:3000

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run test` - Run test suite
- `npm run format` - Format code using Prettier

## Project Structure

```
cyberrest/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # Base UI components
│   │   ├── Sidebar.jsx # Navigation sidebar
│   │   └── ...         # Other components
│   ├── contexts/       # React context providers
│   ├── layouts/        # Layout components
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── styles/        # CSS styles
├── .eslintrc.js       # ESLint configuration
├── .prettierrc        # Prettier configuration
├── package.json       # Project dependencies
└── vite.config.js     # Vite configuration
```

## Key Components

### Sidebar
The application features a responsive sidebar component with the following capabilities:
- Collapsible navigation menu
- Mobile-friendly design
- Keyboard shortcuts (Ctrl/Cmd + B to toggle)
- Persistent state using cookies
- Tooltips for collapsed state
- Support for nested menu items
- Customizable styling and themes

### UI Components
- Button variants with different styles and sizes
- Input fields with validation
- Tooltips for enhanced UX
- Separators for visual organization
- Sheets for mobile navigation
- Skeletons for loading states

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible components
- **Chart.js** - Data visualization
- **Lucide Icons** - Icon library
- **Class Variance Authority** - Component styling
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@cyberrest.com or join our Slack channel.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their amazing tools and libraries
