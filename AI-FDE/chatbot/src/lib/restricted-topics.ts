const RESTRICTED_PATTERNS = [
  /\b(?:wars?|warfare|armed conflicts?|combat|battles?|invasions?|military operations?|airstrikes?|air strikes?|bombings?|ceasefires?|frontlines?)\b/i,
  /\b(?:territorial|border|sovereignty|geopolitical)\s+(?:claims?|disputes?|conflicts?|status|questions?)\b/i,
  /\bconflict zones?\b/i,
  /\b(?:taiwan|crimea|kashmir|south china sea|west bank|golan heights)\b/i,
  /\b(?:area\s*51|groom lake)\b/i,
  /\b(?:military|air force|naval|army)\s+(?:base|bases|installation|installations|facility|facilities|site|sites|range|ranges)\b/i,
  /\b(?:classified|secret)\s+(?:military\s+)?(?:base|bases|installation|installations|facility|facilities|site|sites|program|programs|project|projects)\b/i,
  /\b(?:massacres?|genocides?|atrocities|terror(?:ist)? attacks?|terrorism|mass shootings?|school shootings?|mass[- ]casualty events?|assassinations?|major disasters?|tragic incidents?)\b/i,
];

export function isRestrictedTopicRequest(content: string): boolean {
  return RESTRICTED_PATTERNS.some((pattern) => pattern.test(content));
}
