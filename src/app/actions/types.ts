
export type Note = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
  notes: Note[];
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  status: 'new' | 'contacted' | 'proposal' | 'won';
  estimatedValue?: number;
  lastContact: string;
  notes: Note[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  clientId: string;
  priority: 'low' | 'medium' | 'high';
};

export type AppState = {
  clients: Client[];
  leads: Lead[];
  tasks: Task[];
  selectedClient: Client | null;
  selectedLead: Lead | null;
  view: 'clients' | 'leads' | 'tasks' | 'calendar';
  searchTerm: string;
  activeTab: 'clients' | 'tasks' | 'notes';
};
