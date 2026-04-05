import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, UploadCloud } from 'lucide-react';
import { supabase } from '../../supabaseClient';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ title: '', image: '' });
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        
        fetchCategories();
        
        const channel = supabase.channel('realtime_categories_admin')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => {
                fetchCategories();
            })
            .subscribe();

        return () => {
            isMounted = false;
            supabase.removeChannel(channel);
        }
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from('categories').select('*');
            if (error) throw error;
            
            if (data && data.length > 0) {
                setCategories(data);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories", error);
            setCategories([]); 
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('categories').insert([{ 
                title: newCategory.title, 
                image: newCategory.image 
            }]);

            if (error) throw error;

            setNewCategory({ title: '', image: '' });
        } catch (error) {
            console.error("Error adding category", error);
            alert("Failed to add category.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this category?")) {
            try {
                const { error } = await supabase.from('categories').delete().eq('id', id);

                if (error) throw error;
            } catch (error) {
                console.error("Error deleting category from Supabase", error);
                alert("Failed to delete category.");
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        handleFileSelect(file);
    };

    const handleFileSelect = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setNewCategory({ ...newCategory, image: e.target.result });
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please drop a valid image file.');
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* List */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold mb-4">Existing Categories</h3>
                <div className="space-y-3">
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : categories.length === 0 ? (
                        <p className="text-gray-500">No categories found.</p>
                    ) : (
                        categories.map(cat => (
                            <div key={cat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <img src={cat.image} alt="" className="w-10 h-10 rounded-md object-cover" />
                                    <span className="font-medium">{cat.title}</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="text-red-500 hover:text-red-700 p-2 border-none bg-transparent"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Form */}
            <div className="bg-white rounded-lg shadow p-6 h-fit">
                <h3 className="text-lg font-bold mb-4">Add New Category</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={newCategory.title}
                            onChange={e => setNewCategory({ ...newCategory, title: e.target.value })}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-brand-blue outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>

                        {/* Drag and Drop Zone */}
                        <div
                            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragging ? 'border-brand-orange bg-orange-50' : 'border-gray-300 hover:bg-gray-50'}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileInput}
                                accept="image/*"
                                className="hidden"
                            />

                            {newCategory.image ? (
                                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                                    <img src={newCategory.image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-white text-sm font-medium">Click to change</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <UploadCloud className={`w-10 h-10 mb-2 ${isDragging ? 'text-brand-orange' : 'text-gray-400'}`} />
                                    <p className="text-sm text-gray-600 font-medium">Drag & drop your image here</p>
                                    <p className="text-xs text-gray-500 mt-1">or click to browse from your computer</p>
                                </>
                            )}
                        </div>

                        {/* Fallback URL Input just in case */}
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Or paste an image URL instead"
                                value={newCategory.image}
                                onChange={e => setNewCategory({ ...newCategory, image: e.target.value })}
                                className="w-full px-3 py-2 border rounded-md text-sm text-gray-500 focus:ring-2 focus:ring-brand-blue outline-none"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-brand-orange text-white py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Add Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryManager;
