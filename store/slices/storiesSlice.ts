import type { StateCreator } from 'zustand';

import type { Story } from '../entities';
import type { BanboxStore } from '../types';

export type StoriesSlice = {
    stories: Story[];
    viewedStoryIds: string[];
    setStories: (stories: Story[]) => void;
    markStoryViewed: (storyId: string) => void;
    isStoryViewed: (storyId: string) => boolean;
    clearStoryViews: () => void;
};

export const createStoriesSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    StoriesSlice
> = (set, get) => ({
    stories: [],
    viewedStoryIds: [],
    setStories: (stories) => set({ stories }),
    markStoryViewed: (storyId) => {
        if (get().viewedStoryIds.includes(storyId)) return;
        set((s) => ({ viewedStoryIds: [...s.viewedStoryIds, storyId] }));
    },
    isStoryViewed: (storyId) => get().viewedStoryIds.includes(storyId),
    clearStoryViews: () => set({ viewedStoryIds: [] }),
});
