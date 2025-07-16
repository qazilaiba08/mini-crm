'use client'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Lead } from '../actions/types';

const LeadCard = ({ lead }: { lead: Lead }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const selectLead = (id: string) => {
    
    console.log('Selected Lead ID:', id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => selectLead(lead.id)}
    >
      <h3 className="font-semibold mb-1">{lead.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{lead.email}</p>
      {lead.estimatedValue && (
        <p className="text-sm">
          <span className="font-medium">Value:</span> ${lead.estimatedValue.toLocaleString()}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-2">
        Last contact: {lead.lastContact}
      </p>
    </div>
  );
};

export default LeadCard;
