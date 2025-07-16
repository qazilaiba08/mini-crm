'use client'
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { crmActions } from '../actions/crmSlice.ts';
import { RootState } from '../store/store';
import { Lead } from '../actions/types';

const statusColumns: Lead['status'][] = ['new', 'contacted', 'proposal', 'won'];

const SortableLead = ({ lead }: { lead: Lead }) => {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: lead.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-blue-50 border p-2 rounded mb-2 shadow-sm cursor-move"
    >
      <p className="font-semibold">{lead.name}</p>
      <p className="text-sm text-gray-600">{lead.email}</p>
    </div>
  );
};

const LeadsBoard = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state: RootState) => state.leads);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeLead = leads.find((l) => l.id === active.id);
    const overLead = leads.find((l) => l.id === over.id);

    if (activeLead && overLead && activeLead.status === overLead.status) {
      const status = activeLead.status;
      const leadsInColumn = leads.filter((l) => l.status === status);
      const oldIndex = leadsInColumn.findIndex((l) => l.id === active.id);
      const newIndex = leadsInColumn.findIndex((l) => l.id === over.id);

      dispatch(crmActions.reorderLeads({
        status,
        startIndex: oldIndex,
        endIndex: newIndex,
      }));
    } else if (activeLead && overLead && activeLead.status !== overLead.status) {
      dispatch(crmActions.moveLead({
        id: activeLead.id,
        newStatus: overLead.status,
      }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-100">
        {statusColumns.map((status) => {
          const leadsForStatus = leads.filter((l) => l.status === status);
          return (
            <div key={status} className="bg-white p-3 rounded shadow min-h-[300px]">
              <h3 className="text-lg font-semibold capitalize mb-3">{status}</h3>
              <SortableContext items={leadsForStatus.map((l) => l.id)} strategy={verticalListSortingStrategy}>
                {leadsForStatus.map((lead) => (
                  <SortableLead key={lead.id} lead={lead} />
                ))}
              </SortableContext>
            </div>
          );
        })}
      </div>
    </DndContext>
  );
};

export default LeadsBoard;
