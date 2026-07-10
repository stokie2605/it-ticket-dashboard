import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App.jsx';

// Mock the Supabase client so tests run offline without network calls
vi.mock('./supabaseClient.js', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: null, error: { message: 'mocked' } })),
      })),
      insert: vi.fn(() => Promise.resolve({ error: null })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null })),
      })),
    })),
  },
}));

describe('IT Ticket Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main dashboard heading', async () => {
    render(<App />);
    expect(await screen.findByText(/IT Service Desk/i)).toBeInTheDocument();
  });

  it('loads and displays demo tickets when Supabase returns an error', async () => {
    render(<App />);
    // Falls back to demoTickets — warehouse scanner ticket should always appear
    expect(
      await screen.findByText(/Warehouse scanner cannot reach print server/i)
    ).toBeInTheDocument();
  });

  it('segregates tickets correctly — Open tickets appear in active queue', async () => {
    render(<App />);
    // DEMO-1042 (Open) and DEMO-1037 (Open) should both be visible
    expect(await screen.findByText(/Finance user locked out/i)).toBeInTheDocument();
    expect(await screen.findByText(/Warehouse scanner/i)).toBeInTheDocument();
  });

  it('resolved tickets appear in the resolved history section', async () => {
    render(<App />);
    // DEMO-1029 is resolved — its title and resolution note should be visible
    expect(await screen.findByText(/Conference room display adapter replaced/i)).toBeInTheDocument();
  });

  it('clicking resolve on an active ticket reveals the resolution workbench', async () => {
    render(<App />);

    // Wait for tickets to load
    await screen.findByText(/Warehouse scanner/i);

    // Find and click the resolve/process button for the first active ticket
    const resolveButtons = screen.getAllByRole('button', { name: /resolve|process/i });
    expect(resolveButtons.length).toBeGreaterThan(0);
    fireEvent.click(resolveButtons[0]);

    // Resolution textarea should now be visible — matches actual placeholder in App.jsx
    expect(
      await screen.findByPlaceholderText(/Document the steps taken/i)
    ).toBeInTheDocument();
  });
});
