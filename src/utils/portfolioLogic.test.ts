import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  filterSkills, 
  filterProjects, 
  validateStats, 
  processTerminalCommand 
} from './portfolioLogic';
import { DEFAULT_PROFILE, DEFAULT_STATS, DEFAULT_SKILLS, DEFAULT_PROJECTS } from '../data/defaultData';

test('filterSkills returns all skills when category is All and no query', () => {
  const result = filterSkills(DEFAULT_SKILLS, 'All', '');
  assert.equal(result.length, DEFAULT_SKILLS.length);
});

test('filterSkills correctly filters by category', () => {
  const cyberSkills = filterSkills(DEFAULT_SKILLS, 'Cybersecurity', '');
  assert.ok(cyberSkills.length > 0);
  assert.ok(cyberSkills.every(s => s.category === 'Cybersecurity'));
});

test('filterSkills filters by text search query', () => {
  const result = filterSkills(DEFAULT_SKILLS, 'All', 'wireshark');
  assert.equal(result.length, 1);
  assert.equal(result[0].name, 'Wireshark');
});

test('filterProjects correctly matches category and keywords', () => {
  const devProjects = filterProjects(DEFAULT_PROJECTS, 'Development', '');
  assert.ok(devProjects.every(p => p.category === 'Development'));

  const searchResult = filterProjects(DEFAULT_PROJECTS, 'All', 'VulnScan');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].title, 'VulnScan');
});

test('validateStats ensures non-negative numbers and sanitizes values', () => {
  const validated = validateStats({
    projectsCompleted: -10,
    technologiesMastered: 15,
    yearsExperience: 4.8,
    uptimePercent: '99.98%'
  });

  assert.equal(validated.projectsCompleted, 0);
  assert.equal(validated.technologiesMastered, 15);
  assert.equal(validated.yearsExperience, 4);
  assert.equal(validated.uptimePercent, '99.98%');
});

test('processTerminalCommand executes whoami correctly', () => {
  const res = processTerminalCommand('whoami', DEFAULT_PROFILE, DEFAULT_STATS, DEFAULT_SKILLS, DEFAULT_PROJECTS);
  assert.ok(res.output.some(line => line.includes(DEFAULT_PROFILE.username)));
  assert.ok(res.output.some(line => line.includes(DEFAULT_PROFILE.handle)));
});

test('processTerminalCommand executes stats and cat bio.txt', () => {
  const statsRes = processTerminalCommand('stats', DEFAULT_PROFILE, DEFAULT_STATS, DEFAULT_SKILLS, DEFAULT_PROJECTS);
  assert.ok(statsRes.output.some(line => line.includes('Telemetry Metrics') || line.includes('TELEMETRY METRICS')));

  const catRes = processTerminalCommand('cat bio.txt', DEFAULT_PROFILE, DEFAULT_STATS, DEFAULT_SKILLS, DEFAULT_PROJECTS);
  assert.ok(catRes.output.some(line => line.includes(DEFAULT_PROFILE.bioFull)));
});

test('processTerminalCommand handles unknown command gracefully', () => {
  const unknownRes = processTerminalCommand('unknown_cmd', DEFAULT_PROFILE, DEFAULT_STATS, DEFAULT_SKILLS, DEFAULT_PROJECTS);
  assert.ok(unknownRes.output[0].includes('command not found'));
});
