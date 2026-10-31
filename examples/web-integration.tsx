import React, { useState, useMemo } from 'react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { ProductListing, Category } from '../types/marketplace';

export const AmazonStyleCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeListing, setActiveListing] = useState<ProductListing | null>(null);

  const products = productsData as ProductListing[];
  const categories = categoriesData as Category[];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.webCategory === selectedCategory || p.categorySlug === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        p.title.en.toLowerCase().includes(q) ||
        (p.title.mr && p.title.mr.includes(q)) ||
        p.seller.village.toLowerCase().includes(q) ||
        p.seller.name.toLowerCase().includes(q) ||
        p.itemCode.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#166534', margin: 0 }}>VanRozgar | वनरोजगार</h1>
          <p style={{ color: '#64748b', margin: '4px 0 0 0' }}>Community Forest Resource (CFR) Marketplace · Nashik District</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search produce, honey, bamboo, village, item code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', width: '340px', fontSize: '14px' }}
          />
        </div>
      </header>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            background: selectedCategory === 'all' ? '#166534' : '#f1f5f9',
            color: selectedCategory === 'all' ? '#fff' : '#334155',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          All Items ({products.length})
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setSelectedCategory(c.slug)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: selectedCategory === c.slug ? '#166534' : '#f1f5f9',
              color: selectedCategory === c.slug ? '#fff' : '#334155',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {c.name.en} ({c.name.mr})
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            onClick={() => setActiveListing(p)}
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px',
              background: '#fff',
              cursor: 'pointer',
              transition: 'transform 0.15s, box-shadow 0.15s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', background: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  {p.itemCode}
                </span>
                {p.verification.isVerified && (
                  <span style={{ fontSize: '12px', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ✓ Verified CFR
                  </span>
                )}
              </div>

              <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px' }}>
                <img src={p.assets.illustration} alt={p.title.en} style={{ maxHeight: '100px', maxWidth: '100px', objectFit: 'contain' }} />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0', color: '#0f172a' }}>{p.title.en}</h3>
              {p.title.mr && <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 8px 0' }}>{p.title.mr}</p>}
              <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 12px 0' }}>
                📍 {p.seller.name} · {p.seller.village} ({p.seller.district})
              </p>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#166534' }}>₹{p.price}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>/ {p.unit}</span>
                {p.mrp && p.mrp > p.price && (
                  <span style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>₹{p.mrp}</span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                <span>Avail: {p.quantityAvailable} {p.unit}</span>
                <span>⭐ {p.metrics.rating} ({p.metrics.reviewCount})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeListing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setActiveListing(null)}>
          <div style={{ background: '#fff', borderRadius: '16px', maxWidth: '560px', width: '90%', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ margin: '0 0 8px 0', color: '#166534' }}>{activeListing.title.combined || activeListing.title.en}</h2>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.5 }}>{activeListing.description}</p>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', margin: '16px 0', fontSize: '13px' }}>
              <div><strong>Harvest / Source:</strong> {activeListing.provenance.sourceArea}</div>
              <div><strong>Collection Method:</strong> {activeListing.provenance.collectionMethod}</div>
              {activeListing.barterWants && <div><strong>Barter Wants:</strong> {activeListing.barterWants}</div>}
            </div>
            <button onClick={() => setActiveListing(null)} style={{ background: '#166534', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
