import React from 'react';
import type { Story } from '../types';

interface PatientStoryProps {
  story: Story;
}

export function PatientStory({ story }: PatientStoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-64">
        <img
          src={story.image}
          alt={story.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{story.name}, {story.age}</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {story.bloodType}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {story.ethnicity}
            </span>
          </div>
        </div>
        <p className="text-red-600 font-semibold mb-2">{story.diagnosis}</p>
        <p className="text-gray-600">{story.story}</p>
      </div>
    </div>
  );
}