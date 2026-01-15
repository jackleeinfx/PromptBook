import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Trash2, Plus } from 'lucide-react';

export default function CategoryManager({ onCategoriesChange }) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data);
      if (onCategoriesChange) onCategoriesChange(data);
    }
  }

  async function addCategory() {
    if (!newCategory.trim()) return;
    if (!supabase) {
      alert("Supabase not configured");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from('categories')
      .insert([{ name: newCategory.trim() }]);

    if (error) {
      alert('Error adding category: ' + error.message);
    } else {
      setNewCategory('');
      fetchCategories();
    }
    setLoading(false);
  }

  async function deleteCategory(id) {
    if (!window.confirm('Are you sure you want to delete this category and all its prompts?')) return;

    if (!supabase) {
      alert("Supabase not configured");
      return;
    }

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Error deleting category: ' + error.message);
    } else {
      fetchCategories();
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Category Manager</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name (e.g. Style, Camera)"
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && addCategory()}
        />
        <button
          onClick={addCategory}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
            <span className="font-medium text-gray-700">{cat.name}</span>
            <button
              onClick={() => deleteCategory(cat.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete Category"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {categories.length === 0 && <p className="text-gray-500 text-sm italic">No categories created yet.</p>}
      </div>
    </div>
  );
}
