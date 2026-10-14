"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteContent, DEFAULT_SITE_CONTENT } from '@/data/defaultSiteContent';
import { Product, PRODUCTS } from '@/data/products';

interface SiteContentContextType {
  content: SiteContent;
  products: Product[];
  isLoading: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: string | null;
  updateContent: (updater: Partial<SiteContent> | ((prev: SiteContent) => SiteContent)) => void;
  updateProducts: (updater: Product[] | ((prev: Product[]) => Product[])) => void;
  updateProduct: (id: string, fields: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  saveChanges: () => Promise<{ success: boolean; message?: string }>;
  resetToDefaults: () => Promise<void>;
  discardChanges: () => void;
}

const LOCAL_STORAGE_CONTENT_KEY = 'lane_edwards_portal_content_v1';
const LOCAL_STORAGE_PRODUCTS_KEY = 'lane_edwards_portal_products_v1';

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [savedContent, setSavedContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [savedProducts, setSavedProducts] = useState<Product[]>(PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Load from API on mount
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const res = await fetch('/api/portal/content');
        if (res.ok) {
          const data = await res.json();
          if (data.success && isMounted) {
            const loadedContent = data.content ? {
              ...DEFAULT_SITE_CONTENT,
              ...data.content,
              story: {
                ...DEFAULT_SITE_CONTENT.story,
                ...(data.content.story || {}),
                tenet1: { ...DEFAULT_SITE_CONTENT.story.tenet1, ...(data.content.story?.tenet1 || {}) },
                tenet2: { ...DEFAULT_SITE_CONTENT.story.tenet2, ...(data.content.story?.tenet2 || {}) },
                tenet3: { ...DEFAULT_SITE_CONTENT.story.tenet3, ...(data.content.story?.tenet3 || {}) },
              }
            } : DEFAULT_SITE_CONTENT;
            const loadedProducts = data.products && data.products.length > 0 ? data.products : PRODUCTS;
            setContent(loadedContent);
            setProducts(loadedProducts);
            setSavedContent(loadedContent);
            setSavedProducts(loadedProducts);
            setHasUnsavedChanges(false);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Could not fetch from server API, checking localStorage:', err);
      }

      // Fallback to localStorage
      try {
        const localContent = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
        const localProducts = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
        if (localContent && isMounted) {
          const parsed = JSON.parse(localContent);
          const merged = {
            ...DEFAULT_SITE_CONTENT,
            ...parsed,
            story: {
              ...DEFAULT_SITE_CONTENT.story,
              ...(parsed.story || {}),
              tenet1: { ...DEFAULT_SITE_CONTENT.story.tenet1, ...(parsed.story?.tenet1 || {}) },
              tenet2: { ...DEFAULT_SITE_CONTENT.story.tenet2, ...(parsed.story?.tenet2 || {}) },
              tenet3: { ...DEFAULT_SITE_CONTENT.story.tenet3, ...(parsed.story?.tenet3 || {}) },
            }
          };
          setContent(merged);
          setSavedContent(merged);
        }
        if (localProducts && isMounted) {
          const parsed = JSON.parse(localProducts);
          setProducts(parsed);
          setSavedProducts(parsed);
        }
      } catch (e) {
        console.error('Failed reading localStorage backup:', e);
      }

      if (isMounted) setIsLoading(false);
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateContent = useCallback((updater: Partial<SiteContent> | ((prev: SiteContent) => SiteContent)) => {
    setContent((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      setHasUnsavedChanges(true);
      return next;
    });
  }, []);

  const updateProducts = useCallback((updater: Product[] | ((prev: Product[]) => Product[])) => {
    setProducts((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setHasUnsavedChanges(true);
      return next;
    });
  }, []);

  const updateProduct = useCallback((id: string, fields: Partial<Product>) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...fields } : p));
      setHasUnsavedChanges(true);
      return next;
    });
  }, []);

  const addProduct = useCallback((newProduct: Product) => {
    setProducts((prev) => {
      const next = [newProduct, ...prev];
      setHasUnsavedChanges(true);
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      setHasUnsavedChanges(true);
      return next;
    });
  }, []);

  const saveChanges = useCallback(async (): Promise<{ success: boolean; message?: string }> => {
    try {
      // 1. Save to server file via API
      const res = await fetch('/api/portal/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, products }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      // 2. Also cache to localStorage
      try {
        localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(content));
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
      } catch (storageError) {
        console.warn('LocalStorage save failed:', storageError);
      }

      setSavedContent(content);
      setSavedProducts(products);
      setHasUnsavedChanges(false);
      const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' });
      setLastSaved(timeStr);

      return { success: true, message: `Published to live workshop site at ${timeStr}` };
    } catch (err: unknown) {
      console.error('Failed saving portal changes:', err);
      // Fallback: save to localStorage anyway
      try {
        localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(content));
        localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
        setSavedContent(content);
        setSavedProducts(products);
        setHasUnsavedChanges(false);
        const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        setLastSaved(timeStr + ' (Saved locally)');
        return { success: true, message: 'Saved to browser cache successfully.' };
      } catch (e: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        return { success: false, message: `Save error: ${errorMsg}` };
      }
    }
  }, [content, products]);

  const discardChanges = useCallback(() => {
    setContent(savedContent);
    setProducts(savedProducts);
    setHasUnsavedChanges(false);
  }, [savedContent, savedProducts]);

  const resetToDefaults = useCallback(async () => {
    try {
      await fetch('/api/portal/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reset: true }),
      });
    } catch (e) {
      console.warn('API reset failed, falling back to memory/local:', e);
    }

    try {
      localStorage.removeItem(LOCAL_STORAGE_CONTENT_KEY);
      localStorage.removeItem(LOCAL_STORAGE_PRODUCTS_KEY);
    } catch (e) {
      console.warn('Local storage clear error:', e);
    }

    setContent(DEFAULT_SITE_CONTENT);
    setProducts(PRODUCTS);
    setSavedContent(DEFAULT_SITE_CONTENT);
    setSavedProducts(PRODUCTS);
    setHasUnsavedChanges(false);
    setLastSaved(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
  }, []);

  return (
    <SiteContentContext.Provider
      value={{
        content,
        products,
        isLoading,
        hasUnsavedChanges,
        lastSaved,
        updateContent,
        updateProducts,
        updateProduct,
        addProduct,
        deleteProduct,
        saveChanges,
        resetToDefaults,
        discardChanges,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return ctx;
}
