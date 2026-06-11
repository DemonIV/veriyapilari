import { describe, expect, it } from 'vitest';
import { SEARCH_INDEX, searchSite } from '../searchIndex';

describe('searchSite', () => {
  it('2 karakterden kısa sorgular boş döner', () => {
    expect(searchSite('')).toEqual([]);
    expect(searchSite('a')).toEqual([]);
  });

  it('başlıkta geçen terimi bulur', () => {
    const results = searchSite('heap');
    expect(results[0].path).toBe('/veri-yapilari/heap');
  });

  it('Türkçe karakterleri normalize eder: "agac" → Ağaç', () => {
    const results = searchSite('agac');
    expect(results.some(r => r.path === '/veri-yapilari/agac')).toBe(true);
  });

  it('anahtar kelimelerden eşleşir: dijkstra → graf algoritmaları', () => {
    const results = searchSite('dijkstra');
    expect(results.some(r => r.path === '/algoritmalar/graf-algoritmalari')).toBe(true);
  });

  it('eşleşmeyen sorguda boş döner', () => {
    expect(searchSite('xqzwy')).toEqual([]);
  });

  it('en fazla 8 sonuç döner', () => {
    expect(searchSite('algoritma').length).toBeLessThanOrEqual(8);
  });

  it('dizindeki tüm kayıtların yolu / ile başlar ve benzersizdir', () => {
    const paths = SEARCH_INDEX.map(e => e.path);
    expect(new Set(paths).size).toBe(paths.length);
    paths.forEach(p => expect(p.startsWith('/')).toBe(true));
  });
});
