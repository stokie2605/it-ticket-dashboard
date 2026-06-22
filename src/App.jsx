import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const demoTickets = [
  {
    id: 'DEMO-1042',
    title: 'Warehouse scanner cannot reach print server',
    description: 'Handheld inventory scanner reports timeout when contacting the dispatch label print queue.',
    category: 'Network',
    priority: 'High',
    status: 'Open',
  },
  {
    id: 'DEMO-1037',
    title: 'Finance user locked out after MFA reset',
    description: 'User cannot complete sign-in after mobile authenticator replacement.',
    category: 'Account / Access',
    priority: 'Medium',
    status: 'Open',
  },
  {
    id: 'DEMO-1029',
    title: 'Conference room display adapter replaced',
    description: 'HDMI adapter failure isolated during morning room check.',
    category: 'Hardware',
    priority: 'Low',
    status: 'Resolved',
    resolution_notes: 'Replaced adapter, verified input detection, and updated room inventory record.',
  },
];

function App() {
  const [tickets, setTickets] = useState(demoTickets);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [priority, setPriority] = useState('Medium');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  // Fetch all tickets from Supabase on load
  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching tickets:', error);
      setTickets(demoTickets);
    } else {
      setTickets(data && data.length > 0 ? data : demoTickets);
    }
  }

  // Handle lodging a new technical issue
  async function handleCreateTicket(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const { error } = await supabase.from('tickets').insert([
      { title, description, category, priority, status: 'Open' }
    ]);

    if (error) {
      console.error('Error creating ticket:', error);
    } else {
      setTitle('');
      setDescription('');
      fetchTickets();
    }
  }

  // Handle moving a problem to a resolved state with documentation
  async function handleResolveTicket(e) {
    e.preventDefault();
    if (!resolutionNotes.trim() || !selectedTicketId) return;

    const { error } = await supabase
      .from('tickets')
      .update({ status: 'Resolved', resolution_notes: resolutionNotes })
      .eq('id', selectedTicketId);

    if (error) {
      console.error('Error resolving ticket:', error);
    } else {
      setResolutionNotes('');
      setSelectedTicketId(null);
      fetchTickets();
    }
  }

  // Separate active work from resolved history
  const activeTickets = tickets.filter(t => t.status !== 'Resolved');
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved');

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>IT Service Desk Log</h1>
        <p>Log internal corporate hardware, account, and network issues through to resolution.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* LEFT COLUMN: LOG A NEW PROBLEM */}
        <div>
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h3>Log New Incident</h3>
            <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label>Issue Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Office printer offline" required style={{ padding: '8px' }} />
              
              <label>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide full details or error codes..." rows="3" style={{ padding: '8px' }} />
              
              <label>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '8px' }}>
                <option value="Hardware">Hardware</option>
                <option value="Network">Network</option>
                <option value="Account / Access">Account / Access</option>
              </select>

              <label>Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ padding: '8px' }}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Log Ticket</button>
            </form>
          </div>

          {/* RESOLUTION WORKBENCH */}
          {selectedTicketId && (
            <div style={{ backgroundColor: '#fffdf0', padding: '20px', borderRadius: '8px', border: '1px solid #f5e7a3', marginTop: '20px' }}>
              <h3>Close Ticket #{selectedTicketId}</h3>
              <form onSubmit={handleResolveTicket} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>Resolution Action Taken:</label>
                <textarea value={resolutionNotes} onChange={e => setResolutionNotes(e.target.value)} placeholder="Document the steps taken to fix the root problem..." rows="3" required style={{ padding: '8px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" style={{ flex: 1, padding: '8px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Mark Resolved</button>
                  <button type="button" onClick={() => setSelectedTicketId(null)} style={{ padding: '8px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: QUEUES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* ACTIVE QUEUE */}
          <div>
            <h2 style={{ color: '#ef4444' }}>Active Problems ({activeTickets.length})</h2>
            {activeTickets.length === 0 ? <p>All clear! No active problems logged.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeTickets.map(ticket => (
                  <div key={ticket.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0 }}>{ticket.title}</h4>
                      <span style={{ padding: '3px 8px', borderRadius: '12px', fontSize: '12px', backgroundColor: ticket.priority === 'High' ? '#fee2e2' : '#f3f4f6', color: ticket.priority === 'High' ? '#991b1b' : '#374151', fontWeight: 'bold' }}>{ticket.priority}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#555', margin: '5px 0 10px 0' }}>{ticket.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#888' }}>
                      <span>Category: <strong>{ticket.category}</strong></span>
                      <button onClick={() => setSelectedTicketId(ticket.id)} style={{ padding: '5px 10px', backgroundColor: '#f3f4f6', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>Process / Resolve</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RESOLVED QUEUE */}
          <div>
            <h2 style={{ color: '#22c55e' }}>Resolved History ({resolvedTickets.length})</h2>
            {resolvedTickets.length === 0 ? <p>No completed lifecycle history found yet.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {resolvedTickets.map(ticket => (
                  <div key={ticket.id} style={{ border: '1px solid #bbf7d0', padding: '15px', borderRadius: '6px', backgroundColor: '#f0fdf4' }}>
                    <h4 style={{ margin: 0, textDecoration: 'line-through', color: '#166534' }}>{ticket.title}</h4>
                    <p style={{ fontSize: '13px', color: '#666', margin: '5px 0' }}><strong>Problem:</strong> {ticket.description}</p>
                    <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#fff', borderLeft: '3px solid #22c55e', borderRadius: '2px' }}>
                      <p style={{ fontSize: '13px', margin: 0, color: '#1f2937' }}><strong>Resolution Notes:</strong> {ticket.resolution_notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
