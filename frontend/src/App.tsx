import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import Dashboard from './app/dashboard/page'
import Customers from './app/customers/page'
import Conversations from './app/conversations/page'
import Leads from './app/leads/page'
import Nurture from './app/nurture/page'
import Knowledge from './app/knowledge/page'
import Agents from './app/agents/page'
import Analytics from './app/analytics/page'
import Settings from './app/settings/page'
import Help from './app/help/page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="conversations" element={<Conversations />} />
        <Route path="leads" element={<Leads />} />
        <Route path="nurture" element={<Nurture />} />
        <Route path="knowledge" element={<Knowledge />} />
        <Route path="agents" element={<Agents />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  )
}

export default App
