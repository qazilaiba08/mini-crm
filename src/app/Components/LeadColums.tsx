'use client'
import { useDispatch, useSelector } from 'react-redux';
import { Lead } from '../actions/types';
import { RootState } from '../store/store';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import SortableLeadCard from './SortableLeadCard';

const LeadColumn = ({ status, title }: { status: Lead['status']; title: string }) => {
  const dispatch = useDispatch();

  const leads = useSelector((state: RootState) =>
    state.leads.filter((lead) => lead.status === status)
  );

  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const ids = leads.map((l) => l.id).filter((id): id is string => !!id);
    setItems(ids);
  }, [leads]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.indexOf(active.id.toString());
    const newIndex = items.indexOf(over.id.toString());

    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(items, oldIndex, newIndex);
    setItems(newOrder);

    dispatch({
      type: 'crm/reorderLeads',
      payload: {
        status,
        startIndex: oldIndex,
        endIndex: newIndex,
      },
    });
  };

  return (
    <div className="flex-1 bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {leads.map((lead) =>
              lead.id ? (
                <SortableLeadCard key={lead.id} lead={lead} />
              ) : null
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default LeadColumn;
