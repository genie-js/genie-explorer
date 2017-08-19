module.exports = {
  comment: /\/\*[\s\S]*?\*\//,
  punctuation: /[{}]/,
  number: { pattern: /(\s+)[+-]?\d+\b/, lookbehind: true },
  section: /<[A-Z_]+>/,
  conditional: /\b(start_random|percent_chance|end_random|if|elseif|else|endif)\b/,
  define: /#(?:const|define)\b/,
  include: /#include(?:_drs)?\b/,
  command: /\b(create_(terrain|object|land|player_lands|elevation|connect_(all_lands|team_lands|player_lands|all_players_land|same_land_zones)))\b/,
  // An attribute is all lowercase
  attribute: /\b[a-z_]+\b/,
  word: /\S+/
}
