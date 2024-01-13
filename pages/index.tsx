import React from 'react';
import { NextPage } from 'next';
import {WorkflowCard} from '../components/workflow';
import { DndContext } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {WorkflowBoard} from '../components/workflowBoard';

const Home: NextPage = () => {
  return (
    <WorkflowBoard />
  );
};

export default Home;