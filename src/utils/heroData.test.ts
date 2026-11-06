import test from 'node:test';
import assert from 'node:assert/strict';
import { computeParallaxOffsets, getHeroSpecimens, HERO_CREDIBILITY_STATS } from './heroData';
import { ALL_51_RESOURCES } from '../data/catalogue51';

test('computeParallaxOffsets clamps within reasonable bounds at center', () => {
  const centerOffsets = computeParallaxOffsets(500, 300, 1000, 600);
  assert.equal(centerOffsets.bgX, 0);
  assert.equal(centerOffsets.bgY, 0);
  assert.equal(centerOffsets.mistX, 0);
  assert.equal(centerOffsets.floatX, 0);
});

test('computeParallaxOffsets produces expected multi-plane depth at extreme edge', () => {
  const edgeOffsets = computeParallaxOffsets(1000, 600, 1000, 600);
  // normX = 0.5, normY = 0.5
  assert.equal(edgeOffsets.bgX, 6);
  assert.equal(edgeOffsets.bgY, 4);
  assert.equal(edgeOffsets.mistX, 11);
  assert.equal(edgeOffsets.shelterX, -5);
  assert.equal(edgeOffsets.floatX, -9);
});

test('computeParallaxOffsets safely handles zero or negative dimensions', () => {
  const zeroOffsets = computeParallaxOffsets(100, 100, 0, 0);
  assert.equal(zeroOffsets.bgX, 0);
  assert.equal(zeroOffsets.floatX, 0);
});

test('getHeroSpecimens correctly returns 3 curated specimens from catalogue', () => {
  const specimens = getHeroSpecimens(ALL_51_RESOURCES, 'en');
  assert.equal(specimens.length, 3);
  
  const [bamboo, amla, hirda] = specimens;
  assert.equal(bamboo.id, 'bamboo');
  assert.match(bamboo.name, /Bamboo/i);
  assert.match(bamboo.price, /₹180/);

  assert.equal(amla.id, 'fruit_awla');
  assert.match(amla.name, /Amla/i);
  assert.match(amla.price, /₹85/);

  assert.equal(hirda.id, 'herb_hirda');
  assert.match(hirda.name, /Harad|Hirda/i);
  assert.match(hirda.price, /₹95/);
});

test('HERO_CREDIBILITY_STATS preserves all 3 statutory community indicators', () => {
  assert.equal(HERO_CREDIBILITY_STATS.length, 3);
  const values = HERO_CREDIBILITY_STATS.map(s => s.value);
  assert.ok(values.includes('100%'));
  assert.ok(values.includes('Direct'));
  assert.ok(values.includes('2,019 Ha'));
});
