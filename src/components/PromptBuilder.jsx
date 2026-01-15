import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Copy, Trash2, X } from 'lucide-react';

export default function PromptBuilder({ categories }) {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompts, setSelectedPrompts] = useState([]);

  useEffect(() => {
    if (activeCategoryId) {
      fetchPrompts(activeCategoryId);
    } else {
      setPrompts([]);
    }
  }, [activeCategoryId]);

  async function fetchPrompts(catId) {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('category_id', catId)
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching prompts:', error);
    } else {
      setPrompts(data);
    }
  }

  function addPrompt(text) {
    setSelectedPrompts([...selectedPrompts, text]);
  }

  function removeSelected(index) {
    const newPrompts = [...selectedPrompts];
    newPrompts.splice(index, 1);
    setSelectedPrompts(newPrompts);
  }

  function clearAll() {
    setSelectedPrompts([]);
  }

  function copyToClipboard() {
    const text = selectedPrompts.join(', ');
    navigator.clipboard.writeText(text).then(() => {
      alert('Prompts copied to clipboard!');
    });
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 h-[600px]">
      {/* Categories Sidebar */}
      <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow overflow-y-auto border border-gray-200">
        <h3 className="font-bold mb-2 text-gray-700">Categories</h3>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`w-full text-left px-3 py-2 rounded transition-colors ${
                activeCategoryId === cat.id
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
          {categories.length === 0 && <p className="text-sm text-gray-400">No categories.</p>}
        </div>
      </div>

      {/* Prompts Selection Area */}
      <div className="w-full md:w-2/4 bg-white p-4 rounded-lg shadow overflow-y-auto border border-gray-200">
        <h3 className="font-bold mb-2 text-gray-700">
          {activeCategoryId ? categories.find(c => c.id === activeCategoryId)?.name : 'Select a Category'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {prompts.map(p => (
            <button
              key={p.id}
              onClick={() => addPrompt(p.content)}
              className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 px-3 py-1 rounded text-sm transition-colors text-left"
            >
              {p.content}
            </button>
          ))}
          {activeCategoryId && prompts.length === 0 && (
            <p className="text-gray-400 italic">No prompts in this category.</p>
          )}
          {!activeCategoryId && (
            <p className="text-gray-400 italic">Select a category to view prompts.</p>
          )}
        </div>
      </div>

      {/* Output Area */}
      <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow flex flex-col border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-700">Output</h3>
          <button onClick={clearAll} className="text-xs text-red-500 hover:underline">Clear All</button>
        </div>

        <div className="flex-1 bg-gray-50 border border-gray-200 rounded p-2 overflow-y-auto mb-2">
            <div className="flex flex-wrap gap-1">
                {selectedPrompts.map((p, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                        {p}
                        <button onClick={() => removeSelected(i)} className="hover:text-red-500"><X size={10} /></button>
                    </span>
                ))}
                {selectedPrompts.length === 0 && <span className="text-gray-400 italic text-sm">Selected prompts will appear here...</span>}
            </div>
        </div>

        <div className="mb-2">
            <textarea
                className="w-full h-24 p-2 text-sm border border-gray-300 rounded font-mono"
                readOnly
                value={selectedPrompts.join(', ')}
            />
        </div>

        <button
          onClick={copyToClipboard}
          disabled={selectedPrompts.length === 0}
          className="w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Copy size={16} /> Copy Prompts
        </button>
      </div>
    </div>
  );
}
