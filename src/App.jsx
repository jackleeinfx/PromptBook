import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import CategoryManager from './components/CategoryManager';
import BulkImporter from './components/BulkImporter';
import PromptBuilder from './components/PromptBuilder';
import { Layers, Database, PenTool } from 'lucide-react';

function App() {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('builder'); // builder, manage, import

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    // Only fetch if client is configured
    if (!supabase) return;

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
    } else if (data) {
      setCategories(data);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow p-4 mb-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Layers /> AI Prompt Manager
          </h1>
          <nav className="flex gap-2">
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'builder' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <PenTool size={18} /> Builder
            </button>
            <button
              onClick={() => setActiveTab('import')}
              className={`px-4 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'import' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <Database size={18} /> Bulk Import
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 rounded flex items-center gap-2 transition-colors ${activeTab === 'manage' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <Layers size={18} /> Categories
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-10">
        {(!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('YOUR_SUPABASE_URL')) && (
           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Missing Configuration!</strong>
              <span className="block sm:inline"> Please rename <code>.env.example</code> to <code>.env</code> and add your Supabase credentials.</span>
           </div>
        )}

        {activeTab === 'builder' && (
          <PromptBuilder categories={categories} />
        )}

        {activeTab === 'import' && (
          <BulkImporter categories={categories} onImportComplete={() => {}} />
        )}

        {activeTab === 'manage' && (
          <CategoryManager onCategoriesChange={fetchCategories} />
        )}
      </main>
    </div>
  );
}

export default App;
