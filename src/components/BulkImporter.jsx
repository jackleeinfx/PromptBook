import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Save } from 'lucide-react';

export default function BulkImporter({ categories, onImportComplete }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!selectedCategoryId) {
      alert('Please select a category first.');
      return;
    }
    if (!text.trim()) {
      alert('Please enter some prompts.');
      return;
    }

    if (!supabase) {
      alert("Supabase not configured");
      return;
    }

    setLoading(true);
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    if (lines.length === 0) {
      setLoading(false);
      return;
    }

    const rows = lines.map(line => ({
      content: line,
      category_id: selectedCategoryId
    }));

    const { error } = await supabase
      .from('prompts')
      .insert(rows);

    if (error) {
      alert('Error importing prompts: ' + error.message);
    } else {
      alert(`Successfully imported ${lines.length} prompts!`);
      setText('');
      if (onImportComplete) onImportComplete();
    }
    setLoading(false);
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Bulk Import Prompts</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose a Category --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Prompts (One per line)</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste multiple prompts here..."
          rows={5}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading || !selectedCategoryId}
        className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full justify-center"
      >
        <Save size={16} /> Save Prompts
      </button>
    </div>
  );
}
