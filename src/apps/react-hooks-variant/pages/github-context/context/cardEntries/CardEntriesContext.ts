import React from 'react';

export type CardEntires = Record<GithubCard['id'], GithubCard & { isDragging: boolean }>;

export interface CardEntiresContextProps {
  cardEntires: CardEntires;
  getById: (id: GithubCard['id']) => GithubCard & { isDragging: boolean };
  incrementReaction: (id: number, reaction: string) => void;
  positionChange: (position: { x: number; y: number }) => void;
  setCardEntires: (select: CardEntires) => void;
}

export const CardEntiresContext = React.createContext<CardEntiresContextProps>({
  cardEntires: {},
  getById: () => ({}) as GithubCard & { isDragging: boolean },
  setCardEntires: () => {},
  incrementReaction: () => {},
  positionChange: () => {}
});
