// src/store/crm/crmSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, Client, Lead, Note, Task } from "./types";

const initialState: AppState = {
  clients: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
      company: 'ABC Corp',
      tags: ['vip', 'tech'],
      notes: [
        {
          id: 'n1',
          content: 'Interested in premium package',
          createdAt: '2023-05-10T10:00:00',
          updatedAt: '2023-05-10T10:00:00'
        }
      ]
    }
  ],
  leads: [
    {
      id: 'l1',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'contacted',
      estimatedValue: 5000,
      lastContact: '2023-05-12',
      notes: []
    }
  ],
  tasks: [
    {
      id: 't1',
      title: 'Follow up with John',
      description: 'Discuss premium package options',
      dueDate: '2023-05-15',
      completed: false,
      clientId: '1',
      priority: 'high'
    }
  ],
  selectedClient: null,
  selectedLead: null,
  view: 'clients',
  searchTerm: '',
  activeTab: 'clients'
};

const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    setView(state, action: PayloadAction<AppState['view']>) {
      state.view = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setActiveTab(state, action: PayloadAction<AppState['activeTab']>) {
      state.activeTab = action.payload;
    },
    selectClient(state, action: PayloadAction<string>) {
      const client = state.clients.find(c => c.id === action.payload);
      if (client) state.selectedClient = client;
      state.selectedLead = null;
    },
    selectLead(state, action: PayloadAction<string>) {
      const lead = state.leads.find(l => l.id === action.payload);
      if (lead) state.selectedLead = lead;
      state.selectedClient = null;
    },
    addClient(state, action: PayloadAction<Client>) {
      state.clients.push(action.payload);
    },
    updateClient(state, action: PayloadAction<Client>) {
      const index = state.clients.findIndex(c => c.id === action.payload.id);
      if (index >= 0) state.clients[index] = action.payload;
    },
    addLead(state, action: PayloadAction<Omit<Lead, 'id'>>) {
      const newLead = {
        ...action.payload,
        id: `l${state.leads.length + 1}`,
        notes: []
      };
      state.leads.push(newLead);
    },
    updateLeadStatus(state, action: PayloadAction<{ id: string; status: Lead['status'] }>) {
      const lead = state.leads.find(l => l.id === action.payload.id);
      if (lead) lead.status = action.payload.status;
    },
    moveLead(state, action: PayloadAction<{ id: string; newStatus: Lead['status'] }>) {
      const lead = state.leads.find(l => l.id === action.payload.id);
      if (lead) lead.status = action.payload.newStatus;
    },
    reorderLeads(state, action: PayloadAction<{ status: Lead['status']; startIndex: number; endIndex: number }>) {
      const { status, startIndex, endIndex } = action.payload;
      const leadsForStatus = state.leads.filter(l => l.status === status);
      const [removed] = leadsForStatus.splice(startIndex, 1);
      leadsForStatus.splice(endIndex, 0, removed);
    },
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    toggleTaskComplete(state, action: PayloadAction<string>) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    addNoteToClient(state, action: PayloadAction<{ clientId: string; content: string }>) {
      const client = state.clients.find(c => c.id === action.payload.clientId);
      if (client) {
        const newNote: Note = {
          id: `n${client.notes.length + 1}`,
          content: action.payload.content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        client.notes.push(newNote);
      }
    }
  }
});

export const crmActions = crmSlice.actions;
export default crmSlice.reducer;
